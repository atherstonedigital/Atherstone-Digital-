import * as React from 'react';

import { cn } from '@/lib/utils';

// The SectionHeading component (docs/brand/components/SectionHeading): an eyebrow, a Newsreader heading, a hairline,
// then the first paragraph. Every section opens with one; never stacked, never centred, no icon beside the eyebrow.

export interface SectionHeadingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
  /** A few words, sentence case; the eyebrow style sets it uppercase. */
  eyebrow?: string;
  /** One sentence, under 90 characters, often the uncomfortable point. */
  heading: React.ReactNode;
  /** The heading's id, for the section's aria-labelledby. */
  headingId?: string;
  /** h2 by default: heading-1 is every H2 on the site. */
  as?: 'h2' | 'h3';
  /** brass: the homepage hero only. Everywhere else the eyebrow is ink-muted. */
  eyebrowTone?: 'muted' | 'brass';
  /**
   * band: on the green contact band, text in on-band, the eyebrow at 80% and the hairline in rule-on-band (Phase 1).
   * The eyebrow is never brass there.
   */
  ground?: 'paper' | 'band';
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
  eyebrowTone = 'muted',
  ground = 'paper',
  alignWithEyebrow = false,
  className,
  children,
  ...props
}: SectionHeadingProps) {
  const onBand = ground === 'band';
  return (
    <div className={cn(onBand ? 'text-on-band' : 'text-ink', className)} {...props}>
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
          'heading-1 mb-space-4',
          !eyebrow && alignWithEyebrow && 'mt-[calc(var(--eyebrow-font-size)*var(--eyebrow-line-height)_+_var(--space-2))]',
        )}
      >
        {heading}
      </Heading>
      {/* The hairline: a full-width rule with space-4 above and below. Decorative, so it is hidden from screen readers. */}
      <hr aria-hidden="true" className={cn('mb-space-4 border-0 border-t', onBand ? 'border-rule-on-band' : 'border-rule')} />
      {children ? <p className="body max-w-measure">{children}</p> : null}
    </div>
  );
}
