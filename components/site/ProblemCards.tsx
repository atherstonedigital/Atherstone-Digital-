import * as React from 'react';

import { SectionHeading } from '@/components/brand/SectionHeading';
import type { Problem, ProblemsSection } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// "Sound familiar?" (plan, Homepage 3): five problems, each in the owner's words, as a two-column ruled list: the bold
// line in heading-2 in the left column, the explanation in body at measure in the right, a 1px rule between rows,
// space-4 either side of it (Phase 2.4 step 15). From 900px the columns meet on the page's one split line (the right
// column at column 7 of twelve, 24px apart, x 732 at 1440), so every text block starts on the container's left line or
// that split line. Below 900px the explanation follows its line.
//
// Two grounds:
//   - band (the homepage; Phase 2.7 step 5, the owner's brief): on the full-bleed green band, the eyebrow and the
//     heading with no hairline, then the five problems as a numbered ledger: 01 to 05 in brass, small, tabular
//     (the only new words: the numbers; hidden from screen readers, since the ordered list says the order), each above
//     its problem in heading-2, its line of copy beneath in body, on-band at 80% opacity. All three start on the
//     container's left line. Paper hairlines part the rows, as the
//     Cover cuts its paper rules across the green slab: space-8 either side of each, so the rows' words sit space-16
//     apart. The frame (components/site/Screen.tsx, ground band) lays the ground. From 1024px the band is a split on
//     the page's split line (Phase 2.7 review: the ledger alone left half the band empty): the eyebrow and heading on
//     the left half, top-aligned and held in view as the ledger scrolls past (sticky, as the contact band's left
//     column), the ledger on the right half from x 732 at 1440, its paper hairlines running to the container's right
//     line. Below 1024px they stack. From 720px each sentence of the heading is a block of its own,
//     balanced, as the hero's H1 breaks by sentence, so no line ends on a stray word (no copy change).
//   - paper (the default: the sector pages and the Health Check): the two-column ruled list on paper, the bold line in
//     heading-2 on the left, its explanation in body on the split line (x 732 at 1440) from 900px, the rules in rule.
//
// Phase 2.4 integrate: the paper problems were bordered cards (brand book, Layout: problem cards are bordered boxes with
// space-4 padding). Full width, a card set its words 17px inside the container's line at every width, which the gate's
// container-edges (SR-6) fails and no card padding can fix. They take the list the owner's brief gave the homepage's
// problems in Phase 2.5, so the site sets its problems as rows, never as boxes.

export interface ProblemCardsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'children'> {
  /** problems from lib/content/site.ts on the homepage; a sector page passes its own. */
  content: Partial<Pick<ProblemsSection, 'eyebrow' | 'heading'>> & { items: Problem[] };
  /**
   * Open with the SectionHeading and render as a section labelled by it (the default). Off, the cards render alone
   * in a div, for a page that sets its own heading above them.
   */
  withHeading?: boolean;
  /** The SectionHeading's level; the card titles sit one level below it. */
  headingLevel?: 'h2' | 'h3';
  /** The heading's id, for aria-labelledby. Generated when left out. */
  headingId?: string;
  /** The SectionHeading's size: heading-1 (the default) or display-2 (the homepage, Phase 2.7 step 2). */
  headingSize?: 'heading-1' | 'display-2';
  /** paper (the default): the two-column list on paper. band: the numbered ledger on the green band (the homepage). */
  variant?: 'paper' | 'band';
  /**
   * The root element. Default: a section when the heading shows, else a div. div where the frame around it is the
   * section and is labelled by the heading (the homepage).
   */
  as?: 'section' | 'div';
}

/** The paper list's rule between rows, drawn by the list (divide-y) so every row is set alike. Decorative. */
const paperRules = 'divide-y divide-rule';

/** The ledger's numbers: 01 to 05. */
const ledgerNumber = (index: number) => String(index + 1).padStart(2, '0');

/**
 * The heading's sentences, each a balanced block from 720px; inline below, with the space between them kept, so the
 * words and the accessible name are the plan's, unchanged.
 */
function sentenceBlocks(heading: string): React.ReactNode {
  const sentences = heading.split(/(?<=[.?!])\s+/);
  if (sentences.length < 2) return heading;
  return sentences.map((sentence, index) => (
    <React.Fragment key={sentence}>
      {index > 0 ? ' ' : null}
      <span className="min-[720px]:block min-[720px]:[text-wrap:balance]">{sentence}</span>
    </React.Fragment>
  ));
}

export function ProblemCards({
  content,
  withHeading = true,
  headingLevel = 'h2',
  headingId,
  headingSize,
  variant = 'paper',
  as,
  className,
  ...props
}: ProblemCardsProps) {
  const autoId = React.useId();
  const titleId = headingId ?? autoId;
  // The heading renders when asked for and given; without it the block is a plain div.
  const showHeading = withHeading && Boolean(content.heading);
  const Root = as ?? (showHeading ? 'section' : 'div');
  const ItemHeading = headingLevel === 'h2' ? 'h3' : 'h4';
  const band = variant === 'band';

  return (
    <Root
      aria-labelledby={Root === 'section' && showHeading ? titleId : undefined}
      // The frame sets the text colour (ink on paper, on-band on the band); the root adds none of its own. The band is
      // a split from 1024px: two halves 24px apart, the ledger's on the page's split line.
      className={cn(
        band && 'min-[1024px]:grid min-[1024px]:grid-cols-2 min-[1024px]:items-start min-[1024px]:gap-x-space-6',
        className,
      )}
      {...props}
    >
      {showHeading && content.heading ? (
        <SectionHeading
          as={headingLevel}
          size={headingSize}
          eyebrow={content.eyebrow}
          heading={band ? sentenceBlocks(content.heading) : content.heading}
          headingId={titleId}
          ground={band ? 'band' : 'paper'}
          // In the band's split the heading block ends with the heading itself; its space-8 below only parts it from
          // the ledger when they stack. It stays in view beside the ledger as the ledger scrolls past, as the contact
          // band's left column does, so the left half is never a long empty stretch of green.
          className={
            band
              ? cn(
                  'min-[1024px]:[&>:last-child]:mb-0',
                  'min-[1024px]:sticky min-[1024px]:top-[calc(var(--nav-height)_+_var(--space-8))] min-[1024px]:self-start',
                )
              : undefined
          }
          // The band changes grammar (Phase 2.7, step 5): no hairline; the ledger's rows carry the rules.
          hairline={!band}
        />
      ) : null}
      {band ? (
        <ol className="grid grid-cols-1 divide-y divide-paper">
          {content.items.map((item, index) => (
            <li
              key={item.title}
              className={cn(
                // space-8 either side of each paper hairline; the first row opens on the heading's gap, the last on
                // the band's padding.
                'py-space-8 first:pt-0 last:pb-0',
              )}
            >
              {/* The number sits above its problem, as the brass marker sits above a figure, so the number, the
                  problem and its line all start on the container's left line (the gate's container-edges, SR-6). */}
              {/* Brass on the band (decided 12 Nov 2026 under the brief's WCAG AA rule): brass-600 is 2.36:1 on the light theme's band, so the
                  light theme takes brass-300 (8.95:1) and the dark theme keeps brass-600 (6.32:1 on its band). */}
              <span
                aria-hidden="true"
                className="small mb-space-2 block tabular-nums text-brass-300 dark:text-brass-600"
              >
                {ledgerNumber(index)}
              </span>
              <ItemHeading className="heading-2">{item.title}</ItemHeading>
              <p className="body mt-space-2 max-w-measure text-on-band opacity-80">{item.body}</p>
            </li>
          ))}
        </ol>
      ) : (
        <ul className={cn('grid grid-cols-1', paperRules)}>
          {content.items.map((item) => (
            <li
              key={item.title}
              className={cn(
                // The first row sits space-8 under the heading's hairline, the last on the frame's padding; a rule
                // parts the rows between, space-4 each side of it.
                'grid grid-cols-1 gap-y-space-2 py-space-4 first:pt-0 last:pb-0',
                // Two columns from 900px, 24px apart: the right one on the page's split line.
                'min-[900px]:grid-cols-2 min-[900px]:items-baseline min-[900px]:gap-x-space-6',
              )}
            >
              <ItemHeading className="heading-2">{item.title}</ItemHeading>
              <p className="body max-w-measure">{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </Root>
  );
}
