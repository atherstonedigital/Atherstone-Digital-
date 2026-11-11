import { cn } from '@/lib/utils';

// The linked card (brand book, Motion and interaction feel: the hover layer; Phase 2.4 step 10). A card on paper,
// bordered with rule, radius-0, space-4 padding and no shadow, whose whole box is the link: sector tiles, insight
// cards, the case-study cards on /results, and the OfferCard. On hover it rises 2px on transform and its border
// darkens from rule to ink, both over 150ms (duration-colour). A photograph inside it scales to 1.02 within its frame.
// The lift and the zoom wait for a fine pointer that can hover and never apply under reduced motion, where only the
// border answers. Every linked card shares these classes, so one change reaches them all.
//
// The classes are written out in full, media query and all, because Tailwind finds them by reading this file's text.

/**
 * The 2px lift. With it, a strip 2px deep under the lifted card (::after, only while hovered) keeps the pointer on the
 * card: hit testing follows the transform, so a pointer resting on the bottom 2px otherwise left the card as it rose,
 * the card dropped, and it flickered up and down (Phase 3 review). No linked card uses its own ::after for anything
 * else; a link stretched over a card (OfferCard) draws its ::after on the link, not the card.
 */
export const linkedCardLift = cn(
  '[@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:hover:-translate-y-[2px]',
  '[@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:hover:after:absolute',
  '[@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:hover:after:inset-x-[-1px]',
  '[@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:hover:after:top-full',
  // 3px: the strip starts at the padding box's foot, inside the 1px bottom border, so it runs 2px past the card.
  '[@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:hover:after:h-[3px]',
  "[@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:hover:after:content-['']",
);

/**
 * The hover answer without the box: the 150ms transition on transform and border colour, the ink border and the lift.
 * For a card that draws its own box (OfferCard, with its brass-300 highlight).
 */
export const linkedCardHover = cn(
  // group/linked: a photograph inside zooms on the card's hover (linkedPhotoClasses).
  'group/linked cursor-pointer',
  'transition-[transform,border-color] duration-colour ease-out hover:border-ink',
  linkedCardLift,
);

/** The card box and the hover layer. Put it on the link. */
export const linkedCardClasses = cn(
  // relative: the hover strip (linkedCardLift) is placed against the card.
  'relative block rounded-radius-0 border border-rule bg-paper p-space-4 text-ink no-underline',
  linkedCardHover,
);

/**
 * A photograph's frame inside a linked card, or a photograph that is itself a link (the kit's m-zoom): it clips the
 * zoom, so the frame, the card and the boxes around it never grow. A standalone linked photograph puts this on its
 * <a>; inside a linked card it goes on the <div> or <figure> round the <img>. Add the rule border where the layout
 * asks for one; radius-0 always.
 */
export const linkedPhotoFrameClasses = 'group/linked relative block overflow-hidden rounded-radius-0';

/**
 * The photograph itself: it scales to 1.02 inside its frame when the card or link round it is hovered (brand book:
 * "a photograph inside a linked card scales to 1.02 within its frame"). The zoom runs over the drawer timing (320ms,
 * ease-drawer), the brand's slower transform, so a large picture settles instead of snapping; it never dims, fades or
 * takes an overlay. Fine pointers only, never under reduced motion.
 */
export const linkedPhotoClasses = cn(
  'block h-auto w-full',
  'transition-transform duration-drawer ease-drawer',
  '[@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:group-hover/linked:scale-[1.02]',
);
