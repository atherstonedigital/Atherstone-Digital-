import * as React from 'react';

import { ComparisonTable } from '@/components/site/ComparisonTable';
import { CTABand } from '@/components/site/CTABand';
import { FaqBlock, ListBlock, PageHeader, TextBlock } from '@/components/site/PageBlocks';
import { Screen } from '@/components/site/Screen';
import { agencyOrInHousePage as page } from '@/lib/content/pages/agency-or-in-house';
import { comparison } from '@/lib/content/site';
import { isStub } from '@/lib/content/stub';
import { buildMetadata } from '@/lib/seo';

// /agency-or-in-house (plan, Results, About, Insights, Contact > /agency-or-in-house): replaces Why Not An Agency and
// helps an owner choose. The plan gives the title tag, the H1 and the structure; its body is not written beyond the
// homepage's comparison, which the page carries under the H1 (Phase 3 decision 4). Copy is
// lib/content/pages/agency-or-in-house.ts and the comparison in lib/content/site.ts, verbatim.
//
// The plan's structure, in its order: the honest case for each option; the full cost of each, in a table with real UK
// figures and sources; the questions to ask any of the three before signing; where the director model fits and where
// it doesn't; FAQ. Each shows its heading and "Content to follow" until written, and the page is noindex meanwhile
// (staticRoutes in lib/seo.ts). Then the closing band, "Book a call · Start with a Health Check".
//
// Screens (brand book, one section per screen): the header with the comparison; then the guide. A written section takes
// a screen of its own; unwritten ones next to each other share one, so a run of stubs never leaves screens half empty.
// No breadcrumbs: the plan asks for BreadcrumbList on sector, results and insights pages only. The Organization
// JSON-LD is the root layout's; FAQPage is written with the FAQ once its questions are.

export const metadata = buildMetadata('/agency-or-in-house');

interface GuidePart {
  key: string;
  written: boolean;
  node: React.ReactNode;
}

/** Groups the guide's parts into screens: each written part alone, each run of unwritten parts together. */
function screens(parts: GuidePart[]): GuidePart[][] {
  return parts.reduce<GuidePart[][]>((groups, part) => {
    const last = groups[groups.length - 1];
    const lastPart = last?.[last.length - 1];
    if (last && lastPart && !lastPart.written && !part.written) last.push(part);
    else groups.push([part]);
    return groups;
  }, []);
}

export default function AgencyOrInHousePage() {
  const guide: GuidePart[] = [
    {
      key: 'honest-case',
      written: !isStub(page.honestCase.paragraphs),
      node: <TextBlock section={page.honestCase} headingId="honest-case-heading" id="honest-case" />,
    },
    {
      key: 'full-cost',
      written: !isStub(page.fullCost.paragraphs),
      node: <TextBlock section={page.fullCost} headingId="full-cost-heading" id="full-cost" />,
    },
    {
      key: 'questions',
      written: !isStub(page.questions.items),
      node: <ListBlock section={page.questions} headingId="questions-heading" id="questions" />,
    },
    {
      key: 'director-fit',
      written: !isStub(page.directorFit.paragraphs),
      node: <TextBlock section={page.directorFit} headingId="director-fit-heading" id="director-fit" />,
    },
    {
      key: 'faq',
      written: !isStub(page.faq.items),
      node: <FaqBlock faq={page.faq} headingId="faq-heading" id="faq" />,
    },
  ];

  return (
    <>
      <Screen first as="section" labelledBy="page-heading">
        {/* The eyebrow is the homepage comparison's, which names this page, as its share image does. */}
        <PageHeader h1={page.h1} headingId="page-heading" eyebrow={comparison.eyebrow} />
        {/* The homepage comparison, verbatim, under its own heading. Its eyebrow is the header's, so it is not repeated
            here, and its "The full comparison" link is left off because it points at this page. */}
        <ComparisonTable
          content={{
            heading: page.comparisonHeading,
            caption: comparison.caption,
            columns: comparison.columns,
            rows: comparison.rows,
            note: comparison.note,
          }}
          headingId="comparison-heading"
          id="comparison"
        />
      </Screen>

      {screens(guide).map((group) => (
        <Screen key={group.map((part) => part.key).join('+')}>
          {group.map((part) => (
            <React.Fragment key={part.key}>{part.node}</React.Fragment>
          ))}
        </Screen>
      ))}

      <CTABand primary={page.closing.primary} secondary={page.closing.secondary} />
    </>
  );
}
