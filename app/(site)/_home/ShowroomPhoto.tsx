import * as React from 'react';
import { getImageProps } from 'next/image';

import { photos } from '@/lib/images';
import { cn } from '@/lib/utils';

// The photograph beside "How it works" on the homepage (Phase 2.6, step 3): the Canwell Interiors showroom, 3:2, flush
// on paper with a rule border, radius-0, no caption, no hover (it links nowhere: there is no Canwell case study yet).
// A client's own photograph, used with the permission recorded in docs/permissions.md (pending).
//
// Rendering (Phase 2.6, step 4): next/image works out the props, the blurred placeholder included, but the export runs
// with images.unoptimized, which makes next/image drop its srcset. So the img takes next/image's props and then the
// renditions scripts/images.mjs wrote (800, 1200 and 1600 wide, each under 150kb), with sizes set to the width the
// photograph really renders at in each band. Lazy: it is far below the first screen. The frame's ratio is fixed, so
// nothing shifts when it loads.
//
// Phase 2.7, step 3a (the owner's brief): with fill on, from 900px the photograph covers the box Steps gives it, the
// right half of the viewport from the container's midline to its right edge, as tall as the four steps, object-fit
// cover. Its rule border runs along the top, the bottom and the left; the right edge is the viewport's. Below 900px it
// is the 3:2 frame across the container, as before.

/**
 * The rendered width: half the container less half the 24px split gap from 900px (588px once the container reaches
 * 1200px, at 1264px), the container's width below 900px. The gutter is 32px from 1200px, 24px from 720px, 16px below.
 */
const sizes = [
  '(min-width: 1264px) 588px',
  '(min-width: 1200px) calc(50vw - 44px)',
  '(min-width: 900px) calc(50vw - 36px)',
  '(min-width: 720px) calc(100vw - 48px)',
  'calc(100vw - 32px)',
].join(', ');

/** Filling the right half of the viewport from 900px: 50vw wide (taller boxes crop its sides). */
const fillSizes = ['(min-width: 900px) 50vw', '(min-width: 720px) calc(100vw - 48px)', 'calc(100vw - 32px)'].join(', ');

export function ShowroomPhoto({ fill = false, className }: { fill?: boolean; className?: string }) {
  const photo = photos.canwellShowroom;
  const imageSizes = fill ? fillSizes : sizes;
  const { props } = getImageProps({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: photo.alt,
    sizes: imageSizes,
    placeholder: 'blur',
    blurDataURL: photo.blurDataURL,
    loading: 'lazy',
  });
  return (
    <img
      {...props}
      alt={photo.alt}
      srcSet={photo.srcSet}
      sizes={imageSizes}
      className={cn(
        'block aspect-[3/2] h-auto w-full rounded-radius-0 border border-rule object-cover',
        fill && 'min-[900px]:absolute min-[900px]:inset-0 min-[900px]:aspect-auto min-[900px]:h-full min-[900px]:border-r-0',
        className,
      )}
    />
  );
}
