/**
 * unit-stepper.js — Unit stepper for Module 2
 *
 * Each unit has up to 3 sub-steps: lecture → quiz → practice.
 * If a unit has no `practice` section, only lecture and quiz are shown.
 * Purpose has been merged into lecture, so there is no separate purpose step.
 *
 * Usage:
 *   const stepper = new UnitStepper(unit, containerElement, () => {
 *     // called when all steps are completed
 *   });
 *   stepper.render();
 *
 * Rules:
 *   - onUnitComplete is a callback; this component does NOT import shell.js.
 *   - Renderers for lecture/quiz/practice are loaded dynamically; if they do not
 *     exist yet (skeleton phase), a placeholder is rendered without crashing.
 */

import { escapeHtml } from '../utils/dom.js';

export const STEPS = ['lecture', 'quiz', 'practice'];

const STEP_LABELS = {
  lecture: 'Bài giảng',
  quiz: 'Kiểm tra',
  practice: 'Thực hành',
};

export class UnitStepper {
  constructor(unit, container, onUnitComplete) {
    this.unit = unit;
    this.container = container;
    this.onUnitComplete = onUnitComplete;
    this.currentStep = 0;
    this.steps = unit?.practice ? STEPS : STEPS.slice(0, 2);
  }

  /**
   * Advance to the next step, or notify caller when the unit is complete.
   */
  goNext() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.render();
    } else if (typeof this.onUnitComplete === 'function') {
      this.onUnitComplete();
    }
  }

  /**
   * Optionally go back one step (useful if caller wants to expose navigation).
   */
  goBack() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.render();
    }
  }

  /**
   * Render the step progress bar.
   * Style: 3px thin track with teal fill; dots mark each step.
   */
  renderStepBar() {
    const wrapper = document.createElement('div');
    wrapper.className = 'sticky top-16 z-30 bg-surface/95 backdrop-blur-md border-b border-outline-variant/50 flex';

    this.steps.forEach((step, index) => {
      const isActive = index === this.currentStep;
      const isCompleted = index < this.currentStep;

      const tab = document.createElement('div');
      tab.className = `flex-1 flex items-center justify-center gap-2 h-12 border-b-2 transition-all ${
        isActive
          ? 'border-primary text-primary'
          : isCompleted
            ? 'border-transparent text-on-surface'
            : 'border-transparent text-on-surface-variant'
      }`;

      const icon = isCompleted
        ? `<span class="material-symbols-outlined text-[16px] text-success-emerald">check_circle</span>`
        : isActive
          ? `<span class="w-2 h-2 rounded-full bg-primary shrink-0"></span>`
          : `<span class="w-2 h-2 rounded-full bg-outline-variant shrink-0"></span>`;

      tab.innerHTML = `
        ${icon}
        <span class="text-label-sm font-ui ${isActive ? 'font-bold' : isCompleted ? 'font-semibold' : ''}">${STEP_LABELS[step]}</span>
      `;

      wrapper.appendChild(tab);
    });

    return wrapper;
  }

  /**
   * Render placeholder content when a step renderer is not yet available.
   */
  renderPlaceholder(step) {
    const section = document.createElement('section');
    section.className = 'max-w-reading mx-auto px-5 py-8 md:py-section';
    section.innerHTML = `
      <div class="card-elite p-8 md:p-12 context-stripe text-center">
        <span class="material-symbols-outlined text-5xl text-primary/40 mb-4">school</span>
        <h2 class="text-headline-md font-headline font-bold text-on-surface mb-2">
          ${STEP_LABELS[step]} — ${escapeHtml(this.unit.title || this.unit.id)}
        </h2>
        <p class="text-body-md text-on-surface-variant mb-8">
          Nội dung ${STEP_LABELS[step].toLowerCase()} sẽ được render tại đây khi renderer tương ứng sẵn sàng.
        </p>
        <button id="unit-step-next" class="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-on-primary font-ui font-bold hover:bg-primary-container transition-colors min-h-[44px]">
          Tiếp theo
          <span class="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    `;
    section.querySelector('#unit-step-next').addEventListener('click', () => this.goNext());
    return section;
  }

  /**
   * Render the full unit stepper: progress bar + current step content.
   *
   * In the skeleton phase, if the lecture/quiz/practice renderer does not exist,
   * this falls back to a placeholder so the stepper remains testable without
   * crashing.
   *
   * Known issue: `render()` is async because of dynamic imports; rapid user
   * clicks while a renderer is loading could race. Not blocking merge — tracked
   * for follow-up.
   */
  async render() {
    if (!this.container) return;

    this.container.innerHTML = '';

    const stepBar = this.renderStepBar();
    this.container.appendChild(stepBar);

    const step = this.steps[this.currentStep];

    try {
      const mod = await import(`../renderers/${step}.js`);
      if (typeof mod.render === 'function') {
        // Renderers receive: container, unit, onComplete callback
        mod.render(this.container, this.unit, () => this.goNext());
      } else {
        throw new Error(`Renderer ${step}.js has no render export`);
      }
    } catch (err) {
      // Skeleton fallback: render a placeholder and allow manual progression.
      console.log(`Renderer ${step}.js not available yet, showing placeholder`, err);
      const placeholder = this.renderPlaceholder(step);
      this.container.appendChild(placeholder);
    }
  }
}
