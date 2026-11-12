import * as React from 'react';
import NextLink from 'next/link';

import { SectionHeading } from '@/components/brand/SectionHeading';
import type { Sector, SectorsSection } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// Sectors (plan, Homepage 7): one link per sector page, each the sector's tile label (sentence case) in heading-2 and,
// where given, its one line in small beneath: the first clause of the plan's "Sector-specific problems to name".
//
// Phase 2.7, step 5 (the owner's brief: sectors without cards): no border box and no padding box. The links are set as
// rules, the way the rest of the page sets its lists.
//   - row (the homepage and the offer pages' sector links, so the sectors look the same wherever they appear): one ruled
//     row from 1024px (lg), a column per sector parted by vertical 1px rule lines, the first on the container's left
//     line and the last ending on its right; below 1024px a ruled list, a rule between rows, the name and its line side
//     by side on the split line from 720px and stacked below.
//   - list (the default; a case study's one sector): the same ruled list, a rule above and below.
// The whole column or row is the link. On hover the name turns from ink to green-700 over 150ms (Phase 2.7, step 8);
// nothing moves. The section heading above the row has no hairline on the homepage (the frame passes hairline off).
//
// A hyphenated compound in a line ("400-option") is kept on one line, so the line never breaks at its hyphen.

/** A sector: its page, its label, and optionally its one line (lib/content/site.ts, sectorTileLines). */
export type SectorTile = Pick<Sector, 'slug' | 'href' | 'tileLabel'> & { tileLine?: string };

export interface SectorTilesProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'children'> {
  /**
   * sectors from lib/content/site.ts. Every sector passed is shown, held ones included: filter on status ('launch' or
   * 'hold') before passing, once the plan owner rules on launching lighting and kitchens and bathrooms.
   */
  content: Partial<Pick<SectorsSection, 'eyebrow' | 'heading'>> & { sectors: SectorTile[] };
  /** Open with the SectionHeading and render as a section labelled by it (the default); off, the links alone. */
  withHeading?: boolean;
  headingLevel?: 'h2' | 'h3';
  /** The heading's id, for aria-labelledby. Generated when left out. */
  headingId?: string;
  /** The hairline under the heading. On by default; the homepage turns it off (Phase 2.7, step 5). */
  hairline?: boolean;
  /** list: the ruled list (the default). row: the ruled row of columns from 1024px. */
  layout?: 'list' | 'row';
  /**
   * The root element. Default: a section when the heading shows, else a div. div where the frame around it is the
   * section and is labelled by the heading (the homepage).
   */
  as?: 'section' | 'div';
}

/** The line with each hyphenated compound in a no-wrap span, so "400-option" never splits across two lines. */
function keepCompounds(line: string): React.ReactNode {
  const parts = line.split(/(\S+-\S+)/);
  if (parts.length === 1) return line;
  return parts.map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}

/** The ruled row's columns from 1024px, one per sector (written out so Tailwind finds them). */
const rowColumns: Record<number, string> = {
  1: 'min-[1024px]:grid-cols-1',
  2: 'min-[1024px]:grid-cols-2',
  3: 'min-[1024px]:grid-cols-3',
  4: 'min-[1024px]:grid-cols-4',
  5: 'min-[1024px]:grid-cols-5',
};

export function SectorTiles({
  content,
  withHeading = true,
  headingLevel = 'h2',
  headingId,
  hairline = true,
  layout = 'list',
  as,
  className,
  ...props
}: SectorTilesProps) {
  const autoId = React.useId();
  const titleId = headingId ?? autoId;
  // The heading renders when asked for and given; without it the block is a plain div.
  const showHeading = withHeading && Boolean(content.heading);
  const Root = as ?? (showHeading ? 'section' : 'div');
  const row = layout === 'row';
  const count = content.sectors.length;

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
          hairline={hairline}
        />
      ) : null}
      <ul
        className={cn(
          // A ruled list: a rule between rows.
          'grid grid-cols-1 divide-y divide-rule',
          // The list layout closes with a rule above and below, so a lone sector still reads as a ruled row.
          !row && 'border-y border-rule',
          // From 1024px the row: one column per sector, a vertical rule between columns and none across.
          row && cn(rowColumns[count] ?? rowColumns[5], 'min-[1024px]:divide-x min-[1024px]:divide-y-0'),
        )}
      >
        {content.sectors.map((sector) => (
          <li
            key={sector.slug}
            className={cn(
              'flex',
              row
                ? cn(
                    // A row of the list below 1024px: space-4 above and below its rule, none outside the first and
                    // last. A column from 1024px: space-6 either side of its rule, none outside the first and last.
                    'py-space-4 first:pt-0 last:pb-0',
                    'min-[1024px]:px-space-6 min-[1024px]:py-0 min-[1024px]:first:pl-0 min-[1024px]:last:pr-0',
                  )
                : 'py-space-4',
            )}
          >
            <NextLink
              href={sector.href}
              className={cn(
                'group/sector grid w-full content-start gap-y-space-2 text-ink no-underline',
                // At least a touch target tall, for the rows of the list.
                'min-h-touch-target',
                // From 720px to 1023px the name and its line side by side, the line on the split line.
                row && 'min-[720px]:max-[1023px]:grid-cols-2 min-[720px]:max-[1023px]:items-baseline min-[720px]:max-[1023px]:gap-x-space-6',
              )}
            >
              <span
                className={cn(
                  'heading-2 text-ink',
                  // The hover answer (Phase 2.7, step 8): the name from ink to green-700, 150ms, nothing moves.
                  'transition-colors duration-colour ease-out group-hover/sector:text-green-700',
                )}
              >
                {sector.tileLabel}
              </span>
              {sector.tileLine ? <span className="small text-ink">{keepCompounds(sector.tileLine)}</span> : null}
            </NextLink>
          </li>
        ))}
      </ul>
    </Root>
  );
}
