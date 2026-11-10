import type { MetadataRoute } from 'next';

import { sitemapEntries } from '@/lib/seo';

// sitemap.xml, regenerated at every build (plan, Hygiene checklist) from the route registry in lib/seo.ts: only the
// indexable routes, so no noindex stub (the four unwritten sector pages, the case studies, /agency-or-in-house,
// /scorecard), no /contact/thank-you and no /design-system. Articles carry their published date.

export default function sitemap(): MetadataRoute.Sitemap {
  return sitemapEntries();
}
