import * as React from 'react';

import { SectionHeading } from '@/components/brand/SectionHeading';
import { CTABand } from '@/components/site/CTABand';
import { FAQ } from '@/components/site/FAQ';
import { JsonLd } from '@/components/site/JsonLd';
import { CaseStudyLinks, OtherOffers, SectorLinks, secondaryAction } from '@/components/site/OfferLinks';
import { OfferHeader, TextBlock } from '@/components/site/PageBlocks';
import { ProblemCards } from '@/components/site/ProblemCards';
import { Screen } from '@/components/site/Screen';
import { storeHealthCheckPage as page } from '@/lib/content/pages/offers';
import { offers } from '@/lib/content/site';
import type { PriceTier } from '@/lib/content/types';
import { buildMetadata, serviceJsonLd } from '@/lib/seo';
import { cn } from '@/lib/utils';

// /store-health-check (plan, Service pages): sells the paid diagnostic. Copy is lib/content/pages/offers.ts, verbatim
// from the plan, in its order: intro, what gets checked (the eight areas, as the problem cards set a title and its
// lines), what you get, pricing by catalogue size, FAQ with FAQPage schema. Then the links the plan's internal linking
// rules ask of an offer page and the two closing calls to action. Service JSON-LD (the three tier prices) from
// lib/seo.ts.
//
// Screens (brand book, one section per screen): the header; what gets checked; what you get beside pricing, then the
// FAQ; the other offers with the case studies; the sectors.

export const metadata = buildMetadata('/store-health-check');

const offerName = offers.offers.find((offer) => offer.id === page.id)?.name ?? page.h1;

type TierTableContent = (typeof page)['pricing']['table'];

/**
 * The tier on the brass-300 band, if the content marks one (lib/content/pages/offers.ts): at most one, and only with a
 * label to say so in words. None today (Phase 3 review): the catalogue size sets the tier. -1 when there is none.
 */
function highlightedTier(tiers: PriceTier[], label: string | undefined) {
  const chosen = tiers.filter((tier) => tier.highlight);
  if (chosen.length > 1) {
    throw new Error(`The Health Check pricing allows one highlighted tier at most; lib/content has ${chosen.length}.`);
  }
  if (chosen.length === 1 && !label) {
    throw new Error('A highlighted Health Check tier needs table.highlightLabel, so colour is not the only signal.');
  }
  return chosen.length === 1 ? tiers.indexOf(chosen[0]) : -1;
}

/**
 * The pricing table (brand book, Colour): raised to paper-raised with a rule border and no shadow, the column heads in
 * the eyebrow style over a rule-strong rule (a table header is a border that carries meaning), the tiers divided by rule
 * hairlines, and a tier the reader should choose, if one is marked, on the brass-300 band, text in ink. Prices are set
 * as the OfferCard sets a price: Newsreader 500 at 28px with tabular numerals. Everything is left aligned (brand book,
 * Layout).
 */
function TierTable({ tiers, table }: { tiers: PriceTier[]; table: TierTableContent }) {
  const highlight = highlightedTier(tiers, table.highlightLabel);
  const [sizeHead, priceHead] = table.columns;
  return (
    <div className="rounded-radius-0 border border-rule bg-paper-raised text-ink">
      <table className="w-full table-fixed border-collapse">
        <caption className="sr-only">{table.caption}</caption>
        <colgroup>
          <col className="w-[60%]" />
          <col />
        </colgroup>
        <thead>
          <tr>
            <th scope="col" className="eyebrow border-b border-rule-strong px-space-6 pb-space-3 pt-space-4 text-left text-ink-muted">
              {sizeHead}
            </th>
            <th scope="col" className="eyebrow border-b border-rule-strong px-space-6 pb-space-3 pt-space-4 text-left text-ink-muted">
              {priceHead}
            </th>
          </tr>
        </thead>
        <tbody>
          {tiers.map((tier, index) => {
            const chosen = index === highlight;
            return (
              <tr key={tier.label} className={cn('border-b border-rule last:border-b-0', chosen && 'border-brass-300 bg-brass-300')}>
                <th scope="row" className="body px-space-6 py-space-4 text-left align-middle font-semibold text-ink">
                  {tier.label}
                  {chosen ? <span className="eyebrow mt-space-1 block text-ink">{table.highlightLabel}</span> : null}
                </th>
                <td className="px-space-6 py-space-4 text-left align-middle font-display text-[28px] font-medium leading-none tracking-[-0.01em] text-ink tabular-nums">
                  {tier.price}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function StoreHealthCheckPage() {
  const actions = { primary: page.closing.primary, secondary: secondaryAction(page.closing, page.path) };
  return (
    <>
      <JsonLd data={serviceJsonLd(page.id)} />

      <OfferHeader eyebrow={offerName} h1={page.h1} intro={page.intro} actions={actions} headingId="page-heading" />

      <Screen as="div" phoneScreens={2}>
        <ProblemCards content={page.checked} headingId="checked-heading" id="what-gets-checked" />
      </Screen>

      <Screen as="div" phoneScreens={2}>
        {/* From 900px what you get takes columns 1 to 5 and pricing 6 to 12, their hairlines level; the FAQ follows
            across the container. One column below, in the plan's order. */}
        <div className="grid grid-cols-1 gap-x-gutter gap-y-space-12 min-[900px]:grid-cols-12">
          <TextBlock section={page.deliverables} headingId="deliverables-heading" id="what-you-get" className="min-[900px]:col-span-5" />
          <section aria-labelledby="pricing-heading" id="pricing" className="min-w-0 min-[900px]:col-span-7">
            <SectionHeading heading={page.pricing.heading} headingId="pricing-heading" />
            <p className="body mb-space-4 max-w-measure">{page.pricing.intro}</p>
            <TierTable tiers={page.pricing.tiers} table={page.pricing.table} />
            <p className="body mt-space-4 max-w-measure">{page.pricing.note}</p>
          </section>
        </div>
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
