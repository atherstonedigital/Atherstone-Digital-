import * as React from 'react';

import { ForwardLink, LinkButton } from '@/components/brand/Button';
import { OfferCard } from '@/components/brand/OfferCard';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { StatRow, type StatRowItems } from '@/components/brand/StatBlock';
import { Testimonial } from '@/components/brand/Testimonial';
import { AboutStrip } from '@/components/site/AboutStrip';
import { ComparisonTable } from '@/components/site/ComparisonTable';
import { ContactForm } from '@/components/site/ContactForm';
import { Hero } from '@/components/site/Hero';
import { InsightCards } from '@/components/site/InsightCards';
import { LeadMagnet } from '@/components/site/LeadMagnet';
import { ProblemCards } from '@/components/site/ProblemCards';
import { SectorTiles } from '@/components/site/SectorTiles';
import { Steps } from '@/components/site/Steps';
import { getInsightPost } from '@/lib/content/pages/insights';
import { caseStudyPages } from '@/lib/content/pages/results';
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
  sectors,
} from '@/lib/content/site';
import type { ProofFigure } from '@/lib/content/types';
import { buildMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

// The homepage (plan, Homepage): the eleven sections in the plan's numbered order, built from the Phase 2 components
// with copy from lib/content/site.ts, on the Phase 1 reference homepage's layout. Plan sections 9 (Insights) and 10
// (the scorecard) share one screen, the scorecard as a raised panel beside the articles, as Phase 1 set them.
//
// Phase 3 decision 2: the proof block shows the three public figures (16,193, 120+ hours, £250k) with their lines and
// no hero chart. The plan's quieter line under the figures is left out: its other figures need the client's written
// permission, and its two public ones are now figures in the row.
//
// One section per screen (brand book, Layout). Each section below the hero is one or two screens tall from 720px and
// one to three on a phone, as Phase 1 measured them. A screen's top padding is the nav's height plus the section gap,
// because the fixed nav covers the top of each screen as the page scrolls; the bottom padding is the section gap. On a
// phone the spare height of a section goes between parts that already stand apart (cards, rows, steps, tiles), never
// between a heading and its content (Phase 1).
//
// The root layout writes the Organization JSON-LD; the homepage needs no other schema (plan, Structured data).

export const metadata = buildMetadata('/');

// ------------------------------------------------------------------ layout

/** The container: 1200px at most, inside the side gutter (the CTABand's rule). */
const container = 'mx-auto w-[min(100%_-_2_*_var(--gutter),var(--container))]';

/** A child that takes the rest of its screen frame, so spare height can be shared out inside it. */
const fill = 'flex flex-[1_0_auto] flex-col';

/** How many screens tall a section is on a phone, then from 720px (Phase 1's --hm and --h). */
const phoneScreens = { 1: '[--screens:1]', 2: '[--screens:2]', 3: '[--screens:3]' } as const;
const deskScreens = { 1: 'min-[720px]:[--screens:1]', 2: 'min-[720px]:[--screens:2]' } as const;

/**
 * A group that fills the first screen's content area; whatever follows opens at the next screen's top padding, like
 * any other section (Phase 1's .scr-d and .scr-m). Below 900px, from 900px, and on a phone only.
 */
const screenBelow900 = cn(
  'max-[899px]:min-h-[calc(100vh_-_var(--pad-t)_-_var(--pad-b))] max-[899px]:supports-[height:100dvh]:min-h-[calc(100dvh_-_var(--pad-t)_-_var(--pad-b))]',
  'max-[899px]:mb-[calc(var(--pad-t)_+_var(--pad-b))]',
);
const screenFrom900 = cn(
  'min-[900px]:min-h-[calc(100vh_-_var(--pad-t)_-_var(--pad-b))] min-[900px]:supports-[height:100dvh]:min-h-[calc(100dvh_-_var(--pad-t)_-_var(--pad-b))]',
  'min-[900px]:mb-[calc(var(--pad-t)_+_var(--pad-b))]',
);
const firstScreenOnPhone = cn(
  'max-[719px]:min-h-[calc(100vh_-_var(--pad-t)_-_var(--pad-b))] max-[719px]:supports-[height:100dvh]:min-h-[calc(100dvh_-_var(--pad-t)_-_var(--pad-b))]',
  // The split's row gap (space-6) already stands between this group and the next.
  'max-[719px]:mb-[calc(var(--pad-t)_+_var(--pad-b)_-_var(--space-6))]',
);

/** Two columns from 900px (brand book: at most two), one below, space-6 apart (Phase 1's .split). */
const split = 'grid grid-cols-1 gap-space-6 min-[900px]:grid-cols-12 min-[900px]:items-start min-[900px]:gap-x-gutter';

interface ScreenProps {
  id: string;
  phone: keyof typeof phoneScreens;
  desk: keyof typeof deskScreens;
  /**
   * section when this page composes the section and its heading; div when a component renders its own labelled
   * section inside the frame.
   */
  as?: 'section' | 'div';
  /** The heading's id, for a section's aria-labelledby. */
  labelledBy?: string;
  /** The green band (brand book, Colour: the contact section at the foot of the page). */
  band?: boolean;
  children: React.ReactNode;
}

/**
 * One section's frame: full width, divided from the one above by a full-width rule (or set on the band), padded as a
 * screen, and as tall as its screens; the container inside it takes the rest of the frame's height.
 */
function Screen({ id, phone, desk, as: Tag = 'div', labelledBy, band = false, children }: ScreenProps) {
  return (
    <Tag
      id={id}
      aria-labelledby={Tag === 'section' ? labelledBy : undefined}
      className={cn(
        'relative flex flex-col',
        // Top padding: the nav's height plus space-12 on a phone and space-16 from 1200px; bottom: the section gap.
        '[--pad-b:var(--space-12)] [--pad-t:calc(var(--nav-height)_+_var(--space-12))]',
        'min-[1200px]:[--pad-b:var(--space-16)] min-[1200px]:[--pad-t:calc(var(--nav-height)_+_var(--space-16))]',
        'pb-[var(--pad-b)] pt-[var(--pad-t)]',
        phoneScreens[phone],
        deskScreens[desk],
        'min-h-[calc(var(--screens)*100vh)] supports-[height:100dvh]:min-h-[calc(var(--screens)*100dvh)]',
        band ? 'bg-band text-on-band' : 'border-t border-rule text-ink',
      )}
    >
      <div className={cn(container, fill)}>{children}</div>
    </Tag>
  );
}

// ------------------------------------------------------------------ content checks, at build time

/** The StatRow takes one to three figures, never four (StatBlock README). */
function toStatRow(figures: ProofFigure[]): StatRowItems {
  const [first, second, third] = figures;
  if (figures.length === 3) return [first, second, third];
  if (figures.length === 2) return [first, second];
  if (figures.length === 1) return [first];
  throw new Error(`The proof block takes one to three figures; lib/content/site.ts has ${figures.length}.`);
}

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

/** Gary first (he is the sector buyer): his quote shares the figures' screen from 900px; the other two follow. */
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

/** The three articles (plan, Homepage 9), each checked against the written posts, so no card links to a 404. */
const articles = insights.articles.map((article) => {
  if (!getInsightPost(article.slug)) {
    throw new Error(`The homepage links /insights/${article.slug}, which is not a written post.`);
  }
  return article;
});

// ------------------------------------------------------------------ the page

export default function HomePage() {
  return (
    <>
      {/* 1 Hero: fills the first screen below the nav, its primary button and the fact line inside it. No chart. */}
      <Hero id="hero" content={hero} headingId="hero-heading" className={container} />

      {/* 2 Proof, directly under the hero. Two screens from 720px. From 900px: the heading, the figures and Gary's
          quote across columns 1 to 7, then Gemma and Luke in two columns and All results (Phase 3 review: with the
          quieter line gone, the figures alone left the first screen two thirds empty). From 720 to 899px: the heading
          and the figures, then the three quotes stacked and All results. Three on a phone: the figures, then Gary,
          then Gemma, Luke and All results at the foot of the third. Each business name links its case study. */}
      <Screen id="numbers" as="section" labelledBy="numbers-heading" phone={3} desk={2}>
        {/* The first screen's group from 900px; below 900px it steps aside (display: contents), so the figures group
            inside it fills the first screen and Gary opens the next, as the rest of the quotes do. */}
        <div className={cn('max-[899px]:contents', screenFrom900)}>
          <div className={screenBelow900}>
            <SectionHeading heading={proof.heading} headingId="numbers-heading" alignWithEyebrow />
            {/* The row sits straight under the heading's hairline, which serves as its top rule. */}
            <StatRow stats={toStatRow(proof.figures)} rule={false} />
          </div>
          {/* Decision 7: no result line until the lines are signed off. */}
          <Testimonial
            {...testimonialProps(leadTestimonial)}
            className={cn(
              // Stacked from 720 to 899px, each quote runs to the container's right line, as in Phase 1.
              'max-[899px]:mb-space-8 min-[720px]:max-[899px]:max-w-none',
              // From 900px, under the figures across columns 1 to 7 of the twelve.
              'min-[900px]:mt-space-12 min-[900px]:w-[calc((100%_-_11_*_var(--gutter))_*_7_/_12_+_6_*_var(--gutter))] min-[900px]:max-w-none',
            )}
          />
        </div>
        <div
          className={cn(
            'grid grid-cols-1 gap-space-8 min-[900px]:grid-cols-2 min-[900px]:gap-x-gutter',
            'max-[719px]:flex max-[719px]:flex-[1_0_auto] max-[719px]:flex-col max-[719px]:[&>:first-child]:mt-auto',
          )}
        >
          {otherTestimonials.map((testimonial) => (
            <Testimonial
              key={testimonial.name}
              {...testimonialProps(testimonial)}
              // Stacked from 720 to 899px, each quote runs to the container's right line, as in Phase 1.
              className="min-[720px]:max-[899px]:max-w-none"
            />
          ))}
        </div>
        <ForwardLink link={proof.link} className="mt-space-6 self-start" />
      </Screen>

      {/* 3 Sound familiar? */}
      <Screen id="problems" phone={2} desk={1}>
        <ProblemCards
          content={problems}
          headingId="problems-heading"
          className={cn(fill, 'max-[719px]:[&>ul]:flex-[1_0_auto] max-[719px]:[&>ul]:content-between')}
        />
      </Screen>

      {/* 4 What I do: the three offers, the Health Check highlighted, one primary button under the row. */}
      <Screen id="services" as="section" labelledBy="services-heading" phone={2} desk={1}>
        <SectionHeading eyebrow={offers.eyebrow} heading={offers.heading} headingId="services-heading" />
        <ul
          className={cn(
            'mb-space-8 grid grid-cols-1 gap-space-6 min-[720px]:grid-cols-3',
            // Portrait tablets (820 by 1180): one column fills the screen better than three narrow cards (Phase 1).
            '[@media(min-width:720px)_and_(max-width:899px)_and_(min-height:1100px)]:grid-cols-1',
            'max-[719px]:flex-[1_0_auto] max-[719px]:content-between',
          )}
        >
          {offers.offers.map((offer) => (
            <OfferCard key={offer.id} as="li" offer={offer} />
          ))}
        </ul>
        <LinkButton link={offers.cta} className="self-start max-[719px]:self-stretch" />
      </Screen>

      {/* 5 Agency, in-house, or a director */}
      <Screen id="comparison" phone={2} desk={1}>
        <ComparisonTable
          content={comparison}
          headingId="comparison-heading"
          className={cn(fill, 'max-[719px]:[&>div:last-of-type]:flex-[1_0_auto] max-[719px]:[&_td]:flex-[1_0_auto]')}
        />
      </Screen>

      {/* 6 How it works */}
      <Screen id="how-it-works" phone={1} desk={1}>
        <Steps
          content={howItWorks}
          headingId="how-it-works-heading"
          className={cn(fill, 'max-[719px]:[&>ol]:flex-[1_0_auto]')}
        />
      </Screen>

      {/* 7 Sectors: all five, as the plan's nav lists them (decision 3). */}
      <Screen id="sectors" phone={1} desk={1}>
        <SectorTiles
          content={sectors}
          headingId="sectors-heading"
          className={cn(fill, 'max-[719px]:[&>ul]:flex-[1_0_auto]')}
        />
      </Screen>

      {/* 8 Meet Dan. On a phone the bio and credentials take the first screen and the portrait and link open the
          second (Phase 1). The strip's rows are heading and bio, credentials, portrait, link; the credentials row takes
          the spare height, and the strip is one screen plus the portrait (square, the container's width) plus the
          link (space-6 above a 44px target) tall, so the portrait starts one screen below the strip's top. Where the
          bio and credentials need more than a screen, the row grows and the portrait follows them. The section ends at
          the link, not at a second full screen (Phase 3 review: that left a 429px gap before Insights at 390). */}
      <Screen id="about" phone={1} desk={1}>
        <AboutStrip
          content={meetDan}
          headingId="about-heading"
          className={cn(
            'max-[719px]:grid-rows-[auto_1fr_auto_auto]',
            'max-[719px]:min-h-[calc(100vh_+_100vw_-_2_*_var(--gutter)_+_var(--space-6)_+_var(--touch-target))]',
            'max-[719px]:supports-[height:100dvh]:min-h-[calc(100dvh_+_100vw_-_2_*_var(--gutter)_+_var(--space-6)_+_var(--touch-target))]',
          )}
        />
      </Screen>

      {/* 9 Insights and 10 the scorecard: the articles on the left, the scorecard's raised panel on the right from
          900px. On a phone the articles fill the first screen and the panel opens the second; the section then ends
          at the panel's foot, not at a second full screen (Phase 3 review: that left a 337px blank band at 390). */}
      <Screen id="insights" as="section" labelledBy="insights-heading" phone={1} desk={1}>
        <div className={split}>
          <div className={cn('min-[900px]:col-span-6', firstScreenOnPhone)}>
            <SectionHeading eyebrow={insights.eyebrow} heading={insights.heading} headingId="insights-heading" />
            <InsightCards content={{ articles }} withHeading={false} headingLevel="h2" />
          </div>
          <LeadMagnet headingId="scorecard-heading" className="min-[900px]:col-span-6 min-[900px]:col-start-7" />
        </div>
      </Screen>

      {/* 11 Contact: the green band, the brief form on its raised panel. From 900 to 1199px the form takes seven
          columns, so the three selects read "Choose one" in full (Phase 1). On a phone it is as tall as the form
          needs, at least one screen (Phase 3 review: a two-screen frame left a 313px blank band at 390). */}
      <Screen id="contact" as="section" labelledBy="contact-heading" band phone={1} desk={1}>
        <div className={split}>
          <div className="min-[900px]:col-span-6 min-[900px]:max-[1199px]:col-span-5">
            <SectionHeading
              ground="band"
              eyebrow={contactSection.eyebrow}
              heading={contactSection.heading}
              headingId="contact-heading"
            />
            <p className="body-lg max-w-measure-lg">{contactSection.intro}</p>
          </div>
          <ContactForm
            ground="band"
            labelledBy="contact-heading"
            className={cn(
              'min-[900px]:col-span-6 min-[900px]:col-start-7',
              'min-[900px]:max-[1199px]:col-span-7 min-[900px]:max-[1199px]:col-start-6',
            )}
          />
        </div>
      </Screen>
    </>
  );
}
