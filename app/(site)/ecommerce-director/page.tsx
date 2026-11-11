import * as React from 'react';

import { SectionHeading } from '@/components/brand/SectionHeading';
import { CTABand } from '@/components/site/CTABand';
import { FAQ } from '@/components/site/FAQ';
import { JsonLd } from '@/components/site/JsonLd';
import { CaseStudyLinks, OtherOffers, SectorLinks, secondaryAction } from '@/components/site/OfferLinks';
import { DashList, LedgerTable, OfferHeader, TextBlock } from '@/components/site/PageBlocks';
import { Screen } from '@/components/site/Screen';
import { ecommerceDirectorPage as page } from '@/lib/content/pages/offers';
import { offers } from '@/lib/content/site';
import { buildMetadata, serviceJsonLd } from '@/lib/seo';

// /ecommerce-director (plan, Service pages): sells the retainer. Copy is lib/content/pages/offers.ts, verbatim from
// the plan, in its order: intro, who this is for, what I own, what a month looks like, what you don't get, pricing, is
// this a fit, FAQ with FAQPage schema. Then the links the plan's internal linking rules ask of an offer page (the two
// other offers, two case studies, the sector pages) and the two closing calls to action. Service JSON-LD from
// lib/seo.ts; the Organization is the root layout's.
//
// Screens (brand book, one section per screen): the header with who this is for; what I own; the month, what you
// don't get and pricing; is this a fit with the FAQ; the other offers with the case studies; the sectors.

export const metadata = buildMetadata('/ecommerce-director');

const offerName = offers.offers.find((offer) => offer.id === page.id)?.name ?? page.h1;

/** From 1200px, the raised pricing panel's padding and 1px border above a block beside it, so the row's headings level. */
const rowOfThreeLevel = 'min-[1200px]:pt-[calc(var(--space-4)_+_1px)]';

export default function EcommerceDirectorPage() {
  const actions = { primary: page.closing.primary, secondary: secondaryAction(page.closing, page.path) };
  return (
    <>
      <JsonLd data={serviceJsonLd(page.id)} />

      <OfferHeader eyebrow={offerName} h1={page.h1} intro={page.intro} actions={actions} headingId="page-heading">
        <TextBlock section={page.whoFor} headingId="who-for-heading" id="who-this-is-for" />
      </OfferHeader>

      <Screen labelledBy="what-i-own-heading" id="what-i-own" phoneScreens={2}>
        <div className="min-w-0">
          <SectionHeading heading={page.whatIOwn.heading} headingId="what-i-own-heading" />
          <LedgerTable table={page.whatIOwn} />
        </div>
      </Screen>

      {/* From 1200px the month, what you don't get and pricing stand as one ruled row of three, in the plan's order, each
          keeping its SectionHeading (Polish review: stacked at half width they left the right half empty all the way
          down). Pricing is raised to paper-raised with a rule border, no shadow (brand book, Colour: raise the pricing
          to paper-raised); the other two take the panel's padding and border above, so the three headings and
          hairlines stay level. Below 1200px they stack as before, pricing on paper: a full-width raised box would set
          its words inside the container's line. */}
      <Screen as="div" innerClassName="min-[1200px]:grid-cols-3 min-[1200px]:items-start min-[1200px]:gap-x-space-6">
        <TextBlock
          section={page.month}
          headingId="month-heading"
          id="a-month"
          className={rowOfThreeLevel}
        />
        <TextBlock
          section={page.notIncluded}
          headingId="not-included-heading"
          id="what-you-dont-get"
          className={rowOfThreeLevel}
        />
        <TextBlock
          section={page.pricing}
          headingId="pricing-heading"
          id="pricing"
          className="min-[1200px]:rounded-radius-0 min-[1200px]:border min-[1200px]:border-rule min-[1200px]:bg-paper-raised min-[1200px]:p-space-4"
        />
      </Screen>

      <Screen as="div" phoneScreens={2}>
        <section aria-labelledby="fit-heading" id="fit" className="min-w-0">
          <SectionHeading heading={page.fit.heading} headingId="fit-heading" />
          {/* The plan's two lists side by side, from 720px; stacked in the same order below. */}
          <div className="grid grid-cols-1 gap-x-space-6 gap-y-space-8 min-[720px]:grid-cols-2">
            {[page.fit.good, page.fit.notFit].map((list) => (
              <div key={list.label} className="min-w-0">
                <h3 className="heading-2 mb-space-3">{list.label}</h3>
                <DashList items={list.items} />
              </div>
            ))}
          </div>
        </section>
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
