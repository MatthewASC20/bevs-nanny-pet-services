import * as React from 'react';
import { Icon } from '../icons';
import { Eyebrow } from './SectionHead';

export interface TestimonialProps {
  /** Kicker, e.g. "Kind words". */
  eyebrow?: string;
  /** Star count, 0–5. */
  stars?: number;
  /**
   * The quote. Wrap phrases in `[[double brackets]]` to highlight them in
   * honey — same markup the site's content file uses. Quote marks are added.
   */
  quote: string;
  author: string;
  /** Detail under the author, e.g. "Parent, Upper West Side". */
  authorDetail?: string;
  /** Small footnote, e.g. "References available on request." */
  note?: string;
  className?: string;
}

function richQuote(q: string): React.ReactNode[] {
  return q.split(/\[\[(.+?)\]\]/g).map((part, i) =>
    i % 2 === 1 ? <span key={i} className="hl">{part}</span> : part
  );
}

/**
 * The centred testimonial block for the deep-green "Kind words" band: stars,
 * a display-face quote with optional honey highlights, author, and footnote.
 * Compose inside `<section className="section testimonial">` for the band.
 *
 * ```tsx
 * <Testimonial stars={5} eyebrow="Kind words"
 *   quote="Beverly is [[endlessly patient]] and our dog adores her."
 *   author="The Venkatesan family" authorDetail="Nanny & pet care, 6 years" />
 * ```
 */
export function Testimonial({ eyebrow, stars = 0, quote, author, authorDetail, note, className }: TestimonialProps) {
  const n = Math.max(0, Math.min(5, Math.floor(stars)));
  return (
    <div className={className} style={{ textAlign: 'center' }}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      {n > 0 ? (
        <div className="t-stars" aria-label={`${n} star reference`}>
          {Array.from({ length: n }, (_, i) => <Icon key={i} name="star" />)}
        </div>
      ) : null}
      <p className="t-quote full">&ldquo;{richQuote(quote)}&rdquo;</p>
      <div className="t-author">{author}{authorDetail ? <span>{authorDetail}</span> : null}</div>
      {note ? <p className="t-note">{note}</p> : null}
    </div>
  );
}
