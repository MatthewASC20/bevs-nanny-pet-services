import * as React from 'react';

/**
 * The reveal stagger — cycles `''`, `' d1'`, `' d2'` every three items so card
 * grids fade in with a small cascade. Append to a `reveal` className:
 * `className={'reveal' + revealDelay(i)}`.
 */
export function revealDelay(i: number): string {
  return ['', ' d1', ' d2'][i % 3];
}

/**
 * Drives the site's one-shot scroll-reveal choreography: observes every
 * `.reveal` element in the document, adds `.in` when it enters the viewport
 * (threshold 0.12, bottom margin -40px), and unobserves — elements never
 * re-animate. Call once at the page level AFTER content has mounted (gate on
 * your ready flag). `prefers-reduced-motion` is honoured by the stylesheet,
 * which forces `.reveal` visible. No library component emits `class="reveal"`
 * — the page passes it via `className`.
 *
 * ```tsx
 * useRevealObserver(status === 'ready');
 * ```
 */
export function useRevealObserver(active: boolean): void {
  React.useEffect(() => {
    if (!active) return;
    const els = Array.from(document.querySelectorAll('.reveal'));
    if (typeof IntersectionObserver === 'undefined') {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [active]);
}
