import * as React from 'react';

import { TextLink } from '@/components/brand/Button';
import type { Testimonial as TestimonialContent } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The Testimonial component (docs/brand/components/Testimonial): a client's words in Newsreader italic, attributed by
// name and business, with the one-line result beneath. No quotation marks (the italic does the job), no decorative
// quote glyph, no photo, logo or star rating, no coloured card, never centred. Only with written permission.
//
// The business is small text in ink-muted, as the README sets it. Where the page passes businessHref (the homepage, as
// the Phase 1 reference set it), the business name is a text link to the client's case study, with the 44px hit area
// a standalone link in small type takes; the middle dot before it stays ink-muted. Added at the Phase 3 integrate step.
// Extended minimally at the Polish step: stretchLink lays that link over a linked card (a sector page's proof card), so
// the business name is the card's one link and the card does not repeat the client's name in a second link.

export interface TestimonialProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'>,
    Pick<TestimonialContent, 'quote' | 'name' | 'business' | 'result'> {
  /** The hairline across the top, with space-4 above the quote, matching the StatBlock. */
  rule?: boolean;
  /** Links the business name to this page (the client's case study). Plain text when left out. */
  businessHref?: string;
  /** The link's accessible name, starting with the visible business name. The business name when left out. */
  businessLinkLabel?: string;
  /**
   * Stretch the business link over the nearest positioned ancestor (a linked card with `group relative`) by ::after,
   * so the whole card is the link's target and its underline thickens while the card is hovered.
   */
  stretchLink?: boolean;
}

export function Testimonial({
  quote,
  name,
  business,
  result,
  rule = true,
  businessHref,
  businessLinkLabel,
  stretchLink = false,
  className,
  ...props
}: TestimonialProps) {
  return (
    <figure
      className={cn(
        // 640px is the component's own cap from the preview; inside a grid the column is narrower and wins.
        'max-w-[640px]',
        rule && 'border-t border-rule pt-space-4',
        className,
      )}
      {...props}
    >
      {/* Verbatim: no edits beyond trimming the start or end. */}
      <blockquote className="quote mb-space-4 text-ink">{quote}</blockquote>
      <figcaption className="small text-ink">
        <span className="font-semibold text-ink">{name}</span>{' '}
        <span className="text-ink-muted">
          {'· '}
          {businessHref ? (
            <TextLink
              href={businessHref}
              hitArea={!stretchLink}
              aria-label={businessLinkLabel}
              className={stretchLink ? 'after:absolute after:inset-0 group-hover:decoration-2' : undefined}
            >
              {business}
            </TextLink>
          ) : (
            business
          )}
        </span>
        {/* The result: its own line in small, weight 500, brass-600. Under 50 characters. */}
        {result ? <span className="mt-space-1 block font-medium text-brass-600">{result}</span> : null}
      </figcaption>
    </figure>
  );
}
