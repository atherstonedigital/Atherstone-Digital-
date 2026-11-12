import * as React from 'react';
import type { Metadata } from 'next';

import { TextLink } from '@/components/brand/Button';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { SiteShell } from '@/components/site/SiteShell';
import { brandBasis } from '@/lib/design/tokens.docs';

import { ColourTokens } from './_foundations/colour';
import { TokenGroup } from './_foundations/parts';
import { ApprovedAdditions } from './_foundations/approved';
import { RadiusScale, SpacingScale } from './_foundations/scales';
import { TypeStyles } from './_foundations/type';
import BrandSection from './_sections/brand';
import FormsDataSection from './_sections/forms-data';
import NavigationSection from './_sections/navigation';
import SectionsSection from './_sections/sections';

// The design-system page: every token in both themes, the approved additions, then each component group in
// app/design-system/_sections. A working page for review, kept out of search: it carries demo forms, a sample FAQPage
// schema and the copy Dan approved on 12 Nov 2026. It is built on the new system's shell (Nav, and the Footer with the theme toggle
// at the end of its legal row since Phase 2.7 step 9).

export const metadata: Metadata = {
  title: 'Design system',
  description: 'The Atherstone Digital design system: colour, type, spacing and radius tokens in both themes, and every component.',
  robots: { index: false, follow: false },
};

/** The page container: at most the container token wide, inside a gutter on each side. */
const container = 'mx-auto w-[min(100%_-_2_*_var(--gutter),var(--container))]';

interface Part {
  id: string;
  eyebrow: string;
  heading: string;
  intro: string;
  content: React.ReactNode;
}

const parts: Part[] = [
  {
    id: 'colour',
    eyebrow: 'Tokens',
    heading: 'Colour',
    intro:
      'Every colour is a token, so the theme flips without a rebuild. Each swatch shows the token in the light and dark themes side by side, with the value the system writes and the hex it resolves to.',
    content: <ColourTokens />,
  },
  {
    id: 'type',
    eyebrow: 'Tokens',
    heading: 'Type',
    intro:
      'Two families: Newsreader for display sizes, figures, section headings and quotes, and Schibsted Grotesk for everything else. Each sample is set in the style’s own class.',
    content: <TypeStyles />,
  },
  {
    id: 'spacing',
    eyebrow: 'Tokens',
    heading: 'Spacing and radius',
    intro: 'The spacing scale, the two column widths and the three radii. This is a square system: nothing is rounder than radius-md.',
    content: (
      <div className="grid grid-cols-1 gap-space-12">
        <TokenGroup title="Spacing">
          <SpacingScale />
        </TokenGroup>
        <TokenGroup title="Radius">
          <RadiusScale />
        </TokenGroup>
      </div>
    ),
  },
  {
    id: 'approved',
    eyebrow: 'Tokens',
    heading: 'Approved additions',
    intro: `What design/tokens.additions.json adds to or changes in ${brandBasis}. The brand owner approved each one with Phase 2.`,
    content: <ApprovedAdditions />,
  },
  {
    id: 'brand',
    eyebrow: 'Components',
    heading: 'Brand components',
    intro: 'Wordmark, Button, SectionHeading, StatBlock, Testimonial and OfferCard, in every variant and state.',
    content: <BrandSection />,
  },
  {
    id: 'navigation',
    eyebrow: 'Components',
    heading: 'Navigation',
    intro: 'The nav bar with its dropdowns and drawer, the footer, breadcrumbs and the closing band.',
    content: <NavigationSection />,
  },
  {
    id: 'sections',
    eyebrow: 'Components',
    heading: 'Page sections',
    intro: 'The homepage blocks, the dash list, then the case study and article headers.',
    content: <SectionsSection />,
  },
  {
    id: 'forms',
    eyebrow: 'Components',
    heading: 'Forms and data',
    intro: 'The field primitives, the brief and scorecard forms, the FAQ and the chart. The forms on this page never post.',
    content: <FormsDataSection />,
  },
];

export default function DesignSystemPage() {
  return (
    <SiteShell currentPath="/design-system">
      <header className={`${container} grid gap-space-6 py-space-12 min-[1200px]:py-space-16`}>
        <div>
          <p className="eyebrow mb-space-2 text-ink-muted">Atherstone Digital</p>
          <h1 className="display-2 mb-space-4 text-ink">Design system</h1>
          <p className="body-lg max-w-measure-lg text-ink">
            Every token and component the rebuilt site is made of, in the light and dark themes. Anything marked
            approved addition comes from design/tokens.additions.json.
          </p>
        </div>
        <nav aria-label="On this page">
          <p id="design-system-contents" className="eyebrow mb-space-2 text-ink-muted">
            On this page
          </p>
          <ul aria-labelledby="design-system-contents" className="flex flex-wrap gap-x-space-6 gap-y-space-2">
            {parts.map((part) => (
              <li key={part.id} className="flex min-h-touch-target items-center">
                <TextLink href={`#${part.id}`} hitArea>
                  {part.heading}
                </TextLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>

      {parts.map((part) => (
        <section
          key={part.id}
          id={part.id}
          aria-labelledby={`${part.id}-heading`}
          className="border-t border-rule py-space-12 min-[1200px]:py-space-16"
        >
          <div className={container}>
            <SectionHeading eyebrow={part.eyebrow} heading={part.heading} headingId={`${part.id}-heading`} className="mb-space-8">
              {part.intro}
            </SectionHeading>
            {part.content}
          </div>
        </section>
      ))}
    </SiteShell>
  );
}
