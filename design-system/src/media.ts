/** True when a gallery item is a video clip, judged by extension — same rule as the site. */
export function isVideo(src: string): boolean {
  return /\.(mp4|webm|mov)$/i.test(String(src).split('?')[0]);
}

/**
 * A clip's poster is the still saved beside it under the same name
 * (`1.mp4` → `1.jpg`). If the still doesn't exist the browser just shows the
 * clip's first frame — nothing breaks.
 */
export function posterFor(src: string): string {
  return String(src).replace(/\.(mp4|webm|mov)$/i, '.jpg');
}
