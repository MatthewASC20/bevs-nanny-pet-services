import * as React from 'react';
import { Icon, type IconName } from '../icons';

export interface PillProps {
  /** Leading icon. Defaults to a small dot. */
  icon?: IconName;
  /** Highlight in honey gold — used for the headline skill. */
  star?: boolean;
  /** Make the pill a link (adds an external-link glyph; http(s) and .pdf open in a new tab). */
  href?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * A skills pill. Plain pills list capabilities; `star` promotes one in honey
 * gold; `href` turns a pill into a link (e.g. the CPR certificate PDF) with an
 * external-link glyph.
 *
 * ```tsx
 * <Pill icon="baby">Newborn care</Pill>
 * <Pill icon="check" star>CPR certified</Pill>
 * <Pill icon="check" href="assets/cpr-certificate.pdf">CPR certificate</Pill>
 * ```
 */
export function Pill({ icon = 'dot', star, href, className, children }: PillProps) {
  const cls = ['pill', star ? 'star' : '', href ? 'link' : '', className].filter(Boolean).join(' ');
  const inner = (
    <>
      <Icon name={icon} />
      {children}
      {href ? <Icon name="external" /> : null}
    </>
  );
  if (href) {
    const ext = /^https?:\/\//i.test(href) || /\.pdf$/i.test(href);
    return (
      <a className={cls} href={href} target={ext ? '_blank' : undefined}
        rel={ext ? 'noopener noreferrer' : undefined}>{inner}</a>
    );
  }
  return <span className={cls}>{inner}</span>;
}
