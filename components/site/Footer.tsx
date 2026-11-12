import * as React from 'react';
import NextLink from 'next/link';
import { ExternalLink } from 'lucide-react';

import { Wordmark } from '@/components/brand/Wordmark';
import { ThemeToggle } from '@/components/site/ThemeToggle';
import { contact as siteContact, footer as siteFooter } from '@/lib/content/site';
import type { ContactDetails, FooterColumn, Link as SiteLink, SiteFooter } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The site footer, in the plan's order: the wordmark, three link columns (Services, Sectors, Company), then the
// descriptor line, email, phone and LinkedIn, and the company number on its own rule. No local service area: the plan
// kills that column.
//
// Phase 2.4 (design-taste-frontend's shell, SR-6, with the owner's brief on heights): the taste kit's footer.closing,
// straight inside <body> after <main>, holding one .wrap on the container's lines with exactly two children: the
// footer proper (wordmark, link columns, descriptor and contact links), then the legal row on its own rule. It is as
// tall as its content plus space-12 above and below (space-16 from 1200px), as every section is since the owner's
// brief took the fixed screen heights out (Phase 2.5, step 2): the one-screen footer of Phases 1 to 3 added 900px to
// every page, and the homepage's target is under 8,000px at 1440.
//
// Below 1200px the wordmark, the three link columns, then the descriptor and the contact links, which sit on the link
// columns' grid from 900px (each starts on a column's line and the row runs line to line: the gate's row-lines, SR-7).
// From 1200px the taste kit's footer row: the wordmark across the top, then four columns a gutter apart, the three link
// columns in the first three and the descriptor and contact links in the last (Phase 2.7 review: so the visual order
// is the DOM's and the focus order follows it), one row running line to line, so the
// footer is one row deep.
//
// Phase 2.7, step 9 (the owner's brief: the header is wordmark, five links, one button): the theme toggle lives here,
// at the end of the legal row, on its rule, at every width. Below 360px it wraps under the company line.

/** Screen-reader text after a link that leaves the site (the same words as the brand group's LinkButton). */
const LEAVES_SITE = '(leaves this site)';

/**
 * Ink, a 44px target, and the step 8 underline: 1px, 3px below, drawn in brass-600 on hover and on press, as every
 * link's (Phase 2.7 review: hover is one thing). Ink, not green-700: the footer's links read as a list, not as running
 * copy. From 1200px with
 * a mouse (a fine pointer that hovers) the rows close up to 32px, 8px apart (brand book: 44px targets are for touch);
 * a touch screen keeps 44px at every width.
 */
const footerLinkStyle = cn(
  'inline-flex min-h-touch-target items-center gap-space-2 text-ink',
  '[@media(min-width:1200px)_and_(hover:hover)_and_(pointer:fine)]:min-h-space-8',
  'underline decoration-transparent decoration-1 underline-offset-[3px]',
  'transition-[text-decoration-color] duration-colour ease-out hover:decoration-brass-600 active:decoration-brass-600 motion-reduce:transition-none',
);

function FooterLink({ link }: { link: SiteLink }) {
  if (link.external) {
    return (
      <a href={link.href} className={footerLinkStyle}>
        {link.label}
        <ExternalLink size={20} strokeWidth={1.5} aria-hidden="true" />
        <span className="sr-only"> {LEAVES_SITE}</span>
      </a>
    );
  }
  if (link.href.startsWith('/')) {
    return (
      <NextLink href={link.href} className={footerLinkStyle}>
        {link.label}
      </NextLink>
    );
  }
  // mailto: and tel:
  return (
    <a href={link.href} className={footerLinkStyle}>
      {link.label}
    </a>
  );
}

function Column({ column, id }: { column: FooterColumn; id: string }) {
  return (
    <div>
      <p id={id} className="eyebrow mb-space-2 text-ink-muted">
        {column.label}
      </p>
      <ul aria-labelledby={id} className="grid gap-space-2">
        {column.links.map((link) => (
          <li key={link.href}>
            <FooterLink link={link} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export interface FooterProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children' | 'content'> {
  content?: SiteFooter;
  contact?: ContactDetails;
  /** Prefix for the column label ids, unique on the page (a second footer on a design-system page). */
  idPrefix?: string;
  /** The link columns' nav landmark name, unique on the page. Default: Footer. */
  navLabel?: string;
}

export function Footer({
  content = siteFooter,
  contact = siteContact,
  idPrefix = 'footer',
  navLabel = 'Footer',
  className,
  ...props
}: FooterProps) {
  const contactLinks: SiteLink[] = [
    { label: contact.email, href: contact.emailHref },
    { label: contact.phoneDisplay, href: contact.phoneHref },
    contact.linkedIn,
  ];

  return (
    <footer
      className={cn(
        'closing border-t border-rule bg-paper text-ink',
        // A section's padding: space-12 above and below, space-16 from 1200px (brand book, Layout and spacing).
        'py-space-12 min-[1200px]:py-space-16',
        className,
      )}
      {...props}
    >
      <div className="wrap mx-auto grid w-[min(100%_-_2_*_var(--gutter),var(--container))] gap-space-12">
        {/* 1: the footer proper: the wordmark, then the link columns and the descriptor with the contact links, all in
            the one Footer navigation. DOM order is the plan's (columns, then descriptor and contact), and the visual
            order follows it at every width: from 1200px the descriptor and contact take the last of four columns, so
            Tab runs left to right, then on to the theme toggle (Phase 2.7 review, WCAG 2.4.3; it used to sit in the
            first column, last in the DOM, so focus jumped back left). */}
        <div className="grid gap-y-space-8">
          <p>
            {/* The full wordmark at 40px, narrowed only where a 320px screen cannot hold it (Phase 1). */}
            <Wordmark className="text-[min(40px,10.5vw)]" />
          </p>
          <nav
            aria-label={navLabel}
            className={cn(
              // The columns stand a gutter apart at every width (the 12-column grid's gap, tokens.css), so from 1200px
              // the four start on the grid's columns 1, 4, 7 and 10 and end on its column lines (the gate's
              // edge-left and edge-right read the grid from --gutter).
              'grid grid-cols-2 gap-x-gutter gap-y-space-8 min-[720px]:grid-cols-3',
              'min-[1200px]:grid-cols-4',
            )}
          >
            {content.columns.map((column, index) => (
              <Column key={column.label} column={column} id={`${idPrefix}-column-${index}`} />
            ))}
            <div
              className={cn(
                'col-span-full mt-space-4 grid content-start gap-space-2',
                'min-[1200px]:col-span-1 min-[1200px]:col-start-4 min-[1200px]:row-start-1 min-[1200px]:mt-0',
              )}
            >
              <p className="small max-w-measure-lg text-ink">{content.descriptor}</p>
              {/* From 900 to 1199px on the link columns' grid, the row running line to line; one column otherwise:
                  below 900px a third of the container is narrower than the email address, and from 1200px the links
                  stack in the last column. */}
              <ul className="grid grid-cols-1 gap-y-space-2 min-[900px]:max-[1199px]:grid-cols-3 min-[900px]:max-[1199px]:gap-x-gutter">
                {contactLinks.map((link) => (
                  <li key={link.href} className="min-w-0">
                    <FooterLink link={link} />
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* 2: the legal row, on its own rule: the company line, and the theme toggle at its end (Phase 2.7, step 9). */}
        <div className="flex flex-wrap items-center justify-between gap-x-space-6 gap-y-space-2 border-t border-rule pt-space-4">
          <p className="small text-ink-muted">{content.legal}</p>
          <ThemeToggle />
        </div>
      </div>
    </footer>
  );
}
