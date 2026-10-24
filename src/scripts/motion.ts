// Scroll motion loader — see "Motion rules" in CLAUDE.md.
// The animation code (GSAP + Lenis) loads after the page has painted,
// so it never delays the first view. Without JS, or with
// prefers-reduced-motion, the page is fully visible and static.

const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function start() {
  import('./motion-core').then((m) => m.init());
}

if (!reduced) {
  const idle = (cb: () => void) =>
    'requestIdleCallback' in window ? window.requestIdleCallback(cb, { timeout: 1200 }) : setTimeout(cb, 200);
  if (document.readyState === 'complete') idle(start);
  else window.addEventListener('load', () => idle(start), { once: true });
}
