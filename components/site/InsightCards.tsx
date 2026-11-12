import * as React from 'react';
import NextLink from 'next/link';

import { SectionHeading } from '@/components/brand/SectionHeading';
import { Stub } from '@/components/site/Screen';
import type { Article, InsightsSection } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// Insights (plan, Homepage 9): the latest articles, each its date, its sector tag in the eyebrow style and its title in
// heading-2.
//
// Phase 2.7, step 5 (the owner's brief: insights without card boxes): the articles are ruled rows, not cards.
//   - stack (the homepage, beside the scorecard; the case studies' articles): a ruled list, a rule between rows, the
//     date on the left in small with tabular figures (ink-muted), the tag and the title on the right. The first row sits
//     on the heading's hairline, which serves as its top rule. Below 480px the date sits above the title.
//   - row (/insights, an article's related posts, a sector page's three): columns parted by vertical 1px rule lines
//     from 720px, the date above the tag and the title; a ruled list below 720px.
// The whole row or column is the link. On hover the title turns from ink to green-700 over 150ms (Phase 2.7, step 8);
// nothing moves. The dates are the posts' own publication dates (the only new words the brief allows besides 01 to
// 05), written as "20 Nov 2025"; a planned article with no date yet shows none.
//
// placeholders (Phase 3 integrate, for the sector pages): where fewer articles are written than the row has places,
// the empty places hold "Content to follow" as a column of the row, so the row keeps its columns and the gap shows. A
// placeholder is never a link.

export type InsightCardsLayout = 'stack' | 'row';

/** "20 Nov 2025": day, short month and year, as the date column sets it. */
const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });

/** The date as the row shows it, from an ISO date (2025-11-20). */
export function formatInsightDate(iso: string) {
  return dateFormat.format(new Date(`${iso}T00:00:00Z`));
}

const listLayout: Record<InsightCardsLayout, string> = {
  // A ruled list: a rule between rows.
  stack: 'grid-cols-1 divide-y divide-rule',
  // Three across from 720px, rows of three space-8 apart; a ruled list below.
  row: 'grid-cols-1 divide-y divide-rule min-[720px]:grid-cols-3 min-[720px]:gap-y-space-8 min-[720px]:divide-y-0',
};

const itemLayout: Record<InsightCardsLayout, string> = {
  stack: 'py-space-4 first:pt-0 last:pb-0',
  row: cn(
    'py-space-4 first:pt-0 last:pb-0',
    // From 720px each column takes a vertical rule on its left and space-6 either side of it, except the first column
    // of each row of three, which starts on the container's left line, and the third, which ends on its right line.
    'min-[720px]:border-l min-[720px]:border-rule min-[720px]:px-space-6 min-[720px]:py-0',
    'min-[720px]:[&:nth-child(3n+1)]:border-l-0 min-[720px]:[&:nth-child(3n+1)]:pl-0 min-[720px]:[&:nth-child(3n)]:pr-0',
  ),
};

export interface InsightCardsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'children'> {
  /** insights from lib/content/site.ts on the homepage; a sector page passes its own three. */
  content: Partial<Pick<InsightsSection, 'eyebrow' | 'heading'>> & {
    articles: (Pick<Article, 'slug' | 'href' | 'title' | 'sectorTag'> & { published?: string })[];
  };
  layout?: InsightCardsLayout;
  /**
   * Open with the SectionHeading and render as a section labelled by it (the default). Off, the rows render alone in
   * a div: on the homepage the heading and the rows share a column with the scorecard panel beside them.
   */
  withHeading?: boolean;
  /** The SectionHeading's level; the titles sit one level below it. */
  headingLevel?: 'h2' | 'h3';
  /** The heading's id, for aria-labelledby. Generated when left out. */
  headingId?: string;
  /** Empty places after the articles, each marked "Content to follow". None by default. */
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
  // The stack's date column, only where a date is there to show: a list of planned articles keeps one column.
  const stack = layout === 'stack' && content.articles.some((article) => article.published);

  return (
    <Root aria-labelledby={showHeading ? titleId : undefined} className={className} {...props}>
      {showHeading && content.heading ? (
        <SectionHeading as={headingLevel} eyebrow={content.eyebrow} heading={content.heading} headingId={titleId} />
      ) : null}
      <ul className={cn('grid', listLayout[layout])}>
        {content.articles.map((article) => (
          <li key={article.slug} className={cn('flex', itemLayout[layout])}>
            {/* The date, then the tag, then the title, as they read: "20 Nov 2025, Furniture, Shopify Standard...". */}
            <NextLink
              href={article.href}
              className={cn(
                'group/insight grid w-full content-start gap-y-space-2 text-ink no-underline',
                // The stack sets the date in its own column from 480px, the tag and title beside it.
                stack && 'min-[480px]:grid-cols-[var(--space-24)_minmax(0,1fr)] min-[480px]:gap-x-space-6',
              )}
            >
              {article.published ? (
                <time
                  dateTime={article.published}
                  className={cn('small tabular-nums text-ink-muted', stack && 'min-[480px]:row-span-2 min-[480px]:pt-[2px]')}
                >
                  {formatInsightDate(article.published)}
                </time>
              ) : null}
              <span className={cn('eyebrow text-ink-muted', stack && 'min-[480px]:col-start-2')}>
                {article.sectorTag}
              </span>
              <ItemHeading
                className={cn(
                  'heading-2 text-ink',
                  stack && 'min-[480px]:col-start-2',
                  // The hover answer (Phase 2.7, step 8): the title from ink to green-700, 150ms, nothing moves.
                  'transition-colors duration-colour ease-out group-hover/insight:text-green-700',
                )}
              >
                {article.title}
              </ItemHeading>
            </NextLink>
          </li>
        ))}
        {Array.from({ length: placeholders }, (_, index) => (
          <li key={`to-follow-${index}`} className={itemLayout[layout]}>
            <Stub />
          </li>
        ))}
      </ul>
    </Root>
  );
}
