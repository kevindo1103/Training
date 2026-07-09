/**
 * quiz.js — Formative quiz renderer for Module 2 unit stepper
 *
 * Config shape (nested under unit.quiz):
 * {
 *   type: 'quiz',
 *   questions: [
 *     {
 *       id: 'q1',
 *       text: 'Câu hỏi...',
 *       options: ['A. ...', 'B. ...', 'C. ...', 'D. ...'],
 *       correct: 1,        // index 0-based
 *       explanation: '...'
 *     }
 *   ]
 * }
 *
 * Behavior:
 *   - Renders all questions at once for a compact mobile screen.
 *   - After submit: highlights correct answer (green) and wrong answers (red),
 *     shows explanation for each question.
 *   - Computes score (X/Y correct) and saves it to the store via setUnitResponse.
 *   - Does NOT gate progression — "Tiếp tục" is always available after submit.
 *   - Calls onQuizComplete(score, answers) then the caller's onComplete callback.
 */

import { escapeHtml } from '../utils/dom.js';
import { setUnitResponse } from '../store.js';

// Normalize options to [{key, label}] regardless of array or object format.
// Array format: options=["A. x","B. y"], correct=0 (index)
// Object format: options={A:"x",B:"y"}, correct="B" (key)
function getOptionEntries(options) {
  if (Array.isArray(options)) {
    return options.map((text, i) => ({ key: String(i), label: text }));
  }
  if (options && typeof options === 'object') {
    return Object.entries(options).map(([k, v]) => ({ key: k, label: `${k}. ${v}` }));
  }
  return [];
}

function getCorrectKey(question) {
  return String(question.correct);
}

export async function render(container, unit, onComplete) {
  const config = unit?.quiz || unit || {};
  const questions = Array.isArray(config.questions) ? config.questions : [];

  const contentEl = document.createElement('div');
  contentEl.className = 'max-w-reading mx-auto px-5 py-8 md:py-section';
  container.appendChild(contentEl);

  if (questions.length === 0) {
    renderSkeleton(contentEl, config, unit);
    renderContinueButton(container, onComplete);
    return;
  }

  const state = {
    answers: new Array(questions.length).fill(null),
    submitted: false,
  };

  const form = document.createElement('form');
  form.className = 'space-y-8';
  form.addEventListener('submit', (e) => e.preventDefault());

  questions.forEach((question, index) => {
    const fieldset = createQuestionFieldset(question, index, state);
    form.appendChild(fieldset);
  });

  contentEl.appendChild(form);

  const footer = document.createElement('div');
  footer.className = 'max-w-reading mx-auto px-5 pb-12 md:pb-section';
  container.appendChild(footer);

  const submitBtn = document.createElement('button');
  submitBtn.type = 'button';
  submitBtn.className = 'w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-ui font-bold hover:bg-primary-container transition-colors min-h-[44px]';
  submitBtn.innerHTML = `
    Nộp bài
    <span class="material-symbols-outlined text-[18px]">check</span>
  `;
  submitBtn.addEventListener('click', () => handleSubmit(questions, state, form, footer, submitBtn, onComplete, unit));
  footer.appendChild(submitBtn);
}

function createQuestionFieldset(question, index, state) {
  const fieldset = document.createElement('fieldset');
  fieldset.className = 'card-elite p-5 md:p-6';
  fieldset.dataset.questionIndex = String(index);

  const legend = document.createElement('legend');
  legend.className = 'font-headline font-bold text-headline-sm text-on-surface mb-4';
  legend.innerHTML = `<span class="text-primary mr-2">${index + 1}.</span>${escapeHtml(question.text)}`;
  fieldset.appendChild(legend);

  const optionsWrap = document.createElement('div');
  optionsWrap.className = 'space-y-3';

  const optionEntries = getOptionEntries(question.options);
  optionEntries.forEach(({ key, label: optText }) => {
    const optionId = `q-${index}-opt-${key}`;
    const label = document.createElement('label');
    label.className = 'flex items-start gap-3 p-3 rounded-lg bg-surface-container-low hover:bg-surface-container transition-colors cursor-pointer min-h-[44px]';
    label.htmlFor = optionId;
    label.innerHTML = `
      <input type="radio" name="q-${index}" id="${optionId}" value="${key}" class="mt-1 accent-primary">
      <span class="text-body-md text-on-surface-variant">${escapeHtml(optText)}</span>
    `;

    const radio = label.querySelector('input');
    radio.addEventListener('change', () => {
      if (!state.submitted) {
        state.answers[index] = key;
      }
    });

    optionsWrap.appendChild(label);
  });

  fieldset.appendChild(optionsWrap);

  const explanationEl = document.createElement('div');
  explanationEl.className = 'mt-4 hidden';
  explanationEl.dataset.explanation = 'true';
  explanationEl.innerHTML = `
    <p class="text-body-md text-on-surface-variant bg-surface-container-low p-4 rounded-lg border-l-4 border-l-primary">
      <strong class="text-on-surface">Giải thích:</strong> ${escapeHtml(question.explanation || '')}
    </p>
  `;
  fieldset.appendChild(explanationEl);

  return fieldset;
}

function handleSubmit(questions, state, form, footer, submitBtn, onComplete, unit) {
  if (state.submitted) return;

  const unanswered = state.answers.includes(null);
  if (unanswered) {
    const firstUnanswered = state.answers.findIndex((a) => a === null);
    const fieldset = form.querySelector(`[data-question-index="${firstUnanswered}"]`);
    fieldset?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    fieldset?.classList.add('ring-2', 'ring-error/50', 'rounded-lg');
    setTimeout(() => fieldset?.classList.remove('ring-2', 'ring-error/50', 'rounded-lg'), 2000);
    return;
  }

  state.submitted = true;

  let score = 0;
  questions.forEach((question, index) => {
    const selected = state.answers[index];
    const correctKey = getCorrectKey(question);
    const isCorrect = selected === correctKey;
    if (isCorrect) score++;

    const fieldset = form.querySelector(`[data-question-index="${index}"]`);
    if (!fieldset) return;

    const radios = fieldset.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      radio.disabled = true;
      const label = radio.closest('label');
      if (!label) return;

      label.classList.remove('bg-surface-container-low', 'hover:bg-surface-container');

      if (radio.value === correctKey) {
        label.classList.add('bg-success-emerald/10', 'border', 'border-success-emerald');
      } else if (radio.value === selected && !isCorrect) {
        label.classList.add('bg-error/10', 'border', 'border-error');
      } else {
        label.classList.add('bg-surface-container-lowest', 'opacity-70');
      }
    });

    const explanation = fieldset.querySelector('[data-explanation="true"]');
    if (explanation) explanation.classList.remove('hidden');
  });

  // Score summary
  const summary = document.createElement('div');
  summary.className = 'card-elite p-5 md:p-6 mb-6 bg-primary-container/10 border border-primary-container';
  summary.innerHTML = `
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div>
        <h3 class="font-headline font-bold text-headline-sm text-on-surface">Kết quả</h3>
        <p class="text-body-md text-on-surface-variant">${score}/${questions.length} câu đúng</p>
      </div>
      <button id="quiz-continue" class="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-ui font-bold hover:bg-primary-container transition-colors min-h-[44px]">
        Tiếp tục
        <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
      </button>
    </div>
  `;
  footer.insertBefore(summary, submitBtn);
  submitBtn.remove();

  // Persist
  const moduleId = unit?.moduleId || 'module2';
  const unitId = unit?.id;
  if (!unitId) {
    console.warn('quiz.js: unit.id missing, cannot persist quiz response reliably');
  }
  if (unitId) {
    setUnitResponse(moduleId, unitId, 'quiz', {
      score,
      total: questions.length,
      answers: state.answers,
      completedAt: Date.now(),
    });
  }

  // Callback
  if (typeof onComplete === 'function') {
    summary.querySelector('#quiz-continue').addEventListener('click', () => {
      onComplete(score, state.answers);
    });
  }
}

function renderContinueButton(container, onComplete, score, answers) {
  const footer = document.createElement('div');
  footer.className = 'max-w-reading mx-auto px-5 pb-12 md:pb-section';
  footer.innerHTML = `
    <button id="quiz-continue" class="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-ui font-bold hover:bg-primary-container transition-colors min-h-[44px]">
      Tiếp tục
      <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
    </button>
  `;
  container.appendChild(footer);

  const continueBtn = footer.querySelector('#quiz-continue');
  if (continueBtn && typeof onComplete === 'function') {
    continueBtn.addEventListener('click', () => onComplete(score ?? 0, answers ?? []));
  }
}

function renderSkeleton(container, config, unit) {
  const wrapper = document.createElement('section');
  wrapper.className = 'mb-8';
  wrapper.innerHTML = `
    <div class="card-elite p-8 md:p-12 context-stripe text-center">
      <span class="material-symbols-outlined text-5xl text-primary/40 mb-4">quiz</span>
      <h2 class="text-headline-md font-headline font-bold text-on-surface mb-2">${escapeHtml(config.title || unit?.title || 'Kiểm tra')}</h2>
      <p class="text-body-md text-on-surface-variant mb-8">Câu hỏi quiz chưa sẵn sàng. Skeleton này sẽ được thay thế khi config hoàn thiện.</p>
      <div class="space-y-3 max-w-md mx-auto text-left">
        <div class="h-3 bg-surface-container-high rounded animate-pulse"></div>
        <div class="h-3 bg-surface-container-high rounded animate-pulse w-5/6"></div>
        <div class="h-3 bg-surface-container-high rounded animate-pulse w-4/6"></div>
      </div>
    </div>
  `;
  container.appendChild(wrapper);
}
