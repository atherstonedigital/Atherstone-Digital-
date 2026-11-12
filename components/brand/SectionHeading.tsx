import * as React from 'react';

import { cn } from '@/lib/utils';

// The SectionHeading component (docs/brand/components/SectionHeading): an eyebrow, a Newsreader heading, a hairline,
// then the first paragraph. Every section opens with one; never stacked, never centred, no icon beside the eyebrow.
//
// Phase 2.4 (ui-ux-pro-max, spacing; Phase 2.5 step 7): the heading block is followed by space-8 before the content,
// set here once, as the hairline's own bottom margin, so every section that opens with one gets the same gap. On paper
// the block takes its colour from the section round it and carries no colour class of its own, so it never shares a
// class with the cards below it (the gate's card-family reads a shared class as one card part).
//
// Phase 2.7, step 2 (the owner's brief: a type scale with a step in it): size display-2 sets the heading at 44px for
// the three homepage sections that make the argument (Sound familiar, Three ways to work with me and the comparison).
// Every other H2 stays heading-1 (32px). Extended minimally: one prop, heading-1 by default.
//
// Phase 2.7, step 5 (vary the section grammar): the eyebrow, heading and hairline stay on exactly five homepage
// sections (The numbers, What I do, the comparison, How it works, Insights). The others keep their words and drop the
// hairline (hairline off): the heading then sits space-8 above the content, without the rule. On by default.

export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** A few words, sentence case; the eyebrow style sets it uppercase. */
  eyebrow?: string;
  /** One sentence, under 90 characters, often the uncomfortable point. */
  heading: React.ReactNode;
  /** The heading's id, for the section's aria-labelledby. */
  headingId?: string;
  /** h2 by default: heading-1 is every H2 on the site. */
  as?: 'h2' | 'h3';
  /** heading-1 (the default), or display-2 for the homepage's three argument sections (Phase 2.7, step 2). */
  size?: 'heading-1' | 'display-2';
  /** brass: the homepage hero only. Everywhere else the eyebrow is ink-muted. */
  eyebrowTone?: 'muted' | 'brass';
  /**
   * band: on the green contact band, text in on-band, the eyebrow at 80% and the hairline in rule-on-band (Phase 1).
   * The eyebrow is never brass there.
   */
  ground?: 'paper' | 'band';
  /** The hairline under the heading. On by default; off for the homepage sections that change grammar (Phase 2.7). */
  hairline?: boolean;
  /**
   * With no eyebrow, start the heading where an eyebrowed one starts, so headings line up from section to section
   * (Phase 1, "The numbers" and "How it works").
   */
  alignWithEyebrow?: boolean;
  /** The first paragraph, in body at measure. Leave it out when the section's content follows the hairline. */
  children?: React.ReactNode;
}

export function SectionHeading({
  eyebrow,
  heading,
  headingId,
  as: Heading = 'h2',
  size = 'heading-1',
  eyebrowTone = 'muted',
  ground = 'paper',
  alignWithEyebrow = false,
  hairline = true,
  className,
  children,
  ...props
}: SectionHeadingProps) {
  const onBand = ground === 'band';
  return (
    <div className={cn(onBand && 'text-on-band', className)} {...props}>
      {eyebrow ? (
        <p
          className={cn(
            'eyebrow mb-space-2',
            onBand ? 'text-on-band opacity-80' : eyebrowTone === 'brass' ? 'text-brass-600' : 'text-ink-muted',
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <Heading
        id={headingId}
        className={cn(
          size,
          hairline ? 'mb-space-4' : 'mb-space-8',
          !eyebrow && alignWithEyebrow && 'mt-[calc(var(--eyebrow-font-size)*var(--eyebrow-line-height)_+_var(--space-2))]',
        )}
      >
        {heading}
      </Heading>
      {/* The hairline: a full-width rule with space-4 above it and space-8 below, the gap to the content. Decorative, so
          it is hidden from screen readers. */}
      {hairline ? (
        <hr aria-hidden="true" className={cn('mb-space-8 border-0 border-t', onBand ? 'border-rule-on-band' : 'border-rule')} />
      ) : null}
      {children ? <p className="body max-w-measure">{children}</p> : null}
    </div>
  );
}
