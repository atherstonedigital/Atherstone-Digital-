import * as React from 'react';

import { SectionHeading } from '@/components/brand/SectionHeading';
import { CTABand } from '@/components/site/CTABand';
import { LeadMagnet } from '@/components/site/LeadMagnet';
import { Screen } from '@/components/site/Screen';
import { scorecardPage as page } from '@/lib/content/pages/contact';
import { isStub, STUB_LABEL } from '@/lib/content/stub';
import { buildMetadata } from '@/lib/seo';

// /scorecard (plan, sitemap: "Lead magnet landing page", term "showroom retailer online scorecard"; Homepage 10 for the
// copy). The H1 and intro are the homepage lead magnet's heading and description (lib/content/pages/contact.ts), the
// form is the LeadMagnet, labelled by the H1, and the document's seven numbers follow once they are written. The plan
// gives no title tag: lib/content/pages/contact.ts holds the title tag, approved by Dan on 12 Nov 2026. The scorecard itself is not written (plan, open
// decisions), so its section shows STUB_LABEL and the page is noindex until it is (lib/seo.ts).
//
// Layout: one screen. From 900px the H1, intro and form take columns 1 to 6 and the seven numbers 7 to 12, their tops
// level; below 900px the heading and intro, the form, then the seven numbers. The closing band follows.

export const metadata = buildMetadata('/scorecard');

/**
 * Phase 3 copy, approved by Dan on 12 Nov 2026: the eyebrow (the share image's, from lib/seo.ts) and the heading over the
 * scorecard's contents, taken from the plan's own line "The seven numbers to check every Monday morning".
 */
const scorecardCopy = { eyebrow: 'Scorecard', documentHeading: 'The seven numbers' } as const;

export default function ScorecardPage() {
  const contents = isStub(page.document) ? undefined : page.document;

  return (
    <>
      <Screen first as="div">
        <div className="grid grid-cols-1 gap-y-space-12 min-[900px]:grid-cols-12 min-[900px]:items-start min-[900px]:gap-x-space-6">
          <div className="grid grid-cols-1 gap-y-space-8 min-[900px]:col-span-6">
            <header>
              <p className="eyebrow mb-space-2 text-ink-muted">{scorecardCopy.eyebrow}</p>
              <h1 id="page-heading" className="display-2 mb-space-6 max-w-[24em] text-balance">
                {page.h1}
              </h1>
              <p className="body-lg max-w-measure-lg">{page.intro}</p>
            </header>
            <LeadMagnet labelledBy="page-heading" />
          </div>

          <section aria-labelledby="document-heading" className="min-w-0 min-[900px]:col-span-6 min-[900px]:col-start-7">
            {/* Level with the H1 from 900px, where the two sit side by side: the H1 has an eyebrow above it. */}
            <SectionHeading
              heading={contents?.heading ?? scorecardCopy.documentHeading}
              headingId="document-heading"
              alignWithEyebrow
              className="max-[899px]:[&>h2]:mt-0"
            />
            {contents ? (
              <ol className="grid grid-cols-1">
                {contents.items.map((item) => (
                  <li key={item.title} className="body max-w-measure border-b border-rule py-space-3">
                    <span className="font-semibold">{item.title}</span> {item.body}
                  </li>
                ))}
              </ol>
            ) : (
              <p className="body max-w-measure">{STUB_LABEL}</p>
            )}
          </section>
        </div>
      </Screen>

      <CTABand />
    </>
  );
}
