'use client';

import * as React from 'react';

/**
 * iOS Safari fires :active, and so the buttons' 0.98 press (brand book, Motion: respond on press), only when the
 * document has a touchstart listener. This adds an empty passive one, as Phase 1 did. It renders nothing.
 */
export function PressFeedback() {
  React.useEffect(() => {
    const noop = () => {};
    document.addEventListener('touchstart', noop, { passive: true });
    return () => document.removeEventListener('touchstart', noop);
  }, []);
  return null;
}
