import * as React from 'react';

import { proof } from '@/lib/content/site';
import { fontStacks } from '@/lib/design/tokens';
import { typeDocs, type TypeDoc } from '@/lib/design/tokens.docs';
import { cn } from '@/lib/utils';

import { Ledger, ApprovedMark, type LedgerRow } from './parts';

// Every type style: its sample set in the style's own class (the classes in app/styles/tokens.css, named exactly as the
// tokens), then its specs and usage note. Samples come from tokens.json, except where the public repo needs a public
// figure (scripts/build-tokens.mjs, PUBLIC_SAMPLES).

/** The family's first name in its stack: Newsreader or Schibsted Grotesk. */
function familyName(family: TypeDoc['family']) {
  return fontStacks[family].split(',')[0].replace(/"/g, '').trim();
}

function sizeValue(doc: TypeDoc) {
  const steps = doc.addition?.steps;
  if (!steps) return doc.fontSize;
  return steps
    .map((step) => (step.minWidth ? `${step.fontSize} from ${step.minWidth}px` : step.fontSize))
    .join(', ');
}

function specRows(doc: TypeDoc): LedgerRow[] {
  const rows: LedgerRow[] = [
    { label: 'Family', value: familyName(doc.family) },
    { label: 'Size', value: sizeValue(doc) },
    { label: 'Line height', value: doc.lineHeight },
    { label: 'Weight', value: String(doc.fontWeight) },
  ];
  if (doc.letterSpacing) rows.push({ label: 'Tracking', value: doc.letterSpacing });
  if (doc.fontStyle) rows.push({ label: 'Style', value: doc.fontStyle });
  const add = doc.addition;
  if (add?.fontVariationSettings) rows.push({ label: 'Variation', value: add.fontVariationSettings });
  if (add?.fontVariantNumeric) rows.push({ label: 'Numerals', value: add.fontVariantNumeric });
  if (add?.textTransform) rows.push({ label: 'Transform', value: add.textTransform });
  return rows;
}

/** The figure never stands without its line (brand book, Type): the specimen sets the public figure's own line. */
const figureLine = proof.figures.find((figure) => figure.figure === '16,193')?.line;

function Sample({ doc }: { doc: TypeDoc }) {
  // eyebrow is ink-muted (brand book, Type); every other style is ink.
  const tone = doc.name === 'eyebrow' ? 'text-ink-muted' : 'text-ink';
  // Copy styles keep their measure, as they do on the page.
  const measure = doc.name === 'body-lg' ? 'max-w-measure-lg' : doc.name === 'body' ? 'max-w-measure' : undefined;
  return (
    <div className="min-w-0 break-words">
      <p className={cn(doc.name, tone, measure)}>{doc.sample}</p>
      {doc.name === 'figure' && figureLine ? <p className="small mt-space-2 max-w-[28ch] text-ink-muted">{figureLine}</p> : null}
    </div>
  );
}

function TypeRow({ doc }: { doc: TypeDoc }) {
  return (
    <li className="grid grid-cols-1 gap-space-4 border-t border-rule pt-space-6 min-[900px]:grid-cols-12 min-[900px]:gap-x-gutter">
      <div className="grid content-start gap-space-3 min-[900px]:col-span-4">
        <div className="grid gap-space-1">
          <p className="body font-semibold text-ink">{doc.name}</p>
          <p className="small text-ink">{doc.usage}</p>
          {doc.addition ? <ApprovedMark /> : null}
        </div>
        <Ledger rows={specRows(doc)} />
      </div>
      <div className="min-[900px]:col-span-8">
        <Sample doc={doc} />
      </div>
    </li>
  );
}

export function TypeStyles() {
  return (
    <ul className="grid gap-space-12" aria-label="Type styles">
      {typeDocs.map((doc) => (
        <TypeRow key={doc.name} doc={doc} />
      ))}
    </ul>
  );
}
