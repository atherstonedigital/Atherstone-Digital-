import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { ForwardLink } from '@/components/brand/Button';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { ArticleHeader, readingMinutes } from '@/components/site/ArticleHeader';
import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { CTABand } from '@/components/site/CTABand';
import { formPanelClasses } from '@/components/site/form-panel-styles';
import { InsightCards } from '@/components/site/InsightCards';
import { JsonLd } from '@/components/site/JsonLd';
import { Screen } from '@/components/site/Screen';
import { Button } from '@/components/ui/button';
import {
  articleFoot,
  getArticle,
  insightSlugs,
  wordCount,
  type ArticleDownload,
  type ArticleLinks,
} from '@/lib/content/insights';
import { insights, meetDan, nav } from '@/lib/content/site';
import { articleJsonLd, buildMetadata, crumbs, insightRoute } from '@/lib/seo';

import { renderArticleBody } from './_body';

// /insights/[slug] (plan, /insights and /insights/[slug]): one article. The plan asks each for Dan's byline and photo,
// the date, the reading time, the sector tag, one sector link and one offer link in the body, and Article schema; the
// internal linking rules add related articles at the foot. The photo is left out: the brand book keeps Dan's portrait to
// the homepage and About (components/site/ArticleHeader.tsx).
//
// The articles are the moved /blog posts (Phase 3 decision 8), with their slugs, titles, dates and bodies, and the
// voice-rule fixes listed in lib/content/insights.ts. The page, in order:
//
// 1. Breadcrumbs (Home, Insights, the article), which write the BreadcrumbList.
// 2. The ArticleHeader: sector tag, the title as the H1, Dan's byline linking to About, the date and the reading time.
// 3. The post's excerpt as the first paragraph, in body-lg, as the live page set it under the title.
// 4. The Markdown body at the measure (./_body.tsx), then the download panel where the post has one.
// 5. The article's offer link, and its sector link where the post is about a sector, under the nav's own group names.
// 6. Related articles as the homepage's Insights cards, three across, and the way back to the index.
// 7. The CTABand, "Book a call, or start with the Health Check", as the offer and sector pages close.
//
// Article JSON-LD carries Dan as the author Person (articleJsonLd in lib/seo.ts); the Organization is the root
// layout's. Screens (brand book, one section per screen): the article is one section, as long as its body needs; the
// related articles and the closing band share the last screen.

// No `dynamicParams = false`: with output: 'export' only the slugs below are written anyway, and Next 14.2's dev server
// reads that flag as "no static params" and answers every article with a 500. An unknown slug still 404s (notFound).
export function generateStaticParams(): { slug: string }[] {
  return insightSlugs.map((slug) => ({ slug }));
}

interface InsightPageProps {
  params: { slug: string };
}

export function generateMetadata({ params }: InsightPageProps): Metadata {
  const article = getArticle(params.slug);
  if (!article) notFound();
  // The route's title tag, canonical, robots and share image, with the article's own meta description.
  return buildMetadata({ ...insightRoute(params.slug), description: article.description });
}

/** The offer link, and the sector link where there is one, each under the nav's name for its group. */
function ArticleLinksBlock({ links }: { links: ArticleLinks }) {
  const items = [
    ...(links.sector ? [{ term: nav.sectors.label, link: links.sector }] : []),
    { term: nav.services.label, link: links.offer },
  ];
  return (
    <dl className="mt-space-12 grid max-w-measure grid-cols-1 gap-space-4 border-t border-rule pt-space-6 min-[720px]:grid-cols-2 min-[720px]:gap-x-gutter">
      {items.map(({ term, link }) => (
        <div key={link.href}>
          <dt className="eyebrow mb-space-1 text-ink-muted">{term}</dt>
          <dd>
            <ForwardLink link={link} />
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** The post's file to download, on a raised panel: its heading and line, the button, then the file's name and size. */
function DownloadPanel({ download }: { download: ArticleDownload }) {
  return (
    <section aria-labelledby="download-heading" className={`${formPanelClasses()} mt-space-12 max-w-measure`}>
      <SectionHeading eyebrow={download.eyebrow} heading={download.heading} headingId="download-heading">
        {download.body}
      </SectionHeading>
      {/* A plain anchor with download, not next/link, so the router never tries to treat the file as a page. */}
      <Button asChild className="mt-space-6 w-full min-[720px]:w-auto">
        <a href={download.href} download>
          {download.label}
        </a>
      </Button>
      <p className="small mt-space-6 border-t border-rule pt-space-4">
        <span className="font-semibold">{download.fileName}</span>, {download.size}
        <span className="block text-ink-muted">{download.description}</span>
      </p>
    </section>
  );
}

export default async function InsightRoute({ params }: InsightPageProps) {
  const article = getArticle(params.slug);
  if (!article) notFound();
  const { post, links, download, related } = article;
  const body = await renderArticleBody(post.body);
  // The moved posts carry minutes worked out from their bodies; the custom post's body is ported here, so count it.
  const minutes = post.custom ? readingMinutes(wordCount(post.body)) : post.minutes;

  return (
    <>
      <JsonLd data={articleJsonLd(post)} />

      <Screen first>
        <div className="min-w-0">
          <Breadcrumbs items={crumbs.insight(post.slug)} className="mb-space-6" />
          <article>
            {/* The H1 balanced and held to 24em, as every inner page's H1 (the sector and offer page headers). */}
            <ArticleHeader
              className="[&>h1]:max-w-[24em] [&>h1]:text-balance"
              title={post.title}
              sectorTag={post.sectorTag}
              author={{ name: meetDan.heading, href: meetDan.link.href }}
              published={post.published}
              minutes={minutes}
            />
            <p className="body-lg mt-space-4 max-w-measure-lg">{post.excerpt}</p>
            <div className="mt-space-8">{body}</div>
            {download ? <DownloadPanel download={download} /> : null}
            <ArticleLinksBlock links={links} />
          </article>
        </div>
      </Screen>

      {related.length > 0 ? (
        <Screen closing>
          <div className="min-w-0">
            <InsightCards
              layout="row"
              headingId="related-heading"
              content={{ eyebrow: insights.eyebrow, heading: articleFoot.relatedHeading, articles: related }}
            />
            <ForwardLink link={articleFoot.allInsights} className="mt-space-4" />
          </div>
        </Screen>
      ) : null}

      <CTABand />
    </>
  );
}
