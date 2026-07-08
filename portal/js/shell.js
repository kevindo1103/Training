/**
 * shell.js — Core orchestrator
 * Boot sequence, layout, navigation, entry form, renderer dispatch
 */

import { MODULE_CONFIG as module1Config } from './modules/module1.config.js';
import module2Config from './modules/module2.config.js';
import {
  initStore,
  setParticipant,
  getState,
  getResponse,
  mergeResponse,
  markIntroSeen,
  isIntroSeen,
} from './store.js';
import { renderTopBar } from './components/topbar.js';
import { renderSideBar } from './components/sidebar.js';
import { renderBottomBar } from './components/bottombar.js';
import { showToast } from './components/toast.js';
import { renderHomePage, renderHomeSideBar, MODULES } from './components/landing.js';
import { escapeHtml } from './utils/dom.js';

let config = module1Config;

const THEME_KEY = 'dolphin_theme';

// Returns the navigable items list regardless of module type
function getItems() {
  return config.activities || config.units || [];
}

const appState = {
  currentIndex: 0,
  sidebarOpen: false,
  isDark: false,
  view: 'landing', // 'landing' | 'entry' | 'activity'
};

let appContainer = null;

/**
 * Public boot function
 */
export async function boot() {
  initTheme();
  await initStore();
  appContainer = document.getElementById('app');

  await resolveRoute();
}

async function resolveRoute() {
  const state = getState();
  const moduleConfig = await loadConfig();

  if (moduleConfig) {
    config = moduleConfig;
    if (state.participant) {
      appState.view = 'activity';
      renderShell();
      renderActivity();
    } else {
      appState.view = 'entry';
      renderShell();
    }
    return;
  }

  // Clear stale ?module from URL after failed config load to avoid repeated toasts on refresh
  if (window.location.search) {
    history.replaceState({}, '', window.location.pathname);
  }

  // No ?module param: show home (module selector) if logged in, else entry form
  appState.view = state.participant ? 'landing' : 'entry';
  renderShell();
  if (appState.view === 'activity') {
    renderActivity();
  }
}

async function loadConfig() {
  const params = new URLSearchParams(window.location.search);
  const moduleId = params.get('module');
  if (!moduleId) return null;

  if (moduleId === '1') {
    return module1Config;
  }

  try {
    const mod = await import(`./modules/module${moduleId}.config.js`);
    return mod.MODULE_CONFIG || mod.default || null;
  } catch (err) {
    console.error(`Failed to load module${moduleId}.config.js`, err);
    showToast('Module không tồn tại hoặc chưa sẵn sàng');
    return null;
  }
}

/* ---------- Theme ---------- */

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === 'dark' || saved === 'light') {
    appState.isDark = saved === 'dark';
  } else if (window.matchMedia) {
    appState.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  applyTheme();

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem(THEME_KEY)) {
      appState.isDark = e.matches;
      applyTheme();
      renderShell();
    }
  });
}

function applyTheme() {
  document.documentElement.classList.toggle('dark', appState.isDark);
}

function toggleTheme() {
  appState.isDark = !appState.isDark;
  localStorage.setItem(THEME_KEY, appState.isDark ? 'dark' : 'light');
  applyTheme();
  const icon = document.querySelector('#theme-toggle .material-symbols-outlined');
  if (icon) icon.textContent = appState.isDark ? 'light_mode' : 'dark_mode';
}

/* ---------- Layout ---------- */

function renderShell() {
  if (!appContainer) return;
  appContainer.innerHTML = '';

  const topbar = renderTopBar(config, toggleSidebar, toggleTheme, appState.isDark);
  appContainer.appendChild(topbar);

  if (appState.view === 'landing') {
    const state = getState();
    const moduleStatus = computeModuleStatus(state);
    const homeSidebar = renderHomeSideBar(appState.sidebarOpen, closeSidebar);
    const main = document.createElement('main');
    main.id = 'activity-content';
    main.className = 'pt-16 pb-0 md:pl-72 min-h-screen bg-surface-taupe';

    const overlay = document.createElement('div');
    overlay.className = `fixed inset-0 bg-surface/50 backdrop-blur-sm z-40 md:hidden transition-opacity ${appState.sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
    overlay.addEventListener('click', closeSidebar);

    appContainer.appendChild(homeSidebar);
    appContainer.appendChild(overlay);
    appContainer.appendChild(main);

    renderHomePage(main, state.participant, moduleStatus, (moduleId) => {
      window.location.search = `?module=${moduleId}`;
    });
    return;
  }

  if (appState.view === 'entry') {
    const main = document.createElement('main');
    main.id = 'activity-content';
    main.className = 'pt-16 min-h-screen bg-surface-taupe';
    appContainer.appendChild(main);
    showEntryForm();
    return;
  }

  const completedIds = getCompletedIds();
  const items = getItems();
  const sidebar = renderSideBar(config, appState.currentIndex, completedIds, navigateTo, appState.sidebarOpen, config.activities ? showSummary : null);
  const isSummary = items.length > 0 && appState.currentIndex >= items.length;
  const bottombar = renderBottomBar(isSummary ? items.length - 1 : appState.currentIndex, items.length, goBack, isSummary ? null : goNext);

  const main = document.createElement('main');
  main.id = 'activity-content';
  main.className = 'pt-16 pb-20 md:pb-16 md:pl-72 min-h-screen bg-surface-taupe';

  const overlay = document.createElement('div');
  overlay.className = `fixed inset-0 bg-surface/50 backdrop-blur-sm z-40 md:hidden transition-opacity ${appState.sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
  overlay.addEventListener('click', closeSidebar);

  appContainer.appendChild(sidebar);
  appContainer.appendChild(overlay);
  appContainer.appendChild(main);
  appContainer.appendChild(bottombar);
}

function getCompletedIds() {
  const state = getState();
  const completed = new Set();
  if (config.activities) {
    config.activities.forEach((activity) => {
      const data = state.responses[activity.id];
      if (data && Object.keys(data).length > 0) completed.add(activity.id);
    });
  } else if (config.units) {
    const unitResponses = state.unitResponses?.[config.id] || {};
    config.units.forEach((unit) => {
      const data = unitResponses[unit.id];
      if (data && Object.keys(data).length > 0) completed.add(unit.id);
    });
  }
  return completed;
}

function computeModuleStatus(state) {
  const totalActivities = MODULES.reduce((sum, mod) => {
    return sum + (mod.totalActivities || 0);
  }, 0);
  return MODULES.map((module) => {
    const status = {
      ...module,
      completed: 0,
      available: module.id === 'module1' || module.id === 'module2',
      totalActivities: module.totalActivities || 0,
      programTotal: totalActivities,
    };
    if (module.id === 'module1') {
      status.totalActivities = module1Config.activities.length;
      status.completed = module1Config.activities.filter((activity) => {
        const data = state.responses[activity.id];
        return data && Object.keys(data).length > 0;
      }).length;
    }
    if (module.id === 'module2') {
      const units = module2Config.units || [];
      status.totalActivities = units.length;
      const m2Responses = state.unitResponses?.module2 || {};
      status.completed = units.filter((unit) => {
        const data = m2Responses[unit.id];
        return data && Object.keys(data).length > 0;
      }).length;
    }
    return status;
  });
}

function toggleSidebar() {
  appState.sidebarOpen = !appState.sidebarOpen;
  renderShell();
  if (appState.view === 'activity') {
    renderActivity();
  }
}

function closeSidebar() {
  appState.sidebarOpen = false;
  renderShell();
  if (appState.view === 'activity') {
    renderActivity();
  }
}

/* ---------- Navigation ---------- */

function navigateTo(index) {
  const len = getItems().length;
  if (index < 0 || index >= len) return;
  appState.currentIndex = index;
  appState.sidebarOpen = false;
  renderShell();
  renderActivity();
}

function goBack() {
  const len = getItems().length;
  if (appState.currentIndex > len - 1) {
    navigateTo(len - 1);
    return;
  }
  navigateTo(appState.currentIndex - 1);
}

function goNext() {
  const len = getItems().length;
  if (appState.currentIndex === len - 1) {
    showSummary();
    return;
  }
  navigateTo(appState.currentIndex + 1);
}

function showSummary() {
  appState.currentIndex = getItems().length;
  appState.sidebarOpen = false;
  renderShell();
  renderActivity();
}

/* ---------- Entry form ---------- */

function showEntryForm() {
  const content = document.getElementById('activity-content');
  if (!content) return;
  content.innerHTML = `
    <div class="fixed inset-0 bg-surface-taupe/95 backdrop-blur-sm z-50 flex items-center justify-center p-5">
      <div class="card-elite shadow-overlay max-w-md w-full p-8 md:p-10">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-on-primary font-headline font-bold">D</div>
          <div>
            <h2 class="text-headline-md font-headline font-bold text-on-surface">Tham gia workshop</h2>
            <p class="text-label-sm text-on-surface-variant">Module 1 — Business Model</p>
          </div>
        </div>
        <form id="entry-form" class="space-y-5">
          <div>
            <label class="block text-label-sm font-ui font-semibold text-on-surface-variant mb-1.5">Họ và tên</label>
            <input name="name" type="text" required autocomplete="name"
              class="w-full px-4 py-3 rounded-lg bg-surface-container-low border-[1.5px] border-outline-variant text-on-surface placeholder-on-surface-variant/60"
              placeholder="Ví dụ: Nguyễn Văn A">
          </div>
          <div>
            <label class="block text-label-sm font-ui font-semibold text-on-surface-variant mb-1.5">Vai trò</label>
            <select name="role" required
              class="w-full px-4 py-3 rounded-lg bg-surface-container-low border-[1.5px] border-outline-variant text-on-surface">
              <option value="">Chọn vai trò</option>
              <option value="CEO">CEO</option>
              <option value="CTO">CTO</option>
              <option value="PM">PM</option>
              <option value="BD">BD</option>
            </select>
          </div>
          <button type="submit" class="w-full px-5 py-3 rounded-lg bg-primary text-on-primary font-ui font-bold hover:bg-primary-container transition-colors min-h-[44px]">Bắt đầu</button>
        </form>
      </div>
    </div>
  `;

  document.getElementById('entry-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const name = formData.get('name').trim();
    const role = formData.get('role');
    if (!name || !role) return;
    await joinSession(name, role);
  });
}

async function joinSession(name, role) {
  let participantId = null;
  let sessionId = null;
  let token = null;
  try {
    const { api } = await import('./api.js');
    const res = await api.post('/sessions/join', { moduleId: 'workshop', name, role });
    if (res?.participant_id) {
      participantId = res.participant_id;
      sessionId = res.session_id;
      token = res.token;
    }
  } catch (err) {
    console.log('Join session API failed, continuing offline', err);
  }
  setParticipant(name, role, participantId, sessionId, token);
  await resolveRoute();
}

/* ---------- Activity rendering ---------- */

function renderActivity() {
  const content = document.getElementById('activity-content');
  if (!content) return;

  // Unit-based modules (M2+)
  if (config.units) {
    const units = config.units;
    if (appState.currentIndex >= units.length) {
      content.innerHTML = `
        <div class="max-w-reading mx-auto px-5 py-8 md:py-section text-center">
          <div class="card-elite p-8 md:p-12 context-stripe">
            <span class="material-symbols-outlined text-5xl text-success-emerald mb-6">check_circle</span>
            <h2 class="text-headline-md font-headline font-bold text-on-surface mb-4">Hoàn thành ${escapeHtml(config.moduleTitle || config.title || 'Module')}</h2>
            <p class="text-body-md text-on-surface-variant">Bạn đã hoàn thành tất cả ${units.length} units của module này.</p>
          </div>
        </div>
      `;
      return;
    }
    const unit = units[appState.currentIndex];
    import('./components/unit-stepper.js').then(({ UnitStepper }) => {
      const stepper = new UnitStepper(unit, content, () => goNext());
      stepper.render();
    });
    return;
  }

  if (appState.currentIndex >= config.activities.length) {
    import('./renderers/summary.js').then((mod) => {
      const state = getState();
      mod.render(content, state.responses || {}, config);
    });
    return;
  }

  const activity = config.activities[appState.currentIndex];
  const data = getResponse(activity.id);

  if (!isIntroSeen(activity.id)) {
    renderIntro(activity, content);
    return;
  }

  dispatchRenderer(activity, data, content);
}

function renderIntro(activity, container) {
  const intro = activity.intro || {};
  const purpose = intro.purpose || 'Hoàn thành activity này để chuẩn bị dữ liệu cho workshop.';
  const howTo = intro.howTo || 'Đọc kỹ từng phần, điền thông tin theo thực tế của Dolphin.';
  const example = intro.example || 'Nếu chưa có số liệu chính xác, hãy dùng ước tính tốt nhất.';
  const estimatedTime = intro.estimatedTime || '';

  container.innerHTML = `
    <div class="max-w-reading mx-auto px-5 py-8 md:py-section">
      <div class="card-elite p-8 md:p-12 context-stripe">
        <span class="material-symbols-outlined text-5xl text-primary mb-6">${escapeHtml(activity.icon)}</span>
        <h2 class="text-headline-md font-headline font-bold text-on-surface mb-2">${escapeHtml(activity.title)}</h2>
        ${estimatedTime ? `<p class="text-label-caps font-ui text-primary uppercase tracking-widest mb-6">${escapeHtml(estimatedTime)}</p>` : ''}
        <div class="text-body-md text-on-surface-variant mb-8 space-y-3">
          <p><span class="font-bold text-on-surface">Mục đích:</span> ${escapeHtml(purpose)}</p>
          <p><span class="font-bold text-on-surface">Cách làm:</span> ${escapeHtml(howTo)}</p>
          <p><span class="font-bold text-on-surface">Ví dụ:</span> ${escapeHtml(example)}</p>
        </div>
        <button id="start-activity" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-ui font-bold hover:bg-primary-container transition-colors min-h-[44px]">
          Bắt đầu <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  `;
  document.getElementById('start-activity').addEventListener('click', () => {
    markIntroSeen(activity.id);
    renderActivity();
  });
}

function dispatchRenderer(activity, data, container) {
  import(`./renderers/${activity.type}.js`)
    .then((mod) => {
      if (typeof mod.render === 'function') {
        mod.render(container, activity, data, (newData) => {
          mergeResponse(activity.id, newData, activity.type);
        }, config);
      } else {
        showPlaceholder(container, activity);
      }
    })
    .catch(() => showPlaceholder(container, activity));
}

function showPlaceholder(container, activity) {
  container.innerHTML = `
    <div class="max-w-3xl mx-auto p-4 md:p-12">
      <div class="bg-surface-container-lowest rounded-2xl p-6 md:p-12 shadow-card border border-outline-variant text-center">
        <span class="material-symbols-outlined text-4xl text-on-surface-variant mb-4">hourglass_empty</span>
        <h2 class="text-headline-sm font-headline font-bold text-on-surface mb-2">Activity content loading...</h2>
        <p class="text-body-md text-on-surface-variant">Renderer cho activity type "${activity.type}" chưa được build.</p>
      </div>
    </div>
  `;
}
