import * as React from 'react';

export interface MarkProps extends React.SVGProps<SVGSVGElement> {
  /** Rendered size in px (width = height). Defaults to 42, the nav-brand size. */
  size?: number | string;
}

/**
 * The "B" monogram — a green rounded-square badge with a cream B and a honey
 * heart accent. The B is a font-independent vector path so it stays crisp from
 * 16px up. Used for the nav brand, the footer brand, and the favicon.
 *
 * ```tsx
 * <Mark size={42} />
 * ```
 */
export function Mark({ size = 42, className, ...rest }: MarkProps) {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" className={className} {...rest}>
      <rect x="2" y="2" width="60" height="60" rx="17" fill="#3C7D5A" />
      <path d="M22 18V46M22 18H34a7 7 0 0 1 0 14H22M22 32H35a7 7 0 0 1 0 14H22"
        fill="none" stroke="#FBF4E4" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
      <g transform="translate(41,10) scale(0.32)" fill="#F2B33D">
        <path d="M16 29C16 29 3 20 3 11C3 6 7 3 11 3C14 3 16 6 16 7C16 6 18 3 21 3C25 3 29 6 29 11C29 20 16 29 16 29Z" />
      </g>
    </svg>
  );
}
