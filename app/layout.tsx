import type { Metadata } from 'next';
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';

const GA_ID = 'G-65K1KRBWQJ';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://atherstonedigital.com'),
  title: {
    default: 'Fractional Ecommerce Director for Shopify Brands | Atherstone Digital',
    template: '%s | Atherstone Digital',
  },
  description: 'Senior Shopify ecommerce leadership, fractionally. CRO, paid media, automation & development for brands doing £500k–£5M. 3 partners max. Book a teardown.',
  keywords: ['fractional ecommerce director shopify', 'shopify ecommerce consultant UK', 'fractional ecommerce director UK', 'Shopify Expert Birmingham', 'Ecommerce Consultant Midlands', 'Shopify Plus Consultant'],
  authors: [{ name: 'Dan Le Gresley' }],
  icons: {
    icon: '/favicon-c-bef0ns.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://atherstonedigital.com',
    siteName: 'Atherstone Digital',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
  other: {
    'geo.region': 'GB-WAR',
    'geo.placename': 'Atherstone',
    'geo.position': '52.5746;-1.5492',
    'ICBM': '52.5746, -1.5492',
  },
};

const globalSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': 'https://atherstonedigital.com/#organization',
      name: 'Atherstone Digital',
      url: 'https://atherstonedigital.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://atherstonedigital.com/favicon-c-bef0ns.svg',
      },
      description: 'Fractional Ecommerce Director for Shopify brands doing £500k–£5M. Senior strategy, development, CRO and growth execution. Based in Atherstone, Warwickshire.',
      email: 'info@atherstonedigital.com',
      telephone: '+447810838129',
      founder: {
        '@type': 'Person',
        name: 'Dan Le Gresley',
        jobTitle: 'Fractional Ecommerce Director',
        sameAs: ['https://www.linkedin.com/in/danlegresley/'],
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+447810838129',
        email: 'info@atherstonedigital.com',
        contactType: 'customer service',
      },
      priceRange: '£3000 - £10000',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Atherstone',
        addressRegion: 'Warwickshire',
        postalCode: 'CV9',
        addressCountry: 'GB',
      },
      geo: { '@type': 'GeoCoordinates', latitude: 52.5746, longitude: -1.5492 },
      areaServed: [
        { '@type': 'City', name: 'Atherstone' },
        { '@type': 'City', name: 'Tamworth' },
        { '@type': 'City', name: 'Birmingham' },
        { '@type': 'City', name: 'Coventry' },
        { '@type': 'City', name: 'Leicester' },
        { '@type': 'AdministrativeArea', name: 'Warwickshire' },
        { '@type': 'AdministrativeArea', name: 'West Midlands' },
        { '@type': 'Country', name: 'United Kingdom' },
      ],
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      sameAs: ['https://www.linkedin.com/in/danlegresley/'],
    },
    {
      '@type': 'Person',
      '@id': 'https://atherstonedigital.com/#dan',
      name: 'Dan Le Gresley',
      jobTitle: 'Fractional Ecommerce Director',
      worksFor: { '@id': 'https://atherstonedigital.com/#organization' },
      url: 'https://atherstonedigital.com/about',
      sameAs: ['https://www.linkedin.com/in/danlegresley/'],
      description: '15+ years scaling ecommerce brands. Former Head of Ecommerce at a UK £50M retailer. Shopify Plus Partner, Google Ads Certified, Klaviyo Expert.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://atherstonedigital.com/#website',
      url: 'https://atherstonedigital.com',
      name: 'Atherstone Digital',
      publisher: { '@id': 'https://atherstonedigital.com/#organization' },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
        </Script>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(globalSchema) }}
        />
        <link rel="alternate" type="text/markdown" href="/llms.txt" title="AI Context" />
      </head>
      <body className="antialiased font-sans bg-brand-dark text-brand-text">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-brand-primary focus:text-brand-dark focus:font-bold focus:rounded-lg focus:outline-none">
          Skip to main content
        </a>
        {/* Netlify Forms Detection - must exist as static HTML */}
        <form name="application" data-netlify="true" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="url" name="website" />
          <select name="revenue" />
          <input type="text" name="stack" />
          <textarea name="why_switch" />
        </form>
        <form name="lead-magnet" data-netlify="true" hidden>
          <input type="email" name="email" />
        </form>
        <form name="contact" data-netlify="true" hidden>
          <input type="text" name="name" />
          <input type="email" name="email" />
          <input type="url" name="website" />
          <textarea name="challenge" />
        </form>

        <CustomCursor />
        <Header />
        <main id="main-content" className="flex-grow min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
