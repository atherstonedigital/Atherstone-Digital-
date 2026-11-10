'use client';

import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';

import { fieldClasses } from '@/components/ui/input';
import { selectContentClasses, selectItemClasses } from '@/components/ui/select-styles';
import { cn } from '@/lib/utils';

// The shadcn/ui Select (new-york, on Radix Select), restyled to the brand book: the turnover band, number of showrooms
// and platform fields, so they work by keyboard and screen reader without extra work (brand book, Forms).
//
// Trigger   the Input's field classes (paper-raised, rule-strong border, radius-sm, 44px), the value in ink and the
//           placeholder ("Choose one") in ink-muted, and the chevron-down icon at 20px, 1.5 stroke, in ink. The
//           chevron is turned over while the list is open, at once, as the NavigationMenu trigger's is: the brand
//           book animates colour, underline thickness, the press and the drawer, and nothing else.
// List      an opaque paper-raised panel with a 1px rule-strong edge, radius-0, no shadow, no blur: the brand's
//           surfaces are opaque. The edge is rule-strong rather than rule because it is the only thing separating
//           the list from the fields it covers. It opens below the trigger at the trigger's width, on the dropdown
//           layer, and opens and closes at once (shadcn's tailwindcss-animate keyframes are not used here).
// Options   44px rows in body and ink, space-2 apart (brand book: 8px or more between neighbouring touch targets on
//           mobile). The option under the pointer or the keyboard carries the focus ring inset
//           (2px solid focus), the brand's one way of saying "this one"; the chosen option carries the check icon.
// The scroll buttons only appear on a list taller than the screen; they use the chevron-down icon, turned for "up",
// because the brand's six functional icons have no chevron-up.

const Select = SelectPrimitive.Root;

const SelectGroup = SelectPrimitive.Group;

const SelectValue = SelectPrimitive.Value;

const SelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      fieldClasses,
      // The chevron sits space-3 from the edge with space-1 before it, as Phase 1's select, so "Choose one" reads in
      // full in a third of the brief form from 30rem.
      'group/select-trigger flex cursor-pointer items-center justify-between gap-space-1 pr-space-3 text-left',
      'data-[placeholder]:text-ink-muted disabled:cursor-default',
      '[&>span]:line-clamp-1 [&>span]:min-w-0',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <ChevronDown
        aria-hidden="true"
        size={20}
        strokeWidth={1.5}
        className={cn('shrink-0 text-ink group-data-[state=open]/select-trigger:rotate-180')}
      />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
SelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const scrollButtonClasses = 'flex min-h-touch-target cursor-default items-center justify-center text-ink';

const SelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton ref={ref} className={cn(scrollButtonClasses, className)} {...props}>
    <ChevronDown aria-hidden="true" size={20} strokeWidth={1.5} className="rotate-180" />
  </SelectPrimitive.ScrollUpButton>
));
SelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

const SelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton ref={ref} className={cn(scrollButtonClasses, className)} {...props}>
    <ChevronDown aria-hidden="true" size={20} strokeWidth={1.5} />
  </SelectPrimitive.ScrollDownButton>
));
SelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

const SelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', sideOffset = 4, ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      position={position}
      sideOffset={position === 'popper' ? sideOffset : undefined}
      className={cn(
        selectContentClasses,
        position === 'popper' &&
          'max-h-[var(--radix-select-content-available-height)] w-[var(--radix-select-trigger-width)]',
        className,
      )}
      {...props}
    >
      <SelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'grid gap-space-2 p-space-1',
          position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <SelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
SelectContent.displayName = SelectPrimitive.Content.displayName;

const SelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn('eyebrow px-space-3 py-space-2 text-ink-muted', className)} {...props} />
));
SelectLabel.displayName = SelectPrimitive.Label.displayName;

const SelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(selectItemClasses, className)}
    {...props}
  >
    <span className="absolute right-space-3 flex size-[20px] items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check aria-hidden="true" size={20} strokeWidth={1.5} />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
SelectItem.displayName = SelectPrimitive.Item.displayName;

const SelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('my-space-1 h-px bg-rule', className)} {...props} />
));
SelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export {
  Select,
  SelectGroup,
  SelectValue,
  SelectTrigger,
  SelectContent,
  SelectLabel,
  SelectItem,
  SelectSeparator,
  SelectScrollUpButton,
  SelectScrollDownButton,
};
