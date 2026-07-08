function escapeHtml(text) {
  if (text == null) return '';
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function render(container, responses, moduleConfig) {
  const products = (moduleConfig && moduleConfig.products) || [];
  const criteria = (moduleConfig && moduleConfig.scoringCriteria) || [];

  const diagnosticData = responses['activity_1'] || {};
  const matrixData = responses['activity_4'] || {};
  const iwkData = responses['activity_5'] || {};
  const financialData = responses['activity_6'] || {};

  container.innerHTML = `
    <div class="max-w-reading mx-auto px-5 py-8 md:py-section space-y-6">
      <div class="text-center mb-4">
        <span class="material-symbols-outlined text-5xl text-primary mb-3">summarize</span>
        <h2 class="text-headline-md font-headline font-bold text-on-surface mb-1">Tổng kết Module 1</h2>
        <p class="text-body-md text-on-surface-variant">Kết quả chẩn đoán và quyết định chiến lược của bạn</p>
      </div>
      <div id="summary-diagnostic"></div>
      <div id="summary-ranking"></div>
      <div id="summary-iwk"></div>
      <div id="summary-financial"></div>
      <div class="flex justify-center pt-4">
        <button id="export-btn" class="flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-ui font-bold hover:bg-primary-container transition-colors min-h-[44px]">
          <span class="material-symbols-outlined text-[20px]">download</span>
          Xuất kết quả (.json)
        </button>
      </div>
    </div>
  `;

  renderDiagnostic(container.querySelector('#summary-diagnostic'), diagnosticData);
  renderRanking(container.querySelector('#summary-ranking'), matrixData, products, criteria);
  renderIWK(container.querySelector('#summary-iwk'), iwkData, products);
  renderFinancial(container.querySelector('#summary-financial'), financialData);

  container.querySelector('#export-btn').addEventListener('click', () => {
    exportJson(responses, moduleConfig);
  });
}

function renderDiagnostic(el, data) {
  const total = data.totalScore || 0;
  const answers = data.answers || {};
  const answered = Object.keys(answers).filter(k => answers[k] > 0).length;

  let level, label, description, bgClass, textClass;
  if (total <= 15) {
    level = 'success';
    label = 'Ổn định';
    description = 'Mô hình hiện tại tương đối bền vững, nhưng vẫn nên chuẩn bị chuyển đổi.';
    bgClass = 'bg-green-50';
    textClass = 'text-success-emerald';
  } else if (total <= 30) {
    level = 'warning';
    label = 'Cần chuyển đổi';
    description = 'Có dấu hiệu rõ ràng cần thay đổi mô hình kinh doanh.';
    bgClass = 'bg-amber-50';
    textClass = 'text-amber-600';
  } else {
    level = 'error';
    label = 'Khẩn cấp';
    description = 'Mô hình hiện tại có nhiều rủi ro — cần hành động ngay.';
    bgClass = 'bg-red-50';
    textClass = 'text-error';
  }

  el.innerHTML = `
    <div class="card-elite overflow-hidden context-stripe">
      <div class="p-6 md:p-8">
        <div class="flex items-center gap-2 mb-5">
          <span class="material-symbols-outlined text-primary">analytics</span>
          <h3 class="text-headline-sm font-headline font-bold text-on-surface">Chẩn đoán mô hình</h3>
        </div>
        <div class="flex items-center gap-5 mb-5">
          <div class="text-center">
            <p class="text-[36px] font-headline font-bold leading-none ${textClass}">${total}</p>
            <p class="text-label-sm text-on-surface-variant mt-1">/50 điểm</p>
          </div>
          <div class="flex-1">
            <div class="progress-track h-[6px]">
              <div class="progress-fill h-full ${level === 'success' ? '!bg-success-emerald' : level === 'warning' ? '!bg-amber-500' : '!bg-error'}" style="width: ${(total / 50) * 100}%"></div>
            </div>
            <p class="text-label-sm text-on-surface-variant mt-1.5">${answered}/10 câu đã trả lời</p>
          </div>
        </div>
        <div class="${bgClass} rounded-lg p-4">
          <p class="${textClass} font-ui font-bold text-body-md">${escapeHtml(label)}</p>
          <p class="text-label-sm text-on-surface-variant mt-1">${escapeHtml(description)}</p>
        </div>
      </div>
    </div>
  `;
}

function renderRanking(el, data, products, criteria) {
  const scores = data.scores || {};

  function calcWeightedScore(productId) {
    const productScores = scores[productId] || {};
    return criteria.reduce((total, c) => {
      const score = productScores[c.id] || 0;
      return total + score * c.weight;
    }, 0);
  }

  const ranking = products
    .map(p => ({
      id: p.id,
      name: p.name,
      icon: p.icon,
      score: Math.round(calcWeightedScore(p.id) * 100) / 100,
    }))
    .sort((a, b) => b.score - a.score);

  let itemsHtml = '';
  ranking.forEach((item, index) => {
    const isTop = index === 0 && item.score > 0;
    itemsHtml += `
      <div class="flex items-center gap-3 p-3 rounded-lg ${isTop ? 'bg-accent-teal-soft' : ''}">
        <span class="w-7 h-7 rounded-full flex items-center justify-center text-label-sm font-bold ${isTop ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}">${index + 1}</span>
        <span class="material-symbols-outlined text-[20px] ${isTop ? 'text-primary' : 'text-on-surface-variant'}">${escapeHtml(item.icon)}</span>
        <span class="flex-1 text-body-md font-ui ${isTop ? 'font-bold text-on-surface' : 'text-on-surface'}">${escapeHtml(item.name)}</span>
        <span class="text-headline-sm font-headline font-bold ${isTop ? 'text-primary' : 'text-on-surface-variant'}">${item.score}</span>
      </div>`;
  });

  el.innerHTML = `
    <div class="card-elite overflow-hidden context-stripe">
      <div class="p-6 md:p-8">
        <div class="flex items-center gap-2 mb-5">
          <span class="material-symbols-outlined text-primary">leaderboard</span>
          <h3 class="text-headline-sm font-headline font-bold text-on-surface">Xếp hạng sản phẩm</h3>
        </div>
        <div class="space-y-2">${itemsHtml}</div>
      </div>
    </div>
  `;
}

function renderIWK(el, data, products) {
  const decisions = data.decisions || {};
  const colorMap = {
    INVEST: { bg: 'bg-success-emerald', text: 'text-white', label: 'INVEST' },
    WATCH: { bg: 'bg-amber-500', text: 'text-white', label: 'WATCH' },
    KILL: { bg: 'bg-error', text: 'text-white', label: 'KILL' },
  };

  let cardsHtml = '';
  products.forEach(p => {
    const decision = decisions[p.id];
    const badge = decision && colorMap[decision]
      ? `<span class="px-3 py-1 rounded-full text-label-sm font-bold ${colorMap[decision].bg} ${colorMap[decision].text}">${colorMap[decision].label}</span>`
      : `<span class="px-3 py-1 rounded-full text-label-sm font-bold bg-surface-container-high text-on-surface-variant">Chưa chọn</span>`;
    cardsHtml += `
      <div class="flex items-center gap-3 p-3 rounded-lg">
        <span class="material-symbols-outlined text-[20px] text-on-surface-variant">${escapeHtml(p.icon)}</span>
        <span class="flex-1 text-body-md font-ui text-on-surface">${escapeHtml(p.name)}</span>
        ${badge}
      </div>`;
  });

  el.innerHTML = `
    <div class="card-elite overflow-hidden context-stripe">
      <div class="p-6 md:p-8">
        <div class="flex items-center gap-2 mb-5">
          <span class="material-symbols-outlined text-primary">rule</span>
          <h3 class="text-headline-sm font-headline font-bold text-on-surface">Quyết định Invest / Watch / Kill</h3>
        </div>
        <div class="space-y-1">${cardsHtml}</div>
      </div>
    </div>
  `;
}

function renderFinancial(el, data) {
  const fields = data.fields || {};

  const items = [
    { label: 'Doanh thu hiện tại', value: fields['current_revenue'], unit: 'tỷ VNĐ/năm' },
    { label: 'Quy mô team', value: fields['current_team_size'], unit: 'người' },
    { label: 'Revenue/head/tháng', value: fields['current_revenue_per_head'], unit: 'triệu VNĐ', computed: true },
    { label: 'Burn rate (Y1)', value: fields['y1_burn_rate'], unit: 'triệu VNĐ/tháng', computed: true },
    { label: 'Service profit needed (Y1)', value: fields['y1_service_profit_needed'], unit: 'triệu VNĐ/tháng', computed: true },
    { label: 'Runway (Y3)', value: fields['y3_runway'], unit: 'tháng', computed: true },
  ];

  const hasData = items.some(i => i.value !== undefined && i.value !== '' && i.value !== 0);

  let rowsHtml = '';
  items.forEach(item => {
    const val = item.value !== undefined && item.value !== '' ? item.value : '—';
    let runwayClass = '';
    if (item.label.includes('Runway') && typeof item.value === 'number') {
      if (item.value < 6) runwayClass = 'text-error';
      else if (item.value <= 12) runwayClass = 'text-amber-600';
      else runwayClass = 'text-success-emerald';
    }
    rowsHtml += `
      <div class="flex items-center justify-between py-3 border-b border-outline-variant/30 last:border-b-0">
        <span class="text-body-md text-on-surface-variant">${escapeHtml(item.label)}</span>
        <span class="text-body-md font-ui font-bold ${runwayClass || 'text-on-surface'}">${val} ${item.unit ? `<span class="text-label-sm font-normal text-on-surface-variant">${escapeHtml(item.unit)}</span>` : ''}</span>
      </div>`;
  });

  el.innerHTML = `
    <div class="card-elite overflow-hidden context-stripe">
      <div class="p-6 md:p-8">
        <div class="flex items-center gap-2 mb-5">
          <span class="material-symbols-outlined text-primary">account_balance</span>
          <h3 class="text-headline-sm font-headline font-bold text-on-surface">Tài chính</h3>
        </div>
        ${hasData ? rowsHtml : '<p class="text-body-md text-on-surface-variant">Chưa có dữ liệu tài chính.</p>'}
      </div>
    </div>
  `;
}

function exportJson(responses, moduleConfig) {
  const exportData = {
    module: moduleConfig.id,
    moduleTitle: moduleConfig.title,
    exportedAt: new Date().toISOString(),
    responses,
  };
  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dolphin-module1-results-${Date.now()}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
