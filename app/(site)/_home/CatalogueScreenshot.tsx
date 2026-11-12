import * as React from 'react';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { Photograph, splitSizes } from '@/components/site/Photograph';
import type { Photo } from '@/lib/images';
import { cn } from '@/lib/utils';

// The screenshot beside Gary's testimonial on the homepage (Phase 2.4 step 9, Phase 2.5 step 4, Phase 2.6 step 3): the
// Xshowhome catalogue. The brief asked for the Shopify admin; that is not reachable from the build machine, so it is the
// live storefront's furniture collection with the product type filter open, captured 12 Nov 2026, and the source line
// says so. If the screenshot is ever missing, the stand-in holds its place: a paper-raised block at 4:3 with a rule
// border and the small text "Screenshot to follow", never a stock image or anything that looks like a screenshot.
//
// The screenshot goes through the image pipeline like every photograph (CLAUDE.md: under 150kb, WebP, optimised before
// it ships; images.unoptimized is on, so a raw PNG would ship as it is). Dan saves the PNG as
// public/images/xshowhome-catalogue.png, as the brief asks, and runs `npm run images`: scripts/images.mjs moves it to
// assets/screenshots/, writes WebP renditions at 800, 1200 and 1600 wide into public/images/ and the manifest
// lib/screenshots.json, which this server component reads once per build. Xshowhome cleared the screenshot in writing
// (Dan, 12 Nov 2026): the renditions and the manifest are committed, the original stays local in assets/screenshots/.
// A PNG left in public/images/ stops the build, so it can never ship raw.
//
// Either way the source line sits beneath in small, ink-muted, with the class source-line (brand book, Imagery: the one
// caption the brand keeps; the taste gate's visual-caption waiver names it). The screenshot renders through Photograph
// at its own ratio, flush on paper with a rule border and radius-0, never cropped, tilted or framed as a device.
//
// The block sits in the right half of the split, on the page's one split line (x 732 at 1440). Stacked below 900px it
// opens on a rule hairline with space-4 beneath, as a testimonial does; from 900px the frame's own rule border is its
// top edge, level with the hairline over Gary's quote beside it (Polish review: two rules 17px apart).

/** The brief's line (Phase 2.5 step 4) named the Shopify admin; this one names what the screenshot shows. */
const SOURCE = 'xshowhome.com, furniture collection, captured 12 Nov 2026';

const MANIFEST = path.join(process.cwd(), 'lib', 'screenshots.json');
const DROPPED = path.join(process.cwd(), 'public', 'images', 'xshowhome-catalogue.png');

/** The screenshot's renditions from the manifest, when the pipeline has made them and they are all here. */
function catalogueScreenshot(): Photo | null {
  if (existsSync(DROPPED)) {
    throw new Error(
      'public/images/xshowhome-catalogue.png would ship as a raw PNG: run `npm run images`, which moves it to ' +
        'assets/screenshots/ and writes its WebP renditions.',
    );
  }
  if (!existsSync(MANIFEST)) return null;
  const entries = JSON.parse(readFileSync(MANIFEST, 'utf8')) as Partial<Record<string, Photo>>;
  const photo = entries.xshowhomeCatalogue;
  if (!photo) return null;
  const files = photo.srcSet.split(',').map((candidate) => candidate.trim().split(/\s+/)[0] ?? '');
  const allHere = files.every((src) => existsSync(path.join(process.cwd(), 'public', src)));
  return allHere ? photo : null;
}

export function CatalogueScreenshot({ className }: { className?: string }) {
  const photo = catalogueScreenshot();
  return (
    <figure
      className={cn(
        'min-w-0 border-t border-rule pt-space-4',
        'min-[900px]:border-t-0 min-[900px]:pt-0',
        className,
      )}
    >
      {photo ? (
        <Photograph photo={photo} sizes={splitSizes} />
      ) : (
        <div className="flex aspect-[4/3] w-full rounded-radius-0 border border-rule bg-paper-raised p-space-4">
          <p className="small text-ink-muted">Screenshot to follow</p>
        </div>
      )}
      <figcaption className="source-line small mt-space-3 max-w-measure text-ink-muted">{SOURCE}</figcaption>
    </figure>
  );
}
