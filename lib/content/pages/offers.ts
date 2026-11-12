// The three offer pages, verbatim from docs/site-plan.md, Service pages. Title tags, meta descriptions and H1s are the
// ones lib/content/site.ts already holds for the offer cards (offers.offers[].page), so the two never drift.
// Apostrophes are set typographically. The bold run-in labels in the plan ("Who this is for.") become the section
// headings without their full stops; the plan's instructions to the builder ("A table, two columns", "Eight areas,
// each with two lines") are not copy and are not carried. Phase 3 picks, not the plan's: the two case studies each
// page links to, the table caption, and capital first letters on list items the plan runs inline.

import { closingActions, ecommerceDirectorFaq, faqHeading, offers } from '../site';
import type { BuildsPage, EcommerceDirectorPage, Offer, OfferId, SectorSlug, StoreHealthCheckPage } from '../types';

function offer(id: OfferId): Offer {
  const found = offers.offers.find((item) => item.id === id);
  if (!found) throw new Error(`No offer ${id} in lib/content/site.ts`);
  return found;
}

function head(id: OfferId) {
  const { title, description, h1 } = offer(id).page;
  return { meta: { title, description }, h1 };
}

/** Every offer page links to the sector pages (plan, Internal linking rules). */
const allSectors: SectorSlug[] = [
  'furniture-retailers',
  'lighting-retailers',
  'kitchen-and-bathroom-showrooms',
  'flooring-and-tile-retailers',
  'homeware-and-gift-retailers',
];

// ------------------------------------------------------------------ /ecommerce-director

export const ecommerceDirectorPage: EcommerceDirectorPage = {
  id: 'ecommerce-director',
  path: '/ecommerce-director',
  ...head('ecommerce-director'),
  intro:
    'Most furniture and interiors retailers between £1M and £10M have the same gap. The owner knows online should be doing more. There’s an agency, or a freelancer, or a keen member of staff who also does the Instagram. Nobody senior owns the number. This is the role that fills the gap, part-time, hands on.',
  whoFor: {
    heading: 'Who this is for',
    paragraphs: [
      'Owner-led or family-run retailers with at least one showroom. A Shopify site, or a plan to move to one. Annual turnover £1M to £10M including the shop floor. A catalogue big enough that product data is a job in itself. No head of ecommerce in the building.',
    ],
  },
  whatIOwn: {
    heading: 'What I own',
    caption: 'What I own',
    columns: ['Area', 'What that means week to week'],
    rows: [
      ['The number', 'Online revenue, margin and the showroom leads the site generates, reported every Monday'],
      ['The site', 'Shopify theme, speed, product pages, checkout, fixes and improvements shipped weekly'],
      [
        'Catalogue and feeds',
        'Product data, variants, dimensions, images, Google Merchant Center health, supplier imports',
      ],
      [
        'Paid media',
        'Google Shopping, Search and Performance Max; Meta prospecting and retargeting built for long consideration',
      ],
      ['Email', 'Klaviyo flows and campaigns: welcome, browse and cart recovery, post-delivery, sample follow-up'],
      ['Tracking', 'GA4, Shopify and ad platforms agreeing with each other, so decisions are made on real figures'],
      ['Automation', 'The repetitive jobs (feed updates, stock syncs, report building) removed from people’s weeks'],
      [
        'Your other suppliers',
        'Direction for any developer, photographer or agency you already use, so the work joins up',
      ],
    ],
  },
  month: {
    heading: 'What a month looks like',
    paragraphs: [
      'Weekly sprint with agreed priorities. Monday performance report to the owner. Monthly commercial review: what moved, what didn’t, what’s next. Quarterly plan against the business’s trading calendar (January sale, spring, autumn ranges, Black Friday).',
    ],
  },
  notIncluded: {
    heading: 'What you don’t get',
    paragraphs: [
      'A team of juniors. A pitch for more services every month. A twelve-month lock-in. Someone who disappears after the site launches.',
    ],
  },
  pricing: {
    heading: 'Pricing',
    paragraphs: [
      'From £3,000 a month for two days a week equivalent, rolling monthly, 30 days’ notice. Three and four-day arrangements quoted. The Health Check fee is credited against the first month.',
    ],
  },
  // The plan runs each list inline after its label; as bullets, each item takes a capital first letter.
  fit: {
    heading: 'Is this a fit?',
    good: {
      label: 'A good fit',
      items: [
        'You have a showroom and a website and want them to work as one business',
        'You’re spending on ads and can’t see what they return',
        'Your catalogue is in the thousands and you know some of it is wrong',
        'You want one accountable person, not a roster of suppliers',
      ],
    },
    notFit: {
      label: 'Not a fit',
      items: [
        'You want a one-off website and nothing after',
        'You’re under £500k and the maths doesn’t work yet',
        'You want someone to execute a plan you’ve already fixed, without challenge',
      ],
    },
  },
  faq: { ...faqHeading, items: ecommerceDirectorFaq.items },
  closing: closingActions,
  links: {
    offers: ['store-health-check', 'shopify-builds-and-migrations'],
    sectors: allSectors,
    // Phase 3 pick: the plan does not name the two case studies. Saverys is the director role across three showrooms;
    // the Ranch client is the retainer's revenue result.
    caseStudies: ['saverys-of-broadway', 'ranch-creative'],
  },
  service: {
    name: offer('ecommerce-director').name,
    description: offer('ecommerce-director').summary,
    price: { from: 3000, unit: 'MONTH' },
  },
};

// ------------------------------------------------------------------ /store-health-check

export const storeHealthCheckPage: StoreHealthCheckPage = {
  id: 'store-health-check',
  path: '/store-health-check',
  ...head('store-health-check'),
  intro:
    'Most interiors retailers are losing money in places nobody is looking: products with missing dimensions that never show in Google Shopping, a GA4 property that disagrees with Shopify by 30%, Meta campaigns optimised for a purchase that takes six weeks to happen. This is the audit that finds them and puts a number on each.',
  checked: {
    heading: 'What gets checked',
    items: [
      {
        title: 'Catalogue data.',
        body: 'Dimensions, variants, finishes, images, alt text, categories, duplicates, products that can’t be bought.',
      },
      {
        title: 'Google Shopping and Merchant Center.',
        body: 'Disapprovals, missing attributes, feed structure, what share of the catalogue is actually eligible to show.',
      },
      {
        title: 'Tracking.',
        body: 'GA4, Shopify, Google Ads and Meta reconciled. Which numbers you can trust and which you can’t.',
      },
      {
        title: 'Site performance.',
        body: 'Speed, mobile product pages, navigation, search, what happens between “found it” and “bought it”.',
      },
      {
        title: 'Delivery, lead times and samples.',
        body: 'How clearly the site answers the three questions every furniture buyer asks before paying.',
      },
      { title: 'Paid media structure.', body: 'Campaign architecture, audiences, bidding, waste.' },
      { title: 'Email.', body: 'Flows in place, flows missing, revenue attributed.' },
      {
        title: 'Showroom connection.',
        body: 'How the site sends people to the showroom, and whether anyone can see it.',
      },
    ],
  },
  deliverables: {
    heading: 'What you get',
    paragraphs: [
      'A written report, ranked by what each problem is costing. A 90-day plan in priority order. A 60-minute walkthrough with you. Everything in plain English, built so your team or your existing agency could act on it without me.',
    ],
  },
  pricing: {
    heading: 'Pricing',
    intro: 'By catalogue size, because the catalogue is where the time goes:',
    // The plan writes the sizes in lower case inside a sentence; as table labels they take a capital. No tier is
    // highlighted (Phase 3 review): the plan names none, and the catalogue size sets the tier, so no tier is one the
    // reader chooses. To mark one, set `highlight` on it and give the table a highlightLabel Dan has approved.
    tiers: [
      { label: 'Under 1,000 products', price: '£1,500' },
      { label: '1,000 to 5,000 products', price: '£3,000' },
      { label: 'Over 5,000 products', price: '£5,000' },
    ],
    // Phase 3 copy, approved by Dan on 12 Nov 2026: the tier table's caption (screen readers only) and its column heads.
    table: {
      caption: 'Store and Catalogue Health Check prices by catalogue size',
      columns: ['Catalogue size', 'Price'],
    },
    note: 'Fixed, agreed up front. Credited in full against the first month if you go on to the retainer.',
  },
  faq: {
    ...faqHeading,
    items: [
      {
        question: 'Is this a sales pitch for the retainer?',
        answer:
          'It’s the diagnostic I’d run in week one anyway. About half of clients take the report and act on it themselves or with their existing team. That’s fine.',
      },
      {
        question: 'What do you need from us?',
        answer:
          'Read access to Shopify, GA4, Google Ads, Merchant Center, Meta and Klaviyo. An hour with whoever manages products. That’s it.',
      },
      {
        question: 'Two weeks from when?',
        answer: 'From access being granted. Most reports land in eight to ten working days.',
      },
    ],
  },
  closing: closingActions,
  links: {
    offers: ['ecommerce-director', 'shopify-builds-and-migrations'],
    sectors: allSectors,
    // Phase 3 pick: Xshowhome is the catalogue the Health Check finds; Saverys is the enquiry-led showroom site.
    caseStudies: ['xshowhome', 'saverys-of-broadway'],
  },
  service: {
    name: offer('store-health-check').name,
    description: offer('store-health-check').summary,
    price: {
      tiers: [
        { name: 'Under 1,000 products', price: 1500 },
        { name: '1,000 to 5,000 products', price: 3000 },
        { name: 'Over 5,000 products', price: 5000 },
      ],
    },
  },
};

// ------------------------------------------------------------------ /shopify-builds-and-migrations

export const buildsPage: BuildsPage = {
  id: 'shopify-builds-and-migrations',
  path: '/shopify-builds-and-migrations',
  ...head('shopify-builds-and-migrations'),
  intro:
    'Furniture and interiors stores fail on Shopify for predictable reasons: a theme that can’t handle fabric, finish and size variants; no way to show lead times; samples bolted on as an afterthought; delivery rules that quote £4.99 for a sofa. I’ve fixed all of these on live stores. I build them in from the start.',
  builtForTheSector: {
    heading: 'Built for the sector',
    items: [
      'Multi-dimension variants (fabric, finish, size, configuration) without a 400-option dropdown',
      'Made-to-order lead times shown on the product, in the cart and in the confirmation',
      'Sample and swatch ordering that feeds the follow-up email flow',
      'Delivery zones, two-person delivery, assembly and collection rules that quote correctly',
      'Room and collection merchandising that matches how the showroom is laid out',
      'Trade and designer accounts with their own pricing',
      'Showroom pages with appointment booking, so the site’s job in the sale is visible',
      'Supplier feed imports and stock sync, so the catalogue stays right after launch',
    ],
  },
  migrations: {
    heading: 'Migrations',
    paragraphs: [
      'WooCommerce, Magento, Visualsoft, bespoke. Every URL mapped and redirected, product data cleaned on the way across rather than copied dirty, rankings tracked before and after.',
    ],
  },
  howItRuns: {
    heading: 'How it runs',
    paragraphs: [
      'Health Check first, so the build fixes real problems. Fixed quote. Six to twelve weeks depending on catalogue size. Weekly show-and-tell. Launch, then thirty days of fixes included. Most clients move onto the retainer after that; none are required to.',
    ],
  },
  pricing: {
    heading: 'Pricing',
    paragraphs: ['Quoted after a scoping call. The Health Check is the usual first step and its fee is credited.'],
  },
  faq: {
    ...faqHeading,
    items: [
      {
        question: 'Shopify or Shopify Plus?',
        answer:
          'Standard Shopify for almost everyone under £10M. I’ll tell you when Plus pays for itself, and it’s later than agencies suggest.',
      },
      {
        question: 'Will we lose our Google rankings?',
        answer: 'Not if the migration is done properly. Every URL is mapped before anything moves.',
      },
      {
        question: 'Can you work with our existing designer?',
        answer: 'Yes. I’ll build what they design, or design and build both.',
      },
      {
        question: 'What about our EPOS or ERP?',
        answer: 'Most common systems connect. The scoping call covers yours.',
      },
    ],
  },
  closing: closingActions,
  links: {
    offers: ['ecommerce-director', 'store-health-check'],
    sectors: allSectors,
    // Phase 3 pick: the plan's from-launch proof for builds (Canwell Interiors) is not a case study and its figures are
    // permission-gated. Saverys of Broadway is a new showroom site; Xshowhome is the catalogue a build has to carry.
    caseStudies: ['saverys-of-broadway', 'xshowhome'],
  },
  service: {
    name: offer('shopify-builds-and-migrations').name,
    description: offer('shopify-builds-and-migrations').summary,
  },
};

export const offerPages = {
  'ecommerce-director': ecommerceDirectorPage,
  'store-health-check': storeHealthCheckPage,
  'shopify-builds-and-migrations': buildsPage,
} as const;
