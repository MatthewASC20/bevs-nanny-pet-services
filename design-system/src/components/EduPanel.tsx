import * as React from 'react';

export interface EduItem {
  school: string;
  detail?: string;
}

export interface EduPanelProps {
  /** Panel heading, e.g. "Education & background". */
  heading?: string;
  items?: EduItem[];
  className?: string;
}

/**
 * The education side panel in the Skills section — a soft card listing
 * schooling and background entries.
 *
 * ```tsx
 * <EduPanel heading="Education & background"
 *   items={[{ school: "St. Mary's High School", detail: 'Graduate' }]} />
 * ```
 */
export function EduPanel({ heading, items = [], className }: EduPanelProps) {
  return (
    <div className={['edu', className].filter(Boolean).join(' ')}>
      <h3>{heading}</h3>
      {items.map((ed, i) => (
        <div className="edu-item" key={i}>
          <strong>{ed.school}</strong>
          <span>{ed.detail}</span>
        </div>
      ))}
    </div>
  );
}
