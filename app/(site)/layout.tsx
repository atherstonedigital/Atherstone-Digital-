import * as React from 'react';

import { SiteShell } from '@/components/site/SiteShell';

// The shell for every page of the rebuilt site: the fixed Nav, the page's <main> (padded by --nav-height, id="main"
// for the skip link), then the Footer. Page files in this group render only their sections.
//
// Each page sets its own metadata with buildMetadata() from lib/seo.ts, and copy comes from lib/content (pages/*.ts).
// The root layout already writes the Organization JSON-LD, the theme script and the site-wide defaults.

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return <SiteShell>{children}</SiteShell>;
}
