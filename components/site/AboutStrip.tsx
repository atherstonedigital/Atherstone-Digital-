import * as React from 'react';
import Image from 'next/image';

import { ForwardLink } from '@/components/brand/Button';
import { SectionHeading } from '@/components/brand/SectionHeading';
import type { AboutSection } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// Meet Dan (plan, Homepage 8): the bio, the credentials as ledger rows, Dan's portrait and the link to the full
// background. The portrait appears here and on About only (brand book, Imagery): square, flush on paper, a rule border,
// radius-0, never a circle, never tilted, no caption.
//
// Layout (Phase 1). From 900px: the heading, bio, credentials and link on columns 1 to 6, the portrait on 7 to 12 beside
// all of them. From 720 to 899px: the heading and bio across the container, then the credentials and link on 1 to 6
// beside the portrait on 7 to 12: two halves on the page's split line, so the portrait is never a box over half the
// container that stops short of its left line (Phase 2.4, the gate's container-edges). Below 720px one column:
// heading, bio, credentials, portrait, link.

export interface Portrait {
  /** A file in public/, as next/image takes it. */
  src: string;
  /** The file's own pixel size, so next/image reserves the space and nothing shifts. */
  width: number;
  height: number;
  alt: string;
  /**
   * A 24px blurred copy as a data URL, shown while the photograph loads (Phase 2.6, step 4: placeholder="blur"), made as
   * scripts/images.mjs makes the client photographs' (resize to 24px, blur 0.6, WebP at quality 50).
   */
  blurDataURL?: string;
  /**
   * Classes that place the image inside the square frame, for a source that is not square. Leave out for a square
   * source, which simply covers the frame.
   */
  cropClassName?: string;
}

/**
 * The interim portrait: the photograph on the current site, a 1024 by 1536 stage shot, cropped square to Dan as Phase 1
 * cropped it, the 670px square at x 354, y 28, which keeps the Shopify logo on the left out of frame. Images are
 * unoptimised in the static export, so the crop is exported on its own as a 670px WebP at quality 80 (16KB, from the
 * 1.8MB PNG; Phase 3 review): the frame only ever showed those 670 source pixels, so nothing loses sharpness. It is
 * square, so it simply covers the frame. Regenerate it from the PNG, which stays in public/ as the old speaker image's
 * redirect target, with sharp (dev-only, not installed): sharp(png).extract({ left: 354, top: 28, width: 670,
 * height: 670 }).webp({ quality: 80 }). Replace it when the commissioned portrait arrives (plan, open decision on
 * photography).
 */
export const danPortrait: Portrait = {
  src: '/dan-le-gresley-portrait.webp',
  width: 670,
  height: 670,
  // One plain sentence saying what is in the picture (Phase 2.6, step 4), approved by Dan on 12 Nov 2026. The About
  // page reads this same string, so the two never drift apart.
  alt: 'Dan Le Gresley, head and shoulders, in a black T-shirt against a black background, looking to one side',
  blurDataURL:
    'data:image/webp;base64,UklGRooAAABXRUJQVlA4IH4AAAAQBQCdASoYABgAPtFco0yoJaMiMBgIAQAaCWUAs4APY/qjKgshBedP/KWRKn5r3FaoAP73glq1SAHtaLh+s4mwFX/E3s9+nhocdrSvSQhSlG/kl9arQARN7Fj6Lk3vTu5t+Zl881isQgN/h5ULBLXdUwpddh0B/7kUyXJoAAA=',
};

export interface AboutStripProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'children'> {
  /** meetDan from lib/content/site.ts. */
  content: AboutSection;
  /** The photograph beside the copy; Dan's interim portrait by default. */
  portrait?: Portrait;
  /** The SectionHeading's level. */
  headingLevel?: 'h2' | 'h3';
  /** The heading's id, for the section's aria-labelledby. Generated when left out. */
  headingId?: string;
}

export function AboutStrip({
  content,
  portrait = danPortrait,
  headingLevel = 'h2',
  headingId,
  className,
  ...props
}: AboutStripProps) {
  const autoId = React.useId();
  const titleId = headingId ?? autoId;
  const { eyebrow, heading, bio, credentials, link } = content;

  return (
    <section
      aria-labelledby={titleId}
      className={cn(
        'grid grid-cols-1 items-start',
        // The two columns 24px apart, so from 900px the portrait starts on the page's one split line (x 732 at 1440),
        // as every split on the site does (design-taste-frontend, split-pair).
        'min-[720px]:grid-cols-12 min-[720px]:grid-rows-[auto_auto_1fr] min-[720px]:gap-x-space-6',
        className,
      )}
      {...props}
    >
      <div className="min-[720px]:col-span-12 min-[720px]:row-start-1 min-[900px]:col-span-6">
        <SectionHeading as={headingLevel} eyebrow={eyebrow} heading={heading} headingId={titleId} />
        <p className="body mb-space-6 max-w-measure">{bio}</p>
      </div>

      {/* The credentials as ledger rows, each closed by a rule hairline. No bullet, so the words keep the container's
          left line (Phase 1). */}
      <ul
        className={cn(
          'mb-space-6 grid grid-cols-1',
          'min-[720px]:col-span-6 min-[720px]:row-start-2',
        )}
      >
        {credentials.map((credential) => (
          <li key={credential} className="body max-w-measure border-b border-rule py-space-2">
            {credential}
          </li>
        ))}
      </ul>

      <div
        className={cn(
          'relative aspect-square w-full overflow-hidden rounded-radius-0 border border-rule bg-paper',
          'min-[720px]:col-span-6 min-[720px]:col-start-7 min-[720px]:row-span-2 min-[720px]:row-start-2',
          'min-[900px]:row-span-3 min-[900px]:row-start-1',
        )}
      >
        <Image
          src={portrait.src}
          width={portrait.width}
          height={portrait.height}
          alt={portrait.alt}
          placeholder={portrait.blurDataURL ? 'blur' : 'empty'}
          blurDataURL={portrait.blurDataURL}
          // The frame is the full column below 720px and half the container from 720.
          sizes="(min-width: 1200px) 588px, (min-width: 720px) 50vw, 100vw"
          className={portrait.cropClassName ?? 'absolute inset-0 size-full object-cover'}
        />
      </div>

      <ForwardLink
        link={link}
        className={cn(
          'mt-space-6 justify-self-start',
          'min-[720px]:col-span-6 min-[720px]:row-start-3 min-[720px]:mt-0',
        )}
      />
    </section>
  );
}
