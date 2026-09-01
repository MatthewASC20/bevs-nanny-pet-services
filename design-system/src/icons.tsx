import * as React from 'react';

/** Every icon in the design system, by name. */
export type IconName =
  | 'arrow' | 'heart' | 'check' | 'baby' | 'paw' | 'child' | 'bottle' | 'house'
  | 'meal' | 'bag' | 'pin' | 'phone' | 'mail' | 'dot' | 'star' | 'pawfill'
  | 'heartfill' | 'leaf' | 'camera' | 'expand' | 'play' | 'lock' | 'card' | 'external';

type Def = { fill: boolean; strokeWidth?: number; paths: string };

// Ported verbatim from the site's ICONS registry — same viewBox, same paths.
const DEFS: Record<IconName, Def> = {
  arrow:     { fill: false, strokeWidth: 2.2, paths: '<path d="M5 12h14M13 6l6 6-6 6"/>' },
  heart:     { fill: false, paths: '<path d="M12 21s-7-4.4-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 6c-2.3 4.6-9.3 9-9.3 9Z"/>' },
  check:     { fill: false, paths: '<path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="9"/>' },
  baby:      { fill: false, paths: '<path d="M4 13c0-3 5-3 5 0M9 13a3 3 0 0 0 6 0M15 13c0-3 5-3 5 0M5 13c0 4 3 7 7 7s7-3 7-7"/>' },
  paw:       { fill: false, paths: '<circle cx="7" cy="9" r="1.7"/><circle cx="12" cy="7" r="1.7"/><circle cx="17" cy="9" r="1.7"/><path d="M12 11.5c-2.7 0-4.8 2.1-4.8 4.4 0 1.6 1.1 2.5 2.5 2.5 1 0 1.5-.5 2.3-.5s1.3.5 2.3.5c1.4 0 2.5-.9 2.5-2.5 0-2.3-2.1-4.4-4.8-4.4Z"/>' },
  child:     { fill: false, paths: '<circle cx="12" cy="7" r="3.2"/><path d="M6.5 20c0-3.6 2.5-6 5.5-6s5.5 2.4 5.5 6"/><path d="M12 14v-1"/>' },
  bottle:    { fill: false, paths: '<path d="M10 3h4M12 3v3M9 9h6a3 3 0 0 1 3 3v6a3 3 0 0 1-3 3H9a3 3 0 0 1-3-3v-6a3 3 0 0 1 3-3Z"/><path d="M9 13h6M9 16h6"/>' },
  house:     { fill: false, paths: '<path d="M4 21h16M6 21V10l6-5 6 5v11"/><path d="M10 21v-5h4v5"/>' },
  meal:      { fill: false, paths: '<path d="M4 12h16a8 8 0 0 1-8 8 8 8 0 0 1-8-8Z"/><path d="M4 12c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2M9 7c0-1 1-1 1-2M13 7c0-1 1-1 1-2"/>' },
  bag:       { fill: false, paths: '<path d="M6 8h12l-1 12H7L6 8Z"/><path d="M9 8a3 3 0 0 1 6 0"/>' },
  pin:       { fill: false, paths: '<path d="M12 21s-7-6-7-11a7 7 0 0 1 14 0c0 5-7 11-7 11Z"/><circle cx="12" cy="10" r="2.4"/>' },
  phone:     { fill: false, paths: '<path d="M6.5 4h3l1.5 4-2 1.5a12 12 0 0 0 5 5l1.5-2 4 1.5v3a2 2 0 0 1-2.2 2A16 16 0 0 1 4.5 6.2 2 2 0 0 1 6.5 4Z"/>' },
  mail:      { fill: false, paths: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/>' },
  dot:       { fill: true,  paths: '<circle cx="12" cy="12" r="4"/>' },
  star:      { fill: true,  paths: '<path d="M12 3l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9 6.8 19.2l1-5.8L3.5 9.2l5.9-.9L12 3Z"/>' },
  pawfill:   { fill: true,  paths: '<circle cx="7" cy="9" r="1.7"/><circle cx="12" cy="7" r="1.7"/><circle cx="17" cy="9" r="1.7"/><path d="M12 11.2c-2.6 0-4.7 2-4.7 4.3 0 1.5 1.1 2.4 2.4 2.4 1 0 1.5-.5 2.3-.5s1.3.5 2.3.5c1.3 0 2.4-.9 2.4-2.4 0-2.3-2.1-4.3-4.7-4.3Z"/>' },
  heartfill: { fill: true,  paths: '<path d="M12 21s-7-4.4-9.3-9A5 5 0 0 1 12 6a5 5 0 0 1 9.3 6c-2.3 4.6-9.3 9-9.3 9Z"/>' },
  leaf:      { fill: true,  paths: '<path d="M5 19c0-8 6-14 14-14 0 8-6 14-14 14Z"/><path d="M5 19c4-4 7-6 11-7" fill="none" stroke="#F1F4EC" stroke-width="1.5"/>' },
  camera:    { fill: false, paths: '<path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z"/><circle cx="12" cy="13" r="3.2"/>' },
  expand:    { fill: false, paths: '<path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M21 16v3a2 2 0 0 1-2 2h-3M3 16v3a2 2 0 0 0 2 2h3"/>' },
  play:      { fill: true,  paths: '<path d="M8 5.5v13a1 1 0 0 0 1.54.84l10-6.5a1 1 0 0 0 0-1.68l-10-6.5A1 1 0 0 0 8 5.5Z"/>' },
  lock:      { fill: false, paths: '<rect x="5" y="11" width="14" height="10" rx="2.2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>' },
  card:      { fill: false, paths: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="M3 10h18"/>' },
  external:  { fill: false, paths: '<path d="M14 4h6v6M20 4l-8.5 8.5M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>' },
};

export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'name'> {
  /** Which icon to draw. Unknown names are a type error — the set is closed. */
  name: IconName;
  /** Width/height when no parent CSS sizes the svg. Defaults to `1em`. */
  size?: number | string;
}

/**
 * The site's icon set as a single component. Icons inherit `currentColor`,
 * so colour them by setting `color` on the icon or a parent. Most design-system
 * components size nested icons via CSS; standalone icons default to `1em`.
 *
 * ```tsx
 * <Icon name="paw" />
 * <Icon name="heart" size={28} style={{ color: 'var(--blush)' }} />
 * ```
 */
export function Icon({ name, size = '1em', ...rest }: IconProps) {
  const d = DEFS[name] ?? DEFS.dot;
  const attrs = d.fill
    ? { fill: 'currentColor' as const }
    : {
        fill: 'none' as const, stroke: 'currentColor' as const,
        strokeWidth: d.strokeWidth ?? 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const,
      };
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...attrs} {...rest}
      dangerouslySetInnerHTML={{ __html: d.paths }} />
  );
}

/** Names of every available icon — handy for pickers and docs. */
export const ICON_NAMES = Object.keys(DEFS) as IconName[];
