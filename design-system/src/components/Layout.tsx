import * as React from 'react';

export interface SectionProps {
  /** Anchor id the nav links target, e.g. `about`, `services`, `kind-words`. */
  id?: string;
  /** Background variant riding on `.section`: `about`, `experience`, `children`, `pets`, `testimonial`, `pay`. */
  className?: string;
  children?: React.ReactNode;
}

/**
 * A page band — `.section` plus an optional background-variant class. The hero
 * is the one band that is NOT a `.section`; write `<section className="hero">`
 * by hand for it.
 *
 * ```tsx
 * <Section id="about" className="about">
 *   <Wrap className="about-grid">…</Wrap>
 * </Section>
 * ```
 */
export function Section({ id, className, children }: SectionProps) {
  return <section id={id} className={['section', className].filter(Boolean).join(' ')}>{children}</section>;
}

export interface WrapProps {
  /** Extra layout classes that ride on the wrap, e.g. `hero-grid`, `about-grid`, `skills-grid`, `contact-grid`. */
  className?: string;
  children?: React.ReactNode;
}

/**
 * The universal centered container (`.wrap`: max-width + fluid padding).
 * Section-level grids ride on it as extra classes.
 *
 * ```tsx
 * <Wrap className="contact-grid">…</Wrap>
 * ```
 */
export function Wrap({ className, children }: WrapProps) {
  return <div className={['wrap', className].filter(Boolean).join(' ')}>{children}</div>;
}

export interface GridProps {
  /** Which card grid: `svc` (services), `kids` (children), `pets`. */
  variant: 'svc' | 'kids' | 'pets';
  className?: string;
  children?: React.ReactNode;
}

/**
 * A three-column card grid (2 → 1 columns on smaller screens). Cards must be
 * DIRECT children — the services grid tints every 3rd icon via `:nth-child`.
 *
 * ```tsx
 * <Grid variant="svc">
 *   <ServiceCard icon="child" title="Nanny care" description="…" />
 * </Grid>
 * ```
 */
export function Grid({ variant, className, children }: GridProps) {
  return <div className={[variant + '-grid', className].filter(Boolean).join(' ')}>{children}</div>;
}
