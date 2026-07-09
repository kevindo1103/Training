export function renderBottomBar(currentIndex, total, onBack, onNext) {
  const bar = document.createElement('footer');
  bar.className =
    'fixed bottom-0 left-0 right-0 md:left-72 h-16 z-40 bg-surface/95 backdrop-blur-md border-t border-outline-variant/50 px-5 md:px-8 flex items-center justify-between gap-4';

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  const progress = document.createElement('div');
  progress.className = 'flex-1 hidden md:flex items-center gap-1.5';
  progress.setAttribute('role', 'progressbar');
  progress.setAttribute('aria-valuemin', '0');
  progress.setAttribute('aria-valuemax', String(total));
  progress.setAttribute('aria-valuenow', String(currentIndex + 1));
  for (let i = 0; i < total; i++) {
    const seg = document.createElement('div');
    seg.className = `h-1 flex-1 rounded-full transition-all duration-300 ${i <= currentIndex ? 'bg-primary' : 'bg-outline-variant/40'}`;
    progress.appendChild(seg);
  }

  const mobileProgress = document.createElement('div');
  mobileProgress.className = 'flex md:hidden flex-col gap-1 flex-1 min-w-0';
  mobileProgress.setAttribute('role', 'progressbar');
  mobileProgress.setAttribute('aria-valuemin', '0');
  mobileProgress.setAttribute('aria-valuemax', String(total));
  mobileProgress.setAttribute('aria-valuenow', String(currentIndex + 1));
  mobileProgress.innerHTML = `
    <span class="text-label-sm font-ui font-semibold text-on-surface-variant">${currentIndex + 1} / ${total}</span>
    <div class="progress-track">
      <div class="progress-fill" style="width: ${((currentIndex + 1) / total) * 100}%"></div>
    </div>
  `;

  const backBtn = document.createElement('button');
  backBtn.className = `flex items-center gap-1.5 px-4 py-2 rounded-lg font-ui font-semibold text-body-md border border-outline-variant/60 text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-all min-h-[40px] ${isFirst ? 'invisible' : ''}`;
  backBtn.innerHTML = `<span class="material-symbols-outlined text-[18px]">arrow_back</span> Quay lại`;
  backBtn.addEventListener('click', onBack);

  const nextBtn = document.createElement('button');
  if (onNext) {
    nextBtn.className =
      'flex items-center gap-1.5 px-5 py-2 rounded-lg font-ui font-bold text-body-md bg-primary text-on-primary hover:bg-primary-container transition-all min-h-[40px]';
    nextBtn.innerHTML = isLast
      ? `Tổng kết <span class="material-symbols-outlined text-[18px]">summarize</span>`
      : `Tiếp theo <span class="material-symbols-outlined text-[18px]">arrow_forward</span>`;
    nextBtn.addEventListener('click', onNext);
  } else {
    nextBtn.className = 'invisible min-h-[40px]';
  }

  bar.appendChild(progress);
  bar.appendChild(mobileProgress);
  bar.appendChild(backBtn);
  bar.appendChild(nextBtn);

  return bar;
}
