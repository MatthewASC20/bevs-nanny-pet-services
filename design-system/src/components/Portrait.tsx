import * as React from 'react';

export interface PortraitProps {
  /** Photo source. Omit to show the initials placeholder instead. */
  src?: string;
  alt?: string;
  /** Placeholder initials shown when there's no photo yet. */
  initials?: string;
  /** Small note under the initials, e.g. "add your photo here". */
  note?: string;
  className?: string;
}

/**
 * The hero portrait — a large 3:4 rounded rectangle with a white border and
 * lifted shadow. Give it a photo, or initials as the pre-photo placeholder.
 *
 * ```tsx
 * <Portrait src="bev-portrait-with-dog.jpg" alt="Beverly with Ku-ki" />
 * <Portrait initials="Bev" note="add your photo here" />
 * ```
 */
export function Portrait({ src, alt, initials = 'Bev', note, className }: PortraitProps) {
  return (
    <div className={['portrait', className].filter(Boolean).join(' ')}>
      {src
        ? <img src={src} alt={alt ?? initials} />
        : <>
            <span className="initials">{initials}</span>
            {note ? <span className="sub">{note}</span> : null}
          </>}
    </div>
  );
}
