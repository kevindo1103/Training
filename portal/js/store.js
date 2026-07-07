/**
 * store.js — Data Layer
 * localStorage key: `dolphin_training_module1`
 * API sync: fire-and-forget via api.js (offline skip silently)
 */

import { api } from './api.js';

const STORAGE_KEY = 'dolphin_training_module1';
const DEBOUNCE_MS = 300;

let state = null;
let persistTimer = null;
let onPersistCallback = null;

function createEmptyState() {
  return {
    participant: null,
    responses: {},
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

  // Nếu có participant + sessionId, thử fetch từ API và dùng newest
  if (state.participant?.sessionId) {
    try {
      const remote = await api.get(`/sessions/${state.participant.sessionId}/responses`);
      if (remote?.lastSaved && remote.lastSaved > (state.lastSaved || 0)) {
        state.responses = remote.responses || state.responses;
        state.lastSaved = remote.lastSaved;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      }
    } catch (err) {
      console.log('API load skipped', err);
    }
  }

  return state;
}

export function setParticipant(name, role, participantId = null, sessionId = null) {
  state.participant = { name, role, participantId, sessionId, joinedAt: Date.now() };
  persist();
}

export function getParticipant() {
  return state.participant;
}

export function getResponse(activityId) {
  return state.responses[activityId] || {};
}

export function mergeResponse(activityId, data) {
  state.responses[activityId] = {
    ...(state.responses[activityId] || {}),
    ...data,
    updatedAt: Date.now(),
  };
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
  if (!state.participant || !state.participant.sessionId) return;
  try {
    const payload = {
      participant: state.participant,
      responses: state.responses,
      lastSaved: state.lastSaved,
    };
    await api.put(`/sessions/${state.participant.sessionId}/responses`, payload);
    state.lastSynced = Date.now();
  } catch (err) {
    console.log('API sync skipped', err);
  }
}
