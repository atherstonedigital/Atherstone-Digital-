import * as React from 'react';

import { cn } from '@/lib/utils';

// The Wordmark component (docs/brand/components/Wordmark). The mark is text: "Atherstone Digital" in Newsreader 500,
// in ink on paper or on-band on the green band. Two words, one line, no full stop, no "Ltd", never the sans, never
// brass. Outside the site use the outlined files in the Logos asset group, never this component.
//
// Sizes are the component's own (the README: 40px in the header, 22px compact, 96px on a cover); tokens.json has no
// wordmark sizes. Resize with a text-[...] class, for example text-[min(40px,10.5vw)] in the footer at 320px.

/** The brand name as the mark sets it. It is the logo, not copy, so it lives here rather than in lib/content. */
const NAME = 'Atherstone Digital';

/**
 * paper: ink on paper, the monogram green-900 with an on-green A.
 * band: on the green contact band, the mark in on-band and the monogram inverted (an on-band square, a band A). In
 * the light theme these are exactly on-green and green-900; in the dark theme they follow the band, which stays a
 * deep green where green-900 turns mint.
 */
export type WordmarkGround = 'paper' | 'band';

const markText: Record<WordmarkGround, string> = {
  paper: 'text-ink',
  band: 'text-on-band',
};

export interface MonogramProps extends React.HTMLAttributes<HTMLSpanElement> {
  ground?: WordmarkGround;
  /** Hide it from screen readers where the full name sits beside it (the compact lockup). */
  decorative?: boolean;
}

/**
 * A green-900 square with radius-md and a Newsreader capital A in on-green at 70% of the side. The square is 1em of
 * its own font size, 40px by default, so text-[48px] gives a 48px square with a 33.6px A.
 *
 * The A is optically centred, as the README and the outlined monogram.svg set it: a box-centred A sits about 0.1em
 * high, because the cap has no descender to balance it, so it drops by 0.1em.
 */
export function Monogram({ ground = 'paper', decorative = false, className, ...props }: MonogramProps) {
  return (
    <span
      role={decorative ? undefined : 'img'}
      aria-label={decorative ? undefined : NAME}
      aria-hidden={decorative ? true : undefined}
      className={cn(
        'inline-grid size-[1em] shrink-0 select-none place-items-center rounded-radius-md text-[40px]',
        'font-display font-medium',
        ground === 'band' ? 'bg-on-band text-band' : 'bg-green-900 text-on-green',
        className,
        // Last, after className: tailwind-merge reads a text-[...] size as conflicting with leading-*, so a resize
        // passed in className would otherwise drop it and the mark would take the body's 1.55.
        'leading-none',
      )}
      {...props}
    >
      <span aria-hidden="true" className="relative top-[0.1em] text-[0.7em] leading-none">
        A
      </span>
    </span>
  );
}

export type WordmarkVariant = 'full' | 'compact' | 'monogram';

export interface WordmarkProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * full: the wordmark at 40px, optical size 72, -0.015em. The header from 720px, the footer, the cover.
   * compact: the monogram at 40px, a space-4 gap, the wordmark at 22px and -0.01em. The header below 720px.
   * monogram: the square alone, named "Atherstone Digital" for screen readers.
   */
  variant?: WordmarkVariant;
  ground?: WordmarkGround;
}

export function Wordmark({ variant = 'full', ground = 'paper', className, ...props }: WordmarkProps) {
  if (variant === 'monogram') {
    return <Monogram ground={ground} className={className} {...props} />;
  }

  if (variant === 'compact') {
    return (
      <span className={cn('inline-flex items-center gap-space-4', markText[ground], className)} {...props}>
        <Monogram ground={ground} decorative />
        <span className="whitespace-nowrap font-display text-[22px] font-medium leading-none tracking-[-0.01em]">
          {NAME}
        </span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        // Optical size 72 at every size, as the brand book and the outlined wordmark-ink.svg set it.
        'inline-block whitespace-nowrap font-display text-[40px] font-medium tracking-[-0.015em]',
        '[font-variation-settings:"opsz"_72]',
        markText[ground],
        className,
        // Last, as in the Monogram: a text-[...] resize in className must never remove the line-height of 1.
        'leading-none',
      )}
      {...props}
    >
      {NAME}
    </span>
  );
}

export interface WordmarkDescriptorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  ground?: WordmarkGround;
  /** The descriptor line, for example footer.descriptor from lib/content/site.ts. */
  children: React.ReactNode;
}

/**
 * The descriptor beneath the wordmark, where there is room: plain small text, never part of the mark. ink-muted on
 * paper; on the band, on-band at 80%, as the Wordmark preview sets it (7.96:1 light, 7.48:1 dark).
 */
export function WordmarkDescriptor({ ground = 'paper', className, children, ...props }: WordmarkDescriptorProps) {
  return (
    <p
      className={cn('small', ground === 'band' ? 'text-on-band opacity-80' : 'text-ink-muted', className)}
      {...props}
    >
      {children}
    </p>
  );
}
