/**
 * toast.js — Auto-save toast "Đã lưu"
 * Position: bottom-center, Duration: 2s, Animation: slide-up + fade
 */

export function showToast(message = 'Đã lưu', duration = 2000) {
  const existing = document.getElementById('auto-save-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'auto-save-toast';
  toast.className = 'fixed bottom-24 left-1/2 -translate-x-1/2 px-5 py-3 bg-inverse-surface text-inverse-on-surface rounded-xl font-ui text-body-md shadow-overlay z-50 toast-slide-up';
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('toast-fade-out');
    toast.addEventListener('transitionend', () => toast.remove(), { once: true });
  }, duration);
}
