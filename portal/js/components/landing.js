/**
 * landing.js — Home / module selector for Dolphin Training Workshop
 * Displays after participant has entered name+role.
 * Content: module list from canonical MODULE_*.md titles.
 */

import { escapeHtml } from '../utils/dom.js';

// Canonical module list from project structure + MODULE_*.md titles
export const MODULES = [
  {
    id: "module1",
    title: "MODULE 01",
    name: "Tái Cấu Trúc Mô Hình Kinh Doanh",
    shortName: "Mô Hình Kinh Doanh",
    icon: "corporate_fare",
    active: true,
    totalActivities: 6,
    description: "Chẩn đoán mô hình hiện tại, thiết kế mô hình mục tiêu và chọn sản phẩm đầu tư.",
  },
  {
    id: "module2",
    title: "MODULE 02",
    name: "Tái Cấu Trúc Product/Service Portfolio",
    shortName: "Product/Service Portfolio",
    icon: "widgets",
    active: false,
    totalActivities: 0,
    description: "Đánh giá portfolio, thiết kế portfolio mới align với mô hình kinh doanh.",
  },
  {
    id: "module3",
    title: "MODULE 03",
    name: "Xây Dựng & Triển Khai Business Development Framework",
    shortName: "Business Development Framework",
    icon: "trending_up",
    active: false,
    totalActivities: 0,
    description: "Xây dựng BD framework từ lead generation đến deal closing.",
  },
  {
    id: "module4",
    title: "MODULE 04",
    name: "Cấu Trúc Organization & Operation",
    shortName: "Organization & Operation",
    icon: "account_tree",
    active: false,
    totalActivities: 0,
    description: "Thiết kế cấu trúc tổ chức và mô hình vận hành mới.",
  },
  {
    id: "module5",
    title: "MODULE 05",
    name: "Điều Chỉnh Product Development Life Cycle",
    shortName: "Product Development Life Cycle",
    icon: "cycle",
    active: false,
    totalActivities: 0,
    description: "Thiết kế PDLC phù hợp với từng loại hình dịch vụ/sản phẩm.",
  },
];

export function renderHomeSideBar(isOpen, onToggle) {
  const aside = document.createElement('aside');
  aside.className = `fixed top-16 left-0 bottom-0 md:bottom-0 w-72 bg-surface-container-lowest border-r border-outline-variant/50 z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`;

  const header = document.createElement('div');
  header.className = 'px-6 py-5';
  header.innerHTML = `
    <h2 class="font-headline font-bold text-headline-sm text-on-surface">Dolphin Training</h2>
    <span class="text-label-caps font-ui font-bold text-on-surface-variant uppercase tracking-widest">5 Modules</span>
  `;
  aside.appendChild(header);

  const nav = document.createElement('nav');
  nav.className = 'px-3 pb-4 space-y-1 overflow-y-auto custom-scrollbar';
  nav.setAttribute('aria-label', 'Modules');

  MODULES.forEach((module) => {
    const btn = document.createElement('button');
    btn.className = `w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all min-h-[44px] ${
      module.active
        ? 'bg-accent-teal-soft text-primary font-bold'
        : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
    }`;
    btn.setAttribute('aria-current', module.active ? 'page' : 'false');
    btn.innerHTML = `
      <span class="material-symbols-outlined text-[20px]">${escapeHtml(module.icon)}</span>
      <span class="flex-1 text-body-md font-ui leading-snug">${escapeHtml(module.name)}</span>
    `;
    btn.addEventListener('click', () => {
      if (onToggle) onToggle();
    });
    nav.appendChild(btn);
  });

  aside.appendChild(nav);
  return aside;
}

export function renderHomePage(container, participant, moduleStatus, onSelectModule) {
  if (!container) return;

  const totalActivities = moduleStatus.reduce((sum, mod) => sum + (mod.totalActivities || 0), 0);
  const completedActivities = moduleStatus.reduce((sum, mod) => sum + (mod.completed || 0), 0);
  const welcomeName = participant?.name ? escapeHtml(participant.name) : 'quý vị';
  const welcomeRole = participant?.role ? escapeHtml(participant.role) : '';

  container.innerHTML = `
    <div class="max-w-learning mx-auto px-5 md:px-12 py-8 md:py-section">
      <!-- Welcome Header -->
      <section class="mb-10 md:mb-section">
        <span class="text-label-caps font-ui font-bold text-primary uppercase tracking-widest">Dolphin Training Portal</span>
        <h1 class="font-headline font-extrabold text-headline-lg-mobile md:text-headline-lg text-on-surface mt-3 mb-4">
          Xin chào, ${welcomeName}
        </h1>
        <p class="text-body-md md:text-body-lg text-on-surface-variant max-w-2xl">
          Chào mừng quý vị đến với chương trình đào tạo chuyển đổi mô hình kinh doanh của Dolphin Technology.
          ${welcomeRole ? `Vai trò của quý vị: <strong class="text-on-surface">${welcomeRole}</strong>.` : ''}
        </p>
      </section>

      <!-- Progress Summary -->
      <section class="card-elite p-6 md:p-8 mb-8 md:mb-12">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h2 class="font-headline font-bold text-headline-sm text-on-surface mb-1">Tiến độ của quý vị</h2>
            <p class="text-body-md text-on-surface-variant">
              Chương trình gồm <strong class="text-on-surface">${totalActivities}</strong> activities
              ${totalActivities > 0 ? `— đã hoàn thành <strong class="text-on-surface">${completedActivities}</strong>.` : ''}
            </p>
          </div>
          ${totalActivities > 0 ? `
            <div class="w-full md:w-48">
              <div class="h-2 rounded-full bg-outline-variant overflow-hidden">
                <div class="h-full bg-primary rounded-full transition-all" style="width: ${totalActivities ? (completedActivities / totalActivities) * 100 : 0}%"></div>
              </div>
            </div>
          ` : ''}
        </div>
      </section>

      <!-- Module Grid -->
      <section class="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12 md:mb-section">
        ${moduleStatus.map((mod) => renderModuleCard(mod)).join('')}
      </section>

      <!-- Footer -->
      <footer class="text-center py-8 md:py-12 border-t border-outline-variant/50">
        <p class="text-label-caps font-ui font-bold text-on-surface-variant uppercase tracking-widest mb-4">SẴN SÀNG BẮT ĐẦU HÀNH TRÌNH?</p>
        <div class="flex items-center justify-center gap-3">
          <span class="w-2.5 h-2.5 rounded-full bg-primary"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
          <span class="w-2.5 h-2.5 rounded-full bg-outline-variant"></span>
        </div>
      </footer>
    </div>
  `;

  moduleStatus.forEach((mod) => {
    const btn = document.getElementById(`module-select-${mod.id}`);
    if (btn && typeof onSelectModule === 'function') {
      btn.addEventListener('click', () => onSelectModule(mod.id.replace('module', '')));
    }
  });
}

function renderModuleCard(module) {
  const progress = module.totalActivities ? Math.round((module.completed / module.totalActivities) * 100) : 0;
  const isDone = module.totalActivities && module.completed === module.totalActivities;
  const ctaLabel = isDone ? 'Xem lại' : module.completed > 0 ? 'Tiếp tục' : module.available ? 'Bắt đầu' : 'Sắp ra mắt';
  const ctaClass = module.available
    ? 'bg-primary text-on-primary hover:bg-primary-container'
    : 'bg-surface-container-high text-on-surface-variant cursor-not-allowed';

  return `
    <div class="card-elite p-6 md:p-8 flex flex-col h-full">
      <div class="flex items-start gap-4 mb-4">
        <span class="material-symbols-outlined text-3xl text-primary">${escapeHtml(module.icon)}</span>
        <div class="flex-1 min-w-0">
          <span class="text-label-caps font-ui font-bold text-on-surface-variant uppercase tracking-widest">${escapeHtml(module.title)}</span>
          <h3 class="font-headline font-bold text-headline-sm text-on-surface mt-1">${escapeHtml(module.shortName)}</h3>
        </div>
      </div>
      <p class="text-body-md text-on-surface-variant mb-6 flex-1">${escapeHtml(module.description)}</p>
      <div class="mt-auto">
        <div class="flex items-center justify-between mb-4">
          <span class="text-label-sm font-ui text-on-surface-variant">
            ${module.totalActivities > 0 ? `${module.completed}/${module.totalActivities} activities` : 'Sắp ra mắt'}
          </span>
          ${isDone ? '<span class="material-symbols-outlined text-success-emerald">check_circle</span>' : ''}
        </div>
        ${module.totalActivities > 0 ? `
          <div class="h-1.5 rounded-full bg-outline-variant overflow-hidden mb-5">
            <div class="h-full bg-primary rounded-full transition-all" style="width: ${progress}%"></div>
          </div>
        ` : ''}
        <button id="module-select-${module.id}" class="w-full px-5 py-3 rounded-lg font-ui font-bold transition-colors min-h-[44px] ${ctaClass}">
          ${ctaLabel}
        </button>
      </div>
    </div>
  `;
}
