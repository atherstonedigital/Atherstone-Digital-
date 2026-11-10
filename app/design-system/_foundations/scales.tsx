import * as React from 'react';

import { radiusDocs, spacingDocs } from '@/lib/design/tokens.docs';
import { cn } from '@/lib/utils';

// The spacing scale as bars of each token's own width, then measure and container, which are column widths rather than
// gaps, and the three radii on a square. Every width and radius is the token's own utility, written out so Tailwind
// finds it.

const spacingBar: Record<string, string> = {
  'space-1': 'w-space-1',
  'space-2': 'w-space-2',
  'space-3': 'w-space-3',
  'space-4': 'w-space-4',
  'space-6': 'w-space-6',
  'space-8': 'w-space-8',
  'space-12': 'w-space-12',
  'space-16': 'w-space-16',
  'space-24': 'w-space-24',
};

const radiusClass: Record<string, string> = {
  'radius-0': 'rounded-radius-0',
  'radius-sm': 'rounded-radius-sm',
  'radius-md': 'rounded-radius-md',
};

export function SpacingScale() {
  return (
    <ul className="grid border-t border-rule" aria-label="Spacing tokens">
      {spacingDocs.map((doc) => {
        const bar = spacingBar[doc.name];
        return (
          <li
            key={doc.name}
            className="grid grid-cols-[var(--space-24)_minmax(0,1fr)] items-center gap-x-space-4 gap-y-space-1 border-b border-rule py-space-3 min-[720px]:grid-cols-[var(--space-24)_var(--space-24)_var(--space-24)_minmax(0,1fr)]"
          >
            <p className="body font-semibold text-ink">{doc.name}</p>
            <p className="small text-ink [font-variant-numeric:tabular-nums]">{doc.value}</p>
            {/* The bar: the token's own width, in rule-strong. measure and container are column widths, written out. */}
            <div className="col-span-2 min-[720px]:col-span-1">
              {bar ? (
                <span aria-hidden="true" className={cn('block h-space-3 bg-rule-strong', bar)} />
              ) : (
                <p className="small text-ink-muted">Column width</p>
              )}
            </div>
            <p className="small col-span-2 text-ink min-[720px]:col-span-1">{doc.usage}</p>
          </li>
        );
      })}
    </ul>
  );
}

export function RadiusScale() {
  return (
    <ul className="grid grid-cols-1 gap-space-6 min-[720px]:grid-cols-3 min-[720px]:gap-gutter" aria-label="Radius tokens">
      {radiusDocs.map((doc) => (
        <li key={doc.name} className="grid content-start gap-space-3 border-t border-rule pt-space-4">
          <span
            aria-hidden="true"
            className={cn('block size-space-16 border border-rule-strong bg-paper-raised', radiusClass[doc.name])}
          />
          <div className="grid gap-space-1">
            <p className="body font-semibold text-ink">
              {doc.name} <span className="small font-normal text-ink-muted">{doc.value}</span>
            </p>
            <p className="small text-ink">{doc.usage}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
