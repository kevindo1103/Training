/**
 * bottombar.js — BottomNavBar
 * Back / Next buttons + 6-segment progress bar
 * Fixed bottom; mobile full-width, desktop nằm trong content area (md:left-80)
 */

export function renderBottomBar(currentIndex, total, onBack, onNext) {
  const bar = document.createElement('footer');
  bar.className =
    'fixed bottom-0 left-0 right-0 md:left-80 h-20 z-40 bg-surface/95 backdrop-blur border-t border-outline-variant px-4 md:px-8 flex items-center justify-between gap-4';

  const isFirst = currentIndex === 0;
  const isLast = currentIndex === total - 1;

  const progress = document.createElement('div');
  progress.className = 'flex-1 hidden md:flex items-center gap-2';
  progress.setAttribute('role', 'progressbar');
  progress.setAttribute('aria-valuemin', '0');
  progress.setAttribute('aria-valuemax', String(total));
  progress.setAttribute('aria-valuenow', String(currentIndex + 1));
  for (let i = 0; i < total; i++) {
    const seg = document.createElement('div');
    seg.className = `h-1.5 flex-1 rounded-full transition-colors ${i <= currentIndex ? 'bg-primary' : 'bg-outline-variant'}`;
    progress.appendChild(seg);
  }

  const mobileProgress = document.createElement('div');
  mobileProgress.className = 'flex md:hidden flex-col gap-1 flex-1 min-w-0';
  mobileProgress.setAttribute('role', 'progressbar');
  mobileProgress.setAttribute('aria-valuemin', '0');
  mobileProgress.setAttribute('aria-valuemax', String(total));
  mobileProgress.setAttribute('aria-valuenow', String(currentIndex + 1));
  mobileProgress.innerHTML = `
    <span class="text-label-sm font-ui font-semibold text-on-surface-variant">Activity ${currentIndex + 1} / ${total}</span>
    <div class="h-1.5 w-full rounded-full bg-outline-variant overflow-hidden">
      <div class="h-full bg-primary rounded-full transition-all" style="width: ${((currentIndex + 1) / total) * 100}%"></div>
    </div>
  `;

  const backBtn = document.createElement('button');
  backBtn.className = `px-5 py-2.5 rounded-lg font-ui font-semibold border border-outline text-on-surface hover:bg-surface-container-high min-h-[44px] ${isFirst ? 'invisible' : ''}`;
  backBtn.textContent = 'Quay lại';
  backBtn.addEventListener('click', onBack);

  const nextBtn = document.createElement('button');
  nextBtn.className =
    'px-5 py-2.5 rounded-lg font-ui font-semibold bg-primary text-on-primary hover:bg-primary-container disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px]';
  nextBtn.textContent = isLast ? 'Hoàn thành' : 'Tiếp theo';
  nextBtn.addEventListener('click', onNext);

  bar.appendChild(progress);
  bar.appendChild(mobileProgress);
  bar.appendChild(backBtn);
  bar.appendChild(nextBtn);

  return bar;
}
