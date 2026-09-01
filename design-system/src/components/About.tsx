import * as React from 'react';
import { LeafStrip } from './LeafStrip';
import { Eyebrow } from './SectionHead';

export interface AboutCardProps {
  /** The pull-quote. */
  quote: string;
  /** Attribution line under the quote. */
  cite?: string;
  className?: string;
}

/**
 * The cream pull-quote card in the About section — an oversized quote mark,
 * the quote, and a small attribution.
 *
 * ```tsx
 * <AboutCard quote="She treats every child like her own." cite="— a Bronx family" />
 * ```
 */
export function AboutCard({ quote, cite, className }: AboutCardProps) {
  return (
    <div className={['about-card', className].filter(Boolean).join(' ')}>
      <div className="quote-mark">“</div>
      <blockquote>{quote}</blockquote>
      <cite>{cite}</cite>
    </div>
  );
}

export interface AboutBodyProps {
  eyebrow?: string;
  heading: string;
  /** Larger opening line. */
  lead?: string;
  /** Body paragraphs after the lead. */
  paragraphs?: string[];
  className?: string;
}

/**
 * The About copy column — eyebrow, heading, lead line, body paragraphs, and
 * the decorative leaf divider. Pairs with `AboutCard` in the about grid.
 *
 * ```tsx
 * <AboutBody eyebrow="About Bev" heading="Thirty years of warm, steady care"
 *   lead="Hello! I'm Beverly…" paragraphs={["I've cared for…", "Families call me…"]} />
 * ```
 */
export function AboutBody({ eyebrow, heading, lead, paragraphs = [], className }: AboutBodyProps) {
  return (
    <div className={['about-body', className].filter(Boolean).join(' ')}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{heading}</h2>
      {lead ? <p className="lead">{lead}</p> : null}
      {paragraphs.map((p, i) => <p key={i}>{p}</p>)}
      <LeafStrip />
    </div>
  );
}
