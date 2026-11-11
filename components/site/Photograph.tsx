import * as React from 'react';
import { getImageProps } from 'next/image';

import type { Photo } from '@/lib/images';
import { cn } from '@/lib/utils';

// Photograph: how every client photograph renders outside the homepage (Phase 2.6, frontend-design). The photographs
// and their alt text come from lib/images.ts, which scripts/images.mjs generates from the originals in assets/photos.
// The case study header, About and the sector pages use it; splitSizes and fiveColumnSizes are the sizes lists for the
// two places a photograph sits in those layouts.

/**
 * The client photographs (lib/images.ts) as Phase 2.6 renders them, for every page outside the homepage: next/image
 * works out the props, the blurred placeholder included, and the img then takes the renditions scripts/images.mjs
 * wrote (each under 150kb), because the static export runs with images.unoptimized and next/image would drop its
 * srcset. The intrinsic width and height hold the frame's ratio, so nothing shifts as it loads. Flush on paper, a rule
 * border, radius-0: never a circle, a tilt, a device frame, a shadow or text over it, and no caption. Lazy unless
 * `priority` marks it the first image in the viewport.
 */
export interface PhotographProps {
  photo: Photo;
  /** The width it really renders at in each band, as an img sizes list (see splitSizes and fiveColumnSizes). */
  sizes: string;
  /** The first image in the viewport: fetched at once and at high priority instead of lazily. */
  priority?: boolean;
  className?: string;
}

export function Photograph({ photo, sizes, priority = false, className }: PhotographProps) {
  const { props } = getImageProps({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: photo.alt,
    sizes,
    placeholder: 'blur',
    blurDataURL: photo.blurDataURL,
    ...(priority ? { priority: true } : { loading: 'lazy' as const }),
  });
  return (
    // A plain img on next/image's props, with the generated srcset (see above).
    <img
      {...props}
      alt={photo.alt}
      srcSet={photo.srcSet}
      sizes={sizes}
      className={cn('block h-auto w-full rounded-radius-0 border border-rule object-cover', className)}
    />
  );
}

/**
 * A photograph in one half of a split from 900px: half the container less half the 24px split gap (588px once the
 * container reaches 1200px, at 1264px), the container's width below 900px. The gutter is 32px from 1200px, 24px from
 * 720px and 16px below.
 */
export const splitSizes = [
  '(min-width: 1264px) 588px',
  '(min-width: 1200px) calc(50vw - 44px)',
  '(min-width: 900px) calc(50vw - 36px)',
  '(min-width: 720px) calc(100vw - 48px)',
  'calc(100vw - 32px)',
].join(', ');

/**
 * A photograph on five of twelve columns 24px apart from 720px, (container + 24) * 5 / 12 - 24 (486px once the
 * container is 1200px wide, at 1264px), the container's width below 720px.
 */
export const fiveColumnSizes = [
  '(min-width: 1264px) 486px',
  '(min-width: 1200px) calc((100vw - 40px) * 5 / 12 - 24px)',
  '(min-width: 720px) calc((100vw - 24px) * 5 / 12 - 24px)',
  'calc(100vw - 32px)',
].join(', ');
