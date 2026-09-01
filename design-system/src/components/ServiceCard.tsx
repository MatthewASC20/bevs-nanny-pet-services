import * as React from 'react';
import { Icon, type IconName } from '../icons';

export interface ServiceCardProps {
  /** Icon in the tinted tile, e.g. `child`, `paw`, `heart`. */
  icon: IconName;
  title: string;
  description: string;
  className?: string;
}

/**
 * A service offering card: tinted icon tile, title, one-line description.
 * Place several in a 3-column grid (`.svc-grid`) — the tile tint cycles
 * green / honey / blush automatically by grid position.
 *
 * ```tsx
 * <div className="svc-grid">
 *   <ServiceCard icon="child" title="Nanny & childcare" description="Newborns to toddlers, calm and hands-on." />
 *   <ServiceCard icon="paw" title="Pet care & walks" description="Daily walks, feeding, and lots of spoiling." />
 * </div>
 * ```
 */
export function ServiceCard({ icon, title, description, className }: ServiceCardProps) {
  return (
    <article className={['svc', className].filter(Boolean).join(' ')}>
      <div className="ico"><Icon name={icon} /></div>
      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}
