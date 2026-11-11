import * as React from 'react';

import { Screen } from '@/components/site/Screen';
import { thankYouPage as page } from '@/lib/content/pages/contact';
import { contactSection } from '@/lib/content/site';
import { buildMetadata } from '@/lib/seo';

import { CaseStudyCard } from '../../results/_card';
import { caseStudyCardForHref } from '../../results/_cards';

// /contact/thank-you (plan, /contact: "After submission: a thank-you page that links to two case studies, so the wait
// isn't dead time"). noindex (lib/seo.ts). The copy is lib/content/pages/contact.ts: the brief form's confirmation,
// without the visitor's address, and its two case studies, set as the linked cards the Results index uses.
//
// The brief form on /contact posts here, so a visitor without JavaScript lands on this page; with JavaScript the form
// shows its own confirmation in place (brand book, Forms). Which of the two the site keeps is the owner's open decision.
//
// One screen: the eyebrow, H1 and body, the lead-in, then the two cards side by side from 720px.

export const metadata = buildMetadata('/contact/thank-you');

export default function ThankYouPage() {
  // Throws at build if either link stops naming a case study page.
  const cards = page.links.map((link) => caseStudyCardForHref(link.href));

  return (
    <Screen first labelledBy="page-heading">
      <header>
        <p className="eyebrow mb-space-2 text-ink-muted">{contactSection.eyebrow}</p>
        <h1 id="page-heading" className="display-2 mb-space-6 max-w-[24em] text-balance">
          {page.h1}
        </h1>
        <p className="body-lg max-w-measure-lg">{page.body}</p>
      </header>
      <div>
        <p className="body mb-space-6 max-w-measure">{page.followUpLead}</p>
        <ul className="grid grid-cols-1 gap-space-6 min-[720px]:grid-cols-2 min-[720px]:gap-x-space-6">
          {cards.map((card) => (
            <li key={card.slug} className="grid">
              <CaseStudyCard card={card} />
            </li>
          ))}
        </ul>
      </div>
    </Screen>
  );
}
