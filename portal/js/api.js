/**
 * api.js — Fetch wrapper cho Training Portal
 * Base URL: relative `/api/...`
 * Error handling: catch network errors silently (offline fallback), log to console
 * Không block UI nếu API fail
 */

const BASE_URL = '/api';
const REQUEST_TIMEOUT_MS = 10000;

async function request(method, path, data) {
  const url = `${BASE_URL}${path}`;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
    signal: controller.signal,
  };
  if (data !== undefined && data !== null) {
    options.body = JSON.stringify(data);
  }
  try {
    const res = await fetch(url, options);
    clearTimeout(timeoutId);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    clearTimeout(timeoutId);
    if (err.name === 'AbortError') {
      console.log(`API ${method} ${url} timed out after ${REQUEST_TIMEOUT_MS}ms`);
    } else {
      console.log(`API ${method} ${url} skipped (offline/error):`, err.message);
    }
    return null;
  }
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, data) => request('POST', path, data),
  put: (path, data) => request('PUT', path, data),
};
