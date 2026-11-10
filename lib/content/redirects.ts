// The redirect map (plan, Technical SEO, Redirect map, all 301), with Phase 3 decision 8 for the blog and the existing
// netlify.toml rules repointed so none becomes a two-hop chain. Static export allows no next.config redirects, so
// netlify.toml carries these rules, in this order, one for one: change both together. Nothing imports this file; it is
// the readable record of every rule and why it exists. Netlify reads rules top to bottom and the first match wins, so
// every specific /blog rule sits above the /blog/:slug pattern. Every target is a page the build exports, so no rule
// is a chain.
//
// "proposed" rules cover old URLs the plan does not map (Phase 1 report, Redirect map gaps); each needs Dan's yes.
// "retired" rules point the pre-rebuild site's removed files (the old lead magnet, favicon and share images) at their
// replacements, for links and caches that still hold them.

import type { Redirect } from './types';

const rule = (from: string, to: string, source: Redirect['source'], note?: string): Redirect => ({
  from,
  to,
  status: 301,
  force: true,
  source,
  ...(note ? { note } : {}),
});

export const redirects: Redirect[] = [
  // The plan's map.
  rule('/shopify-ecommerce-consultant', '/ecommerce-director', 'plan', 'Same intent, new primary term'),
  rule('/services', '/ecommerce-director', 'plan', 'No services index; three offers in nav'),
  rule('/services/shopify-plus-architecture', '/shopify-builds-and-migrations', 'plan', 'Direct match'),
  rule('/services/technical-development', '/shopify-builds-and-migrations', 'plan', 'Folded in'),
  rule('/services/conversion-rate-optimisation', '/ecommerce-director', 'plan', 'Folded in'),
  rule('/services/paid-media-growth', '/ecommerce-director', 'plan', 'Folded in'),
  rule('/services/retention-marketing', '/ecommerce-director', 'plan', 'Folded in'),
  rule('/services/ecommerce-automation', '/ecommerce-director', 'plan', 'Folded in'),
  rule('/services/ai-search-optimization', '/ecommerce-director', 'plan', 'Folded in; keep the topic as an article'),
  rule('/services/google-feed-management', '/store-health-check', 'plan', 'Feed audit is the entry point'),
  rule('/services/shopify-catalogue-health', '/store-health-check', 'plan', 'Direct match'),
  rule('/why-not-an-agency', '/agency-or-in-house', 'plan', 'Reframed'),
  rule('/ecommerce-agency-atherstone', '/', 'plan', 'Geo page, no clicks'),
  rule('/shopify-expert-birmingham', '/', 'plan', 'Geo page, no clicks'),
  rule('/ecommerce-consultant-tamworth', '/', 'plan', 'Geo page, no clicks'),
  rule('/ecommerce-agency-leicester', '/', 'plan', 'Geo page, no clicks'),
  rule('/shopify-agency-coventry', '/', 'plan', 'Geo page, no clicks'),

  // The blog (decision 8): every post moved with its slug, so each /blog/:slug lands on its /insights page.
  rule('/blog', '/insights', 'plan', 'Rename'),
  rule('/blog/ai-writing-tells', '/insights/ai-writing-tells', 'decision', 'The custom post; its download stays at /downloads/ai-writing-tells.skill'),
  rule('/blog/category/*', '/insights', 'decision', 'Categories become the cluster index'),
  rule('/blog/:slug', '/insights/:slug', 'decision', 'Every post survives with its slug'),

  // Existing netlify.toml rules, repointed at the new pages so they are not chains.
  rule('/fractional-ecommerce-director', '/ecommerce-director', 'existing', 'Was to /shopify-ecommerce-consultant'),
  rule('/why-fractional', '/agency-or-in-house', 'existing', 'Was to /why-not-an-agency'),
  rule('/locations/*', '/', 'existing'),
  rule(
    '/dan-le-gresley-speaker-fractional-ecommerce-director-shopify.png',
    '/dan-le-gresley-shopify-ecommerce-consultant.png',
    'existing',
    'Renamed founder image; repoint if the portrait file changes',
  ),

  // Not in the plan's map.
  rule('/the-model', '/ecommerce-director', 'proposed', 'The operating-model page; the retainer page now says it'),
  rule('/atherstone-5-metrics.pdf', '/scorecard', 'proposed', 'The retired lead magnet (kill list), replaced by the scorecard'),
  rule('/sectors', '/', 'proposed', 'No sectors index exists; the homepage carries the five tiles'),

  // The pre-rebuild site's removed files.
  rule('/favicon-a-clay.svg', '/icon.svg', 'retired', 'The old favicon'),
  rule('/apple-touch-icon.png', '/apple-icon.png', 'retired', 'The old touch icon'),
  rule('/og-image.jpg', '/og/og-home.png', 'retired', 'The old share image'),
  rule('/og-image.png', '/og/og-home.png', 'retired', 'The old share image'),
  rule('/og-image.svg', '/og/og-home.png', 'retired', 'The old share image'),
  rule('/og-ai-writing-tells.png', '/og/insights/ai-writing-tells.png', 'retired', 'The old post share image'),
  rule('/og-ai-writing-tells.svg', '/og/insights/ai-writing-tells.png', 'retired', 'The old post share image'),
];
