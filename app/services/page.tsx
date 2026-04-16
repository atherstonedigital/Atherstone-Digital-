import { Suspense } from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Briefcase } from 'lucide-react';
import { SERVICES_DATA } from '@/lib/data';
import { Contact } from '@/components/Contact';
import { siteConfig } from '@/lib/siteConfig';
import { ServicesPillarGrid } from '@/components/ServicesPillarGrid';

export const metadata: Metadata = {
  title: 'Shopify Ecommerce Services | Growth, CRO & Automation',
  description: 'Full-stack ecommerce services for Shopify brands. Shopify builds, CRO, paid media, n8n automation, Klaviyo and more — delivered by a single senior operator.',
  alternates: {
    canonical: 'https://www.atherstonedigital.com/services',
  },
  openGraph: {
    title: 'Shopify Ecommerce Services | Growth, CRO & Automation | Atherstone Digital',
    description: 'Full-stack ecommerce services for Shopify brands. Shopify builds, CRO, paid media, n8n automation, Klaviyo and more — delivered by a single senior operator.',
    url: 'https://www.atherstonedigital.com/services',
    type: 'website',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Ecommerce Services | Atherstone Digital',
  description: 'Full-stack ecommerce execution: Shopify Plus development, CRO, Google & Meta Ads, Klaviyo lifecycle marketing, n8n automation, and AI search optimisation.',
  url: 'https://www.atherstonedigital.com/services',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: SERVICES_DATA.map((s, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      url: `https://www.atherstonedigital.com/services/${s.slug}`,
      name: s.title,
      description: s.description,
    })),
  },
};

export default function ServicesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="pt-36 pb-20 bg-brand-dark min-h-screen">

        {/* Hero */}
        <section className="container mx-auto px-6 mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-brand-primary/30 rounded-full bg-brand-primary/5">
            <Briefcase size={12} className="text-brand-primary" />
            <span className="text-brand-primary text-xs font-mono uppercase tracking-widest font-bold">The Engagement Model</span>
          </div>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            One Director. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Full Stack Execution.</span>
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
            I don&apos;t sell &ldquo;services&rdquo; in isolation. I provide <strong className="text-white">Senior Operational Leadership</strong> (The Director) and use a specific set of high-leverage tools (The Stack) to execute the strategy.
          </p>
        </section>

        {/* Core product card */}
        <section className="container mx-auto px-6 mb-24">
          <div className="bg-gradient-to-b from-brand-surfaceHighlight to-brand-dark border border-brand-primary/30 rounded-3xl p-1 relative overflow-hidden shadow-[0_0_50px_rgba(74,222,128,0.05)] max-w-5xl mx-auto">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-1 bg-brand-primary/50 blur-[2px]"></div>
            <div className="bg-brand-dark rounded-[22px] p-8 md:p-12 lg:flex gap-12 items-center relative z-10">
              <div className="lg:w-1/2 mb-8 lg:mb-0">
                <h2 className="text-3xl font-display font-bold text-white mb-4">
                  The Core Offering: <br /><span className="text-brand-primary">Fractional Ecommerce Director</span>
                </h2>
                <p className="text-brand-muted text-lg mb-8 leading-relaxed">
                  This is the retainer. I replace your need for a full-time Head of Ecommerce. I take ownership of your Shopify P&L, define the roadmap, and manage the execution.
                </p>
                <Link href="/fractional-ecommerce-director" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-brand-dark font-bold rounded-lg hover:bg-brand-accent transition-all">
                  See Full Details & Pricing <ArrowRight size={18} />
                </Link>
              </div>
              <div className="lg:w-1/2 space-y-4">
                {['Commercial Strategy & KPI Tracking', 'CRO & UX Improvements', 'Paid Media Management (Google + Meta)', 'Lifecycle Marketing (Klaviyo)', 'Full Stack Development & Automation', 'Weekly Reporting & Sprint Calls'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-brand-text text-sm">
                    <div className="w-1.5 h-1.5 rounded-full bg-brand-primary shrink-0"></div>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Services grouped by pillar */}
        <section className="container mx-auto px-6 mb-24">
          <h2 className="font-display text-3xl font-bold text-white mb-4 text-center">The Tool Stack</h2>
          <p className="text-brand-muted text-center mb-12 max-w-xl mx-auto">
            Each service below is a capability I use within a retainer engagement. They are not sold in isolation. They are the levers I pull to move your numbers.
          </p>
          <Suspense>
            <ServicesPillarGrid />
          </Suspense>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 mb-16">
          <div className="bg-brand-surfaceHighlight rounded-3xl p-12 text-center border border-brand-border max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white mb-6">Not sure where to start?</h2>
            <p className="text-brand-muted text-lg mb-8">Book a call. I&apos;ll tell you exactly what I&apos;d prioritise for your store.</p>
            <a href={siteConfig.cta.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all transform hover:-translate-y-1 hover:bg-brand-accent">
              {siteConfig.cta.label} <ArrowRight size={20} />
            </a>
          </div>
        </section>

        <Contact />
      </div>
    </>
  );
}
