// /insights and /insights/[slug] (plan, Results, About, Insights, Contact > /insights). The index is grouped by cluster,
// not by date: the plan's six clusters, then Archive for the moved /blog posts that fit none (Phase 3 decision 8).
// The posts are lib/content/insights-archive.ts until the plan's twelve articles are written; each moved post keeps
// its slug, and /blog/:slug redirects to /insights/:slug (lib/content/redirects.ts).
//
// Drafts, pending Dan's approval: the index's title tag and meta description. Its H1 is the homepage Insights
// heading, verbatim. Article title tags are the post titles with the brand suffix, as /blog set them.

import { archivePosts } from '../insights-archive';
import { insights } from '../site';
import { stub } from '../stub';
import type { ArchivePost, Article, InsightCluster, InsightClusterId, InsightsIndexPage } from '../types';

/** The plan's clusters, in its order, then Archive. */
export const insightClusters: InsightCluster[] = [
  { id: 'catalogue-and-feeds', label: 'Catalogue and feeds' },
  { id: 'paid-media', label: 'Paid media for considered purchases' },
  { id: 'email-and-samples', label: 'Email and samples' },
  { id: 'tracking-and-reporting', label: 'Tracking and reporting' },
  { id: 'showroom-and-online', label: 'Showroom and online' },
  { id: 'shopify-for-interiors', label: 'Shopify for interiors' },
  { id: 'archive', label: 'Archive' },
];

export const insightsIndexPage: InsightsIndexPage = {
  meta: {
    title: 'Furniture & Interiors Ecommerce Insights | Atherstone Digital',
    description:
      'Articles for furniture and interiors retailers on catalogues and feeds, paid media for considered purchases, email and samples, tracking, and the showroom.',
  },
  h1: insights.heading,
  intro: stub('The plan gives the index its grouping (by cluster, not by date) and no copy.'),
  clusters: insightClusters,
};

/** Every written post, newest first. Only these are routes. */
export const insightPosts: ArchivePost[] = [...archivePosts].sort((a, b) => b.published.localeCompare(a.published));

/** For generateStaticParams in app/(site)/insights/[slug]. */
export const insightSlugs = insightPosts.map((post) => post.slug);

export function getInsightPost(slug: string): ArchivePost | undefined {
  return insightPosts.find((post) => post.slug === slug);
}

/** The index's groups: each cluster with its posts, newest first, leaving out clusters with none yet. */
export function postsByCluster(): { cluster: InsightCluster; posts: ArchivePost[] }[] {
  return insightClusters
    .map((cluster) => ({ cluster, posts: insightPosts.filter((post) => post.cluster === cluster.id) }))
    .filter((group) => group.posts.length > 0);
}

export function clusterLabel(id: InsightClusterId): string {
  return insightClusters.find((cluster) => cluster.id === id)?.label ?? id;
}

/** Related posts for an article's foot: the same cluster first, then the newest others. */
export function relatedPosts(slug: string, count = 2): ArchivePost[] {
  const post = getInsightPost(slug);
  const others = insightPosts.filter((item) => item.slug !== slug);
  const same = others.filter((item) => item.cluster === post?.cluster && item.cluster !== 'archive');
  return [...same, ...others.filter((item) => !same.includes(item))].slice(0, count);
}

/**
 * The plan's twelve articles (Content and distribution, first 90 days), none written yet. Slugs for weeks 1 to 3 are
 * Phase 1's; the rest are Phase 3 proposals made from the titles. Clusters are Phase 3 assignments. None is a route
 * until it is written: insightPosts below lists only written posts.
 */
export const plannedArticles: Article[] = [
  {
    week: 1,
    slug: 'why-half-your-furniture-catalogue-never-appears-in-google-shopping',
    href: '/insights/why-half-your-furniture-catalogue-never-appears-in-google-shopping',
    title: 'Why half your furniture catalogue never appears in Google Shopping',
    targetTerm: 'furniture Google Shopping feed',
    sectorTag: 'Furniture',
    linksTo: { sector: 'furniture-retailers', offer: 'store-health-check' },
    cluster: 'catalogue-and-feeds',
  },
  {
    week: 2,
    slug: 'ga4-says-one-thing-shopify-says-another',
    href: '/insights/ga4-says-one-thing-shopify-says-another',
    title: 'GA4 says one thing, Shopify says another. Which one do you believe?',
    targetTerm: 'GA4 Shopify revenue mismatch',
    sectorTag: 'Furniture',
    linksTo: { sector: 'furniture-retailers', offer: 'store-health-check' },
    cluster: 'tracking-and-reporting',
  },
  {
    week: 3,
    slug: 'the-showroom-sale-your-website-made',
    href: '/insights/the-showroom-sale-your-website-made',
    title: 'The showroom sale your website made and never got credit for',
    targetTerm: 'showroom and online store attribution',
    sectorTag: 'Furniture',
    linksTo: { sector: 'furniture-retailers', offer: 'ecommerce-director' },
    cluster: 'showroom-and-online',
  },
  {
    week: 4,
    slug: 'made-to-order-on-shopify-lead-times',
    href: '/insights/made-to-order-on-shopify-lead-times',
    title: 'Made to order on Shopify: lead times that don’t lose the sale',
    targetTerm: 'Shopify made to order lead times',
    sectorTag: 'Furniture',
    linksTo: { sector: 'furniture-retailers', offer: 'shopify-builds-and-migrations' },
    cluster: 'shopify-for-interiors',
  },
  {
    week: 5,
    slug: 'what-a-catalogue-clean-up-actually-involves',
    href: '/insights/what-a-catalogue-clean-up-actually-involves',
    title: '16,193 wrong product records: what a catalogue clean-up actually involves',
    targetTerm: 'Shopify catalogue cleanup',
    sectorTag: 'Furniture',
    linksTo: { sector: 'furniture-retailers', offer: 'store-health-check' },
    cluster: 'catalogue-and-feeds',
  },
  {
    week: 6,
    slug: 'meta-ads-for-things-people-think-about-for-six-weeks',
    href: '/insights/meta-ads-for-things-people-think-about-for-six-weeks',
    title: 'Meta ads for things people think about for six weeks',
    targetTerm: 'Meta ads high ticket furniture',
    sectorTag: 'Furniture',
    linksTo: { sector: 'furniture-retailers', offer: 'ecommerce-director' },
    cluster: 'paid-media',
  },
  {
    week: 7,
    slug: 'samples-are-your-real-conversion',
    href: '/insights/samples-are-your-real-conversion',
    title: 'Samples are your real conversion. Build the site around them',
    targetTerm: 'sample ordering Shopify tiles',
    sectorTag: 'Flooring and tiles',
    linksTo: { sector: 'flooring-and-tile-retailers', offer: 'shopify-builds-and-migrations' },
    cluster: 'email-and-samples',
  },
  {
    week: 8,
    slug: 'selling-by-the-square-metre-on-shopify',
    href: '/insights/selling-by-the-square-metre-on-shopify',
    title: 'Selling by the square metre on Shopify without the wrong quantities',
    targetTerm: 'Shopify sell by square metre',
    sectorTag: 'Flooring and tiles',
    linksTo: { sector: 'flooring-and-tile-retailers', offer: 'shopify-builds-and-migrations' },
    cluster: 'shopify-for-interiors',
  },
  {
    week: 9,
    slug: 'christmas-is-40-percent-of-your-year',
    href: '/insights/christmas-is-40-percent-of-your-year',
    title: 'Christmas is 40% of your year. The email flows that should be live by October',
    targetTerm: 'Klaviyo flows homeware retailer',
    sectorTag: 'Homeware and gifts',
    linksTo: { sector: 'homeware-and-gift-retailers', offer: 'ecommerce-director' },
    cluster: 'email-and-samples',
  },
  {
    // The plan links it to the comparison page, not a sector; its sector tag and links are Phase 3 placeholders.
    week: 10,
    slug: 'agency-in-house-or-a-director-the-real-cost',
    href: '/insights/agency-in-house-or-a-director-the-real-cost',
    title: 'Agency, in-house head of ecommerce, or a director: the real cost of each',
    targetTerm: 'ecommerce agency vs in-house',
    sectorTag: 'Showroom and online',
    linksTo: { sector: 'furniture-retailers', offer: 'ecommerce-director' },
    cluster: 'showroom-and-online',
  },
  {
    // The plan links it to the scorecard, not a sector; its sector tag and links are Phase 3 placeholders.
    week: 11,
    slug: 'the-seven-numbers-to-check-every-monday',
    href: '/insights/the-seven-numbers-to-check-every-monday',
    title: 'The seven numbers a showroom retailer should check every Monday',
    targetTerm: 'ecommerce weekly report retailer',
    sectorTag: 'Tracking and reporting',
    linksTo: { sector: 'furniture-retailers', offer: 'ecommerce-director' },
    cluster: 'tracking-and-reporting',
  },
  {
    week: 12,
    slug: 'moving-a-furniture-store-from-woocommerce-to-shopify',
    href: '/insights/moving-a-furniture-store-from-woocommerce-to-shopify',
    title: 'Moving a furniture store from WooCommerce to Shopify without losing rankings',
    targetTerm: 'WooCommerce to Shopify migration furniture',
    sectorTag: 'Furniture',
    linksTo: { sector: 'furniture-retailers', offer: 'shopify-builds-and-migrations' },
    cluster: 'shopify-for-interiors',
  },
];
