import * as React from 'react';

import { SectionHeading } from '@/components/brand/SectionHeading';
import { CTABand } from '@/components/site/CTABand';
import { FAQ } from '@/components/site/FAQ';
import { JsonLd } from '@/components/site/JsonLd';
import { CaseStudyLinks, OtherOffers, SectorLinks, secondaryAction } from '@/components/site/OfferLinks';
import { DashList, LedgerTable, OfferHeader, Paragraphs, TextBlock } from '@/components/site/PageBlocks';
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

      {/* The month, what you don't get and pricing, one under another in the plan's order, every h2 on the container's
          left line. Pricing's words sit on paper-raised with a rule border and no shadow (brand book, Colour: raise the
          pricing to paper-raised), the panel held to the left half from 900px.
          Polish review, rejected in part: it proposed a row of three from 1200px to fill the right half. A row of three
          breaks the brand book's "at most two columns above 900px" (Layout), and any layout that sets one of these h2
          sections in the right half fails the gate's container-edges (SR-6: every h1 and h2 starts on the container's
          left, or on the split line of a text-and-picture split, which a row of text is not); both were checked. */}
      <Screen as="div">
        <TextBlock section={page.month} headingId="month-heading" id="a-month" />
        <TextBlock section={page.notIncluded} headingId="not-included-heading" id="what-you-dont-get" />
        <section aria-labelledby="pricing-heading" id="pricing" className="min-w-0">
          <SectionHeading heading={page.pricing.heading} headingId="pricing-heading" />
          <div className="rounded-radius-0 border border-rule bg-paper-raised p-space-4 min-[900px]:max-w-[calc(50%_-_var(--space-6)/2)]">
            <Paragraphs paragraphs={page.pricing.paragraphs} />
          </div>
        </section>
      </Screen>

      <Screen as="div" phoneScreens={2}>
        <section aria-labelledby="fit-heading" id="fit" className="min-w-0">
          <SectionHeading heading={page.fit.heading} headingId="fit-heading" />
          {/* The plan's two lists side by side, from 720px; stacked in the same order below. Two columns of text, not a
              split, so they stand a gutter apart, the 12-column grid's gap (tokens.css), and "Not a fit" starts on
              the grid's column 7 (x 736 at 1440), where the gate's edge checks read the grid from --gutter. */}
          <div className="grid grid-cols-1 gap-x-gutter gap-y-space-8 min-[720px]:grid-cols-2">
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

      {/* The sector row centred in the frame's 60dvh floor, as on the homepage, so the slack never sits under it. */}
      <Screen as="div" className="flex flex-col justify-center">
        <SectorLinks slugs={page.links.sectors} headingId="sectors-heading" />
      </Screen>

      <CTABand primary={actions.primary} secondary={actions.secondary} />
    </>
  );
}
