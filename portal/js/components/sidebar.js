/**
 * sidebar.js — SideNavBar
 * Header: "6 Activities" label
 * 6 items: icon + activity name (đọc từ config)
 * Active state: teal background, bold text
 * Completed state: checkmark icon
 * Desktop: fixed left w-80; Mobile: hidden by default, hamburger toggle
 */

export function renderSideBar(config, currentIndex, completedIds, onNavigate, isOpen) {
  const aside = document.createElement('aside');
  aside.className = `fixed top-20 left-0 bottom-0 md:bottom-20 w-80 bg-surface-container-low border-r border-outline-variant z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`;

  const header = document.createElement('div');
  header.className = 'px-6 py-5 border-b border-outline-variant';
  header.innerHTML = `<span class="text-label-caps font-ui font-bold text-on-surface-variant tracking-widest">6 Activities</span>`;
  aside.appendChild(header);

  const nav = document.createElement('nav');
  nav.className = 'p-4 space-y-2 overflow-y-auto custom-scrollbar';
  nav.setAttribute('aria-label', 'Activities');

  config.activities.forEach((activity, index) => {
    const isActive = index === currentIndex;
    const isCompleted = completedIds.has(activity.id);
    const btn = document.createElement('button');
    btn.className = `w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-colors min-h-[48px] ${
      isActive ? 'bg-primary text-on-primary font-bold shadow-sm' : 'text-on-surface hover:bg-surface-container-high'
    }`;
    btn.setAttribute('aria-current', isActive ? 'page' : 'false');
    btn.innerHTML = `
      <span class="material-symbols-outlined ${isActive ? 'font-bold' : ''}">${activity.icon}</span>
      <span class="flex-1 text-body-md font-ui">${activity.title || activity.name}</span>
      ${isCompleted ? `<span class="material-symbols-outlined ${isActive ? 'text-on-primary' : 'text-success-emerald'}">check_circle</span>` : ''}
    `;
    btn.addEventListener('click', () => onNavigate(index));
    nav.appendChild(btn);
  });

  aside.appendChild(nav);
  return aside;
}
