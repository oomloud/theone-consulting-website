// "Read more" controls for the expandable copy version (see Text.astro).
document.querySelectorAll<HTMLElement>('[data-xt]').forEach((box) => {
  const btn = box.querySelector<HTMLButtonElement>('.xt__btn');
  const short = box.querySelector<HTMLElement>('.xt__short');
  const full = box.querySelector<HTMLElement>('.xt__full');
  if (!btn || !short || !full) return;
  const more = btn.dataset.more ?? 'Read more';
  const less = btn.dataset.less ?? 'Show less';
  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    short.hidden = !open;
    full.hidden = open;
    btn.textContent = open ? more : less;
    // Page height changed: let scroll animations re-measure.
    window.dispatchEvent(new Event('copy:toggle'));
  });
});
