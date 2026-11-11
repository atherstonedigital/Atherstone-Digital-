'use client';

import * as React from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import { LinkButton } from '@/components/brand/Button';
import type { Hero as HeroContent } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The homepage hero (plan, Homepage 1): the brass eyebrow, the H1 in display-1, the sub-copy in body-lg, the primary and
// secondary buttons, and the one fact line on its own hairline. Phase 1's layout, without its chart: the chart drew
// client figures that may not appear in this public repository.
//
// Phase 2.4 (design-taste-frontend's hole and section-gaps checks, within the brief's hero: 100dvh less the nav, its
// own copy and buttons, no decoration): Phase 1 set the copy at the top of the first screen and docked the fact line at
// its foot, which left an empty band of about 340px between the buttons and the line at 1440 by 900 (38% of the
// screen): the hero read as two pieces with a hole between them. The copy and buttons are now centred in the space
// above the fact line, which stays on its hairline at the foot of the screen, space-12 under the buttons at least: the
// free space falls evenly above and below the copy (about 100px each at 1440 by 900), so the first screen reads as one
// composed group, and the gap from the fact line to the next section stays the page's one section gap.
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
  /**
   * Fill the first screen below the fixed nav, the copy centred above the fact line at its foot (brand book, Layout:
   * the hero fills the first screen alone with its primary button inside it). Off, the hero is as tall as its copy.
   */
  fill?: boolean;
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
   * One piece of the work beside the sub-copy from 900px, as Phase 1 set its chart: a code-drawn chart with its title
   * and source line, or a real photograph. Not part of the entrance: the kit's rule is that the hero's picture is never
   * hidden and never fades.
   */
  aside?: React.ReactNode;
}

export function Hero({
  content,
  headingLevel: Heading = 'h1',
  fill = true,
  animate = true,
  headingId,
  wrapClassName,
  aside,
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
        'hero flex flex-col text-ink',
        // space-12 above and below on a phone, space-24 from 1200px; space-6 below 360px so a 320 by 640 screen holds
        // the primary button and an uncut sub-copy (Phase 1).
        'py-space-12 max-[359px]:py-space-6 min-[1200px]:py-space-24',
        // The first screen below the fixed nav, in dvh where the browser has it (brand book, Layout).
        fill &&
          'min-h-[calc(100vh-var(--nav-height))] supports-[height:100dvh]:min-h-[calc(100dvh-var(--nav-height))]',
        className,
      )}
      {...props}
    >
      {/* The taste kit's hero shape (system.css: section.hero > .wrap > .hero-text plus one strip): the box the page
          gives its container classes (wrapClassName), holding the composition and, at its foot, the fact line as the
          one docked strip. A column at every width; the composition's auto margins centre it in the space above the
          strip. */}
      <div className={cn('flex flex-1 flex-col', wrapClassName)}>
        {/* The composition. A column below 900px; from 900px Phase 1's grid: eyebrow and H1 across all 12 columns,
            sub-copy and buttons on 1 to 7, the aside on 8 to 12 beside them. */}
        <div
          className={cn(
            'hero-text my-auto flex flex-col',
            // 24px between columns, so the aside starts on a line of the page's 24px grid (x 834 at 1440).
            'min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:items-start min-[900px]:gap-x-space-6',
          )}
        >
          {/* The one brass eyebrow on the site (brand book, Type). */}
          <p
            data-hero-step="0"
            className={cn(held, 'eyebrow mb-space-4 text-brass-600 max-[359px]:mb-space-2 min-[900px]:col-span-12')}
          >
            {eyebrow}
          </p>

          {/* display-1 steps from 34px to 64px with the viewport (tokens). Below 720px the H1 holds an 18ch measure so
              it breaks between phrases; from 720px each sentence takes its own line. */}
          <Heading
            id={titleId}
            data-hero-step="1"
            className={cn(
              held,
              'display-1 mb-space-6 max-w-[18ch] max-[359px]:mb-space-4 min-[720px]:max-w-none min-[900px]:col-span-12',
            )}
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
              'body-lg mb-space-8 max-w-measure-lg min-[900px]:col-span-7',
              'max-[359px]:mb-space-6 max-[359px]:text-[length:var(--body-font-size)] max-[359px]:leading-[var(--body-line-height)]',
            )}
          >
            {lead}
          </p>

          {/* One primary and its one secondary (Button README), full width and stacked below 720px. */}
          <div
            data-hero-step="3"
            className={cn(
              held,
              'flex w-full flex-wrap items-center gap-space-3 min-[900px]:col-span-7',
            )}
          >
            <LinkButton link={primary} className="w-full min-[720px]:w-auto" />
            <LinkButton link={secondary} variant="secondary" className="w-full min-[720px]:w-auto" />
          </div>

          {/* Not part of the entrance (four steps, brand book). Hidden below 720px, where the phone's first screen is
              full without it; full width under the buttons from 720 to 899px; beside them from 900px (Phase 1). */}
          {aside ? (
            <div
              className={cn(
                'hidden min-[720px]:my-space-8 min-[720px]:block',
                'min-[900px]:col-span-5 min-[900px]:col-start-8 min-[900px]:row-span-2 min-[900px]:row-start-3 min-[900px]:my-0',
              )}
            >
              {aside}
            </div>
          ) : null}
        </div>

        {/* The fact line, the hero's one strip: copy, so it is ink, in small, on its own hairline at the foot of the
            first screen, at least space-12 under the buttons (space-6 below 360px). It enters with the buttons. */}
        <p
          data-hero-step="3"
          className={cn(
            held,
            'hero-strip small mt-space-12 border-t border-rule pt-space-4 text-ink max-[359px]:mt-space-6 max-[359px]:pt-space-3',
          )}
        >
          {fact}
        </p>
      </div>
    </section>
  );
}
