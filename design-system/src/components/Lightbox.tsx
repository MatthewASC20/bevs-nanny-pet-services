import * as React from 'react';
import { isVideo, posterFor } from '../media';

// The carousel's chevron glyph — same paths as the site's lbChevron().
function Chevron({ left }: { left?: boolean }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4}
      strokeLinecap="round" strokeLinejoin="round">
      <path d={left ? 'M15 5l-7 7 7 7' : 'M9 5l7 7-7 7'} />
    </svg>
  );
}

export interface LightboxProps {
  /** Show or hide the overlay. */
  open: boolean;
  /** Called on Esc, the close button, or a backdrop click. */
  onClose: () => void;
  /** Gallery items — stills and `.mp4`/`.webm` clips mix freely. */
  items: string[];
  /** Caption name, e.g. the pet's name. */
  name?: string;
  /** Screen-reader description of the gallery's subject. */
  alt?: string;
  /** Which item to show first each time the lightbox opens. */
  startIndex?: number;
}

/**
 * The photo/video carousel overlay: dark backdrop, high-contrast prev/next
 * pills, dots, caption with a counter, arrow-key and swipe navigation, Esc to
 * close. Clips get native controls and stop the moment you navigate or close.
 * Arrows hide on single-item galleries. Pair with `ShowCard`'s `onOpen`.
 *
 * ```tsx
 * const [open, setOpen] = React.useState(false);
 * <ShowCard title="Ku-ki" photos={photos} onOpen={() => setOpen(true)} />
 * <Lightbox open={open} onClose={() => setOpen(false)} items={photos} name="Ku-ki" />
 * ```
 */
export function Lightbox({ open, onClose, items, name = '', alt, startIndex = 0 }: LightboxProps) {
  const [idx, setIdx] = React.useState(startIndex);
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const closeRef = React.useRef<HTMLButtonElement | null>(null);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const touchX = React.useRef<number | null>(null);
  const n = items.length;
  const multi = n > 1;

  React.useEffect(() => { if (open) setIdx(Math.min(startIndex, Math.max(0, n - 1))); }, [open, startIndex, n]);

  const go = React.useCallback((d: number) => {
    videoRef.current?.pause();
    setIdx((i) => (i + d + n) % n);
  }, [n]);

  // Scroll lock + focus management, once per open: remember the opener
  // (usually the clicked ShowCard), move focus to the close button, and hand
  // focus back on close.
  React.useEffect(() => {
    if (!open) return;
    const lastFocus = document.activeElement as HTMLElement | null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      lastFocus?.focus?.();
    };
  }, [open]);

  // Esc / arrows / Tab, document-level (capture) while open. Arrow keys are
  // ignored when the focused element is the video, so they don't seek the clip
  // AND change slide. Tab is trapped inside the dialog; a video's native
  // controls live in a shadow root the query can't see, so focus that has
  // escaped the dialog entirely is pulled back to the first stop.
  React.useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      const inMedia = (e.target as HTMLElement | null)?.tagName === 'VIDEO';
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (!inMedia && e.key === 'ArrowLeft' && multi) go(-1);
      else if (!inMedia && e.key === 'ArrowRight' && multi) go(1);
      else if (e.key === 'Tab') {
        const root = rootRef.current;
        if (!root) return;
        const stops = Array.from(root.querySelectorAll<HTMLElement>('button, video, [tabindex]'))
          .filter((el) => !el.hidden && el.offsetParent !== null);
        if (!stops.length) return;
        const first = stops[0];
        const last = stops[stops.length - 1];
        if (!root.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
        else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener('keydown', onKeyDown, true);
    return () => document.removeEventListener('keydown', onKeyDown, true);
  }, [open, multi, go, onClose]);

  if (!open || n === 0) return null;

  const src = items[idx] ?? '';
  const vid = isVideo(src);
  const label = `${alt || name || 'Photo'} — ${vid ? 'video' : 'photo'} ${idx + 1} of ${n}`;

  return (
    <div ref={rootRef} className="lightbox open" role="dialog" aria-modal="true" aria-label="Photo gallery"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <button className="lb-close" type="button" aria-label="Close photos" ref={closeRef} onClick={onClose}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
      <div className="lb-stage"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        onTouchStart={(e) => { touchX.current = e.changedTouches[0].clientX; }}
        onTouchEnd={(e) => {
          if (touchX.current === null || !multi) return;
          const dx = e.changedTouches[0].clientX - touchX.current;
          touchX.current = null;
          if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
        }}>
        <button className="lb-prev" type="button" aria-label="Previous photo" hidden={!multi} onClick={() => go(-1)}>
          <Chevron left />
        </button>
        {vid ? (
          // key remounts the element per item, releasing the old clip's buffer
          <video key={src} ref={videoRef} className="lb-img" src={src} poster={posterFor(src)}
            controls playsInline preload="metadata" aria-label={label} />
        ) : (
          <img className="lb-img" src={src} alt={label} />
        )}
        <button className="lb-next" type="button" aria-label="Next photo" hidden={!multi} onClick={() => go(1)}>
          <Chevron />
        </button>
      </div>
      <div className="lb-caption">{name}{multi ? `  ·  ${idx + 1} / ${n}` : ''}</div>
      <div className="lb-dots">
        {multi ? items.map((_, k) => (
          <button key={k} type="button" className={`lb-dot${k === idx ? ' active' : ''}`}
            aria-label={`Go to photo ${k + 1}`} onClick={() => { videoRef.current?.pause(); setIdx(k); }} />
        )) : null}
      </div>
    </div>
  );
}
