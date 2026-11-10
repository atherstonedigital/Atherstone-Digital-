import * as React from 'react';

import { serializeJsonLd } from '@/lib/structured-data';

// One JSON-LD script element, written into the exported HTML (a server component). Pass a builder's output from
// lib/seo.ts: organizationJsonLd() in the root layout, personJsonLd() on /about, serviceJsonLd(id) on an offer page,
// articleJsonLd(post) on an article. FAQ and Breadcrumbs write their own FAQPage and BreadcrumbList.

export interface JsonLdProps {
  data: Record<string, unknown> | Record<string, unknown>[];
}

export function JsonLd({ data }: JsonLdProps) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }} />;
}
