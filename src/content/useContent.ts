import * as React from 'react';
import { fetchJson } from './fetchJson';
import type { ChildrenData, Content, PetsData } from './types';

export type ContentState =
  | { status: 'loading' }
  | { status: 'ready'; content: Content }
  | { status: 'error'; message: string };

/**
 * Loads the three content files in parallel and grafts children/pets onto the
 * content object (overwriting keys of those names in content.json, as the
 * original site did). Errors become the friendly toast copy promised to
 * Beverly in EDITING.md.
 */
export function useContent(): ContentState {
  const [state, setState] = React.useState<ContentState>({ status: 'loading' });
  React.useEffect(() => {
    let alive = true;
    Promise.all([fetchJson('content.json'), fetchJson('children.json'), fetchJson('pets.json')])
      .then(([content, children, pets]) => {
        if (!alive) return;
        const merged: Content = {
          ...((content ?? {}) as Content),
          children: (children ?? {}) as ChildrenData,
          pets: (pets ?? {}) as PetsData,
        };
        setState({ status: 'ready', content: merged });
      })
      .catch((err: unknown) => {
        if (!alive) return;
        console.error('Could not load content:', err);
        const msg = err instanceof Error ? err.message : String(err);
        setState({
          status: 'error',
          message: 'Could not load the content files (' + msg + '). Make sure content.json, children.json and pets.json are present and valid.',
        });
      });
    return () => { alive = false; };
  }, []);
  return state;
}
