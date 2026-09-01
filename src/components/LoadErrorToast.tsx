import * as React from 'react';

export interface LoadErrorToastProps {
  message: string;
}

/**
 * The fixed bottom toast shown when a content file fails to load or parse —
 * a faithful port of the old site's #loadError box, inline styles and all
 * (it must look right even if the stylesheet failed too).
 */
export function LoadErrorToast({ message }: LoadErrorToastProps) {
  return (
    <div
      role="alert"
      style={{
        position: 'fixed', left: 16, right: 16, bottom: 16, zIndex: 200,
        maxWidth: 680, marginInline: 'auto', background: '#fff',
        border: '1px solid #E0E6D7', borderLeft: '4px solid #CF8E12',
        borderRadius: 14, padding: '14px 16px',
        boxShadow: '0 14px 36px -18px rgba(33,48,42,.4)',
        fontFamily: "'Nunito Sans',system-ui,sans-serif",
        color: '#21302A', fontSize: 14, lineHeight: 1.5,
      }}
    >
      <strong style={{ fontFamily: "'Baloo 2',Trebuchet MS,sans-serif" }}>Content didn’t load</strong>
      <div style={{ marginTop: 4, color: '#4C544C' }}>{message}</div>
    </div>
  );
}
