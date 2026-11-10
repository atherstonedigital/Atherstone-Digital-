import * as React from 'react';

import { SectionHeading } from '@/components/brand/SectionHeading';
import type { Problem, ProblemsSection } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// "Sound familiar?" (plan, Homepage 3): five short cards, each a problem in the owner's words. Each card is a full-width
// row: bordered on paper, radius-0, rule border, space-4 padding, no shadow, no icon (brand book, Layout). From 900px
// the title takes columns 1 to 5 of the card and the copy columns 6 to 12, on a shared baseline (Phase 1). The sector
// pages' five problems use the same rows.

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
}

export function ProblemCards({
  content,
  withHeading = true,
  headingLevel = 'h2',
  headingId,
  className,
  ...props
}: ProblemCardsProps) {
  const autoId = React.useId();
  const titleId = headingId ?? autoId;
  // The heading renders when asked for and given; without it the block is a plain div.
  const showHeading = withHeading && Boolean(content.heading);
  const Root = showHeading ? 'section' : 'div';
  const ItemHeading = headingLevel === 'h2' ? 'h3' : 'h4';

  return (
    <Root aria-labelledby={showHeading ? titleId : undefined} className={cn('text-ink', className)} {...props}>
      {showHeading && content.heading ? (
        <SectionHeading as={headingLevel} eyebrow={content.eyebrow} heading={content.heading} headingId={titleId} />
      ) : null}
      {/* space-6 between cards; space-3 from 900 to 1199px, so the five fit one 1024 by 768 screen (Phase 1). */}
      <ul className="grid grid-cols-1 gap-space-6 min-[900px]:max-[1199px]:gap-space-3">
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
    </Root>
  );
}
