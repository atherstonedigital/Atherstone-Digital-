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
//   - band (the homepage, Phase 2.4 step 9 and Phase 2.5 step 4): the list on the full-bleed green band, words and rules
//     in on-band (on-green in the light theme), the rules at 30% opacity. The frame (components/site/Screen.tsx, ground
//     band) lays the ground.
//   - paper (the default: the sector pages and the Health Check): the same list on paper, the rules in rule.
//
// Phase 2.4 integrate: the paper problems were bordered cards (brand book, Layout: problem cards are bordered boxes with
// space-4 padding). Full width, a card set its words 17px inside the container's line at every width, which the gate's
// container-edges (SR-6) fails and no card padding can fix. They now take the list the owner's brief gave the
// homepage's problems (Phase 2.5 step 4: the problem cards lose their borders and become a two-column list), so the
// site sets its problems one way.

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
  /** paper (the default): the list on paper. band: the list on the green band (the homepage). */
  variant?: 'paper' | 'band';
  /**
   * The root element. Default: a section when the heading shows, else a div. div where the frame around it is the
   * section and is labelled by the heading (the homepage).
   */
  as?: 'section' | 'div';
}

/**
 * The rule between rows, drawn by the list (divide-y) so every row is set alike: on the band, on-band at 30% opacity
 * (Phase 2.5, step 4); on paper, the rule hairline. Decorative, as rule is.
 */
const rowRules = {
  band: 'divide-y divide-[color:color-mix(in_srgb,var(--on-band)_30%,transparent)]',
  paper: 'divide-y divide-rule',
} as const;

export function ProblemCards({
  content,
  withHeading = true,
  headingLevel = 'h2',
  headingId,
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
        />
      ) : null}
      <ul className={cn('grid grid-cols-1', rowRules[variant])}>
        {content.items.map((item) => (
          <li
            key={item.title}
            className={cn(
              // The first row sits space-8 under the heading's hairline, the last on the frame's padding; a rule parts
              // the rows between, space-4 each side of it.
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
    </Root>
  );
}
