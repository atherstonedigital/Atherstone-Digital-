import * as React from 'react';

import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { CTABand } from '@/components/site/CTABand';
import { Screen } from '@/components/site/Screen';
import { resultsIndexPage as page } from '@/lib/content/pages/results';
import { isStub, STUB_LABEL } from '@/lib/content/stub';
import { buildMetadata, crumbs } from '@/lib/seo';

import { FILTER_PARAMS, filterOptions, resultsCards } from './_cards';
import { ResultsFilter, type ResultsFilterLabels } from './_filter';

// /results (plan, Results: "The Results index is the second most important page on the site... Filterable by sector
// and by problem"). One section: the breadcrumb trail (BreadcrumbList, plan Structured data), the H1 and intro from
// lib/content/pages/results.ts, then every case study as a linked card under the two filters, which run in the browser
// (./_filter.tsx). The closing band follows.
//
// The intro is a stub until the plan writes it, so the page shows STUB_LABEL there (Phase 3 decision 4). The cards carry
// only the figures the public repo rule allows; each case study page is noindex until it is written.

export const metadata = buildMetadata('/results');

/**
 * Phase 3 copy, approved by Dan on 12 Nov 2026: the filter group's screen-reader name, the status line, and the empty state.
 * The two labels and "All" are the content module's.
 */
const filterLabels: ResultsFilterLabels = {
  ...page.filters,
  legend: 'Filter the case studies',
  showingAll: 'Showing all {total} case studies',
  showingSome: 'Showing {count} of {total} case studies',
  empty: 'No case study carries both of those tags yet.',
  reset: 'Show all case studies',
};

export default function ResultsPage() {
  const cards = resultsCards();
  const { sectors, problems } = filterOptions(cards);
  const intro = isStub(page.intro) ? STUB_LABEL : page.intro;

  return (
    <>
      <Screen first labelledBy="page-heading">
        <header>
          <Breadcrumbs items={crumbs.results()} className="mb-space-8" />
          {/* display-2 is the H1 on every page but the homepage. */}
          <h1 id="page-heading" className="display-2 mb-space-6 max-w-[24em] text-balance">
            {page.h1}
          </h1>
          <p className="body-lg max-w-measure-lg">{intro}</p>
        </header>
        <ResultsFilter cards={cards} sectors={sectors} problems={problems} labels={filterLabels} params={FILTER_PARAMS} />
      </Screen>

      <CTABand />
    </>
  );
}
