import * as React from 'react';
import { Menu } from 'lucide-react';

import { LinkButton, TextLink } from '@/components/brand/Button';
import { OfferCard } from '@/components/brand/OfferCard';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { StatBlock, StatRow } from '@/components/brand/StatBlock';
import { Testimonial } from '@/components/brand/Testimonial';
import { Monogram, Wordmark, WordmarkDescriptor } from '@/components/brand/Wordmark';
import { Button } from '@/components/ui/button';
import {
  comparison,
  contactSection,
  emailFigure,
  hero,
  leadMagnet,
  offers,
  problems,
  proof,
  wordmarkDescriptor,
} from '@/lib/content/site';
import { cn } from '@/lib/utils';

// The brand group on the design-system page: Wordmark, Button, SectionHeading, StatBlock, Testimonial and OfferCard,
// each variant and state under a label, with content from lib/content/site.ts. The page supplies the container and
// the theme switch. Hover, press and focus are live on every control; the "state" samples beside them hold that state
// still with the classes the live state applies, so both themes can be checked at a glance.

function Label({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-space-3 text-ink-muted">{children}</p>;
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-space-8 border-t border-rule pt-space-8">
      <h3 className="heading-2 text-ink">{title}</h3>
      {children}
    </div>
  );
}

function Sample({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('min-w-0', className)}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

/** A button held in one state for the page: a span with the classes the live state applies, out of the tab order. */
function StaticState({
  variant = 'primary',
  className,
  children,
}: {
  variant?: 'primary' | 'secondary' | 'link';
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Button asChild variant={variant} className={className}>
      <span aria-hidden="true">{children}</span>
    </Button>
  );
}

// The full wordmark is 40px, narrowed only where a phone column inside a padded panel cannot hold it, as the footer
// narrows it at 320px.
const panelMark = 'text-[min(40px,9vw)]';

const focusRing = 'outline outline-2 outline-offset-2 outline-focus';

/** The green contact band, as the site sets it: band fill, on-band text. */
function Band({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('border border-band bg-band p-space-6 text-on-band', className)}>{children}</div>;
}

// Result lines are not approved yet, so lib/content/site.ts leaves them empty. The demo shows the variant with Gary's
// Phase 1 copy, taken from the case-study link label in the same file (approved by Dan on 12 Nov 2026, with the client's sign-off).
const saverysLink = contactSection.confirmation.links[1].label;
const garyResult = (() => {
  const words = saverysLink.slice(saverysLink.indexOf(':') + 2);
  return words.charAt(0).toUpperCase() + words.slice(1);
})();

export default function BrandSection() {
  const [gary, gemma, luke] = proof.testimonials;
  const [first, second, third] = proof.figures;
  const fourth = emailFigure;

  return (
    <div className="grid grid-cols-1 gap-space-16 text-ink">
      {/* ------------------------------------------------------------------ Wordmark */}
      <Group title="Wordmark">
        <div className="grid grid-cols-1 gap-space-6 min-[900px]:grid-cols-2">
          <div className="flex min-w-0 flex-col justify-center gap-space-2 border border-rule p-space-4 min-[720px]:p-space-6">
            <Label>Wordmark, full, on paper</Label>
            <Wordmark className={panelMark} />
            <WordmarkDescriptor>{wordmarkDescriptor}</WordmarkDescriptor>
            <div className="mt-space-4">
              <Label>Wordmark, compact</Label>
              <Wordmark variant="compact" />
            </div>
          </div>
          <Band className="flex min-w-0 flex-col justify-center gap-space-2 p-space-4 min-[720px]:p-space-6">
            <p className="eyebrow mb-space-3 text-on-band opacity-80">Wordmark, full, on the green band</p>
            <Wordmark ground="band" className={panelMark} />
            <WordmarkDescriptor ground="band">{wordmarkDescriptor}</WordmarkDescriptor>
            <div className="mt-space-4">
              <p className="eyebrow mb-space-3 text-on-band opacity-80">Wordmark, compact, on the green band</p>
              <Wordmark variant="compact" ground="band" />
            </div>
          </Band>
        </div>
        <div className="flex flex-wrap items-end gap-space-8">
          <Sample label="Monogram, 40px">
            <Wordmark variant="monogram" />
          </Sample>
          <Sample label="Monogram, 64px">
            <Monogram className="text-[64px]" />
          </Sample>
          <Sample label="Monogram, on the green band">
            <Band className="inline-flex p-space-4">
              <Wordmark variant="monogram" ground="band" />
            </Band>
          </Sample>
          <Sample label="Wordmark, cover size, up to 96px" className="w-full">
            <Wordmark className="text-[min(96px,10vw)]" />
          </Sample>
        </div>
      </Group>

      {/* ------------------------------------------------------------------ Button */}
      <Group title="Button">
        <Sample label="The three forms and disabled, as the Button preview">
          <div className="flex flex-wrap items-center gap-space-6">
            <LinkButton link={hero.primary} />
            <Button variant="secondary" type="button">
              {contactSection.submit}
            </Button>
            <LinkButton link={hero.secondary} variant="link" />
            <Button type="button" disabled>
              {contactSection.status.sending}
            </Button>
          </div>
        </Sample>

        <div className="grid grid-cols-1 gap-space-8 min-[900px]:grid-cols-3">
          <div className="grid grid-cols-1 content-start gap-space-6">
            <Sample label="Primary, live">
              <Button type="button">{leadMagnet.submit}</Button>
            </Sample>
            <Sample label="Primary, hover">
              <StaticState className="bg-green-700">{hero.primary.label}</StaticState>
            </Sample>
            <Sample label="Primary, pressed">
              <StaticState className="scale-[0.98] bg-green-700">{hero.primary.label}</StaticState>
            </Sample>
            <Sample label="Primary, focus">
              <StaticState className={focusRing}>{hero.primary.label}</StaticState>
            </Sample>
            <Sample label="Primary, sending (aria-disabled, keeps focus)">
              <Button type="button" aria-disabled="true">
                {contactSection.status.sending}
              </Button>
            </Sample>
          </div>
          <div className="grid grid-cols-1 content-start gap-space-6">
            <Sample label="Secondary, live">
              <LinkButton link={hero.secondary} variant="secondary" />
            </Sample>
            <Sample label="Secondary, hover">
              <StaticState variant="secondary" className="border-ink">
                {hero.secondary.label}
              </StaticState>
            </Sample>
            <Sample label="Secondary, pressed">
              <StaticState variant="secondary" className="scale-[0.98] border-ink">
                {hero.secondary.label}
              </StaticState>
            </Sample>
            <Sample label="Secondary, focus">
              <StaticState variant="secondary" className={focusRing}>
                {hero.secondary.label}
              </StaticState>
            </Sample>
            <Sample label="Secondary, disabled">
              <Button type="button" variant="secondary" disabled>
                {contactSection.submit}
              </Button>
            </Sample>
          </div>
          <div className="grid grid-cols-1 content-start gap-space-6">
            <Sample label="Text link, live">
              <LinkButton link={comparison.link} variant="link" />
            </Sample>
            <Sample label="Text link, hover">
              <StaticState variant="link" className="decoration-2">
                {comparison.link.label}
              </StaticState>
            </Sample>
            <Sample label="Text link, focus">
              <StaticState variant="link" className={focusRing}>
                {comparison.link.label}
              </StaticState>
            </Sample>
            <Sample label="Text link, disabled">
              <Button type="button" variant="link" disabled>
                {comparison.link.label}
              </Button>
            </Sample>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-space-8 min-[900px]:grid-cols-3">
          <Sample label="Size, block (phones: hero, drawer, forms)">
            <LinkButton link={hero.primary} size="block" />
          </Sample>
          <Sample label="Size, icon (secondary, 44px)">
            <Button type="button" variant="secondary" size="icon" aria-label="Open menu">
              <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
            </Button>
          </Sample>
          <Sample label="Text link in running copy">
            <p className="body max-w-measure">
              {comparison.note} <TextLink href={comparison.link.href}>{comparison.link.label}</TextLink>.
            </p>
            <p className="body mt-space-4">
              {contactSection.alternative.lead}{' '}
              <TextLink href={contactSection.alternative.link.href} external>
                {contactSection.alternative.link.label}
              </TextLink>
            </p>
          </Sample>
        </div>
      </Group>

      {/* ------------------------------------------------------------------ SectionHeading */}
      <Group title="SectionHeading">
        <div className="grid grid-cols-1 gap-space-12 min-[900px]:grid-cols-2">
          <Sample label="Eyebrow, heading, hairline, paragraph">
            <SectionHeading as="h3" eyebrow={problems.eyebrow} heading={problems.heading}>
              {problems.items[0].body}
            </SectionHeading>
          </Sample>
          <Sample label="Brass eyebrow (homepage hero only)">
            <SectionHeading as="h3" eyebrow={hero.eyebrow} eyebrowTone="brass" heading={offers.heading} />
          </Sample>
          <Sample label="No eyebrow, aligned with eyebrowed headings, stats under the hairline">
            <SectionHeading as="h3" heading={proof.heading} alignWithEyebrow />
            <StatRow stats={[first, second]} rule={false} />
          </Sample>
          <Sample label="On the green band">
            <Band>
              <SectionHeading as="h3" ground="band" eyebrow={contactSection.eyebrow} heading={contactSection.heading}>
                {contactSection.intro}
              </SectionHeading>
            </Band>
          </Sample>
        </div>
      </Group>

      {/* ------------------------------------------------------------------ StatBlock */}
      <Group title="StatBlock">
        <Sample label="StatBlock, row of three">
          <StatRow stats={[first, second, third]} />
        </Sample>
        <div className="grid grid-cols-1 gap-space-6 min-[720px]:grid-cols-3">
          <Sample label="StatBlock, single">
            <StatBlock figure={fourth.figure} line={fourth.line} />
          </Sample>
        </div>
      </Group>

      {/* ------------------------------------------------------------------ Testimonial */}
      <Group title="Testimonial">
        <div className="grid grid-cols-1 gap-x-gutter gap-y-space-8 min-[900px]:grid-cols-2">
          <Sample label="Testimonial, plain">
            <Testimonial quote={gary.quote} name={gary.name} business={gary.business} />
          </Sample>
          <Sample label="Testimonial, result line">
            <Testimonial quote={gary.quote} name={gary.name} business={gary.business} result={garyResult} />
          </Sample>
          <Sample label={`Testimonial, ${gemma.business}`}>
            <Testimonial quote={gemma.quote} name={gemma.name} business={gemma.business} />
          </Sample>
          <Sample label={`Testimonial, ${luke.business}`}>
            <Testimonial quote={luke.quote} name={luke.name} business={luke.business} />
          </Sample>
        </div>
      </Group>

      {/* ------------------------------------------------------------------ OfferCard */}
      <Group title="OfferCard">
        <Sample label="OfferCard, row of three, the Health Check highlighted">
          <ul className="grid grid-cols-1 gap-space-6 min-[720px]:grid-cols-3">
            {offers.offers.map((offer) => (
              <OfferCard key={offer.id} as="li" offer={offer} headingLevel="h4" />
            ))}
          </ul>
          <div className="mt-space-8">
            <LinkButton link={offers.cta} />
          </div>
        </Sample>
        <div className="grid grid-cols-1 gap-space-6 min-[720px]:grid-cols-3">
          <Sample label="OfferCard, single, plain">
            <OfferCard offer={offers.offers[0]} headingLevel="h4" />
          </Sample>
          <Sample label="OfferCard, single, highlight">
            <OfferCard offer={offers.offers[1]} headingLevel="h4" />
          </Sample>
        </div>
      </Group>
    </div>
  );
}
