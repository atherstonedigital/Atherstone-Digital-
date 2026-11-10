import * as React from 'react';

import {
  colourDocs,
  fontFallbackDocs,
  layoutDocs,
  motionDocs,
  typeDocs,
  zIndexDocs,
} from '@/lib/design/tokens.docs';

import { Ledger, ProposedMark, TokenGroup, type LedgerRow } from './parts';

// Everything design/tokens.additions.json adds to or changes in docs/brand/tokens.json, each entry with its value, what
// it is for and why it is proposed. The site uses them now; each is pending the brand owner's approval, and on approval
// moves into tokens.json.

interface Entry {
  name: string;
  rows: LedgerRow[];
  usage?: string;
  reason: string;
}

function EntryList({ entries, label }: { entries: Entry[]; label: string }) {
  return (
    <ul className="grid grid-cols-1 gap-space-8 min-[900px]:grid-cols-2 min-[900px]:gap-x-gutter" aria-label={label}>
      {entries.map((entry) => (
        <li key={entry.name} className="grid content-start gap-space-3">
          <div className="grid gap-space-1">
            <p className="body font-semibold text-ink">{entry.name}</p>
            <ProposedMark />
          </div>
          <Ledger rows={entry.rows} />
          {entry.usage ? <p className="small max-w-measure text-ink">{entry.usage}</p> : null}
          <p className="small max-w-measure text-ink-muted">{entry.reason}</p>
        </li>
      ))}
    </ul>
  );
}

const steps = (list: readonly { minWidth: number; value: string }[]) =>
  list.map((step) => (step.minWidth ? `${step.value} from ${step.minWidth}px` : step.value)).join(', ');

const colourEntries: Entry[] = colourDocs
  .filter((doc) => doc.proposed)
  .map((doc) => {
    const rows: LedgerRow[] = [];
    if (doc.change) rows.push({ label: 'Change', value: doc.change });
    rows.push({ label: 'Light', value: doc.source.light === doc.light ? doc.light : `${doc.source.light} (${doc.light})` });
    rows.push({ label: 'Dark', value: doc.source.dark === doc.dark ? doc.dark : `${doc.source.dark} (${doc.dark})` });
    if (doc.was) rows.push({ label: 'Was', value: `${doc.was.light} light, ${doc.was.dark} dark` });
    return { name: doc.name, rows, usage: doc.usage, reason: doc.reason ?? '' };
  });

const fontEntries: Entry[] = fontFallbackDocs
  .filter((doc) => doc.proposed)
  .map((doc) => ({
    name: doc.name,
    rows: [
      { label: 'For', value: doc.family },
      { label: 'Local faces', value: doc.local.join(', ') },
      { label: 'size-adjust', value: doc.sizeAdjust },
      { label: 'Ascent', value: doc.ascentOverride },
      { label: 'Descent', value: doc.descentOverride },
      { label: 'Line gap', value: doc.lineGapOverride },
    ],
    reason: doc.reason,
  }));

const typeEntries: Entry[] = typeDocs
  .filter((doc) => doc.proposed)
  .map((doc) => {
    const add = doc.proposed!;
    const rows: LedgerRow[] = [];
    if (add.change) rows.push({ label: 'Change', value: add.change });
    if (add.steps) {
      rows.push({
        label: 'Size',
        value: steps(add.steps.map((step) => ({ minWidth: step.minWidth, value: step.fontSize }))),
      });
    }
    if (add.fontVariationSettings) rows.push({ label: 'Variation', value: add.fontVariationSettings });
    if (add.fontVariantNumeric) rows.push({ label: 'Numerals', value: add.fontVariantNumeric });
    if (add.textTransform) rows.push({ label: 'Transform', value: add.textTransform });
    return { name: doc.name, rows, reason: add.reason };
  });

const layoutEntries: Entry[] = layoutDocs.map((doc) => ({
  name: doc.name,
  rows: [{ label: 'Value', value: doc.steps ? steps(doc.steps) : doc.value }],
  usage: doc.usage,
  reason: doc.reason,
}));

const zIndexEntries: Entry[] = zIndexDocs.map((doc) => ({
  name: `z-${doc.name}`,
  rows: [{ label: 'Value', value: String(doc.value) }],
  reason: doc.reason,
}));

const motionEntries: Entry[] = motionDocs.map((doc) => ({
  name: doc.name,
  rows: [{ label: 'Value', value: doc.value }],
  reason: doc.reason,
}));

export function ProposedAdditions() {
  return (
    <div className="grid grid-cols-1 gap-space-12">
      <TokenGroup title="Colour" description="Swatches for each of these are in the colour list above.">
        <EntryList entries={colourEntries} label="Proposed colour tokens" />
      </TokenGroup>
      <TokenGroup title="Fallback face">
        <EntryList entries={fontEntries} label="Proposed fallback faces" />
      </TokenGroup>
      <TokenGroup title="Type">
        <EntryList entries={typeEntries} label="Proposed type changes" />
      </TokenGroup>
      <TokenGroup title="Layout">
        <EntryList entries={layoutEntries} label="Proposed layout tokens" />
      </TokenGroup>
      <TokenGroup title="z-index">
        <EntryList entries={zIndexEntries} label="Proposed z-index tokens" />
      </TokenGroup>
      <TokenGroup title="Motion">
        <EntryList entries={motionEntries} label="Proposed motion tokens" />
      </TokenGroup>
    </div>
  );
}
