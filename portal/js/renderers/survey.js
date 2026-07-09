function escapeHtml(text) {
  if (text == null) return '';
  return String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export function render(container, activity, data, onChange) {
  const questions = activity.questions || [];
  const scale = activity.scale || { min: 1, max: 5, minLabel: 'Không đúng', maxLabel: 'Hoàn toàn đúng' };
  const scoring = activity.scoring || {};
  const answers = { ...(data?.answers || {}) };

  function getTotal() {
    return Object.values(answers).reduce((sum, v) => sum + (v || 0), 0);
  }

  function getAnsweredCount() {
    return Object.keys(answers).filter(k => answers[k] > 0).length;
  }

  function getThreshold(total) {
    if (!scoring.thresholds) return null;
    return scoring.thresholds.find(t => total >= t.min && total <= t.max) || null;
  }

  container.innerHTML = `
    <div class="max-w-reading mx-auto px-5 py-8 md:py-12">
      <div class="mb-8">
        <h2 class="text-headline-md font-headline font-bold text-on-surface mb-2">${escapeHtml(activity.title)}</h2>
        <p class="text-body-md text-on-surface-variant">Chấm điểm từ ${scale.min} (${escapeHtml(scale.minLabel)}) đến ${scale.max} (${escapeHtml(scale.maxLabel)})</p>
      </div>
      <div id="survey-questions" class="space-y-4"></div>
      <div id="score-box" class="sticky bottom-20 md:bottom-16 mt-8 card-elite p-5 z-10 context-stripe"></div>
    </div>
  `;

  const questionsEl = container.querySelector('#survey-questions');
  questions.forEach((q, i) => questionsEl.appendChild(buildQuestionCard(q, i)));
  updateScoreBox();

  function buildQuestionCard(q, index) {
    const card = document.createElement('div');
    card.className = 'card-elite p-6 md:p-8';
    const selected = answers[q.id] || 0;
    const pillCount = scale.max - scale.min + 1;

    card.innerHTML = `
      <div class="flex flex-col md:flex-row md:items-start gap-4">
        <div class="flex-1 min-w-0">
          <p class="text-body-md font-ui font-semibold text-on-surface mb-1">
            <span class="text-on-surface-variant mr-2">${index + 1}.</span>${escapeHtml(q.text)}
          </p>
          ${q.helper ? `<p class="text-label-sm text-on-surface-variant">${escapeHtml(q.helper)}</p>` : ''}
        </div>
        <div class="flex items-center gap-2 shrink-0">
          <span class="text-label-sm text-on-surface-variant hidden md:inline">${escapeHtml(scale.minLabel)}</span>
          <div class="flex gap-1.5 pills-row"></div>
          <span class="text-label-sm text-on-surface-variant hidden md:inline">${escapeHtml(scale.maxLabel)}</span>
        </div>
      </div>
    `;

    const pillsRow = card.querySelector('.pills-row');
    for (let i = 0; i < pillCount; i++) {
      const val = scale.min + i;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = val;
      btn.dataset.value = val;
      applyPillStyle(btn, val === selected);
      btn.addEventListener('click', () => onPillClick(q.id, val, card));
      pillsRow.appendChild(btn);
    }

    return card;
  }

  function applyPillStyle(btn, active) {
    btn.className = `scoring-pill w-11 h-11 rounded-full border-[1.5px] text-body-md font-ui font-semibold cursor-pointer focus-ring ${active ? 'active-pill' : 'bg-surface-container-lowest border-outline-variant text-on-surface-variant hover:border-primary'}`;
  }

  function onPillClick(questionId, value, card) {
    answers[questionId] = value;
    card.querySelectorAll('.scoring-pill').forEach(btn => {
      applyPillStyle(btn, parseInt(btn.dataset.value, 10) === value);
    });
    updateScoreBox();
    onChange({ answers: { ...answers }, totalScore: getTotal() });
  }

  function updateScoreBox() {
    const total = getTotal();
    const answered = getAnsweredCount();
    const threshold = getThreshold(total);
    const progress = (answered / questions.length) * 100;
    const scoreBox = container.querySelector('#score-box');
    if (!scoreBox) return;

    let thresholdHtml = '';
    if (threshold && answered > 0) {
      const colorMap = {
        success: { text: 'text-success-emerald', bg: 'bg-green-50' },
        warning: { text: 'text-amber-600', bg: 'bg-amber-50' },
        error: { text: 'text-error', bg: 'bg-red-50' },
      };
      const colors = colorMap[threshold.level] || colorMap.success;
      thresholdHtml = `
        <div class="${colors.bg} rounded-lg p-4 mt-3">
          <p class="${colors.text} font-ui font-bold text-body-md">${escapeHtml(threshold.label)}</p>
          <p class="text-label-sm text-on-surface-variant mt-1">${escapeHtml(threshold.description)}</p>
        </div>`;
    }

    scoreBox.innerHTML = `
      <div class="flex items-center justify-between mb-3">
        <span class="text-label-sm font-ui font-semibold text-on-surface-variant">${answered}/${questions.length} đã trả lời</span>
        <span class="text-headline-sm font-headline font-bold text-on-surface">Tổng: ${total}</span>
      </div>
      <div class="progress-track mb-1">
        <div class="progress-fill" style="width: ${progress}%"></div>
      </div>
      ${thresholdHtml}`;
  }
}
