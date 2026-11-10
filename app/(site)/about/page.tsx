import * as React from 'react';
import Image from 'next/image';

import { SectionHeading } from '@/components/brand/SectionHeading';
import { danPortrait } from '@/components/site/AboutStrip';
import { CTABand } from '@/components/site/CTABand';
import { JsonLd } from '@/components/site/JsonLd';
import { TextBlock } from '@/components/site/PageBlocks';
import { Screen } from '@/components/site/Screen';
import { aboutPage as page } from '@/lib/content/pages/about';
import { meetDan } from '@/lib/content/site';
import { buildMetadata, personJsonLd } from '@/lib/seo';
import { cn } from '@/lib/utils';

// /about (plan, Results, About, Insights, Contact > /about): the plan's structure in its order. The photo, then the
// interiors work first, the career in one paragraph, how I work, the band, and the credentials row, with Person JSON-LD
// (sameAs LinkedIn) from lib/seo.ts. The title tag and H1 are the plan's; the body is lib/content/pages/about.ts, written
// from the plan's facts in the voice rules (Phase 3 decision 5), with drafts marked there. The credentials are the
// plan's four, worded as on the homepage (decision 6).
//
// The portrait is the brand book's second and last appearance of Dan's face (Imagery: once on the homepage, once on
// About): square, flush on paper, a rule border, radius-0, never a circle, no caption. It is the interim photograph,
// cropped square as the homepage crops it (components/site/AboutStrip.tsx, danPortrait).
//
// Layout (brand book, one section per screen). The first screen: the H1 and the interiors work on columns 1 to 6, the
// portrait on 7 to 12 beside both, from 900px; below, the H1, the portrait, then the interiors work. The second screen
// holds the four short sections two by two from 900px, because each alone would leave its screen mostly empty. Then
// the closing band.

export const metadata = buildMetadata('/about');

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />

      <Screen first as="div">
        {/* From 900px the H1 sits on the portrait's top line and the interiors work ends on its bottom line: the second
            row takes the height the portrait leaves, and the section sits at its foot. */}
        <div className="grid grid-cols-1 gap-y-space-8 min-[900px]:grid-cols-12 min-[900px]:grid-rows-[auto_1fr] min-[900px]:gap-x-gutter min-[900px]:gap-y-space-12">
          <header className="min-[900px]:col-span-6 min-[900px]:row-start-1">
            {/* The plan's Meet Dan heading, his name, as the eyebrow: the H1 says what, the eyebrow says who. */}
            <p className="eyebrow mb-space-2 text-ink-muted">{meetDan.heading}</p>
            <h1 id="page-heading" className="display-2 max-w-[24em] text-balance">
              {page.h1}
            </h1>
          </header>

          <div
            className={cn(
              'relative aspect-square w-full overflow-hidden rounded-radius-0 border border-rule bg-paper',
              'min-[900px]:col-span-6 min-[900px]:col-start-7 min-[900px]:row-span-2 min-[900px]:row-start-1',
            )}
          >
            <Image
              src={danPortrait.src}
              width={danPortrait.width}
              height={danPortrait.height}
              alt={page.portraitAlt}
              // Above the fold at every width, so it loads first.
              priority
              // The frame is the full column below 900px and half the container from 900.
              sizes="(min-width: 1200px) 588px, (min-width: 900px) 50vw, 100vw"
              className={danPortrait.cropClassName ?? 'absolute inset-0 size-full object-cover'}
            />
          </div>

          <TextBlock
            section={page.interiors}
            headingId="interiors-heading"
            className="min-[900px]:col-span-6 min-[900px]:row-start-2 min-[900px]:self-end"
          />
        </div>
      </Screen>

      <Screen as="div" phoneScreens={2}>
        <div className="grid grid-cols-1 gap-y-space-12 min-[900px]:grid-cols-2 min-[900px]:gap-x-gutter">
          <TextBlock section={page.career} headingId="career-heading" />
          <TextBlock section={page.howIWork} headingId="how-i-work-heading" />
          <TextBlock section={page.band} headingId="band-heading" />
          <section aria-labelledby="credentials-heading" className="min-w-0">
            <SectionHeading heading={page.credentials.heading} headingId="credentials-heading" />
            {/* Ledger rows, each closed by a rule hairline, with no bullet, as the homepage sets them (Phase 1). */}
            <ul className="grid grid-cols-1">
              {page.credentials.items.map((credential) => (
                <li key={credential} className="body max-w-measure border-b border-rule py-space-2">
                  {credential}
                </li>
              ))}
            </ul>
          </section>
        </div>
      </Screen>

      <CTABand primary={page.closing.primary} secondary={page.closing.secondary} />
    </>
  );
}
