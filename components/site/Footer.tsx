import * as React from 'react';
import NextLink from 'next/link';
import { ExternalLink } from 'lucide-react';

import { Wordmark } from '@/components/brand/Wordmark';
import { contact as siteContact, footer as siteFooter } from '@/lib/content/site';
import type { ContactDetails, FooterColumn, Link as SiteLink, SiteFooter } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The site footer, in the plan's order: the wordmark, three link columns (Services, Sectors, Company), then the
// descriptor line, email, phone and LinkedIn, and the company number on its own rule. No local service area: the plan
// kills that column.
//
// From 720px the footer fills one screen, as Phase 1's did (brand book, Layout: one section per screen): the wordmark
// and columns at the top, the contact block and the legal row at the foot. On a phone nothing follows it, so it is as
// tall as its content. A short page can opt out with className="min-[720px]:min-h-0".

/** Screen-reader text after a link that leaves the site (the same words as the brand group's LinkButton). */
const LEAVES_SITE = '(leaves this site)';

/** Ink, underline drawn on hover, a 44px target: the footer's links read as a list, not as running copy. */
const footerLinkStyle = cn(
  'inline-flex min-h-touch-target items-center gap-space-2 text-ink',
  'underline decoration-transparent decoration-1 underline-offset-4',
  'transition-[text-decoration-color] duration-colour ease-out hover:decoration-current motion-reduce:transition-none',
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
}

export function Footer({
  content = siteFooter,
  contact = siteContact,
  idPrefix = 'footer',
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
        'flex flex-col border-t border-rule bg-paper text-ink',
        // Section padding, as every screen-tall section has it: the nav's height plus space-12 above on a phone
        // (space-16 from 1200px), so the wordmark clears the fixed bar when the footer is scrolled to the top.
        'pb-space-12 pt-[calc(var(--nav-height)_+_var(--space-12))]',
        'min-[1200px]:pb-space-16 min-[1200px]:pt-[calc(var(--nav-height)_+_var(--space-16))]',
        'min-[720px]:min-h-[100dvh]',
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          'mx-auto flex w-[min(100%_-_2_*_var(--gutter),var(--container))] flex-1 flex-col justify-between gap-space-12',
        )}
      >
        <div className="grid gap-space-8">
          <p>
            {/* The full wordmark at 40px, narrowed only where a 320px screen cannot hold it (Phase 1). */}
            <Wordmark className="text-[min(40px,10.5vw)]" />
          </p>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-gutter gap-y-space-8 min-[720px]:grid-cols-3"
          >
            {content.columns.map((column, index) => (
              <Column key={column.label} column={column} id={`${idPrefix}-column-${index}`} />
            ))}
          </nav>
        </div>

        <div className="grid gap-space-6">
          <div className="grid gap-space-2">
            <p className="small max-w-measure-lg text-ink">{content.descriptor}</p>
            <ul className="grid gap-space-2 min-[720px]:flex min-[720px]:flex-wrap min-[720px]:gap-x-space-8 min-[720px]:gap-y-0">
              {contactLinks.map((link) => (
                <li key={link.href}>
                  <FooterLink link={link} />
                </li>
              ))}
            </ul>
          </div>
          <p className="small border-t border-rule pt-space-4 text-ink-muted">{content.legal}</p>
        </div>
      </div>
    </footer>
  );
}
