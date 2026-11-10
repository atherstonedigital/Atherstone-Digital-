import { cn } from '@/lib/utils';

// The linked card (brand book, Motion and interaction feel: the hover layer). A card on paper, bordered with rule,
// radius-0, space-4 padding and no shadow, whose whole box is the link: sector tiles, insight cards and the case-study
// cards on /results. On hover it rises 2px on transform and its border darkens to ink. The lift waits for a fine
// pointer that can hover and never applies under reduced motion, where only the border answers, still over 150ms.
// Moved here from components/site/SectorTiles.tsx so every linked card shares one definition.

/** The 2px lift: hover-capable fine pointers only, never under reduced motion (Phase 1). */
export const linkedCardLift =
  '[@media(hover:hover)_and_(pointer:fine)_and_(prefers-reduced-motion:no-preference)]:hover:-translate-y-[2px]';

/** The card box, the hover layer and the 150ms transition on transform and border colour. Put it on the link. */
export const linkedCardClasses = cn(
  'block rounded-radius-0 border border-rule bg-paper p-space-4 text-ink no-underline',
  'transition-[transform,border-color] duration-colour ease-out',
  'hover:border-ink',
  linkedCardLift,
);
