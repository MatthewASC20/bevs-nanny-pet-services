import * as React from 'react';
import { Icon } from '../icons';
import { Eyebrow } from './SectionHead';

export interface PayCardProps {
  eyebrow?: string;
  heading: string;
  /** Short explanation above the button. */
  blurb?: string;
  /** Defaults to "Pay securely". */
  buttonText?: string;
  /** The hosted checkout link (e.g. a Stripe Payment Link). Opens in a new tab. */
  url: string;
  /** Small reassurance line under the button, shown with a lock glyph. */
  secureNote?: string;
  className?: string;
}

/**
 * The payment card — heading, blurb, a honey "Pay securely" button that opens
 * the hosted checkout in a new tab, and a lock-glyph reassurance note. The
 * page shows this section only when a real `http(s)` payment link exists.
 *
 * ```tsx
 * <PayCard heading="Easy, secure payment" blurb="Pay for care sessions online."
 *   url="https://buy.stripe.com/…" secureNote="Payments are handled securely by Stripe." />
 * ```
 */
export function PayCard({ eyebrow, heading, blurb, buttonText = 'Pay securely', url, secureNote, className }: PayCardProps) {
  return (
    <div className={['pay-card', className].filter(Boolean).join(' ')}>
      {eyebrow ? <Eyebrow>{eyebrow}</Eyebrow> : null}
      <h2>{heading}</h2>
      {blurb ? <p className="pay-blurb">{blurb}</p> : null}
      <a className="btn honey" href={url} target="_blank" rel="noopener noreferrer">
        {buttonText} <Icon name="lock" />
      </a>
      {secureNote ? (
        <div className="pay-secure">
          <Icon name="lock" />
          <span>{secureNote}</span>
        </div>
      ) : null}
    </div>
  );
}
