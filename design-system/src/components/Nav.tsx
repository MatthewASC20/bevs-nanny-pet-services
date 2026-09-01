import * as React from 'react';
import { Mark } from './Mark';

export interface NavLinkItem {
  href: string;
  label: string;
}

export interface NavProps {
  /** Brand name shown next to the mark, e.g. "Bev's Nanny & Pet". */
  brandName: string;
  /** Small line under the brand name, e.g. "Care services · NYC". */
  brandTagline?: string;
  /** Section anchors, e.g. `{ href: '#about', label: 'About' }`. */
  links?: NavLinkItem[];
  /** Honey call-to-action pinned at the end of the links. */
  cta?: { href: string; label: string };
  className?: string;
}

/**
 * The sticky site header: brand mark + name on the left, section links and a
 * honey CTA on the right. Gains `.scrolled` (soft shadow) past 8px of scroll;
 * below 880px the links collapse behind a hamburger that swaps its label
 * between "Open menu"/"Close menu" and closes when any link is clicked.
 *
 * ```tsx
 * <Nav
 *   brandName="Bev's Nanny & Pet"
 *   brandTagline="Care services · NYC"
 *   links={[{ href: '#about', label: 'About' }, { href: '#services', label: 'Services' }]}
 *   cta={{ href: '#contact', label: 'Get in touch' }}
 * />
 * ```
 */
export function Nav({ brandName, brandTagline, links = [], cta, className }: NavProps) {
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={['nav', scrolled ? 'scrolled' : '', className].filter(Boolean).join(' ')}>
      <div className="wrap nav-inner">
        <a className="brand" href="#top" aria-label={brandName + ' — home'}>
          <Mark className="mark" />
          <span>
            {brandName}
            {brandTagline ? <small>{brandTagline}</small> : null}
          </span>
        </a>
        <nav className={'nav-links' + (open ? ' open' : '')} id="navlinks" aria-label="Primary">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={close}>{l.label}</a>
          ))}
          {cta ? <a className="btn honey nav-cta" href={cta.href} onClick={close}>{cta.label}</a> : null}
        </nav>
        <button
          className="nav-toggle" type="button"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open} aria-controls="navlinks"
          onClick={() => setOpen((o) => !o)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}
