import * as React from 'react';

import { SectionHeading } from '@/components/brand/SectionHeading';
import type { Step, StepsSection } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// "How it works" (plan, Homepage 6): numbered rows parted by rule hairlines. The number is part of the step heading's
// text, in small, ink-muted, tabular, so the list keeps its order where list styling is stripped. Rows are space-4 apart
// on each side of their rule (Phase 2.4, step 15).
//
// Two layouts:
//   - wide (no aside): each row closed by a rule, the SectionHeading's hairline serving as the first row's top rule
//     (Phase 1). From 900px each row runs on the 12-column grid: number in column 1, title in 2 to 5, copy in 6 to 12,
//     on a shared baseline.
//   - with an aside (the homepage, Phase 2.4 step 9 and Phase 2.6): from 900px the steps take the left half and the
//     aside the right, two columns 24px apart, so the aside starts on the page's one split line (x 732 at 1440) and is
//     top-aligned with the first step. Each step is its number and title on one line, the copy beneath; a rule parts each row from the next.
//     Below 900px the aside follows the steps, text first.

export interface StepsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'children'> {
  /** howItWorks from lib/content/site.ts on the homepage. With no eyebrow, the heading lines up with eyebrowed ones. */
  content: Partial<Pick<StepsSection, 'eyebrow' | 'heading'>> & { steps: Step[] };
  /** Open with the SectionHeading and render as a section labelled by it (the default); off, the list alone. */
  withHeading?: boolean;
  /** The SectionHeading's level; the step titles sit one level below it. */
  headingLevel?: 'h2' | 'h3';
  /** The heading's id, for aria-labelledby. Generated when left out. */
  headingId?: string;
  /** The second column: a photograph of the work (the homepage takes the Canwell showroom). */
  aside?: React.ReactNode;
  /**
   * The root element. Default: a section when the heading shows, else a div. div where the frame around it is the
   * section and is labelled by the heading (the homepage).
   */
  as?: 'section' | 'div';
}

export function Steps({
  content,
  withHeading = true,
  headingLevel = 'h2',
  headingId,
  aside,
  as,
  className,
  ...props
}: StepsProps) {
  const autoId = React.useId();
  const titleId = headingId ?? autoId;
  // The heading renders when asked for and given; without it the block is a plain div.
  const showHeading = withHeading && Boolean(content.heading);
  const Root = as ?? (showHeading ? 'section' : 'div');
  const ItemHeading = headingLevel === 'h2' ? 'h3' : 'h4';
  const split = Boolean(aside);

  const list = split ? (
    <ol className="grid grid-cols-1 divide-y divide-rule">
      {content.steps.map((item) => (
        // A rule parts each row from the next (the list draws it, so every row is set alike), space-4 each side.
        <li key={item.number} className="grid grid-cols-1 gap-y-space-2 py-space-4 first:pt-0 last:pb-0">
          <ItemHeading className="heading-2">
            <span className="small mr-space-3 tabular-nums text-ink-muted">{item.number}</span> {item.title}
          </ItemHeading>
          <p className="body max-w-measure">{item.body}</p>
        </li>
      ))}
    </ol>
  ) : (
    <ol className="grid grid-cols-1">
      {content.steps.map((item) => (
        <li
          key={item.number}
          className={cn(
            // The first row sits space-8 under the SectionHeading's hairline, its top rule (the hairline's own gap).
            'grid grid-cols-1 gap-y-space-2 border-b border-rule py-space-4 first:pt-0',
            'min-[900px]:grid-cols-12 min-[900px]:items-baseline min-[900px]:gap-x-gutter',
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
  );

  return (
    <Root
      aria-labelledby={Root === 'section' && showHeading ? titleId : undefined}
      // The frame sets the text colour; the root adds none of its own.
      className={className}
      {...props}
    >
      {showHeading && content.heading ? (
        <SectionHeading
          as={headingLevel}
          eyebrow={content.eyebrow}
          heading={content.heading}
          headingId={titleId}
          // Wide, the heading lines up with eyebrowed ones on a shared screen (Phase 1); beside an aside the section
          // stands alone and its heading opens at the frame's padding.
          alignWithEyebrow={!split}
        />
      ) : null}
      {split ? (
        <div className="grid grid-cols-1 gap-y-space-8 min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-x-space-6">
          {list}
          <div className="min-w-0">{aside}</div>
        </div>
      ) : (
        list
      )}
    </Root>
  );
}
