// /agency-or-in-house (plan, Results, About, Insights, Contact > /agency-or-in-house). The plan gives the title tag,
// the H1 and the structure; the body is not written beyond the homepage's comparison (comparison in lib/content/site.ts),
// which the page carries. The rest is stubbed with the plan's headings, so the page is noindex until written (Phase 3
// decision 4). Approved by Dan on 12 Nov 2026: the meta description and the section headings, each the plan's own
// phrase for the part with a capital first letter.

import { closingActions, comparison, faqHeading } from '../site';
import { stub } from '../stub';
import type { AgencyOrInHousePage } from '../types';

export const agencyOrInHousePage: AgencyOrInHousePage = {
  meta: {
    // Plan, verbatim. It breaks the "| Atherstone Digital" pattern, as the plan wrote it.
    title: 'Agency, In-House Head of Ecommerce, or a Director? A Guide for Interiors Retailers',
    // Approved by Dan on 12 Nov 2026.
    description:
      'Agency, full-time head of ecommerce, or a part-time ecommerce director: what each costs a showroom retailer, when each is right, what to ask first.',
  },
  h1: 'Agency, in-house, or an ecommerce director: which one should a showroom retailer buy?',
  comparisonHeading: comparison.heading,
  honestCase: {
    heading: 'The honest case for each option',
    paragraphs: stub(
      'When an agency is right (a one-off build with an in-house team to run it); when a hire is right (over £10M, or when online is more than half the business); when the director is right.',
    ),
  },
  fullCost: {
    heading: 'The full cost of each',
    paragraphs: stub('A table with real UK figures and their sources. Never estimates without a source.'),
  },
  questions: {
    heading: 'The questions to ask any of the three before signing',
    items: stub('The questions an owner should put to an agency, a candidate and a director.'),
  },
  directorFit: {
    heading: 'Where the director model fits and where it doesn’t',
    paragraphs: stub('Written so it would still be useful if the reader chose someone else.'),
  },
  faq: { ...faqHeading, items: stub('The plan asks for a FAQ and writes no questions.') },
  closing: closingActions,
  planNotes: [
    'Replaces Why Not An Agency: the old page argues against agencies; this one helps an owner choose.',
    'The week 10 article targets the same term ("ecommerce agency vs in-house"). Decide which page owns it before writing either.',
  ],
};
