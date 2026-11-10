'use client';

import * as React from 'react';
import * as SheetPrimitive from '@radix-ui/react-dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

// The shadcn/ui Sheet (new-york, on Radix Dialog), restyled to docs/brand. A sheet is an opaque panel on paper-raised
// with a 1px rule edge: no shadow, no blur, no translucency, no scrim colour (brand book, Motion: materials).
//
// The sheet has no motion of its own. shadcn animates it with tailwindcss-animate keyframes, which this project does
// not use, and the brand moves its one sheet, the nav drawer, with GSAP (components/site/DrawerGesture.tsx). Used on
// its own, a sheet opens and closes at once, which is also the brand's reduced-motion behaviour.

const Sheet = SheetPrimitive.Root;

const SheetTrigger = SheetPrimitive.Trigger;

const SheetClose = SheetPrimitive.Close;

const SheetPortal = SheetPrimitive.Portal;

const SheetOverlay = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Overlay
    ref={ref}
    // Transparent on purpose. The overlay takes a press outside the panel (which closes the sheet) and carries Radix's
    // scroll lock; it does not dim the page, because the brand's surfaces are opaque and Phase 1's drawer had no scrim.
    className={cn('fixed inset-0 z-sheet-overlay bg-transparent', className)}
    {...props}
  />
));
SheetOverlay.displayName = SheetPrimitive.Overlay.displayName;

const sheetVariants = cva(
  // A column, so a header can sit above a body that scrolls. The panel itself never scrolls, so nothing clips the
  // strip drawn past its outer edge (below).
  'fixed z-sheet flex flex-col border-rule bg-paper-raised text-ink',
  {
    variants: {
      side: {
        top: 'inset-x-0 top-0 max-h-[100dvh] border-b',
        bottom: 'inset-x-0 bottom-0 max-h-[100dvh] border-t',
        // The full width on a phone, sheet-width (420px, Phase 1's drawer width; a proposed layout token) from there up.
        // The ::after strip continues the panel past the screen edge, so
        // when a drag pulls it past its open position (edge resistance) the reader sees more panel, never a gap.
        left: [
          'inset-y-0 left-0 w-full max-w-sheet-width border-r',
          'after:absolute after:inset-y-0 after:right-full after:w-space-24 after:bg-paper-raised',
        ],
        right: [
          'inset-y-0 right-0 w-full max-w-sheet-width border-l',
          'after:absolute after:inset-y-0 after:left-full after:w-space-24 after:bg-paper-raised',
        ],
      },
    },
    defaultVariants: {
      side: 'right',
    },
  },
);

interface SheetContentProps
  extends React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>,
    VariantProps<typeof sheetVariants> {
  /** The close button in the header row. On by default; a sheet must always offer one. */
  showClose?: boolean;
  /** The close button's accessible name. */
  closeLabel?: string;
}

const SheetContent = React.forwardRef<React.ElementRef<typeof SheetPrimitive.Content>, SheetContentProps>(
  ({ side = 'right', className, children, showClose = true, closeLabel = 'Close', forceMount, ...props }, ref) => (
    // forceMount reaches the portal and the overlay too, so a wrapper that keeps the sheet mounted through its own exit
    // motion (DrawerGesture) keeps all three together.
    <SheetPortal forceMount={forceMount}>
      <SheetOverlay forceMount={forceMount} />
      <SheetPrimitive.Content
        ref={ref}
        forceMount={forceMount}
        className={cn(sheetVariants({ side }), className)}
        {...props}
      >
        {showClose ? (
          // First in the DOM, so it is the first thing focused when the sheet opens; drawn at the right of the header
          // row, where the bar's menu toggle sits: the 44px secondary icon button, the gutter from the edge, centred in
          // the nav height.
          <SheetPrimitive.Close
            className={cn(
              buttonVariants({ variant: 'secondary', size: 'icon' }),
              'absolute right-gutter top-[calc((var(--nav-height)_-_var(--touch-target))_/_2)]',
            )}
          >
            <X size={20} strokeWidth={1.5} aria-hidden="true" />
            <span className="sr-only">{closeLabel}</span>
          </SheetPrimitive.Close>
        ) : null}
        {children}
      </SheetPrimitive.Content>
    </SheetPortal>
  ),
);
SheetContent.displayName = SheetPrimitive.Content.displayName;

/** A row the height of the nav bar with a rule beneath, so an open sheet's header lines up with the bar it covers. */
const SheetHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      'flex min-h-nav-height shrink-0 items-center gap-space-4 border-b border-rule px-gutter',
      // Room on the right for the close button: its width plus a space-4 gap.
      'pr-[calc(var(--gutter)_+_var(--touch-target)_+_var(--space-4))]',
      className,
    )}
    {...props}
  />
);
SheetHeader.displayName = 'SheetHeader';

const SheetFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn('mt-auto flex flex-col gap-space-3 border-t border-rule px-gutter py-space-4', className)}
    {...props}
  />
);
SheetFooter.displayName = 'SheetFooter';

/** Required: it names the dialog for screen readers. Style it as an eyebrow where a heading would be too loud. */
const SheetTitle = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Title>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Title ref={ref} className={cn('heading-2 text-ink', className)} {...props} />
));
SheetTitle.displayName = SheetPrimitive.Title.displayName;

const SheetDescription = React.forwardRef<
  React.ElementRef<typeof SheetPrimitive.Description>,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Description>
>(({ className, ...props }, ref) => (
  <SheetPrimitive.Description ref={ref} className={cn('small text-ink-muted', className)} {...props} />
));
SheetDescription.displayName = SheetPrimitive.Description.displayName;

export {
  Sheet,
  SheetPortal,
  SheetOverlay,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
  sheetVariants,
};
