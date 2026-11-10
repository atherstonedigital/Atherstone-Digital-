import * as React from 'react';

import { SectionHeading } from '@/components/brand/SectionHeading';
import type { Step, StepsSection } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// "How it works" (plan, Homepage 6): numbered rows, each closed by a rule hairline, with no top rule of their own: the
// SectionHeading's hairline is the first step's top rule (Phase 1). The number is part of the step heading's text, in
// small, ink-muted, tabular, so the list keeps its order where list styling is stripped. From 900px each row runs on
// the 12-column grid: number in column 1, title in 2 to 5, copy in 6 to 12, on a shared baseline.

export interface StepsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'children'> {
  /** howItWorks from lib/content/site.ts on the homepage. With no eyebrow, the heading lines up with eyebrowed ones. */
  content: Partial<Pick<StepsSection, 'eyebrow' | 'heading'>> & { steps: Step[] };
  /** Open with the SectionHeading and render as a section labelled by it (the default); off, the list alone. */
  withHeading?: boolean;
  /** The SectionHeading's level; the step titles sit one level below it. */
  headingLevel?: 'h2' | 'h3';
  /** The heading's id, for aria-labelledby. Generated when left out. */
  headingId?: string;
}

export function Steps({ content, withHeading = true, headingLevel = 'h2', headingId, className, ...props }: StepsProps) {
  const autoId = React.useId();
  const titleId = headingId ?? autoId;
  // The heading renders when asked for and given; without it the block is a plain div.
  const showHeading = withHeading && Boolean(content.heading);
  const Root = showHeading ? 'section' : 'div';
  const ItemHeading = headingLevel === 'h2' ? 'h3' : 'h4';

  return (
    <Root aria-labelledby={showHeading ? titleId : undefined} className={cn('text-ink', className)} {...props}>
      {showHeading && content.heading ? (
        <SectionHeading
          as={headingLevel}
          eyebrow={content.eyebrow}
          heading={content.heading}
          headingId={titleId}
          alignWithEyebrow
        />
      ) : null}
      <ol className="grid grid-cols-1">
        {content.steps.map((item) => (
          <li
            key={item.number}
            className={cn(
              'grid grid-cols-1 gap-y-space-2 border-b border-rule py-space-4',
              'min-[900px]:grid-cols-12 min-[900px]:items-baseline min-[900px]:gap-x-gutter min-[900px]:py-space-8',
              // Portrait tablets (768 by 1024, 820 by 1180): more air, so the four rows fill the screen (Phase 1).
              '[@media(min-width:720px)_and_(max-width:1199px)_and_(orientation:portrait)]:py-space-12',
            )}
          >
            <ItemHeading
              className={cn(
                'heading-2',
                'min-[900px]:col-span-5 min-[900px]:grid min-[900px]:grid-cols-5 min-[900px]:items-baseline min-[900px]:gap-x-gutter',
              )}
            >
              <span className="small mr-space-2 tabular-nums text-ink-muted min-[900px]:col-span-1 min-[900px]:mr-0">
                {item.number}
              </span>{' '}
              <span className="min-[900px]:col-span-4">{item.title}</span>
            </ItemHeading>
            <p className="body max-w-measure min-[900px]:col-span-7">{item.body}</p>
          </li>
        ))}
      </ol>
    </Root>
  );
}
