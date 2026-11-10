// The five sector pages, one template (plan, Sector pages). Furniture is written out in the plan and is copied here
// verbatim. The other four carry what the plan gives them (title tag, the template's H1, the problems the variants
// table names) and stubs for the rest, and stay noindex until they are written (Phase 3 decision 3). Nav, footer and
// homepage tiles list all five, as the plan's nav does.
//
// Drafts, pending Dan's approval: every meta description; the section headings the plan names only as template parts
// ("Five problems specific to [sector]", "Proof", "Thinking for [sector] retailers", the shared FAQ heading); and list
// items set with a capital first letter, because each now stands as its own bullet.

import { closingActions, faqHeading, sectors } from '../site';
import { stub } from '../stub';
import type { Sector, SectorPage, SectorSlug } from '../types';

function sector(slug: SectorSlug): Sector {
  const found = sectors.sectors.find((item) => item.slug === slug);
  if (!found) throw new Error(`No sector ${slug} in lib/content/site.ts`);
  return found;
}

/** The template's H1 pattern (plan: "Ecommerce for [sector] retailers with a showroom"), as the share images set it. */
const h1 = (name: string) => `Ecommerce for ${name} retailers with a showroom`;

const notWritten = (part: string) => stub(`The plan's sector template asks for ${part}; it writes them for furniture only.`);

// ------------------------------------------------------------------ furniture, written out in the plan

const furniture: SectorPage = {
  slug: 'furniture-retailers',
  path: sector('furniture-retailers').href,
  meta: {
    title: sector('furniture-retailers').titleTag,
    description:
      'Online for furniture retailers with a showroom: fabric and finish variants, lead times, two-person delivery, Google Shopping, and the showroom sale.',
  },
  h1: h1('furniture'),
  written: true,
  intro:
    'Furniture is bought slowly, in person, after a lot of looking online. Your website’s job is to get the right people into the showroom, sell the things that don’t need sitting on, and tell you what it did. Most furniture sites do none of the three well. I run online for furniture retailers who want all three.',
  problems: {
    heading: 'Five problems specific to furniture',
    items: [
      {
        title: 'The variants.',
        body: 'One sofa, four sizes, forty fabrics, three leg finishes. The theme shows a dropdown of 480 options or gives up and lists each as a separate product. Either way the buyer leaves.',
      },
      {
        title: 'Lead times.',
        body: '“Made to order, 8 to 10 weeks” is on a PDF in the showroom and nowhere on the site. The customer finds out at checkout, or after paying.',
      },
      {
        title: 'Delivery.',
        body: 'The site quotes £4.99 for a wardrobe, or hides delivery until the cart, or charges so much the basket is abandoned. Two-person delivery, assembly and collection need their own rules.',
      },
      {
        title: 'Google Shopping.',
        body: 'High-ticket items with missing dimensions and weights don’t show. Half the catalogue is ineligible and nobody knows.',
      },
      {
        title: 'The invisible sale.',
        body: 'The customer visited the site four times, came in on Saturday, paid in the showroom. The website gets no credit, so it gets no budget.',
      },
    ],
  },
  differently: {
    heading: 'What I do differently for furniture',
    items: [
      'Product architecture built for options',
      'Lead times and delivery on every product page, in the cart and in the confirmation email',
      'Google Shopping structured by margin and lead time, not by category',
      'Meta built for a six-week consideration window with sample and brochure follow-up flows',
      'Showroom appointment booking and footfall tracking so the site gets its credit',
      'Weekly report that shows online revenue and showroom leads side by side',
    ],
  },
  proof: {
    heading: 'Proof',
    // Plan: "Proof card. Xshowhome: 16,193 product records remediated, Gemma Pountney quote. Second card: Saverys of
    // Broadway, Gary Postlethwaite quote."
    cards: [
      { caseStudy: 'xshowhome', quoteBy: 'Gemma Pountney' },
      { caseStudy: 'saverys-of-broadway', quoteBy: 'Gary Postlethwaite' },
    ],
  },
  articles: {
    heading: 'Thinking for furniture retailers',
    // The two moved /blog posts about a furniture catalogue. The plan's furniture articles (weeks 1 to 6 and 12) are
    // not written; add the best of them here as they publish, to make three.
    slugs: ['shopify-product-data-audit-guide', 'shopify-taxonomy-guide-2025'],
  },
  faq: {
    ...faqHeading,
    items: [
      {
        question: 'Can a furniture retailer actually sell online, or is it all showroom?',
        answer: stub('The plan names the question and gives no answer.'),
      },
      {
        question: 'How do you handle made-to-order on Shopify?',
        answer: stub('The plan names the question and gives no answer.'),
      },
      {
        question: 'What does Google Shopping cost for furniture?',
        answer: stub('The plan names the question and gives no answer.'),
      },
      {
        question: 'Do you work with retailers outside the Midlands?',
        answer: 'Yes, UK wide; showrooms are visited at the start.',
      },
    ],
  },
  closing: closingActions,
  planNotes: [
    'Status: Launch.',
    'The five variants table lists the proof as Xshowhome (16,193 records), the Canwell Interiors rebuild and the Gary quote; the written-out page uses Xshowhome and Saverys cards, which is what is set here. Canwell figures are permission-gated.',
  ],
};

// ------------------------------------------------------------------ the other four: what the plan gives, then stubs

interface Variant {
  slug: SectorSlug;
  /** The sector as the H1 pattern and headings name it. */
  name: string;
  /** The sector as "What I do differently for [sector]" names it. */
  differentlyName: string;
  description: string;
  /** The variants table's "Sector-specific problems to name", each with a capital first letter. */
  problems: string[];
  planNotes: string[];
}

function variant({ slug, name, differentlyName, description, problems, planNotes }: Variant): SectorPage {
  return {
    slug,
    path: sector(slug).href,
    meta: { title: sector(slug).titleTag, description },
    h1: h1(name),
    written: false,
    intro: notWritten('a three-sentence intro: the sector’s online reality, what the site should do, who I am'),
    problems: {
      heading: `Five problems specific to ${differentlyName}`,
      items: problems.map((title) => ({
        title,
        body: stub('Two lines: what it looks like, what it costs. The plan names the problem only.'),
      })),
    },
    differently: {
      heading: `What I do differently for ${differentlyName}`,
      items: notWritten('five or six bullets drawn from the three offers, worded for the sector'),
    },
    proof: { heading: 'Proof', cards: notWritten('the matching case study as a card, with its headline number and a quote') },
    articles: {
      heading: `Thinking for ${name} retailers`,
      slugs: notWritten('three articles from the sector’s cluster'),
    },
    faq: { ...faqHeading, items: notWritten('four questions the sector’s owners ask, with answers') },
    closing: closingActions,
    planNotes,
  };
}

// The plan's variants table names Saverys of Broadway as homeware proof, and results.ts tags that case study homeware,
// so this page shows its card with Gary Postlethwaite's quote, as the furniture page does (Phase 3 integrate step). The
// rest of the page stays a stub and noindex.
const homeware: SectorPage = {
  ...variant({
    slug: 'homeware-and-gift-retailers',
    name: 'homeware and gift',
    differentlyName: 'homeware and gifts',
    description:
      'Online for independent homeware and gift retailers: supplier feeds, the Christmas peak, delivery pricing on a small basket, stock that matches the shop.',
    problems: [
      'Hundreds of small suppliers and no clean feed',
      'Seasonal peaks (Christmas is 40% of the year)',
      'Low AOV so delivery pricing makes or breaks margin',
      'Instagram brings followers not orders',
      'Stock in shop and online disagree',
    ],
    planNotes: [
      'Status: Launch.',
      'Proof to feature: Saverys of Broadway, Canwell. Canwell is not a case study and its figures are permission-gated.',
      'Articles: the plan has one homeware article (week 9).',
    ],
  }),
  proof: { heading: 'Proof', cards: [{ caseStudy: 'saverys-of-broadway', quoteBy: 'Gary Postlethwaite' }] },
};

const flooring = variant({
  slug: 'flooring-and-tile-retailers',
  name: 'flooring and tile',
  differentlyName: 'flooring and tiles',
  description:
    'Online for tile and flooring retailers: selling by the square metre and box, sample orders, quantity calculators, trade and retail pricing on one site.',
  problems: [
    'Selling by square metre and by box',
    'Sample ordering as the real conversion',
    'Room visualisers that don’t convert',
    'Calculators that give wrong quantities',
    'Trade and retail pricing on one site',
  ],
  planNotes: [
    'Status: Launch, with an honest proof line until a named case study exists. The proof line is not written.',
    'Proof to feature: Artisan Tile Company (portfolio); catalogue and feed work.',
    'Articles: the plan has two flooring articles (weeks 7 and 8).',
  ],
});

const lighting = variant({
  slug: 'lighting-retailers',
  name: 'lighting',
  differentlyName: 'lighting',
  description:
    'Online for lighting retailers with a showroom: technical attributes, bulb and fitting questions, Google Shopping errors, designer brand pricing.',
  problems: [
    'Thousands of SKUs with technical attributes (lumens, IP ratings, fittings)',
    'Bulb-included or not',
    'Compatibility questions that stall purchases',
    'Google Shopping attribute errors',
    'Designer brands with pricing rules',
  ],
  planNotes: [
    'Status: Hold until a lighting client or three strong articles exist.',
    'Proof to feature: catalogue and feed expertise; "your own lighting store experience". The voice rules example says "I haven’t run a lighting retailer yet"; settle which is true before the proof line is written.',
  ],
});

// The plan's variants table names Saverys (three showrooms, director role) as this sector's proof, so the page shows
// its card with Gary Postlethwaite's quote, as the homeware stub does (Phase 3 review). The rest stays a stub, noindex.
const kitchensAndBathrooms: SectorPage = {
  ...variant({
    slug: 'kitchen-and-bathroom-showrooms',
    name: 'kitchen and bathroom',
    differentlyName: 'kitchens and bathrooms',
    description:
      'Websites for kitchen and bathroom showrooms that book design appointments: quote follow-up, showroom visit tracking, accessories online, local search.',
    problems: [
      'The website’s job is a design appointment, not a basket',
      'Brochure requests and quote forms with no follow-up',
      'Showroom visit tracking',
      'Selling accessories and taps online while kitchens stay in-store',
      'Local search for showrooms',
    ],
    planNotes: [
      'Status: Hold until a KBB client or a kbbreview article exists.',
      'Proof to feature: Saverys (three showrooms, director role); the kbbreview angle on "the second showroom that doesn’t need a lease".',
    ],
  }),
  proof: { heading: 'Proof', cards: [{ caseStudy: 'saverys-of-broadway', quoteBy: 'Gary Postlethwaite' }] },
};

/** Every sector page, by slug, in the nav's order. */
export const sectorPages: Record<SectorSlug, SectorPage> = {
  'furniture-retailers': furniture,
  'lighting-retailers': lighting,
  'kitchen-and-bathroom-showrooms': kitchensAndBathrooms,
  'flooring-and-tile-retailers': flooring,
  'homeware-and-gift-retailers': homeware,
};

/** For generateStaticParams in app/(site)/sectors/[slug]. */
export const sectorSlugs = Object.keys(sectorPages) as SectorSlug[];
