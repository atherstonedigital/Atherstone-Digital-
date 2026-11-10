import * as React from 'react';

import type { ColorToken } from '@/lib/design/tokens';
import { colourDocs, type ColourDoc } from '@/lib/design/tokens.docs';
import { cn } from '@/lib/utils';

import { ApprovedMark } from './parts';

// Every colour token: its name and usage note, then a swatch in each theme side by side. Each swatch sits in a wrapper
// marked data-theme="light" or data-theme="dark", which app/styles/tokens.css resolves on its own, so both themes show
// at once whatever theme the page is in. The swatch fills come from the token utilities, never a hex.

/** The fill utility for each token, written out so Tailwind finds every class. A new token fails the type check here. */
const swatchFill: Record<ColorToken, string> = {
  paper: 'bg-paper',
  'paper-raised': 'bg-paper-raised',
  ink: 'bg-ink',
  'ink-muted': 'bg-ink-muted',
  rule: 'bg-rule',
  'rule-strong': 'bg-rule-strong',
  'green-900': 'bg-green-900',
  'green-700': 'bg-green-700',
  'on-green': 'bg-on-green',
  'brass-600': 'bg-brass-600',
  'brass-300': 'bg-brass-300',
  'signal-good': 'bg-signal-good',
  'signal-critical': 'bg-signal-critical',
  focus: 'bg-focus',
  'focus-on-highlight': 'bg-focus-on-highlight',
  'link-on-highlight': 'bg-link-on-highlight',
  band: 'bg-band',
  'on-band': 'bg-on-band',
  'rule-on-band': 'bg-rule-on-band',
};

function Swatch({ doc, theme }: { doc: ColourDoc; theme: 'light' | 'dark' }) {
  const hex = doc[theme];
  const source = doc.source[theme];
  return (
    <div data-theme={theme} className="min-w-0 border border-rule bg-paper p-space-3 text-ink">
      <p className="eyebrow mb-space-2 text-ink-muted">{theme === 'light' ? 'Light' : 'Dark'}</p>
      {/* The chip keeps a rule edge, so paper and paper-raised read against the panel's own paper. */}
      <span aria-hidden="true" className={cn('block h-space-12 border border-rule', swatchFill[doc.name])} />
      <p className="small mt-space-2 text-ink [font-variant-numeric:tabular-nums]">{hex}</p>
      {source !== hex ? <p className="small break-words text-ink-muted">{source}</p> : null}
    </div>
  );
}

function ColourRow({ doc }: { doc: ColourDoc }) {
  return (
    <li className="grid grid-cols-2 gap-space-3 border-t border-rule pt-space-4 min-[720px]:grid-cols-12 min-[720px]:gap-x-gutter">
      <div className="col-span-2 grid content-start gap-space-1 min-[720px]:col-span-6">
        <p className="body font-semibold text-ink">{doc.name}</p>
        <p className="small max-w-measure text-ink">{doc.usage}</p>
        {doc.addition ? <ApprovedMark className="mt-space-1" /> : null}
      </div>
      <div className="min-[720px]:col-span-3">
        <Swatch doc={doc} theme="light" />
      </div>
      <div className="min-[720px]:col-span-3">
        <Swatch doc={doc} theme="dark" />
      </div>
    </li>
  );
}

export function ColourTokens() {
  return (
    <ul className="grid gap-space-6" aria-label="Colour tokens">
      {colourDocs.map((doc) => (
        <ColourRow key={doc.name} doc={doc} />
      ))}
    </ul>
  );
}
