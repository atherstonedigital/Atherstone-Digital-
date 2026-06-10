import type { Metadata, Viewport } from 'next';
import { Fraunces, Hanken_Grotesk } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { siteConfig } from '@/lib/siteConfig';

const GA_ID = 'G-65K1KRBWQJ';

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
  axes: ['opsz'],
});

const hankenGrotesk = Hanken_Grotesk({
  subsets: ['latin'],
  variable: '--font-hanken-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://www.atherstonedigital.com'),
  title: {
    default: siteConfig.homepageTitle,
    template: '%s | Atherstone Digital',
  },
  description: 'Senior Shopify ecommerce, run end to end. CRO, paid media, automation and development for brands doing £500k to £5M. 3 partners max. Book a 30-minute call.',
  authors: [{ name: 'Dan Le Gresley' }],
  icons: {
    icon: '/favicon-a-clay.svg',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://www.atherstonedigital.com',
    siteName: 'Atherstone Digital',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'Atherstone Digital' }],
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

export const viewport: Viewport = {
  themeColor: '#F3F0E8',
};

const globalSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': ['Organization', 'ProfessionalService'],
      '@id': 'https://www.atherstonedigital.com/#organization',
      name: 'Atherstone Digital',
      url: 'https://www.atherstonedigital.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.atherstonedigital.com/og-image.png',
      },
      description: 'A Shopify ecommerce consultancy for brands doing £500k\u2013£5M in annual revenue. AI-augmented operator replacing fragmented agency rosters with one senior partner. Based in Atherstone, Warwickshire.',
      email: 'info@atherstonedigital.com',
      telephone: '+447810838129',
      founder: {
        '@type': 'Person',
        name: 'Dan Le Gresley',
        jobTitle: 'Shopify Ecommerce Consultant',
        sameAs: ['https://www.linkedin.com/in/danlegresley/'],
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+447810838129',
        email: 'info@atherstonedigital.com',
        contactType: 'customer service',
      },
      priceRange: '£3,000 - £5,000',
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
      '@id': 'https://www.atherstonedigital.com/#dan',
      name: 'Dan Le Gresley',
      jobTitle: 'Shopify Ecommerce Consultant',
      worksFor: { '@id': 'https://www.atherstonedigital.com/#organization' },
      url: 'https://www.atherstonedigital.com/about',
      sameAs: ['https://www.linkedin.com/in/danlegresley/'],
      description: '15+ years scaling ecommerce brands. Former Head of Ecommerce at a UK £50M retailer. Shopify Plus Partner, Google Ads Certified, Klaviyo Expert.',
    },
    {
      '@type': 'WebSite',
      '@id': 'https://www.atherstonedigital.com/#website',
      url: 'https://www.atherstonedigital.com',
      name: 'Atherstone Digital',
      publisher: { '@id': 'https://www.atherstonedigital.com/#organization' },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GB" className={`${fraunces.variable} ${hankenGrotesk.variable}`}>
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
