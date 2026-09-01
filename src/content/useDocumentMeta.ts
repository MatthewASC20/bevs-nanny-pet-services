import * as React from 'react';
import type { SiteMeta } from './types';

function setMeta(selector: string, value: string | undefined): void {
  if (!value) return;
  document.querySelectorAll(selector).forEach((n) => n.setAttribute('content', value));
}

/**
 * Mirrors content.json's site block onto the document — title, description,
 * theme colour, and the og/twitter title+description. Cosmetic only: link
 * crawlers read the hard-coded tags in index.html and never run this, which
 * is why those stay hand-maintained there.
 */
export function useDocumentMeta(site: SiteMeta | undefined): void {
  React.useEffect(() => {
    if (!site) return;
    if (site.title) document.title = site.title;
    setMeta('meta[name="description"]', site.description);
    setMeta('meta[name="theme-color"]', site.themeColor);
    setMeta('meta[property="og:title"], meta[name="twitter:title"]', site.title);
    setMeta('meta[property="og:description"], meta[name="twitter:description"]', site.description);
  }, [site]);
}
