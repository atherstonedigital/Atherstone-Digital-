import * as React from 'react';

import { LinkButton } from '@/components/brand/Button';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { FAQ } from '@/components/site/FAQ';
import { JsonLd } from '@/components/site/JsonLd';
import { Screen, Stub } from '@/components/site/Screen';
import { isStub, splitFaq } from '@/lib/content/stub';
import type {
  ClosingActions,
  FaqItem,
  FaqQuestionStub,
  ListSection,
  SectionIntro,
  TableSection,
  TextSection,
  Written,
} from '@/lib/content/types';
import { faqPageJsonLd } from '@/lib/structured-data';
import { cn } from '@/lib/utils';

// The blocks the inner pages share: the page headers, running copy and dash lists that may still be stubs, the
// two-column ledger table, and a FAQ that may be partly unwritten. Folded at the Phase 3 integrate step from the offer
// pages' parts (OfferHeader, Paragraphs, TextBlock, DashList, LedgerTable) and the sector pages' parts (PageHeader,
// ListBlock, FaqBlock), class for class.

// ------------------------------------------------------------------ page headers

/** Splits the H1 at its sentences, so from 720px each sentence takes its own line, as the homepage hero does. */
function sentences(text: string) {
  return text.split(/(?<=\.)\s+/).filter(Boolean);
}

export interface OfferHeaderProps {
  /** The offer's name, as the nav and the OfferCard set it. */
  eyebrow: string;
  h1: string;
  /** The first paragraph of the page: body-lg at measure-lg (brand book, Type). */
  intro: string;
  /** The plan's two calls to action. */
  actions: ClosingActions;
  headingId: string;
  /** A section the plan places straight after the intro, set under the buttons on the same screen. */
  children?: React.ReactNode;
}

/** An offer page's first screen: the offer's name, the H1 a sentence to a line from 720px, the intro, two buttons. */
export function OfferHeader({ eyebrow, h1, intro, actions, headingId, children }: OfferHeaderProps) {
  const lines = sentences(h1);
  return (
    <Screen first labelledBy={headingId}>
      <header>
        <p className="eyebrow mb-space-2 text-ink-muted">{eyebrow}</p>
        {/* display-2 is the H1 on every page but the homepage. Balanced, and held to 24em so a one-sentence H1 breaks
            into two even lines rather than running the width of the container. */}
        <h1 id={headingId} className="display-2 mb-space-6 max-w-[24em] text-balance">
          {lines.map((line, index) => (
            <React.Fragment key={line}>
              {index > 0 ? ' ' : null}
              <span className={lines.length > 1 ? 'min-[720px]:block' : undefined}>{line}</span>
            </React.Fragment>
          ))}
        </h1>
        <p className="body-lg mb-space-8 max-w-measure-lg">{intro}</p>
        {/* One primary and its one secondary (Button README), full width and stacked below 720px, as in the hero. */}
        <div className="flex flex-wrap items-center gap-space-3">
          <LinkButton link={actions.primary} className="w-full min-[720px]:w-auto" />
          <LinkButton link={actions.secondary} variant="secondary" className="w-full min-[720px]:w-auto" />
        </div>
      </header>
      {children}
    </Screen>
  );
}

export interface PageHeaderProps {
  h1: string;
  headingId: string;
  /** A few words above the H1, as the offer pages set the offer's name. */
  eyebrow?: string;
  /** Set above the H1 in place of an eyebrow: the sector pages' Breadcrumbs. */
  above?: React.ReactNode;
  /** The first paragraph of the page, in body-lg at measure-lg; a stub until written. Left out where the plan has none. */
  intro?: Written<string>;
  /** The plan's two calls to action, as the offer pages set them under the intro. */
  actions?: ClosingActions;
}

/** The top of an inner page: the H1 in display-2 (brand book, Type), the intro, then the primary and its secondary. */
export function PageHeader({ h1, headingId, eyebrow, above, intro, actions }: PageHeaderProps) {
  return (
    <header>
      {above}
      {eyebrow ? <p className="eyebrow mb-space-2 text-ink-muted">{eyebrow}</p> : null}
      {/* Balanced and held to 24em, so a one-sentence H1 breaks into even lines rather than running the full width. */}
      <h1 id={headingId} className="display-2 max-w-[24em] text-balance">
        {h1}
      </h1>
      {intro === undefined ? null : isStub(intro) ? (
        <Stub size="body-lg" className="mt-space-6" />
      ) : (
        <p className="body-lg mt-space-6 max-w-measure-lg">{intro}</p>
      )}
      {actions ? (
        // One primary and its one secondary (Button README), full width and stacked below 720px, as in the hero.
        <div className="mt-space-8 flex flex-wrap items-center gap-space-3">
          <LinkButton link={actions.primary} className="w-full min-[720px]:w-auto" />
          <LinkButton link={actions.secondary} variant="secondary" className="w-full min-[720px]:w-auto" />
        </div>
      ) : null}
    </header>
  );
}

// ------------------------------------------------------------------ text and lists

/** Running copy, one paragraph per string, in body at measure; the stub where the plan has not written it yet. */
export function Paragraphs({ paragraphs }: { paragraphs: TextSection['paragraphs'] }) {
  if (isStub(paragraphs)) return <Stub />;
  return (
    <div className="grid grid-cols-1 gap-space-4">
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="body max-w-measure">
          {paragraph}
        </p>
      ))}
    </div>
  );
}

export interface TextBlockProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  section: TextSection;
  headingId: string;
  eyebrow?: string;
  /** Anything that follows the copy inside the same section. */
  children?: React.ReactNode;
}

/** A section of running copy: the SectionHeading, then the paragraphs (or the stub). */
export function TextBlock({ section, headingId, eyebrow, className, children, ...props }: TextBlockProps) {
  return (
    <section aria-labelledby={headingId} className={cn('min-w-0', className)} {...props}>
      <SectionHeading eyebrow={eyebrow} heading={section.heading} headingId={headingId} />
      <Paragraphs paragraphs={section.paragraphs} />
      {children}
    </section>
  );
}

/** A list in body with the brand's dash bullets (the list-dash class in app/globals.css). */
export function DashList({ items, className }: { items: string[]; className?: string }) {
  return (
    <ul className={cn('list-dash body max-w-measure', className)}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}

interface BlockProps {
  headingId: string;
  id?: string;
  eyebrow?: string;
}

/** A section with a dash list, or the stub; the list's intro line above it where the plan writes one. */
export function ListBlock({ section, headingId, id, eyebrow }: BlockProps & { section: ListSection }) {
  const { heading, intro, items } = section;
  return (
    <section aria-labelledby={headingId} id={id} className="min-w-0">
      <SectionHeading eyebrow={eyebrow} heading={heading} headingId={headingId} />
      {intro ? <p className="body mb-space-4 max-w-measure">{intro}</p> : null}
      {isStub(items) ? <Stub /> : <DashList items={items} />}
    </section>
  );
}

// ------------------------------------------------------------------ the ledger table

/**
 * A two-column table, set as the ComparisonTable sets its three columns (components/site/ComparisonTable.tsx, which is
 * typed for three): the column heads in heading-2 over a rule-strong rule, the rows divided by rule hairlines, no fills,
 * no shadows. The first column holds row headers in body, weight 600. From 720px the columns take 5 and 7 of the
 * grid's 12, as the problem cards and the steps divide a row. Below 720px each row stacks, the area above its line,
 * and the column heads stay for screen readers only; the ARIA table roles are set explicitly because the stacked
 * layout drops a table's native semantics in some browsers.
 */
export function LedgerTable({ table, className }: { table: TableSection; className?: string }) {
  const [areaHead, detailHead] = table.columns;
  return (
    <table role="table" className={cn('block w-full min-[720px]:table min-[720px]:table-fixed min-[720px]:border-collapse', className)}>
      <caption className="sr-only">{table.caption}</caption>
      <colgroup className="hidden min-[720px]:table-column-group">
        <col className="w-[41.6667%]" />
        <col />
      </colgroup>
      <thead role="rowgroup" className="block min-[720px]:table-header-group">
        <tr role="row" className="block min-[720px]:table-row">
          <th
            scope="col"
            role="columnheader"
            className="heading-2 border-b border-rule-strong pb-space-4 pr-space-6 text-left align-bottom max-[719px]:sr-only"
          >
            {areaHead}
          </th>
          <th
            scope="col"
            role="columnheader"
            className="heading-2 border-b border-rule-strong pb-space-4 text-left align-bottom max-[719px]:sr-only"
          >
            {detailHead}
          </th>
        </tr>
      </thead>
      <tbody role="rowgroup" className="block min-[720px]:table-row-group">
        {table.rows.map(([area, detail]) => (
          <tr
            key={area}
            role="row"
            className="block border-b border-rule py-space-4 min-[720px]:table-row min-[720px]:py-0"
          >
            <th
              scope="row"
              role="rowheader"
              className="body block pb-space-1 text-left align-top font-semibold min-[720px]:table-cell min-[720px]:py-space-4 min-[720px]:pr-space-6"
            >
              {area}
            </th>
            <td role="cell" className="body block max-w-measure align-top min-[720px]:table-cell min-[720px]:py-space-4">
              {detail}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ------------------------------------------------------------------ FAQ

export interface FaqBlockProps extends BlockProps {
  faq: SectionIntro & { items: Written<(FaqItem | FaqQuestionStub)[]> };
}

/**
 * The FAQ component with FAQPage schema. Where the plan names a question without its answer (the furniture page), the
 * question shows with STUB_LABEL as its answer and the schema carries only the answered ones, because FAQPage must
 * never hold a placeholder (splitFaq in lib/content/stub.ts). With no questions written, the heading and the stub.
 */
export function FaqBlock({ faq, headingId, id }: FaqBlockProps) {
  const { eyebrow, heading, items } = faq;
  if (isStub(items)) {
    return (
      <section aria-labelledby={headingId} id={id} className="min-w-0">
        <SectionHeading eyebrow={eyebrow} heading={heading} headingId={headingId} />
        <Stub />
      </section>
    );
  }
  const { shown, answered } = splitFaq(items);
  const complete = answered.length === shown.length;
  return (
    <>
      <FAQ content={{ eyebrow, heading, items: shown }} headingId={headingId} id={id} schema={complete} />
      {!complete && answered.length > 0 ? <JsonLd data={faqPageJsonLd(answered)} /> : null}
    </>
  );
}
