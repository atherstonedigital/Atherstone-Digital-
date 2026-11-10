import * as React from 'react';

import { TextLink } from '@/components/brand/Button';
import { StatBlock } from '@/components/brand/StatBlock';
import type { ProofFigure } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The top of a case study (plan, Results: the case study template, parts 1 and 2): the client's name as the H1 in
// display-2, the business line in body-lg, the headline number in the StatBlock (its one brass use), and the sector
// and problem tags the Results index filters by. The tags are ledger rows, label and value on a rule hairline, not
// badges: the brand has none (brand book, The idea).
//
// From 900px the name, business line and tags take columns 1 to 7 and the StatBlock columns 9 to 12, its top rule level
// with the top of the heading block. Below 900px one column: name and business line, the figure, then the tags.

/** A tag value: plain text, or a link to the page it names (the sector page, a filtered Results view). */
export interface CaseStudyTag {
  label: string;
  href?: string;
}

/**
 * Phase 2 drafts, pending Dan's approval: the ledger labels for the two tag rows, named after the Results index's two
 * filters (plan, /results: "filterable by sector and by problem").
 */
export const caseStudyTagLabels = { sector: 'Sector', problem: 'Problem' } as const;

export interface CaseStudyHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title' | 'children'> {
  /** The client's business name: the page's H1, in display-2. */
  title: string;
  /** Optional, a few words in sentence case above the H1. */
  eyebrow?: string;
  /**
   * The business line: sector, showrooms, platform and what online was doing before, in one sentence. The turnover
   * band only with the client's written permission (plan, case study template, part 2).
   */
  business: string;
  /**
   * The headline number and its one-line summary. Only figures already public may appear in this repository. Left out
   * where the case study's headline has no number: then no StatBlock is set (Phase 3).
   */
  stat?: Pick<ProofFigure, 'figure' | 'line'>;
  sector: CaseStudyTag;
  /** From the Results filters: catalogue, feeds, tracking, paid, email, build. With none, the row is left out. */
  problems: CaseStudyTag[];
  labels?: { sector: string; problem: string };
  /** h1 on the case study page; h2 where the header is shown inside another page. */
  headingLevel?: 'h1' | 'h2';
}

function TagValue({ tag }: { tag: CaseStudyTag }) {
  // A standalone link in body type: the ::after hit area makes it 44px tall without moving the row (Button).
  return tag.href ? (
    <TextLink href={tag.href} hitArea>
      {tag.label}
    </TextLink>
  ) : (
    <>{tag.label}</>
  );
}

export function CaseStudyHeader({
  title,
  eyebrow,
  business,
  stat,
  sector,
  problems,
  labels = caseStudyTagLabels,
  headingLevel: Heading = 'h1',
  className,
  ...props
}: CaseStudyHeaderProps) {
  return (
    <header
      className={cn(
        'grid grid-cols-1 gap-y-space-8 text-ink',
        'min-[900px]:grid-cols-12 min-[900px]:gap-x-gutter',
        className,
      )}
      {...props}
    >
      <div className="min-[900px]:col-span-7 min-[900px]:row-start-1">
        {eyebrow ? <p className="eyebrow mb-space-2 text-ink-muted">{eyebrow}</p> : null}
        <Heading className="display-2 mb-space-4">{title}</Heading>
        {/* The first paragraph of the page: body-lg at measure-lg (brand book, Type). */}
        <p className="body-lg max-w-measure-lg">{business}</p>
      </div>

      {stat ? (
        <StatBlock
          figure={stat.figure}
          line={stat.line}
          className="min-[900px]:col-span-4 min-[900px]:col-start-9 min-[900px]:row-span-2 min-[900px]:row-start-1"
        />
      ) : null}

      {/* Ledger rows: the label in the eyebrow style on a fixed column, the value in body, each row closed by a rule.
          Phase 3 review (a minimal extension): each row is at least a touch target plus space-2 tall, with space-3
          above and below, so the tag links' 44px hit areas sit 8px apart instead of overlapping. */}
      <dl className="grid grid-cols-1 self-start min-[900px]:col-span-7 min-[900px]:col-start-1 min-[900px]:row-start-2">
        <div className="flex items-baseline gap-x-space-6 border-b border-rule py-space-3 min-h-[calc(var(--touch-target)_+_var(--space-2))]">
          <dt className="eyebrow w-space-24 shrink-0 text-ink-muted">{labels.sector}</dt>
          <dd className="body min-w-0">
            <TagValue tag={sector} />
          </dd>
        </div>
        {problems.length ? (
          <div className="flex items-baseline gap-x-space-6 border-b border-rule py-space-3 min-h-[calc(var(--touch-target)_+_var(--space-2))]">
            <dt className="eyebrow w-space-24 shrink-0 text-ink-muted">{labels.problem}</dt>
            <dd className="body min-w-0">
              <ul className="flex flex-wrap gap-x-space-2">
                {problems.map((problem, index) => (
                  <li key={problem.label}>
                    {index > 0 ? (
                      <span aria-hidden="true" className="mr-space-2 text-ink-muted">
                        ·
                      </span>
                    ) : null}
                    <TagValue tag={problem} />
                  </li>
                ))}
              </ul>
            </dd>
          </div>
        ) : null}
      </dl>
    </header>
  );
}
