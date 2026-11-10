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

// The mobile nav drawer's motion, one of the two jobs the brand gives GSAP (brand book, Building it). The drawer is a
// shadcn Sheet (Radix Dialog) that enters and leaves from the right on the same path. While open it follows the finger
// or pointer 1:1 (Draggable), and on release it settles open or closed with the release velocity (InertiaPlugin),
// finishing in the direction of travel. Only x, a transform, is animated.
//
// State and motion are kept apart, as the brand book's States rule asks: the open state is set at once by whatever
// closes or opens the drawer (the toggle, the close button, Escape, a press outside, a link, a release), and the
// motion runs from wherever the panel is on screen. A press on a moving panel stops it under the finger (Draggable kills
// the running tween), so every transition is interruptible and nothing is ever left half open.
//
// Radix unmounts a closed sheet at once unless a CSS animation is running, so this component keeps the panel mounted
// (forceMount) until the exit motion ends. Radix's own state still flips at once: the focus trap lets go, the trigger
// reads aria-expanded false, and focus returns to the toggle as the sheet unmounts, as with shadcn's CSS exit. Input
// does too: the transparent overlay unmounts and the body's pointer-events lock lets go as the state closes, so the
// page takes a tap while the panel is still sliding away. Unmounting never waits on the tween alone: a timer backs it
// up.

if (typeof window !== 'undefined') {
  // Registered here, in the only client component that moves anything, and only in the browser.
  gsap.registerPlugin(useGSAP, Draggable, InertiaPlugin, CustomEase);
}

const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

/** A thrown release settles in 300 to 350ms with no overshoot (brand book, Motion: carry velocity). */
const THROW_SECONDS = { min: 0.3, max: 0.35 } as const;
/** Opening and closing without a gesture (the toggle, Escape, a link): the duration-drawer token. */
const SETTLE_SECONDS = durationMs.drawer / 1000;
/** Releases slower than this go to the nearer state; faster ones finish in the direction of travel (px/s). */
const DIRECTION_SPEED = 50;
/** A velocity sample older than this means the finger stopped before it let go (ms). */
const VELOCITY_STALE_MS = 100;
/** Movement before a press becomes a drag (px), so a tap on a link stays a tap: the Apple skill's hysteresis. */
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
  const exitTimer = React.useRef<number | undefined>(undefined);
  const settleRef = React.useRef<((toOpen: boolean) => void) | null>(null);
  const durationRef = React.useRef(SETTLE_SECONDS);
  // The last few pointer samples, for the release velocity: x, time, and a smoothed px/s.
  const track = React.useRef({ x: 0, t: 0, v: 0 });

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
        const draggable = draggableRef.current;
        // A finger on the panel, a throw in flight or a reopen all keep it mounted.
        if (openRef.current || draggable?.isPressed || draggable?.isThrowing) return;
        setExiting(false);
      };

      // Moves the panel to open or closed from wherever it is now. contextSafe: tweens made later, from effects and
      // Draggable callbacks, still belong to this context and are reverted with it.
      const settle = contextSafe((toOpen: boolean) => {
        clearExitTimer();
        tweenRef.current?.kill();
        const target = toOpen ? 0 : closedX();
        const duration = durationRef.current;
        const current = Number(gsap.getProperty(el, 'x'));
        if (duration === 0 || Math.abs(current - target) < 0.5) {
          gsap.set(el, { x: target });
          sync();
          if (!toOpen) finishExit();
          return;
        }
        tweenRef.current = gsap.to(el, {
          x: target,
          duration,
          ease: getDrawerEase(),
          overwrite: 'auto',
          onComplete: () => {
            sync();
            if (!toOpen) finishExit();
          },
        });
        if (!toOpen) exitTimer.current = window.setTimeout(finishExit, duration * 1000 + EXIT_GRACE_MS);
      });
      settleRef.current = settle;

      // A new panel starts closed, off the edge it enters from, before the first paint; the open effect below then
      // brings it in.
      gsap.set(el, { x: closedX() });

      const mm = gsap.matchMedia();
      mm.add({ reduce: REDUCED_MOTION, full: FULL_MOTION }, (context) => {
        const reduce = Boolean(context.conditions?.reduce);
        durationRef.current = reduce ? 0 : SETTLE_SECONDS;

        const velocity = () =>
          performance.now() - track.current.t > VELOCITY_STALE_MS ? 0 : track.current.v;

        // Where a release goes: in the direction of travel when the finger was moving, otherwise to the nearer state.
        // Positive velocity is towards closed (the panel leaves to the right).
        const decide = (position: number, speed: number) => {
          const closed = closedX();
          if (Math.abs(speed) >= DIRECTION_SPEED) return speed > 0 ? closed : 0;
          return position >= closed / 2 ? closed : 0;
        };

        const [draggable] = Draggable.create(el, {
          type: 'x',
          bounds: { minX: 0, maxX: closedX() },
          edgeResistance: EDGE_RESISTANCE,
          // InertiaPlugin carries the release velocity into the settle, so there is no seam between finger and motion,
          // and lands exactly on the state the snap function picks from the projected end point.
          inertia: !reduce,
          snap: { x: (end: number) => decide(end, velocity()) },
          minDuration: THROW_SECONDS.min,
          maxDuration: THROW_SECONDS.max,
          overshootTolerance: 0,
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
            this.applyBounds({ minX: 0, maxX: closedX() });
            this.update();
            track.current = { x: this.x, t: performance.now(), v: 0 };
          },
          onDrag(this: Draggable) {
            const now = performance.now();
            const elapsed = now - track.current.t;
            if (elapsed > 0) {
              const instant = ((this.x - track.current.x) / elapsed) * 1000;
              track.current = { x: this.x, t: now, v: track.current.v * 0.3 + instant * 0.7 };
            }
          },
          onRelease(this: Draggable) {
            // The state is decided now, at release, not when the motion lands.
            const closed = closedX();
            const target = this.isThrowing ? this.endX : decide(this.x, velocity());
            const toOpen = target < closed / 2;
            // No throw (reduced motion, or a press that stopped a tween and let go without dragging): settle here.
            if (!this.isThrowing) settle(toOpen);
            if (toOpen !== openRef.current) onOpenChangeRef.current(toOpen);
          },
          onThrowComplete() {
            sync();
            if (!openRef.current) finishExit();
          },
        });
        draggableRef.current = draggable;

        return () => {
          draggable.kill();
          draggableRef.current = null;
        };
      });
    },
    { dependencies: [panel], scope, revertOnUpdate: true },
  );

  // Follows the open state, whoever set it. After useGSAP, so on the first open the panel is already placed off screen.
  useIsomorphicLayoutEffect(() => {
    openRef.current = open;
    if (!panel) return;
    const draggable = draggableRef.current;
    // A finger is on the panel: its release decides.
    if (draggable?.isPressed) return;
    if (draggable?.isThrowing) {
      // A throw already heading for this state lands by itself; one heading the other way is overruled (say, Escape
      // during a throw back open).
      const landsOpen = draggable.endX < panel.offsetWidth / 2;
      if (landsOpen === open) return;
      draggable.tween?.kill();
    }
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
