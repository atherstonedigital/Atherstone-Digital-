import * as React from 'react';

import { SectionHeading } from '@/components/brand/SectionHeading';
import type { Problem, ProblemsSection } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// "Sound familiar?" (plan, Homepage 3): five problems, each in the owner's words. Two ways to set them:
//
//   - cards (the default; the sector pages and the Health Check): each problem a full-width row, bordered on paper,
//     radius-0, rule border, space-4 padding, no shadow, no icon (brand book, Layout). From 900px the title takes
//     columns 1 to 5 of the card and the copy columns 6 to 12, on a shared baseline (Phase 1). space-4 between cards
//     (Phase 2.4, step 15: rows space-4 apart, card padding space-4).
//   - band (the homepage, Phase 2.4 step 9 and Phase 2.5 step 4): the cards lose their borders and become a two-column
//     list on the full-bleed green band, the bold line in heading-2 in the left column and the explanation in body in the
//     right, a 1px rule in on-green at 30% opacity between rows. The frame (components/site/Screen.tsx, ground band)
//     lays the ground; this sets the words and rules in on-band, which is on-green in the light theme. The columns meet
//     on the page's one split line (the right column at column 7 of twelve, 24px apart), so every text block starts on
//     the container's left line or that split line.

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
  /** cards on paper (the default), or band: the two-column list on the green band. */
  variant?: 'cards' | 'band';
  /**
   * The root element. Default: a section when the heading shows, else a div. div where the frame around it is the
   * section and is labelled by the heading (the homepage).
   */
  as?: 'section' | 'div';
}

/**
 * The rule between rows on the band: on-band at 30% opacity, 1px (Phase 2.5, step 4), drawn by the list (divide-y) so
 * every row is set alike. Decorative, as rule is.
 */
const bandRules = 'divide-y divide-[color:color-mix(in_srgb,var(--on-band)_30%,transparent)]';

export function ProblemCards({
  content,
  withHeading = true,
  headingLevel = 'h2',
  headingId,
  variant = 'cards',
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
      // The frame sets the text colour (ink on paper, on-band on the band); the root adds none of its own.
      className={className}
      {...props}
    >
      {showHeading && content.heading ? (
        <SectionHeading
          as={headingLevel}
          eyebrow={content.eyebrow}
          heading={content.heading}
          headingId={titleId}
          ground={band ? 'band' : 'paper'}
          // Heading block to content: space-8 (the hairline's own space-4, then space-4 of padding, which no margin
          // collapses through).
          className="pb-space-4"
        />
      ) : null}
      {band ? (
        <ul className={cn('grid grid-cols-1', bandRules)}>
          {content.items.map((item) => (
            <li
              key={item.title}
              className={cn(
                // The first row sits under the heading's hairline, the last on the frame's padding; a rule parts the
                // rows between, space-4 each side of it.
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
      ) : (
        <ul className="grid grid-cols-1 gap-space-4">
          {content.items.map((item) => (
            <li
              key={item.title}
              className={cn(
                'grid grid-cols-1 gap-space-2 rounded-radius-0 border border-rule bg-paper p-space-4',
                'min-[900px]:grid-cols-12 min-[900px]:items-baseline min-[900px]:gap-x-gutter',
              )}
            >
              <ItemHeading className="heading-2 min-[900px]:col-span-5">{item.title}</ItemHeading>
              <p className="body max-w-measure min-[900px]:col-span-7">{item.body}</p>
            </li>
          ))}
        </ul>
      )}
    </Root>
  );
}
