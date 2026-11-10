import * as React from 'react';

import { Footer, type FooterProps } from '@/components/site/Footer';
import { Nav, type NavProps } from '@/components/site/Nav';
import { PressFeedback } from '@/components/site/PressFeedback';
import { cn } from '@/lib/utils';

// The page shell for routes built on the new system: the fixed Nav, the page's <main>, the Footer. It does what Nav
// asks of the page (brand book, Layout and States): the content is padded by --nav-height so the fixed bar never
// covers the first section, and <main> carries id="main" and tabindex="-1" so the skip link lands on it. It also adds
// the touchstart listener iOS Safari needs before it shows the buttons' press.
//
// The padding sits on this wrapper, not on <body>, because the root layout also serves the pages in app/(legacy).
// Phase 3 can use it as the new route group's layout.

export interface SiteShellProps {
  children: React.ReactNode;
  /** The path the nav marks as current. Default: the route's pathname. */
  currentPath?: string;
  nav?: Omit<NavProps, 'currentPath' | 'position'>;
  footer?: FooterProps;
  /** Classes for <main>. */
  className?: string;
}

export function SiteShell({ children, currentPath, nav, footer, className }: SiteShellProps) {
  return (
    <>
      <PressFeedback />
      <Nav currentPath={currentPath} {...nav} />
      <div className="pt-nav-height">
        <main id="main" tabIndex={-1} className={cn('focus:outline-none', className)}>
          {children}
        </main>
        <Footer {...footer} />
      </div>
    </>
  );
}
