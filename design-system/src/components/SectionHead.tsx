import * as React from 'react';

export interface EyebrowProps extends React.HTMLAttributes<HTMLSpanElement> {
  children: React.ReactNode;
}

/**
 * The small-caps kicker above a heading, with its honey dash. Usually you want
 * `SectionHead`, which includes one.
 */
export function Eyebrow({ className, children, ...rest }: EyebrowProps) {
  return <span className={['eyebrow', className].filter(Boolean).join(' ')} {...rest}>{children}</span>;
}

export interface SectionHeadProps {
  /** Kicker line above the heading, e.g. "Furry friends". */
  eyebrow: string;
  /** The section's h2. */
  heading: string;
  /** Optional intro paragraph under the heading. */
  intro?: string;
  /** Centre the whole block (most sections do). */
  center?: boolean;
  className?: string;
}

/**
 * A section's standard opening: eyebrow kicker, display heading, optional
 * intro paragraph. `center` matches the site's centred sections.
 *
 * ```tsx
 * <SectionHead center eyebrow="Furry friends"
 *   heading="Pets I've loved & looked after"
 *   intro="A few of the dogs and cats I've had the joy of spoiling." />
 * ```
 */
export function SectionHead({ eyebrow, heading, intro, center, className }: SectionHeadProps) {
  return (
    <div className={['section-head', center ? 'center' : '', className].filter(Boolean).join(' ')}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{heading}</h2>
      {intro ? <p>{intro}</p> : null}
    </div>
  );
}
