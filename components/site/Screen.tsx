import * as React from 'react';

import { SectionHeading } from '@/components/brand/SectionHeading';
import { STUB_LABEL } from '@/lib/content/stub';
import { cn } from '@/lib/utils';

// The frame every section of the site sits on, the homepage included, and the visible stub.
//
// Phase 2.4, step 7 (design-taste-frontend, layout rhythm; the owner's brief overrides the skill's one-screen rule): a
// section is its content plus space-16 above and below (space-12 below 720px), at least 60dvh tall and with no maximum.
// The fixed screen heights of Phases 1 to 3 are gone: a section never pads itself out to a whole viewport, so no section
// is left with a blank band below its last element. The page's first section (the page head) takes space-24 above and
// below from 1200px (brand book, Layout: the hero), the same minimum, and sits straight under the nav. The homepage hero
// is its own component and fills 100dvh minus the nav.
//
// Every frame is a <section> with exactly one child, the container (class wrap), so <main> is made of sections only and
// each section holds one wrap on the container's lines (the gate's one-section and container-edges). A frame that holds
// several sections, each with its own SectionHeading, is still a <section>: it is unnamed, so it is no landmark, and the
// sections inside keep their own labels. Frames are divided by a full-width rule (brand book, Rules), except where the
// ground changes: the green band needs no rule, nor does the frame after it.
//
// Height in dvh, never vh (brand book, Layout; Phase 2.4, step 15). Anchor jumps land below the fixed nav through the
// root's scroll-padding-top, so a frame's top padding no longer carries the nav's height.

/** The page container: at most the container token wide, inside a gutter on each side (as Nav, Footer, CTABand). */
export const container = 'wrap mx-auto w-[min(100%_-_2_*_var(--gutter),var(--container))]';

/** A section's padding: space-12 below 720px, space-16 from 720px (brand book, Layout and spacing). */
export const sectionPadding = 'py-space-12 min-[720px]:py-space-16';

/** The page head's padding: as a section's, then space-24 from 1200px (brand book, Layout: the hero). */
const firstPadding = 'py-space-12 min-[720px]:py-space-16 min-[1200px]:py-space-24';

/** The space between sections that share a frame, as between frames. */
const sectionGap = 'gap-space-12 min-[720px]:gap-space-16';

export interface ScreenProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * Kept for the pages that pass it. Every frame now renders a <section>: div used to mark a frame holding several
   * sections, and still means the frame takes no label of its own.
   */
  as?: 'section' | 'div';
  /** The id of the heading that labels the section. */
  labelledBy?: string;
  /** The page head: straight under the nav, with no rule above it and space-24 above and below from 1200px. */
  first?: boolean;
  /**
   * Phase 1's phone screen count. Taken out of the props so it never reaches the DOM; it sets nothing since sections
   * took their content's height (Phase 2.4).
   */
  phoneScreens?: 1 | 2;
  /** The last frame before the CTABand: as tall as its content, with no minimum, so the two read as one close. */
  closing?: boolean;
  /**
   * paper (the default), or band: the full-bleed green-900 ground with on-green text (brand book, Colour; the band
   * token, which is green-900 and on-green in the light theme and the contact band's colours in the dark one).
   */
  ground?: 'paper' | 'band';
  /** The full-width rule above the frame. Default: on, except on the first frame and on the band. */
  rule?: boolean;
  /** Classes for the inner container. */
  innerClassName?: string;
  children: React.ReactNode;
}

export function Screen({
  as,
  labelledBy,
  first = false,
  phoneScreens: _phoneScreens,
  closing = false,
  ground = 'paper',
  rule,
  className,
  innerClassName,
  children,
  ...props
}: ScreenProps) {
  const band = ground === 'band';
  const showRule = rule ?? (!first && !band);
  return (
    <section
      aria-labelledby={as === 'div' ? undefined : labelledBy}
      className={cn(
        band ? 'bg-band text-on-band' : 'text-ink',
        showRule && 'border-t border-rule',
        first ? firstPadding : sectionPadding,
        // At least 60% of the screen, never a fixed height: the frame grows with what it holds.
        !closing && 'min-h-[60dvh]',
        className,
      )}
      {...props}
    >
      <div className={cn(container, 'grid grid-cols-1 content-start', sectionGap, innerClassName)}>{children}</div>
    </section>
  );
}

// ------------------------------------------------------------------ stubs

/**
 * The visible mark where the plan has not written the copy yet (Phase 3 decisions 3 and 4): STUB_LABEL in ink, in the
 * type the copy will take, so the gap is plain to see and the page never ships placeholder prose. data-stub lets a
 * review script count them.
 */
export function Stub({ size = 'body', className }: { size?: 'body' | 'body-lg'; className?: string }) {
  return (
    <p data-stub="" className={cn(size === 'body-lg' ? 'body-lg max-w-measure-lg' : 'body max-w-measure', className)}>
      {STUB_LABEL}
    </p>
  );
}

/** A section the plan names whose copy is not written yet: its SectionHeading, then the stub. */
export function StubSection({ heading, headingId, id }: { heading: string; headingId: string; id?: string }) {
  return (
    <section aria-labelledby={headingId} id={id} className="min-w-0">
      <SectionHeading heading={heading} headingId={headingId} />
      <Stub />
    </section>
  );
}
