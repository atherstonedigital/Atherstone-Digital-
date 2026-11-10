import { caseStudyPages, resultsIndexPage } from '@/lib/content/pages/results';
import { problemTags } from '@/lib/content/site';
import { isStub } from '@/lib/content/stub';
import type { CaseStudy, ProblemTag } from '@/lib/content/types';

import type { CaseStudyCardData, FilterValue } from './_card';

// Server-side helpers for the Results index, the case study pages and the thank-you page: the card data, the filter
// values and the links into a filtered Results view. Everything comes from lib/content/pages/results.ts.

/** The query parameters the Results index reads (app/(site)/results/_filter.tsx). */
export const FILTER_PARAMS = { sector: 'sector', problem: 'problem' } as const;

function slugify(label: string) {
  return label
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * A case study's sector as a filter value: the sector page's slug for the five sectors, else the label made into a
 * slug (wellness, digital, home and interiors), so every sector tag can be a filter.
 */
export function sectorValue(sector: CaseStudy['sector']): string {
  return sector.slug ?? slugify(sector.label);
}

/** A link to the Results index filtered by one sector or one problem: /results?problem=catalogue. */
export function filteredResultsHref(filter: { sector?: string; problem?: ProblemTag }): string {
  const params = new URLSearchParams();
  if (filter.sector) params.set(FILTER_PARAMS.sector, filter.sector);
  if (filter.problem) params.set(FILTER_PARAMS.problem, filter.problem);
  const query = params.toString();
  return query ? `/results?${query}` : '/results';
}

/** One case study's card. Throws at build on an unknown slug, so no card links to a missing page. */
export function caseStudyCard(slug: string): CaseStudyCardData {
  const page = caseStudyPages[slug];
  if (!page) throw new Error(`No case study ${slug} in lib/content/pages/results.ts`);
  const { caseStudy, summary } = page;
  return {
    slug: caseStudy.slug,
    href: caseStudy.href,
    title: caseStudy.title,
    sector: { value: sectorValue(caseStudy.sector), label: caseStudy.sector.label },
    problems: caseStudy.problems.map((problem) => ({ value: problem, label: problemTags[problem] })),
    summary: isStub(summary) ? undefined : summary,
  };
}

/** The case study whose page an href names (/results/xshowhome), for the thank-you page's two links. */
export function caseStudyCardForHref(href: string): CaseStudyCardData {
  const slug = href.replace(/^\/results\//, '');
  return caseStudyCard(slug);
}

/** Every card, in the index's order (the plan's "write these four first", then Licklibrary). */
export function resultsCards(): CaseStudyCardData[] {
  return resultsIndexPage.order.map(caseStudyCard);
}

/**
 * The filter options: only values at least one case study carries, so no choice leads to an empty list. Sectors in the
 * order the index first lists them; problems in the plan's order (catalogue, feeds, tracking, paid, email, build), so
 * Email and Build appear as soon as a case study is tagged with them.
 */
export function filterOptions(cards: CaseStudyCardData[]): { sectors: FilterValue[]; problems: FilterValue[] } {
  const sectors: FilterValue[] = [];
  for (const card of cards) {
    if (!sectors.some((item) => item.value === card.sector.value)) sectors.push(card.sector);
  }
  const used = new Set(cards.flatMap((card) => card.problems.map((problem) => problem.value)));
  const problems = (Object.keys(problemTags) as ProblemTag[])
    .filter((tag) => used.has(tag))
    .map((tag) => ({ value: tag, label: problemTags[tag] }));
  return { sectors, problems };
}
