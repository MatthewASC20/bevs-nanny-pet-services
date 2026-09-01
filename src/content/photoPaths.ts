import { ICON_NAMES, type IconName } from '@bevs/design-system';

/**
 * Resolves the photo file names in a card's `photos` list against its
 * `assets/<folder>/` directory. Full URLs, root-relative paths, and anything
 * already containing a slash pass through untouched.
 */
export function photoPaths(folder: string | undefined, list: string[] | undefined): string[] {
  return (list ?? []).map((f) => {
    const s = String(f);
    if (/^https?:\/\//.test(s) || s.charAt(0) === '/' || s.includes('/')) return s;
    return folder ? 'assets/' + folder + '/' + s : s;
  });
}

/**
 * Maps a free-form icon name from the JSON onto the library's icon registry,
 * falling back to the neutral dot — EDITING.md promises Beverly that an
 * unknown icon name never breaks anything.
 */
export function iconName(name: string | undefined, fallback: IconName = 'dot'): IconName {
  return name && (ICON_NAMES as readonly string[]).includes(name) ? (name as IconName) : fallback;
}
