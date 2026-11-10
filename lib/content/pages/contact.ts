// /contact, /contact/thank-you, /scorecard, /privacy and /terms: the pages the plan describes in a line or two.
//
// /contact (plan: "Same form as the homepage, plus the Calendly embed", title tag given): the H1 and intro are the
// homepage form's heading and intro, verbatim, and the form is contactSection. /contact/thank-you (plan: "a thank-you
// page that links to two case studies") reuses the Phase 1 confirmation copy. /scorecard carries the homepage lead
// magnet's copy; the scorecard document is not written (plan, open decisions), so the page is noindex until it is.
//
// Drafts, pending Dan's approval: every meta description here, the title tags of /contact/thank-you, /scorecard,
// /privacy and /terms, the Calendly block's title, and the H1s of /contact/thank-you, /privacy and /terms.

import { contact, contactSection, leadMagnet } from '../site';
import { stub } from '../stub';
import type { ContactPage, LegalPage, ScorecardPage, ThankYouPage } from '../types';

export const contactPage: ContactPage = {
  meta: {
    // Plan, verbatim.
    title: 'Contact Atherstone Digital | Book a 30-minute call',
    description:
      'Tell me about your business in three to five lines, or book a 30-minute call. I read every brief myself.',
  },
  h1: contactSection.heading,
  intro: contactSection.intro,
  calendly: {
    // The button label everywhere else, verbatim.
    heading: 'Book a 30-minute call',
    url: contact.calendlyUrl,
    // The embed's iframe title, for screen readers.
    title: 'Book a 30-minute call with Dan Le Gresley (Calendly)',
  },
};

export const thankYouPage: ThankYouPage = {
  meta: {
    title: 'Thank You | Atherstone Digital',
    description: 'Your brief is with me. I read every brief myself and will reply with a few questions or a time to talk.',
  },
  // Phase 1 drafts, from the brief form's confirmation (contactSection.confirmation), without the visitor's address.
  h1: 'Thank you. Your brief is with me.',
  body: 'I read every brief myself and will reply with a few questions or a time to talk.',
  followUpLead: contactSection.confirmation.followUpLead,
  links: contactSection.confirmation.links,
};

export const scorecardPage: ScorecardPage = {
  meta: {
    // The plan names the lead magnet in title case; as a title tag it keeps that.
    title: 'The Showroom Retailer’s Online Scorecard | Atherstone Digital',
    description:
      'The seven numbers a showroom retailer should check every Monday morning, and what each one says about the website. Two pages, sent by email.',
  },
  h1: leadMagnet.heading,
  intro: leadMagnet.description,
  document: stub(
    'The seven numbers and what each says about the website. Not written yet: the plan’s open decision is to write it before launch, or launch the form with a two-week delivery promise.',
  ),
};

export const privacyPage: LegalPage = {
  meta: {
    title: 'Privacy Policy | Atherstone Digital',
    description: 'How Atherstone Digital collects, uses and protects your data under UK GDPR.',
  },
  h1: 'Privacy policy',
  // The pre-rebuild text is dated October 2023 and needs updating for the brief form's new fields, the Calendly embed
  // and GA4 before launch.
  source: 'app/(legacy)/privacy/page.tsx',
};

export const termsPage: LegalPage = {
  meta: {
    title: 'Terms of Service | Atherstone Digital',
    description: 'The terms on which Atherstone Digital provides its ecommerce services.',
  },
  h1: 'Terms of service',
  source: 'app/(legacy)/terms/page.tsx',
};
