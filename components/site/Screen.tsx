import * as React from 'react';

import { SectionHeading } from '@/components/brand/SectionHeading';
import { STUB_LABEL } from '@/lib/content/stub';
import { cn } from '@/lib/utils';

// The frame every inner page sits on (brand book, Layout and spacing: one section per screen), and the visible stub.
// Folded at the Phase 3 integrate step from the three route-local copies the offer, sector and insights pages each
// wrote class for class; the homepage keeps its own frame in app/(site)/page.tsx, because its sections are measured
// to exact screen counts.
//
// The first screen fills the viewport below the fixed nav; every other screen is at least the viewport tall, so a
// screen scrolled to its top shows that section alone. A section too short to fill a screen shares it with its
// neighbour in the plan's order, each keeping its own SectionHeading. Screens are separated by a full-width rule and
// space-12 (space-16 from 1200px); the content keeps the container's lines. The one exception is a closing screen,
// which takes its content's height: with the CTABand after it, the two fill the last screen together.

/** The page container: at most the container token wide, inside a gutter on each side (as Nav, Footer, CTABand). */
export const container = 'mx-auto w-[min(100%_-_2_*_var(--gutter),var(--container))]';

/** The space between sections that share a screen, as between sections. */
const sectionGap = 'gap-space-12 min-[1200px]:gap-space-16';

export interface ScreenProps extends Omit<React.HTMLAttributes<HTMLElement>, 'children'> {
  /**
   * section when the screen is one section, labelled by its heading; div when it holds several, each its own section.
   * A section when labelledBy is given, a div otherwise.
   */
  as?: 'section' | 'div';
  /** The id of the heading that labels the section. */
  labelledBy?: string;
  /** The first screen sits straight under the nav, with no rule above it. */
  first?: boolean;
  /**
   * How many screens tall the section is below 720px, where its copy runs longer: 2 for a section that takes more than
   * a screen and a half at 390 by 844, so the next section still opens at the top of a screen (Phase 1's --hm). One
   * screen from 720px.
   */
  phoneScreens?: 1 | 2;
  /** The last screen before the CTABand: as tall as its content, so the two share the final screen. */
  closing?: boolean;
  /** Classes for the inner container. */
  innerClassName?: string;
  children: React.ReactNode;
}

export function Screen({
  as,
  labelledBy,
  first = false,
  phoneScreens = 1,
  closing = false,
  className,
  innerClassName,
  children,
  ...props
}: ScreenProps) {
  const Tag = as ?? (labelledBy ? 'section' : 'div');
  return (
    <Tag
      aria-labelledby={Tag === 'section' ? labelledBy : undefined}
      className={cn(
        'flex flex-col text-ink',
        first
          ? // The first screen sits under the nav (the shell pads the page by its height) and fills the rest of the
            // viewport, as the homepage hero does: space-12 above and below on a phone, space-24 from 1200px.
            cn(
              'py-space-12 min-[1200px]:py-space-24',
              'min-h-[calc(100vh-var(--nav-height))] supports-[height:100dvh]:min-h-[calc(100dvh-var(--nav-height))]',
            )
          : // Every other screen is at least the viewport tall, its top padding the nav's height plus the section gap,
            // because the fixed nav covers the top of each screen as the page scrolls (Phase 1, and the homepage).
            // Divided from the one above by a full-width rule.
            cn(
              'border-t border-rule',
              'pb-space-12 pt-[calc(var(--nav-height)_+_var(--space-12))]',
              'min-[1200px]:pb-space-16 min-[1200px]:pt-[calc(var(--nav-height)_+_var(--space-16))]',
              closing
                ? null
                : cn(
                    phoneScreens === 2 ? '[--screens:2] min-[720px]:[--screens:1]' : '[--screens:1]',
                    'min-h-[calc(var(--screens)*100vh)] supports-[height:100dvh]:min-h-[calc(var(--screens)*100dvh)]',
                  ),
            ),
        className,
      )}
      {...props}
    >
      <div className={cn(container, 'grid grid-cols-1 content-start', sectionGap, innerClassName)}>{children}</div>
    </Tag>
  );
}

// ------------------------------------------------------------------ stubs

/**
 * The visible mark where the plan has not written the copy yet (Phase 3 decisions 3 and 4): STUB_LABEL in ink, in the
 * type the copy will take, so the gap is plain to see and the page never ships placeholder prose. data-stub lets a
 * review script count them.
 */
export function Stub({ size = 'body', className }: { size?: 'body' | 'body-lg'; className?: string }) {
  return (
    <p data-stub="" className={cn(size === 'body-lg' ? 'body-lg max-w-measure-lg' : 'body max-w-measure', className)}>
      {STUB_LABEL}
    </p>
  );
}

/** A section the plan names whose copy is not written yet: its SectionHeading, then the stub. */
export function StubSection({ heading, headingId, id }: { heading: string; headingId: string; id?: string }) {
  return (
    <section aria-labelledby={headingId} id={id} className="min-w-0">
      <SectionHeading heading={heading} headingId={headingId} />
      <Stub />
    </section>
  );
}
