import type { Metadata } from 'next';
import { Fraunces, Hanken_Grotesk, Newsreader, Schibsted_Grotesk } from 'next/font/google';
import Script from 'next/script';
import { siteUrl } from '@/lib/content/site';
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
const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  display: 'swap',
  axes: ['opsz'],
  style: ['normal', 'italic'],
  adjustFontFallback: false,
});

const schibstedGrotesk = Schibsted_Grotesk({
  subsets: ['latin'],
  variable: '--font-schibsted-grotesk',
  display: 'swap',
  weight: ['400', '500', '600'],
  adjustFontFallback: true,
});

// The pre-rebuild families, still used by the pages in app/(legacy). Remove in Phase 3. Not preloaded: the brand
// book allows two families, so pages on the new system must not download these. The @font-face rules stay, so a
// legacy page still fetches them when it uses them.
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
  preload: false,
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
  preload: false,
});

const fontVariables = [newsreader, schibstedGrotesk, fraunces, hankenGrotesk].map((f) => f.variable).join(' ');

// Site-wide metadata only. The pre-rebuild description, icons, share image and theme colour live in the
// app/(legacy) layout; new routes set their own.
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Atherstone Digital',
    template: '%s | Atherstone Digital',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={fontVariables} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="AI Context" />
      </head>
      <body>{children}</body>
    </html>
  );
}
