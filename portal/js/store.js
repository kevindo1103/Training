/**
 * store.js — Data Layer
 * localStorage key: `dolphin_training_module1`
 * API sync: fire-and-forget via api.js (offline skip silently)
 */

import { api, setAuthToken } from './api.js';

const STORAGE_KEY = 'dolphin_training_module1';
const TOKEN_KEY = 'dolphin_auth_token';
const DEBOUNCE_MS = 500;

let state = null;
let persistTimer = null;
let onPersistCallback = null;

function createEmptyState() {
  return {
    participant: null,
    responses: {},
    responseTypes: {},
    introsSeen: {},
    lastSaved: null,
    lastSynced: null,
  };
}

export function getState() {
  return state;
}

export async function initStore() {
  const raw = localStorage.getItem(STORAGE_KEY);
  state = raw ? JSON.parse(raw) : createEmptyState();

  // Migrate: remove token from localStorage state if present from older versions
  if (state.participant?.token) {
    sessionStorage.setItem(TOKEN_KEY, state.participant.token);
    delete state.participant.token;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // Restore auth token from sessionStorage (memory-safe, not persisted to localStorage)
  const savedToken = sessionStorage.getItem(TOKEN_KEY);
  if (savedToken) {
    setAuthToken(savedToken);
  }

  // Nếu có participant + participantId, thử fetch responses từ API và dùng newest
  if (state.participant?.participantId) {
    try {
      const remote = await api.get(`/participants/${state.participant.participantId}/responses`);
      if (Array.isArray(remote) && remote.length > 0) {
        const newestRemote = remote.reduce((latest, item) => {
          const itemTime = item.updated_at ? new Date(item.updated_at).getTime() : 0;
          return itemTime > latest ? itemTime : latest;
        }, 0);
        if (newestRemote > (state.lastSaved || 0)) {
          remote.forEach((item) => {
            state.responses[item.activity_id] = {
              ...(item.data || {}),
              updatedAt: item.updated_at ? new Date(item.updated_at).getTime() : Date.now(),
            };
            if (item.activity_type) {
              state.responseTypes[item.activity_id] = {
                type: item.activity_type,
                completed: !!item.completed,
              };
            }
          });
          state.lastSaved = newestRemote;
          localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        }
      }
    } catch (err) {
      console.log('API load skipped', err);
    }
  }

  return state;
}

export function setParticipant(name, role, participantId = null, sessionId = null, token = null) {
  state.participant = { name, role, participantId, sessionId, joinedAt: Date.now() };
  if (token) {
    sessionStorage.setItem(TOKEN_KEY, token);
  }
  setAuthToken(token);
  persist();
}

export function clearParticipant() {
  state.participant = null;
  state.responses = {};
  state.responseTypes = {};
  state.introsSeen = {};
  state.lastSynced = null;
  sessionStorage.removeItem(TOKEN_KEY);
  setAuthToken(null);
  persist();
}

export function getParticipant() {
  return state.participant;
}

export function getResponse(activityId) {
  return state.responses[activityId] || {};
}

export function mergeResponse(activityId, data, type = null) {
  state.responses[activityId] = {
    ...(state.responses[activityId] || {}),
    ...data,
    updatedAt: Date.now(),
  };
  if (type) {
    state.responseTypes[activityId] = {
      ...(state.responseTypes[activityId] || {}),
      type,
    };
  }
  persist();
}

export function markIntroSeen(activityId) {
  state.introsSeen[activityId] = true;
  persist();
}

export function isIntroSeen(activityId) {
  return !!state.introsSeen[activityId];
}

export function setOnPersist(callback) {
  onPersistCallback = callback;
}

export function persist() {
  clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    state.lastSaved = Date.now();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    syncToApi();
    if (typeof onPersistCallback === 'function') {
      onPersistCallback();
    }
  }, DEBOUNCE_MS);
}

async function syncToApi() {
  if (!state.participant || !state.participant.participantId) return;

  const activityIds = Object.keys(state.responses);
  if (activityIds.length === 0) return;

  try {
    const participantId = state.participant.participantId;
    await Promise.all(
      activityIds.map((activityId) => {
        const stored = state.responses[activityId];
        const { updatedAt, ...data } = stored;
        const meta = state.responseTypes?.[activityId] || {};
        const payload = {
          type: meta.type || 'unknown',
          data,
          completed: !!meta.completed,
        };
        return api.put(`/participants/${participantId}/responses/${activityId}`, payload);
      })
    );
    state.lastSynced = Date.now();
  } catch (err) {
    console.log('API sync skipped', err);
  }
}


