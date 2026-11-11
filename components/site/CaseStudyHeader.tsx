import * as React from 'react';
import { getImageProps } from 'next/image';

import { TextLink } from '@/components/brand/Button';
import { StatBlock } from '@/components/brand/StatBlock';
import type { ProofFigure } from '@/lib/content/types';
import type { Photo } from '@/lib/images';
import { cn } from '@/lib/utils';

// The top of a case study (plan, Results: the case study template, parts 1 and 2): the client's name as the H1 in
// display-2, the business line in body-lg, the headline number in the StatBlock (its one brass use), and the sector
// and problem tags the Results index filters by. The tags are ledger rows, label and value on a rule hairline, not
// badges: the brand has none (brand book, The idea).
//
// Phase 2.6 (frontend-design, with design-taste-frontend's split rule): the header can carry the client's own
// photograph (lib/images.ts), flush on paper with a rule border and radius-0, no caption. From 900px the name, business
// line and tags take the left half and the photograph and the StatBlock the right half, top-aligned, the two halves
// 24px apart so the right one starts on the page's one split line (x 732 at 1440, as the homepage's splits). Below 900px
// one column: name and business line, the photograph, the figure, then the tags. The photograph is the first image on
// the page, so it loads at once, never lazily.

// ------------------------------------------------------------------ photographs

/**
 * The client photographs (lib/images.ts) as Phase 2.6 renders them, for every page outside the homepage: next/image
 * works out the props, the blurred placeholder included, and the img then takes the renditions scripts/images.mjs
 * wrote (each under 150kb), because the static export runs with images.unoptimized and next/image would drop its
 * srcset. The intrinsic width and height hold the frame's ratio, so nothing shifts as it loads. Flush on paper, a rule
 * border, radius-0: never a circle, a tilt, a device frame, a shadow or text over it, and no caption. Lazy unless
 * `priority` marks it the first image in the viewport.
 *
 * It lives here because the case study header was its first user; About and the sector pages import it from here. Fold
 * it into its own module at the next integrate step.
 */
export interface PhotographProps {
  photo: Photo;
  /** The width it really renders at in each band, as an img sizes list (see splitSizes and fiveColumnSizes). */
  sizes: string;
  /** The first image in the viewport: fetched at once and at high priority instead of lazily. */
  priority?: boolean;
  className?: string;
}

export function Photograph({ photo, sizes, priority = false, className }: PhotographProps) {
  const { props } = getImageProps({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: photo.alt,
    sizes,
    placeholder: 'blur',
    blurDataURL: photo.blurDataURL,
    ...(priority ? { priority: true } : { loading: 'lazy' as const }),
  });
  return (
    // A plain img on next/image's props, with the generated srcset (see above).
    <img
      {...props}
      alt={photo.alt}
      srcSet={photo.srcSet}
      sizes={sizes}
      className={cn('block h-auto w-full rounded-radius-0 border border-rule object-cover', className)}
    />
  );
}

/**
 * A photograph in one half of a split from 900px: half the container less half the 24px split gap (588px once the
 * container reaches 1200px, at 1264px), the container's width below 900px. The gutter is 32px from 1200px, 24px from
 * 720px and 16px below.
 */
export const splitSizes = [
  '(min-width: 1264px) 588px',
  '(min-width: 1200px) calc(50vw - 44px)',
  '(min-width: 900px) calc(50vw - 36px)',
  '(min-width: 720px) calc(100vw - 48px)',
  'calc(100vw - 32px)',
].join(', ');

/**
 * A photograph on five of twelve columns 24px apart from 720px, (container + 24) * 5 / 12 - 24 (486px once the
 * container is 1200px wide, at 1264px), the container's width below 720px.
 */
export const fiveColumnSizes = [
  '(min-width: 1264px) 486px',
  '(min-width: 1200px) calc((100vw - 40px) * 5 / 12 - 24px)',
  '(min-width: 720px) calc((100vw - 24px) * 5 / 12 - 24px)',
  'calc(100vw - 32px)',
].join(', ');

// ------------------------------------------------------------------ the header

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
  /**
   * The client's own photograph (lib/images.ts), above the StatBlock in the right half. Only a photograph of this
   * client's own business: none is better than another client's.
   */
  photo?: Photo;
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
  photo,
  className,
  ...props
}: CaseStudyHeaderProps) {
  return (
    <header
      className={cn(
        'grid grid-cols-1 gap-y-space-8 text-ink',
        // The second row takes whatever height the right half adds, so the tags stay under the business line.
        'min-[900px]:grid-cols-12 min-[900px]:grid-rows-[auto_1fr] min-[900px]:gap-x-space-6',
        className,
      )}
      {...props}
    >
      <div className="min-[900px]:col-span-6 min-[900px]:row-start-1">
        {eyebrow ? <p className="eyebrow mb-space-2 text-ink-muted">{eyebrow}</p> : null}
        <Heading className="display-2 mb-space-4">{title}</Heading>
        {/* The first paragraph of the page: body-lg at measure-lg (brand book, Type). */}
        <p className="body-lg max-w-measure-lg">{business}</p>
      </div>

      {photo || stat ? (
        <div className="grid grid-cols-1 content-start gap-y-space-8 min-[900px]:col-span-6 min-[900px]:col-start-7 min-[900px]:row-span-2 min-[900px]:row-start-1">
          {photo ? <Photograph photo={photo} sizes={splitSizes} priority /> : null}
          {stat ? <StatBlock figure={stat.figure} line={stat.line} /> : null}
        </div>
      ) : null}

      {/* Ledger rows: the label in the eyebrow style on a fixed column, the value in body, each row closed by a rule.
          Phase 3 review (a minimal extension): each row is at least a touch target plus space-2 tall, with space-3
          above and below, so the tag links' 44px hit areas sit 8px apart instead of overlapping. */}
      <dl className="grid grid-cols-1 self-start min-[900px]:col-span-6 min-[900px]:col-start-1 min-[900px]:row-start-2">
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
