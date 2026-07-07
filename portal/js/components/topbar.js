/**
 * topbar.js — TopAppBar
 * Logo area (left), module title từ config, mobile hamburger toggle sidebar
 * Bao gồm dark/light mode toggle
 */

export function renderTopBar(config, onToggleSidebar, onToggleTheme, isDark) {
  const bar = document.createElement('header');
  bar.className =
    'fixed top-0 left-0 right-0 h-20 z-40 bg-surface/95 backdrop-blur border-b border-outline-variant flex items-center justify-between px-4 md:px-8';

  bar.innerHTML = `
    <div class="flex items-center gap-3">
      <button id="menu-btn" class="md:hidden p-2 -ml-2 rounded-lg hover:bg-surface-container-high text-primary" aria-label="Mở menu">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <div class="flex items-center gap-3">
        <div class="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline font-bold">D</div>
        <span class="hidden sm:block font-headline font-bold text-on-surface text-headline-sm">Dolphin Training</span>
      </div>
    </div>
    <div class="flex items-center gap-2 md:gap-4">
      <h1 class="hidden md:block text-headline-sm font-headline font-bold text-on-surface">${config.moduleTitle} — ${config.moduleSubtitle}</h1>
      <button id="theme-toggle" class="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant" aria-label="Chuyển chủ đề sáng/tối">
        <span class="material-symbols-outlined">${isDark ? 'light_mode' : 'dark_mode'}</span>
      </button>
    </div>
  `;

  bar.querySelector('#menu-btn').addEventListener('click', onToggleSidebar);
  bar.querySelector('#theme-toggle').addEventListener('click', onToggleTheme);

  return bar;
}
