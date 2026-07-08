/**
 * lecture.js — Renderer cho Module 2 lecture step
 *
 * Đọc markdown từ `contentPath` trong unit config, parse các section marker,
 * và render ra DOM tương ứng:
 *   - ## Mục tiêu        → purpose header + objective bullets
 *   - ## Nội dung        → lecture body paragraphs
 *   - ### Definition: X  → term + definition box
 *   - ### Table: X       → responsive table → mobile stacked cards
 *   - ### Comparison: X  → 2-col comparison (Branch A vs Branch B)
 *   - ### Bullets: X     → bullet list
 *
 * Nếu content file chưa tồn tại (skeleton phase), render placeholder
 * với thông tin unit + nút Tiếp tục.
 */

import { escapeHtml } from '../utils/dom.js';

export async function render(container, unit, onComplete) {
  const config = unit;

  const contentEl = document.createElement('div');
  contentEl.className = 'max-w-reading mx-auto px-5 py-8 md:py-section';
  container.appendChild(contentEl);

  try {
    const response = await fetch(config.contentPath);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const markdown = await response.text();
    const sections = parseMarkdown(markdown);
    sections.forEach((section) => renderSection(contentEl, section));
  } catch (err) {
    // Skeleton fallback: content file chưa sẵn sàng, render placeholder.
    console.log('Lecture content not available, rendering skeleton', err);
    renderSkeleton(contentEl, config);
  }

  const footer = document.createElement('div');
  footer.className = 'max-w-reading mx-auto px-5 pb-12 md:pb-section';
  footer.innerHTML = `
    <button id="lecture-continue" class="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-ui font-bold hover:bg-primary-container transition-colors min-h-[44px]">
      Tiếp tục
      <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
    </button>
  `;
  container.appendChild(footer);

  const continueBtn = footer.querySelector('#lecture-continue');
  if (continueBtn && typeof onComplete === 'function') {
    continueBtn.addEventListener('click', onComplete);
  }
}

function parseMarkdown(markdown) {
  const lines = markdown.split('\n');
  const sections = [];
  let current = null;

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    const purposeMatch = line.match(/^##\s+Mục tiêu\s*$/i);
    const bodyMatch = line.match(/^##\s+Nội dung\s*$/i);
    const subMatch = line.match(/^###\s*(Definition|Table|Comparison|Bullets):\s*(.*)$/i);

    if (purposeMatch) {
      if (current) sections.push(current);
      current = { type: 'purpose', title: 'Mục tiêu', lines: [] };
      continue;
    }

    if (bodyMatch) {
      if (current) sections.push(current);
      current = { type: 'body', title: 'Nội dung', lines: [] };
      continue;
    }

    if (subMatch) {
      if (current) sections.push(current);
      current = {
        type: subMatch[1].toLowerCase(),
        title: subMatch[2].trim(),
        lines: [],
      };
      continue;
    }

    if (current) {
      current.lines.push(line);
    }
  }

  if (current) sections.push(current);
  return sections;
}

function renderSection(container, section) {
  switch (section.type) {
    case 'purpose':
      renderPurpose(container, section);
      break;
    case 'body':
      renderBody(container, section);
      break;
    case 'definition':
      renderDefinition(container, section);
      break;
    case 'table':
      renderTable(container, section);
      break;
    case 'comparison':
      renderComparison(container, section);
      break;
    case 'bullets':
      renderBullets(container, section);
      break;
    default:
      renderBody(container, section);
  }
}

function renderPurpose(container, section) {
  const items = section.lines
    .filter((l) => l.startsWith('- ') || l.startsWith('* '))
    .map((l) => l.replace(/^[-*]\s+/, ''));

  const wrapper = document.createElement('section');
  wrapper.className = 'mb-8';
  wrapper.innerHTML = `
    <h2 class="font-headline font-bold text-headline-sm text-on-surface mb-4">${escapeHtml(section.title)}</h2>
    <ul class="list-disc pl-5 space-y-2">
      ${items.map((item) => `<li class="text-body-md text-on-surface-variant">${escapeHtml(item)}</li>`).join('')}
    </ul>
  `;
  container.appendChild(wrapper);
}

function renderBody(container, section) {
  const paragraphs = groupParagraphs(section.lines);

  const wrapper = document.createElement('section');
  wrapper.className = 'mb-8';

  if (section.title && section.type === 'body') {
    const heading = document.createElement('h2');
    heading.className = 'font-headline font-bold text-headline-sm text-on-surface mb-4';
    heading.textContent = section.title;
    wrapper.appendChild(heading);
  }

  paragraphs.forEach((text) => {
    if (!text) return;
    const p = document.createElement('p');
    p.className = 'text-body-md text-on-surface-variant mb-4 leading-relaxed';
    p.innerHTML = escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong class="text-on-surface">$1</strong>');
    wrapper.appendChild(p);
  });

  container.appendChild(wrapper);
}

function renderDefinition(container, section) {
  const bodyText = section.lines.filter((l) => l.trim()).join(' ').trim();

  const wrapper = document.createElement('section');
  wrapper.className = 'mb-8';
  wrapper.innerHTML = `
    <div class="card-elite border-l-4 border-l-primary p-6 md:p-8">
      <h3 class="font-headline font-bold text-headline-sm text-on-surface mb-3">${escapeHtml(section.title)}</h3>
      <p class="text-body-md text-on-surface-variant leading-relaxed">${escapeHtml(bodyText)}</p>
    </div>
  `;
  container.appendChild(wrapper);
}

function renderTable(container, section) {
  const tableLines = section.lines.filter((l) => l.trim().startsWith('|'));
  const tableData = parseMarkdownTable(tableLines);

  if (!tableData) {
    renderBody(container, section);
    return;
  }

  const wrapper = document.createElement('section');
  wrapper.className = 'mb-8';

  const titleEl = document.createElement('h3');
  titleEl.className = 'font-headline font-bold text-headline-sm text-on-surface mb-4';
  titleEl.textContent = section.title;
  wrapper.appendChild(titleEl);

  // Desktop table
  const tableWrap = document.createElement('div');
  tableWrap.className = 'hidden md:block overflow-x-auto';
  const table = document.createElement('table');
  table.className = 'w-full text-left border-collapse';

  const thead = document.createElement('thead');
  thead.innerHTML = `
    <tr class="border-b border-outline-variant">
      ${tableData.headers.map((h) => `<th class="py-3 pr-4 text-label-sm font-ui font-bold text-on-surface-variant uppercase tracking-wider">${escapeHtml(h)}</th>`).join('')}
    </tr>
  `;
  table.appendChild(thead);

  const tbody = document.createElement('tbody');
  tableData.rows.forEach((row, i) => {
    const tr = document.createElement('tr');
    tr.className = i % 2 === 0 ? 'bg-surface-container-lowest' : 'bg-surface';
    tr.innerHTML = row.map((cell) => `<td class="py-3 pr-4 text-body-md text-on-surface-variant">${escapeHtml(cell)}</td>`).join('');
    tbody.appendChild(tr);
  });
  table.appendChild(tbody);
  tableWrap.appendChild(table);
  wrapper.appendChild(tableWrap);

  // Mobile stacked cards
  const cardsWrap = document.createElement('div');
  cardsWrap.className = 'md:hidden space-y-4';
  tableData.rows.forEach((row) => {
    const card = document.createElement('div');
    card.className = 'card-elite p-4';
    card.innerHTML = tableData.headers.map((h, i) => `
      <div class="flex justify-between gap-3 py-2 border-b border-outline-variant/30 last:border-0">
        <span class="text-label-sm font-ui font-bold text-on-surface-variant">${escapeHtml(h)}</span>
        <span class="text-body-md text-on-surface text-right">${escapeHtml(row[i] || '')}</span>
      </div>
    `).join('');
    cardsWrap.appendChild(card);
  });
  wrapper.appendChild(cardsWrap);

  container.appendChild(wrapper);
}

function parseMarkdownTable(lines) {
  if (lines.length < 2) return null;

  const rows = lines.map((l) =>
    l
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim())
  );

  const headers = rows[0];
  const bodyRows = rows.slice(2).filter((r) => r.some((c) => c));
  if (!headers.length || !bodyRows.length) return null;

  return { headers, rows: bodyRows };
}

function renderComparison(container, section) {
  // Parse lines into two columns by marker Branch A / Branch B
  const left = [];
  const right = [];
  let side = null;

  section.lines.forEach((line) => {
    const marker = line.match(/^Branch\s+([AB]):?\s*(.*)$/i);
    if (marker) {
      side = marker[1].toUpperCase();
      const text = marker[2].trim();
      if (text) {
        if (side === 'A') left.push(text);
        else right.push(text);
      }
      return;
    }
    if (!side) return;
    if (line.startsWith('- ') || line.startsWith('* ')) {
      const item = line.replace(/^[-*]\s+/, '');
      if (side === 'A') left.push(item);
      else right.push(item);
    } else if (line.trim()) {
      if (side === 'A') left.push(line.trim());
      else right.push(line.trim());
    }
  });

  const wrapper = document.createElement('section');
  wrapper.className = 'mb-8';

  const titleEl = document.createElement('h3');
  titleEl.className = 'font-headline font-bold text-headline-sm text-on-surface mb-4';
  titleEl.textContent = section.title;
  wrapper.appendChild(titleEl);

  const grid = document.createElement('div');
  grid.className = 'grid grid-cols-1 md:grid-cols-2 gap-4';
  grid.innerHTML = `
    <div class="card-elite border-l-4 border-l-primary p-5 md:p-6">
      <h4 class="text-label-caps font-ui font-bold text-primary uppercase tracking-widest mb-3">Branch A</h4>
      <ul class="list-disc pl-5 space-y-2">
        ${left.map((item) => `<li class="text-body-md text-on-surface-variant">${escapeHtml(item)}</li>`).join('')}
      </ul>
    </div>
    <div class="card-elite border-l-4 p-5 md:p-6" style="border-left-color: #6B7280;">
      <!-- TODO: replace #6B7280 with Branch B design token when Designer confirms -->
      <h4 class="text-label-caps font-ui font-bold uppercase tracking-widest mb-3" style="color: #6B7280;">Branch B</h4>
      <ul class="list-disc pl-5 space-y-2">
        ${right.map((item) => `<li class="text-body-md text-on-surface-variant">${escapeHtml(item)}</li>`).join('')}
      </ul>
    </div>
  `;
  wrapper.appendChild(grid);

  container.appendChild(wrapper);
}

function renderBullets(container, section) {
  const items = section.lines
    .filter((l) => l.startsWith('- ') || l.startsWith('* '))
    .map((l) => l.replace(/^[-*]\s+/, ''));

  const wrapper = document.createElement('section');
  wrapper.className = 'mb-8';
  wrapper.innerHTML = `
    <h3 class="font-headline font-bold text-headline-sm text-on-surface mb-4">${escapeHtml(section.title)}</h3>
    <ul class="list-disc pl-5 space-y-2">
      ${items.map((item) => `<li class="text-body-md text-on-surface-variant">${escapeHtml(item)}</li>`).join('')}
    </ul>
  `;
  container.appendChild(wrapper);
}

function groupParagraphs(lines) {
  const paragraphs = [];
  let current = '';

  lines.forEach((line) => {
    const trimmed = line.trim();
    if (!trimmed) {
      if (current) {
        paragraphs.push(current.trim());
        current = '';
      }
    } else {
      current += (current ? ' ' : '') + trimmed;
    }
  });

  if (current) paragraphs.push(current.trim());
  return paragraphs;
}

function renderSkeleton(container, config) {
  const wrapper = document.createElement('section');
  wrapper.className = 'mb-8';
  wrapper.innerHTML = `
    <div class="card-elite p-8 md:p-12 context-stripe text-center">
      <span class="material-symbols-outlined text-5xl text-primary/40 mb-4">menu_book</span>
      <h2 class="text-headline-md font-headline font-bold text-on-surface mb-2">${escapeHtml(config.title || config.id || 'Bài giảng')}</h2>
      <p class="text-body-md text-on-surface-variant mb-2">${escapeHtml(config.duration || '')}</p>
      <p class="text-body-md text-on-surface-variant mb-8">
        Nội dung bài giảng chưa sẵn sàng (${escapeHtml(config.contentPath || 'content/m2/...md')}).
        Skeleton sẽ tự động thay thế khi file markdown được thêm vào.
      </p>
      <div class="space-y-3 max-w-md mx-auto text-left">
        <div class="h-3 bg-surface-container-high rounded animate-pulse"></div>
        <div class="h-3 bg-surface-container-high rounded animate-pulse w-5/6"></div>
        <div class="h-3 bg-surface-container-high rounded animate-pulse w-4/6"></div>
      </div>
    </div>
  `;
  container.appendChild(wrapper);
}
