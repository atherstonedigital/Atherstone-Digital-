import * as React from 'react';

import { TextLink } from '@/components/brand/Button';
import { contact } from '@/lib/content/site';
import type { Link as SiteLink } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The direct lines: Dan's email address and phone number as ledger rows, the label in the eyebrow style, the link
// beside it, a rule hairline beneath each row. /contact sets them under the call booking on paper; the homepage contact
// band sets them under its intro on the band, so the left half beside the form is not left empty (Polish review). The
// values are lib/content/site.ts's contact details, which the footer already shows.
//
// Each row is at least a touch target plus space-2 tall, so the links' 44px hit areas sit 8px apart (Phase 3 review: at
// 41px they overlapped and the lower link took the overlap). On a screen under 360px the email address is wider than
// the space beside its label and wraps beneath it; the row then takes space-4 above and below instead of space-3, so the
// hit areas still sit at least 8px apart when the address wraps (Polish review: 5.8px at 320).
//
// On the band the words and the underline are on-band, the hairlines rule-on-band and the focus ring on-band (11.6:1 on
// the band light, 10.7:1 dark), where the brass focus token only just clears 3:1 in the light theme (3.17:1).

/**
 * Phase 3 drafts, pending Dan's approval: the labels for the two lines. "Email" is the brief form's own field label.
 */
export const directLinesDraft = { email: 'Email', phone: 'Phone' } as const;

const lines: { label: string; link: SiteLink }[] = [
  { label: directLinesDraft.email, link: { label: contact.email, href: contact.emailHref } },
  { label: directLinesDraft.phone, link: { label: contact.phoneDisplay, href: contact.phoneHref } },
];

export interface DirectLinesProps {
  /** paper (the default; /contact) or band (the homepage contact band). */
  ground?: 'paper' | 'band';
  className?: string;
}

export function DirectLines({ ground = 'paper', className }: DirectLinesProps) {
  const band = ground === 'band';
  return (
    // A plain block list: the rows stack on their own, and the column it sits in stays a column of text to the
    // gate's edge checks (a grid inside would make it a box that must end on a column line).
    <dl className={className}>
      {lines.map(({ label, link }) => (
        <div
          key={label}
          className={cn(
            'flex flex-wrap items-baseline gap-x-space-6 border-b py-space-3 max-[359px]:py-space-4',
            'min-h-[calc(var(--touch-target)_+_var(--space-2))]',
            band ? 'border-rule-on-band' : 'border-rule',
          )}
        >
          <dt className={cn('eyebrow w-space-16 shrink-0', band ? 'text-on-band opacity-80' : 'text-ink-muted')}>
            {label}
          </dt>
          <dd className="body min-w-0">
            <TextLink
              href={link.href}
              hitArea
              className={band ? 'text-on-band focus-visible:outline-on-band' : undefined}
            >
              {link.label}
            </TextLink>
          </dd>
        </div>
      ))}
    </dl>
  );
}
