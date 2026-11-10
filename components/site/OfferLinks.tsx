import * as React from 'react';
import NextLink from 'next/link';

import { ForwardLink } from '@/components/brand/Button';
import { linkedCardClasses } from '@/components/brand/LinkedCard';
import { OfferCard } from '@/components/brand/OfferCard';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { SectorTiles } from '@/components/site/SectorTiles';
import { caseStudyPages, resultsIndexPage } from '@/lib/content/pages/results';
import { offers, proof, sectors } from '@/lib/content/site';
import { isStub } from '@/lib/content/stub';
import type { ClosingActions, Link as SiteLink, OfferId, SectorSlug } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The three link blocks every offer page owes the site (plan, Internal linking rules: the two other offers, the sector
// pages, two case studies), and the closing band's secondary action. Moved from app/(site)/ecommerce-director/_parts.tsx
// at the Phase 3 integrate step; server-side only (it reads the case study pages).

/**
 * Phase 3 draft, pending Dan's approval: the heading over the two other offers. The plan names the links (Internal
 * linking rules) but gives the block no heading; the eyebrow is the homepage offers section's.
 */
export const otherOffersDraft = { eyebrow: offers.eyebrow, heading: 'Other ways to work with me' } as const;

/** The two other offers as OfferCards, side by side from 720px. The Health Check card keeps its brass-300 highlight. */
export function OtherOffers({ ids, headingId }: { ids: OfferId[]; headingId: string }) {
  const items = ids.map((id) => {
    const found = offers.offers.find((offer) => offer.id === id);
    if (!found) throw new Error(`No offer ${id} in lib/content/site.ts`);
    return found;
  });
  return (
    <section aria-labelledby={headingId} className="min-w-0">
      <SectionHeading eyebrow={otherOffersDraft.eyebrow} heading={otherOffersDraft.heading} headingId={headingId} />
      <ul className="grid grid-cols-1 gap-space-6 min-[720px]:grid-cols-2 min-[720px]:gap-x-gutter">
        {items.map((offer) => (
          <OfferCard key={offer.id} as="li" offer={offer} headingLevel="h3" />
        ))}
      </ul>
    </section>
  );
}

/**
 * Two case studies as linked cards (brand book, Motion: the hover layer), the way the Insights cards are set: the
 * sector in the eyebrow style, the client in heading-2, and the case study's one-line summary where it is written.
 * The heading is the Results page's label, and the forward link under the cards is the homepage proof block's.
 */
export function CaseStudyLinks({ slugs, headingId }: { slugs: readonly string[]; headingId: string }) {
  const items = slugs.map((slug) => {
    const page = caseStudyPages[slug];
    if (!page) throw new Error(`No case study ${slug} in lib/content/pages/results.ts`);
    return page;
  });
  return (
    <section aria-labelledby={headingId} className="min-w-0">
      <SectionHeading heading={resultsIndexPage.label} headingId={headingId} />
      <ul className="grid grid-cols-1 gap-space-6 min-[720px]:grid-cols-2 min-[720px]:gap-x-gutter">
        {items.map(({ caseStudy, summary }) => (
          <li key={caseStudy.slug} className="grid">
            <NextLink href={caseStudy.href} className={cn(linkedCardClasses, 'grid content-start gap-y-space-2')}>
              <span className="eyebrow text-ink-muted">{caseStudy.sector.label}</span>
              <h3 className="heading-2">{caseStudy.title}</h3>
              {isStub(summary) ? null : <span className="body">{summary}</span>}
            </NextLink>
          </li>
        ))}
      </ul>
      <ForwardLink link={proof.link} className="mt-space-4" />
    </section>
  );
}

/** The sector pages as the homepage's tiles, with its eyebrow and heading, in the order the offer page lists them. */
export function SectorLinks({ slugs, headingId }: { slugs: readonly SectorSlug[]; headingId: string }) {
  const items = slugs.map((slug) => {
    const found = sectors.sectors.find((sector) => sector.slug === slug);
    if (!found) throw new Error(`No sector ${slug} in lib/content/site.ts`);
    return found;
  });
  return <SectorTiles content={{ ...sectors, sectors: items }} headingId={headingId} />;
}

/**
 * The closing band's secondary action on a page. Everywhere but the Health Check page it is the plan's "Start with a
 * Health Check". On the Health Check page that link would point at the page itself, so there it keeps its label and
 * goes to the brief form on /contact, where a Health Check starts (Phase 3 choice, pending Dan's approval).
 */
export function secondaryAction(actions: ClosingActions, currentPath: string): SiteLink {
  return actions.secondary.href === currentPath ? { ...actions.secondary, href: '/contact' } : actions.secondary;
}
