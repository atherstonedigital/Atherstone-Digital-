import * as React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { Breadcrumbs } from '@/components/site/Breadcrumbs';
import { Photograph, splitSizes } from '@/components/site/Photograph';
import { CTABand } from '@/components/site/CTABand';
import { FaqBlock, ListBlock, PageHeader } from '@/components/site/PageBlocks';
import { ProblemCards } from '@/components/site/ProblemCards';
import { Screen } from '@/components/site/Screen';
import { sectorPages, sectorPhotos, sectorSlugs } from '@/lib/content/pages/sectors';
import { isStub, STUB_LABEL } from '@/lib/content/stub';
import type { Problem, SectorPage, SectorSlug } from '@/lib/content/types';
import { photos } from '@/lib/images';
import { buildMetadata, crumbs, sectorRoute } from '@/lib/seo';

import { ArticlesBlock, OffersBlock, ProofBlock } from './_parts';

// /sectors/[slug] (plan, Sector pages): the five sector hubs from one template, in the template's eight parts. Copy is
// lib/content/pages/sectors.ts. Furniture is written out in the plan and indexed; the other four carry their title tag,
// the template's H1 and the problems the plan names, with every unwritten part shown as "Content to follow", and stay
// noindex until written (Phase 3 decision 3; robots come from sectorRoute in lib/seo.ts, which reads `written`).
//
// The eight parts: 1 the H1 and 2 the intro, in the header with the two calls to action as the offer pages set them;
// 3 the five problems; 4 what I do differently, followed by the three offers the internal linking rules ask every
// sector page to link; 5 proof; 6 three articles; 7 the FAQ, with FAQPage schema for the answered questions; 8 the
// closing band, "Book a call · Start with a Health Check". Breadcrumbs carry the BreadcrumbList (plan, Structured
// data). The Organization JSON-LD is the root layout's.
//
// Screens (brand book, one section per screen): the header with the problems; what I do differently with the offers;
// proof; the articles with the FAQ. Where the articles and the FAQ are not written yet (each a heading and a stub), the
// three share one screen rather than leave two half empty.
//
// Photographs (Phase 2.6, steps 3 and 4; lib/content/pages/sectors.ts, sectorPhotos). Furniture sets the Canwell
// showroom beside its header: from 900px the H1, intro and buttons take the left half and the photograph the right,
// 24px apart so the right half starts on the page's one split line (x 732 at 1440), the photograph's top level with the
// H1's under the breadcrumbs, and it loads at once (it is in the first screen). Homeware and gifts and kitchens and
// bathrooms set the Saverys portrait beside the Saverys proof card (ProofBlock). Lighting and flooring have none.

// No `dynamicParams = false`: with output: 'export' only the slugs below are written anyway, and Next 14.2's dev server
// reads that flag as "no static params" and answers every sector page with a 500. An unknown slug still 404s below.
export function generateStaticParams(): { slug: SectorSlug }[] {
  return sectorSlugs.map((slug) => ({ slug }));
}

interface SectorPageProps {
  params: { slug: string };
}

function isSectorSlug(slug: string): slug is SectorSlug {
  return (sectorSlugs as string[]).includes(slug);
}

export function generateMetadata({ params }: SectorPageProps): Metadata {
  if (!isSectorSlug(params.slug)) notFound();
  return buildMetadata(sectorRoute(params.slug));
}

/** The five problems as ProblemCards rows; a problem the plan names without its two lines shows STUB_LABEL. */
function problemItems(page: SectorPage): Problem[] {
  return page.problems.items.map((item) => ({
    title: item.title,
    body: isStub(item.body) ? STUB_LABEL : item.body,
  }));
}

export default function SectorRoute({ params }: SectorPageProps) {
  if (!isSectorSlug(params.slug)) notFound();
  const page = sectorPages[params.slug];
  const proofWritten = !isStub(page.proof.cards);
  // Articles and FAQ get their own screen once one of them is written; until then they share proof's screen.
  const restWritten = !isStub(page.articles.slugs) || !isStub(page.faq.items);

  const sectorPhoto = sectorPhotos[page.slug];
  const headerPhoto = sectorPhoto?.place === 'header' ? photos[sectorPhoto.photo] : undefined;
  const proofPhoto = sectorPhoto?.place === 'proof' ? photos[sectorPhoto.photo] : undefined;

  const proof = <ProofBlock section={page.proof} headingId="proof-heading" id="proof" photo={proofPhoto} />;
  const header = (
    <PageHeader
      h1={page.h1}
      headingId="page-heading"
      above={headerPhoto ? undefined : <Breadcrumbs items={crumbs.sector(page.slug)} className="mb-space-6" />}
      intro={page.intro}
      actions={page.closing}
    />
  );
  const articles = <ArticlesBlock section={page.articles} headingId="articles-heading" id="articles" />;
  const faq = <FaqBlock faq={page.faq} headingId="faq-heading" id="faq" />;

  return (
    <>
      <Screen first as="section" labelledBy="page-heading">
        {headerPhoto ? (
          <div>
            <Breadcrumbs items={crumbs.sector(page.slug)} className="mb-space-6" />
            <div className="grid grid-cols-1 gap-space-8 min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-x-space-6">
              {header}
              <Photograph photo={headerPhoto} sizes={splitSizes} priority />
            </div>
          </div>
        ) : (
          header
        )}
        <ProblemCards
          content={{ heading: page.problems.heading, items: problemItems(page) }}
          headingId="problems-heading"
          id="problems"
        />
      </Screen>

      <Screen>
        <ListBlock section={page.differently} headingId="differently-heading" id="what-i-do-differently" />
        <OffersBlock headingId="offers-heading" id="offers" />
      </Screen>

      {proofWritten && restWritten ? (
        <>
          <Screen>{proof}</Screen>
          <Screen>
            {articles}
            {faq}
          </Screen>
        </>
      ) : (
        <Screen>
          {proof}
          {articles}
          {faq}
        </Screen>
      )}

      <CTABand primary={page.closing.primary} secondary={page.closing.secondary} />
    </>
  );
}
