import * as React from 'react';
import { Icon, type IconName } from '../icons';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** `primary` deep green (default) · `honey` gold CTA · `ghost` outline. */
  variant?: 'primary' | 'honey' | 'ghost';
  /** Optional icon rendered after the label, e.g. `arrow` on CTAs. */
  icon?: IconName;
  /** Render as an anchor with this href instead of a `<button>`. */
  href?: string;
  /** Anchor target (only with `href`), e.g. `_blank`. */
  target?: string;
  children?: React.ReactNode;
}

/**
 * The pill button. Deep-green by default; `honey` is the warm gold used for
 * the main call-to-action; `ghost` is the quiet outlined secondary. Pass
 * `href` to render a link with identical styling.
 *
 * ```tsx
 * <Button variant="honey" icon="arrow">Get in touch</Button>
 * <Button variant="ghost" href="#services">See how I help</Button>
 * ```
 */
export function Button({ variant = 'primary', icon, href, target, className, children, ...rest }: ButtonProps) {
  const cls = ['btn', variant !== 'primary' ? variant : '', className].filter(Boolean).join(' ');
  const inner = (
    <>
      {children}
      {icon ? <Icon name={icon} /> : null}
    </>
  );
  if (href) {
    return (
      <a className={cls} href={href} target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
        {...(rest as unknown as React.AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {inner}
      </a>
    );
  }
  return <button className={cls} type="button" {...rest}>{inner}</button>;
}
