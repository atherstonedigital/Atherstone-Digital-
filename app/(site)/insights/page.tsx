import * as React from 'react';

import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { CTABand } from '@/components/site/CTABand';
import { InsightCards } from '@/components/site/InsightCards';
import { Screen, Stub, StubSection } from '@/components/site/Screen';
import { indexGroups, type IndexGroup } from '@/lib/content/insights';
import { insightsIndexPage as page } from '@/lib/content/pages/insights';
import { isStub } from '@/lib/content/stub';
import { buildMetadata, crumbs } from '@/lib/seo';

// /insights (plan, /insights and /insights/[slug]): the article index, grouped by cluster, not by date. The plan's six
// clusters in its order (Catalogue and feeds, Paid media for considered purchases, Email and samples, Tracking and
// reporting, Showroom and online, Shopify for interiors), then Archive for the moved /blog posts that fit none (Phase 3
// decision 8). Each cluster is a section with its SectionHeading and its articles as the homepage's Insights cards,
// newest first. A cluster with no written article yet shows its heading and "Content to follow", so the plan's
// structure is visible and nothing links to an article that does not exist.
//
// The H1 is the homepage Insights heading, verbatim; the plan gives the index no intro, so the intro is the stub
// (lib/content/pages/insights.ts). Title tag and meta description come from lib/seo.ts. Breadcrumbs carry the
// BreadcrumbList (plan, Structured data); the Organization JSON-LD is the root layout's. The page closes with the
// CTABand, "Book a call, or start with the Health Check", as the offer and sector pages do.
//
// Screens (brand book, one section per screen): the header with the first two clusters; the other four clusters; then
// the Archive, one or two screens of cards on its own. Clusters hold one to three articles each for now, so each is too
// short to fill a screen and shares one with its neighbours in the plan's order.

export const metadata = buildMetadata('/insights');

/** How many of the plan's clusters share the first screen with the page header. */
const CLUSTERS_ON_FIRST_SCREEN = 2;

function headingId(group: IndexGroup) {
  return `${group.cluster.id}-heading`;
}

/** One cluster: its articles as linked cards, three across from 720px, or the stub until one is written. */
function Cluster({ group }: { group: IndexGroup }) {
  const { cluster, posts } = group;
  if (posts.length === 0) {
    return <StubSection heading={cluster.label} headingId={headingId(group)} id={cluster.id} />;
  }
  return (
    <InsightCards
      id={cluster.id}
      className="min-w-0"
      layout="row"
      headingId={headingId(group)}
      content={{ heading: cluster.label, articles: posts }}
    />
  );
}

export default function InsightsIndexRoute() {
  const groups = indexGroups();
  const planGroups = groups.filter((group) => group.cluster.id !== 'archive');
  const archive = groups.find((group) => group.cluster.id === 'archive');
  const lead = planGroups.slice(0, CLUSTERS_ON_FIRST_SCREEN);
  const rest = planGroups.slice(CLUSTERS_ON_FIRST_SCREEN);

  return (
    <>
      <Screen first>
        <header>
          <Breadcrumbs items={crumbs.insights()} className="mb-space-6" />
          {/* display-2, balanced and held to 24em, as every inner page's H1. */}
          <h1 className="display-2 max-w-[24em] text-balance">{page.h1}</h1>
          {isStub(page.intro) ? (
            <Stub size="body-lg" className="mt-space-6" />
          ) : (
            <p className="body-lg mt-space-6 max-w-measure-lg">{page.intro}</p>
          )}
        </header>
        {lead.map((group) => (
          <Cluster key={group.cluster.id} group={group} />
        ))}
      </Screen>

      {rest.length > 0 ? (
        <Screen>
          {rest.map((group) => (
            <Cluster key={group.cluster.id} group={group} />
          ))}
        </Screen>
      ) : null}

      {archive && archive.posts.length > 0 ? (
        <Screen>
          <Cluster group={archive} />
        </Screen>
      ) : null}

      <CTABand />
    </>
  );
}
