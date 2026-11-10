import * as React from 'react';

import { TextLink } from '@/components/brand/Button';
import type { Testimonial as TestimonialContent } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The Testimonial component (docs/brand/components/Testimonial): a client's words in Newsreader italic, attributed by
// name and business, with the one-line result beneath. No quotation marks (the italic does the job), no decorative
// quote glyph, no photo, logo or star rating, no coloured card, never centred. Only with written permission.

export interface TestimonialProps
  extends Omit<React.HTMLAttributes<HTMLElement>, 'children'>,
    Pick<TestimonialContent, 'quote' | 'name' | 'business' | 'href' | 'result'> {
  /** The hairline across the top, with space-4 above the quote, matching the StatBlock. */
  rule?: boolean;
}

export function Testimonial({ quote, name, business, href, result, rule = true, className, ...props }: TestimonialProps) {
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
          {href ? (
            // The business name links to its case study (Phase 1), with a 44px hit area in the small type.
            <TextLink href={href} hitArea>
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
