import * as React from 'react';
import NextLink from 'next/link';

import { textLinkVariants } from '@/components/brand/Button';
import { linkedCardHover } from '@/components/brand/LinkedCard';
import type { Offer, Price } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The OfferCard component (docs/brand/components/OfferCard): a bordered card for one offer with an eyebrow, the offer
// name, the copy, the price and a text link. No icon, no shadow, no tick list and no button inside (the row has one
// primary button beneath it). At most one card in a row is highlighted, never the most expensive.
//
// The whole card is the link (its text link is stretched over it). Phase 2.7, step 8 (the owner's brief: hover is one
// thing): on hover the card's border goes from rule (brass-300 on the highlighted card) to rule-strong over 150ms and
// the link's underline turns brass-600, as every text link's does. No lift, no shadow: nothing moves.

export type OfferCardContent = Pick<
  Offer,
  'eyebrow' | 'name' | 'summary' | 'price' | 'href' | 'highlight' | 'readMore' | 'readMoreContext'
>;

export interface OfferCardProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /** An offer from lib/content/site.ts (offers.offers). */
  offer: OfferCardContent;
  /** h3 under a section's h2; h2 for a single card in an article sidebar with no section heading above it. */
  headingLevel?: 'h2' | 'h3' | 'h4';
  /** li inside a list of offers. */
  as?: 'div' | 'li' | 'article';
}

/** The price row: the amount in Newsreader 500 at 28px with tabular numerals, the qualifiers in small, ink-muted. */
function PriceRow({ price }: { price: Price }) {
  // The qualifiers carry real spaces, so the row reads and copies as "From £3,000 a month" (Phase 1). They set their
  // figures and punctuation proportional again: tabular numerals are for the amount only.
  const qualifier = 'small normal-nums text-ink-muted';
  return (
    <p className="font-display text-[28px] font-medium leading-none tracking-[-0.01em] tabular-nums">
      {price.pre ? <small className={qualifier}>{price.pre} </small> : null}
      {price.amount}
      {price.post ? <small className={qualifier}> {price.post}</small> : null}
    </p>
  );
}

export function OfferCard({ offer, headingLevel: Heading = 'h3', as: Tag = 'div', className, ...props }: OfferCardProps) {
  const { eyebrow, name, summary, price, href, highlight, readMore, readMoreContext } = offer;
  return (
    <Tag
      className={cn(
        // 1px rule border, radius-0, space-4 padding, space-3 between elements, paper fill.
        'group relative flex flex-col gap-space-3 rounded-radius-0 border border-rule bg-paper p-space-4 text-ink',
        // The hover answer: the border to rule-strong over 150ms (components/brand/LinkedCard.tsx).
        linkedCardHover,
        // The highlight: brass-300 fill and border; the text stays ink. Hover still takes the border to rule-strong.
        highlight && 'border-brass-300 bg-brass-300',
        className,
      )}
      {...props}
    >
      <p className="eyebrow text-ink-muted">{eyebrow}</p>
      <Heading className="heading-2">{name}</Heading>
      <p className="body flex-1">{summary}</p>
      <PriceRow price={price} />
      <NextLink
        href={href}
        className={cn(
          textLinkVariants({ tone: highlight ? 'highlight' : 'default' }),
          // A 44px row of its own (WCAG 2.5.8, brand book: touch targets), and stretched over the card by ::after, so
          // the card is one target; the underline turns brass-600 on card hover.
          'inline-flex min-h-touch-target items-center self-start after:absolute after:inset-0 group-hover:decoration-brass-600',
        )}
      >
        {readMore}
        {readMoreContext ? <span className="sr-only"> {readMoreContext}</span> : null}
      </NextLink>
    </Tag>
  );
}
