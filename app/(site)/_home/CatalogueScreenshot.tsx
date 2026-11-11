import * as React from 'react';
import { closeSync, existsSync, openSync, readSync } from 'node:fs';
import path from 'node:path';
import Image from 'next/image';

import { cn } from '@/lib/utils';

// The screenshot beside Gary's testimonial on the homepage (Phase 2.4 step 9, Phase 2.5 step 4, Phase 2.6 step 3): the
// Xshowhome catalogue work in the Shopify admin, which Dan supplies as public/images/xshowhome-catalogue.png. Until the
// file is there, the stand-in holds its place: a paper-raised block at 4:3 with a rule border and the small text
// "Screenshot to follow", never a stock image or anything that looks like a screenshot. The build looks for the file
// (this is a server component, read once per build), so dropping it in is the whole change: no code to edit.
//
// Either way the source line sits beneath in small, ink-muted, with the class source-line (brand book, Imagery: the one
// caption the brand keeps; the taste gate's visual-caption waiver names it). A real screenshot renders at its own
// ratio, flush on paper with a rule border and radius-0, never cropped, tilted or framed as a device.
//
// Like a testimonial, the block opens on a rule hairline with space-4 beneath, so it lines up with Gary's quote beside
// it, the two tops level.

const FILE = path.join(process.cwd(), 'public', 'images', 'xshowhome-catalogue.png');
const SRC = '/images/xshowhome-catalogue.png';

/** Phase 2.5, step 4, verbatim. */
const SOURCE = 'Shopify admin, xshowhome.com, product data remediation, 2026';

/**
 * Draft alt text, pending Dan's approval: check it against the screenshot when it lands and say what it shows (the
 * brief asks for the products list filtered to a corrected Xshowhome range, or one product record before and after).
 */
const ALT = 'The Shopify admin for xshowhome.com, showing furniture product records after the data remediation';

/** The PNG's own size from its header (IHDR: width and height at bytes 16 to 23), so the frame reserves its space. */
function pngSize(file: string): { width: number; height: number } | null {
  if (!existsSync(file)) return null;
  const header = Buffer.alloc(24);
  const fd = openSync(file, 'r');
  try {
    readSync(fd, header, 0, 24, 0);
  } finally {
    closeSync(fd);
  }
  if (header.toString('ascii', 1, 4) !== 'PNG') return null;
  return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
}

/**
 * The rendered width: five of twelve columns 24px apart from 900px (486px once the container is 1200px wide, at 1264px),
 * the container below. Five columns are (container + 24) * 5 / 12 - 24.
 */
const sizes = [
  '(min-width: 1264px) 486px',
  '(min-width: 1200px) calc((100vw - 40px) * 5 / 12 - 24px)',
  '(min-width: 900px) calc((100vw - 24px) * 5 / 12 - 24px)',
  '(min-width: 720px) calc(100vw - 48px)',
  'calc(100vw - 32px)',
].join(', ');

export function CatalogueScreenshot({ className }: { className?: string }) {
  const size = pngSize(FILE);
  return (
    <figure className={cn('min-w-0 border-t border-rule pt-space-4', className)}>
      {size ? (
        <Image
          src={SRC}
          width={size.width}
          height={size.height}
          alt={ALT}
          sizes={sizes}
          loading="lazy"
          className="block h-auto w-full rounded-radius-0 border border-rule"
        />
      ) : (
        <div className="flex aspect-[4/3] w-full rounded-radius-0 border border-rule bg-paper-raised p-space-4">
          <p className="small text-ink-muted">Screenshot to follow</p>
        </div>
      )}
      <figcaption className="source-line small mt-space-3 max-w-measure text-ink-muted">{SOURCE}</figcaption>
    </figure>
  );
}
