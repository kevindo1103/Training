export function renderSideBar(config, currentIndex, completedIds, onNavigate, isOpen, onSummary) {
  const aside = document.createElement('aside');
  aside.className = `fixed top-16 left-0 bottom-0 md:bottom-20 w-72 bg-surface-container-lowest border-r border-outline-variant/50 z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`;

  const header = document.createElement('div');
  header.className = 'px-6 py-5';
  header.innerHTML = `<span class="text-label-caps font-ui font-bold text-on-surface-variant uppercase tracking-widest">6 Activities</span>`;
  aside.appendChild(header);

  const nav = document.createElement('nav');
  nav.className = 'px-3 pb-4 space-y-1 overflow-y-auto custom-scrollbar';
  nav.setAttribute('aria-label', 'Activities');

  const summaryIndex = config.activities.length;

  config.activities.forEach((activity, index) => {
    const isActive = index === currentIndex;
    const isCompleted = completedIds.has(activity.id);
    const btn = document.createElement('button');
    btn.className = `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all min-h-[44px] ${
      isActive
        ? 'bg-accent-teal-soft text-primary font-bold'
        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
    }`;
    btn.setAttribute('aria-current', isActive ? 'page' : 'false');

    const numberBadge = isCompleted && !isActive
      ? `<span class="material-symbols-outlined text-success-emerald text-[20px]">check_circle</span>`
      : `<span class="w-6 h-6 rounded-full flex items-center justify-center text-label-sm font-bold shrink-0 ${
          isActive ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'
        }">${index + 1}</span>`;

    btn.innerHTML = `
      ${numberBadge}
      <span class="flex-1 text-body-md font-ui leading-snug">${activity.title || activity.name}</span>
    `;
    btn.addEventListener('click', () => onNavigate(index));
    nav.appendChild(btn);
  });

  if (typeof onSummary === 'function') {
    const isSummaryActive = currentIndex === summaryIndex;
    const divider = document.createElement('div');
    divider.className = 'border-t border-outline-variant/50 mx-3 my-2';
    nav.appendChild(divider);

    const summaryBtn = document.createElement('button');
    summaryBtn.className = `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all min-h-[44px] ${
      isSummaryActive
        ? 'bg-accent-teal-soft text-primary font-bold'
        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
    }`;
    summaryBtn.innerHTML = `
      <span class="material-symbols-outlined text-[20px]">summarize</span>
      <span class="flex-1 text-body-md font-ui">Tổng kết</span>
    `;
    summaryBtn.addEventListener('click', onSummary);
    nav.appendChild(summaryBtn);
  }

  aside.appendChild(nav);
  return aside;
}
