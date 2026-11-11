import * as React from 'react';
import Image from 'next/image';

import { danPortrait } from '@/components/site/AboutStrip';
import { Photograph, splitSizes } from '@/components/site/CaseStudyHeader';
import { CTABand } from '@/components/site/CTABand';
import { JsonLd } from '@/components/site/JsonLd';
import { TextBlock } from '@/components/site/PageBlocks';
import { Screen } from '@/components/site/Screen';
import { aboutPage as page, aboutPhoto } from '@/lib/content/pages/about';
import { meetDan } from '@/lib/content/site';
import { photos } from '@/lib/images';
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
// Layout (brand book, one section per screen). The first screen: the H1 and the interiors work on the left half, the
// portrait on the right half beside both, from 900px; below, the H1, the portrait, then the interiors work. The second
// screen holds the four short sections, because each alone would leave its screen mostly empty. Then the closing band.
//
// Phase 2.6, step 3: the page's second image, after the portrait, is a client's own photograph, the Saverys of Broadway
// fabric library at 3:2 (aboutPhoto in lib/content/pages/about.ts). On the second screen the career, how I work and the
// band run down the left half, and the photograph takes the right half with the credentials under it as ledger rows,
// as the portrait takes the right half above (brand book, Layout: headings share the left edge; design-taste-frontend:
// every h2 on the container's left line, one split line a page, x 732 at 1440). Lazy: it is below the first screen at
// every width. Below 900px: the three sections, the photograph, then the credentials, in the plan's order.

export const metadata = buildMetadata('/about');

export default function AboutPage() {
  return (
    <>
      <JsonLd data={personJsonLd()} />

      <Screen first as="div">
        {/* From 900px the H1 sits on the portrait's top line and the interiors work ends on its bottom line: the second
            row takes the height the portrait leaves, and the section sits at its foot. */}
        <div className="grid grid-cols-1 gap-y-space-8 min-[900px]:grid-cols-12 min-[900px]:grid-rows-[auto_1fr] min-[900px]:gap-x-space-6 min-[900px]:gap-y-space-12">
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
              placeholder={danPortrait.blurDataURL ? 'blur' : 'empty'}
              blurDataURL={danPortrait.blurDataURL}
              // Above the fold at every width, so it loads first.
              priority
              // The frame is the full column below 900px and half the container from 900.
              sizes={splitSizes}
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
        {/* Two stacks, so neither column's height sets the other's rows. Every h2 starts on the container's left line. */}
        <div className="grid grid-cols-1 gap-y-space-12 min-[900px]:grid-cols-2 min-[900px]:items-start min-[900px]:gap-x-space-6">
          <div className="grid grid-cols-1 gap-y-space-12">
            <TextBlock section={page.career} headingId="career-heading" />
            <TextBlock section={page.howIWork} headingId="how-i-work-heading" />
            <TextBlock section={page.band} headingId="band-heading" />
          </div>
          <div className="grid grid-cols-1 gap-y-space-8">
            <Photograph photo={photos[aboutPhoto]} sizes={splitSizes} />
            {/* The credentials as the homepage's Meet Dan sets them: ledger rows, each closed by a rule hairline, with no
                bullet, under a label in the eyebrow style rather than a heading, so they sit with the photograph as a
                caption-free column and every heading on the page keeps the left line. */}
            <section aria-labelledby="credentials-heading" className="min-w-0">
              <p id="credentials-heading" className="eyebrow mb-space-2 text-ink-muted">
                {page.credentials.heading}
              </p>
              <ul className="grid grid-cols-1 border-t border-rule">
                {page.credentials.items.map((credential) => (
                  <li key={credential} className="body max-w-measure border-b border-rule py-space-2">
                    {credential}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </Screen>

      <CTABand primary={page.closing.primary} secondary={page.closing.secondary} />
    </>
  );
}
