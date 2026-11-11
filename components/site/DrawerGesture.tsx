'use client';

import * as React from 'react';
import gsap from 'gsap';
import { CustomEase } from 'gsap/CustomEase';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';
import { useGSAP } from '@gsap/react';

import { SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { durationMs, easing } from '@/lib/design/tokens';
import { cn } from '@/lib/utils';

// The mobile nav drawer's motion, one of the two jobs the brand gives GSAP (brand book, Building it; Phase 2.4 step 12:
// shadcn, gsap-plugins and apple-design). The drawer is a shadcn Sheet (Radix Dialog) that enters and leaves from the
// right on the same path. While open it follows the finger or pointer 1:1 (Draggable). InertiaPlugin tracks the
// panel's velocity, and on release the panel settles open or closed with a spring that starts at the finger's own
// speed, so there is no seam between the drag and the motion (apple-design: velocity handoff), and that overshoots its
// rest by 2px at most (brand book: "damping high enough that nothing overshoots more than 2px"). A release finishes in
// the direction of travel; a slow one goes to the state nearest the point the release projects to. Only x, a
// transform, is animated.
//
// A tap on the toggle, the close button, Escape, a press outside or a link opens or closes it on the drawer token
// (duration-drawer, ease-drawer: 320ms, no overshoot), the critically damped spring apple-design asks of motion that
// no gesture threw. Under reduced motion every open, close and release is instant; the drag itself still follows the
// finger, because that is direct manipulation, not animation.
//
// State and motion are kept apart, as the brand book's States rule asks: the open state is set at once by whatever
// closes or opens the drawer, and the motion runs from wherever the panel is on screen. A press on a moving panel stops
// it under the finger (Draggable kills the running tween), so every transition is interruptible and nothing is ever
// left half open.
//
// Radix unmounts a closed sheet at once unless a CSS animation is running, so this component keeps the panel mounted
// (forceMount) until the exit motion ends. Radix's own state still flips at once: the focus trap lets go, the trigger
// reads aria-expanded false, and focus returns to the toggle as the sheet unmounts, as with shadcn's CSS exit. Input
// does too: the transparent overlay unmounts and the body's pointer-events lock lets go as the state closes, so the
// page takes a tap while the panel is still sliding away. Unmounting never waits on the tween alone: a timer backs it
// up.

if (typeof window !== 'undefined') {
  // Registered here, in the only client component that moves anything after load, and only in the browser.
  gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin, CustomEase);
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/** Opening and closing without a gesture (the toggle, Escape, a link): the duration-drawer token. */
const SETTLE_SECONDS = durationMs.drawer / 1000;
/** A release settles in 300 to 350ms (brand book, Motion: carry velocity), the longer the further it has to go. */
const RELEASE_SECONDS = { min: 0.3, max: 0.35 } as const;
/** The furthest a release may carry the panel past its rest (px). The brand book allows 2px; this keeps inside it. */
const MAX_OVERSHOOT = 1.9;
/** A release faster than this finishes in its direction of travel; a slower one goes to the nearer state (px/s). */
const DIRECTION_SPEED = 50;
/** apple-design's projection: where a release would come to rest under normal scroll deceleration. */
const DECELERATION_RATE = 0.998;
/** Movement before a press becomes a drag (px), so a tap on a link stays a tap: apple-design's hysteresis. */
const DRAG_THRESHOLD = 8;
/** Past the open edge the panel follows at this resistance, so the bound gives softly instead of stopping dead. */
const EDGE_RESISTANCE = 0.85;
/** The backup for unmounting a closed drawer if its exit tween never completes (ms after the tween's duration). */
const EXIT_GRACE_MS = 150;

const REDUCED_MOTION = '(prefers-reduced-motion: reduce)';
const FULL_MOTION = '(prefers-reduced-motion: no-preference)';

let drawerEase: gsap.EaseFunction | undefined;

/** The ease-drawer token as a GSAP ease, built once. It settles without overshoot. */
function getDrawerEase(): gsap.EaseFunction {
  drawerEase ??= CustomEase.create('drawer', easing.drawer.replace(/cubic-bezier\(|\)|\s/g, '')) as gsap.EaseFunction;
  return drawerEase;
}

/** How far a release would carry on by itself (px), from its velocity (px/s): apple-design's project(). */
function project(velocity: number) {
  return ((velocity / 1000) * DECELERATION_RATE) / (1 - DECELERATION_RATE);
}

// ------------------------------------------------------------------ the release spring
//
// The settle is one curve from a family shaped like a damped spring: f(t) = 1 - (1 - t)^3 (1 + c t). It starts at the
// release's own speed, f'(0) = 3 - c (the speed as a share of the distance per duration), and lands with no speed and
// no acceleration, f'(1) = f''(1) = 0, so it comes to rest instead of stopping. Up to a starting speed of 4 it never
// passes its rest; a faster start (c < -1) overshoots once and comes back, by (1 - t*)^3 (|c| t* - 1) of the distance
// at t* = (3 + |c|) / (4 |c|), which works out as 27 (|c| - 1)^4 / (256 |c|^3). The speed is capped where that
// overshoot would pass MAX_OVERSHOOT for the distance at hand, so the 2px limit holds at every drawer width.

/** The overshoot, as a share of the distance, of the curve that starts at this speed. */
function overshootShare(speed: number) {
  const a = speed - 3;
  return a <= 1 ? 0 : (27 * (a - 1) ** 4) / (256 * a ** 3);
}

/** The fastest start whose overshoot stays within MAX_OVERSHOOT over this distance (px). */
function maxSpeedFor(distance: number) {
  const limit = MAX_OVERSHOOT / Math.max(distance, 1);
  let low = 4;
  let high = 4;
  while (overshootShare(high) < limit && high < 1e4) high *= 2;
  for (let i = 0; i < 30; i += 1) {
    const mid = (low + high) / 2;
    if (overshootShare(mid) <= limit) low = mid;
    else high = mid;
  }
  return low;
}

/** The settle curve for a release: speed is the finger's velocity as a share of the distance per duration. */
function springEase(speed: number): gsap.EaseFunction {
  const c = 3 - speed;
  return (t) => (t >= 1 ? 1 : 1 - (1 - t) ** 3 * (1 + c * t));
}

export interface DrawerGestureProps {
  /** The open state, owned by the parent Sheet's onOpenChange. */
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** The sheet's title, shown in its header row: it names the dialog for screen readers. */
  title: string;
  /** The close button's accessible name. */
  closeLabel?: string;
  /** Classes for the panel (the Radix Content). */
  className?: string;
  /** The drawer body. It scrolls on its own below the header when it is taller than the screen. */
  children: React.ReactNode;
  /** Radix's close focus handler: call event.preventDefault() to send focus somewhere other than the trigger. */
  onCloseAutoFocus?: (event: Event) => void;
}

/**
 * The drawer panel with its gesture. Render it inside a <Sheet> whose open state it shares, next to the SheetTrigger.
 * Under prefers-reduced-motion it opens and closes instantly and a release snaps at once; the drag itself still
 * follows the finger, because that is direct manipulation, not animation.
 */
export function DrawerGesture({
  open,
  onOpenChange,
  title,
  closeLabel,
  className,
  children,
  onCloseAutoFocus,
}: DrawerGestureProps) {
  // Mounted while open and while the exit runs. Adjusted during render (React's pattern for state derived from a
  // prop), so the sheet mounts in the same render that opens it.
  const [exiting, setExiting] = React.useState(false);
  const [previousOpen, setPreviousOpen] = React.useState(open);
  if (open !== previousOpen) {
    setPreviousOpen(open);
    setExiting(!open);
  }
  const mounted = open || exiting;

  // The panel arrives through a portal a render after the sheet, so it is held in state: the effects below run again
  // when it appears or goes. The ref is the useGSAP scope.
  const [panel, setPanel] = React.useState<HTMLDivElement | null>(null);
  const scope = React.useRef<HTMLDivElement | null>(null);
  const panelRef = React.useCallback((node: HTMLDivElement | null) => {
    scope.current = node;
    setPanel(node);
  }, []);

  const openRef = React.useRef(open);
  const onOpenChangeRef = React.useRef(onOpenChange);
  const draggableRef = React.useRef<Draggable | null>(null);
  const tweenRef = React.useRef<gsap.core.Tween | null>(null);
  /** The state the running tween is heading for, so the open-state effect never restarts a release's spring. */
  const headingOpenRef = React.useRef<boolean | null>(null);
  const exitTimer = React.useRef<number | undefined>(undefined);
  const settleRef = React.useRef<((toOpen: boolean, velocity?: number) => void) | null>(null);
  const reduceRef = React.useRef(false);
  /** Whether the press now under way has moved the panel: a press that only caught it decides nothing. */
  const draggedRef = React.useRef(false);

  useIsomorphicLayoutEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  });

  useGSAP(
    (_context, contextSafe) => {
      const el = scope.current;
      if (!el || !contextSafe) return;

      const closedX = () => el.offsetWidth;
      const clearExitTimer = () => {
        window.clearTimeout(exitTimer.current);
        exitTimer.current = undefined;
      };
      // Draggable keeps its own copy of x; tell it where a tween left the panel.
      const sync = () => draggableRef.current?.update();

      const finishExit = () => {
        clearExitTimer();
        // A finger on the panel or a reopen keeps it mounted.
        if (openRef.current || draggableRef.current?.isPressed) return;
        setExiting(false);
      };

      // Moves the panel to open or closed from wherever it is now. Without a velocity (a tap, a key, a link) it runs
      // on the drawer token; with one (a release) it runs the spring that starts at that speed. contextSafe: tweens
      // made later, from effects and Draggable callbacks, still belong to this context and are reverted with it.
      const settle = contextSafe((toOpen: boolean, velocity?: number) => {
        clearExitTimer();
        tweenRef.current?.kill();
        tweenRef.current = null;
        headingOpenRef.current = null;
        const target = toOpen ? 0 : closedX();
        const current = Number(gsap.getProperty(el, 'x'));
        const distance = target - current;
        const done = () => {
          tweenRef.current = null;
          headingOpenRef.current = null;
          sync();
          if (!toOpen) finishExit();
        };
        if (reduceRef.current || Math.abs(distance) < 0.5) {
          gsap.set(el, { x: target });
          done();
          return;
        }

        let duration = SETTLE_SECONDS;
        let ease: gsap.EaseFunction = getDrawerEase();
        if (velocity !== undefined) {
          const share = Math.min(1, Math.abs(distance) / Math.max(closedX(), 1));
          duration = RELEASE_SECONDS.min + (RELEASE_SECONDS.max - RELEASE_SECONDS.min) * share;
          // The finger's speed as a share of the distance per duration; a release moving away from its target (only
          // a slow one goes to the nearer state against its motion) starts from rest instead of backing off first.
          const speed = Math.max(0, (velocity * duration) / distance);
          ease = springEase(Math.min(speed, maxSpeedFor(Math.abs(distance))));
        }

        headingOpenRef.current = toOpen;
        tweenRef.current = gsap.to(el, { x: target, duration, ease, overwrite: 'auto', onComplete: done });
        if (!toOpen) exitTimer.current = window.setTimeout(finishExit, duration * 1000 + EXIT_GRACE_MS);
      });
      settleRef.current = settle;

      // A new panel starts closed, off the edge it enters from, before the first paint; the open effect below then
      // brings it in.
      gsap.set(el, { x: closedX() });
      // InertiaPlugin's velocity tracker reads the panel's x about 20 times a second while it is mounted, so a release
      // knows how fast the finger was moving, and reads 0 once the finger has rested for 200ms.
      InertiaPlugin.track(el, 'x');

      const mm = gsap.matchMedia();
      mm.add({ reduce: REDUCED_MOTION, full: FULL_MOTION }, (context) => {
        reduceRef.current = Boolean(context.conditions?.reduce);

        const [draggable] = Draggable.create(el, {
          type: 'x',
          bounds: { minX: 0, maxX: closedX() },
          edgeResistance: EDGE_RESISTANCE,
          // The release is ours (settle, above), so the spring can start at the finger's speed and hold the 2px limit.
          inertia: false,
          // The drawer is mostly links, so a drag may start on one; Draggable swallows the click after a real drag.
          dragClickables: true,
          minimumMovement: DRAG_THRESHOLD,
          // Vertical swipes stay native scrolling in the drawer body; horizontal ones drag.
          allowNativeTouchScrolling: true,
          allowContextMenu: true,
          zIndexBoost: false,
          cursor: 'auto',
          activeCursor: 'grabbing',
          onPressInit(this: Draggable) {
            // Before Draggable records where the press started: read the panel where a tween left it, so the grab
            // keeps the offset from where the finger landed. Draggable then kills the tween, freezing the panel.
            clearExitTimer();
            draggedRef.current = false;
            this.applyBounds({ minX: 0, maxX: closedX() });
            this.update();
          },
          onPress() {
            // Draggable has killed the running tween: the panel rests under the finger.
            tweenRef.current = null;
            headingOpenRef.current = null;
          },
          onDragStart() {
            draggedRef.current = true;
          },
          onRelease(this: Draggable) {
            // A press that caught a moving panel, or a tap on a link, and let go without dragging: the panel carries
            // on to the state already set, from rest, so a tap never flips the drawer.
            if (!draggedRef.current) {
              settle(openRef.current, 0);
              return;
            }
            // The state is decided now, at release, not when the motion lands, and under reduced motion too: only the
            // settle is instant there, the throw still decides where it goes.
            const closed = closedX();
            const velocity = InertiaPlugin.getVelocity(el, 'x') || 0;
            const toOpen =
              Math.abs(velocity) >= DIRECTION_SPEED ? velocity < 0 : this.x + project(velocity) < closed / 2;
            settle(toOpen, velocity);
            if (toOpen !== openRef.current) onOpenChangeRef.current(toOpen);
          },
        });
        draggableRef.current = draggable;

        return () => {
          draggable.kill();
          draggableRef.current = null;
        };
      });

      return () => {
        InertiaPlugin.untrack(el, 'x');
        // The context's revert has killed any tween it made.
        tweenRef.current = null;
        headingOpenRef.current = null;
      };
    },
    { dependencies: [panel], scope, revertOnUpdate: true },
  );

  // Follows the open state, whoever set it. After useGSAP, so on the first open the panel is already placed off screen.
  useIsomorphicLayoutEffect(() => {
    openRef.current = open;
    if (!panel) return;
    // A finger is on the panel: its release decides.
    if (draggableRef.current?.isPressed) return;
    // A release's spring already heading for this state lands by itself; one heading the other way is overruled
    // from where the panel is (say, Escape during a release back open). tweenRef holds a tween only while it runs (a
    // new tween is not yet isActive() before its first frame, which is when a release's state change arrives here).
    if (tweenRef.current && headingOpenRef.current === open) return;
    settleRef.current?.(open);
  }, [open, panel]);

  // The page takes input again the moment the state closes, not when the exit motion ends (Phase 3 review). Radix's
  // modal layer sets the body's pointer-events to none while the panel is mounted, and forceMount keeps it mounted
  // through the exit, so without this a tap on the page in those 320ms was swallowed. Only the release is ours: Radix
  // locks the body itself when the panel mounts, and records the value to restore at that moment, so setting it here
  // first would make Radix restore "none" and leave the page dead. A reopen mid-exit, after a release, locks it again.
  const releasedBody = React.useRef(false);
  useIsomorphicLayoutEffect(() => {
    if (!panel) {
      releasedBody.current = false;
      return;
    }
    if (!open) {
      document.body.style.pointerEvents = '';
      releasedBody.current = true;
    } else if (releasedBody.current) {
      document.body.style.pointerEvents = 'none';
      releasedBody.current = false;
    }
  }, [open, panel]);

  React.useEffect(() => () => window.clearTimeout(exitTimer.current), []);

  if (!mounted) return null;

  return (
    <SheetContent
      forceMount
      ref={panelRef}
      side="right"
      closeLabel={closeLabel}
      onCloseAutoFocus={onCloseAutoFocus}
      // The title names the dialog; there is no separate description.
      aria-describedby={undefined}
      // will-change on the drawer only (brand book, GSAP rules).
      className={cn('will-change-transform', className)}
    >
      <SheetHeader>
        <SheetTitle className="eyebrow text-ink-muted">{title}</SheetTitle>
      </SheetHeader>
      {/* scroll-py-space-2: a link tabbed to at the foot of a short screen stops 8px from the edge, so the scroller
          never clips the lower part of its focus ring (2px wide, 2px out). */}
      <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain scroll-py-space-2">{children}</div>
    </SheetContent>
  );
}
