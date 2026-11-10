import * as React from 'react';

import { TextLink } from '@/components/brand/Button';
import { siteUrl } from '@/lib/content/site';
import { breadcrumbListJsonLd, serializeJsonLd, type Crumb } from '@/lib/structured-data';
import { cn } from '@/lib/utils';

// Breadcrumbs for the sector, results and insights pages, which the plan's structured data list asks to carry
// BreadcrumbList schema. A trail in small: each earlier page is a text link (green-700, underlined), the current page is
// ink with aria-current="page", and a slash in ink-muted separates them. The brand has no chevron-right among its six
// functional icons, so the separator is typographic.
//
// There is no /sectors index page (Phase 1 report, open decisions), so a sector page's trail is Home, then the sector.
// Schema items must be real pages, so list only crumbs that have one.

/** The canonical origin (lib/content/site.ts), which app/layout.tsx also gives metadataBase. */
const SITE_URL = siteUrl;

// The schema builder and the crumb type live in lib/structured-data.ts, shared with lib/seo.ts; re-exported here for
// the pages that already import them from this file.
export { breadcrumbListJsonLd, type Crumb };

export interface BreadcrumbsProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** The trail from Home to the current page, in order. */
  items: Crumb[];
  /** Emit the BreadcrumbList script. On by default; turn it off where the trail is a demo. */
  schema?: boolean;
  /** The origin for the schema's absolute URLs. */
  baseUrl?: string;
}

export function Breadcrumbs({
  items,
  schema = true,
  baseUrl = SITE_URL,
  className,
  'aria-label': ariaLabel = 'Breadcrumb',
  ...props
}: BreadcrumbsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label={ariaLabel} className={cn('small text-ink', className)} {...props}>
      {/* The links' 44px hit areas are drawn by ::after; the row gap keeps wrapped rows' targets from overlapping. */}
      <ol className="flex flex-wrap items-center gap-x-space-2 gap-y-space-6">
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={item.href} className="inline-flex items-center gap-x-space-2">
              {index > 0 ? (
                <span aria-hidden="true" className="text-ink-muted">
                  /
                </span>
              ) : null}
              {current ? (
                <span aria-current="page">{item.label}</span>
              ) : (
                <TextLink href={item.href} hitArea>
                  {item.label}
                </TextLink>
              )}
            </li>
          );
        })}
      </ol>
      {schema ? (
        <script
          type="application/ld+json"
          // Escapes < so a label can never close the script element.
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbListJsonLd(items, baseUrl)) }}
        />
      ) : null}
    </nav>
  );
}
