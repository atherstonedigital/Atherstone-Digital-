import * as React from 'react';
import { Menu, X } from 'lucide-react';

import { Breadcrumbs, breadcrumbListJsonLd, type Crumb } from '@/components/site/Breadcrumbs';
import { CTABand, ctaBandCopy } from '@/components/site/CTABand';
import { Footer } from '@/components/site/Footer';
import { Nav, NavDrawer, NavDrawerBody, NavLockup, NavMenu } from '@/components/site/Nav';
import { Button } from '@/components/ui/button';
import { navigationMenuPanelLinkStyle, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import { SheetHeader } from '@/components/ui/sheet';
import { contactSection, insights, nav, proof, sectors } from '@/lib/content/site';
import { cn } from '@/lib/utils';

// The navigation group on the design-system page: Nav (with the NavigationMenu dropdowns and the Sheet drawer moved by
// DrawerGesture), Footer, Breadcrumbs and CTABand, each variant and state under a label, with content from
// lib/content/site.ts. The page supplies the container and the theme switch.
//
// The bar's layout follows the window width, so the live bars show this width's layout: resize the window to walk
// 320, 390, 720, 1024 and 1200. The parts that differ by width are also shown on their own below. Hover, press, focus,
// the dropdowns and the drawer are live; the "held" samples keep one state still with the classes it applies. The
// drawer portals to the end of the page, so it takes the page's theme, not a themed subtree's.

function Label({ children }: { children: React.ReactNode }) {
  return <p className="eyebrow mb-space-3 text-ink-muted">{children}</p>;
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="grid gap-space-8 border-t border-rule pt-space-8">
      <h3 className="heading-2 text-ink">{title}</h3>
      {children}
    </div>
  );
}

function Sample({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('min-w-0', className)}>
      <Label>{label}</Label>
      {children}
    </div>
  );
}

/** A control held in one state: a span with the classes the live state applies, hidden from the tab order. */
function Held({ className, children, current }: { className: string; children: React.ReactNode; current?: boolean }) {
  return (
    <span aria-hidden="true" aria-current={current ? 'page' : undefined} className={className}>
      {children}
    </span>
  );
}

const focusRing = 'outline outline-2 outline-offset-2 outline-focus';

// Trails built from the site's content: a launch sector page, a case study, an article.
const furniture = sectors.sectors.find((sector) => sector.slug === 'furniture-retailers') ?? sectors.sectors[0];
const xshowhome = proof.testimonials.find((testimonial) => testimonial.business === 'Xshowhome') ?? proof.testimonials[0];
const article = insights.articles[0];
const results = nav.links.find((link) => link.href === '/results') ?? nav.links[0];
const insightsLink = nav.links.find((link) => link.href === '/insights') ?? nav.links[1];
const home: Crumb = { label: 'Home', href: '/' };

const sectorTrail: Crumb[] = [home, { label: furniture.tileLabel, href: furniture.href }];
const caseStudyTrail: Crumb[] = [
  home,
  { label: results.label, href: results.href },
  { label: xshowhome.business, href: xshowhome.href ?? '/results' },
];
const articleTrail: Crumb[] = [
  home,
  { label: insightsLink.label, href: insightsLink.href },
  { label: article.title, href: article.href },
];

const firstOffer = nav.services.items[0];
const firstSector = nav.sectors.items[0];
/** The nav content with the top-level links left out, for the held-open dropdown samples. */
const dropdownsOnly = { ...nav, links: [] };

export default function NavigationSection() {
  return (
    <div className="grid gap-space-16">
      {/* ------------------------------------------------------------ Nav */}
      <Group title="Nav">
        <p className="body max-w-measure text-ink">
          A fixed 64px bar on paper with a rule beneath. These three are in the page flow (position static) and show
          this window&rsquo;s layout. Below 1200px the links move into the drawer; open it with the menu toggle.
        </p>

        <Sample label="Nav, homepage: no current page">
          <div className="border-x border-t border-rule">
            <Nav position="static" currentPath="/" skipLink={null} label="Main, sample 1" />
          </div>
        </Sample>

        <Sample label="Nav, a section page: Results current (aria-current, brass underline)">
          <div className="border-x border-t border-rule">
            <Nav position="static" currentPath="/results/xshowhome" skipLink={null} label="Main, sample 2" />
          </div>
        </Sample>

        <Sample label={`Nav, an offer page: Services marks the section, ${firstOffer.label} is current in the panel`}>
          <div className="border-x border-t border-rule">
            <Nav position="static" currentPath={firstOffer.href} skipLink={null} label="Main, sample 3" />
          </div>
        </Sample>

        <div className="grid gap-space-8 min-[900px]:grid-cols-2">
          <Sample label="Lockup, compact: below 720px">
            <NavLockup variant="compact" />
          </Sample>
          {/* The 40px wordmark is wider than a phone's column; it is shown where the bar uses it. */}
          <Sample label="Lockup, full: from 720px" className="hidden min-[720px]:block">
            <NavLockup variant="full" />
          </Sample>
        </div>

        <Sample label="Top-level link: rest, hover, current, focus (held)">
          <div className="flex flex-wrap items-center gap-space-8">
            <Held className={navigationMenuTriggerStyle()}>{nav.links[0].label}</Held>
            <Held className={cn(navigationMenuTriggerStyle(), 'decoration-current')}>{nav.links[0].label}</Held>
            <Held current className={navigationMenuTriggerStyle()}>
              {nav.links[0].label}
            </Held>
            <Held className={cn(navigationMenuTriggerStyle(), focusRing)}>{nav.links[0].label}</Held>
          </div>
        </Sample>

        <Sample label="Menu toggle and close: the 44px secondary icon button (held at rest and hover)">
          <div className="flex flex-wrap items-center gap-space-4">
            <Button asChild variant="secondary" size="icon">
              <span aria-hidden="true">
                <Menu size={20} strokeWidth={1.5} />
              </span>
            </Button>
            <Button asChild variant="secondary" size="icon" className="border-ink">
              <span aria-hidden="true">
                <Menu size={20} strokeWidth={1.5} />
              </span>
            </Button>
            <Button asChild variant="secondary" size="icon">
              <span aria-hidden="true">
                <X size={20} strokeWidth={1.5} />
              </span>
            </Button>
          </div>
        </Sample>
      </Group>

      {/* ------------------------------------------------------------ dropdowns */}
      <Group title="NavigationMenu dropdowns">
        <p className="body max-w-measure text-ink">
          Services and Sectors open on 150ms of hover with a mouse, or on a click, a tap, Enter or Space. ArrowDown
          moves into an open panel, Escape closes it and returns focus to its trigger, and a click on a panel that hover
          opened keeps it open. The bar shows them from 1200px; the two held open below, with the top-level links left
          out, are shown from 720px.
        </p>
        <div className="hidden gap-space-8 min-[720px]:grid min-[900px]:grid-cols-2">
          <Sample label="Services, held open: no current page">
            <div className="h-[calc(var(--nav-height)_+_var(--space-24)_+_var(--space-16))]">
              <div className="flex h-nav-height border-b border-rule px-space-4">
                <NavMenu content={dropdownsOnly} value="services" currentPath="/" label="Main, held open 1" />
              </div>
            </div>
          </Sample>
          <Sample label={`Sectors, held open: ${firstSector.label} current`}>
            <div className="h-[calc(var(--nav-height)_+_var(--space-24)_*_2_+_var(--space-12))]">
              <div className="flex h-nav-height border-b border-rule px-space-4">
                <NavMenu
                  content={dropdownsOnly}
                  value="sectors"
                  currentPath={firstSector.href}
                  label="Main, held open 2"
                />
              </div>
            </div>
          </Sample>
        </div>
        <Sample label="Panel link: rest, hover, current (held)">
          <div className="w-max border border-rule bg-paper-raised py-space-2">
            <Held className={navigationMenuPanelLinkStyle()}>{nav.services.items[1].label}</Held>
            <Held className={cn(navigationMenuPanelLinkStyle(), 'decoration-current')}>{nav.services.items[1].label}</Held>
            <Held current className={navigationMenuPanelLinkStyle()}>
              {nav.services.items[1].label}
            </Held>
          </div>
        </Sample>
      </Group>

      {/* ------------------------------------------------------------ drawer */}
      <Group title="Sheet drawer, with DrawerGesture">
        <p className="body max-w-measure text-ink">
          The drawer enters and leaves from the right in 320ms. Drag it right and it follows the pointer; let go and it
          finishes in the direction it was moving, or goes to the nearer state if it was still. A flick closes it. Grab
          it while it moves and it stops under the pointer. Focus stays inside while it is open; Escape, the close
          button, a press outside or a link closes it and focus returns to the toggle. With reduced motion it opens and
          closes at once.
        </p>
        <div className="grid gap-space-8 min-[900px]:grid-cols-2">
          <Sample label="Drawer, live at any width (Results current, theme toggle and button always shown)">
            <NavDrawer
              currentPath="/results"
              extras="always"
              label="Main, mobile sample"
              trigger={<Button variant="secondary">Open the drawer</Button>}
            />
          </Sample>
          <Sample label={`Drawer panel, static: paper-raised with a rule edge, ${furniture.navLabel} current`}>
            <div className="max-w-[420px] border border-rule bg-paper-raised">
              <SheetHeader className="relative">
                <p className="eyebrow text-ink-muted">Menu</p>
                <Button
                  asChild
                  variant="secondary"
                  size="icon"
                  className="absolute right-gutter top-[calc((var(--nav-height)_-_var(--touch-target))_/_2)]"
                >
                  <span aria-hidden="true">
                    <X size={20} strokeWidth={1.5} />
                  </span>
                </Button>
              </SheetHeader>
              <NavDrawerBody currentPath={furniture.href} extras="always" label="Main, mobile static sample" />
            </div>
          </Sample>
        </div>
      </Group>

      {/* ------------------------------------------------------------ footer */}
      <Group title="Footer">
        <p className="body max-w-measure text-ink">
          From 720px the footer fills one screen; it is shown here at its content height. The LinkedIn link leaves the
          site, so it carries the external-link icon and says so to screen readers.
        </p>
        <Sample label="Footer: three columns, descriptor, email, phone, LinkedIn, company number">
          <Footer idPrefix="sample-footer" navLabel="Footer, sample" className="border-x border-b border-rule min-[720px]:min-h-0" />
        </Sample>
      </Group>

      {/* ------------------------------------------------------------ breadcrumbs */}
      <Group title="Breadcrumbs">
        <div className="grid gap-space-8">
          <Sample label="Breadcrumbs, a sector page (there is no /sectors index)">
            <Breadcrumbs items={sectorTrail} schema={false} aria-label="Breadcrumb, sample 1" />
          </Sample>
          <Sample label="Breadcrumbs, a case study">
            <Breadcrumbs items={caseStudyTrail} schema={false} aria-label="Breadcrumb, sample 2" />
          </Sample>
          <Sample label="Breadcrumbs, an article: a long current item wraps on a phone">
            <Breadcrumbs items={articleTrail} schema={false} aria-label="Breadcrumb, sample 3" />
          </Sample>
          <Sample label="BreadcrumbList JSON-LD for the case study (the script a page emits)">
            <pre className="small whitespace-pre-wrap break-all border border-rule bg-paper-raised p-space-4 font-sans text-ink">
              {JSON.stringify(breadcrumbListJsonLd(caseStudyTrail), null, 2)}
            </pre>
          </Sample>
        </div>
      </Group>

      {/* ------------------------------------------------------------ CTA band */}
      <Group title="CTABand">
        <p className="body max-w-measure text-ink">
          The green band that closes an offer or sector page. Its copy, approved by Dan on 12 Nov 2026, is
          &ldquo;{ctaBandCopy.heading}&rdquo;, from the plan&rsquo;s wording. The actions sit on a
          paper-raised panel, as the contact band&rsquo;s form does: the primary&rsquo;s fill is the band&rsquo;s own
          green, and the Button README rules out a white one.
        </p>
        <Sample label="CTABand, default: primary and secondary">
          <CTABand headingId="sample-cta-band-1" />
        </Sample>
        <Sample label="CTABand, with an eyebrow and the primary only">
          <CTABand
            headingId="sample-cta-band-2"
            eyebrow={contactSection.eyebrow}
            heading={contactSection.heading}
            body={contactSection.intro}
            secondary={null}
          />
        </Sample>
      </Group>
    </div>
  );
}
