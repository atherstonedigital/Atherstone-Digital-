'use client';

import * as React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// The shadcn/ui Label (new-york, on Radix Label), restyled to the brand book's Forms rules: the label sits above its
// field in small, weight 500, ink. A placeholder is never the only label.
//
// One addition to the shadcn shape: `required` writes "(required)" in words after the label, never an asterisk alone
// (brand book, Forms). It is set in weight 400 and ink-muted, as Phase 1 set it, so the label itself stays the
// strongest line. ink-muted measures 7.18:1 on paper-raised (light) and 7.68:1 (dark).

const labelVariants = cva('small font-medium text-ink peer-disabled:cursor-default peer-disabled:opacity-40');

export interface LabelProps
  extends React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>,
    VariantProps<typeof labelVariants> {
  /** Writes "(required)" after the label. */
  required?: boolean;
  /** The words used for required; change only with the brand owner. */
  requiredText?: string;
}

const Label = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, children, required = false, requiredText = '(required)', ...props }, ref) => (
    <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props}>
      {children}
      {required ? <span className="font-normal text-ink-muted"> {requiredText}</span> : null}
    </LabelPrimitive.Root>
  ),
);
Label.displayName = LabelPrimitive.Root.displayName;

export { Label, labelVariants };
