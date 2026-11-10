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

export interface SectorTilesProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'children'> {
  /**
   * sectors from lib/content/site.ts. Every sector passed is tiled, held ones included: filter on status ('launch' or
   * 'hold') before passing, once the plan owner rules on launching lighting and kitchens and bathrooms.
   */
  content: Partial<Pick<SectorsSection, 'eyebrow' | 'heading'>> & { sectors: Pick<Sector, 'slug' | 'href' | 'tileLabel'>[] };
  /** Open with the SectionHeading and render as a section labelled by it (the default); off, the tiles alone. */
  withHeading?: boolean;
  headingLevel?: 'h2' | 'h3';
  /** The heading's id, for aria-labelledby. Generated when left out. */
  headingId?: string;
}

export function SectorTiles({
  content,
  withHeading = true,
  headingLevel = 'h2',
  headingId,
  className,
  ...props
}: SectorTilesProps) {
  const autoId = React.useId();
  const titleId = headingId ?? autoId;
  // The heading renders when asked for and given; without it the block is a plain div.
  const showHeading = withHeading && Boolean(content.heading);
  const Root = showHeading ? 'section' : 'div';

  return (
    <Root aria-labelledby={showHeading ? titleId : undefined} className={cn('text-ink', className)} {...props}>
      {showHeading && content.heading ? (
        <SectionHeading as={headingLevel} eyebrow={content.eyebrow} heading={content.heading} headingId={titleId} />
      ) : null}
      {/* One column, space-4 apart, each tile a full-width row (Phase 1). */}
      <ul className="grid grid-cols-1 gap-space-4">
        {content.sectors.map((sector) => (
          <li key={sector.slug}>
            <NextLink
              href={sector.href}
              // 72px tall (space-16 plus space-2), the label centred on the row's height; 128px (two space-16) on
              // portrait tablets, so the five fill the screen (Phase 1).
              className={cn(
                linkedCardClasses,
                'flex min-h-[calc(var(--space-16)+var(--space-2))] items-center',
                '[@media(min-width:720px)_and_(max-width:1199px)_and_(orientation:portrait)]:min-h-[calc(var(--space-16)*2)]',
              )}
            >
              <span className="heading-2">{sector.tileLabel}</span>
            </NextLink>
          </li>
        ))}
      </ul>
    </Root>
  );
}
