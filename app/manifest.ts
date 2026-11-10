import type { MetadataRoute } from 'next';

import { wordmarkDescriptor } from '@/lib/content/site';
import { colorValues } from '@/lib/design/tokens';

// The web app manifest (docs/brand Favicons README): the full-bleed monogram at 192 and 512, which Android masks to its
// own shape. The README asks for purpose "any maskable"; each size is listed once per purpose, which says the same and
// fits Next's manifest type. Colours are the paper token, never a written hex.

export default function manifest(): MetadataRoute.Manifest {
  const icons = [192, 512].flatMap((size) =>
    (['any', 'maskable'] as const).map((purpose) => ({
      src: `/icon-${size}.png`,
      sizes: `${size}x${size}`,
      type: 'image/png',
      purpose,
    })),
  );
  return {
    name: 'Atherstone Digital',
    short_name: 'Atherstone Digital',
    description: wordmarkDescriptor,
    start_url: '/',
    display: 'browser',
    background_color: colorValues.paper.light,
    theme_color: colorValues.paper.light,
    icons,
  };
}
