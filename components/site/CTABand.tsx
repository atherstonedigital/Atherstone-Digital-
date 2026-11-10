import * as React from 'react';

import { LinkButton } from '@/components/brand/Button';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { nav, offers } from '@/lib/content/site';
import type { Link as SiteLink } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The closing band on pages that end with a call to action rather than the brief form: the offer pages and the sector
// pages, which the plan ends with "book a call, or start with the Health Check". The green band (brand book, Colour)
// on the band tokens: band fill and on-band text, a deep green in both themes, with the SectionHeading's band ground
// (eyebrow at 80%, rule-on-band hairline).
//
// The buttons take the Button component's band tone (components/ui/button.tsx), which inverts them, as the monogram
// inverts on the band:
//   primary    on-band fill, band text (11.55:1 light, 10.68:1 dark); hover and press button-on-band-hover (8.83:1)
//   secondary  transparent, on-band text, a rule-strong-on-band border (4.12:1 light, 3.93:1 dark, over 3:1 as a
//              meaningful border); hover: the border becomes on-band, as the secondary's becomes ink on paper
// Both tokens are proposed (design/tokens.additions.json). The focus ring keeps the focus token: 3.17:1 on the band in
// light, 6.32:1 in dark.

/**
 * What hover and press apply to the band forms, for the design-system page's held states (pass with variant and
 * tone="band"). On a page, use CTABand or tone="band".
 */
export const bandButtonClasses = {
  primaryHover: 'bg-button-on-band-hover',
  secondaryHover: 'border-on-band',
} as const;

const healthCheck = offers.offers.find((offer) => offer.id === 'store-health-check');

/**
 * Phase 2 draft, pending Dan's approval: the plan names the band's two actions but gives it no copy. The heading is the
 * plan's own phrase for them, in sentence case; the body is the Health Check's homepage summary, verbatim; the
 * secondary label is the sector template's "Start with a Health Check". Move it to lib/content/site.ts once approved.
 */
export const ctaBandDraft = {
  heading: 'Book a call, or start with the Health Check',
  body: healthCheck?.summary,
  primary: nav.cta,
  secondary: { label: 'Start with a Health Check', href: healthCheck?.href ?? '/store-health-check' } as SiteLink,
} as const;

export interface CTABandProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** Sentence case; the eyebrow style sets it uppercase. Optional. */
  eyebrow?: string;
  heading?: string;
  /** One short paragraph in body-lg at measure-lg. */
  body?: string;
  /** The one primary action. Default: Book a 30-minute call. */
  primary?: SiteLink;
  /** The alternative beside it, or null for none. */
  secondary?: SiteLink | null;
  /** The heading's id, for the section's aria-labelledby. Unique on the page. */
  headingId?: string;
}

export function CTABand({
  eyebrow,
  heading = ctaBandDraft.heading,
  body = ctaBandDraft.body,
  primary = ctaBandDraft.primary,
  secondary = ctaBandDraft.secondary,
  headingId = 'cta-band-heading',
  className,
  ...props
}: CTABandProps) {
  return (
    <section
      aria-labelledby={headingId}
      // Sections sit space-12 apart on a phone and space-16 from 1200px (brand book, Layout). The band is full width;
      // its content keeps the container's lines.
      className={cn('bg-band py-space-12 text-on-band min-[1200px]:py-space-16', className)}
      {...props}
    >
      <div className="mx-auto w-[min(100%_-_2_*_var(--gutter),var(--container))]">
        <SectionHeading ground="band" eyebrow={eyebrow} heading={heading} headingId={headingId} />
        {body ? <p className="body-lg max-w-measure-lg">{body}</p> : null}
        <div className="mt-space-8 flex flex-wrap items-center gap-space-3">
          {/* Full width below 720px, as Phase 1's hero and form buttons. */}
          <LinkButton link={primary} tone="band" className="w-full min-[720px]:w-auto" />
          {secondary ? (
            <LinkButton link={secondary} variant="secondary" tone="band" className="w-full min-[720px]:w-auto" />
          ) : null}
        </div>
      </div>
    </section>
  );
}
