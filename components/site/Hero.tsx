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
// The entrance (Phase 2.7, step 7, the owner's brief, per gsap-react and gsap-core): the one thing on the page that
// moves on load. One gsap.from over the eyebrow, each headline line (a block of its own, no SplitText), the standfirst,
// the buttons, the fact line under them and the chart, in that order: from y 12 and opacity 0.01 to rest, 0.6s each on
// power2.out, 0.06s apart, once. useGSAP runs it with the hero as its scope, so it is reverted on unmount. It sits in a
// gsap.matchMedia: under prefers-reduced-motion: reduce the branch sets the final state with gsap.set and no tween.
// No ScrollTrigger, here or anywhere.
//
// Why 0.01 and not 0 (the orchestrator's ruling on the brief's opacity 0): Chrome does not count invisible or fully
// transparent text as the largest contentful paint, so an entrance from 0 puts the homepage's LCP (the standfirst)
// after all the JavaScript has run (Phase 3 review: Lighthouse mobile 74 to 82 that way, 97 to 99 at 1%). 0.01 looks
// the same as 0.
//
// Static export paints the HTML before React hydrates, so an entrance that only held the copy back on hydration would
// flash it, drop it, then fade it in. The root layout's head line (the taste kit's) puts m-enter on <html> before the
// body parses, and its timer adds m-enter-done after 1000ms. Between the two, unless reduced motion is on, every step
// (the chart included) is held at 0.01 by CSS. On hydration, in the same layout effect and so before the next paint,
// the entrance ends the hold (it adds m-enter-done itself) and gsap.from renders each step's starting state inline:
// from() reads the resting values the hold was hiding, so it must come after the release, never before. If the page's
// JavaScript is slow or fails, the timer lets the copy go and the entrance is skipped. Without JavaScript nothing is
// held back at all. The section carries the kit's data-enter and its hero class, so the taste gate's hero-enter check
// reads the entrance it has; data-hero-enter reads running, then done.

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP);
}

/** The entrance as the owner's brief (Phase 2.7, step 7) times it: 0.6s each, 0.06s apart, 12px of y, power2.out. */
const ENTRANCE_SECONDS = 0.6;
const STAGGER_SECONDS = 0.06;
const ENTRANCE_Y = 12;
const ENTRANCE_EASE = 'power2.out';
/** The starting opacity: the hold's, so the hand-over to GSAP never flashes. Never 0 (see the note above). */
const ENTRANCE_FROM_OPACITY = 0.01;

/**
 * The class the root layout's head line adds to <html> once the hold is over: after its 1000ms fallback timer, or
 * when the entrance takes over on hydration, whichever comes first. The hold itself is m-enter without this class (the
 * step class below).
 */
const RELEASED = 'm-enter-done';

/** A hook for tests and screenshots: running while GSAP holds the steps, done once they are at rest for good. */
const ATTR = 'data-hero-enter';

/**
 * A step of the entrance: held at 0.01 opacity while <html> is holding (m-enter without m-enter-done) and motion is not
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
   * its source line). The last step of the entrance (Phase 2.7, step 7, the owner's brief).
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
  /** The entrance's order: eyebrow 0, the headline lines 1 to n, then the standfirst, buttons, fact line and chart. */
  const afterLines = 1 + lines.length;

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root || !animate) return;
      const html = document.documentElement;
      // At rest already: the entrance ran (StrictMode's second mount), or the head line's timer let the copy go before
      // hydration, or this hero mounted after a client-side navigation.
      if (root.getAttribute(ATTR) === 'done' || html.classList.contains(RELEASED)) {
        root.setAttribute(ATTR, 'done');
        return;
      }
      // The steps in their order: eyebrow, each headline line, standfirst, buttons, fact line, chart.
      const targets = Array.from(root.querySelectorAll<HTMLElement>('[data-hero-step]')).sort(
        (a, b) => Number(a.dataset.heroStep) - Number(b.dataset.heroStep),
      );

      const mm = gsap.matchMedia();
      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', reduce: '(prefers-reduced-motion: reduce)' },
        (context) => {
          if (root.getAttribute(ATTR) === 'done') return;
          const { reduce = false } = (context.conditions ?? {}) as { reduce?: boolean };
          // End the hold first: from() takes the values it ends on from the page as it stands, and the hold's 0.01
          // would be read as the end. This runs before the next paint, so nothing flashes between the two.
          html.classList.add(RELEASED);

          if (reduce) {
            // The reduced-motion branch: the final state, set, with no tween.
            gsap.set(targets, { opacity: 1, y: 0 });
            root.setAttribute(ATTR, 'done');
            return;
          }

          gsap.from(targets, {
            opacity: ENTRANCE_FROM_OPACITY,
            y: ENTRANCE_Y,
            duration: ENTRANCE_SECONDS,
            ease: ENTRANCE_EASE,
            stagger: STAGGER_SECONDS,
            // will-change on the hero elements only while they move (brand book, GSAP rules).
            willChange: 'transform',
            onComplete: () => {
              gsap.set(targets, { clearProps: 'opacity,transform,willChange' });
              root.setAttribute(ATTR, 'done');
            },
          });
          root.setAttribute(ATTR, 'running');
          // A revert part-way (StrictMode's second mount, a reduced-motion change) puts the steps back at rest; the
          // next run animates them again, unless the entrance finished.
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
            // From 1024px the copy on columns 1 to 7 and the aside on 8 to 12, 24px apart, top-aligned: a split's
            // columns start together (the gate's split-pair, SR-8; brand book, Layout: headings first and top-aligned).
            'min-[1024px]:grid-cols-12 min-[1024px]:items-start min-[1024px]:gap-x-space-6',
          )}
        >
          <div className="flex flex-col min-[1024px]:col-span-7">
            {/* The one brass eyebrow on the site (brand book, Type). */}
            <p data-hero-step="0" className={cn(held, 'eyebrow mb-space-4 text-brass-600 max-[359px]:mb-space-2')}>
              {eyebrow}
            </p>

            {/* display-1 steps from 34px to 64px with the viewport (tokens). Each sentence is a block of its own, one
                step of the entrance each (Phase 2.7, step 7: each headline line its own element, without SplitText),
                so a transform moves it at every width. Below 720px the H1 holds an 18ch measure so a sentence breaks
                between phrases. */}
            <Heading
              id={titleId}
              className="display-1 mb-space-6 max-w-[18ch] max-[359px]:mb-space-4 min-[720px]:max-w-none"
            >
              {lines.map((line, index) => (
                <React.Fragment key={line}>
                  {index > 0 ? ' ' : null}
                  <span data-hero-step={1 + index} className={cn(held, 'block')}>
                    {line}
                  </span>
                </React.Fragment>
              ))}
            </Heading>

            {/* body-lg at measure-lg; body below 360px so the 320 screen keeps the buttons above the fold. */}
            <p
              data-hero-step={afterLines}
              className={cn(
                held,
                'body-lg mb-space-8 max-w-measure-lg',
                'max-[359px]:mb-space-6 max-[359px]:text-[length:var(--body-font-size)] max-[359px]:leading-[var(--body-line-height)]',
              )}
            >
              {lead}
            </p>

            {/* One primary and its one secondary (Button README), full width and stacked below 720px. */}
            <div data-hero-step={afterLines + 1} className={cn(held, 'flex w-full flex-wrap items-center gap-space-3')}>
              <LinkButton link={primary} className="w-full min-[720px]:w-auto" />
              <LinkButton link={secondary} variant="secondary" className="w-full min-[720px]:w-auto" />
            </div>

            {/* The fact line: directly under the buttons in small, ink, no hairline (Phase 2.7, step 1). It enters
                after them. */}
            <p data-hero-step={afterLines + 2} className={cn(held, 'small mt-space-4 text-ink')}>
              {fact}
            </p>
          </div>

          {aside ? (
            <div
              // The entrance's last step (Phase 2.7, step 7).
              data-hero-step={afterLines + 3}
              className={cn(
                held,
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
