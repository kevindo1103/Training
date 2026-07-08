/**
 * dom.js — Shared DOM utilities
 *
 * Used by shell.js, unit-stepper.js, lecture.js, and other components/renderers
 * to safely escape dynamic text before injecting into innerHTML.
 */

export function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
