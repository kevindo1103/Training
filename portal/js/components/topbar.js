export function renderTopBar(config, onToggleSidebar, onToggleTheme, isDark) {
  const bar = document.createElement('header');
  bar.className =
    'fixed top-0 left-0 right-0 h-16 z-40 bg-surface/95 backdrop-blur-md border-b border-outline-variant/50 flex items-center justify-between px-5 md:px-8';

  bar.innerHTML = `
    <div class="flex items-center gap-3">
      <button id="menu-btn" class="md:hidden p-2 -ml-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant" aria-label="Mở menu">
        <span class="material-symbols-outlined">menu</span>
      </button>
      <a href="/" class="flex items-center gap-3 hover:opacity-80 transition-opacity" aria-label="Về trang chủ">
        <div class="w-9 h-9 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline font-bold text-body-md">D</div>
        <span class="hidden sm:block font-headline font-bold text-on-surface text-headline-sm tracking-tight">Dolphin Training</span>
      </a>
    </div>
    <div class="flex items-center gap-3">
      <span class="hidden md:block text-label-caps font-ui text-on-surface-variant uppercase tracking-widest">${escapeHtml(config.title || config.moduleTitle)}</span>
      <button id="theme-toggle" class="p-2 rounded-lg hover:bg-surface-container-high text-on-surface-variant transition-colors" aria-label="Chuyển chủ đề sáng/tối">
        <span class="material-symbols-outlined">${isDark ? 'light_mode' : 'dark_mode'}</span>
      </button>
    </div>
  `;

  bar.querySelector('#menu-btn').addEventListener('click', onToggleSidebar);
  bar.querySelector('#theme-toggle').addEventListener('click', onToggleTheme);

  return bar;
}

function escapeHtml(text) {
  if (text == null) return '';
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
