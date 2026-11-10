// The structured-data helpers that need no page content: absolute URLs on the canonical origin, FAQPage and
// BreadcrumbList from their items, and safe serialisation for a script element. Light on purpose: components/site/FAQ
// and Breadcrumbs import it, and lib/seo.ts re-exports it with the builders that read the content.

import { siteUrl } from '@/lib/content/site';
import type { FaqItem } from '@/lib/content/types';

type JsonLdObject = Record<string, unknown>;

/** Absolute URL on the canonical origin, with no trailing slash (the origin itself for "/"). */
export function absoluteUrl(path: string): string {
  if (/^https?:\/\//.test(path)) return path;
  return path === '/' ? siteUrl : `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`;
}

/** FAQPage for a FAQ block. components/site/FAQ.tsx writes it from the same items, so schema and page agree. */
export function faqPageJsonLd(items: FaqItem[]): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

export interface Crumb {
  label: string;
  /** The page's path on this site, such as /results/xshowhome. The last crumb is the current page. */
  href: string;
}

/** BreadcrumbList for a trail: every crumb with its position, name and absolute URL. */
export function breadcrumbListJsonLd(items: Crumb[], baseUrl: string = siteUrl): JsonLdObject {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: baseUrl === siteUrl ? absoluteUrl(item.href) : new URL(item.href, baseUrl).toString(),
    })),
  };
}

/** JSON for a script element: "<" escaped so no value can close the element early. */
export function serializeJsonLd(data: JsonLdObject | JsonLdObject[]): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}
