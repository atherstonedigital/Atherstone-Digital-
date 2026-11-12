// SEO for every route: the route registry (title tag, meta description, H1, robots, share image), buildMetadata()
// for each page's `metadata` export, and the JSON-LD builders the plan's Structured data list asks for (Organization
// site-wide, Person, Service, FAQPage, BreadcrumbList, Article). Server-side only: pages and layouts import it, client
// components never do (it pulls in every page's content).
//
// Title tags are set as title.absolute, exactly as the plan's tables give them, so the root layout's template never
// doubles the brand. Canonicals are absolute on https://www.atherstonedigital.com with no trailing slash. No
// LocalBusiness and no geo tags (plan, kill list).

import type { Metadata } from 'next';

import { aboutPage } from '@/lib/content/pages/about';
import { agencyOrInHousePage } from '@/lib/content/pages/agency-or-in-house';
import { contactPage, privacyPage, scorecardPage, termsPage, thankYouPage } from '@/lib/content/pages/contact';
import { clusterLabel, getInsightPost, insightPosts, insightsIndexPage } from '@/lib/content/pages/insights';
import { buildsPage, ecommerceDirectorPage, offerPages, storeHealthCheckPage } from '@/lib/content/pages/offers';
import { caseStudyPages, resultsIndexPage } from '@/lib/content/pages/results';
import { sectorPages } from '@/lib/content/pages/sectors';
import { contact, credentialText, hero, homeMeta, meetDan, sectors, siteUrl, wordmarkDescriptor } from '@/lib/content/site';
import type { ArchivePost, OfferId, PageMeta, SectorSlug, ServiceSchema } from '@/lib/content/types';
import type { ShareCard } from '@/lib/og/share-card';
import { absoluteUrl, type Crumb } from '@/lib/structured-data';

export { absoluteUrl, breadcrumbListJsonLd, faqPageJsonLd, serializeJsonLd, type Crumb } from '@/lib/structured-data';

export const SITE_URL = siteUrl;
export const SITE_NAME = 'Atherstone Digital';
/** The plan's entity descriptor, the same on every page (SEO 6). */
export const DESCRIPTOR = wordmarkDescriptor;

// ------------------------------------------------------------------ share images

export const SHARE_IMAGE = { width: 1200, height: 630 } as const;

/**
 * A route's share image: one of the hand-made set in public/og, or one rendered at build time by
 * app/og/[group]/[image]/route.tsx from the same layout (docs/brand Social README).
 */
export type ShareImage =
  | { kind: 'static'; src: `/og/${string}.png` }
  | { kind: 'generated'; group: 'pages' | 'results' | 'insights'; image: `${string}.png`; card: ShareCard };

export function shareImageUrl(image: ShareImage): string {
  return image.kind === 'static' ? image.src : `/og/${image.group}/${image.image}`;
}

/** The fallback for any page without its own (Social README: og-home.png). */
const homeImage: ShareImage = { kind: 'static', src: '/og/og-home.png' };

const generated = (group: 'pages' | 'results' | 'insights', name: string, card: ShareCard): ShareImage => ({
  kind: 'generated',
  group,
  image: `${name}.png`,
  card,
});

// ------------------------------------------------------------------ the route registry

export interface SeoRoute {
  /** The path, as linked: /ecommerce-director. */
  path: string;
  /** The full title tag, set as title.absolute. */
  title: string;
  description: string;
  /** The page's H1, which the share image headline repeats. */
  h1: string;
  /** robots index. False on a page that is mostly unwritten (decisions 3 and 4) and on the thank-you page. */
  index: boolean;
  image: ShareImage;
  type: 'website' | 'article';
  article?: { published: string; modified?: string; section: string };
}

function route(path: string, head: { meta: PageMeta; h1: string }, image: ShareImage, index = true): SeoRoute {
  return { path, title: head.meta.title, description: head.meta.description, h1: head.h1, index, image, type: 'website' };
}

const sectorLabel = (slug: SectorSlug) => sectors.sectors.find((item) => item.slug === slug)?.navLabel ?? slug;

/** The fixed routes, by path. Dynamic ones come from sectorRoute(), caseStudyRoute() and insightRoute(). */
export const staticRoutes = {
  '/': route('/', { meta: homeMeta, h1: hero.heading }, homeImage),
  '/ecommerce-director': route(ecommerceDirectorPage.path, ecommerceDirectorPage, {
    kind: 'static',
    src: '/og/og-ecommerce-director.png',
  }),
  '/store-health-check': route(storeHealthCheckPage.path, storeHealthCheckPage, {
    kind: 'static',
    src: '/og/og-store-health-check.png',
  }),
  '/shopify-builds-and-migrations': route(buildsPage.path, buildsPage, {
    kind: 'static',
    src: '/og/og-shopify-builds-and-migrations.png',
  }),
  '/results': route(
    '/results',
    resultsIndexPage,
    generated('pages', 'results', { eyebrow: resultsIndexPage.label, headline: resultsIndexPage.h1 }),
  ),
  '/agency-or-in-house': route(
    '/agency-or-in-house',
    agencyOrInHousePage,
    generated('pages', 'agency-or-in-house', {
      eyebrow: 'Agency, in-house, or a director',
      headline: agencyOrInHousePage.h1,
    }),
    false,
  ),
  '/about': route(
    '/about',
    aboutPage,
    generated('pages', 'about', { eyebrow: 'About Dan Le Gresley', headline: aboutPage.h1 }),
  ),
  '/insights': route(
    '/insights',
    insightsIndexPage,
    generated('pages', 'insights', { eyebrow: 'Insights', headline: insightsIndexPage.h1 }),
  ),
  '/contact': route(
    '/contact',
    contactPage,
    generated('pages', 'contact', { eyebrow: 'Contact', headline: contactPage.h1 }),
  ),
  '/contact/thank-you': route('/contact/thank-you', thankYouPage, homeImage, false),
  '/scorecard': route(
    '/scorecard',
    scorecardPage,
    generated('pages', 'scorecard', { eyebrow: 'Scorecard', headline: scorecardPage.h1 }),
    false,
  ),
  '/privacy': route('/privacy', privacyPage, homeImage),
  '/terms': route('/terms', termsPage, homeImage),
} satisfies Record<string, SeoRoute>;

export type StaticPath = keyof typeof staticRoutes;

export function sectorRoute(slug: SectorSlug): SeoRoute {
  const page = sectorPages[slug];
  return route(page.path, page, { kind: 'static', src: `/og/og-${slug}.png` }, page.written);
}

export function caseStudyRoute(slug: string): SeoRoute {
  const page = caseStudyPages[slug];
  if (!page) throw new Error(`No case study ${slug} in lib/content/pages/results.ts`);
  return route(
    page.caseStudy.href,
    page,
    generated('results', slug, { eyebrow: `Case study · ${page.caseStudy.sector.label}`, headline: page.h1 }),
    page.written,
  );
}

export function insightRoute(slug: string): SeoRoute {
  const post = getInsightPost(slug);
  if (!post) throw new Error(`No insight ${slug} in lib/content/pages/insights.ts`);
  return {
    path: post.href,
    // As /blog set them: the post title and the brand suffix. Long titles truncate at the suffix first (plan).
    title: `${post.title} | ${SITE_NAME}`,
    description: post.excerpt,
    h1: post.title,
    index: true,
    image: generated('insights', slug, { eyebrow: `Insights · ${post.sectorTag}`, headline: post.title }),
    type: 'article',
    article: { published: post.published, section: clusterLabel(post.cluster) },
  };
}

/** Every route the site serves under app/(site), for the sitemap and the share-image generator. */
export function allRoutes(): SeoRoute[] {
  return [
    ...Object.values(staticRoutes),
    ...(Object.keys(sectorPages) as SectorSlug[]).map(sectorRoute),
    ...Object.keys(caseStudyPages).map(caseStudyRoute),
    ...insightPosts.map((post) => insightRoute(post.slug)),
  ];
}

/** The generated share images, for generateStaticParams in app/og/[group]/[image]/route.tsx. */
export function generatedShareImages() {
  return allRoutes().flatMap((item) => (item.image.kind === 'generated' ? [item.image] : []));
}

/** Sitemap entries for the indexable routes: no noindex page, no /design-system, no thank-you page. */
export function sitemapEntries() {
  return allRoutes()
    .filter((item) => item.index)
    .map((item) => ({
      url: absoluteUrl(item.path),
      ...(item.article ? { lastModified: item.article.modified ?? item.article.published } : {}),
    }));
}

// ------------------------------------------------------------------ metadata

/** The root layout's defaults: every route overrides title, description, canonical and share image. */
export const defaultMetadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
  description: homeMeta.description,
  applicationName: SITE_NAME,
  authors: [{ name: 'Dan Le Gresley', url: absoluteUrl('/about') }],
  creator: 'Dan Le Gresley',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: SITE_NAME,
    images: [{ url: absoluteUrl(shareImageUrl(homeImage)), ...SHARE_IMAGE, alt: hero.heading }],
  },
  twitter: { card: 'summary_large_image', images: [absoluteUrl(shareImageUrl(homeImage))] },
};

/**
 * A page's `metadata`: title.absolute, description, canonical, robots, Open Graph and Twitter with the route's share
 * image. Pass a fixed path ('/about') or a route from sectorRoute(), caseStudyRoute() or insightRoute().
 */
export function buildMetadata(target: StaticPath | SeoRoute): Metadata {
  const item = typeof target === 'string' ? staticRoutes[target] : target;
  const url = absoluteUrl(item.path);
  const image = { url: absoluteUrl(shareImageUrl(item.image)), ...SHARE_IMAGE, alt: item.h1 };
  return {
    title: { absolute: item.title },
    description: item.description,
    alternates: { canonical: url },
    robots: item.index ? { index: true, follow: true } : { index: false, follow: true },
    openGraph:
      item.type === 'article' && item.article
        ? {
            type: 'article',
            url,
            siteName: SITE_NAME,
            locale: 'en_GB',
            title: item.title,
            description: item.description,
            images: [image],
            publishedTime: item.article.published,
            ...(item.article.modified ? { modifiedTime: item.article.modified } : {}),
            section: item.article.section,
            authors: [absoluteUrl('/about')],
          }
        : {
            type: 'website',
            url,
            siteName: SITE_NAME,
            locale: 'en_GB',
            title: item.title,
            description: item.description,
            images: [image],
          },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.description,
      images: [image.url],
    },
  };
}

// ------------------------------------------------------------------ JSON-LD

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const PERSON_ID = `${SITE_URL}/about#person`;
const GB = { '@type': 'Country', name: 'United Kingdom', identifier: 'GB' } as const;

type JsonLdObject = Record<string, unknown>;

/** The site-wide Organization (plan, Structured data). No LocalBusiness: it invites the geo problem back. */
export function organizationJsonLd(): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': ORGANIZATION_ID,
    name: SITE_NAME,
    legalName: contact.companyName,
    identifier: { '@type': 'PropertyValue', propertyID: 'Companies House company number', value: contact.companyNumber },
    url: SITE_URL,
    logo: absoluteUrl('/icon-512.png'),
    description: DESCRIPTOR,
    founder: { '@type': 'Person', '@id': PERSON_ID, name: 'Dan Le Gresley' },
    areaServed: GB,
    email: contact.email,
    telephone: contact.phoneHref.replace(/^tel:/, ''),
    // The plan says sameAs LinkedIn. The only LinkedIn the site links is Dan's own profile; swap in the company page's
    // URL here if one should carry the Organization instead.
    sameAs: [contact.linkedIn.href],
  };
}

/** Dan: on /about and as the author of every article. */
export function personJsonLd(options: { withContext?: boolean } = {}): JsonLdObject {
  const { withContext = true } = options;
  return {
    ...(withContext ? { '@context': 'https://schema.org' } : {}),
    '@type': 'Person',
    '@id': PERSON_ID,
    name: 'Dan Le Gresley',
    jobTitle: 'Ecommerce Director',
    url: absoluteUrl('/about'),
    worksFor: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: SITE_NAME },
    sameAs: [contact.linkedIn.href],
    knowsAbout: meetDan.credentials.map(credentialText),
  };
}

function serviceOffers(price: ServiceSchema['price'], url: string) {
  if (!price) return undefined;
  if ('from' in price) {
    return {
      '@type': 'Offer',
      url,
      priceCurrency: 'GBP',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        minPrice: price.from,
        priceCurrency: 'GBP',
        ...(price.unit ? { unitCode: 'MON', unitText: 'month' } : {}),
      },
    };
  }
  return price.tiers.map((tier) => ({
    '@type': 'Offer',
    url,
    name: tier.name,
    price: tier.price,
    priceCurrency: 'GBP',
  }));
}

/** Service on each offer page: name, description, provider, areaServed, offers with price where the plan states one. */
export function serviceJsonLd(id: OfferId): JsonLdObject {
  const page = offerPages[id];
  const url = absoluteUrl(page.path);
  const offers = serviceOffers(page.service.price, url);
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${url}#service`,
    name: page.service.name,
    description: page.service.description,
    url,
    provider: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: SITE_NAME },
    areaServed: GB,
    ...(offers ? { offers } : {}),
  };
}

const HOME_CRUMB: Crumb = { label: 'Home', href: '/' };

/** The trails the plan asks BreadcrumbList for (sector, results and insights pages). There is no /sectors page. */
export const crumbs = {
  sector: (slug: SectorSlug): Crumb[] => [HOME_CRUMB, { label: sectorLabel(slug), href: sectorPages[slug].path }],
  results: (): Crumb[] => [HOME_CRUMB, { label: resultsIndexPage.label, href: '/results' }],
  caseStudy: (slug: string): Crumb[] => [
    ...crumbs.results(),
    { label: caseStudyPages[slug]?.caseStudy.title ?? slug, href: `/results/${slug}` },
  ],
  insights: (): Crumb[] => [HOME_CRUMB, { label: 'Insights', href: '/insights' }],
  insight: (slug: string): Crumb[] => [
    ...crumbs.insights(),
    { label: getInsightPost(slug)?.title ?? slug, href: `/insights/${slug}` },
  ],
};

/** Article on every insight, with Dan as the author Person. */
export function articleJsonLd(post: ArchivePost): JsonLdObject {
  const url = absoluteUrl(post.href);
  const image = absoluteUrl(shareImageUrl(insightRoute(post.slug).image));
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: post.published,
    dateModified: post.published,
    image: [image],
    articleSection: clusterLabel(post.cluster),
    inLanguage: 'en-GB',
    author: personJsonLd({ withContext: false }),
    publisher: { '@type': 'Organization', '@id': ORGANIZATION_ID, name: SITE_NAME, logo: absoluteUrl('/icon-512.png') },
  };
}
