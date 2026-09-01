/**
 * Fetches and parses one JSON content file. `no-cache` so Beverly's edits show
 * up on reload; parse errors are re-thrown prefixed with the file name so the
 * error toast can tell her exactly which file to fix.
 */
export async function fetchJson(path: string): Promise<unknown> {
  const r = await fetch(path, { cache: 'no-cache' });
  if (!r.ok) throw new Error('HTTP ' + r.status);
  const text = await r.text();
  try {
    return JSON.parse(text);
  } catch (e) {
    throw new Error(path + ': ' + (e instanceof Error ? e.message : String(e)));
  }
}
