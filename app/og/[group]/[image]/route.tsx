import { renderShareCard } from '@/lib/og/share-card';
import { generatedShareImages } from '@/lib/seo';

// The share images for every route without a hand-made one (case studies, articles, and the pages the Social README's
// set does not cover), rendered at build time into out/og/<group>/<name>.png. A static route handler rather than
// opengraph-image.tsx: Next 14.2 refuses a dynamic segment's opengraph-image under output: 'export', while a
// force-static GET with generateStaticParams exports one PNG per route (checked on Node 18). lib/seo.ts lists the
// images and sets them as og:image and twitter:image; the hand-made set is in public/og.

export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return generatedShareImages().map(({ group, image }) => ({ group, image }));
}

export async function GET(_request: Request, { params }: { params: { group: string; image: string } }) {
  const found = generatedShareImages().find((item) => item.group === params.group && item.image === params.image);
  if (!found) return new Response('Not found', { status: 404 });
  return renderShareCard(found.card);
}
