import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

// The shadcn/ui Button, restyled to docs/brand/components/Button. Three forms and nothing else: primary for the one
// action a page region wants, secondary for the alternative beside it, and the text link. shadcn's own look never
// shows: no ring utilities, no outline-none, no pointer-events-none on disabled.
//
// Every form presses to 0.98 over 80ms on pointer-down and returns on release (:active). iOS Safari only fires
// :active when the document has a touchstart listener; the site shell adds one (Phase 1 did the same).
const buttonVariants = cva(
  [
    'button inline-flex cursor-pointer items-center justify-center gap-space-2 whitespace-nowrap border border-transparent no-underline',
    // Colour and border answer in 150ms; the press answers in 80ms. Transform and colour only, never layout.
    '[transition:background-color_var(--duration-colour)_ease-out,border-color_var(--duration-colour)_ease-out,transform_var(--duration-press)_ease-out]',
    'active:scale-[0.98]',
    // The brand focus ring, set here as well as globally so the button keeps it wherever it is placed.
    'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus',
    // Disabled: 40% opacity, cursor default, no press. aria-disabled is the form's "Sending" state: the button keeps
    // keyboard focus, which a disabled button would drop to the body. The form ignores the second submit.
    'disabled:cursor-default disabled:opacity-40 disabled:active:scale-100',
    'aria-disabled:cursor-default aria-disabled:opacity-40 aria-disabled:active:scale-100',
    // Reduced motion, as the Button preview: no transitions. The press scale still applies, at once.
    'motion-reduce:transition-none',
    '[-webkit-tap-highlight-color:transparent] [&_svg]:pointer-events-none [&_svg]:shrink-0',
  ],
  {
    variants: {
      variant: {
        // green-900 fill, on-green text, radius-md. Hover and pressed green-700; never while disabled.
        primary: [
          'rounded-radius-md bg-green-900 text-on-green hover:bg-green-700 active:bg-green-700',
          'disabled:bg-green-900 aria-disabled:bg-green-900',
        ],
        // Transparent, 1px rule-strong border (3:1 on paper), ink text, radius-sm. Hover: the border becomes ink.
        secondary: [
          'rounded-radius-sm border-rule-strong bg-transparent text-ink hover:border-ink',
          'disabled:border-rule-strong aria-disabled:border-rule-strong',
        ],
        // green-700, weight 500, underlined at 1px with a 3px offset; hover thickens to 2px. The colour never changes.
        link: [
          'border-0 bg-transparent font-medium text-green-700 underline decoration-1 underline-offset-[3px] hover:decoration-2',
          '[transition:text-decoration-thickness_var(--duration-colour)_ease-out,transform_var(--duration-press)_ease-out]',
          'disabled:decoration-1 aria-disabled:decoration-1',
        ],
      },
      size: {
        // The brand's one button size: space-3 by space-6 padding, 44px minimum height.
        default: 'min-h-touch-target px-space-6 py-space-3',
        // The same, full width: the hero buttons, the drawer button and the form button below 720px (Phase 1).
        block: 'min-h-touch-target w-full px-space-6 py-space-3',
        // A 44px square for the functional icons (menu, close), as Phase 1's menu toggle: use with secondary.
        icon: 'size-touch-target p-0',
      },
      // The ground the button sits on. paper (and paper-raised) is the default. band is the green contact band, where
      // the primary's green-900 fill would vanish in the light theme (it is the band's own colour), so the forms invert
      // there, as the monogram does: see the compound variants below. The focus ring keeps the focus token, which
      // clears 3:1 on the band in both themes (3.17:1 light, 6.32:1 dark).
      tone: {
        paper: '',
        band: '',
      },
    },
    compoundVariants: [
      // Primary on the band: on-band fill and band text (11.55:1 light, 10.68:1 dark); hover and pressed
      // button-on-band-hover (8.83:1 and 8.22:1 with band text). Never while disabled.
      {
        variant: 'primary',
        tone: 'band',
        className: [
          'bg-on-band text-band hover:bg-button-on-band-hover active:bg-button-on-band-hover',
          'disabled:bg-on-band aria-disabled:bg-on-band',
        ],
      },
      // Secondary on the band: on-band text and a rule-strong-on-band outline (4.12:1 light, 3.93:1 dark, a border that
      // carries meaning); hover: the border becomes on-band, as the secondary's becomes ink on paper.
      {
        variant: 'secondary',
        tone: 'band',
        className: [
          'border-rule-strong-on-band text-on-band hover:border-on-band',
          'disabled:border-rule-strong-on-band aria-disabled:border-rule-strong-on-band',
        ],
      },
      // The text link on the band: on-band, so it keeps 4.5:1 where green-700 would not.
      { variant: 'link', tone: 'band', className: 'text-on-band' },
      // The text link has no box: no padding and no minimum height, so it sits on the line like the preview. A
      // 44px-tall hit area is drawn by ::after instead, so the target meets 44px without changing the layout.
      {
        variant: 'link',
        className:
          'relative min-h-0 p-0 after:absolute after:inset-x-0 after:top-1/2 after:h-touch-target after:-translate-y-1/2',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      tone: 'paper',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  /** Render the child element (a link) with the button's styles instead of a <button>. */
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, tone, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, size, tone, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = 'Button';

export { Button, buttonVariants };
