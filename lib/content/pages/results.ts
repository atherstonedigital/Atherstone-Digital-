// The Results index and the case studies (plan, Results: /results and /results/[client], "Write these four first",
// then Licklibrary as a fifth). The plan writes no case study body, so every page is the eight-part template with the
// plan's headline and the allowed figures, and stubs for the rest (Phase 3 decision 4). All five are noindex until
// written; the index lists them.
//
// Public repo rule (decision 1): the only figures here are the ones already public on the live site (16,193 records,
// 120+ hours a month, £250k monthly revenue within six months via Ranch Creative) and the Xshowhome proof block that
// Xshowhome cleared in writing on 12 Nov 2026 (lib/content/proof-data.ts). Turnover bands, Xshowhome's sessions and
// Search Console figures, and every Saverys and Canwell figure wait for the client's written permission and never
// enter this repository.
//
// Drafts, pending Dan's approval: every case study title tag and meta description, the index's title tag, meta
// description and H1, the filter's "All" label, Xshowhome's business line, and the slugs (the plan defines none).

import type { PhotoName } from '../../images';
import { problemTags } from '../site';
import { stub } from '../stub';
import type { CaseStudyPage, ResultsIndexPage } from '../types';

/** The case study template's part headings (plan, Results: the case study template). */
const parts = {
  problem: 'The problem',
  whatIDid: 'What I did',
  result: 'The result',
  whatsNext: 'What’s next',
} as const;

const toFollow = {
  problem: stub('The problem, in the owner’s words where possible.'),
  whatIDid: stub('Four to six concrete items, dated.'),
  result: stub('Numbers first, then what changed day to day for the business. Only figures the client has cleared.'),
  whatsNext: stub('One line, so the page reads as an ongoing relationship, not a finished project.'),
};

const xshowhome: CaseStudyPage = {
  meta: {
    title: 'Xshowhome: Shopify Catalogue Cleanup | Atherstone Digital',
    description:
      'Xshowhome, a furniture retailer on Shopify: 16,193 product records remediated across the catalogue, feeds, Meta and Google.',
  },
  h1: 'Xshowhome',
  caseStudy: {
    slug: 'xshowhome',
    href: '/results/xshowhome',
    title: 'Xshowhome',
    // Draft from the plan's facts: a furniture retailer (homepage proof block), selling on Shopify (Results evidence).
    business: 'A furniture retailer selling online on Shopify.',
    stat: { figure: '16,193', line: 'Product records remediated in one furniture catalogue' },
    sector: { label: 'Furniture', slug: 'furniture-retailers' },
    problems: ['catalogue', 'feeds', 'paid'],
    quoteBy: 'Gemma Pountney',
  },
  written: false,
  summary: '16,193 product records remediated; catalogue, feeds, Meta and Google',
  problem: { heading: parts.problem, paragraphs: toFollow.problem },
  whatIDid: { heading: parts.whatIDid, items: toFollow.whatIDid },
  result: { heading: parts.result, paragraphs: toFollow.result },
  quoteBy: 'Gemma Pountney',
  whatsNext: { heading: parts.whatsNext, paragraphs: toFollow.whatsNext },
  links: {
    offer: 'store-health-check',
    sector: 'furniture-retailers',
    // The two moved /blog posts about this catalogue's alt text and taxonomy.
    articles: ['shopify-product-data-audit-guide', 'shopify-taxonomy-guide-2025'],
  },
  planNotes: [
    'Gary cleared the homepage proof block in writing on 12 Nov 2026 (online revenue, orders, Google Ads ROAS, conversion rate and the revenue chart, in lib/content/proof-data.ts). The turnover band still needs his written permission. The name and the quote are already public on the live site.',
    'Its other proof (sessions, Meta ROAS, Search Console) is permission-gated and stays out of this repository.',
    'The plan pairs it with the week 5 article, "16,193 wrong product records", as its companion.',
  ],
};

const saverys: CaseStudyPage = {
  meta: {
    title: 'Saverys of Broadway Case Study | Atherstone Digital',
    description:
      'Saverys of Broadway: ecommerce director across three showrooms, and a weekly trading report to the owner.',
  },
  h1: 'Saverys of Broadway',
  caseStudy: {
    slug: 'saverys-of-broadway',
    href: '/results/saverys-of-broadway',
    title: 'Saverys of Broadway',
    business: stub('Sector, showrooms, platform, turnover band (with permission), what online was doing before.'),
    // The plan's headline has no number, so there is no StatBlock.
    sector: { label: 'Homeware and gifts', slug: 'homeware-and-gift-retailers' },
    problems: [],
    quoteBy: 'Gary Postlethwaite',
  },
  written: false,
  summary: 'Ecommerce director across three showrooms; weekly trading report to the owner',
  ...toFollowParts(),
  quoteBy: 'Gary Postlethwaite',
  links: { offer: 'ecommerce-director', sector: 'homeware-and-gift-retailers', articles: stub('Two related articles.') },
  planNotes: [
    'Needs the same written permission as Xshowhome; decide how much of the group structure to describe.',
    'Sector: the plan features Saverys on the furniture page and lists it as proof for homeware and for kitchens and bathrooms. Homeware is set here; confirm.',
    'Problem tags: the plan names none.',
  ],
};

const ranch: CaseStudyPage = {
  meta: {
    title: 'Home & Interiors Brand via Ranch Creative | Atherstone Digital',
    description: '£250k monthly revenue within six months for a home and interiors brand, via Ranch Creative.',
  },
  h1: 'A home and interiors brand, via Ranch Creative',
  caseStudy: {
    slug: 'ranch-creative',
    href: '/results/ranch-creative',
    // The plan's fallback until the brand can be named: "a home and interiors brand, via Ranch Creative".
    title: 'A home and interiors brand, via Ranch Creative',
    business: stub('Sector, platform, what online was doing before. The brand is not named without permission.'),
    stat: { figure: '£250k', line: 'Monthly revenue within six months' },
    sector: { label: 'Home and interiors' },
    problems: [],
    quoteBy: 'Luke Aling',
  },
  written: false,
  summary: '£250k monthly revenue within six months, home and interiors',
  ...toFollowParts(),
  quoteBy: 'Luke Aling',
  links: { offer: 'ecommerce-director', articles: stub('Two related articles.') },
  planNotes: [
    'Needs permission to name the brand; until then it publishes as "a home and interiors brand, via Ranch Creative" with Luke’s quote.',
    'Sector and problem tags: the plan names neither.',
  ],
};

const miracleMoon: CaseStudyPage = {
  meta: {
    title: 'Miracle Moon: Ecommerce Automation | Atherstone Digital',
    description: '120+ hours a month of manual work automated for Miracle Moon, a wellness brand.',
  },
  h1: 'Miracle Moon',
  caseStudy: {
    slug: 'miracle-moon',
    href: '/results/miracle-moon',
    title: 'Miracle Moon',
    business: stub('Sector, platform, what online was doing before.'),
    stat: { figure: '120+', line: 'Hours a month of manual work automated' },
    sector: { label: 'Wellness' },
    problems: [],
  },
  written: false,
  summary: '120+ hours a month automated',
  ...toFollowParts(),
  links: {
    offer: 'ecommerce-director',
    // Two moved /blog posts on n8n automation.
    articles: ['n8n-shopify-automation-workflows', 'ecommerce-automation-roi-guide'],
  },
  planNotes: ['Not interiors: publish, tag "wellness", keep off the homepage proof block.'],
};

const licklibrary: CaseStudyPage = {
  meta: {
    title: 'Licklibrary: Ecommerce Analytics | Atherstone Digital',
    description: 'Licklibrary, where I spent seven years as Digital Director: the analytics story.',
  },
  h1: 'Licklibrary',
  caseStudy: {
    slug: 'licklibrary',
    href: '/results/licklibrary',
    title: 'Licklibrary',
    business: stub('Sector, platform, what online was doing before.'),
    // The plan's line has no number; the revenue figure in the About copy is held back (see lib/content/pages/about.ts).
    sector: { label: 'Digital' },
    problems: ['tracking'],
  },
  written: false,
  summary: stub('The plan keeps Licklibrary "for the analytics story" and writes no headline.'),
  ...toFollowParts(),
  links: { offer: 'ecommerce-director', articles: stub('Two related articles.') },
  planNotes: ['A fifth case study, tagged "digital", for the analytics story. Problem tag "tracking" is a Phase 3 reading of that.'],
};

function toFollowParts() {
  return {
    problem: { heading: parts.problem, paragraphs: toFollow.problem },
    whatIDid: { heading: parts.whatIDid, items: toFollow.whatIDid },
    result: { heading: parts.result, paragraphs: toFollow.result },
    whatsNext: { heading: parts.whatsNext, paragraphs: toFollow.whatsNext },
  };
}

/** Every case study, by slug, in the index's order. */
export const caseStudyPages: Record<string, CaseStudyPage> = {
  xshowhome,
  'saverys-of-broadway': saverys,
  'ranch-creative': ranch,
  'miracle-moon': miracleMoon,
  licklibrary,
};

/** For generateStaticParams in app/(site)/results/[slug]. */
export const caseStudySlugs = Object.keys(caseStudyPages);

/**
 * The CaseStudyHeader photograph, by slug (Phase 2.6, step 3: "Xshowhome and Saverys each take their matching
 * photograph"). Only the client's own: Saverys takes its fabric library at 3:2. Xshowhome has no photograph of its own
 * yet (the Canwell showroom is another business), so its header keeps the StatBlock alone until Dan's shoot supplies
 * one (brief, "After this pass"). The others have none.
 */
export const caseStudyPhotos: Partial<Record<string, PhotoName>> = {
  'saverys-of-broadway': 'saverysFabricLibrary',
};

export const resultsIndexPage: ResultsIndexPage = {
  meta: {
    title: 'Furniture & Interiors Ecommerce Case Studies | Atherstone Digital',
    description:
      'Case studies from furniture and interiors retailers: what was wrong, what I did and what changed, with figures where the client has cleared them.',
  },
  // Phase 3 draft, pending Dan's approval: the plan writes no H1 for the index, and its title rule wants the H1 to
  // match the title tag's intent ("Furniture & Interiors Ecommerce Case Studies", primary term "ecommerce case studies
  // furniture"). "Results" stays the page's label in the nav, the breadcrumbs and the offer pages' case-study block.
  h1: 'Case studies from furniture and interiors retailers',
  label: 'Results',
  intro: stub('The plan gives the index a job (proof, filterable by sector and by problem) but no copy.'),
  // Sector and Problem are the Phase 2 tag labels (components/site/CaseStudyHeader.tsx); problem values are problemTags.
  filters: { sector: 'Sector', problem: 'Problem', all: 'All' },
  order: caseStudySlugs,
};

/** The problem labels, re-exported for the filter. */
export { problemTags };
