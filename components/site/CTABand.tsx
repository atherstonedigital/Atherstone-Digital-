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
// hairline against the band), and the standard primary and secondary apply there unchanged.
//
// Layout (Polish review: the panel hugging the bottom left left the band's right half empty, a widget bolted on). From
// 900px the content under the heading is two halves 24px apart, as the homepage contact band seats its form: the body
// in the left half at measure, the action panel in the right half on the page's one split line (x 732 at 1440), its
// top level with the body's first line. The panel stays as wide as its buttons, side by side from 1200px and one above
// the other below it. From 720 to 899px the panel follows the body, as wide as its buttons; below 720px, full width with
// the buttons stacked full width, as Phase 1's hero buttons.

const healthCheck = offers.offers.find((offer) => offer.id === 'store-health-check');

/**
 * Phase 2 copy, approved by Dan on 12 Nov 2026: the plan names the band's two actions but gives it no copy. The heading is the
 * plan's own phrase for them, in sentence case; the body is the Health Check's homepage summary, verbatim; the
 * secondary label is the sector template's "Start with a Health Check". Move it to lib/content/site.ts once approved.
 */
export const ctaBandCopy = {
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
  heading = ctaBandCopy.heading,
  body = ctaBandCopy.body,
  primary = ctaBandCopy.primary,
  secondary = ctaBandCopy.secondary,
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
        <div className="grid grid-cols-1 gap-y-space-8 min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-x-space-6">
          {body ? <p className="body-lg max-w-measure">{body}</p> : null}
          {/* As wide as its buttons from 720px: side by side from 1200px; from 720 to 1199px one above the other, one
              width, so the panel stays under half the container (side by side, the buttons and the panel's padding come
              to just over half at 768 and 1024, a box the gate's container-edges asks to run line to line, SR-6). From
              900px it starts the right half. Below 720px full width, the buttons stacked full width. */}
          <div
            className={cn(
              formPanelClasses('band'),
              'flex flex-wrap items-center gap-space-3 min-[720px]:w-fit',
              'max-[1199px]:flex-col max-[1199px]:items-stretch',
              'min-[900px]:col-start-2 min-[900px]:self-start min-[900px]:justify-self-start',
            )}
          >
            <LinkButton link={primary} className="w-full min-[1200px]:w-auto" />
            {secondary ? <LinkButton link={secondary} variant="secondary" className="w-full min-[1200px]:w-auto" /> : null}
          </div>
        </div>
      </div>
    </section>
  );
}
