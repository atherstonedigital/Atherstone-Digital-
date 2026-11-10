import * as React from 'react';

import { cn } from '@/lib/utils';

// The shadcn/ui Input (new-york), restyled to the brand book's Forms rules. Fields must look like fields, not like
// plain text: paper-raised fill, a 1px rule-strong border (3.94:1 on paper-raised in light, 5.34:1 in dark, so the
// border meets 3:1 as a meaningful border), radius-sm, space-3 by space-4 padding, body text, 44px minimum height.
//
// States
//   hover      the border becomes ink, in 150ms (colour transitions only; none under reduced motion)
//   focus      the global focus ring from app/globals.css: 2px solid focus, 2px offset. Never removed.
//   invalid    aria-invalid="true" (set by FormControl) turns the border signal-critical; the message sits below.
//   disabled   40% opacity and cursor default, as the Button component's disabled state.
//
// Autofill: browsers paint their own pale blue behind autofilled text, which turns the field light in the dark theme.
// The inset box-shadow repaints the field's own paper-raised fill over it. It is a fill, not a visible shadow, so the
// brand's no-shadow rule holds.
//
// fieldClasses is shared with Textarea and SelectTrigger so the three controls are one family.

export const fieldClasses = cn(
  'body m-0 block min-h-touch-target w-full min-w-0 appearance-none',
  'rounded-radius-sm border border-rule-strong bg-paper-raised px-space-4 py-space-3 text-ink',
  'placeholder:text-ink-muted placeholder:opacity-100',
  'hover:border-ink aria-[invalid=true]:border-signal-critical',
  '[transition:border-color_var(--duration-colour)_ease-out] motion-reduce:transition-none',
  'disabled:cursor-default disabled:opacity-40 disabled:hover:border-rule-strong',
  'autofill:shadow-[inset_0_0_0_1000px_var(--paper-raised)] autofill:[-webkit-text-fill-color:var(--ink)]',
);

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...props }, ref) => (
  <input type={type} className={cn(fieldClasses, className)} ref={ref} {...props} />
));
Input.displayName = 'Input';

export { Input };
