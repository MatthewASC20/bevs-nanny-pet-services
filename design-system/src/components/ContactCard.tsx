import * as React from 'react';
import { Icon, type IconName } from '../icons';

export interface ContactCardProps {
  /** Tile icon, e.g. `phone`, `mail`, `pin`. */
  icon: IconName;
  /** Small uppercase label, e.g. "Call or text". */
  label: string;
  /** The value line, e.g. the phone number. */
  value: string;
  /** Make the card tappable, e.g. `tel:+19173462847` or `mailto:...`. */
  href?: string;
  className?: string;
}

/**
 * A contact row card — honey icon tile, small label, bold value. With `href`
 * the whole card is a link (tel:, mailto:, maps).
 *
 * ```tsx
 * <ContactCard icon="phone" label="Call or text" value="+1 (917) 346-2847" href="tel:+19173462847" />
 * ```
 */
export function ContactCard({ icon, label, value, href, className }: ContactCardProps) {
  const cls = ['ccard', className].filter(Boolean).join(' ');
  const inner = (
    <>
      <span className="ico"><Icon name={icon} /></span>
      <span><span className="lbl">{label}</span><span className="val">{value}</span></span>
    </>
  );
  return href
    ? <a className={cls} href={href}>{inner}</a>
    : <div className={cls} style={{ cursor: 'default' }}>{inner}</div>;
}
