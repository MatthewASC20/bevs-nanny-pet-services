import * as React from 'react';
import { Icon, type IconName } from '../icons';

export interface ChipProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Small leading icon, tinted brand green. */
  icon?: IconName;
  children: React.ReactNode;
}

/**
 * A soft credential chip — icon plus a short claim, e.g. "30+ years of care"
 * or "CPR certified". Used in rows under the hero lede.
 *
 * ```tsx
 * <Chip icon="heart">30+ years of care</Chip>
 * <Chip icon="check">CPR certified</Chip>
 * ```
 */
export function Chip({ icon, className, children, ...rest }: ChipProps) {
  return (
    <span className={['chip', className].filter(Boolean).join(' ')} {...rest}>
      {icon ? <Icon name={icon} /> : null}
      {children}
    </span>
  );
}
