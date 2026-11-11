import * as React from 'react';

import { LinkButton } from '@/components/brand/Button';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { formPanelClasses } from '@/components/site/form-panel-styles';
import { container } from '@/components/site/Screen';
import { nav, offers } from '@/lib/content/site';
import type { Link as SiteLink } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The closing band on pages that end with a call to action rather than the brief form: the offer pages and the sector
// pages, which the plan ends with "book a call, or start with the Health Check". The green band (brand book, Colour)
// on the band tokens: band fill and on-band text, a deep green in both themes, with the SectionHeading's band ground
// (eyebrow at 80%, rule-on-band hairline).
//
// The buttons never sit straight on the band. In the light theme the primary's green-900 fill is the band's own
// colour, and the Button README rules out a white fill ("Don't fill a button brass or white"). So the band seats its
// actions on the same raised panel the contact band seats its form on (formPanelClasses('band'): paper-raised, no
// hairline against the band), and the standard primary and secondary apply there unchanged. From 720px the panel is
// as wide as its two buttons; below it, full width with the buttons stacked full width, as Phase 1's hero buttons.

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
      // its content keeps the container's lines in the one .wrap every section holds (the taste kit's shell, SR-6).
      className={cn('bg-band py-space-12 text-on-band min-[1200px]:py-space-16', className)}
      {...props}
    >
      <div className={container}>
        <SectionHeading ground="band" eyebrow={eyebrow} heading={heading} headingId={headingId} />
        {body ? <p className="body-lg max-w-measure-lg">{body}</p> : null}
        <div className={cn(formPanelClasses('band'), 'mt-space-8 flex flex-wrap items-center gap-space-3 min-[720px]:w-fit')}>
          <LinkButton link={primary} className="w-full min-[720px]:w-auto" />
          {secondary ? <LinkButton link={secondary} variant="secondary" className="w-full min-[720px]:w-auto" /> : null}
        </div>
      </div>
    </section>
  );
}
