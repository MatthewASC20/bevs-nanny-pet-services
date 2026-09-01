import * as React from 'react';
import { LoadErrorToast } from './LoadErrorToast';

interface State { error: Error | null }

/**
 * Catches render-time throws caused by malformed content values and shows the
 * same friendly toast the old site did, instead of a blank page. The nav and
 * footer live outside this boundary, so the chrome survives.
 */
export class RenderErrorBoundary extends React.Component<React.PropsWithChildren, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error): void {
    console.error('Render error:', error);
  }

  render(): React.ReactNode {
    if (this.state.error) {
      return <LoadErrorToast message={'Something in the content files couldn’t be displayed: ' + this.state.error.message} />;
    }
    return this.props.children;
  }
}
