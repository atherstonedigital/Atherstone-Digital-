import * as React from 'react';

import { ForwardLink, LinkButton } from '@/components/brand/Button';
import { OfferCard } from '@/components/brand/OfferCard';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { StatRow } from '@/components/brand/StatBlock';
import { Testimonial } from '@/components/brand/Testimonial';
import { AboutStrip } from '@/components/site/AboutStrip';
import { Chart } from '@/components/site/Chart';
import { ComparisonTable } from '@/components/site/ComparisonTable';
import { ContactForm } from '@/components/site/ContactForm';
import { Hero } from '@/components/site/Hero';
import { InsightCards } from '@/components/site/InsightCards';
import { LeadMagnet } from '@/components/site/LeadMagnet';
import { ProblemCards } from '@/components/site/ProblemCards';
import { Screen, container } from '@/components/site/Screen';
import { SectorTiles } from '@/components/site/SectorTiles';
import { Steps } from '@/components/site/Steps';
import { getInsightPost } from '@/lib/content/pages/insights';
import { caseStudyPages } from '@/lib/content/pages/results';
import { proofData } from '@/lib/content/proof-data';
import {
  comparison,
  contactSection,
  hero,
  howItWorks,
  insights,
  meetDan,
  offers,
  problems,
  proof,
  sectorTileLines,
  sectors,
} from '@/lib/content/site';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

import { CatalogueScreenshot } from './_home/CatalogueScreenshot';
import { ShowroomPhoto } from './_home/ShowroomPhoto';

// The homepage (plan, Homepage): the eleven sections in the plan's numbered order, built from the Phase 2 components
// with copy from lib/content/site.ts. Plan sections 9 (Insights) and 10 (the scorecard) share a section, the scorecard
// as a raised panel beside the articles, as Phase 1 set them.
//
// Phase 2.4 (section C) and Phase 2.5, with the skill that enforces each:
//   - Rhythm (design-taste-frontend, as the owner's brief sets it): every section is its content plus space-16 above and
//     below (space-12 below 720px), at least 60dvh, no maximum (components/site/Screen.tsx); the hero fills 100dvh less
//     the nav. Every section is a <section> in <main> holding one .wrap on the container's lines. Every two-column
//     split starts its right column on one line, column 7 of twelve with a 24px gap (x 732 at 1440), the left column
//     ending 24px before it, both columns top-aligned and text on the left.
//   - Proof (brand book): the three StatBlocks in the order lib/content/proof-data.ts gives them, its quieter line
//     beneath, then the revenue chart across the container, each rendered only when the data has it. next.config.mjs
//     swaps in the gitignored proof-data.private.ts when it exists, so a local build shows the full proof and a build
//     from git shows the three public figures with no quieter line and no chart, which reads complete on its own.
//   - Texture (brand book, with the owner's brief): exactly three changes of ground. The problems are a full-bleed
//     green band (the one exception to "nothing else is filled green", approved in the brief); How it works gains the
//     Canwell showroom photograph; Gary's testimonial gains the Xshowhome catalogue screenshot, or its stand-in. The
//     contact band stays green.
//   - Spacing (ui-ux-pro-max): heading block to content space-8, list rows space-4 apart, card padding space-4, body
//     copy at measure, heights in dvh.
//
// The root layout writes the Organization JSON-LD; the homepage needs no other schema (plan, Structured data).

export const metadata = buildMetadata('/');

// ------------------------------------------------------------------ layout

/** The inner flow of a homepage section: one column, every gap set by the parts themselves. */
const flow = 'gap-0 min-[720px]:gap-0';

/**
 * A two-column split from 900px: two halves 24px apart, so the right one starts on the page's one split line (x 732 at
 * 1440, column 7 of twelve on the kit's 24px grid) and the left one ends 24px before it. Top-aligned. Stacked below
 * 900px, text first.
 */
const split = 'grid grid-cols-1 gap-space-8 min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-x-space-6';

// ------------------------------------------------------------------ content checks, at build time

/**
 * The three case studies the homepage links (plan, Internal linking rules), one for each testimonial: each quote's
 * business name links its case study, as Phase 1 linked them (Testimonial's businessHref), and All results follows
 * the quotes. Each link is named "<business> case study" for screen readers, the visible words first. Every target
 * must be a case study page, so the export never ships a link to a missing route.
 */
const testimonials = proof.testimonials.map((testimonial) => {
  const slug = testimonial.href?.replace(/^\/results\//, '');
  if (!testimonial.href || !slug || !caseStudyPages[slug]) {
    throw new Error(`No case study page for ${testimonial.business} (${testimonial.href ?? 'no href'}).`);
  }
  // Phase 3 draft, pending Dan's approval: the accessible name.
  return { ...testimonial, href: testimonial.href, linkLabel: `${testimonial.business} case study` };
});

/** Gary first (he is the sector buyer), beside the catalogue screenshot; the other two follow in two columns. */
const [leadTestimonial, ...otherTestimonials] = testimonials;
if (!leadTestimonial) throw new Error('The proof block needs at least one testimonial in lib/content/site.ts.');

/** A testimonial's props as the proof block sets them: the quote, the name, and the business linking its case study. */
function testimonialProps(testimonial: (typeof testimonials)[number]) {
  return {
    quote: testimonial.quote,
    name: testimonial.name,
    business: testimonial.business,
    businessHref: testimonial.href,
    businessLinkLabel: testimonial.linkLabel,
  };
}

/** The five sector tiles, each with its one line (Phase 2.5, step 3). Every sector must have its line. */
const sectorTiles = sectors.sectors.map((sector) => {
  const tileLine = sectorTileLines[sector.slug];
  if (!tileLine) throw new Error(`No tile line for the ${sector.slug} sector in lib/content/site.ts.`);
  return { slug: sector.slug, href: sector.href, tileLabel: sector.tileLabel, tileLine };
});

/** The three articles (plan, Homepage 9), each checked against the written posts, so no card links to a 404. */
const articles = insights.articles.map((article) => {
  if (!getInsightPost(article.slug)) {
    throw new Error(`The homepage links /insights/${article.slug}, which is not a written post.`);
  }
  return article;
});

// ------------------------------------------------------------------ the page

export default function HomePage() {
  const { figures, quieterLine, chart } = proofData;
  return (
    <>
      {/* 1 Hero: fills the first screen below the nav, its primary button and the fact line inside it. The section
          runs full width and holds the one .wrap. */}
      <Hero id="hero" content={hero} headingId="hero-heading" wrapClassName={container} />

      {/* 2 Proof, directly under the hero: the heading, the three figures, the quieter line and the revenue chart (the
          last two only where the data has them), then Gary beside the catalogue screenshot, Gemma and Luke in two
          columns, and All results. Each business name links its case study. */}
      <Screen id="numbers" labelledBy="numbers-heading" innerClassName={flow}>
        <SectionHeading heading={proof.heading} headingId="numbers-heading" />
        {/* The row sits straight under the heading's hairline, which serves as its top rule. */}
        <StatRow stats={figures} rule={false} />
        {/* The quieter line (brand book, Colour: ink-muted, in small): the small print under the figures. */}
        {quieterLine ? (
          <small className="small mt-space-6 block max-w-measure text-ink-muted">{quieterLine}</small>
        ) : null}
        {chart ? (
          <Chart
            type="bar"
            orientation="vertical"
            // The value labels sit on the plot above their gridlines, so the plot runs line to line.
            axis="inline"
            data={chart.data}
            title={chart.title}
            titleAs="h3"
            titleStyle="heading-2"
            source={chart.source}
            categoryLabel="Month"
            valueLabel="Online store revenue"
            format={{ prefix: '£', notation: 'short' }}
            values="emphasis"
            className="mt-space-12"
          />
        ) : null}
        {/* Gary's quote on the left half, the screenshot on the right half, on the page's one split line (x 732 at 1440),
            as Luke's quote below it and every split on the page (Polish review: on seven and five columns the
            screenshot started 102px right of Luke's quote). The quote opens on its hairline; from 900px the frame's own
            rule border is its top edge, level with that hairline. Stacked below 900px, the quote first. */}
        <div
          className={cn(
            'mt-space-12 grid grid-cols-1 gap-space-8',
            'min-[900px]:grid-cols-12 min-[900px]:items-start min-[900px]:gap-x-space-6',
          )}
        >
          <Testimonial
            {...testimonialProps(leadTestimonial)}
            // Stacked below 900px, the quote runs to the container's right line, as in Phase 1.
            className="max-w-none min-[900px]:col-span-6"
          />
          <CatalogueScreenshot className="min-[900px]:col-span-6 min-[900px]:col-start-7" />
        </div>
        <div className="mt-space-8 grid grid-cols-1 gap-space-8 min-[900px]:grid-cols-2 min-[900px]:gap-x-space-6">
          {otherTestimonials.map((testimonial) => (
            <Testimonial
              key={testimonial.name}
              {...testimonialProps(testimonial)}
              // Stacked below 900px, each quote runs to the container's right line, as in Phase 1.
              className="max-[899px]:max-w-none"
            />
          ))}
        </div>
        <ForwardLink link={proof.link} className="mt-space-6 justify-self-start" />
      </Screen>

      {/* 3 Sound familiar? The first change of ground: the full-bleed green band, the five problems as a two-column
          list parted by on-green rules. */}
      <Screen id="problems" labelledBy="problems-heading" ground="band" innerClassName={flow}>
        <ProblemCards as="div" variant="band" content={problems} headingId="problems-heading" />
      </Screen>

      {/* 4 What I do: the three offers, the Health Check highlighted, one primary button under the row. No rule above:
          the band's edge parts it from the problems. */}
      <Screen id="services" labelledBy="services-heading" rule={false} innerClassName={flow}>
        <SectionHeading
          eyebrow={offers.eyebrow}
          heading={offers.heading}
          headingId="services-heading"
        />
        <ul className="grid grid-cols-1 gap-space-6 min-[720px]:grid-cols-3">
          {offers.offers.map((offer) => (
            <OfferCard key={offer.id} as="li" offer={offer} />
          ))}
        </ul>
        <LinkButton link={offers.cta} className="mt-space-8 justify-self-start max-[719px]:justify-self-stretch" />
      </Screen>

      {/* 5 Agency, in-house, or a director. The table is its own labelled section, so the frame takes no label. */}
      <Screen id="comparison" innerClassName={flow}>
        <ComparisonTable content={comparison} headingId="comparison-heading" />
      </Screen>

      {/* 6 How it works: the four steps on the left half, the Canwell showroom on the right (the second change of
          ground: a real photograph). */}
      <Screen id="how-it-works" labelledBy="how-it-works-heading" innerClassName={flow}>
        <Steps as="div" content={howItWorks} headingId="how-it-works-heading" aside={<ShowroomPhoto />} />
      </Screen>

      {/* 7 Sectors: all five, as the plan's nav lists them (decision 3), in one row of five from 1200px, each with its
          one line. */}
      <Screen id="sectors" labelledBy="sectors-heading" innerClassName={flow}>
        <SectorTiles
          as="div"
          layout="row"
          content={{ eyebrow: sectors.eyebrow, heading: sectors.heading, sectors: sectorTiles }}
          headingId="sectors-heading"
        />
      </Screen>

      {/* 8 Meet Dan: the strip is its own labelled section. Its columns meet on the page's split line (24px apart). */}
      <Screen id="about" innerClassName={flow}>
        <AboutStrip content={meetDan} headingId="about-heading" className="min-[720px]:gap-x-space-6" />
      </Screen>

      {/* 9 Insights and 10 the scorecard: the articles on the left half, the scorecard's raised panel on the right from
          900px; on a phone the panel follows the articles. */}
      <Screen id="insights" labelledBy="insights-heading" innerClassName={flow}>
        <div className={split}>
          <div>
            <SectionHeading
              eyebrow={insights.eyebrow}
              heading={insights.heading}
              headingId="insights-heading"
            />
            <InsightCards content={{ articles }} withHeading={false} headingLevel="h2" />
          </div>
          <LeadMagnet headingId="scorecard-heading" />
        </div>
      </Screen>

      {/* 11 Contact: the green band, the brief form on its raised panel on the right half from 900px, on the page's one
          split line as every split is. In a half below 1200px the form sets its fields one under another (its own
          container queries), so no select is squeezed. */}
      <Screen id="contact" labelledBy="contact-heading" ground="band" innerClassName={flow}>
        <div className={split}>
          <div>
            <SectionHeading
              ground="band"
              eyebrow={contactSection.eyebrow}
              heading={contactSection.heading}
              headingId="contact-heading"
            />
            <p className="body-lg max-w-measure-lg">{contactSection.intro}</p>
          </div>
          <ContactForm ground="band" labelledBy="contact-heading" />
        </div>
      </Screen>
    </>
  );
}
