import * as React from 'react';

import { fieldClasses } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// The shadcn/ui Textarea (new-york), restyled to the brand book's Forms rules with the Input's field classes: the same
// fill, border, radius, padding, type and states. It starts at 120px, Phase 1's height for "the one thing you'd want
// fixed first" (about four lines of body), and the visitor can drag it taller; it never shrinks below that.

export type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, rows = 4, ...props }, ref) => (
  <textarea
    rows={rows}
    className={cn(fieldClasses, 'min-h-[calc(var(--space-24)+var(--space-6))] resize-y', className)}
    ref={ref}
    {...props}
  />
));
Textarea.displayName = 'Textarea';

export { Textarea };
