'use client';

import * as React from 'react';
import NextLink from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';

import { LinkButton } from '@/components/brand/Button';
import { Wordmark } from '@/components/brand/Wordmark';
import { DrawerGesture } from '@/components/site/DrawerGesture';
import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuPanelLinkStyle,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { Sheet, SheetTrigger } from '@/components/ui/sheet';
import { nav as siteNav } from '@/lib/content/site';
import type { Link as SiteLink, NavGroup, SiteNav } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The site nav: a fixed 64px bar on paper with a rule beneath. What the bar holds depends on the width (Phase 2.4
// step 12 and Phase 2.5 step 6: nothing from the desktop nav below 900px, and a bar that never squashes):
//
//   below 900    monogram and compact wordmark, menu toggle; nothing else
//   900 to 1199  full wordmark, Book a 30-minute call, menu toggle
//   from 1200    full wordmark, Services and Sectors dropdowns, Results, Insights, About, the button
//
// 900 to 1199 is the decision the brief left open: the full wordmark (327px), the primary button (207px) and the 44px
// toggle need about 610px with their gaps, so the bar holds them with 240px to spare in the 852px container at 900px
// and the links never crowd it.
//
// Phase 2.7, step 9 (the owner's brief): the header is the wordmark, five links and one button. The theme toggle has
// moved to the footer's legal row (components/site/Footer.tsx), at every width, so neither the bar nor the drawer
// carries it.
//
// Below 1200 the links live in the drawer (a Sheet from the right on paper-raised with a rule edge): Services (three),
// Sectors (five), Results, Insights, About and the primary button. The current page is marked with
// aria-current and a 2px brass-600 underline. The page pads its body by --nav-height (the bar is fixed) and gives its
// <main> id="main" and tabindex="-1" for the skip link. The header is the taste kit's header.nav.

/** Interface labels, in Phase 1's wording. Not page copy, so they live with the component. */
const LABELS = {
  /** Added after the visible wordmark for screen readers, so the link's name starts with the words it shows. */
  home: ', home',
  skip: 'Skip to content',
  openMenu: 'Open menu',
  closeMenu: 'Close menu',
  drawerTitle: 'Menu',
} as const;

/**
 * From this width the bar holds every link and the drawer is not offered. The classes below write the two widths out
 * (min-[900px], min-[1200px]), because Tailwind reads them from the source.
 */
const DRAWER_HIDDEN_FROM = 1200;

/** The page container: at most the container token wide, inside a gutter on each side. */
const container = 'mx-auto w-[min(100%_-_2_*_var(--gutter),var(--container))]';

/** The current page, or a page inside the section a link leads to (/results/xshowhome marks Results). */
function isCurrent(href: string, path: string) {
  if (href === '/') return path === '/';
  return path === href || path.startsWith(`${href}/`);
}

/** Radix item values for the two dropdowns. */
function groupValue(group: NavGroup) {
  return group.label.toLowerCase();
}

// ------------------------------------------------------------------ lockup

export interface NavLockupProps {
  /** responsive: compact below 900px, full from 900px (the bar). full or compact: one form at every width. */
  variant?: 'responsive' | 'full' | 'compact';
  className?: string;
}

/**
 * The home link: the Wordmark component, compact (monogram and 22px wordmark) or full (40px). The link has no
 * aria-label: its name is the visible wordmark (the compact monogram is decorative, aria-hidden) plus a hidden ", home",
 * so the name contains the label a speech user reads off the screen (WCAG 2.5.3, Label in Name; axe-core's
 * label-content-name-mismatch flagged the old aria-label below 900px).
 */
export function NavLockup({ variant = 'responsive', className }: NavLockupProps) {
  return (
    <NextLink
      href="/"
      className={cn('inline-flex min-h-touch-target shrink-0 cursor-pointer items-center text-ink no-underline', className)}
    >
      {variant !== 'full' ? (
        <Wordmark variant="compact" className={variant === 'responsive' ? 'min-[900px]:hidden' : undefined} />
      ) : null}
      {variant !== 'compact' ? (
        <Wordmark variant="full" className={variant === 'responsive' ? 'hidden min-[900px]:inline-block' : undefined} />
      ) : null}
      <span className="sr-only">{LABELS.home}</span>
    </NextLink>
  );
}

// ------------------------------------------------------------------ the bar's menu (from 1200px)

export interface NavMenuProps {
  content?: SiteNav;
  /** The path to mark as current. */
  currentPath: string;
  /** The nav landmark's name. */
  label?: string;
  /** Hold a dropdown open ('services' or 'sectors'), for a static render; leave unset on the site. */
  value?: string;
  onValueChange?: (value: string) => void;
  className?: string;
}

/**
 * The Services and Sectors dropdowns, then Results, Insights and About, in one NavigationMenu, so the whole row is one
 * landmark that the arrow keys move along. A dropdown opens on 150ms of hover intent with a mouse, or on a click, a
 * tap, Enter or Space; Escape closes it and returns focus to its trigger.
 */
export function NavMenu({ content = siteNav, currentPath, label = 'Main', value, onValueChange, className }: NavMenuProps) {
  const [internalValue, setInternalValue] = React.useState('');
  const openValue = value ?? internalValue;

  // Phase 1's detail: a click on a dropdown that hover opened keeps it open, where Radix would toggle it shut under the
  // pointer. A value that changes outside a press was opened by hover.
  const openedOnHover = React.useRef(false);
  const pressing = React.useRef(false);

  const handleValueChange = (next: string) => {
    openedOnHover.current = next !== '' && !pressing.current;
    setInternalValue(next);
    onValueChange?.(next);
  };

  return (
    <NavigationMenu
      aria-label={label}
      value={openValue}
      onValueChange={handleValueChange}
      delayDuration={150}
      className={className}
    >
      <NavigationMenuList>
        {[content.services, content.sectors].map((group) => {
          const itemValue = groupValue(group);
          const sectionCurrent = group.items.some((item) => isCurrent(item.href, currentPath));
          return (
            <NavigationMenuItem key={itemValue} value={itemValue}>
              <NavigationMenuTrigger
                // The section the current page belongs to, while its link is hidden in the panel.
                aria-current={sectionCurrent ? 'true' : undefined}
                onClick={(event) => {
                  if (openValue === itemValue && openedOnHover.current) {
                    // Radix skips its toggle when the event is default-prevented.
                    event.preventDefault();
                    openedOnHover.current = false;
                    return;
                  }
                  pressing.current = true;
                  queueMicrotask(() => {
                    pressing.current = false;
                  });
                }}
              >
                {group.label}
              </NavigationMenuTrigger>
              {/* Offset by space-4 and the 1px border, so the panel's link text starts on the trigger's left edge. */}
              <NavigationMenuContent className="left-[calc(-1_*_(var(--space-4)_+_1px))]">
                <ul>
                  {group.items.map((item) => (
                    <li key={item.href}>
                      <NavigationMenuLink asChild active={isCurrent(item.href, currentPath)}>
                        <NextLink href={item.href} className={navigationMenuPanelLinkStyle()}>
                          {item.label}
                        </NextLink>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          );
        })}
        {content.links.map((link) => (
          <NavigationMenuItem key={link.href}>
            <NavigationMenuLink asChild active={isCurrent(link.href, currentPath)}>
              <NextLink href={link.href} className={navigationMenuTriggerStyle()}>
                {link.label}
              </NextLink>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

// ------------------------------------------------------------------ the drawer (below 1200px)

/** A drawer row: a 44px link in body at weight 500, with the same underline and current-page marking as the bar. */
const drawerLinkStyle = cn(
  'body flex min-h-touch-target cursor-pointer items-center font-medium text-ink',
  // The underline draws on press too, so a tap answers on touch before the page changes.
  'active:decoration-current',
  'underline decoration-transparent decoration-1 underline-offset-4',
  'transition-[text-decoration-color] duration-colour ease-out hover:decoration-current motion-reduce:transition-none',
  'aria-[current=page]:decoration-brass-600 aria-[current=page]:decoration-2',
);

function DrawerLink({ link, current, onNavigate }: { link: SiteLink; current: boolean; onNavigate?: () => void }) {
  return (
    <NextLink
      href={link.href}
      aria-current={current ? 'page' : undefined}
      onClick={onNavigate}
      className={drawerLinkStyle}
    >
      {link.label}
    </NextLink>
  );
}

export interface NavDrawerBodyProps {
  content?: SiteNav;
  currentPath: string;
  /**
   * responsive: the button shows below 1200px, wherever the drawer is offered (the site); from 1200px the bar has it.
   * always: it shows at every width (a static render).
   */
  extras?: 'responsive' | 'always';
  /** The nav landmark's name. */
  label?: string;
  /** Called when a link is chosen, so the drawer closes as the page changes. */
  onNavigate?: () => void;
  className?: string;
}

/**
 * The drawer's contents, in the brief's order: the Services and Sectors groups, Results, Insights and About, then the
 * primary button. The theme toggle is in the footer (Phase 2.7, step 9).
 */
export function NavDrawerBody({
  content = siteNav,
  currentPath,
  extras = 'responsive',
  label = 'Main, mobile',
  onNavigate,
  className,
}: NavDrawerBodyProps) {
  const id = React.useId();
  return (
    <nav aria-label={label} className={cn('grid gap-space-6 px-gutter pb-space-12 pt-space-6', className)}>
      {[content.services, content.sectors].map((group, index) => (
        <div key={group.label} className="grid gap-space-2">
          <p id={`${id}-group-${index}`} className="eyebrow text-ink-muted">
            {group.label}
          </p>
          <ul aria-labelledby={`${id}-group-${index}`} className="grid gap-space-2">
            {group.items.map((item) => (
              <li key={item.href}>
                <DrawerLink link={item} current={isCurrent(item.href, currentPath)} onNavigate={onNavigate} />
              </li>
            ))}
          </ul>
        </div>
      ))}
      <ul className="grid gap-space-2">
        {content.links.map((link) => (
          <li key={link.href}>
            <DrawerLink link={link} current={isCurrent(link.href, currentPath)} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
      <LinkButton
        link={content.cta}
        size="block"
        onClick={onNavigate}
        className={cn(extras === 'responsive' && 'min-[1200px]:hidden')}
      />
    </nav>
  );
}

export interface NavDrawerProps {
  content?: SiteNav;
  currentPath: string;
  /** The control that opens the drawer. Default: the 44px menu toggle (the secondary icon button). */
  trigger?: React.ReactElement;
  /** Classes for the default toggle, such as the width it hides from. */
  triggerClassName?: string;
  /** Close the drawer when the window widens to this many px, where the bar no longer offers it. */
  closeAtMinWidth?: number;
  extras?: NavDrawerBodyProps['extras'];
  /** The drawer nav landmark's name. */
  label?: string;
}

/**
 * The drawer and its trigger: a shadcn Sheet moved by DrawerGesture. Radix traps focus in the open drawer, closes it on
 * Escape or a press outside, and returns focus to the trigger when it closes, or to the bar's first control when the
 * trigger is hidden at the new width. A chosen link or a route change closes it.
 */
export function NavDrawer({
  content = siteNav,
  currentPath,
  trigger,
  triggerClassName,
  closeAtMinWidth,
  extras = 'responsive',
  label = 'Main, mobile',
}: NavDrawerProps) {
  const [open, setOpen] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Radix returns focus to the trigger when the drawer closes. When it closed because the window widened past
  // closeAtMinWidth (or a zoom crossed the breakpoint), the trigger is display:none there and focus would fall to the
  // body, so it goes to the bar's first control instead: the Services dropdown trigger.
  const onCloseAutoFocus = React.useCallback((event: Event) => {
    const trigger = triggerRef.current;
    if (!trigger || trigger.getClientRects().length > 0) return;
    const fallback = trigger.closest('header')?.querySelector<HTMLElement>('nav button, nav a');
    if (fallback && fallback.getClientRects().length > 0) {
      event.preventDefault();
      fallback.focus();
    }
  }, []);

  // A route change closes it: the back button, or any navigation that did not start from a drawer link.
  React.useEffect(() => {
    setOpen(false);
  }, [currentPath]);

  React.useEffect(() => {
    if (!closeAtMinWidth) return;
    const query = window.matchMedia(`(min-width: ${closeAtMinWidth}px)`);
    const close = () => {
      if (query.matches) setOpen(false);
    };
    query.addEventListener('change', close);
    return () => query.removeEventListener('change', close);
  }, [closeAtMinWidth]);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild ref={triggerRef}>
        {trigger ?? (
          <Button variant="secondary" size="icon" aria-label={LABELS.openMenu} className={triggerClassName}>
            <Menu size={20} strokeWidth={1.5} aria-hidden="true" />
          </Button>
        )}
      </SheetTrigger>
      <DrawerGesture
        open={open}
        onOpenChange={setOpen}
        title={LABELS.drawerTitle}
        closeLabel={LABELS.closeMenu}
        onCloseAutoFocus={onCloseAutoFocus}
      >
        <NavDrawerBody
          content={content}
          currentPath={currentPath}
          extras={extras}
          label={label}
          onNavigate={() => setOpen(false)}
        />
      </DrawerGesture>
    </Sheet>
  );
}

// ------------------------------------------------------------------ the bar

export interface NavProps {
  content?: SiteNav;
  /** The path to mark as current. Default: the route's pathname. */
  currentPath?: string;
  /** fixed: the site bar. static: in the flow of a page, for a design-system render. */
  position?: 'fixed' | 'static';
  /** The skip link, the first thing a keyboard reaches. null leaves it out (a second nav on one page). */
  skipLink?: SiteLink | null;
  /** The bar's nav landmark name; the drawer's adds ", mobile". */
  label?: string;
  className?: string;
}

export function Nav({
  content = siteNav,
  currentPath,
  position = 'fixed',
  skipLink = { label: LABELS.skip, href: '#main' },
  label = 'Main',
  className,
}: NavProps) {
  const pathname = usePathname();
  const path = currentPath ?? pathname ?? '/';

  return (
    <header
      className={cn(
        // nav: the taste kit's header.nav, the page shell's first part (layout check SR-6).
        'nav h-nav-height border-b border-rule bg-paper text-ink',
        // right-scroll-bar-position: while the open drawer locks the page's scroll, Radix's scroll lock moves a
        // fixed element with this class in by the scrollbar's width, so the bar does not shift when the scrollbar goes.
        position === 'fixed' ? 'right-scroll-bar-position fixed inset-x-0 top-0 z-nav' : 'relative',
        className,
      )}
    >
      <div className={cn(container, 'relative flex h-full items-stretch justify-between gap-space-4 min-[720px]:gap-space-6')}>
        {skipLink ? (
          <a
            href={skipLink.href}
            className={cn(
              'absolute left-0 top-space-2 z-skip-link -translate-y-[200%] focus:translate-y-0',
              'inline-flex min-h-touch-target items-center rounded-radius-sm border border-rule-strong bg-paper-raised px-space-4 py-space-3 text-ink',
            )}
          >
            {skipLink.label}
          </a>
        ) : null}

        <NavLockup className="self-center" />

        <NavMenu content={content} currentPath={path} label={label} className="hidden min-[1200px]:flex" />

        <div className="flex items-center gap-space-4">
          <LinkButton link={content.cta} className="hidden min-[900px]:inline-flex" />
          <NavDrawer
            content={content}
            currentPath={path}
            closeAtMinWidth={DRAWER_HIDDEN_FROM}
            triggerClassName="min-[1200px]:hidden"
            label={`${label}, mobile`}
          />
        </div>
      </div>
    </header>
  );
}
