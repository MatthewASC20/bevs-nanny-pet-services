import * as React from 'react';
import { Icon, type IconName } from '../icons';

export interface FloatBadgeProps {
  /** Badge icon; `pawfill` and `heartfill` are the two the site uses. */
  icon: IconName;
  /** Corner placement relative to a `position:relative` parent. */
  corner?: 'top-left' | 'bottom-right';
  /** Gentle bobbing animation (pauses under prefers-reduced-motion). */
  animated?: boolean;
  children: React.ReactNode;
  className?: string;
}

/**
 * A floating claim badge — "Loves pets", "Treated like family" — pinned over
 * the hero portrait's corner. Parent needs `position:relative`.
 *
 * ```tsx
 * <div style={{ position: 'relative' }}>
 *   <Portrait src="bev.jpg" alt="Beverly" />
 *   <FloatBadge icon="pawfill" corner="top-left" animated>Loves pets</FloatBadge>
 * </div>
 * ```
 */
export function FloatBadge({ icon, corner, animated, className, children }: FloatBadgeProps) {
  const cls = [
    'float-badge',
    corner === 'top-left' ? 'badge-paw' : '',
    corner === 'bottom-right' ? 'badge-heart' : '',
    animated ? 'float-anim' : '',
    className,
  ].filter(Boolean).join(' ');
  return <div className={cls}>{<Icon name={icon} />}{' '}{children}</div>;
}
