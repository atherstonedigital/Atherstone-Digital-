import * as React from 'react';
import type { Metadata } from 'next';

import { LinkButton } from '@/components/brand/Button';
import { Screen } from '@/components/site/Screen';
import { SiteShell } from '@/components/site/SiteShell';
import { hero } from '@/lib/content/site';
import type { Link as SiteLink } from '@/lib/content/types';

// The 404 page, on the new system. Unmatched URLs render here inside the root layout only, outside app/(site), so the
// page wraps itself in the site shell (Nav, main, Footer). The export writes it to out/404.html, which Netlify serves
// for any path with no page. Next marks a not-found page noindex on its own.
//
// One screen, set like the top of every inner page: the eyebrow, the H1 in display-2, one line in body-lg, then one
// primary and its one secondary (Button README). The footer beneath carries every other page.

/**
 * Phase 3 drafts, pending Dan's approval: the title tag, meta description, eyebrow, H1, line and the primary button.
 * The secondary is the hero's "See the results", verbatim.
 */
const notFoundDraft = {
  title: 'Page not found | Atherstone Digital',
  description: 'There is no page at this address. Start from the homepage or the case studies.',
  eyebrow: '404',
  h1: 'Page not found',
  body: 'There is no page at this address. It may be mistyped, or the page may have moved when the site was rebuilt.',
  home: { label: 'Go to the homepage', href: '/' } as SiteLink,
} as const;

export const metadata: Metadata = {
  title: { absolute: notFoundDraft.title },
  description: notFoundDraft.description,
};

export default function NotFound() {
  return (
    <SiteShell>
      <Screen first labelledBy="page-heading">
        <header>
          <p className="eyebrow mb-space-2 text-ink-muted">{notFoundDraft.eyebrow}</p>
          <h1 id="page-heading" className="display-2 mb-space-6 max-w-[24em] text-balance">
            {notFoundDraft.h1}
          </h1>
          <p className="body-lg mb-space-8 max-w-measure-lg">{notFoundDraft.body}</p>
          {/* Full width and stacked below 720px, as the hero's buttons. */}
          <div className="flex flex-wrap items-center gap-space-3">
            <LinkButton link={notFoundDraft.home} className="w-full min-[720px]:w-auto" />
            <LinkButton link={hero.secondary} variant="secondary" className="w-full min-[720px]:w-auto" />
          </div>
        </header>
      </Screen>
    </SiteShell>
  );
}
