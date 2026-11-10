'use client';

import * as React from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { useGSAP } from '@gsap/react';

import { LinkButton } from '@/components/brand/Button';
import type { Hero as HeroContent } from '@/lib/content/types';
import { easing } from '@/lib/design/tokens';
import { cn } from '@/lib/utils';

// The homepage hero (plan, Homepage 1): the brass eyebrow, the H1 in display-1, the sub-copy in body-lg, the primary and
// secondary buttons, and the one fact line on its own hairline at the foot of the first screen. Phase 1's layout, without
// its chart: the chart drew client figures that may not appear in this public repository.
//
// The entrance is the one thing on the page that moves on load (brand book, Motion): eyebrow, H1, sub-copy, then the
// buttons with the fact line, 60ms apart, each from opacity 0 and 8px down over 200ms, once. GSAP runs it (useGSAP with
// the hero as its scope, gsap.matchMedia for reduced motion). Under prefers-reduced-motion there is no entrance and
// nothing is hidden at any point.
//
// Static export paints the HTML before React hydrates, so an entrance that only hid the copy on hydration would flash
// it, hide it, then fade it in. A one-line script at the top of the section runs as the HTML is parsed, before the
// copy below it paints: unless reduced motion is on, it marks the section pending, which hides the steps. Hydration
// then hands them to GSAP. If the page's JavaScript is slow or fails, the script's own timer shows the copy after
// REVEAL_FALLBACK_MS and the entrance is skipped, so nothing stays hidden. Without JavaScript nothing is hidden at all.

if (typeof window !== 'undefined') {
  gsap.registerPlugin(useGSAP, CustomEase);
}

/** The brand book's entrance: "one fade-in of the hero copy over 200ms", steps "staggered 60ms apart", "8px of y". */
const ENTRANCE_SECONDS = 0.2;
const STAGGER_SECONDS = 0.06;
const ENTRANCE_Y = 8;
/** How long the copy may stay hidden waiting for hydration before the inline script shows it without an entrance. */
const REVEAL_FALLBACK_MS = 1000;

/** pending (set by the inline script, steps hidden), running (GSAP holds them), done (at rest, never animate again). */
const ATTR = 'data-hero-enter';

const prehideScript = `(function(s){var h=s&&s.parentElement;if(!h)return;try{if(window.matchMedia('(prefers-reduced-motion: reduce)').matches)return}catch(e){return}h.setAttribute('${ATTR}','pending');setTimeout(function(){if(h.getAttribute('${ATTR}')==='pending')h.setAttribute('${ATTR}','done')},${REVEAL_FALLBACK_MS})})(document.currentScript)`;

let heroEase: gsap.EaseFunction | undefined;

/** The ease-drawer token as a GSAP ease, the curve Phase 1's entrance used: a firm ease-out with no overshoot. */
function getHeroEase(): gsap.EaseFunction {
  heroEase ??= CustomEase.create('hero-enter', easing.drawer.replace(/cubic-bezier\(|\)|\s/g, '')) as gsap.EaseFunction;
  return heroEase;
}

/** A step of the entrance: hidden while the section is pending, then GSAP's until it comes to rest. */
const step = 'group-data-[hero-enter=pending]/hero:invisible';

export interface HeroProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'children'> {
  /** The hero copy, hero from lib/content/site.ts on the homepage. */
  content: HeroContent;
  /** h1 on the homepage. h2 only where the hero is shown inside another page, as on the design-system page. */
  headingLevel?: 'h1' | 'h2';
  /**
   * Fill the first screen below the fixed nav, with the fact line at its foot (brand book, Layout: the hero fills the
   * first screen alone with its primary button inside it). Off, the hero is as tall as its copy.
   */
  fill?: boolean;
  /** Run the entrance. Off, the copy is at rest from the first paint. */
  animate?: boolean;
  /** The H1's id, for the section's aria-labelledby. Generated when left out. */
  headingId?: string;
  /**
   * One piece of the work beside the sub-copy from 900px, as Phase 1 set its chart: a code-drawn chart with its title
   * and source line. Phase 1's chart is not carried, because its figures need the client's written permission before
   * they appear in this public repository. Leave out until a cleared chart exists; the hero is complete without it.
   */
  aside?: React.ReactNode;
}

export function Hero({
  content,
  headingLevel: Heading = 'h1',
  fill = true,
  animate = true,
  headingId,
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

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;
      if (!animate) {
        root.setAttribute(ATTR, 'done');
        return;
      }
      // The fallback already showed the copy, or the entrance has run: leave it at rest.
      if (root.getAttribute(ATTR) === 'done') return;

      const mm = gsap.matchMedia();
      mm.add(
        { motion: '(prefers-reduced-motion: no-preference)', reduce: '(prefers-reduced-motion: reduce)' },
        (context) => {
          const { reduce } = (context.conditions ?? {}) as { reduce?: boolean };
          if (reduce || root.getAttribute(ATTR) === 'done') {
            root.setAttribute(ATTR, 'done');
            return;
          }
          const steps = [0, 1, 2, 3].map((index) =>
            Array.from(root.querySelectorAll<HTMLElement>(`[data-hero-step="${index}"]`)),
          );
          const targets = steps.flat();
          // will-change on the hero elements only while they move (brand book, GSAP rules).
          gsap.set(targets, { willChange: 'transform' });
          const timeline = gsap.timeline({
            defaults: { duration: ENTRANCE_SECONDS, ease: getHeroEase() },
            onComplete: () => {
              gsap.set(targets, { clearProps: 'all' });
              root.setAttribute(ATTR, 'done');
            },
          });
          steps.forEach((group, index) => {
            timeline.from(group, { autoAlpha: 0, y: ENTRANCE_Y }, index * STAGGER_SECONDS);
          });
          // The from() tweens have already set the starting state inline, so the pending rule can let go without a
          // flash. A revert part-way (StrictMode's second mount, a reduced-motion change) leaves the copy at rest, and
          // the next run animates it again unless it finished.
          root.setAttribute(ATTR, 'running');
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
      // The inline script adds data-hero-enter before React hydrates.
      suppressHydrationWarning
      className={cn(
        'group/hero flex flex-col text-ink',
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
      {animate ? <script dangerouslySetInnerHTML={{ __html: prehideScript }} /> : null}

      {/* A column below 900px, the fact line pushed to the foot. From 900px Phase 1's grid: eyebrow, H1 and fact line
          across all 12 columns, sub-copy and buttons on 1 to 7, the aside on 8 to 12 beside them, and a flexible row
          that holds the fact line at the foot of the screen. */}
      <div
        className={cn(
          'flex flex-1 flex-col',
          'min-[900px]:grid min-[900px]:grid-cols-12 min-[900px]:grid-rows-[auto_auto_auto_auto_1fr_auto] min-[900px]:items-start min-[900px]:gap-x-gutter',
        )}
      >
        {/* The one brass eyebrow on the site (brand book, Type). */}
        <p
          data-hero-step="0"
          className={cn(step, 'eyebrow mb-space-4 text-brass-600 max-[359px]:mb-space-2 min-[900px]:col-span-12')}
        >
          {eyebrow}
        </p>

        {/* display-1 steps from 34px to 64px with the viewport (tokens). Below 720px the H1 holds an 18ch measure so
            it breaks between phrases; from 720px each sentence takes its own line. */}
        <Heading
          id={titleId}
          data-hero-step="1"
          className={cn(
            step,
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
            step,
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
            step,
            'mb-space-4 flex w-full flex-wrap items-center gap-space-3 max-[359px]:mb-space-2 min-[900px]:col-span-7',
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

        {/* The fact line is copy, so it is ink, in small, on its own hairline at the foot of the first screen. */}
        <p
          data-hero-step="3"
          className={cn(
            step,
            'small mt-auto border-t border-rule pt-space-4 text-ink max-[359px]:pt-space-3',
            'min-[900px]:col-span-12 min-[900px]:row-start-6 min-[900px]:mt-space-8 min-[900px]:self-end',
          )}
        >
          {fact}
        </p>
      </div>
    </section>
  );
}
