// The articles behind /insights and /insights/[slug], as the two routes read them. The posts themselves are the moved
// /blog posts in lib/content/insights-archive.ts (Phase 3 decision 8: same slugs, titles, dates and bodies), with the
// index helpers in lib/content/pages/insights.ts. This file adds what the article pages need on top:
//
// 1. The voice-rule fixes are now made in insights-archive.ts itself (folded in at the Phase 3 integrate step). The
//    posts keep their old voice otherwise ("we", "Shopify brands", "fractional" in body copy, Title Case titles):
//    that is a rewrite, not a strip, and waits for Dan.
// 2. The body of the one custom post, ai-writing-tells, ported from app/(legacy)/blog/ai-writing-tells/page.tsx as
//    Markdown, word for word, with its download from /downloads/ai-writing-tells.skill and its live meta description.
// 3. The one offer link every article carries, and the one sector link where the post is about a sector (plan,
//    Internal linking rules: every article links to one sector page and one offer page in the body).
// 4. Related articles for the foot of each article, and the index's groups, every cluster in the plan's order.
//
// Server-side only: it imports every post body.

import { clusterLabel, getInsightPost, insightClusters, insightPosts, insightSlugs } from './pages/insights';
import { offers, sectors } from './site';
import type { ArchivePost, InsightCluster, Link, OfferId } from './types';

export { clusterLabel, insightSlugs };

// ------------------------------------------------------------------ 2. the custom post

export interface ArticleDownload {
  eyebrow: string;
  heading: string;
  body: string;
  /** The button: sentence case, verb first, under 28 characters (Button README). */
  label: string;
  href: string;
  fileName: string;
  size: string;
  /** The line under the file name. */
  description: string;
}

interface CustomArticle {
  /** Markdown, ported from the custom page's JSX. */
  body: string;
  /** The live page's meta description, kept so the move changes nothing a search result shows. */
  metaDescription?: string;
  download?: ArticleDownload;
}

/**
 * ai-writing-tells as it reads on the live site: every paragraph, heading and tell in order, the inline code as code
 * spans. The live page's back link, share row and footer pitch ("Fractional ecommerce direction for UK brands doing
 * £500k to £5M") are not carried over: the breadcrumbs, the article's offer link and the closing band replace them.
 * The download button's label is the live label without its file details, which move to the line beneath it.
 */
const customArticles: Record<string, CustomArticle> = {
  'ai-writing-tells': {
    metaDescription:
      'A free Claude skill that strips the AI fingerprint out of ecommerce copy, emails, and blog posts. Download the rule set, no email gate.',
    download: {
      eyebrow: 'Free download',
      heading: 'The ai-writing-tells skill',
      body: 'The full rule set Claude reads before writing. Drop it into your project, or paste it into a system prompt. No email gate.',
      label: 'Download the skill',
      href: '/downloads/ai-writing-tells.skill',
      fileName: 'ai-writing-tells.skill',
      size: '12 KB',
      description: 'A Claude skill that strips the AI fingerprint from any prose Claude writes.',
    },
    body: `You can usually tell. Even when you cannot articulate what gave it away, you can feel that a paragraph was written by ChatGPT. The cadence is off. The vocabulary is too polished. The structure is too tidy. Something in the back of your head flags it as machine before you have finished reading.

This is becoming a commercial problem for ecommerce brands.

Product pages, category descriptions, blog posts, welcome emails, abandoned cart sequences, paid social ads, founder LinkedIn posts. A growing share of all of it is now written by AI, and most of it carries the same fingerprint. Customers are getting better at spotting it. Google has been openly hostile to it since the helpful content update. And when your brand voice starts to read like everyone else's brand voice, you stop being a brand.

I work with Shopify brands as a fractional ecommerce director, and over the last twelve months I have watched this problem creep into work that gets put in front of me. Copy that should sound like the founder ends up sounding like Claude. Customer service replies sound like ChatGPT. Even internal Slack messages drift toward the same flat, optimised, slightly hollow register.

I use Claude heavily in my own work, so I had a direct stake in fixing this. The problem is that Claude, and every other large model, has been trained on so much corporate web prose that its defaults are corporate web prose. Even when you ask it to "sound human" or "match my voice", it reverts to the same patterns within a paragraph or two.

So I built a skill that forces it not to.

## What the skill is

It is a Claude skill called \`ai-writing-tells\`. A skill in this context is a markdown file Claude reads before doing certain kinds of work. This one defines the patterns that mark text as machine-generated and tells Claude to strip them out of any prose it produces before handing the output back.

I built the rule set from Wikipedia's Signs of AI writing page, a field guide their cleanup team put together from thousands of real AI submissions. Then I added the tells most relevant to commercial work: emails, posts, proposals, product copy, briefs.

## The tells the skill catches

These are the patterns I see most often in AI-written copy. The skill has more, but these are the heavy hitters.

**Em dashes everywhere.** AI loves the em dash. It feels literary. In practice it is the single most reliable signal that a sentence came out of a language model. Commas, full stops, and rewrites cover almost every case where you would reach for one.

**Negative parallelism.** "It is not X, it is Y." "Not just a tool, but a partner." "This is not about price, it is about value." Once you start watching for it, you will see it in every AI-written paragraph. Cut it. State the positive directly.

**Rule of three.** Three adjectives. Three benefits. Three transitions. AI reaches for triplets reflexively because it has been trained on web copy where they appear constantly. "Fast, scalable, and reliable." "Innovative, transformative, and groundbreaking." One adjective is usually enough.

**Cursed vocabulary.** Delve. Tapestry. Landscape. Realm. Foster. Underscore. Pivotal. Robust. Seamless. Empower. Leverage. Enhance. Holistic. Comprehensive. Game-changer. In the ever-evolving landscape of. Each one is a flare. The skill swaps them for plain Anglo-Saxon alternatives.

**Trailing puffery.** The participle phrase tacked on the end of a sentence to invent significance. "...marking a pivotal moment in the industry." "...further cementing his reputation as a leader." "...emphasising the growing importance of." Delete the phrase. The sentence is always stronger without it.

**Heritage tone.** When AI describes anything, a town, a brand, a product, a person, it lapses into tourist board language. "Renowned for." "Boasts." "Rich heritage." "Vibrant community." "Iconic." "World-class." Describe what the thing actually is and does. Specifics over adjectives.

**Manufactured variation.** AI was trained on essays that taught it never to repeat a proper noun. So it calls the founder "the entrepreneur", then "the visionary", then "the industry leader". A human would just say their name. Repeat the proper noun. It reads cleaner.

**Bullet lists with bolded titles.** The pattern where every bullet starts with a bolded word followed by a colon and a sentence that just rewords the bolded word. "Scalability: The system handles growth." Most lists of this shape work better as prose, or as plain bullets without the bold prefix.

There is a longer catalogue in the skill itself, plus an appendix that breaks down the deeper structural and tonal tells.

## Why this matters for ecommerce

A few reasons.

First, customers can tell. The research is still early but the direction is clear: trust drops when buyers detect AI prose on a product page or a brand email. Even when they cannot name what is wrong, they bounce.

Second, Google is actively trying to demote it. The helpful content system, the spam updates of the last two years, and the increasing weight on E-E-A-T are all aimed at the same problem: web text that reads optimised but says nothing real. If your collection pages and blog posts read like generic AI output, you are now competing on terms Google does not want you to win on.

Third, your brand voice is the cheapest moat you have. When everyone in your category has access to the same model, the brands that win are the ones whose copy still sounds like a specific person with a specific point of view. AI can help you produce more, faster. But if the output reads the same as every other Shopify store's output, you have spent your most valuable asset on volume.

## How to use it

Download the file below. It is a \`.skill\` package, a zipped folder containing the rule set and the long-form catalogue.

If you use Claude Code, drop the unzipped folder into your project's \`.claude/skills/\` directory and Claude will read it automatically before any writing task.

If you use Claude directly on the web or desktop app, you can either paste the contents of the \`SKILL.md\` file into your system prompt, or upload the file and ask Claude to apply it when writing. The rules work the same way regardless of how you load them.

It is free. No email gate. Take it, use it, fork it, change it. The point is to push back against AI slop, not to gatekeep the patch.
`,
  },
};

// ------------------------------------------------------------------ 3. the sector link and the offer link

/**
 * The offer each post sends its reader to: the one whose work it describes. Phase 3 assignments, for Dan to check.
 * Every post must have one, so a new post cannot ship without its offer link.
 */
const offerFor: Record<string, OfferId> = {
  'ai-writing-tells': 'ecommerce-director',
  'why-fractional-ecommerce-director-beats-agency': 'ecommerce-director',
  'shopify-seo-guide-2025': 'store-health-check',
  'n8n-shopify-automation-workflows': 'ecommerce-director',
  'fractional-ecommerce-director-vs-consultant': 'ecommerce-director',
  'how-to-hire-fractional-ecommerce-director': 'ecommerce-director',
  'ecommerce-director-salary-uk-vs-fractional': 'ecommerce-director',
  'shopify-plus-agency-vs-fractional-director': 'ecommerce-director',
  'ecommerce-automation-roi-guide': 'ecommerce-director',
  'shopify-product-data-audit-guide': 'store-health-check',
  'shopify-taxonomy-guide-2025': 'store-health-check',
  'fractional-ecommerce-director-2026': 'ecommerce-director',
  'ai-search-shopify-2026': 'ecommerce-director',
  'klaviyo-email-flows-shopify-brands': 'ecommerce-director',
  'ecommerce-automation-shopify-brands': 'ecommerce-director',
  'how-shopify-brands-should-use-ai': 'ecommerce-director',
  'shopify-metrics-brands-track-wrong': 'store-health-check',
};

export interface ArticleLinks {
  /** The sector page, where the post is about one sector (its `sector` in insights-archive.ts). */
  sector?: Link;
  offer: Link;
}

function articleLinks(post: ArchivePost): ArticleLinks {
  const offerId = offerFor[post.slug];
  const offer = offers.offers.find((item) => item.id === offerId);
  if (!offer) throw new Error(`No offer link for the insight ${post.slug}: add it to offerFor in lib/content/insights.ts.`);
  const sector = post.sector ? sectors.sectors.find((item) => item.slug === post.sector) : undefined;
  if (post.sector && !sector) throw new Error(`The insight ${post.slug} names a sector, ${post.sector}, with no page.`);
  return {
    ...(sector ? { sector: { label: sector.navLabel, href: sector.href } } : {}),
    offer: { label: offer.name, href: offer.href },
  };
}

// ------------------------------------------------------------------ 4. related articles and the index

/**
 * Up to `count` posts for the foot of an article, the closest first: the same plan cluster, then the same sector, then
 * the same old /blog category, then the newest. Ties go to the newer post.
 */
export function relatedArticles(slug: string, count = 3): ArchivePost[] {
  const post = getInsightPost(slug);
  if (!post) return [];
  const score = (other: ArchivePost) =>
    (other.cluster === post.cluster && post.cluster !== 'archive' ? 4 : 0) +
    (post.sector && other.sector === post.sector ? 2 : 0) +
    (other.legacyCategory === post.legacyCategory ? 1 : 0);
  return insightPosts
    .filter((other) => other.slug !== slug)
    .map((other) => ({ other, score: score(other) }))
    .sort((a, b) => b.score - a.score || b.other.published.localeCompare(a.other.published))
    .slice(0, count)
    .map(({ other }) => other);
}

export interface IndexGroup {
  cluster: InsightCluster;
  /** Newest first. Empty where the plan's cluster has no written article yet: the index shows the stub there. */
  posts: ArchivePost[];
}

/** Every cluster in the plan's order, then Archive, each with its posts. */
export function indexGroups(): IndexGroup[] {
  return insightClusters.map((cluster) => ({
    cluster,
    posts: insightPosts.filter((post) => post.cluster === cluster.id),
  }));
}

/**
 * Phase 3 drafts, pending Dan's approval: the heading over an article's related articles (the plan's own words,
 * "related articles at the foot") and the forward link back to the index under them.
 */
export const articleFootDraft = {
  relatedHeading: 'Related articles',
  allInsights: { label: 'All insights', href: '/insights' } as Link,
} as const;

// ------------------------------------------------------------------ the article

export interface InsightArticle {
  /** The post with its voice edits applied, and the ported body for the custom post. */
  post: ArchivePost;
  /** The meta description: the post's excerpt, or the live page's own where it had one. */
  description: string;
  links: ArticleLinks;
  download?: ArticleDownload;
  related: ArchivePost[];
}

export function getArticle(slug: string): InsightArticle | undefined {
  const found = getInsightPost(slug);
  if (!found) return undefined;
  const custom = customArticles[slug];
  if (found.custom && !custom) throw new Error(`The custom insight ${slug} has no ported body in lib/content/insights.ts.`);
  const post = custom ? { ...found, body: custom.body } : found;
  return {
    post,
    description: custom?.metaDescription ?? post.excerpt,
    links: articleLinks(post),
    ...(custom?.download ? { download: custom.download } : {}),
    related: relatedArticles(slug),
  };
}

/** Words in a Markdown body, for the reading time (readingMinutes() in components/site/ArticleHeader.tsx). */
export function wordCount(markdown: string): number {
  return markdown
    .replace(/\]\([^)]*\)/g, ']')
    .split(/\s+/)
    .filter((word) => /[A-Za-z0-9]/.test(word)).length;
}
