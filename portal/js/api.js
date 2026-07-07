/**
 * api.js — Fetch wrapper cho Training Portal
 * Base URL: relative `/api/...`
 * Error handling: catch network errors silently (offline fallback), log to console
 * Không block UI nếu API fail
 */

const BASE_URL = '/api';

async function request(method, path, data) {
  const url = `${BASE_URL}${path}`;
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (data !== undefined && data !== null) {
    options.body = JSON.stringify(data);
  }
  try {
    const res = await fetch(url, options);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  } catch (err) {
    console.log(`API ${method} ${url} skipped (offline/error):`, err.message);
    return null;
  }
}

export const api = {
  get: (path) => request('GET', path),
  post: (path, data) => request('POST', path, data),
  put: (path, data) => request('PUT', path, data),
};
