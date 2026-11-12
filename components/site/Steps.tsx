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
//   - with asideBleed too (the homepage, Phase 2.7 step 3a, the owner's brief): from 900px the aside leaves the
//     container. It fills the right half of the viewport, from the container's midline (half the split gap left of the
//     split line) to the viewport's right edge, and is exactly as tall as the four steps (the row stretches it; the
//     photograph inside covers it). The section round it clips anything past the viewport.
// The numbers are ink-muted; the homepage sets them in brass-600 (numberTone brass, Phase 2.7 step 6: one of the two
// added uses of the accent).

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
   * From 900px, run the aside from the container's midline to the viewport's right edge, as tall as the steps (the
   * homepage, Phase 2.7 step 3a). The aside must fill its box (ShowroomPhoto's fill). Only inside a section that spans
   * the viewport and clips its overflow.
   */
  asideBleed?: boolean;
  /** The step numbers' colour: ink-muted (the default) or brass-600 (the homepage, Phase 2.7 step 6). */
  numberTone?: 'muted' | 'brass';
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
  asideBleed = false,
  numberTone = 'muted',
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
  const numberColour = numberTone === 'brass' ? 'text-brass-600' : 'text-ink-muted';

  const list = split ? (
    <ol className="grid grid-cols-1 divide-y divide-rule">
      {content.steps.map((item) => (
        // A rule parts each row from the next (the list draws it, so every row is set alike), space-4 each side.
        <li key={item.number} className="grid grid-cols-1 gap-y-space-2 py-space-4 first:pt-0 last:pb-0">
          <ItemHeading className="heading-2">
            <span className={cn('small mr-space-3 tabular-nums', numberColour)}>{item.number}</span> {item.title}
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
            <span className={cn('small mr-space-2 tabular-nums min-[900px]:col-span-1 min-[900px]:mr-0', numberColour)}>
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
        <div
          className={cn(
            'grid grid-cols-1 gap-y-space-8 min-[900px]:grid-cols-2 min-[900px]:gap-x-space-6',
            asideBleed ? 'min-[900px]:items-stretch' : 'min-[900px]:items-start',
          )}
        >
          {list}
          <div
            className={cn(
              'min-w-0',
              asideBleed &&
                cn(
                  // Half the split gap left of the split line is the container's midline; the negative right margin
                  // is half of what the container leaves of the viewport.
                  'relative min-[900px]:-ml-space-3',
                  'min-[900px]:mr-[calc((min(100vw_-_2_*_var(--gutter),var(--container))_-_100vw)_/_2)]',
                ),
            )}
          >
            {aside}
          </div>
        </div>
      ) : (
        list
      )}
    </Root>
  );
}
