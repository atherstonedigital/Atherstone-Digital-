import * as React from 'react';

import { TextLink } from '@/components/brand/Button';
import { SectionHeading } from '@/components/brand/SectionHeading';
import { CTABand } from '@/components/site/CTABand';
import { Screen } from '@/components/site/Screen';
import { contact } from '@/lib/content/site';
import { cn } from '@/lib/utils';

// The legal pages' frame, shared by /privacy and /terms: the H1 in display-2, the date line in small, ink-muted (a
// caption, as the brand book allows), then each numbered section under a SectionHeading, in body at measure, with the
// brand's dash bullets for lists. The text is the pre-rebuild pages', carried over word for word (Phase 3 brief); only
// the casing of the headings and the date label is set to sentence case (brand book, Content fundamentals).
//
// Layout: the page is one section, which may run past a screen, in one column at measure, because legal text is read
// in order. The closing band follows, as at the foot of every page.

export interface LegalSection {
  id: string;
  heading: string;
  children: React.ReactNode;
}

export interface LegalDocumentProps {
  h1: string;
  /** "Last updated: October 2023": the pre-rebuild page's own date line. */
  dateLine: string;
  sections: LegalSection[];
}

/** One paragraph of legal text in body at measure. */
export function LegalParagraph({ className, children }: { className?: string; children: React.ReactNode }) {
  return <p className={cn('body max-w-measure', className)}>{children}</p>;
}

/** A list of legal items with the brand's dash bullets. */
export function LegalList({ className, children }: { className?: string; children: React.ReactNode }) {
  return <ul className={cn('list-dash body max-w-measure', className)}>{children}</ul>;
}

/** The contact address, as a body text link. */
export function LegalEmail() {
  return <TextLink href={contact.emailHref}>{contact.email}</TextLink>;
}

export function LegalDocument({ h1, dateLine, sections }: LegalDocumentProps) {
  return (
    <>
      <Screen first labelledBy="page-heading">
        <header>
          <h1 id="page-heading" className="display-2 mb-space-4 max-w-[24em] text-balance">
            {h1}
          </h1>
          <p className="small text-ink-muted">{dateLine}</p>
        </header>
        <div className="grid grid-cols-1 gap-y-space-8 min-[1200px]:gap-y-space-12">
          {sections.map((section) => (
            <section key={section.id} aria-labelledby={section.id} className="min-w-0">
              <SectionHeading heading={section.heading} headingId={section.id} />
              <div className="grid grid-cols-1 gap-y-space-4">{section.children}</div>
            </section>
          ))}
        </div>
      </Screen>

      <CTABand />
    </>
  );
}
