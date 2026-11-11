'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

// The shadcn/ui Accordion (new-york, on Radix Accordion), restyled to the brand book for the FAQ blocks.
//
// Look   each item is a row closed by a rule hairline. The question is the trigger, in heading-2 (brand book, Type: the
//        FAQ question), ink, at least 44px tall, with the chevron-down icon at 20px, 1.5 stroke, on the right. The
//        answer is body copy at measure. Hover draws the question's underline, as links do; focus is the brand ring.
//
// Motion state changes set their final state at once (brand book, States; Phase 2.4 step 14): the answer's space opens
//        and closes immediately, so a fast double tap never leaves an item half open, and nothing waits on
//        transitionend. On opening, the answer fades in and settles 8px into place on a 300ms spring, and the chevron
//        turns on the same spring, on opacity and transform only (brand book: never a layout property). The spring is
//        --motion-spring in app/globals.css, a critically damped spring written as a CSS linear() curve: it leaves
//        from rest and comes to rest without passing its mark, as apple-design asks of motion nothing threw. Closing
//        hides the answer at once, which cancels any fade still running; reopening starts it again from its
//        @starting-style. Under reduced motion both are instant. A browser without @starting-style opens at once,
//        which is the reduced-motion behaviour anyway. No drag gesture (CLAUDE.md, the owner's ruling).
//
// One change from the shadcn source, for the FAQ's job: the answer stays in the page while its item is closed,
// hidden with display: none, instead of being removed as Radix's AccordionContent removes it. The static export then
// carries every answer in its HTML, so crawlers and AI answer engines read the same answers the FAQPage schema states,
// and Google's rule that marked-up content is on the page holds. Radix still owns the state, the keyboard (arrow keys,
// Home, End between questions) and the trigger's aria-expanded; AccordionItem gives the trigger and the answer their
// ids so aria-controls and the region's aria-labelledby point at each other.

const Accordion = AccordionPrimitive.Root;

type ItemIds = { triggerId: string; contentId: string };

const AccordionItemContext = React.createContext<ItemIds | null>(null);

function useItemIds(component: string) {
  const ids = React.useContext(AccordionItemContext);
  if (!ids) {
    throw new Error(`${component} must be used within <AccordionItem>`);
  }
  return ids;
}

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => {
  const id = React.useId();
  const ids = React.useMemo(() => ({ triggerId: `${id}-trigger`, contentId: `${id}-content` }), [id]);
  return (
    <AccordionItemContext.Provider value={ids}>
      <AccordionPrimitive.Item ref={ref} className={cn('group/accordion-item border-b border-rule', className)} {...props} />
    </AccordionItemContext.Provider>
  );
});
AccordionItem.displayName = 'AccordionItem';

type HeadingLevel = 2 | 3 | 4 | 5 | 6;

export interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  /** The heading level the question sits at: one below the section's heading. h3 by default. */
  headingLevel?: HeadingLevel;
}

const AccordionTrigger = React.forwardRef<React.ElementRef<typeof AccordionPrimitive.Trigger>, AccordionTriggerProps>(
  ({ className, children, headingLevel = 3, ...props }, ref) => {
    const { triggerId, contentId } = useItemIds('AccordionTrigger');
    const Heading = `h${headingLevel}` as const;
    return (
      <AccordionPrimitive.Header asChild>
        <Heading className="flex">
          <AccordionPrimitive.Trigger
            ref={ref}
            id={triggerId}
            aria-controls={contentId}
            className={cn(
              'heading-2 group/accordion-trigger flex min-h-touch-target flex-1 cursor-pointer items-center justify-between',
              'gap-space-4 py-space-4 text-left text-ink',
              // The question's underline draws on hover, in the 150ms colour timing; the icon is not underlined. It draws
              // on press too, so a tap answers on touch (Phase 3 review). No scale: 0.98 on a full-width row would move
              // its edges about 7px.
              'underline decoration-transparent decoration-1 underline-offset-[5px] hover:decoration-current active:decoration-current',
              '[transition:text-decoration-color_var(--duration-colour)_ease-out] motion-reduce:transition-none',
              '[-webkit-tap-highlight-color:transparent]',
              className,
            )}
            {...props}
          >
            {children}
            <ChevronDown
              aria-hidden="true"
              size={20}
              strokeWidth={1.5}
              className={cn(
                'shrink-0 text-ink group-data-[state=open]/accordion-trigger:rotate-180',
                '[transition:transform_var(--motion-spring-duration)_var(--motion-spring)] motion-reduce:transition-none',
              )}
            />
          </AccordionPrimitive.Trigger>
        </Heading>
      </AccordionPrimitive.Header>
    );
  },
);
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, children, ...props }, ref) => {
    const { triggerId, contentId } = useItemIds('AccordionContent');
    return (
      <div
        ref={ref}
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        className={cn(
          'group-data-[state=closed]/accordion-item:hidden',
          '[transition:opacity_var(--motion-spring-duration)_var(--motion-spring),transform_var(--motion-spring-duration)_var(--motion-spring)]',
          '[@starting-style]:-translate-y-space-2 [@starting-style]:opacity-0 motion-reduce:transition-none',
        )}
        {...props}
      >
        <div className={cn('body max-w-measure pb-space-4 text-ink', className)}>{children}</div>
      </div>
    );
  },
);
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
