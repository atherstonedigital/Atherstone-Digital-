'use client';

import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { LinkButton } from '@/components/brand/Button';
import type { Hero as HeroContent } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The homepage hero (plan, Homepage 1): the brass eyebrow, the H1 in display-1, the sub-copy in body-lg, the primary and
// secondary buttons, the one fact line, and the hero's object beside them.
//
// Phase 2.7, step 1 (the owner's brief, 12 Nov 2026): the hero gets its object. From 1024px (lg) it is a 12-column grid:
// the copy on columns 1 to 7, the aside (the homepage's revenue chart) on 8 to 12. With asideBleed on, the aside's
// right edge leaves the container and runs to the viewport's right edge, the first of the page's three bleeds; the
// section clips anything past the viewport, so a classic scrollbar never adds a sideways scroll. Below 1024px the aside
// stacks under the copy at the container's full width. The fact line sits directly under the buttons in small, with no
// hairline above it. The hero is its content plus space-16 above and below (space-12 below 720px, as every section):
// no minimum height, so it never pads itself out to a screen.
//
// The entrance (Phase 2.4 step 11, gsap-react and gsap-core) is the one thing on the page that moves on load: eyebrow,
// H1, sub-copy, then the buttons with the fact line, 60ms apart, each from 1% opacity and 8px down to rest over 400ms
// on power2.out, once. useGSAP runs it with the hero as its scope, so it is reverted on unmount; gsap.matchMedia sets
// its durations to 0 under prefers-reduced-motion, so the copy is at rest from the first paint there.
//
// Static export paints the HTML before React hydrates, so an entrance that only held the copy back on hydration would
// flash it, drop it, then fade it in. The root layout's head line (the taste kit's) puts m-enter on <html> before the
// body parses, and its timer adds m-enter-done after 1000ms. Between the two, unless reduced motion is on,
// the steps are held at 1% opacity by CSS. Hydration then hands them to GSAP, whose inline values take over, and the
// timeline ends the hold itself when it finishes. If the page's JavaScript is slow or fails, the timer lets the copy
// go and the entrance is skipped. Without JavaScript nothing is held back at all. The section carries the kit's
// data-enter and its hero class, so the taste gate's hero-enter check reads the entrance it has.
//
// Why 1% and not hidden (Phase 3 review): Chrome does not count invisible or fully transparent text as the largest
// contentful paint, so hiding the steps put the homepage's LCP (the sub-copy) after all the JavaScript had run, and
// Lighthouse mobile scored it 74 to 82. At 1% the first paint counts; it scored 97 to 99, with the same motion. GSAP's
// autoAlpha above 0 keeps the steps visible for the same reason.

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

/** The brand book's entrance as the owner's brief (Phase 2.4 step 11) times it: 400ms, 60ms apart, 8px of y. */
const ENTRANCE_SECONDS = 0.4;
const STAGGER_SECONDS = 0.06;
const ENTRANCE_Y = 8;
const ENTRANCE_EASE = 'power2.out';
/** The step's starting opacity: the hold's, so the hand-over to GSAP never flashes. Never 0 (see the note above). */
const ENTRANCE_FROM_OPACITY = 0.01;

/**
 * The class the root layout's head line adds to <html> once the hold is over: after its 1000ms fallback timer, or
 * when the entrance ends, whichever comes first. The hold itself is m-enter without this class (the step class below).
 */
const RELEASED = 'm-enter-done';

/** A hook for tests and screenshots: running while GSAP holds the steps, done once they are at rest for good. */
const ATTR = 'data-hero-enter';

/**
 * A step of the entrance: held at 1% opacity while <html> is holding (m-enter without m-enter-done) and motion is not
 * reduced, then GSAP's until it comes to rest. Not hidden and not 0: the first paint must count as the page's largest
 * contentful paint (see the note at the top).
 */
const step = 'motion-safe:[html.m-enter:not(.m-enter-done)_&]:opacity-[0.01]';

export interface HeroProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'children'> {
  /** The hero copy, hero from lib/content/site.ts on the homepage. */
  content: HeroContent;
  /** h1 on the homepage. h2 only where the hero is shown inside another page, as on the design-system page. */
  headingLevel?: 'h1' | 'h2';
  /** Run the entrance. Off, the copy is at rest from the first paint. */
  animate?: boolean;
  /** The H1's id, for the section's aria-labelledby. Generated when left out. */
  headingId?: string;
  /**
   * Classes for the hero's one in-flow child, the box that lays out the copy: the page's container (.wrap) goes here
   * when the section itself runs full width.
   */
  wrapClassName?: string;
  /**
   * The hero's object beside the copy from 1024px, under it below: the homepage's revenue chart (a code-drawn chart with
   * its source line). Not part of the entrance: the kit's rule is that the hero's picture is never hidden and never
   * fades.
   */
  aside?: React.ReactNode;
  /**
   * From 1024px, run the aside past the container's right line to the viewport's right edge (Phase 2.7, step 1). Only
   * for a hero that spans the viewport, as the homepage's does; off by default.
   */
  asideBleed?: boolean;
}

export function Hero({
  content,
  headingLevel: Heading = 'h1',
  animate = true,
  headingId,
  wrapClassName,
  aside,
  asideBleed = false,
  className,
  ...props
}: HeroProps) {
  const rootRef = React.useRef<HTMLElement>(null);
  const autoId = React.useId();
  const titleId = headingId ?? autoId;
  const { eyebrow, heading, headingLines, lead, primary, secondary, fact } = content;
  // One line per sentence from 720px; the whole heading when the lines are not given.
  const lines = headingLines.length > 0 ? headingLines : [heading];
  const held = animate ? step : undefined;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !animate) return;
      const html = document.documentElement;
      // At rest already: the entrance ran (StrictMode's second mount, a reduced-motion change), or the head line's
      // timer let the copy go before hydration, or this hero mounted after a client-side navigation.
      if (root.getAttribute(ATTR) === 'done' || html.classList.contains(RELEASED)) {
        root.setAttribute(ATTR, 'done');
        return;
      }

      const mm = gsap.matchMedia();
      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', reduce: '(prefers-reduced-motion: reduce)' },
        (context) => {
          if (root.getAttribute(ATTR) === 'done') return;
          const { reduce = false } = (context.conditions ?? {}) as { reduce?: boolean };
          // gsap.matchMedia's reduced-motion branch (brand book, GSAP rules): durations to 0. The copy was never
          // held there, so nothing renders the starting state either.
          const duration = reduce ? 0 : ENTRANCE_SECONDS;
          const stagger = reduce ? 0 : STAGGER_SECONDS;

          const steps = [0, 1, 2, 3].map((index) =>
            Array.from(root.querySelectorAll<HTMLElement>(`[data-hero-step="${index}"]`)),
          );
          const targets = steps.flat();
          // will-change on the hero elements only while they move (brand book, GSAP rules).
          if (!reduce) gsap.set(targets, { willChange: 'transform' });

          const timeline = gsap.timeline({
            defaults: { duration, ease: ENTRANCE_EASE, immediateRender: !reduce },
            onComplete: () => {
              // End the hold before the inline values go, or the hold's 1% would take the copy back.
              html.classList.add(RELEASED);
              gsap.set(targets, { clearProps: 'opacity,visibility,transform,willChange' });
              root.setAttribute(ATTR, 'done');
            },
          });
          // fromTo, not from: from() would read the hold's 1% as the end value and stop there.
          steps.forEach((group, index) => {
            if (group.length === 0) return;
            timeline.fromTo(
              group,
              { autoAlpha: ENTRANCE_FROM_OPACITY, y: ENTRANCE_Y },
              { autoAlpha: 1, y: 0 },
              index * stagger,
            );
          });
          root.setAttribute(ATTR, 'running');
          // A revert part-way (StrictMode's second mount, a reduced-motion change) puts the copy back as it was and
          // the next run animates it again, unless it finished.
          return () => {
            if (root.getAttribute(ATTR) === 'running') root.removeAttribute(ATTR);
          };
        },
      );
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <section
      ref={rootRef}
      aria-labelledby={titleId}
      // The taste kit's entrance mark (motion.md, The hero's entrance): the hero class and data-enter, on a hero that
      // enters. A hero shown at rest (animate off) carries neither data-enter nor the hold.
      data-enter={animate ? '' : undefined}
      className={cn(
        'hero text-ink',
        // Content plus space-16 above and below, space-12 below 720px (Phase 2.7, step 1). No minimum height.
        'py-space-12 min-[720px]:py-space-16',
        // The bleeding aside runs to the viewport's edge; nothing past it may scroll sideways.
        asideBleed && 'overflow-x-clip',
        className,
      )}
      {...props}
    >
      {/* The taste kit's hero shape (system.css: section.hero > .wrap > .hero-text): the box the page gives its
          container classes (wrapClassName), holding the composition. */}
      <div className={wrapClassName}>
        <div
          className={cn(
            'hero-text grid grid-cols-1',
            // From 1024px the copy on columns 1 to 7 and the aside on 8 to 12, 24px apart, their feet on one line.
            'min-[1024px]:grid-cols-12 min-[1024px]:items-end min-[1024px]:gap-x-space-6',
          )}
        >
          <div className="flex flex-col min-[1024px]:col-span-7">
            {/* The one brass eyebrow on the site (brand book, Type). */}
            <p data-hero-step="0" className={cn(held, 'eyebrow mb-space-4 text-brass-600 max-[359px]:mb-space-2')}>
              {eyebrow}
            </p>

            {/* display-1 steps from 34px to 64px with the viewport (tokens). Below 720px the H1 holds an 18ch measure
                so it breaks between phrases; from 720px each sentence starts its own line. */}
            <Heading
              id={titleId}
              data-hero-step="1"
              className={cn(held, 'display-1 mb-space-6 max-w-[18ch] max-[359px]:mb-space-4 min-[720px]:max-w-none')}
            >
              {lines.map((line, index) => (
                <React.Fragment key={line}>
                  {index > 0 ? ' ' : null}
                  <span className="min-[720px]:block">{line}</span>
                </React.Fragment>
              ))}
            </Heading>

            {/* body-lg at measure-lg; body below 360px so the 320 screen keeps the buttons above the fold. */}
            <p
              data-hero-step="2"
              className={cn(
                held,
                'body-lg mb-space-8 max-w-measure-lg',
                'max-[359px]:mb-space-6 max-[359px]:text-[length:var(--body-font-size)] max-[359px]:leading-[var(--body-line-height)]',
              )}
            >
              {lead}
            </p>

            {/* One primary and its one secondary (Button README), full width and stacked below 720px. */}
            <div data-hero-step="3" className={cn(held, 'flex w-full flex-wrap items-center gap-space-3')}>
              <LinkButton link={primary} className="w-full min-[720px]:w-auto" />
              <LinkButton link={secondary} variant="secondary" className="w-full min-[720px]:w-auto" />
            </div>

            {/* The fact line: directly under the buttons in small, ink, no hairline (Phase 2.7, step 1). It enters
                with the buttons. */}
            <p data-hero-step="3" className={cn(held, 'small mt-space-4 text-ink')}>
              {fact}
            </p>
          </div>

          {aside ? (
            <div
              className={cn(
                'mt-space-12 min-w-0 min-[1024px]:col-span-5 min-[1024px]:col-start-8 min-[1024px]:mt-0',
                // The bleed: a negative right margin as wide as the space between the container's right line and the
                // viewport's right edge, half of what the container leaves of the viewport.
                asideBleed &&
                  'min-[1024px]:mr-[calc((min(100vw_-_2_*_var(--gutter),var(--container))_-_100vw)_/_2)]',
              )}
            >
              {aside}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
