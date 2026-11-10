import * as React from 'react';

import { LinkButton, TextLink } from '@/components/brand/Button';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { ContactForm } from '@/components/site/ContactForm';
import { Screen } from '@/components/site/Screen';
import { contactPage as page } from '@/lib/content/pages/contact';
import { contact, contactSection } from '@/lib/content/site';
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
// Layout: one screen. From 900px the H1, intro and the call booking take columns 1 to 5 and the form 6 to 12, its top
// level with the H1's eyebrow; below 900px the heading and intro, the form, then the call booking.

export const metadata = buildMetadata('/contact');

/**
 * Phase 3 drafts, pending Dan's approval: the call button's label (the section heading above it already says "Book a
 * 30-minute call", so the button says what happens next) and the label for the phone number. "Email" is the brief
 * form's own field label.
 */
const callDraft = { button: 'Choose a time', email: 'Email', phone: 'Phone' } as const;

const booking: SiteLink = { label: callDraft.button, href: page.calendly.url, external: true };

const directLines: { label: string; link: SiteLink }[] = [
  { label: callDraft.email, link: { label: contact.email, href: contact.emailHref } },
  { label: callDraft.phone, link: { label: contact.phoneDisplay, href: contact.phoneHref } },
];

export default function ContactPage() {
  return (
    <Screen first as="div">
      <div className="grid grid-cols-1 gap-y-space-12 min-[900px]:grid-cols-12 min-[900px]:items-start min-[900px]:gap-x-gutter">
        <header className="min-[900px]:col-span-5 min-[900px]:row-start-1">
          <p className="eyebrow mb-space-2 text-ink-muted">{contactSection.eyebrow}</p>
          <h1 id="page-heading" className="display-2 mb-space-6 max-w-[24em] text-balance">
            {page.h1}
          </h1>
          <p className="body-lg max-w-measure-lg">{page.intro}</p>
        </header>

        <ContactForm
          labelledBy="page-heading"
          endpoint="/contact/thank-you"
          className="min-w-0 min-[900px]:col-span-7 min-[900px]:col-start-6 min-[900px]:row-span-2 min-[900px]:row-start-1"
        />

        <section aria-labelledby="call-heading" className="min-w-0 min-[900px]:col-span-5 min-[900px]:row-start-2">
          <SectionHeading heading={page.calendly.heading} headingId="call-heading" />
          <LinkButton link={booking} className="w-full min-[720px]:w-auto" />
          {/* Direct lines as ledger rows: the label in the eyebrow style, the address beside it, a rule beneath. On a
              320px screen the address is wider than the space beside the label, so the row wraps it beneath. */}
          <dl className="mt-space-8 grid grid-cols-1">
            {directLines.map(({ label, link }) => (
              <div key={label} className="flex flex-wrap items-baseline gap-x-space-6 border-b border-rule py-space-2">
                <dt className="eyebrow w-space-16 shrink-0 text-ink-muted">{label}</dt>
                <dd className="body min-w-0">
                  <TextLink href={link.href} hitArea>
                    {link.label}
                  </TextLink>
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </Screen>
  );
}
