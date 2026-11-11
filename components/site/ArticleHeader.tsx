import * as React from 'react';

import { TextLink } from '@/components/brand/Button';

// The top of an article (plan, /insights/[slug]: byline, date, reading time, sector tag): the sector tag in the eyebrow
// style, the title as the page's H1 in display-2, then the byline in small (Dan's name, the date, the reading time) and
// a rule hairline beneath, as under a section heading. No photograph: the plan asks for "Dan's byline and photo" on each
// article, but the brand book keeps the portrait to the homepage and About (Phase 1 report, section 6). The byline
// follows the Testimonial's attribution: the name in ink, the rest in ink-muted.

/** "10 November 2026": British order, the month in words, read in UTC so the date never shifts with the reader. */
const dateFormat = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

/** Phase 2 draft, pending Dan's approval: the reading time as the byline sets it. */
export function formatReadingTime(minutes: number) {
  return `${minutes} min read`;
}

/** Whole minutes at 230 words a minute, never under one: the plan's 900 to 1,400 words read in four to seven. */
export function readingMinutes(wordCount: number) {
  return Math.max(1, Math.round(wordCount / 230));
}

export interface ArticleAuthor {
  name: string;
  /** The author's page (About); the name links there when given. */
  href?: string;
}

export interface ArticleHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'children'> {
  /** The article's title: the page's H1, in display-2. Sentence case. */
  title: string;
  /** The article's sector tag, as on its Insights card. */
  sectorTag: string;
  author: ArticleAuthor;
  /** Publication date as an ISO 8601 date, 2026-11-10. It fills the time element's datetime as given. */
  published: string;
  /** Whole minutes; readingMinutes() works it out from a word count. */
  minutes: number;
  /** h1 on the article page; h2 where the header is shown inside another page. */
  headingLevel?: 'h1' | 'h2';
}

export function ArticleHeader({
  title,
  sectorTag,
  author,
  published,
  minutes,
  headingLevel: Heading = 'h1',
  className,
  ...props
}: ArticleHeaderProps) {
  return (
    <header className={className} {...props}>
      <p className="eyebrow mb-space-2 text-ink-muted">{sectorTag}</p>
      <Heading className="display-2 mb-space-4">{title}</Heading>
      <p className="small text-ink-muted">
        <span className="font-semibold text-ink">
          {author.href ? (
            <TextLink href={author.href} hitArea>
              {author.name}
            </TextLink>
          ) : (
            author.name
          )}
        </span>
        <span aria-hidden="true"> · </span>
        <span className="sr-only">, </span>
        <time dateTime={published}>{dateFormat.format(new Date(published))}</time>
        <span aria-hidden="true"> · </span>
        <span className="sr-only">, </span>
        {formatReadingTime(minutes)}
      </p>
      {/* The hairline under the header, space-4 below the byline, as the SectionHeading sets its own. Decorative. */}
      <hr aria-hidden="true" className="mt-space-4 border-0 border-t border-rule" />
    </header>
  );
}
