/**
 * practice.js — Practice renderer for Module 2 unit stepper
 *
 * Handles two practice types driven by unit.practice config:
 *   type: 'form'   — sections of input fields
 *   type: 'matrix' — products × weighted-criteria scoring grid
 *
 * Receives moduleConfig as 4th arg (passed from UnitStepper via shell).
 * Saves to store on "Tiếp tục" click; no forced gate (unlike quiz).
 */

import { escapeHtml } from '../utils/dom.js';
import { setUnitResponse } from '../store.js';

export async function render(container, unit, onComplete, moduleConfig) {
  const practice = unit?.practice || {};
  const products = moduleConfig?.products || [];

  const contentEl = document.createElement('div');
  contentEl.className = 'max-w-reading mx-auto px-5 py-8 md:py-section';
  container.appendChild(contentEl);

  const state = { scores: {}, form: {}, repeatable: {} };

  if (practice.title) {
    const h = document.createElement('h2');
    h.className = 'font-headline font-bold text-headline-md text-on-surface mb-6';
    h.textContent = practice.title;
    contentEl.appendChild(h);
  }

  if (practice.type === 'matrix') {
    renderMatrix(contentEl, practice, moduleConfig, state);
  } else if (practice.perProduct && !practice.sections) {
    renderTopPerProduct(contentEl, practice, products, state);
  } else if (practice.sections) {
    const sectionsWrap = document.createElement('div');
    sectionsWrap.className = 'space-y-6';
    contentEl.appendChild(sectionsWrap);
    practice.sections.forEach((section) => {
      if (section.perProduct) {
        renderPerProductSection(sectionsWrap, section, products, state);
      } else if (section.repeatable) {
        renderRepeatableSection(sectionsWrap, section, state);
      } else {
        renderStaticSection(sectionsWrap, section, state);
      }
    });
  }

  const footer = document.createElement('div');
  footer.className = 'max-w-reading mx-auto px-5 pb-12 md:pb-section mt-8';
  footer.innerHTML = `
    <button id="practice-continue" class="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-ui font-bold hover:bg-primary-container transition-colors min-h-[44px]">
      Tiếp tục
      <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
    </button>
  `;
  container.appendChild(footer);

  footer.querySelector('#practice-continue').addEventListener('click', () => {
    setUnitResponse(moduleConfig?.id || 'module2', unit.id, 'practice', {
      ...state,
      completedAt: Date.now(),
    });
    onComplete();
  });
}

// ── Matrix ───────────────────────────────────────────────────────────────────

function renderMatrix(container, practice, moduleConfig, state) {
  const products = moduleConfig?.products || [];
  const criteriaKey = practice.criteriaRef || 'spinoffCriteria';
  const criteria = moduleConfig?.[criteriaKey] || [];
  const scale = practice.scale || { min: 1, max: 5, minLabel: 'Rất thấp', maxLabel: 'Rất cao' };

  products.forEach((p) => {
    state.scores[p.id] = {};
  });

  const legend = document.createElement('p');
  legend.className = 'text-body-sm text-on-surface-variant mb-6';
  legend.textContent = `Thang điểm: ${scale.min} (${scale.minLabel}) → ${scale.max} (${scale.maxLabel})`;
  container.appendChild(legend);

  const cardsWrap = document.createElement('div');
  cardsWrap.className = 'space-y-4';
  container.appendChild(cardsWrap);

  products.forEach((product) => {
    const card = document.createElement('div');
    card.className = 'card-elite p-5 md:p-6';

    const productHeader = document.createElement('div');
    productHeader.className = 'flex items-center gap-2 pb-3 mb-4 border-b border-outline-variant/30';
    productHeader.innerHTML = `
      <span class="material-symbols-outlined text-primary text-[20px]">${escapeHtml(product.icon || 'category')}</span>
      <span class="font-headline font-bold text-headline-sm text-on-surface">${escapeHtml(product.name)}</span>
    `;
    card.appendChild(productHeader);

    const criteriaList = document.createElement('div');
    criteriaList.className = 'space-y-4';

    criteria.forEach((criterion) => {
      const row = document.createElement('div');

      const topRow = document.createElement('div');
      topRow.className = 'flex items-center justify-between mb-1.5';
      topRow.innerHTML = `
        <span class="text-body-sm text-on-surface-variant">${escapeHtml(criterion.label)}</span>
        <span class="text-label-xs text-on-surface-variant/60 shrink-0 ml-2">${(criterion.weight * 100).toFixed(0)}%</span>
      `;
      row.appendChild(topRow);

      const ratingWrap = document.createElement('div');
      ratingWrap.className = 'flex gap-1';

      for (let v = scale.min; v <= scale.max; v++) {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = String(v);
        btn.className =
          'flex-1 h-9 rounded-md text-label-sm font-bold border border-outline-variant text-on-surface-variant hover:bg-primary/10 transition-colors';
        btn.addEventListener('click', () => {
          ratingWrap.querySelectorAll('button').forEach((b) => {
            b.classList.remove('bg-primary', 'text-on-primary', 'border-primary');
            b.classList.add('border-outline-variant', 'text-on-surface-variant');
          });
          btn.classList.remove('border-outline-variant', 'text-on-surface-variant');
          btn.classList.add('bg-primary', 'text-on-primary', 'border-primary');
          state.scores[product.id][criterion.id] = v;
          refreshProductScore(card, product, criteria, state, practice.readinessBands);
        });
        ratingWrap.appendChild(btn);
      }

      row.appendChild(ratingWrap);
      criteriaList.appendChild(row);
    });

    card.appendChild(criteriaList);

    const scoreEl = document.createElement('div');
    scoreEl.className = 'mt-4 pt-3 border-t border-outline-variant/30 flex items-center justify-between';
    scoreEl.innerHTML = `
      <span class="text-label-sm font-ui font-bold text-on-surface-variant">Điểm tổng hợp</span>
      <span class="font-headline font-bold text-headline-sm text-on-surface-variant score-val">—</span>
    `;
    card.appendChild(scoreEl);

    cardsWrap.appendChild(card);
  });
}

function refreshProductScore(card, product, criteria, state, readinessBands) {
  const scores = state.scores[product.id];
  const allRated = criteria.every((c) => scores[c.id] !== undefined);
  const weighted = criteria.reduce((sum, c) => sum + (scores[c.id] || 0) * c.weight, 0);

  const scoreValEl = card.querySelector('.score-val');
  if (scoreValEl) {
    scoreValEl.textContent = allRated ? weighted.toFixed(2) : '—';
    scoreValEl.className = `font-headline font-bold text-headline-sm score-val ${allRated ? 'text-primary' : 'text-on-surface-variant'}`;
  }

  if (!allRated || !readinessBands) return;

  let bandEl = card.querySelector('.readiness-band');
  if (!bandEl) {
    bandEl = document.createElement('div');
    bandEl.className = 'readiness-band mt-3 p-3 rounded-lg text-body-sm';
    card.appendChild(bandEl);
  }

  const band = readinessBands.find((b) => weighted >= b.range[0] && weighted <= b.range[1]);
  if (!band) return;

  const colorClass =
    weighted >= 4
      ? 'bg-success-emerald/10 text-success-emerald'
      : weighted >= 3
        ? 'bg-primary/10 text-primary'
        : 'bg-surface-container text-on-surface-variant';

  bandEl.className = `readiness-band mt-3 p-3 rounded-lg text-body-sm ${colorClass}`;
  bandEl.innerHTML = `<strong>${escapeHtml(band.label)}</strong> — ${escapeHtml(band.action)}`;
}

// ── Form: top-level perProduct (u5_2axis) ────────────────────────────────────

function renderTopPerProduct(container, practice, products, state) {
  const wrap = document.createElement('div');
  wrap.className = 'space-y-4';

  products.forEach((product) => {
    if (!state.form[product.id]) state.form[product.id] = {};
    const card = document.createElement('div');
    card.className = 'card-elite p-5 md:p-6 space-y-4';

    const header = document.createElement('div');
    header.className = 'flex items-center gap-2 pb-3 border-b border-outline-variant/30';
    header.innerHTML = `
      <span class="material-symbols-outlined text-primary text-[18px]">${escapeHtml(product.icon || 'category')}</span>
      <span class="font-headline font-semibold text-body-lg text-on-surface">${escapeHtml(product.name)}</span>
    `;
    card.appendChild(header);

    (practice.fields || []).forEach((field) => {
      const inputId = `${product.id}.${field.id}`;
      card.appendChild(
        renderField(field, inputId, (val) => {
          state.form[product.id][field.id] = val;
        }),
      );
    });

    wrap.appendChild(card);
  });

  container.appendChild(wrap);
}

// ── Form: perProduct section ─────────────────────────────────────────────────

function renderPerProductSection(container, section, products, state) {
  if (!state.form[section.id]) state.form[section.id] = {};

  if (section.title) {
    const h = document.createElement('h3');
    h.className = 'font-headline font-bold text-headline-sm text-on-surface';
    h.textContent = section.title;
    container.appendChild(h);
  }
  if (section.description) {
    const desc = document.createElement('p');
    desc.className = 'text-body-sm text-on-surface-variant mt-1 mb-3';
    desc.textContent = section.description;
    container.appendChild(desc);
  }

  const cardsWrap = document.createElement('div');
  cardsWrap.className = 'space-y-3';

  products.forEach((product) => {
    state.form[section.id][product.id] = {};
    const card = document.createElement('div');
    card.className = 'card-elite p-5 md:p-6 space-y-4';

    const header = document.createElement('div');
    header.className = 'flex items-center gap-2 pb-3 border-b border-outline-variant/30';
    header.innerHTML = `
      <span class="material-symbols-outlined text-primary text-[18px]">${escapeHtml(product.icon || 'category')}</span>
      <span class="font-headline font-semibold text-body-lg text-on-surface">${escapeHtml(product.name)}</span>
    `;
    card.appendChild(header);

    (section.fields || []).forEach((field) => {
      const inputId = `${section.id}.${product.id}.${field.id}`;
      card.appendChild(
        renderField(field, inputId, (val) => {
          state.form[section.id][product.id][field.id] = val;
        }),
      );
    });

    cardsWrap.appendChild(card);
  });

  container.appendChild(cardsWrap);
}

// ── Form: repeatable section ─────────────────────────────────────────────────

function renderRepeatableSection(container, section, state) {
  state.repeatable[section.id] = [];
  let counter = 0;

  const wrap = document.createElement('div');
  wrap.className = 'space-y-3';

  const titleRow = document.createElement('div');
  titleRow.className = 'flex items-center justify-between';

  if (section.title) {
    const h = document.createElement('h3');
    h.className = 'font-headline font-bold text-headline-sm text-on-surface';
    h.textContent = section.title;
    titleRow.appendChild(h);
  }

  const addBtn = document.createElement('button');
  addBtn.type = 'button';
  addBtn.className =
    'inline-flex items-center gap-1 text-label-sm font-bold text-primary hover:opacity-75 transition-opacity min-h-[36px]';
  addBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">add_circle</span>Thêm`;
  titleRow.appendChild(addBtn);
  wrap.appendChild(titleRow);

  if (section.description) {
    const desc = document.createElement('p');
    desc.className = 'text-body-sm text-on-surface-variant';
    desc.textContent = section.description;
    wrap.appendChild(desc);
  }

  const rowsWrap = document.createElement('div');
  rowsWrap.className = 'space-y-3';
  wrap.appendChild(rowsWrap);

  function addRow() {
    const max = section.maxItems || 20;
    if (counter >= max) return;
    const idx = counter++;
    const rowState = {};
    state.repeatable[section.id].push(rowState);

    const card = document.createElement('div');
    card.className = 'card-elite p-4 md:p-5 space-y-3';

    const rowHeader = document.createElement('div');
    rowHeader.className = 'flex items-center justify-between';
    rowHeader.innerHTML = `<span class="text-label-sm font-bold text-on-surface-variant">#${idx + 1}</span>`;

    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'text-on-surface-variant hover:text-error transition-colors min-h-[36px] px-1';
    delBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">delete_outline</span>`;
    delBtn.addEventListener('click', () => {
      card.remove();
      state.repeatable[section.id][idx] = null;
    });
    rowHeader.appendChild(delBtn);
    card.appendChild(rowHeader);

    (section.fields || []).forEach((field) => {
      const inputId = `${section.id}-row${idx}-${field.id}`;
      card.appendChild(
        renderField(field, inputId, (val) => {
          rowState[field.id] = val;
        }),
      );
    });

    rowsWrap.appendChild(card);

    if (counter >= (section.maxItems || 20)) {
      addBtn.disabled = true;
      addBtn.classList.add('opacity-40', 'cursor-not-allowed');
    }
  }

  addRow();
  addBtn.addEventListener('click', addRow);
  container.appendChild(wrap);
}

// ── Form: static section ─────────────────────────────────────────────────────

function renderStaticSection(container, section, state) {
  if (!state.form[section.id]) state.form[section.id] = {};

  const card = document.createElement('div');
  card.className = 'card-elite p-5 md:p-6 space-y-4';

  if (section.title) {
    const h = document.createElement('h3');
    h.className = 'font-headline font-bold text-headline-sm text-on-surface';
    h.textContent = section.title;
    card.appendChild(h);
  }
  if (section.description) {
    const desc = document.createElement('p');
    desc.className = 'text-body-sm text-on-surface-variant';
    desc.textContent = section.description;
    card.appendChild(desc);
  }

  (section.fields || []).forEach((field) => {
    const inputId = section.id ? `${section.id}.${field.id}` : field.id;
    card.appendChild(
      renderField(field, inputId, (val) => {
        state.form[section.id][field.id] = val;
      }),
    );
  });

  container.appendChild(card);
}

// ── Field builder ────────────────────────────────────────────────────────────

function renderField(field, inputId, onChange) {
  const wrap = document.createElement('div');
  wrap.className = 'space-y-1';

  const label = document.createElement('label');
  label.className = 'block text-label-sm font-ui font-bold text-on-surface';
  label.htmlFor = inputId;
  label.textContent = field.label || '';
  wrap.appendChild(label);

  if (field.explanation) {
    const exp = document.createElement('p');
    exp.className = 'text-body-sm text-on-surface-variant';
    exp.textContent = field.explanation;
    wrap.appendChild(exp);
  }

  switch (field.type) {
    case 'textarea':
      wrap.appendChild(createTextarea(field, inputId, onChange));
      break;
    case 'number':
      wrap.appendChild(createNumber(field, inputId, onChange));
      break;
    case 'select':
      wrap.appendChild(createSelect(field, inputId, onChange));
      break;
    case 'radio':
      wrap.appendChild(createRadio(field, inputId, onChange));
      break;
    default:
      wrap.appendChild(createText(field, inputId, onChange));
  }

  if (field.helper) {
    const helper = document.createElement('p');
    helper.className = 'text-label-xs text-on-surface-variant/70 mt-0.5';
    helper.textContent = field.helper;
    wrap.appendChild(helper);
  }

  return wrap;
}

function inputBase() {
  return 'w-full px-3 py-2 rounded-lg border border-outline-variant bg-surface text-body-md text-on-surface focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors';
}

function createText(field, id, onChange) {
  const input = document.createElement('input');
  input.type = 'text';
  input.id = id;
  input.className = `${inputBase()} min-h-[44px]`;
  if (field.placeholder) input.placeholder = field.placeholder;
  input.addEventListener('input', () => onChange(input.value));
  return input;
}

function createTextarea(field, id, onChange) {
  const ta = document.createElement('textarea');
  ta.id = id;
  ta.rows = 3;
  ta.className = `${inputBase()} resize-y`;
  if (field.placeholder) ta.placeholder = field.placeholder;
  ta.addEventListener('input', () => onChange(ta.value));
  return ta;
}

function createNumber(field, id, onChange) {
  const wrap = document.createElement('div');
  wrap.className = 'flex items-center gap-2';

  const input = document.createElement('input');
  input.type = 'number';
  input.id = id;
  input.className = `flex-1 ${inputBase()} min-h-[44px]`;
  if (field.placeholder) input.placeholder = field.placeholder;
  if (field.min !== undefined) input.min = String(field.min);
  if (field.max !== undefined) input.max = String(field.max);
  input.addEventListener('input', () =>
    onChange(input.value === '' ? null : Number(input.value)),
  );
  wrap.appendChild(input);

  if (field.unit) {
    const unitEl = document.createElement('span');
    unitEl.className = 'text-label-sm text-on-surface-variant shrink-0';
    unitEl.textContent = field.unit;
    wrap.appendChild(unitEl);
  }
  return wrap;
}

function createSelect(field, id, onChange) {
  const select = document.createElement('select');
  select.id = id;
  select.className = `${inputBase()} min-h-[44px] cursor-pointer`;

  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = '— Chọn —';
  placeholder.disabled = true;
  placeholder.selected = true;
  select.appendChild(placeholder);

  (field.options || []).forEach((opt) => {
    const option = document.createElement('option');
    if (typeof opt === 'string') {
      option.value = opt;
      option.textContent = opt;
    } else {
      option.value = opt.value;
      option.textContent = opt.label;
    }
    select.appendChild(option);
  });

  select.addEventListener('change', () => onChange(select.value));
  return select;
}

function createRadio(field, id, onChange) {
  const wrap = document.createElement('div');
  wrap.className = 'space-y-2';

  (field.options || []).forEach((opt, i) => {
    const optId = `${id}-opt-${i}`;
    const outer = document.createElement('label');
    outer.className =
      'flex items-start gap-3 p-3 rounded-lg border border-outline-variant cursor-pointer transition-colors hover:border-primary';
    outer.htmlFor = optId;

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = id;
    radio.id = optId;
    radio.value = opt.value || String(i);
    radio.className = 'mt-0.5 accent-primary shrink-0';
    radio.addEventListener('change', () => {
      // Highlight selected
      wrap.querySelectorAll('label').forEach((l) => {
        l.classList.remove('border-primary', 'bg-primary/5');
        l.classList.add('border-outline-variant');
      });
      outer.classList.remove('border-outline-variant');
      outer.classList.add('border-primary', 'bg-primary/5');
      onChange(opt.value || String(i));
    });

    const text = document.createElement('div');
    text.className = 'flex-1';
    text.innerHTML = `<div class="text-body-md text-on-surface font-ui font-semibold">${escapeHtml(opt.label || '')}</div>`;
    if (opt.description) {
      const desc = document.createElement('div');
      desc.className = 'text-body-sm text-on-surface-variant mt-0.5';
      desc.textContent = opt.description;
      text.appendChild(desc);
    }

    outer.appendChild(radio);
    outer.appendChild(text);
    wrap.appendChild(outer);
  });

  return wrap;
}
