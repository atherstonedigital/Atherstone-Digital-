import type { FaqItem, FaqQuestionStub, Stub, Written } from './types';

// Parts of pages the plan does not write yet (Phase 3 decisions 3 and 4). A page renders STUB_LABEL where a stub
// stands, so the gap is visible, and a page that is mostly stubs sets robots noindex (lib/seo.ts reads `index` from
// the route). Never fill a stub with invented figures, client facts or testimonials.

/** The words a page shows in place of unwritten copy. */
export const STUB_LABEL = 'Content to follow';

/** A stub, with a note for the writer saying what the plan asks for there. The note is never rendered. */
export function stub(note: string): Stub {
  return { stub: true, note };
}

export function isStub<T>(value: Written<T>): value is Stub {
  return typeof value === 'object' && value !== null && 'stub' in value && (value as Stub).stub === true;
}

/**
 * A FAQ with some answers unwritten (the furniture page): `shown` sets STUB_LABEL as each missing answer, for the FAQ
 * component with schema={false}; `answered` is the rest, for FAQPage JSON-LD (faqPageJsonLd in lib/seo.ts), which must
 * never carry a placeholder.
 */
export function splitFaq(items: (FaqItem | FaqQuestionStub)[]): { shown: FaqItem[]; answered: FaqItem[] } {
  const answered = items.filter((item): item is FaqItem => !isStub(item.answer));
  const shown = items.map((item) => (isStub(item.answer) ? { question: item.question, answer: STUB_LABEL } : (item as FaqItem)));
  return { shown, answered };
}
