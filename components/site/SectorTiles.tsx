import * as React from 'react';
import NextLink from 'next/link';

import { linkedCardClasses } from '@/components/brand/LinkedCard';
import { SectionHeading } from '@/components/brand/SectionHeading';
import type { Sector, SectorsSection } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// Sectors (plan, Homepage 7): one linked tile per sector page. A tile is a card (bordered on paper, radius-0, rule
// border, space-4 padding, no shadow, no icon) whose whole box is the link. On hover it rises 2px on transform and its
// border darkens to ink (brand book, Motion: the hover layer); the lift waits for a fine pointer that can hover and is
// dropped under reduced motion, where the border change stays (components/brand/LinkedCard.tsx). Tiles take the
// sector's tile label, sentence case.
//
// Two layouts:
//   - list (the default; the offer pages and a case study): one column, space-4 apart, each tile a full-width row.
//   - row (the homepage, Phase 2.4 step 7 and Phase 2.5 step 3): one row of five from 1200px, two rows from 720px
//     (three tiles, then two, each row running line to line on a six-column grid), one column below 720px. Each tile is
//     the sector name in heading-2 and, where given, its one line in small beneath: the first clause of the plan's
//     "Sector-specific problems to name". From 1200px the five stand as tall cards, the name at the top and the line at
//     the foot, so the row reads as a set and the section is not left half empty.

/** A tile: the sector, and optionally its one line (lib/content/site.ts, sectorTileLines). */
export type SectorTile = Pick<Sector, 'slug' | 'href' | 'tileLabel'> & { tileLine?: string };

export interface SectorTilesProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'children'> {
  /**
   * sectors from lib/content/site.ts. Every sector passed is tiled, held ones included: filter on status ('launch' or
   * 'hold') before passing, once the plan owner rules on launching lighting and kitchens and bathrooms.
   */
  content: Partial<Pick<SectorsSection, 'eyebrow' | 'heading'>> & { sectors: SectorTile[] };
  /** Open with the SectionHeading and render as a section labelled by it (the default); off, the tiles alone. */
  withHeading?: boolean;
  headingLevel?: 'h2' | 'h3';
  /** The heading's id, for aria-labelledby. Generated when left out. */
  headingId?: string;
  /** list: one full-width row per sector (the default). row: the homepage's row of five. */
  layout?: 'list' | 'row';
  /**
   * The root element. Default: a section when the heading shows, else a div. div where the frame around it is the
   * section and is labelled by the heading (the homepage).
   */
  as?: 'section' | 'div';
}

/** In the row layout from 720 to 1199px: the first three tiles take two of six columns, the last two take three. */
const rowSpan = (index: number, count: number) =>
  count === 5 ? (index < 3 ? 'min-[720px]:max-[1199px]:col-span-2' : 'min-[720px]:max-[1199px]:col-span-3') : undefined;

export function SectorTiles({
  content,
  withHeading = true,
  headingLevel = 'h2',
  headingId,
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
        />
      ) : null}
      <ul
        className={cn(
          'grid grid-cols-1 gap-space-4',
          // Five across from 1200px; a six-column grid from 720px, so three and then two tiles each fill their row.
          row && count === 5 && 'min-[720px]:grid-cols-6 min-[1200px]:grid-cols-5 min-[720px]:gap-space-6',
          row && count !== 5 && 'min-[720px]:grid-cols-2 min-[720px]:gap-space-6',
        )}
      >
        {content.sectors.map((sector, index) => (
          <li key={sector.slug} className={cn('flex', row && rowSpan(index, count))}>
            <NextLink
              href={sector.href}
              className={cn(
                linkedCardClasses,
                'flex w-full flex-col gap-space-2',
                row
                  ? // A tall card from 1200px, 280px (four space-16 and a space-6), the line held to the foot: at 1440 by
                    // 900 the section's 60dvh floor then leaves no more than a fifth of it empty below the row.
                    'min-[1200px]:min-h-[calc(var(--space-16)*4_+_var(--space-6))] min-[1200px]:justify-between'
                  : // 72px tall (space-16 plus space-2), the label centred on the row's height; 128px (two space-16)
                    // on portrait tablets, so the five fill the screen (Phase 1).
                    cn(
                      'min-h-[calc(var(--space-16)+var(--space-2))] justify-center',
                      '[@media(min-width:720px)_and_(max-width:1199px)_and_(orientation:portrait)]:min-h-[calc(var(--space-16)*2)]',
                    ),
              )}
            >
              <span className="heading-2">{sector.tileLabel}</span>
              {sector.tileLine ? <span className="small text-ink">{sector.tileLine}</span> : null}
            </NextLink>
          </li>
        ))}
      </ul>
    </Root>
  );
}
