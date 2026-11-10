import * as React from 'react';
import NextLink from 'next/link';

import { linkedCardClasses } from '@/components/brand/LinkedCard';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { Stub } from '@/components/site/Screen';
import type { Article, InsightsSection } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// Insights (plan, Homepage 9): the latest articles as linked cards, each its sector tag in the eyebrow style and its
// title in heading-2. The whole card is the link, so it answers the pointer as a linked card does (brand book, Motion):
// a 2px lift on transform and a border that darkens to ink, no shadow. The lift waits for a fine pointer that can hover
// and is dropped under reduced motion. No image, no date or reading time until the articles are written (Phase 1).
//
// placeholders (Phase 3 integrate, for the sector pages): where fewer articles are written than the row has places,
// the empty places are bordered boxes on paper holding "Content to follow", so the row keeps its columns and the gap
// shows. A placeholder is never a link.

export type InsightCardsLayout = 'stack' | 'row';

const listLayout: Record<InsightCardsLayout, string> = {
  // One column, space-6 apart: the homepage, where the scorecard panel takes the other half of the row (Phase 1).
  stack: 'grid-cols-1',
  // Three across from 720px, one column below in the same order (brand book, Layout): a sector page's three articles.
  row: 'grid-cols-1 min-[720px]:grid-cols-3',
};

export interface InsightCardsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'children'> {
  /** insights from lib/content/site.ts on the homepage; a sector page passes its own three. */
  content: Partial<Pick<InsightsSection, 'eyebrow' | 'heading'>> & {
    articles: Pick<Article, 'slug' | 'href' | 'title' | 'sectorTag'>[];
  };
  layout?: InsightCardsLayout;
  /**
   * Open with the SectionHeading and render as a section labelled by it (the default). Off, the cards render alone in
   * a div: on the homepage the heading and the cards share a column with the scorecard panel beside them.
   */
  withHeading?: boolean;
  /** The SectionHeading's level; the card titles sit one level below it. */
  headingLevel?: 'h2' | 'h3';
  /** The heading's id, for aria-labelledby. Generated when left out. */
  headingId?: string;
  /** Empty places after the cards, each marked "Content to follow". None by default. */
  placeholders?: number;
}

export function InsightCards({
  content,
  layout = 'stack',
  withHeading = true,
  headingLevel = 'h2',
  headingId,
  placeholders = 0,
  className,
  ...props
}: InsightCardsProps) {
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
      <ul className={cn('grid gap-space-6', listLayout[layout])}>
        {content.articles.map((article) => (
          <li key={article.slug} className="grid">
            {/* The tag reads before the title, as it shows: "Furniture, Why half your furniture catalogue...". */}
            <NextLink href={article.href} className={cn(linkedCardClasses, 'grid content-start gap-y-space-2')}>
              <span className="eyebrow text-ink-muted">{article.sectorTag}</span>
              <ItemHeading className="heading-2">{article.title}</ItemHeading>
            </NextLink>
          </li>
        ))}
        {Array.from({ length: placeholders }, (_, index) => (
          <li key={`to-follow-${index}`} className="rounded-radius-0 border border-rule bg-paper p-space-4">
            <Stub />
          </li>
        ))}
      </ul>
    </Root>
  );
}
