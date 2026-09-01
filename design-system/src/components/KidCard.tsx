import * as React from 'react';
import { Icon, type IconName } from '../icons';

export interface KidCardProps {
  /** Tile icon; defaults to `child`. */
  icon?: IconName;
  /** Who this was, kept anonymous — e.g. "Twin girls, from 6 months". */
  label: string;
  /** What the care involved. */
  duties?: string;
  className?: string;
}

/**
 * A privacy-first care card: icon tile instead of a photo, a label, and the
 * duties. This is the default for children — families' faces stay off the
 * site unless they've agreed (use `ShowCard` once they have).
 *
 * ```tsx
 * <KidCard label="Newborn twins" duties="Overnights, feeds, and first-year routines." />
 * ```
 */
export function KidCard({ icon = 'child', label, duties, className }: KidCardProps) {
  return (
    <article className={['kid-card', className].filter(Boolean).join(' ')}>
      <div className="kid-ico"><Icon name={icon} /></div>
      <div className="kid-label">{label}</div>
      {duties ? <p className="kid-duties">{duties}</p> : null}
    </article>
  );
}
