'use client';

import * as React from 'react';
import type * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import {
  Controller,
  FormProvider,
  useFormContext,
  type ControllerProps,
  type FieldPath,
  type FieldValues,
} from 'react-hook-form';

import { Label, type LabelProps } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// The shadcn/ui Form (new-york, on react-hook-form), restyled to the brand book's Forms rules:
//   - FormItem stacks label, control and message space-2 apart, the Phase 1 field rhythm. The space is the label's
//     margin below and the message's margin above, not a grid gap, so an item can join a row's subgrid (three tracks:
//     label, control, message) and an empty message track adds nothing. In such a row the labels sit on their controls
//     (self-end), so a label that wraps to two lines never pushes its control out of line with its neighbours'.
//   - FormLabel stays ink when the field fails. Only the message and the field's border turn signal-critical.
//   - FormMessage sits directly below its field in small, signal-critical, and is linked to the control with
//     aria-describedby. Its text says what to do ("Enter your name."), never just "Invalid".
//   - FormDescription, when used, is small and ink-muted (a caption), and is linked the same way.
// Two changes from the shadcn source, both for screen readers (ui-ux-pro-max, Forms: errors are announced and linked):
//   - aria-describedby lists only ids that exist on the page (the description once it is rendered, the message only
//     while there is one), so a screen reader is never pointed at a missing element;
//   - FormMessage is always in the page as a polite live region, empty until the field fails, so an error found on
//     blur is read out after the next field's name, not only when the visitor comes back to the field.

const Form = FormProvider;

type FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
};

const FormFieldContext = React.createContext<FormFieldContextValue | null>(null);

const FormField = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
>({
  ...props
}: ControllerProps<TFieldValues, TName>) => (
  <FormFieldContext.Provider value={{ name: props.name }}>
    <Controller {...props} />
  </FormFieldContext.Provider>
);

type FormItemContextValue = {
  id: string;
  hasDescription: boolean;
  setHasDescription: (value: boolean) => void;
};

const FormItemContext = React.createContext<FormItemContextValue | null>(null);

const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);
  const { getFieldState, formState } = useFormContext();

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }
  if (!itemContext) {
    throw new Error('useFormField should be used within <FormItem>');
  }

  const fieldState = getFieldState(fieldContext.name, formState);
  const { id, hasDescription } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    hasDescription,
    ...fieldState,
  };
};

const FormItem = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => {
    const id = React.useId();
    const [hasDescription, setHasDescription] = React.useState(false);
    const value = React.useMemo(() => ({ id, hasDescription, setHasDescription }), [id, hasDescription]);
    return (
      <FormItemContext.Provider value={value}>
        <div ref={ref} className={cn('grid min-w-0 content-start', className)} {...props} />
      </FormItemContext.Provider>
    );
  },
);
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, LabelProps>(
  ({ className, ...props }, ref) => {
    const { formItemId } = useFormField();
    return <Label ref={ref} className={cn('mb-space-2 self-end', className)} htmlFor={formItemId} {...props} />;
  },
);
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<React.ElementRef<typeof Slot>, React.ComponentPropsWithoutRef<typeof Slot>>(
  ({ ...props }, ref) => {
    const { error, formItemId, formDescriptionId, formMessageId, hasDescription } = useFormField();
    const describedBy = [hasDescription ? formDescriptionId : null, error ? formMessageId : null]
      .filter(Boolean)
      .join(' ');
    return (
      <Slot
        ref={ref}
        id={formItemId}
        aria-describedby={describedBy || undefined}
        aria-invalid={error ? true : undefined}
        {...props}
      />
    );
  },
);
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, ...props }, ref) => {
    const { formDescriptionId } = useFormField();
    const itemContext = React.useContext(FormItemContext);
    const setHasDescription = itemContext?.setHasDescription;
    React.useEffect(() => {
      setHasDescription?.(true);
      return () => setHasDescription?.(false);
    }, [setHasDescription]);
    return <p ref={ref} id={formDescriptionId} className={cn('small mt-space-2 text-ink-muted', className)} {...props} />;
  },
);
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(
  ({ className, children, ...props }, ref) => {
    const { error, formMessageId } = useFormField();
    const body = error ? String(error.message ?? '') : children;

    // Always rendered, so the live region exists before its words change; empty, it takes no space at all.
    return (
      <p
        ref={ref}
        id={formMessageId}
        aria-live="polite"
        className={cn('small mt-space-2 text-signal-critical empty:mt-0', className)}
        {...props}
      >
        {body || null}
      </p>
    );
  },
);
FormMessage.displayName = 'FormMessage';

export { useFormField, Form, FormItem, FormLabel, FormControl, FormDescription, FormMessage, FormField };
