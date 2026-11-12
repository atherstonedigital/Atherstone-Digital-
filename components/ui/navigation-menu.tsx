import * as React from 'react';
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu';
import { cva } from 'class-variance-authority';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

// The shadcn/ui NavigationMenu (new-york, on Radix), restyled to docs/brand for the two nav dropdowns, Services and
// Sectors. Radix supplies the behaviour: hover intent on a mouse, click or Enter to toggle, arrow keys between the top
// items, ArrowDown into an open panel, Escape to close and return focus to the trigger.
//
// Two shadcn parts are left out. NavigationMenuViewport renders every panel in one shared box that animates its width
// and height, and NavigationMenuIndicator slides a marker by animating width and position: both animate layout
// properties, which the brand forbids. Without a viewport, Radix renders each panel in place, so it hangs under its
// own trigger, as Phase 1's did.

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    // Root renders the <nav> landmark (Radix labels it "Main" unless aria-label says otherwise). It stretches to its
    // parent's height so each item does, and a panel at top-full hangs from the bottom of the bar.
    className={cn('relative flex items-stretch', className)}
    {...props}
  >
    {children}
  </NavigationMenuPrimitive.Root>
));
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn('flex h-full list-none items-stretch gap-space-4', className)}
    {...props}
  />
));
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Item>
>(({ className, ...props }, ref) => (
  // relative: the item is the panel's containing block. The trigger or link sits centred in the item's full height.
  <NavigationMenuPrimitive.Item ref={ref} className={cn('relative flex items-center', className)} {...props} />
));
NavigationMenuItem.displayName = NavigationMenuPrimitive.Item.displayName;

/**
 * A top-level nav control: a dropdown trigger, or a link styled to match one (shadcn's navigationMenuTriggerStyle). Ink
 * in the button style at weight 500, a 44px target, a 1px underline 3px below that draws in brass-600 on hover and on
 * press, as every link's does (Phase 2.7, step 8, and its review: hover is one thing). The current page, or the section
 * a dropdown leads to, is marked by aria-current with a 2px brass-600 underline instead of a colour change (brand book,
 * States). The brass rule comes after hover in the stylesheet, so it holds on hover.
 */
const navigationMenuTriggerStyle = cva([
  'button inline-flex min-h-touch-target cursor-pointer items-center gap-space-1 whitespace-nowrap bg-transparent p-0 font-medium text-ink',
  'underline decoration-transparent decoration-1 underline-offset-[3px]',
  // The underline draws on hover and on press, so a tap answers on touch (Phase 3 review).
  'transition-[text-decoration-color] duration-colour ease-out hover:decoration-brass-600 active:decoration-brass-600 motion-reduce:transition-none',
  'aria-[current=page]:decoration-brass-600 aria-[current=page]:decoration-2',
  'aria-[current=true]:decoration-brass-600 aria-[current=true]:decoration-2',
]);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger ref={ref} className={cn(navigationMenuTriggerStyle(), 'group', className)} {...props}>
    {children}
    {/* The chevron turns at once: the brand animates colour, the press and the drawer, nothing else. */}
    <ChevronDown size={20} strokeWidth={1.5} aria-hidden="true" className="shrink-0 group-data-[state=open]:rotate-180" />
  </NavigationMenuPrimitive.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    // The dropdown panel: paper-raised, a rule border, radius-0, no shadow, as wide as its longest link. Its top edge
    // sits on the bottom of the item, so in the nav bar it hangs from the bar's own hairline. No enter or exit motion.
    className={cn(
      'absolute left-0 top-full z-dropdown w-max border border-rule bg-paper-raised py-space-2 text-ink',
      className,
    )}
    {...props}
  />
));
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

/**
 * A link inside a dropdown panel: a 44px row in body at weight 500, padded space-4, so its text lines up with the
 * trigger's when the panel is offset left by space-4 plus its 1px border. Same underline and aria-current marking as
 * the top-level links.
 */
const navigationMenuPanelLinkStyle = cva([
  'body flex min-h-touch-target items-center whitespace-nowrap px-space-4 font-medium text-ink',
  'underline decoration-transparent decoration-1 underline-offset-[3px]',
  'transition-[text-decoration-color] duration-colour ease-out hover:decoration-brass-600 active:decoration-brass-600 motion-reduce:transition-none',
  'aria-[current=page]:decoration-brass-600 aria-[current=page]:decoration-2',
]);

export {
  navigationMenuTriggerStyle,
  navigationMenuPanelLinkStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
};
