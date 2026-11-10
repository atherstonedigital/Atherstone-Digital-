import * as React from 'react';

import { linkedCardClasses } from '@/components/brand/LinkedCard';
import { StatBlock } from '@/components/brand/StatBlock';
import { AboutStrip } from '@/components/site/AboutStrip';
import { ArticleHeader, readingMinutes } from '@/components/site/ArticleHeader';
import { CaseStudyHeader } from '@/components/site/CaseStudyHeader';
import { ComparisonTable } from '@/components/site/ComparisonTable';
import { Hero } from '@/components/site/Hero';
import { InsightCards } from '@/components/site/InsightCards';
import { ProblemCards } from '@/components/site/ProblemCards';
import { SectorTiles } from '@/components/site/SectorTiles';
import { Steps } from '@/components/site/Steps';
import {
  comparison,
  hero,
  howItWorks,
  insights,
  meetDan,
  problemTags,
  problems,
  proof,
  sectors,
} from '@/lib/content/site';
import { cn } from '@/lib/utils';

// The sections group on the design-system page: Hero, ProblemCards, ComparisonTable, Steps, the dash list,
// SectorTiles, AboutStrip, InsightCards, CaseStudyHeader and ArticleHeader, each variant and state under a label, with content from
// lib/content/site.ts. The page supplies the container and the theme switch.
//
// Layouts follow the window width: resize to walk 320, 390, 720, 900 and 1200 (the comparison table stacks below 720px,
// the problem, step and Meet Dan grids open at 720 and 900px). Hover and focus are live on every link and linked card;
// the "held" samples keep one state still with the classes the live state applies. The hero's entrance runs once per
// load: reload to see it, or turn on reduced motion to see that it never hides anything.

function Label({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-space-3 text-ink-muted">{children}</p>;
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-space-8 border-t border-rule pt-space-8">
      <h3 className="heading-2 text-ink">{title}</h3>
      {children}
    </div>
  );
}

function Sample({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('min-w-0', className)}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

const focusRing = 'outline outline-2 outline-offset-2 outline-focus';

/** A linked card held in one state: the card's classes plus what the state applies, out of the tab order. */
function HeldCard({ className, children }: { className: string; children: React.ReactNode }) {
  return (
    <div aria-hidden="true" className={cn(linkedCardClasses, className)}>
      {children}
    </div>
  );
}

// Content for the two page headers. Both pages are Phase 3 templates with no content in lib/content/site.ts yet, so
// the samples are built from what it has; the extra lines are marked.
const xshowhome = proof.testimonials.find((testimonial) => testimonial.business === 'Xshowhome') ?? proof.testimonials[1];
const catalogueFigure = proof.figures.find((figure) => figure.figure === '16,193') ?? proof.figures[0];
const furniture = sectors.sectors.find((sector) => sector.slug === 'furniture-retailers') ?? sectors.sectors[0];
const firstArticle = insights.articles[0];

/**
 * Demo drafts, not approved copy. The business line is drawn from the live site's /results page (already public);
 * the problem tags are two of the Results filters (plan, /results), matching the plan's Xshowhome headline ("catalogue,
 * feeds, Meta and Google").
 */
const caseStudyDraft = {
  business: 'A multi-showroom ex-showhome furniture retailer across Warwickshire and the Midlands, selling on Shopify.',
  problems: (['catalogue', 'feeds'] as const).map((tag) => ({ label: problemTags[tag] })),
};

/**
 * The plan's "A good fit" list for the ecommerce director page, verbatim, as the list sample. The page is a Phase 3
 * template, so the list is not in lib/content/site.ts yet; it moves there with the page.
 */
const goodFitSample = {
  lead: 'A good fit:',
  items: [
    'you have a showroom and a website and want them to work as one business',
    'you’re spending on ads and can’t see what they return',
    'your catalogue is in the thousands and you know some of it is wrong',
    'you want one accountable person, not a roster of suppliers',
  ],
};

/** Sample values: no article is written yet. The plan's articles run 900 to 1,400 words. */
const articleSample = { published: '2026-11-16', minutes: readingMinutes(1150) };

export default function SectionsSection() {
  return (
    <div className="grid grid-cols-1 gap-space-16 text-ink">
      {/* ------------------------------------------------------------------ Hero */}
      <Group title="Hero">
        <Sample label="Hero, first screen, with the entrance (reload to replay; none under reduced motion)">
          <Hero content={hero} headingLevel="h2" />
        </Sample>
        <Sample label="Hero, as tall as its copy, at rest (fill and animate off)">
          <Hero content={hero} headingLevel="h2" fill={false} animate={false} />
        </Sample>
        <Sample label="Hero, aside slot from 720px (filled with a public StatBlock; Phase 1's chart waits for permission)">
          <Hero
            content={hero}
            headingLevel="h2"
            fill={false}
            animate={false}
            aside={<StatBlock figure={catalogueFigure.figure} line={catalogueFigure.line} />}
          />
        </Sample>
      </Group>

      {/* ------------------------------------------------------------------ ProblemCards */}
      <Group title="ProblemCards">
        <Sample label="ProblemCards, with its SectionHeading (title on columns 1 to 5 of the card from 900px)">
          <ProblemCards content={problems} headingLevel="h3" />
        </Sample>
        <Sample label="ProblemCards, cards only (a page that sets its own heading)">
          <ProblemCards content={{ items: problems.items.slice(0, 2) }} withHeading={false} headingLevel="h3" />
        </Sample>
      </Group>

      {/* ------------------------------------------------------------------ ComparisonTable */}
      <Group title="ComparisonTable">
        <Sample label="ComparisonTable, with note and link (stacks by option below 720px)">
          <ComparisonTable content={comparison} headingLevel="h3" />
        </Sample>
        <Sample label="ComparisonTable, table only">
          <ComparisonTable
            content={{ ...comparison, note: undefined, link: undefined }}
            withHeading={false}
            headingLevel="h3"
          />
        </Sample>
      </Group>

      {/* ------------------------------------------------------------------ Steps */}
      <Group title="Steps">
        <Sample label="Steps, How it works (no eyebrow: the heading lines up with eyebrowed ones)">
          <Steps content={howItWorks} headingLevel="h3" />
        </Sample>
      </Group>

      {/* ------------------------------------------------------------------ List */}
      <Group title="List">
        <Sample label="List, dash bullets (the list-dash class: a 1px rule dash, not a disc)">
          <p className="body mb-space-3 max-w-measure text-ink">{goodFitSample.lead}</p>
          <ul className="list-dash body max-w-measure text-ink">
            {goodFitSample.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Sample>
      </Group>

      {/* ------------------------------------------------------------------ SectorTiles */}
      <Group title="SectorTiles">
        <Sample label="SectorTiles, all five sectors (two are on hold in the plan)">
          <SectorTiles content={sectors} headingLevel="h3" />
        </Sample>
        <Sample label="SectorTiles, launch sectors only (status launch)">
          <SectorTiles
            content={{ ...sectors, sectors: sectors.sectors.filter((sector) => sector.status === 'launch') }}
            withHeading={false}
          />
        </Sample>
        <div className="grid grid-cols-1 gap-space-6 min-[720px]:grid-cols-2">
          <Sample label="Linked card, hover (2px lift, border ink, no shadow)">
            <HeldCard className="flex min-h-[calc(var(--space-16)+var(--space-2))] -translate-y-[2px] items-center border-ink">
              <span className="heading-2">{furniture.tileLabel}</span>
            </HeldCard>
          </Sample>
          <Sample label="Linked card, focus">
            <HeldCard className={cn('flex min-h-[calc(var(--space-16)+var(--space-2))] items-center', focusRing)}>
              <span className="heading-2">{furniture.tileLabel}</span>
            </HeldCard>
          </Sample>
        </div>
      </Group>

      {/* ------------------------------------------------------------------ AboutStrip */}
      <Group title="AboutStrip">
        <Sample label="AboutStrip, Meet Dan (portrait cropped square from the current photograph)">
          <AboutStrip content={meetDan} headingLevel="h3" />
        </Sample>
      </Group>

      {/* ------------------------------------------------------------------ InsightCards */}
      <Group title="InsightCards">
        <div className="grid grid-cols-1 gap-x-gutter gap-y-space-12 min-[900px]:grid-cols-2">
          <Sample label="InsightCards, stacked with its SectionHeading (homepage, beside the scorecard)">
            <InsightCards content={insights} headingLevel="h3" />
          </Sample>
          <div className="grid grid-cols-1 content-start gap-space-6">
            <Sample label="Article card, hover">
              <HeldCard className="grid -translate-y-[2px] gap-y-space-2 border-ink">
                <span className="eyebrow text-ink-muted">{firstArticle.sectorTag}</span>
                <span className="heading-2">{firstArticle.title}</span>
              </HeldCard>
            </Sample>
            <Sample label="Article card, focus">
              <HeldCard className={cn('grid gap-y-space-2', focusRing)}>
                <span className="eyebrow text-ink-muted">{firstArticle.sectorTag}</span>
                <span className="heading-2">{firstArticle.title}</span>
              </HeldCard>
            </Sample>
          </div>
        </div>
        <Sample label="InsightCards, row of three, cards only (a sector page's articles)">
          <InsightCards content={insights} layout="row" withHeading={false} headingLevel="h3" />
        </Sample>
      </Group>

      {/* ------------------------------------------------------------------ CaseStudyHeader */}
      <Group title="CaseStudyHeader">
        <Sample label="CaseStudyHeader, Xshowhome (business line and tags are demo drafts)">
          <CaseStudyHeader
            headingLevel="h2"
            title={xshowhome.business}
            business={caseStudyDraft.business}
            stat={catalogueFigure}
            sector={{ label: furniture.tag, href: furniture.href }}
            problems={caseStudyDraft.problems}
          />
        </Sample>
      </Group>

      {/* ------------------------------------------------------------------ ArticleHeader */}
      <Group title="ArticleHeader">
        <Sample label="ArticleHeader, week 1 article (sample date and reading time: not written yet)">
          <ArticleHeader
            headingLevel="h2"
            title={firstArticle.title}
            sectorTag={firstArticle.sectorTag}
            author={{ name: meetDan.heading, href: meetDan.link.href }}
            published={articleSample.published}
            minutes={articleSample.minutes}
          />
        </Sample>
        <Sample label="ArticleHeader, byline without a link">
          <ArticleHeader
            headingLevel="h2"
            title={insights.articles[1].title}
            sectorTag={insights.articles[1].sectorTag}
            author={{ name: meetDan.heading }}
            published={articleSample.published}
            minutes={articleSample.minutes}
          />
        </Sample>
      </Group>
    </div>
  );
}
