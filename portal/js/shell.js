/**
 * shell.js — Core orchestrator
 * Boot sequence, layout, navigation, entry form, renderer dispatch
 */

import { MODULE_CONFIG } from './modules/module1.config.js';
import {
  initStore,
  setParticipant,
  getState,
  getResponse,
  mergeResponse,
  markIntroSeen,
  isIntroSeen,
  setOnPersist,
} from './store.js';
import { renderTopBar } from './components/topbar.js';
import { renderSideBar } from './components/sidebar.js';
import { renderBottomBar } from './components/bottombar.js';
import { showToast } from './components/toast.js';

const config = MODULE_CONFIG;

const THEME_KEY = 'dolphin_theme';

const appState = {
  currentIndex: 0,
  sidebarOpen: false,
  isDark: false,
};

let appContainer = null;

/**
 * Public boot function
 */
export async function boot() {
  initTheme();
  await initStore();
  setOnPersist(() => showToast('Đã lưu nháp'));
  appContainer = document.getElementById('app');
  renderShell();
  checkEntry();
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

  const completedIds = getCompletedIds();

  const topbar = renderTopBar(config, toggleSidebar, toggleTheme, appState.isDark);
  const sidebar = renderSideBar(config, appState.currentIndex, completedIds, navigateTo, appState.sidebarOpen);
  const bottombar = renderBottomBar(appState.currentIndex, config.activities.length, goBack, goNext);

  const main = document.createElement('main');
  main.id = 'activity-content';
  main.className = 'pt-20 pb-24 md:pb-20 md:pl-80 min-h-screen bg-surface-taupe';

  const overlay = document.createElement('div');
  overlay.className = `fixed inset-0 bg-surface/50 backdrop-blur-sm z-40 md:hidden transition-opacity ${appState.sidebarOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`;
  overlay.addEventListener('click', closeSidebar);

  appContainer.appendChild(topbar);
  appContainer.appendChild(sidebar);
  appContainer.appendChild(overlay);
  appContainer.appendChild(main);
  appContainer.appendChild(bottombar);
}

function getCompletedIds() {
  const state = getState();
  const completed = new Set();
  config.activities.forEach((activity) => {
    const data = state.responses[activity.id];
    if (data && Object.keys(data).length > 0) {
      completed.add(activity.id);
    }
  });
  return completed;
}

function toggleSidebar() {
  appState.sidebarOpen = !appState.sidebarOpen;
  renderShell();
  renderActivity();
}

function closeSidebar() {
  appState.sidebarOpen = false;
  renderShell();
  renderActivity();
}

/* ---------- Navigation ---------- */

function navigateTo(index) {
  if (index < 0 || index >= config.activities.length) return;
  appState.currentIndex = index;
  appState.sidebarOpen = false;
  renderShell();
  renderActivity();
}

function goBack() {
  navigateTo(appState.currentIndex - 1);
}

function goNext() {
  if (appState.currentIndex === config.activities.length - 1) {
    showCompletion();
    return;
  }
  navigateTo(appState.currentIndex + 1);
}

function showCompletion() {
  const content = document.getElementById('activity-content');
  if (!content) return;
  content.innerHTML = `
    <div class="max-w-3xl mx-auto p-6 md:p-12">
      <div class="bg-surface-container-lowest rounded-2xl p-8 md:p-12 shadow-card border border-outline-variant text-center">
        <span class="material-symbols-outlined text-5xl text-success-emerald mb-4">check_circle</span>
        <h2 class="text-headline-md font-headline font-bold text-on-surface mb-4">Đã hoàn thành Module 1</h2>
        <p class="text-body-md text-on-surface-variant mb-6">Cảm ơn bạn đã hoàn thành các activity. Dữ liệu đã được lưu tự động.</p>
        <button id="back-to-first" class="px-6 py-3 rounded-lg bg-primary text-on-primary font-ui font-bold hover:bg-primary-container">Xem lại từ đầu</button>
      </div>
    </div>
  `;
  document.getElementById('back-to-first').addEventListener('click', () => navigateTo(0));
}

/* ---------- Entry form ---------- */

function checkEntry() {
  const state = getState();
  if (state.participant) {
    renderActivity();
    return;
  }
  showEntryForm();
}

function showEntryForm() {
  const content = document.getElementById('activity-content');
  if (!content) return;
  content.innerHTML = `
    <div class="fixed inset-0 bg-surface/90 backdrop-blur z-50 flex items-center justify-center p-4">
      <div class="bg-surface-container-lowest rounded-2xl shadow-overlay max-w-md w-full p-6 md:p-8 border border-outline-variant">
        <h2 class="text-headline-md font-headline font-bold text-on-surface mb-2">Tham gia workshop</h2>
        <p class="text-body-md text-on-surface-variant mb-6">Nhập thông tin để bắt đầu Module 1.</p>
        <form id="entry-form" class="space-y-4">
          <div>
            <label class="block text-label-sm font-ui font-semibold text-on-surface-variant mb-1">Họ và tên</label>
            <input name="name" type="text" required autocomplete="name"
              class="w-full px-4 py-3 rounded-lg bg-surface-container border border-outline text-on-surface placeholder-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              placeholder="Ví dụ: Nguyễn Văn A">
          </div>
          <div>
            <label class="block text-label-sm font-ui font-semibold text-on-surface-variant mb-1">Vai trò</label>
            <select name="role" required
              class="w-full px-4 py-3 rounded-lg bg-surface-container border border-outline text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary">
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
    const res = await api.post('/sessions/join', { moduleId: config.moduleId, name, role });
    if (res?.participant_id) {
      participantId = res.participant_id;
      sessionId = res.session_id;
      token = res.token;
    }
  } catch (err) {
    console.log('Join session API failed, continuing offline', err);
  }
  setParticipant(name, role, participantId, sessionId, token);
  renderActivity();
}

/* ---------- Activity rendering ---------- */

function renderActivity() {
  const content = document.getElementById('activity-content');
  if (!content) return;
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
    <div class="max-w-3xl mx-auto p-4 md:p-12">
      <div class="bg-surface-container-lowest rounded-2xl p-6 md:p-12 shadow-card border border-outline-variant">
        <span class="material-symbols-outlined text-5xl text-primary mb-4">${escapeHtml(activity.icon)}</span>
        <h2 class="text-headline-md font-headline font-bold text-on-surface mb-2">${escapeHtml(activity.title)}</h2>
        ${estimatedTime ? `<p class="text-label-sm font-ui font-semibold text-primary mb-4">⏱ ${escapeHtml(estimatedTime)}</p>` : ''}
        <div class="text-body-md text-on-surface-variant mb-8 space-y-2">
          <p><strong>Mục đích:</strong> ${escapeHtml(purpose)}</p>
          <p><strong>Cách làm:</strong> ${escapeHtml(howTo)}</p>
          <p><strong>Ví dụ:</strong> ${escapeHtml(example)}</p>
        </div>
        <button id="start-activity" class="px-6 py-3 rounded-lg bg-primary text-on-primary font-ui font-bold hover:bg-primary-container min-h-[44px]">Bắt đầu</button>
      </div>
    </div>
  `;
  document.getElementById('start-activity').addEventListener('click', () => {
    markIntroSeen(activity.id);
    renderActivity();
  });
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

function dispatchRenderer(activity, data, container) {
  import(`./renderers/${activity.type}.js`)
    .then((mod) => {
      if (typeof mod.render === 'function') {
        mod.render(container, activity, data, (newData) => {
          mergeResponse(activity.id, newData, activity.type);
        });
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
