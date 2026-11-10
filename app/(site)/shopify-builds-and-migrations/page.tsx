import * as React from 'react';

import { SectionHeading } from '@/components/brand/SectionHeading';
import { CTABand } from '@/components/site/CTABand';
import { FAQ } from '@/components/site/FAQ';
import { JsonLd } from '@/components/site/JsonLd';
import { CaseStudyLinks, OtherOffers, SectorLinks, secondaryAction } from '@/components/site/OfferLinks';
import { DashList, OfferHeader, TextBlock } from '@/components/site/PageBlocks';
import { Screen } from '@/components/site/Screen';
import { buildsPage as page } from '@/lib/content/pages/offers';
import { offers } from '@/lib/content/site';
import { buildMetadata, serviceJsonLd } from '@/lib/seo';

// /shopify-builds-and-migrations (plan, Service pages): sells builds and replatforms. Copy is
// lib/content/pages/offers.ts, verbatim from the plan, in its order: intro, built for the sector (eight items, one line
// each, as a dash list), migrations, how it runs, pricing, FAQ with FAQPage schema. Then the links the plan's internal
// linking rules ask of an offer page and the two closing calls to action. Service JSON-LD from lib/seo.ts, with no
// price: the plan quotes after a scoping call.
//
// Screens (brand book, one section per screen): the header; built for the sector with migrations; how it runs beside
// pricing, then the FAQ; the other offers with the case studies; the sectors.

export const metadata = buildMetadata('/shopify-builds-and-migrations');

const offerName = offers.offers.find((offer) => offer.id === page.id)?.name ?? page.h1;

export default function ShopifyBuildsAndMigrationsPage() {
  const actions = { primary: page.closing.primary, secondary: secondaryAction(page.closing, page.path) };
  return (
    <>
      <JsonLd data={serviceJsonLd(page.id)} />

      <OfferHeader eyebrow={offerName} h1={page.h1} intro={page.intro} actions={actions} headingId="page-heading" />

      <Screen as="div">
        <section aria-labelledby="built-for-heading" id="built-for-the-sector" className="min-w-0">
          <SectionHeading heading={page.builtForTheSector.heading} headingId="built-for-heading" />
          <DashList items={page.builtForTheSector.items} />
        </section>
        <TextBlock section={page.migrations} headingId="migrations-heading" id="migrations" />
      </Screen>

      <Screen as="div">
        {/* From 900px how it runs and pricing sit side by side, their hairlines level; the FAQ follows across the
            container. One column below, in the plan's order. */}
        <div className="grid grid-cols-1 gap-x-gutter gap-y-space-12 min-[900px]:grid-cols-2">
          <TextBlock section={page.howItRuns} headingId="how-it-runs-heading" id="how-it-runs" />
          <TextBlock section={page.pricing} headingId="pricing-heading" id="pricing" />
        </div>
        <FAQ content={page.faq} headingId="faq-heading" id="faq" />
      </Screen>

      <Screen as="div" phoneScreens={2}>
        <OtherOffers ids={page.links.offers} headingId="other-offers-heading" />
        <CaseStudyLinks slugs={page.links.caseStudies} headingId="case-studies-heading" />
      </Screen>

      <Screen as="div">
        <SectorLinks slugs={page.links.sectors} headingId="sectors-heading" />
      </Screen>

      <CTABand primary={actions.primary} secondary={actions.secondary} />
    </>
  );
}
