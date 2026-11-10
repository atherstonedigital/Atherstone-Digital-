// /about (plan, Results, About, Insights, Contact > /about): the title tag and H1 are the plan's. The plan gives the
// page's structure and facts, not its copy, so the body is written here from those facts in the voice rules (Phase 3
// decision 5). Sentences taken word for word from the plan say so in a comment; every other sentence, the section
// headings, the meta description and the portrait's alt text are DRAFTS for Dan to approve.
//
// Held back: the plan's career paragraph ends the Licklibrary line with a revenue growth figure. It is not on the live
// site, so under the public repo rule it stays out until Dan clears it.

import { closingActions, meetDan } from '../site';
import type { AboutPage } from '../types';

export const aboutPage: AboutPage = {
  meta: {
    // Plan, verbatim. It breaks the "| Atherstone Digital" pattern, as the plan wrote it.
    title: 'About Dan Le Gresley | Ecommerce Director for Interiors Retailers',
    // Draft.
    description:
      'Dan Le Gresley runs online for furniture and interiors retailers: twenty years in ecommerce and digital, Shopify Partner since 2014, hands on, paid monthly.',
  },
  h1: 'Twenty years making the commercial side of digital work',
  // The interiors work first: three retailers, five showrooms, what the week looks like.
  interiors: {
    heading: 'The interiors work',
    paragraphs: [
      // Draft, from the plan's hero fact line and its Meet Dan bio.
      'I run online for three UK interiors retailers across five showrooms. The work runs from a 16,000-product furniture catalogue to a three-showroom group’s weekly trading report.',
      // Draft, from the plan's "What a month looks like" and How it works.
      'Each week has the same shape: a sprint agreed with the owner, the work done, and the numbers on Monday morning. Each month there is a commercial review, and each quarter a plan set against the trading calendar.',
    ],
  },
  // The career in one paragraph.
  career: {
    heading: 'The career',
    paragraphs: [
      // The first three sentences are the plan's Meet Dan bio, verbatim (lib/content/site.ts, meetDan); the last is a
      // draft from the plan's Ranch Creative facts.
      'Twenty years in ecommerce and digital. Blue chip work for GSK, Amazon, Ecolab, Eli Lilly and The Economist. Seven years as Digital Director at Licklibrary. Ranch Creative brings me in on its clients’ ecommerce, including a home and interiors brand that reached £250k monthly revenue within six months.',
    ],
  },
  // How I work: hands on, one invoice, weekly numbers, say no to work that won't pay back.
  howIWork: {
    heading: 'How I work',
    paragraphs: [
      // Verbatim from the plan's Meet Dan bio.
      'I own the strategy, write the code, run the ads and ship the automations. One person, one invoice, everything connected.',
      // Draft, then the plan's FAQ answer verbatim ("If the right answer is to spend less, I’ll say so.").
      'You get the numbers every Monday. I say no to work that won’t pay back. If the right answer is to spend less, I’ll say so.',
    ],
  },
  // One paragraph on the band: owning it reads better than a buyer finding it on Google first.
  band: {
    heading: 'Before ecommerce',
    paragraphs: [
      // Draft from the plan's facts; the last sentence keeps the plan's own words.
      'Before ecommerce there was a band. I was signed to Sony with The Milk, with a UK Top 40 and a BBC 6 Music Album of the Year. Then twenty years applying the same discipline to other people’s businesses.',
    ],
  },
  // Credentials row: the plan's wording, as on the homepage (decision 6).
  credentials: { heading: 'Credentials', items: meetDan.credentials },
  // Draft.
  portraitAlt: 'Dan Le Gresley',
  closing: closingActions,
};
