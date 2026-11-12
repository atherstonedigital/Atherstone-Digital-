import { cn } from '@/lib/utils';

// The linked card: a card on paper, bordered with rule, radius-0, space-4 padding and no shadow, whose whole box is the
// link: the case-study cards on /results and the offer pages, and the sector pages' proof card. The OfferCard draws its
// own box and takes linkedCardHover.
//
// Phase 2.7, step 8 (the owner's brief: hover is one thing, not three): on hover the card's border goes from rule to
// rule-strong over 150ms (duration-colour), as the offer cards' does. No lift, no shadow, and a photograph inside never
// zooms: nothing moves on hover. The 2px lift and the 1.02 zoom of Phases 2.4 to 2.6 are gone. Every linked card shares
// these classes, so one change reaches them all.

/** The hover answer without the box: the border from rule to rule-strong over 150ms. For a card that draws its own box. */
export const linkedCardHover = cn(
  'cursor-pointer',
  'transition-[border-color] duration-colour ease-out hover:border-rule-strong motion-reduce:transition-none',
);

/** The card box and the hover answer. Put it on the link. */
export const linkedCardClasses = cn(
  'relative block rounded-radius-0 border border-rule bg-paper p-space-4 text-ink no-underline',
  linkedCardHover,
);
