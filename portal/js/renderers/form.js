import { MODULE_CONFIG } from '../modules/module1.config.js';

function escapeHtml(text) {
  if (text == null) return '';
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function render(container, activity, data, onChange) {
  if (activity.layout === 'bmc_grid') {
    renderBMC(container, activity, data, onChange);
  } else if (activity.decisions) {
    renderIWK(container, activity, data, onChange);
  } else if (activity.sections) {
    renderFinancial(container, activity, data, onChange);
  }
}

/* ─── BMC Grid (Activity 2 & 3) ─── */

const BMC_GRID_MAP = {
  key_partners:            { col: '1 / 3',  row: '1 / 3' },
  target_key_partners:     { col: '1 / 3',  row: '1 / 3' },
  key_activities:          { col: '3 / 5',  row: '1 / 2' },
  target_key_activities:   { col: '3 / 5',  row: '1 / 2' },
  value_proposition:       { col: '5 / 7',  row: '1 / 3' },
  target_value_proposition:{ col: '5 / 7',  row: '1 / 3' },
  key_resources:           { col: '3 / 5',  row: '2 / 3' },
  target_key_resources:    { col: '3 / 5',  row: '2 / 3' },
  customer_relationships:  { col: '7 / 9',  row: '1 / 2' },
  target_customer_relationships: { col: '7 / 9', row: '1 / 2' },
  channels:                { col: '7 / 9',  row: '2 / 3' },
  target_channels:         { col: '7 / 9',  row: '2 / 3' },
  customer_segments:       { col: '9 / 11', row: '1 / 3' },
  target_customer_segments:{ col: '9 / 11', row: '1 / 3' },
  cost_structure:          { col: '1 / 6',  row: '3 / 4' },
  target_cost_structure:   { col: '1 / 6',  row: '3 / 4' },
  revenue_streams:         { col: '6 / 11', row: '3 / 4' },
  target_revenue_streams:  { col: '6 / 11', row: '3 / 4' },
};

function renderBMC(container, activity, data, onChange) {
  const fields = (activity.fields || []).filter(f => f.section === 'bmc');
  const discussions = activity.discussionQuestions || [];
  const roadmap = activity.roadmap || null;
  const values = { ...(data?.fields || {}) };

  container.innerHTML = `
    <div class="max-w-[1100px] mx-auto p-4 md:p-8">
      <h2 class="text-headline-md font-headline font-bold text-on-surface mb-1">${escapeHtml(activity.title)}</h2>
      <p class="text-body-md text-on-surface-variant mb-6">${escapeHtml(activity.estimatedTime || '')}</p>
      <div id="bmc-grid" class="grid gap-3" style="grid-template-columns: repeat(10, 1fr)"></div>
      <div id="bmc-extra" class="mt-8"></div>
    </div>
  `;

  const grid = container.querySelector('#bmc-grid');
  fields.forEach(field => {
    const pos = BMC_GRID_MAP[field.id];
    const cell = document.createElement('div');
    cell.className = 'bg-surface-container-lowest rounded-xl p-4 shadow-card border border-outline-variant flex flex-col';
    if (pos) {
      cell.style.gridColumn = pos.col;
      cell.style.gridRow = pos.row;
    }
    cell.innerHTML = `
      <label class="text-label-caps font-ui font-bold text-primary uppercase tracking-widest mb-1">${escapeHtml(field.label)}</label>
      <p class="text-label-sm text-on-surface-variant mb-2">${escapeHtml(field.explanation)}</p>
      <textarea class="flex-1 min-h-[80px] w-full px-3 py-2 rounded-lg bg-surface-container border border-outline text-on-surface text-body-md font-ui placeholder-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y" placeholder="${escapeHtml(field.placeholder)}" data-field-id="${field.id}">${escapeHtml(values[field.id] || '')}</textarea>
      ${field.helper ? `<p class="text-label-sm text-on-surface-variant italic mt-1">${escapeHtml(field.helper)}</p>` : ''}
    `;
    cell.querySelector('textarea').addEventListener('input', (e) => {
      values[field.id] = e.target.value;
      onChange({ fields: { ...values } });
    });
    grid.appendChild(cell);
  });

  // Mobile: collapse grid to single column
  const mobileStyle = document.createElement('style');
  mobileStyle.textContent = `@media (max-width: 767px) { #bmc-grid { grid-template-columns: 1fr !important; } #bmc-grid > div { grid-column: auto !important; grid-row: auto !important; } }`;
  container.appendChild(mobileStyle);

  const extra = container.querySelector('#bmc-extra');

  if (discussions.length > 0) {
    const section = document.createElement('div');
    section.innerHTML = `<h3 class="text-headline-sm font-headline font-bold text-on-surface mb-4">Câu hỏi thảo luận</h3>`;
    discussions.forEach(dq => {
      const card = document.createElement('div');
      card.className = 'bg-surface-container-lowest rounded-xl p-5 shadow-card border border-outline-variant mb-4';
      card.innerHTML = `
        <p class="text-body-md font-ui font-semibold text-on-surface mb-2">${escapeHtml(dq.text)}</p>
        <textarea class="w-full min-h-[80px] px-3 py-2 rounded-lg bg-surface-container border border-outline text-on-surface text-body-md font-ui placeholder-on-surface-variant/60 focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-y" placeholder="${escapeHtml(dq.placeholder || '')}" data-field-id="${dq.id}">${escapeHtml(values[dq.id] || '')}</textarea>
        ${dq.helper ? `<p class="text-label-sm text-on-surface-variant italic mt-1">${escapeHtml(dq.helper)}</p>` : ''}
      `;
      card.querySelector('textarea').addEventListener('input', (e) => {
        values[dq.id] = e.target.value;
        onChange({ fields: { ...values } });
      });
      section.appendChild(card);
    });
    extra.appendChild(section);
  }

  if (roadmap) {
    const rm = document.createElement('div');
    rm.className = 'bg-surface-container-lowest rounded-2xl p-6 shadow-card border border-outline-variant';
    rm.innerHTML = `
      <h3 class="text-headline-sm font-headline font-bold text-on-surface mb-2">${escapeHtml(roadmap.title)}</h3>
      <p class="text-body-md text-on-surface-variant mb-4">${escapeHtml(roadmap.description)}</p>
      <div class="space-y-3" id="roadmap-bars"></div>
    `;
    const barsContainer = rm.querySelector('#roadmap-bars');
    (roadmap.items || []).forEach(item => {
      const bar = document.createElement('div');
      bar.innerHTML = `
        <p class="text-label-sm font-ui font-semibold text-on-surface mb-1">${escapeHtml(item.label)}</p>
        <div class="flex h-8 rounded-lg overflow-hidden border border-outline-variant">
          <div class="bg-primary flex items-center justify-center text-on-primary text-label-sm font-bold" style="width: ${item.service}%">Dịch vụ ${item.service}%</div>
          <div class="bg-secondary flex items-center justify-center text-on-secondary text-label-sm font-bold" style="width: ${item.product}%">Sản phẩm ${item.product}%</div>
        </div>
      `;
      barsContainer.appendChild(bar);
    });
    extra.appendChild(rm);
  }
}

/* ─── Invest / Watch / Kill (Activity 5) ─── */

function renderIWK(container, activity, data, onChange) {
  const products = MODULE_CONFIG.products || [];
  const decisions = activity.decisions || [];
  const validation = activity.validation || {};
  const values = { ...(data?.decisions || {}) };

  function getInvestCount() {
    return Object.values(values).filter(v => v === 'INVEST').length;
  }

  function renderAll() {
    const investCount = getInvestCount();
    const hasError = investCount > 1;

    container.innerHTML = `
      <div class="max-w-3xl mx-auto p-4 md:p-8">
        <h2 class="text-headline-md font-headline font-bold text-on-surface mb-1">${escapeHtml(activity.title)}</h2>
        <p class="text-body-md text-on-surface-variant mb-6">Chọn hành động cho mỗi sản phẩm. Chỉ được chọn đúng 1 sản phẩm INVEST.</p>
        <div id="iwk-warning" class="${hasError ? '' : 'hidden'} mb-4 p-4 bg-red-50 border border-error rounded-xl animate-pulse">
          <p class="text-error font-ui font-bold">${escapeHtml(validation.errorMessage || 'Chỉ được chọn đúng 1 sản phẩm INVEST')}</p>
        </div>
        <div id="iwk-cards" class="space-y-4"></div>
      </div>
    `;

    const cardsEl = container.querySelector('#iwk-cards');
    products.forEach(product => {
      cardsEl.appendChild(buildProductCard(product));
    });
  }

  function buildProductCard(product) {
    const card = document.createElement('div');
    card.className = 'bg-surface-container-lowest rounded-2xl p-5 shadow-card border border-outline-variant';
    const currentDecision = values[product.id] || null;

    card.innerHTML = `
      <div class="flex items-center gap-3 mb-4">
        <div class="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
          <span class="material-symbols-outlined text-primary">${escapeHtml(product.icon)}</span>
        </div>
        <div>
          <p class="text-body-md font-ui font-bold text-on-surface">${escapeHtml(product.name)}</p>
          <p class="text-label-sm text-on-surface-variant">${escapeHtml(product.category)}</p>
        </div>
      </div>
      <div class="flex flex-col gap-2 decision-buttons"></div>
    `;

    const buttonsRow = card.querySelector('.decision-buttons');
    decisions.forEach(d => {
      const btn = document.createElement('button');
      btn.type = 'button';
      const isSelected = currentDecision === d.value;
      const colorMap = {
        success: { active: 'bg-success-emerald text-white border-success-emerald', idle: 'border-outline-variant text-on-surface hover:border-success-emerald' },
        warning: { active: 'bg-amber-500 text-white border-amber-500', idle: 'border-outline-variant text-on-surface hover:border-amber-500' },
        error: { active: 'bg-error text-white border-error', idle: 'border-outline-variant text-on-surface hover:border-error' },
      };
      const colors = colorMap[d.color] || colorMap.success;
      btn.className = `w-full px-4 py-3 rounded-xl border-2 font-ui font-bold text-left min-h-[44px] transition-colors ${isSelected ? colors.active : colors.idle}`;
      btn.innerHTML = `
        <span class="text-body-md font-bold">${escapeHtml(d.label)}</span>
        <span class="block text-label-sm font-normal ${isSelected ? 'text-white/80' : 'text-on-surface-variant'}">${escapeHtml(d.description)}</span>
      `;
      btn.addEventListener('click', () => {
        values[product.id] = d.value;
        onChange({ decisions: { ...values } });
        renderAll();
      });
      buttonsRow.appendChild(btn);
    });

    return card;
  }

  renderAll();
}

/* ─── Financial Model (Activity 6) ─── */

function renderFinancial(container, activity, data, onChange) {
  const sections = activity.sections || [];
  const values = { ...(data?.fields || {}) };

  function computeField(fieldId) {
    switch (fieldId) {
      case 'current_revenue_per_head': {
        const rev = parseFloat(values['current_revenue']) || 0;
        const team = parseFloat(values['current_team_size']) || 0;
        return team > 0 ? Math.round(rev * 1000 / team / 12 * 10) / 10 : 0;
      }
      case 'y1_burn_rate': {
        const team = parseFloat(values['y1_team_product']) || 0;
        const salary = parseFloat(values['y1_avg_salary']) || 0;
        return Math.round(team * salary * 1.3 * 10) / 10;
      }
      case 'y1_service_profit_needed': {
        const burn = computeField('y1_burn_rate');
        return Math.round(burn * 1.2 * 10) / 10;
      }
      case 'y3_runway': {
        const cash = parseFloat(values['y3_cash_reserves']) || 0;
        const profit = parseFloat(values['y3_projected_monthly_profit']) || 0;
        const burn = computeField('y1_burn_rate');
        return burn > 0 ? Math.round((cash * 1000 + profit) / burn * 10) / 10 : 0;
      }
      default:
        return 0;
    }
  }

  function runComputedFields() {
    sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.readonly && field.computed) {
          values[field.id] = computeField(field.id);
        }
      });
    });
  }

  function renderAll() {
    runComputedFields();

    container.innerHTML = `
      <div class="max-w-3xl mx-auto p-4 md:p-8">
        <h2 class="text-headline-md font-headline font-bold text-on-surface mb-1">${escapeHtml(activity.title)}</h2>
        <p class="text-body-md text-on-surface-variant mb-6">${escapeHtml(activity.estimatedTime || '')}</p>
        <div id="financial-sections" class="space-y-6"></div>
      </div>
    `;

    const sectionsEl = container.querySelector('#financial-sections');
    sections.forEach(section => sectionsEl.appendChild(buildSection(section)));
  }

  function buildSection(section) {
    const div = document.createElement('div');
    div.className = 'bg-surface-container-lowest rounded-2xl p-5 md:p-6 shadow-card border border-outline-variant';
    div.innerHTML = `<h3 class="text-headline-sm font-headline font-bold text-on-surface mb-4">${escapeHtml(section.title)}</h3>`;

    const fieldsContainer = document.createElement('div');
    fieldsContainer.className = 'space-y-4';

    section.fields.forEach(field => {
      const row = document.createElement('div');
      row.className = 'space-y-1';

      const isComputed = field.readonly && field.computed;
      const currentValue = values[field.id] ?? '';
      let runwayColor = '';
      if (field.id === 'y3_runway' && currentValue) {
        const v = parseFloat(currentValue);
        if (v < 6) runwayColor = 'text-error';
        else if (v <= 12) runwayColor = 'text-amber-600';
        else runwayColor = 'text-success-emerald';
      }

      row.innerHTML = `
        <label class="text-label-caps font-ui font-bold text-on-surface-variant uppercase tracking-widest">${escapeHtml(field.label)}</label>
        <p class="text-label-sm text-on-surface-variant">${escapeHtml(field.explanation)}</p>
        <div class="flex items-center gap-2">
          <input type="number" step="any"
            class="flex-1 px-4 py-3 rounded-lg border text-body-md font-ui focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary ${isComputed ? 'bg-surface-container-high border-outline-variant text-on-surface font-bold cursor-default ' + runwayColor : 'bg-surface-container border-outline text-on-surface placeholder-on-surface-variant/60'}"
            ${isComputed ? 'readonly tabindex="-1"' : ''}
            value="${currentValue}"
            placeholder="${escapeHtml(field.placeholder || '')}"
            data-field-id="${field.id}">
          ${field.unit ? `<span class="text-label-sm text-on-surface-variant whitespace-nowrap">${escapeHtml(field.unit)}</span>` : ''}
        </div>
        ${field.helper ? `<p class="text-label-sm text-on-surface-variant italic">${escapeHtml(field.helper)}</p>` : ''}
      `;

      if (!isComputed) {
        row.querySelector('input').addEventListener('input', (e) => {
          values[field.id] = e.target.value ? parseFloat(e.target.value) : '';
          runComputedFields();
          updateComputedInputs();
          onChange({ fields: { ...values } });
        });
      }

      fieldsContainer.appendChild(row);
    });

    div.appendChild(fieldsContainer);
    return div;
  }

  function updateComputedInputs() {
    container.querySelectorAll('input[readonly]').forEach(input => {
      const fieldId = input.dataset.fieldId;
      if (fieldId && values[fieldId] !== undefined) {
        input.value = values[fieldId];
        if (fieldId === 'y3_runway') {
          const v = parseFloat(values[fieldId]);
          input.classList.remove('text-error', 'text-amber-600', 'text-success-emerald');
          if (v < 6) input.classList.add('text-error');
          else if (v <= 12) input.classList.add('text-amber-600');
          else input.classList.add('text-success-emerald');
        }
      }
    });
  }

  renderAll();
}
