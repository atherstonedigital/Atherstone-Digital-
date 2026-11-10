import type { Metadata, Viewport } from 'next';
import { Newsreader, Schibsted_Grotesk } from 'next/font/google';
import Script from 'next/script';

import { JsonLd } from '@/components/site/JsonLd';
import { colorValues } from '@/lib/design/tokens';
import { defaultMetadata, organizationJsonLd } from '@/lib/seo';
import { themeInitScript } from '@/lib/theme';
import './globals.css';

const GA_ID = 'G-65K1KRBWQJ';

// The design system's two families (docs/brand: display and sans). next/font self-hosts them with display swap and a
// metric-adjusted local fallback, so nothing shifts when the web font arrives. app/styles/tokens.css maps these
// variables into --font-display and --font-sans.
//
// Newsreader is the exception: Next 14.2.5 ships no metrics for it, so adjustFontFallback: true only logs "Failed to
// find font override values" and emits no fallback. It is off here, and tokens.css supplies the adjusted face instead
// ("Newsreader fallback", second in --font-display, from design/tokens.additions.json).
//
// The italic is its own call (Phase 3 review). next/font preloads every face in a call, so with both styles in one the
// 144KB italic was fetched at high priority on every page, though only the testimonials (.quote, always below the
// fold) use it. A separate call is a separate family, so .quote names it (app/globals.css); it is not preloaded and
// loads when a quote first renders.
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  axes: ['opsz'],
  style: ['normal'],
  adjustFontFallback: false,
});

const newsreaderItalic = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader-italic',
  display: 'swap',
  axes: ['opsz'],
  style: ['italic'],
  adjustFontFallback: false,
  preload: false,
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted-grotesk',
  display: 'swap',
  weight: ['400', '500', '600'],
  adjustFontFallback: true,
});

const fontVariables = [newsreader, newsreaderItalic, schibstedGrotesk].map((f) => f.variable).join(' ');

// Site-wide defaults from lib/seo.ts: metadataBase, the title template (for routes that set a plain title, such as
// /design-system), the homepage description and the og-home share image. Every route in app/(site) overrides them
// with buildMetadata(). The icons come from the file conventions (app/icon.svg, app/apple-icon.png, app/manifest.ts)
// plus the two PNG links in <head> below.
export const metadata: Metadata = defaultMetadata;

// The browser bar follows the page ground in each theme, from the generated tokens, never a written hex.
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: colorValues.paper.light },
    { media: '(prefers-color-scheme: dark)', color: colorValues.paper.dark },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        {/* lazyOnload (Phase 3 review): injected at idle after the load event, with no preload in the head, so gtag.js
            never competes with the fonts, the CSS or the largest paint. The trade: a visit that leaves before the
            page has loaded and gone idle is not counted. */}
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="lazyOnload" />
        <Script id="ga4-init" strategy="lazyOnload">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="AI Context" />
        {/* Google Search shows a favicon at a multiple of 48px (docs/brand Favicons README). */}
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48.png" />
        {/* Organization, site-wide (plan, Structured data). */}
        <JsonLd data={organizationJsonLd()} />
      </head>
      <body>{children}</body>
    </html>
  );
}
