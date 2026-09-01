import * as React from 'react';

export interface RichTextProps {
  /** Text with `[[..]]` (primary) and `((..))` (accent) highlight markers. */
  text: string;
  /** Class for `[[..]]` spans. Defaults to `hl` (the testimonial gold). */
  primaryClass?: string;
  /** Class for `((..))` spans. When omitted, `((..))` is left as literal text (the site's testimonial behaviour). */
  accentClass?: string;
}

/**
 * Renders the site's highlight markers as coloured spans — `[[text]]` becomes
 * the primary highlight, `((text))` the accent. The hero headline uses
 * `leaf-word`/`paw-word`; the testimonial quote uses the default `hl`.
 * Parsed into real elements — no HTML injection.
 *
 * ```tsx
 * <h1><RichText text="Caring for [[little ones]] and ((furry friends))" primaryClass="leaf-word" accentClass="paw-word" /></h1>
 * ```
 */
export function RichText({ text, primaryClass = 'hl', accentClass }: RichTextProps) {
  const re = accentClass
    ? /\[\[([\s\S]+?)\]\]|\(\(([\s\S]+?)\)\)/g
    : /\[\[([\s\S]+?)\]\]/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] != null) parts.push(<span key={key++} className={primaryClass}>{m[1]}</span>);
    else parts.push(<span key={key++} className={accentClass}>{m[2]}</span>);
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}
