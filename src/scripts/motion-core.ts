import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

export function init() {
  gsap.registerPlugin(ScrollTrigger);

  // Smooth scrolling, synced with ScrollTrigger.
  const lenis = new Lenis({ lerp: 0.11 });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);

  // In-page anchors go through Lenis so they stay smooth.
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"], a[href^="/#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const href = a.getAttribute('href')!;
      if (href.startsWith('/#') && location.pathname !== '/') return;
      const id = href.replace(/^\//, '');
      const target = id === '#top' ? 0 : document.querySelector<HTMLElement>(id);
      if (target === null) return;
      e.preventDefault();
      lenis.scrollTo(target, { offset: -80 });
    });
  });

  // 1. Fade-and-rise reveals (elements start hidden via CSS .motion [data-reveal]).
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.to(el, {
      y: 0,
      opacity: 1,
      duration: 0.9,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
    });
  });

  // 2. Hand-drawn lines draw themselves.
  gsap.utils.toArray<SVGPathElement>('path[data-draw]').forEach((path) => {
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len, opacity: 1 });
    if (path.dataset.draw === 'load') {
      gsap.to(path, { strokeDashoffset: 0, duration: 1.1, delay: 0.2, ease: 'power2.inOut' });
    } else {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: { trigger: path.closest('svg'), start: 'top 90%', end: 'bottom 35%', scrub: 0.6 },
      });
    }
  });

  // 3. Gentle photo parallax (≤ 8%).
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((img) => {
    gsap.fromTo(
      img,
      { yPercent: -4 },
      {
        yPercent: 4,
        ease: 'none',
        scrollTrigger: { trigger: img.closest('.frame') ?? img, start: 'top bottom', end: 'bottom top', scrub: true },
      },
    );
  });

  // Expanding text changes the page height.
  window.addEventListener('copy:toggle', () => {
    lenis.resize();
    ScrollTrigger.refresh();
  });

  document.documentElement.classList.add('motion-ready');
}
