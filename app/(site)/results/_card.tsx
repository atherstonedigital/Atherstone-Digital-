import * as React from 'react';
import NextLink from 'next/link';

import { linkedCardClasses } from '@/components/brand/LinkedCard';
import { cn } from '@/lib/utils';

// One case study as a linked card (brand book, Motion: the hover layer), set the way the offer pages set theirs
// (app/(site)/ecommerce-director/_parts.tsx, CaseStudyLinks): the sector in the eyebrow style, the client in heading-2,
// the one-line summary where it is written, and the problem tags the Results index filters by at the foot. No figure:
// the StatBlock is the case study page's own type moment.
//
// No hooks and no 'use client': the Results filter (a client component) and the thank-you page (a server component)
// both render it. The data comes from ./_cards.ts on the server, so the content modules stay out of the client bundle.

/** A filter value and its label: a sector or a problem tag. */
export interface FilterValue {
  value: string;
  label: string;
}

export interface CaseStudyCardData {
  slug: string;
  href: string;
  title: string;
  sector: FilterValue;
  problems: FilterValue[];
  /** Left out while the summary is a stub. */
  summary?: string;
}

export interface CaseStudyCardProps {
  card: CaseStudyCardData;
  /** h2 where the cards sit straight under the page's H1; h3 under a section's h2. */
  headingLevel?: 'h2' | 'h3';
  className?: string;
}

export function CaseStudyCard({ card, headingLevel: Heading = 'h2', className }: CaseStudyCardProps) {
  return (
    <NextLink href={card.href} className={cn(linkedCardClasses, 'flex h-full flex-col gap-y-space-2', className)}>
      <span className="eyebrow text-ink-muted">{card.sector.label}</span>
      <Heading className="heading-2">{card.title}</Heading>
      {card.summary ? <span className="body max-w-measure">{card.summary}</span> : null}
      {card.problems.length ? (
        // Tags, like the eyebrow: the quieter line at the foot, never body copy.
        <span className="small mt-auto pt-space-2 text-ink-muted">
          {card.problems.map((problem) => problem.label).join(' · ')}
        </span>
      ) : null}
    </NextLink>
  );
}
