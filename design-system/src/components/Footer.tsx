import * as React from 'react';
import { Mark } from './Mark';

export interface FooterProps {
  /** Brand name next to the mark. */
  brandName: string;
  /** Small line under the brand name. */
  brandTagline?: string;
  /** Short strapline under the brand block. */
  tagline?: string;
  phone?: string;
  /** `tel:` href for the phone link. */
  phoneHref?: string;
  email?: string;
  location?: string;
  /** Name after the © year. */
  copyrightName?: string;
  /** e.g. "Made with ♥ for happy homes" — the ♥ turns blush. */
  madeWith?: string;
  className?: string;
}

/** Wraps the first ♥ in the blush heart span, as the site does. */
function madeWithNodes(s: string): React.ReactNode {
  const i = s.indexOf('♥');
  if (i < 0) return s;
  return (
    <>
      {s.slice(0, i)}
      <span className="heart">♥</span>
      {s.slice(i + 1)}
    </>
  );
}

/**
 * The deep-green site footer: brand block and contact links up top, copyright
 * line below. The year is computed at render time.
 *
 * ```tsx
 * <Footer
 *   brandName="Bev's Nanny & Pet" brandTagline="Care services · NYC"
 *   tagline="Warm, reliable care across New York City."
 *   phone="+1 (917) 346-2847" phoneHref="tel:+19173462847"
 *   email="bevdejesus@gmail.com" location="Bronx, NY"
 *   copyrightName="Beverly de Jesus" madeWith="Made with ♥ for happy homes"
 * />
 * ```
 */
export function Footer({
  brandName, brandTagline, tagline, phone, phoneHref, email, location,
  copyrightName, madeWith, className,
}: FooterProps) {
  return (
    <footer className={['footer', className].filter(Boolean).join(' ')}>
      <div className="wrap">
        <div className="footer-top">
          <div>
            <a className="brand" href="#top">
              <Mark className="mark" />
              <span>
                {brandName}
                {brandTagline ? <small>{brandTagline}</small> : null}
              </span>
            </a>
            {tagline ? <p className="footer-tag">{tagline}</p> : null}
          </div>
          <div className="footer-contact">
            {phone ? <a href={phoneHref}>{phone}</a> : null}
            {email ? <a href={'mailto:' + email}>{email}</a> : null}
            {location ? <span style={{ color: '#A7B2A6' }}>{location}</span> : null}
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} {copyrightName}</span>
          <span>{madeWith ? madeWithNodes(madeWith) : null}</span>
        </div>
      </div>
    </footer>
  );
}
