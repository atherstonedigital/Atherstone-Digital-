import { cn } from '@/lib/utils';

// The Select's panel and option classes, in a module without 'use client'. components/ui/select.tsx is a client module,
// so a value exported from it reaches a server component as a client reference, not a string: the design-system page's
// held "open" sample (a server component) imports them from here instead.

/** The list panel's classes. */
export const selectContentClasses = cn(
  'relative z-dropdown min-w-[8rem] overflow-hidden',
  'rounded-radius-0 border border-rule-strong bg-paper-raised text-ink',
);

/** What a highlighted option carries: the focus ring, inset. For the design-system page's held sample. */
export const selectItemHighlightClasses = 'outline outline-2 outline-offset-[-2px] outline-focus';

/** An option's classes, exported with the panel's for the held sample. */
export const selectItemClasses = cn(
  'body relative flex min-h-touch-target w-full cursor-pointer select-none items-center',
  'rounded-radius-0 py-space-2 pl-space-3 pr-[calc(var(--space-3)+20px+var(--space-2))] text-ink',
  // The highlighted option is the focused one (Radix moves focus to it), so it carries the focus ring, inset so the
  // viewport does not clip it. The global ring's 2px outward offset is turned inward for the same reason.
  'focus-visible:outline-offset-[-2px]',
  'data-[highlighted]:outline data-[highlighted]:outline-2 data-[highlighted]:outline-offset-[-2px] data-[highlighted]:outline-focus',
  'data-[disabled]:pointer-events-none data-[disabled]:opacity-40',
);
