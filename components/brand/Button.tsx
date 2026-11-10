import * as React from 'react';
import NextLink from 'next/link';
import { ArrowRight } from 'lucide-react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Button, type buttonVariants } from '@/components/ui/button';
import type { Link as SiteLink } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// Thin brand wrappers over components/ui/button.tsx for the things every page does: a button that navigates to a
// Link from lib/content/site.ts, a text link in running copy (the Button component's third form), and the forward
// link that ends in an arrow.

/** Screen-reader text after a link that leaves the site (Calendly, LinkedIn). */
const LEAVES_SITE = '(leaves this site)';

/** Internal routes go through next/link; external, mailto: and tel: addresses are plain anchors. */
function isInternal(href: string, external?: boolean) {
  return !external && (href.startsWith('/') || href.startsWith('#'));
}

type AnchorProps = Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href' | 'children'>;

export interface LinkButtonProps extends AnchorProps, VariantProps<typeof buttonVariants> {
  /** The destination and label, as lib/content/site.ts writes them (hero.primary, nav.cta, offers.cta). */
  link: SiteLink;
  /** Replaces the label. Keep it sentence case, verb first, under 28 characters. */
  children?: React.ReactNode;
  /** Add "(leaves this site)" for screen readers on an external link. On by default. */
  announceExternal?: boolean;
}

/** A primary, secondary or text-link button that navigates. No icon: the brand puts none on buttons. */
export const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ link, children, variant, size, announceExternal = true, className, ...props }, ref) => {
    const label = children ?? link.label;
    const content = (
      <>
        {label}
        {link.external && announceExternal ? <span className="sr-only"> {LEAVES_SITE}</span> : null}
      </>
    );
    return (
      <Button asChild variant={variant} size={size} className={className}>
        {isInternal(link.href, link.external) ? (
          <NextLink ref={ref} href={link.href} {...props}>
            {content}
          </NextLink>
        ) : (
          <a ref={ref} href={link.href} {...props}>
            {content}
          </a>
        )}
      </Button>
    );
  },
);
LinkButton.displayName = 'LinkButton';

/**
 * The text link in running copy: green-700, weight 500, underlined at 1px with a 3px offset, thickening to 2px on
 * hover. The colour never changes, visited included. It stays inline so it wraps with the sentence around it.
 */
export const textLinkVariants = cva(
  [
    'font-medium underline decoration-1 underline-offset-[3px] hover:decoration-2',
    '[transition:text-decoration-thickness_var(--duration-colour)_ease-out] motion-reduce:transition-none',
  ],
  {
    variants: {
      tone: {
        // A class colour outranks the browser's :visited colour, so visited links stay green-700.
        default: 'text-green-700',
        // On brass-300 (the highlighted OfferCard): link-on-highlight keeps AA in the dark theme, where green-700
        // measures 3.77:1, and the focus ring takes focus-on-highlight, which clears 3:1 on brass-300.
        highlight: 'text-link-on-highlight focus-visible:outline-focus-on-highlight',
      },
      /** A 44px-tall hit area drawn by ::after, for a standalone link in small type; the line spacing is unchanged. */
      hitArea: {
        true: 'relative after:absolute after:inset-x-0 after:top-1/2 after:h-touch-target after:-translate-y-1/2',
        false: '',
      },
    },
    defaultVariants: { tone: 'default', hitArea: false },
  },
);

export interface TextLinkProps extends AnchorProps, VariantProps<typeof textLinkVariants> {
  href: string;
  /** Leaves the site: rendered as a plain anchor with "(leaves this site)" for screen readers. */
  external?: boolean;
  children: React.ReactNode;
}

export const TextLink = React.forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ href, external, tone, hitArea, className, children, ...props }, ref) => {
    const classes = cn(textLinkVariants({ tone, hitArea }), className);
    if (isInternal(href, external)) {
      return (
        <NextLink ref={ref} href={href} className={classes} {...props}>
          {children}
        </NextLink>
      );
    }
    return (
      <a ref={ref} href={href} className={classes} {...props}>
        {children}
        {external ? <span className="sr-only"> {LEAVES_SITE}</span> : null}
      </a>
    );
  },
);
TextLink.displayName = 'TextLink';

export interface ForwardLinkProps extends Omit<TextLinkProps, 'href' | 'external' | 'children' | 'hitArea'> {
  link: SiteLink;
  /**
   * block: an inline-flex 44px box, the link standing on its own under a section ('The full comparison', 'Full
   * background'). wrap: inline text that wraps like a sentence, the last word and the arrow kept together, with a 44px
   * hit area drawn by ::after; list wrapped links space-2 apart so neighbouring targets never overlap (the form
   * confirmations' case-study links).
   */
  layout?: 'block' | 'wrap';
}

/**
 * A forward link: a TextLink ending in the lucide ArrowRight at 20px and stroke 1.5, which "ends a forward link" (Icons
 * README: 'Read more', 'All results', 'The full comparison'). The arrow stays still: the underline thickening is the
 * hover answer, because the brand book animates colour, underline thickness and press, and nothing else.
 */
export const ForwardLink = React.forwardRef<HTMLAnchorElement, ForwardLinkProps>(
  ({ link, layout = 'block', className, ...props }, ref) => {
    const arrow = (extra?: string) => (
      <ArrowRight aria-hidden="true" size={20} strokeWidth={1.5} className={cn('shrink-0', extra)} />
    );
    if (layout === 'wrap') {
      const cut = link.label.lastIndexOf(' ');
      const lead = cut > 0 ? link.label.slice(0, cut + 1) : '';
      const last = cut > 0 ? link.label.slice(cut + 1) : link.label;
      return (
        <TextLink
          ref={ref}
          href={link.href}
          external={link.external}
          hitArea
          className={className}
          {...props}
        >
          {lead}
          <span className="whitespace-nowrap">
            {last}
            {arrow('ml-space-1 inline-block align-[-0.3em]')}
          </span>
        </TextLink>
      );
    }
    return (
      <TextLink
        ref={ref}
        href={link.href}
        external={link.external}
        className={cn('inline-flex min-h-touch-target items-center gap-space-1', className)}
        {...props}
      >
        {link.label}
        {arrow()}
      </TextLink>
    );
  },
);
ForwardLink.displayName = 'ForwardLink';
