import * as React from 'react';

import { LinkButton } from '@/components/brand/Button';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { ContactForm } from '@/components/site/ContactForm';
import { DirectLines } from '@/components/site/DirectLines';
import { Screen } from '@/components/site/Screen';
import { contactPage as page } from '@/lib/content/pages/contact';
import { contactSection } from '@/lib/content/site';
import type { Link as SiteLink } from '@/lib/content/types';
import { buildMetadata } from '@/lib/seo';

// /contact (plan: "Same form as the homepage, plus the Calendly embed"; title tag "Contact Atherstone Digital | Book a
// 30-minute call"). The H1 and intro are the homepage form's heading and intro, verbatim (lib/content/pages/contact.ts),
// the form is the homepage's ContactForm on paper, and the call booking sits beside it.
//
// The Calendly booking is a primary button to the Calendly page, not an inline embed. The embed works in a static
// export (a script and an iframe from calendly.com), but it fails the brand: it draws Calendly's own type, rounded
// buttons and colours, which the brand book rules out (Type: no third face; Rules: nothing rounder than radius-md;
// Colour: never a hard-coded hex, and the widget's colours can only be set as hex, so it cannot follow the dark theme),
// it adds third-party script and cookies the 2023 privacy text does not cover, and it costs the Lighthouse budget
// (brand book, Checks). The button opens the same booking page.
//
// The form posts to /contact/thank-you rather than "/": with JavaScript the visitor still sees the form's own
// confirmation in place (brand book, Forms); without it, the browser lands on the thank-you page the plan describes,
// instead of Netlify's generic success page. Netlify Forms accepts a post to any static path.
//
// Layout: from 900px a split on the page's one split line, as the homepage's contact band (Phase 2.4, design-taste-
// frontend's split-pair and container-edges): the H1, intro and the call booking on the left half, the form on the
// right half, two halves 24px apart (the form at x 732 at 1440), its top level with the H1's eyebrow. The split has
// exactly two columns, the left one holding the heading and the call booking, so the form's field rows are measured
// in their own column (the gate's row-lines). In a half below 1200px the form sets its fields one under another (its
// own container queries). Below 900px one column in the same order as the markup, so what is read and tabbed through
// matches what is seen: the heading and intro, the call booking, then the form.

export const metadata = buildMetadata('/contact');

/**
 * Phase 3 draft, pending Dan's approval: the call button's label (the section heading above it already says "Book a
 * 30-minute call", so the button says what happens next). The direct lines' labels are DirectLines' drafts.
 */
const callDraft = { button: 'Choose a time' } as const;

const booking: SiteLink = { label: callDraft.button, href: page.calendly.url, external: true };

export default function ContactPage() {
  return (
    <Screen first as="div">
      <div className="grid grid-cols-1 gap-y-space-12 min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-x-space-6">
        <div className="grid grid-cols-1 gap-y-space-12">
          <header>
            <p className="eyebrow mb-space-2 text-ink-muted">{contactSection.eyebrow}</p>
            <h1 id="page-heading" className="display-2 mb-space-6 max-w-[24em] text-balance">
              {page.h1}
            </h1>
            <p className="body-lg max-w-measure-lg">{page.intro}</p>
          </header>

          <section aria-labelledby="call-heading" className="min-w-0">
            <SectionHeading heading={page.calendly.heading} headingId="call-heading" />
            <LinkButton link={booking} className="w-full min-[720px]:w-auto" />
            {/* Direct lines as ledger rows (components/site/DirectLines.tsx), as the homepage contact band sets them. */}
            <DirectLines className="mt-space-8" />
          </section>
        </div>

        <ContactForm labelledBy="page-heading" endpoint="/contact/thank-you" className="min-w-0" />
      </div>
    </Screen>
  );
}
