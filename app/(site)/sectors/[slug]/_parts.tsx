import * as React from 'react';

import { ForwardLink } from '@/components/brand/Button';
import { linkedCardHover } from '@/components/brand/LinkedCard';
import { OfferCard } from '@/components/brand/OfferCard';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { StatBlock } from '@/components/brand/StatBlock';
import { Testimonial } from '@/components/brand/Testimonial';
import { fiveColumnSizes, Photograph } from '@/components/site/Photograph';
import { InsightCards } from '@/components/site/InsightCards';
import { Stub } from '@/components/site/Screen';
import { getInsightPost } from '@/lib/content/pages/insights';
import { caseStudyPages } from '@/lib/content/pages/results';
import { offers, proof as proofSection } from '@/lib/content/site';
import { isStub } from '@/lib/content/stub';
import type { SectorProof, Written } from '@/lib/content/types';
import type { Photo } from '@/lib/images';
import { cn } from '@/lib/utils';

// The sector template's own blocks (plan, Sector pages: parts 4 to 6): the three offers, the proof cards and the three
// articles. The frame, the header, the text and list sections and the FAQ are shared with the other inner pages
// (components/site/Screen.tsx and components/site/PageBlocks.tsx, folded there at the Phase 3 integrate step).

interface BlockProps {
  headingId: string;
  id?: string;
}

// ------------------------------------------------------------------ the sector template's blocks

/**
 * The three offers as OfferCards, the Health Check highlighted (plan, Internal linking rules: every sector page links
 * to all three offers). The heading is the homepage's "Three ways to work with me"; its "What I do" eyebrow is left
 * off, because the section above is headed "What I do differently for [sector]". Three across from 900px, one column
 * below, as on the homepage (Polish review: at 768 three cards about 190px wide broke titles over three lines).
 */
export function OffersBlock({ headingId, id }: BlockProps) {
  return (
    <section aria-labelledby={headingId} id={id} className="min-w-0">
      <SectionHeading heading={offers.heading} headingId={headingId} />
      <ul
        className={cn(
          'grid grid-cols-1 gap-space-6 min-[900px]:grid-cols-3',
        )}
      >
        {offers.offers.map((offer) => (
          <OfferCard key={offer.id} as="li" offer={offer} />
        ))}
      </ul>
    </section>
  );
}

/** A case study and the quote it carries, checked at build time so a card never links a missing page. */
function proofCard(card: SectorProof) {
  const page = caseStudyPages[card.caseStudy];
  if (!page) throw new Error(`No case study ${card.caseStudy} in lib/content/pages/results.ts`);
  const testimonial = card.quoteBy ? proofSection.testimonials.find((item) => item.name === card.quoteBy) : undefined;
  if (card.quoteBy && !testimonial) throw new Error(`No testimonial by ${card.quoteBy} in lib/content/site.ts`);
  return { page, testimonial };
}

/**
 * Proof (sector template, part 5): the matching case study as a card with the headline number and a quote. A card is
 * bordered on paper (brand book, Layout: case-study cards), and holds the StatBlock where the case study has a number
 * (its brass marker the screen's one brass use), or its one-line summary in heading-2 where it has none; then the
 * Testimonial, without the one-line result (decision 7), its business name linking the case study as the homepage's
 * testimonials do, named as the homepage names its case-study links (Polish review: a separate forward link under the
 * attribution named the client a second time). A card with no quote keeps a forward link to the case study. Two across
 * from 900px, 24px apart, so the second starts on the page's split line (x 732 at 1440).
 *
 * Phase 2.4 (design-taste-frontend and apple-design, the hover layer): each card is a case-study card, so it answers the
 * pointer as every linked card does, its border to rule-strong over 150ms (Phase 2.7, step 8: nothing moves). The quote cannot sit inside an <a>, so
 * the card's one link is stretched over it by ::after, as the OfferCard's is: the whole card is one target, the link
 * keeps its own name, and its underline thickens while the card is hovered.
 *
 * Phase 2.6: with a photograph (the sector's, lib/content/pages/sectors.ts) and one card, the client's photograph sits
 * beside the card that names it from 720px: the card on seven columns, the photograph on the last five (x 834 at 1440,
 * the page's one split), the card at least as tall as the photograph so the two read as one spread, its link on the
 * foot. Below 720px the card, then the photograph across the column. It is lazy: the proof is far below the first
 * screen.
 *
 * The homepage proof block's "All results" closes the section, so a sector with no proof yet still reaches /results.
 */
export function ProofBlock({
  section,
  headingId,
  id,
  photo,
}: BlockProps & { section: { heading: string; cards: Written<SectorProof[]> }; photo?: Photo }) {
  const { heading, cards } = section;
  const beside = photo && !isStub(cards) && cards.length === 1 ? photo : undefined;
  const list = isStub(cards) ? null : (
    <ul
      className={cn(
        'grid grid-cols-1 gap-space-6',
        beside ? 'min-[720px]:col-span-7' : 'min-[900px]:grid-cols-2 min-[900px]:gap-x-space-6',
      )}
    >
      {cards.map(proofCard).map(({ page, testimonial }) => {
        const { caseStudy, summary } = page;
        return (
          <li
            key={caseStudy.slug}
            className={cn(
              'group relative flex flex-col gap-space-6 rounded-radius-0 border border-rule bg-paper p-space-4',
              linkedCardHover,
            )}
          >
            {caseStudy.stat ? (
              // The card's border is the figure's top rule.
              <StatBlock figure={caseStudy.stat.figure} line={caseStudy.stat.line} rule={false} />
            ) : !isStub(summary) ? (
              <p className="heading-2 max-w-measure">{summary}</p>
            ) : null}
            {/* Phase 3 copy, approved by Dan on 12 Nov 2026: the accessible name, as the homepage's case-study links. */}
            {testimonial ? (
              <Testimonial
                quote={testimonial.quote}
                name={testimonial.name}
                business={testimonial.business}
                businessHref={caseStudy.href}
                businessLinkLabel={`${testimonial.business} case study`}
                stretchLink
                // On the card's foot when the card is stretched to a photograph's height. Stacked from 720 to 899px,
                // the quote runs to the card's right edge, as on the homepage.
                className="mt-auto min-[720px]:max-[899px]:max-w-none"
              />
            ) : (
              <ForwardLink
                link={{ label: caseStudy.title, href: caseStudy.href }}
                aria-label={`${caseStudy.title} case study`}
                className="mt-auto self-start after:absolute after:inset-0 group-hover:decoration-brass-600"
              />
            )}
          </li>
        );
      })}
    </ul>
  );
  return (
    <section aria-labelledby={headingId} id={id} className="min-w-0">
      <SectionHeading heading={heading} headingId={headingId} />
      {list === null ? (
        <Stub />
      ) : beside ? (
        // The list is one grid item, so its single card stretches to the photograph's height.
        <div className="grid grid-cols-1 gap-space-6 min-[720px]:grid-cols-12">
          {list}
          <Photograph photo={beside} sizes={fiveColumnSizes} className="min-[720px]:col-span-5 min-[720px]:col-start-8" />
        </div>
      ) : (
        list
      )}
      <ForwardLink link={proofSection.link} className="mt-space-4" />
    </section>
  );
}

/** How many articles the sector template shows (part 6: "Three articles from the sector's cluster"). */
const ARTICLE_SLOTS = 3;

/**
 * Three articles (sector template, part 6) as InsightCards in its row layout (the sector tag in the eyebrow style, the
 * title in heading-2, three across from 720px). Where the sector has fewer than three written posts, the empty places
 * are InsightCards placeholders holding "Content to follow", so the row keeps its three columns and the gap shows.
 * Every slug is checked against the written posts at build time, so no card links a 404.
 */
export function ArticlesBlock({
  section,
  headingId,
  id,
}: BlockProps & { section: { heading: string; slugs: Written<string[]> } }) {
  const { heading, slugs } = section;
  if (isStub(slugs)) {
    return (
      <section aria-labelledby={headingId} id={id} className="min-w-0">
        <SectionHeading heading={heading} headingId={headingId} />
        <Stub />
      </section>
    );
  }
  const articles = slugs.slice(0, ARTICLE_SLOTS).map((slug) => {
    const post = getInsightPost(slug);
    if (!post) throw new Error(`The sector page links /insights/${slug}, which is not a written post.`);
    return post;
  });
  return (
    <InsightCards
      content={{ heading, articles }}
      layout="row"
      headingId={headingId}
      id={id}
      placeholders={Math.max(0, ARTICLE_SLOTS - articles.length)}
      className="min-w-0"
    />
  );
}
