import * as React from 'react';
import { notFound } from 'next/navigation';

import { OfferCard } from '@/components/brand/OfferCard';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { Testimonial } from '@/components/brand/Testimonial';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { CaseStudyHeader, type CaseStudyTag } from '@/components/site/CaseStudyHeader';
import { CTABand } from '@/components/site/CTABand';
import { InsightCards } from '@/components/site/InsightCards';
import { DashList, Paragraphs } from '@/components/site/PageBlocks';
import { Screen } from '@/components/site/Screen';
import { SectorTiles } from '@/components/site/SectorTiles';
import { getInsightPost } from '@/lib/content/pages/insights';
import { caseStudyPages, caseStudySlugs } from '@/lib/content/pages/results';
import { insights, offers, problemTags, proof, sectors } from '@/lib/content/site';
import { isStub, STUB_LABEL } from '@/lib/content/stub';
import type { ArticleCard, CaseStudyPage, ListSection, TextSection } from '@/lib/content/types';
import { buildMetadata, caseStudyRoute, crumbs } from '@/lib/seo';
import { cn } from '@/lib/utils';

import { filteredResultsHref, sectorValue } from '../_cards';

// /results/[client] (plan, Results: the case study template, one page per client), in the plan's eight parts:
//   1 the headline number and one-line summary, 2 the business: the CaseStudyHeader (H1, business line, StatBlock,
//     sector and problem tags), under the BreadcrumbList trail;
//   3 the problem, 4 what I did, 5 the result, 6 the quote, 7 what's next: the story;
//   8 the offer it demonstrates, the sector page and two related articles; then the closing band.
//
// Part 1 is the StatBlock where the headline has a number. Where it has none (Saverys of Broadway, Licklibrary), the
// one-line summary takes the header's line and part 2 follows as its own section, "The business", so the headline is
// still the first thing under the client's name.
//
// Copy is lib/content/pages/results.ts. The plan writes no case study body, so parts 2 to 5 and 7 show STUB_LABEL until
// they are written (Phase 3 decision 4) and every page is noindex (caseStudyRoute in lib/seo.ts reads `written`). The
// quote is the client's testimonial from lib/content/site.ts, without the one-line result (decision 7); where there is
// none, part 6 is left out rather than stubbed, because a testimonial is never invented. Only the figures the public
// repo rule allows appear (decision 1).
//
// Layout (brand book, one section per screen). The header alone leaves most of a screen empty, and so does part 8, so
// the brand book's rule merges them with the story between: one frame from the top of the page, 1.5 to 2.5 screens
// tall at 1440 by 900 while the parts are stubs. From 900px the story runs down columns 1 to 7 with the quote beside it
// on 9 to 12, level with the first part; with no quote the story takes the container. Part 8 sets the offer and the
// sector on 1 to 6 beside the articles on 7 to 12. Then the closing band. Once a case study is written and runs longer,
// split the frame after "What I did" so each part of it fills a screen.

export const dynamicParams = false;

export function generateStaticParams() {
  return caseStudySlugs.map((slug) => ({ slug }));
}

type Params = { params: { slug: string } };

export function generateMetadata({ params }: Params) {
  return buildMetadata(caseStudyRoute(params.slug));
}

/** Phase 3 draft, pending Dan's approval: the heading over part 8's offer and sector. The eyebrow is the homepage's. */
const fitsDraft = { eyebrow: offers.eyebrow, heading: 'Where this work fits' } as const;

/** The plan's label for part 2 of the template ("The business"), as a heading. */
const BUSINESS_HEADING = 'The business';

/** The story's rows from 900px, for the quote that runs beside all of them. */
const quoteRows: Record<number, string> = {
  4: 'min-[900px]:row-span-4',
  5: 'min-[900px]:row-span-5',
};

function Part({
  id,
  heading,
  className,
  children,
}: {
  id: string;
  heading: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section aria-labelledby={id} className={cn('min-w-0', className)}>
      <SectionHeading heading={heading} headingId={id} />
      {children}
    </section>
  );
}

function TextPart({ id, section, className }: { id: string; section: TextSection; className?: string }) {
  return (
    <Part id={id} heading={section.heading} className={className}>
      <Paragraphs paragraphs={section.paragraphs} />
    </Part>
  );
}

function ListPart({ id, section, className }: { id: string; section: ListSection; className?: string }) {
  return (
    <Part id={id} heading={section.heading} className={className}>
      {section.intro ? <p className="body mb-space-4 max-w-measure">{section.intro}</p> : null}
      {isStub(section.items) ? <p className="body max-w-measure">{STUB_LABEL}</p> : <DashList items={section.items} />}
    </Part>
  );
}

/** The content checks, at build time: every link part 8 makes must name a real page. */
function partEight(page: CaseStudyPage) {
  const { links, caseStudy } = page;
  const offer = isStub(links.offer) ? undefined : offers.offers.find((item) => item.id === links.offer);
  if (!isStub(links.offer) && !offer) throw new Error(`No offer ${links.offer} for ${caseStudy.slug}`);
  const sectorSlug = links.sector ?? caseStudy.sector.slug;
  const sector = sectorSlug ? sectors.sectors.find((item) => item.slug === sectorSlug) : undefined;
  if (sectorSlug && !sector) throw new Error(`No sector ${sectorSlug} for ${caseStudy.slug}`);
  const articles: ArticleCard[] | undefined = isStub(links.articles)
    ? undefined
    : links.articles.map((slug) => {
        const post = getInsightPost(slug);
        if (!post) throw new Error(`${caseStudy.slug} links /insights/${slug}, which is not a written post.`);
        return { slug: post.slug, href: post.href, title: post.title, sectorTag: post.sectorTag };
      });
  return { offer, sector, articles };
}

export default function CaseStudyPage({ params }: Params) {
  const page = caseStudyPages[params.slug];
  if (!page) notFound();
  const { caseStudy } = page;

  const testimonial = page.quoteBy ? proof.testimonials.find((item) => item.name === page.quoteBy) : undefined;
  if (page.quoteBy && !testimonial) throw new Error(`No testimonial by ${page.quoteBy} in lib/content/site.ts`);

  // Parts 1 and 2: see the note at the top.
  const business = isStub(caseStudy.business) ? STUB_LABEL : caseStudy.business;
  const summary = isStub(page.summary) ? STUB_LABEL : page.summary;
  const businessApart = !caseStudy.stat;
  const headerLine = businessApart ? summary : business;

  // The tags link to the sector page where there is one, else to the Results index filtered by the tag.
  const sectorTag: CaseStudyTag = {
    label: caseStudy.sector.label,
    href: caseStudy.sector.slug
      ? sectors.sectors.find((item) => item.slug === caseStudy.sector.slug)?.href
      : filteredResultsHref({ sector: sectorValue(caseStudy.sector) }),
  };
  const problemTagLinks: CaseStudyTag[] = caseStudy.problems.map((problem) => ({
    label: problemTags[problem],
    href: filteredResultsHref({ problem }),
  }));

  const { offer, sector, articles } = partEight(page);

  // The story, parts 2 (when apart) to 7, in the plan's order. From 900px the quote sits beside the parts.
  const storyCount = (businessApart ? 1 : 0) + 4;
  const main = testimonial ? 'min-[900px]:col-span-7 min-[900px]:col-start-1' : undefined;
  const story = (
    <div
      className={cn(
        'grid grid-cols-1 gap-y-space-12',
        testimonial && 'min-[900px]:grid-cols-12 min-[900px]:gap-x-gutter',
      )}
    >
      {businessApart ? (
        <Part id="business-heading" heading={BUSINESS_HEADING} className={main}>
          <p className="body max-w-measure">{business}</p>
        </Part>
      ) : null}
      <TextPart id="problem-heading" section={page.problem} className={main} />
      <ListPart id="what-i-did-heading" section={page.whatIDid} className={main} />
      <TextPart id="result-heading" section={page.result} className={main} />
      {testimonial ? (
        <Testimonial
          quote={testimonial.quote}
          name={testimonial.name}
          business={testimonial.business}
          className={cn(
            'self-start min-[900px]:col-span-4 min-[900px]:col-start-9 min-[900px]:row-start-1',
            quoteRows[storyCount],
          )}
        />
      ) : null}
      <TextPart id="whats-next-heading" section={page.whatsNext} className={main} />
    </div>
  );

  // Part 8.
  const links = (
    <div className="grid grid-cols-1 gap-y-space-12 min-[900px]:grid-cols-12 min-[900px]:gap-x-gutter">
      <section aria-labelledby="fits-heading" className="min-w-0 min-[900px]:col-span-6">
        <SectionHeading eyebrow={fitsDraft.eyebrow} heading={fitsDraft.heading} headingId="fits-heading" />
        <div className="grid grid-cols-1 gap-space-6">
          {offer ? <OfferCard offer={offer} headingLevel="h3" /> : <p className="body max-w-measure">{STUB_LABEL}</p>}
          {sector ? <SectorTiles content={{ sectors: [sector] }} withHeading={false} /> : null}
        </div>
      </section>
      {articles ? (
        <InsightCards
          content={{ eyebrow: insights.eyebrow, heading: insights.heading, articles }}
          headingId="articles-heading"
          className="min-w-0 min-[900px]:col-span-6"
        />
      ) : (
        <section aria-labelledby="articles-heading" className="min-w-0 min-[900px]:col-span-6">
          <SectionHeading eyebrow={insights.eyebrow} heading={insights.heading} headingId="articles-heading" />
          <p className="body max-w-measure">{STUB_LABEL}</p>
        </section>
      )}
    </div>
  );

  return (
    <>
      {/* Parts 1 and 2, the story (3 to 7), then part 8. */}
      <Screen first as="div">
        <div>
          <Breadcrumbs items={crumbs.caseStudy(caseStudy.slug)} className="mb-space-8" />
          <CaseStudyHeader
            title={page.h1}
            business={headerLine}
            stat={caseStudy.stat}
            sector={sectorTag}
            problems={problemTagLinks}
          />
        </div>
        {story}
        {links}
      </Screen>

      <CTABand />
    </>
  );
}
