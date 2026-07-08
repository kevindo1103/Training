/**
 * landing.js — Landing page cho Module 1
 * Hero section, bento grid, module sidebar, footer
 * Content từ issue #63 (tiếng Việt)
 */

// Module list — 5 canonical modules + 1 placeholder awaiting final name
export const MODULES = [
  { id: "module1", title: "Module 1", name: "Tái Cấu Trúc Mô Hình Kinh Doanh", icon: "corporate_fare", active: true },
  { id: "module2", title: "Module 2", name: "Product / Service Portfolio", icon: "widgets", active: false },
  { id: "module3", title: "Module 3", name: "Business Development", icon: "trending_up", active: false },
  { id: "module4", title: "Module 4", name: "Organization & Operation", icon: "account_tree", active: false },
  { id: "module5", title: "Module 5", name: "Product Development Lifecycle", icon: "cycle", active: false },
  { id: "module6", title: "Module 6", name: "Tổng Kết & Lộ Trình (cần xác nhận)", icon: "flag", active: false },
];

export function renderLandingSideBar(isOpen, onToggle) {
  const aside = document.createElement('aside');
  aside.className = `fixed top-16 left-0 bottom-0 md:bottom-0 w-72 bg-surface-container-lowest border-r border-outline-variant/50 z-50 transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`;

  const header = document.createElement('div');
  header.className = 'px-6 py-5';
  header.innerHTML = `
    <h2 class="font-headline font-bold text-headline-sm text-on-surface">Dolphin Training</h2>
    <span class="text-label-caps font-ui font-bold text-on-surface-variant uppercase tracking-widest">6 Modules</span>
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

export function renderLandingPage(container, onStart) {
  if (!container) return;

  container.innerHTML = `
    <div class="max-w-learning mx-auto px-5 md:px-12 py-8 md:py-section">
      <!-- Hero Section -->
      <section class="flex flex-col md:flex-row items-center gap-8 md:gap-12 mb-12 md:mb-section">
        <div class="flex-1 text-center md:text-left">
          <span class="inline-block px-3 py-1 rounded-full bg-primary-container/20 text-primary font-label-caps text-label-caps uppercase tracking-widest mb-4">MODULE 01</span>
          <h1 class="font-headline font-extrabold text-headline-lg-mobile md:text-headline-lg text-on-surface mb-6">Tái cấu trúc Mô hình Kinh doanh</h1>
          <p class="text-body-md md:text-body-lg text-on-surface-variant mb-8 max-w-2xl">
            Chào mừng quý vị đến với bước đầu tiên trong hành trình chuyển đổi của Dolphin Technology. Chúng ta đang định hướng lại chiến lược cốt lõi để trở thành doanh nghiệp dẫn đầu trong lĩnh vực phát triển sản phẩm công nghệ.
          </p>
          <button id="landing-start-btn" class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-ui font-bold hover:bg-primary-container transition-colors min-h-[44px]">
            <span class="material-symbols-outlined">play_arrow</span>
            Bắt đầu học
          </button>
        </div>
        <div class="flex-1 w-full max-w-md md:max-w-none">
          <div class="aspect-[4/3] rounded-2xl bg-surface-container-high border border-outline-variant/50 flex items-center justify-center overflow-hidden">
            <span class="material-symbols-outlined text-8xl text-primary/20">corporate_fare</span>
          </div>
        </div>
      </section>

      <!-- Bento Grid -->
      <section class="grid grid-cols-12 gap-4 md:gap-5 mb-12 md:mb-section">
        <!-- Card 1: Bối cảnh (7 cols) -->
        <div class="col-span-12 md:col-span-7 card-elite p-6 md:p-8 hover:shadow-card-hover transition-shadow">
          <div class="flex items-center gap-3 mb-4">
            <span class="material-symbols-outlined text-2xl text-primary">corporate_fare</span>
            <h3 class="font-headline font-bold text-headline-sm text-on-surface">Bối cảnh</h3>
          </div>
          <p class="text-body-md text-on-surface-variant">
            Dolphin Technology đang trong giai đoạn chuyển mình. Chúng ta đang chuyển từ mô hình <strong>"xưởng phần mềm"</strong> sang mô hình <strong>"công ty sản phẩm"</strong> thực thụ. Điều này đòi hỏi sự thay đổi căn bản trong cách chúng ta xây dựng, vận hành và mang lại giá trị cho khách hàng.
          </p>
        </div>

        <!-- Card 2: Thời lượng (5 cols) -->
        <div class="col-span-12 md:col-span-5 card-elite p-6 md:p-8 bg-secondary-container/30 hover:shadow-card-hover transition-shadow">
          <div class="flex items-center gap-3 mb-4">
            <span class="material-symbols-outlined text-2xl text-secondary">schedule</span>
            <h3 class="font-headline font-bold text-headline-sm text-on-surface">Thời lượng</h3>
          </div>
          <p class="text-body-md text-on-surface-variant">
            <strong class="text-on-surface text-headline-md">25–30</strong> phút<br>
            Được thiết kế phù hợp với lịch trình của ban lãnh đạo.
          </p>
        </div>

        <!-- Card 3: Vì sao là quý vị? (6 cols) -->
        <div class="col-span-12 md:col-span-6 card-elite p-6 md:p-8 hover:shadow-card-hover transition-shadow">
          <div class="flex items-center gap-3 mb-4">
            <span class="material-symbols-outlined text-2xl text-primary">person_pin</span>
            <h3 class="font-headline font-bold text-headline-sm text-on-surface">Vì sao là quý vị?</h3>
          </div>
          <p class="text-body-md text-on-surface-variant">
            Với vai trò lãnh đạo tại Dolphin, góc nhìn của quý vị có ý nghĩa then chốt. Module này tập trung vào tầm nhìn chiến lược mà quý vị sẽ triển khai cùng đội ngũ, nhằm hiện thực hóa định hướng ưu tiên sản phẩm của công ty.
          </p>
        </div>

        <!-- Card 4: Cam kết của chúng tôi (6 cols) -->
        <div class="col-span-12 md:col-span-6 card-elite p-6 md:p-8 hover:shadow-card-hover transition-shadow">
          <div class="flex items-center gap-3 mb-4">
            <span class="material-symbols-outlined text-2xl text-success-emerald">verified_user</span>
            <h3 class="font-headline font-bold text-headline-sm text-on-surface">Cam kết của chúng tôi</h3>
          </div>
          <p class="text-body-md text-on-surface-variant">
            Mọi phản hồi của quý vị trong quá trình đánh giá này đều được <strong>bảo mật hoàn toàn</strong>. Chúng tôi trân trọng những nhận định trung thực từ cấp lãnh đạo để hoàn thiện chiến lược tái cấu trúc.
          </p>
        </div>
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

  const startBtn = document.getElementById('landing-start-btn');
  if (startBtn && typeof onStart === 'function') {
    startBtn.addEventListener('click', onStart);
  }
}

function escapeHtml(text) {
  if (text == null) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
