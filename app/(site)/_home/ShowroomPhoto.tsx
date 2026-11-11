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

export function ShowroomPhoto({ className }: { className?: string }) {
  const photo = photos.canwellShowroom;
  const { props } = getImageProps({
    src: photo.src,
    width: photo.width,
    height: photo.height,
    alt: photo.alt,
    sizes,
    placeholder: 'blur',
    blurDataURL: photo.blurDataURL,
    loading: 'lazy',
  });
  return (
    <img
      {...props}
      alt={photo.alt}
      srcSet={photo.srcSet}
      sizes={sizes}
      className={cn('block aspect-[3/2] h-auto w-full rounded-radius-0 border border-rule object-cover', className)}
    />
  );
}
