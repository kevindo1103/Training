function escapeHtml(text) {
  if (text == null) return '';
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function render(container, activity, data, onChange, moduleConfig) {
  const products = (moduleConfig && moduleConfig.products) || [];
  const criteria = (moduleConfig && moduleConfig.scoringCriteria) || [];
  const scale = activity.scale || { min: 1, max: 5, minLabel: 'Thấp', maxLabel: 'Cao' };
  const scores = {};
  products.forEach(p => {
    scores[p.id] = { ...(data?.scores?.[p.id] || {}) };
  });
  let expandedProductId = products[0]?.id || null;

  function calcWeightedScore(productId) {
    const productScores = scores[productId] || {};
    return criteria.reduce((total, c) => {
      const score = productScores[c.id] || 0;
      return total + score * c.weight;
    }, 0);
  }

  function getRanking() {
    return products
      .map(p => ({ id: p.id, name: p.name, icon: p.icon, score: Math.round(calcWeightedScore(p.id) * 100) / 100 }))
      .sort((a, b) => b.score - a.score);
  }

  function emitChange() {
    const weightedTotals = {};
    products.forEach(p => { weightedTotals[p.id] = Math.round(calcWeightedScore(p.id) * 100) / 100; });
    onChange({ scores: JSON.parse(JSON.stringify(scores)), weightedTotals, ranking: getRanking().map(r => r.id) });
  }

  function renderAll() {
    const ranking = getRanking();

    container.innerHTML = `
      <div class="max-w-learning mx-auto px-5 py-8 md:py-12">
        <div class="mb-8">
          <h2 class="text-headline-md font-headline font-bold text-on-surface mb-2">${escapeHtml(activity.title)}</h2>
          <p class="text-body-md text-on-surface-variant">Chấm điểm từ ${scale.min} (${escapeHtml(scale.minLabel)}) đến ${scale.max} (${escapeHtml(scale.maxLabel)}) cho mỗi sản phẩm</p>
        </div>
        <div class="flex flex-col lg:flex-row gap-6">
          <div class="flex-1 min-w-0" id="accordion-cards"></div>
          <div class="w-full lg:w-80 shrink-0" id="ranking-sidebar"></div>
        </div>
      </div>
    `;

    const accordionEl = container.querySelector('#accordion-cards');
    products.forEach(p => accordionEl.appendChild(buildProductCard(p)));

    renderRanking(ranking);
  }

  function buildProductCard(product) {
    const isExpanded = product.id === expandedProductId;
    const card = document.createElement('div');
    card.className = `card-elite mb-4 overflow-hidden ${isExpanded ? 'context-stripe' : 'context-stripe-muted'}`;

    const header = document.createElement('button');
    header.type = 'button';
    header.className = 'w-full flex items-center gap-3 p-5 md:p-6 text-left min-h-[56px]';
    header.innerHTML = `
      <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined text-primary">${escapeHtml(product.icon)}</span>
      </div>
      <div class="flex-1 min-w-0">
        <p class="text-body-md font-ui font-bold text-on-surface">${escapeHtml(product.name)}</p>
        <p class="text-label-sm text-on-surface-variant">${escapeHtml(product.category)}</p>
      </div>
      <span class="text-headline-sm font-headline font-bold text-primary mr-2">${Math.round(calcWeightedScore(product.id) * 100) / 100}</span>
      <span class="material-symbols-outlined text-on-surface-variant transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}">expand_more</span>
    `;
    header.addEventListener('click', () => {
      expandedProductId = expandedProductId === product.id ? null : product.id;
      renderAll();
    });
    card.appendChild(header);

    if (isExpanded) {
      const body = document.createElement('div');
      body.className = 'px-5 md:px-6 pb-6 space-y-5 border-t border-outline-variant/50 pt-5';
      criteria.forEach(c => body.appendChild(buildCriterionRow(product, c)));
      card.appendChild(body);
    }

    return card;
  }

  function buildCriterionRow(product, criterion) {
    const row = document.createElement('div');
    const currentScore = scores[product.id]?.[criterion.id] || 0;
    const weightPct = Math.round(criterion.weight * 100);

    row.innerHTML = `
      <div class="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
        <div class="flex-1 min-w-0">
          <span class="text-body-md font-ui font-semibold text-on-surface">${escapeHtml(criterion.label)}</span>
          <span class="text-label-caps text-primary font-bold ml-2 uppercase">${weightPct}%</span>
          ${criterion.description ? `<p class="text-label-sm text-on-surface-variant mt-0.5">${escapeHtml(criterion.description)}</p>` : ''}
        </div>
        <div class="flex items-center gap-1.5 shrink-0 pills-row"></div>
      </div>
    `;

    const pillsRow = row.querySelector('.pills-row');
    const pillCount = scale.max - scale.min + 1;
    for (let i = 0; i < pillCount; i++) {
      const val = scale.min + i;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = val;
      btn.dataset.value = val;
      const isActive = val === currentScore;
      btn.className = `scoring-pill w-10 h-10 rounded-full border-[1.5px] text-body-md font-ui font-semibold cursor-pointer focus-ring ${isActive ? 'active-pill' : 'bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:border-primary'}`;
      btn.addEventListener('click', () => {
        scores[product.id][criterion.id] = val;
        pillsRow.querySelectorAll('.scoring-pill').forEach(p => {
          const pVal = parseInt(p.dataset.value, 10);
          if (pVal === val) {
            p.className = 'scoring-pill w-10 h-10 rounded-full border-[1.5px] text-body-md font-ui font-semibold cursor-pointer focus-ring active-pill';
          } else {
            p.className = 'scoring-pill w-10 h-10 rounded-full border-[1.5px] text-body-md font-ui font-semibold cursor-pointer focus-ring bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:border-primary';
          }
        });
        const headerScore = row.closest('.card-elite')?.querySelector('.text-primary.mr-2');
        if (headerScore) headerScore.textContent = Math.round(calcWeightedScore(product.id) * 100) / 100;
        renderRanking(getRanking());
        emitChange();
      });
      pillsRow.appendChild(btn);
    }

    return row;
  }

  function renderRanking(ranking) {
    const sidebar = container.querySelector('#ranking-sidebar');
    if (!sidebar) return;

    sidebar.innerHTML = `
      <div class="lg:sticky lg:top-20 card-elite overflow-hidden">
        <div class="bg-primary text-on-primary p-5">
          <h3 class="text-headline-sm font-headline font-bold">Bảng Xếp Hạng</h3>
          <p class="text-label-sm opacity-80 mt-0.5">Calculated Real-time</p>
        </div>
        <div class="p-4 space-y-2" id="ranking-items"></div>
        ${ranking.length > 0 ? `
          <div class="px-4 pb-4">
            <div class="bg-accent-teal-soft rounded-lg p-4">
              <p class="text-label-caps font-ui font-bold text-primary uppercase tracking-widest mb-1">Khuyến nghị</p>
              <p class="text-body-md font-ui text-on-surface">${escapeHtml(ranking[0].name)} có tiềm năng cao nhất để spin-off</p>
            </div>
          </div>
        ` : ''}
      </div>
    `;

    const itemsEl = sidebar.querySelector('#ranking-items');
    ranking.forEach((item, index) => {
      const isTop = index === 0 && item.score > 0;
      const div = document.createElement('div');
      div.className = `flex items-center gap-3 p-3 rounded-lg transition-colors ${isTop ? 'bg-accent-teal-soft' : 'hover:bg-surface-container-high'}`;
      div.innerHTML = `
        <span class="w-7 h-7 rounded-full flex items-center justify-center text-label-sm font-bold ${isTop ? 'bg-primary text-on-primary' : 'bg-surface-container-high text-on-surface-variant'}">${index + 1}</span>
        <span class="material-symbols-outlined text-[20px] ${isTop ? 'text-primary' : 'text-on-surface-variant'}">${escapeHtml(item.icon)}</span>
        <span class="flex-1 text-body-md font-ui ${isTop ? 'font-bold text-on-surface' : 'text-on-surface'}">${escapeHtml(item.name)}</span>
        <span class="text-headline-sm font-headline font-bold ${isTop ? 'text-primary' : 'text-on-surface-variant'}">${item.score}</span>
      `;
      itemsEl.appendChild(div);
    });
  }

  renderAll();
}
