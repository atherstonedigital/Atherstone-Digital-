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
// all of them. From 720 to 899px: the heading and bio across the container, then the credentials and link on 1 to 5
// beside the portrait on 6 to 12. Below 720px one column: heading, bio, credentials, portrait, link.

export interface Portrait {
  /** A file in public/, as next/image takes it. */
  src: string;
  /** The file's own pixel size, so next/image reserves the space and nothing shifts. */
  width: number;
  height: number;
  alt: string;
  /**
   * Classes that place the image inside the square frame, for a source that is not square. Leave out for a square
   * source, which simply covers the frame.
   */
  cropClassName?: string;
}

/**
 * The interim portrait: the photograph on the current site, a 1024 by 1536 stage shot, cropped square to Dan as Phase 1
 * cropped it. The crop is the 670px square at x 354, y 28, which keeps the Shopify logo on the left out of frame: the
 * image is 1024/670 of the frame's width, its right edge on the frame's, and it rises by 28/670 of the frame. Replace it
 * when the commissioned portrait arrives (plan, open decision on photography). The file is 1.8MB and images are
 * unoptimised in the static export, so it needs converting (about 150kB WebP) before launch (Phase 1 report).
 */
export const danPortrait: Portrait = {
  src: '/dan-le-gresley-shopify-ecommerce-consultant.png',
  width: 1024,
  height: 1536,
  alt: 'Dan Le Gresley',
  cropClassName: 'absolute right-0 top-[-4.179%] h-auto w-[152.836%] max-w-none',
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
        'grid grid-cols-1 items-start text-ink',
        'min-[720px]:grid-cols-12 min-[720px]:grid-rows-[auto_auto_1fr] min-[720px]:gap-x-gutter',
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
          'min-[720px]:col-span-5 min-[720px]:row-start-2 min-[900px]:col-span-6',
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
          'min-[720px]:col-span-7 min-[720px]:col-start-6 min-[720px]:row-span-2 min-[720px]:row-start-2',
          'min-[900px]:col-span-6 min-[900px]:col-start-7 min-[900px]:row-span-3 min-[900px]:row-start-1',
        )}
      >
        <Image
          src={portrait.src}
          width={portrait.width}
          height={portrait.height}
          alt={portrait.alt}
          // The frame is the full column below 720px, seven twelfths from 720 and half the container from 900.
          sizes="(min-width: 1200px) 588px, (min-width: 900px) 50vw, (min-width: 720px) 58vw, 100vw"
          className={portrait.cropClassName ?? 'absolute inset-0 size-full object-cover'}
        />
      </div>

      <ForwardLink
        link={link}
        className={cn(
          'mt-space-6 justify-self-start',
          'min-[720px]:col-span-5 min-[720px]:row-start-3 min-[720px]:mt-0',
          'min-[900px]:col-span-6',
        )}
      />
    </section>
  );
}
