import * as React from 'react';
import { Icon } from '../icons';

export interface LeafStripProps {
  className?: string;
}

/**
 * The organic divider — a leaf glyph trailing into a soft gradient rule.
 * Purely decorative; sits under about-page copy.
 *
 * ```tsx
 * <LeafStrip />
 * ```
 */
export function LeafStrip({ className }: LeafStripProps) {
  return (
    <div className={['leaf-strip', className].filter(Boolean).join(' ')} aria-hidden="true">
      <Icon name="leaf" />
      <span />
    </div>
  );
}
