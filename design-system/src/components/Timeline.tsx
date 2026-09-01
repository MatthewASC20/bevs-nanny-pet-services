import * as React from 'react';
import { Icon } from '../icons';

export interface TimelineProps {
  /** `TimelineItem`s, most recent first. */
  children: React.ReactNode;
  className?: string;
}

/**
 * The experience timeline rail. Wrap `TimelineItem`s in it — the rail and
 * the dots come from the wrapper's CSS.
 */
export function Timeline({ children, className }: TimelineProps) {
  return <div className={['timeline', className].filter(Boolean).join(' ')}>{children}</div>;
}

export interface TimelineItemProps {
  /** Year range, e.g. "2019 — today". */
  years: string;
  /** The role, e.g. "Full-time nanny". */
  role: string;
  /** The family or employer name. */
  family: string;
  /** Optional location, shown with a pin. */
  location?: string;
  /** Marks the current position — the dot turns honey. */
  current?: boolean;
  description?: string;
  className?: string;
}

/**
 * One entry on the experience timeline: years, role, family, optional pin'd
 * location and description. `current` highlights the entry's dot in honey.
 *
 * ```tsx
 * <Timeline>
 *   <TimelineItem current years="2019 — today" role="Nanny & pet care" family="Private family" location="Manhattan" />
 *   <TimelineItem years="2012 — 2019" role="Full-time nanny" family="The R. family" location="Bronx" />
 * </Timeline>
 * ```
 */
export function TimelineItem({ years, role, family, location, current, description, className }: TimelineItemProps) {
  return (
    <div className={['tl-item', current ? 'cur' : '', className].filter(Boolean).join(' ')}>
      <div className="tl-years">{years}</div>
      <h3>{role}</h3>
      <div>
        <span className="tl-where">{family}</span>
        {location ? <span className="tl-loc"><Icon name="pin" />{location}</span> : null}
      </div>
      {description ? <p>{description}</p> : null}
    </div>
  );
}
