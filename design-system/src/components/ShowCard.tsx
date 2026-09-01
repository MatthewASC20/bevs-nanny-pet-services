import * as React from 'react';
import { Icon } from '../icons';
import { isVideo, posterFor } from '../media';

export interface ShowCardProps {
  /** Card title — the pet's or child's name. */
  title: string;
  /** One-line note under the title. */
  sub?: string;
  /**
   * Gallery items, first is the thumbnail. Stills (`.jpg`…) and short clips
   * (`.mp4`/`.webm`) mix freely; a clip first becomes a quietly looping
   * thumbnail with a play badge (its poster is the same-named `.jpg`).
   * Empty list renders a paw placeholder tile.
   */
  photos?: string[];
  /** Screen-reader description of the gallery's subject. */
  alt?: string;
  /** Called on click / Enter / Space — open your `Lightbox` here. */
  onOpen?: () => void;
  className?: string;
}

/**
 * The showcase card used for pets (and photo-cleared children): a 4:3 media
 * thumbnail with photo-count and play badges, hover view overlay, then title
 * and note. Clips autoplay muted only while on screen, and not at all for
 * visitors who prefer reduced motion.
 *
 * ```tsx
 * <ShowCard title="Ku-ki" sub="A big gentle soul." alt="Ku-ki, a Rottweiler"
 *   photos={["pet-1/1.jpg", "pet-1/2.jpg"]} onOpen={() => setOpen(true)} />
 * ```
 */
export function ShowCard({ title, sub, photos = [], alt, onOpen, className }: ShowCardProps) {
  const lead = photos[0];
  const leadIsVideo = lead ? isVideo(lead) : false;
  const videoRef = React.useRef<HTMLVideoElement | null>(null);

  // Clips play only while on screen; prefers-reduced-motion suppresses the
  // loop entirely (CSS can't pause a video, so the check lives here).
  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (typeof window.matchMedia === 'function' &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) { v.preload = 'auto'; v.play().catch(() => {}); }
        else v.pause();
      });
    }, { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, [lead]);

  const clickable = photos.length > 0 && !!onOpen;
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen?.(); }
  };

  return (
    <article
      className={['show-card', className].filter(Boolean).join(' ')}
      {...(clickable ? {
        'data-gallery': true, role: 'button', tabIndex: 0,
        'aria-label': `View photos of ${title}`, onClick: onOpen, onKeyDown: onKey,
      } : {})}
    >
      <div className="card-photo">
        {lead ? (
          leadIsVideo ? (
            <>
              <video ref={videoRef} src={lead} poster={posterFor(lead)}
                muted loop playsInline preload="none" tabIndex={-1} aria-label={alt ?? title} />
              <span className="card-play"><Icon name="play" /></span>
            </>
          ) : (
            <img src={lead} alt={alt ?? title} />
          )
        ) : (
          <Icon name="pawfill" size={52} />
        )}
        {lead ? <div className="card-view"><Icon name="expand" /></div> : null}
        {photos.length > 1 ? (
          <span className="card-count"><Icon name="camera" /> {photos.length}</span>
        ) : null}
      </div>
      <div className="card-body">
        <div className="card-title">{title}</div>
        {sub ? <p className="card-sub">{sub}</p> : null}
      </div>
    </article>
  );
}
