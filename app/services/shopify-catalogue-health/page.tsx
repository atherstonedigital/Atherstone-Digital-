import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Contact } from '@/components/Contact';
import { CATALOGUE_HEALTH_DATA, SERVICES_DATA } from '@/lib/data';
import { CatalogueHealthFAQ } from './CatalogueHealthFAQ';

export const metadata: Metadata = {
  title: 'Shopify Catalogue Health Audit & Fix | Atherstone Digital',
  description: 'Fixed-price Shopify product data audit and remediation. We find and fix alt text errors, taxonomy misclassifications, and metadata gaps that hurt your search rankings and Google Shopping performance.',
  alternates: {
    canonical: 'https://www.atherstonedigital.com/services/shopify-catalogue-health',
  },
  openGraph: {
    title: 'Shopify Catalogue Health Audit & Fix | Atherstone Digital',
    description: 'Fixed-price Shopify product data audit and remediation for brands doing £500k to £5M. We fix the catalogue data issues your agency missed.',
    url: 'https://www.atherstonedigital.com/services/shopify-catalogue-health',
    type: 'website',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Shopify Catalogue Health Audit & Fix',
  description: 'Fixed-price Shopify product data audit and remediation. We find and fix alt text errors, taxonomy misclassifications, product type inconsistencies, and metadata gaps for Shopify stores.',
  provider: {
    '@type': 'Organization',
    name: 'Atherstone Digital',
    url: 'https://www.atherstonedigital.com',
  },
  areaServed: {
    '@type': 'Country',
    name: 'United Kingdom',
  },
  serviceType: 'Ecommerce Data Remediation',
  offers: [
    {
      '@type': 'Offer',
      name: 'Starter',
      description: 'Shopify catalogue health audit and fix for stores with up to 500 SKUs',
      price: '1500',
      priceCurrency: 'GBP',
    },
    {
      '@type': 'Offer',
      name: 'Growth',
      description: 'Shopify catalogue health audit and fix for stores with 500 to 2000 SKUs',
      price: '3000',
      priceCurrency: 'GBP',
    },
    {
      '@type': 'Offer',
      name: 'Scale',
      description: 'Shopify catalogue health audit and fix for stores with 2000+ SKUs',
      price: '5000',
      priceCurrency: 'GBP',
    },
  ],
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I need to give you access to my Shopify admin?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We need a product data export, which can be generated via Matrixify or a standard Shopify CSV export. If it\'s easier, we can request collaborator access to pull the export ourselves. We never make changes to your live store without your explicit approval.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if my catalogue has more complex issues beyond the standard audit?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The initial review call is designed to catch this. If your store has unusual data structures, custom metafield setups, or specific integration requirements, we\'ll scope a tailored engagement rather than shoehorning it into a standard tier.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can you also handle ongoing catalogue maintenance?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Many brands benefit from a quarterly data health check after the initial remediation. We offer this as an add-on or as part of a retained engagement.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is this different from what my Shopify agency does?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most agencies focus on design, development, and marketing. Catalogue data operations is a specialist discipline that requires specific tooling and deep Shopify data knowledge. We regularly find issues that have been present since a store\'s original migration or theme build.',
      },
    },
    {
      '@type': 'Question',
      name: 'What if I only need the audit, not the fix?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'We offer the audit report as a standalone deliverable at a reduced rate. Get in touch and we\'ll quote based on your catalogue size.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.atherstonedigital.com' },
    { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://www.atherstonedigital.com/services' },
    { '@type': 'ListItem', position: 3, name: 'Shopify Catalogue Health Audit & Fix', item: 'https://www.atherstonedigital.com/services/shopify-catalogue-health' },
  ],
};

const CALENDLY_URL = 'https://calendly.com/dan-atherstonedigital/30min';

const whatsIncluded = [
  {
    title: 'Full catalogue data audit',
    description: 'Every product and variant in your store assessed against a comprehensive checklist: alt text accuracy, product type consistency, Shopify Standard Product Taxonomy mapping, metafield completeness, SEO metadata quality, and image specification flags.',
  },
  {
    title: 'Detailed audit report',
    description: 'A clear, jargon-free report showing exactly what we found, why it matters, and what we changed. Includes before and after metrics so you can see the scale of improvement.',
  },
  {
    title: 'Production-ready data fix',
    description: 'A clean, validated Matrixify import file that remediates every issue identified in the audit. Alt text rewritten correctly. Product types standardised. Taxonomy mappings corrected. Metadata gaps filled. Ready to import with confidence.',
  },
  {
    title: 'Safe implementation guidance',
    description: 'Step-by-step instructions for importing the corrected data, plus a rollback plan if needed. We can also handle the import directly if you prefer.',
  },
  {
    title: 'Post-import verification',
    description: 'After import, we run a verification pass to confirm all changes landed correctly and nothing was lost or broken in the process.',
  },
];

const howItWorks = [
  {
    title: 'Book a free review call',
    description: 'A 20-minute call to understand your store, catalogue size, and any known issues. No obligation, no pitch deck.',
  },
  {
    title: 'We export and audit your data',
    description: 'Using specialist tooling built for exactly this task, we extract your full product catalogue and run it through a structured audit covering alt text, taxonomy, product types, metadata, and image quality.',
  },
  {
    title: 'You receive the audit report',
    description: 'A plain-English summary of everything we found, with prioritised recommendations and the commercial impact of each issue.',
  },
  {
    title: 'We build and deliver the fix',
    description: 'A production-ready Matrixify import file containing every correction, tested and validated before delivery.',
  },
  {
    title: 'Import and verify',
    description: 'The corrected data goes live in your store, either by your team or by us. We verify the import landed cleanly and you\'re done.',
  },
];

export default function ShopifyCatalogueHealthPage() {
  const { tiers } = CATALOGUE_HEALTH_DATA.pricing;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-36 pb-20 bg-brand-dark min-h-screen">
        {/* Breadcrumb */}
        <div className="container mx-auto px-6 mb-8">
          <Link href="/services" className="text-brand-muted hover:text-brand-primary transition-colors inline-flex items-center gap-2 text-sm">
            <ArrowLeft size={16} /> All Services
          </Link>
        </div>

        {/* Hero */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-block px-3 py-1 mb-6 border border-brand-primary/30 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-mono uppercase tracking-widest">
              Fixed-Price Productised Service
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Your Shopify Catalogue Data Is Costing You Sales
            </h1>
            <p className="text-xl text-brand-muted leading-relaxed max-w-3xl mx-auto mb-10">
              Fixed-price product data audit and remediation for Shopify brands. We find and fix the errors your agency missed, so Google Shopping, search, and AI assistants can actually understand what you sell.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-brand-accent transition-colors shadow-[0_0_20px_rgba(0,220,130,0.2)] hover:shadow-[0_0_30px_rgba(0,220,130,0.4)]"
            >
              Book a Free Catalogue Review Call <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* Problem Statement */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              The problem most Shopify brands don&apos;t know they have
            </h2>
            <div className="text-brand-muted text-lg leading-relaxed space-y-6">
              <p>
                Your product catalogue is the foundation of everything: search rankings, Google Shopping performance, accessibility compliance, and how AI tools like Google AI Overviews and ChatGPT represent your brand to potential buyers.
              </p>
              <p>
                But most Shopify stores between £500k and £5M in revenue have never had their catalogue data properly audited. The result is a mess hiding in plain sight.
              </p>
              <p>
                Alt text that references the wrong brand on thousands of images. Product types with dozens of inconsistent variations that fragment your Google Shopping categories. Shopify taxonomy mappings so far off that a furniture store ends up classified under &ldquo;Earthquake Alarms&rdquo; or &ldquo;Address Signs.&rdquo; Meta descriptions that are blank, duplicated, or auto-generated nonsense.
              </p>
              <p>
                These aren&apos;t cosmetic issues. They directly impact your visibility in search, your Google Merchant Centre approval rates, your accessibility compliance, and increasingly, how AI-powered shopping tools decide whether to recommend your products.
              </p>
              <p>
                The problem is that fixing catalogue data at scale requires a rare combination of Shopify platform knowledge, data operations tooling, and the commercial judgement to know what &ldquo;correct&rdquo; actually looks like for your specific product range. Most agencies don&apos;t have this. Most merchants don&apos;t have the time.
              </p>
              <p>
                That&apos;s what this service exists to solve.
              </p>
            </div>
          </div>
        </section>

        {/* What's Included */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight text-center">
              What&apos;s included
            </h2>
            <div className="grid gap-6">
              {whatsIncluded.map((item) => (
                <div
                  key={item.title}
                  className="bg-brand-surface rounded-2xl p-8 border border-brand-border hover:border-brand-primary/30 transition-all"
                >
                  <div className="flex items-start gap-4">
                    <CheckCircle size={22} className="text-brand-primary mt-1 shrink-0" />
                    <div>
                      <h3 className="font-display font-bold text-white text-xl mb-2">{item.title}</h3>
                      <p className="text-brand-muted leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-10 tracking-tight text-center">
              How it works
            </h2>
            <div className="grid gap-8">
              {howItWorks.map((step, i) => (
                <div key={step.title} className="flex gap-6 items-start">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                    <span className="font-display font-bold text-brand-primary text-lg">{i + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-white text-xl mb-2">{step.title}</h3>
                    <p className="text-brand-muted leading-relaxed">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight text-center">
              Simple, transparent pricing
            </h2>
            <p className="text-brand-muted text-lg text-center mb-12 max-w-2xl mx-auto">
              Fixed price based on catalogue size. No hourly billing, no scope creep, no surprises.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              {tiers.map((tier) => {
                const isPopular = tier.name === 'Growth';
                return (
                  <div
                    key={tier.name}
                    className={`rounded-2xl p-8 border relative ${
                      isPopular
                        ? 'bg-brand-surfaceHighlight border-brand-primary/40 shadow-[0_0_40px_rgba(0,220,130,0.1)]'
                        : 'bg-brand-surface border-brand-border'
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-primary text-brand-dark text-xs font-bold rounded-full">
                        MOST POPULAR
                      </div>
                    )}
                    <div className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-3">
                      {tier.name}
                    </div>
                    <div className="font-display text-4xl font-bold text-white mb-2">
                      £{tier.price.toLocaleString()}
                    </div>
                    <div className="text-brand-muted text-sm mb-6">{tier.skuRange}</div>
                    <p className="text-brand-muted text-sm leading-relaxed">{tier.detail}</p>
                  </div>
                );
              })}
            </div>
            <p className="text-brand-muted text-center mt-10 max-w-3xl mx-auto leading-relaxed">
              All tiers include the full audit report, remediated data file, implementation guidance, and post-import verification. Turnaround is typically 5 to 10 working days depending on catalogue size.
            </p>
          </div>
        </section>

        {/* Why This Matters Now */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              Why this matters more than it used to
            </h2>
            <div className="text-brand-muted text-lg leading-relaxed space-y-6">
              <p>
                Google&apos;s shift toward AI Overviews means product data quality is becoming the primary lever for visibility in search results. When Google&apos;s AI summarises product options for a shopper, it pulls from your structured data, your taxonomy classifications, and your product descriptions. If that data is wrong, inconsistent, or missing, you don&apos;t get surfaced. Period.
              </p>
              <p>
                At the same time, Google Merchant Centre is getting stricter about data quality requirements, and accessibility regulations are tightening around alt text and image descriptions.
              </p>
              <p>
                The brands that clean this up now gain a genuine competitive advantage. The brands that don&apos;t will find themselves increasingly invisible to the AI-powered discovery tools that are replacing traditional search results.
              </p>
            </div>
          </div>
        </section>

        {/* Credibility */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-8 tracking-tight">
              Built on real experience, not theory
            </h2>
            <div className="text-brand-muted text-lg leading-relaxed space-y-6">
              <p>
                This service exists because we&apos;ve done this work. On a recent engagement with a UK furniture retailer, we audited over 16,000 product image rows and found that 97% carried incorrect brand attribution in their alt text. We collapsed 71 inconsistent product type values down to 54 clean, standardised entries. We corrected Shopify taxonomy mappings that had furniture products classified under categories including &ldquo;Address Signs&rdquo; and &ldquo;Earthquake Alarms.&rdquo;
              </p>
              <p>
                That retailer now has a clean, consistent catalogue that Google Shopping, search engines, and AI discovery tools can actually interpret correctly.
              </p>
              <p>
                We use the same tooling and methodology on every engagement. It is fast, thorough, and built specifically for Shopify at scale.
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <CatalogueHealthFAQ />

        {/* Final CTA */}
        <section className="container mx-auto px-6 mb-20">
          <div className="bg-brand-surfaceHighlight rounded-3xl p-12 text-center border border-brand-border max-w-4xl mx-auto">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 tracking-tight">
              Let&apos;s see what&apos;s hiding in your product data
            </h2>
            <p className="text-brand-muted text-lg mb-8 max-w-2xl mx-auto">
              Book a free 20-minute catalogue review call. We&apos;ll pull a quick sample from your store and show you what we find. No obligation, no hard sell.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-brand-accent transition-colors shadow-[0_0_20px_rgba(0,220,130,0.2)] hover:shadow-[0_0_30px_rgba(0,220,130,0.4)]"
            >
              Book Your Free Review Call <ArrowRight size={18} />
            </a>
          </div>
        </section>

        {/* Other Services */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-white mb-8">Other Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES_DATA.filter((s) => s.id !== 'catalogue-health').slice(0, 3).map((s) => (
                <Link
                  key={s.id}
                  href={`/services/${s.slug}`}
                  className="group p-5 bg-brand-surface rounded-xl border border-brand-border hover:border-brand-primary/30 transition-all"
                >
                  <div className="text-xs font-mono text-brand-primary mb-2">{s.outcome}</div>
                  <div className="font-display font-bold text-white group-hover:text-brand-primary transition-colors">{s.title}</div>
                  <div className="flex items-center gap-1 text-xs text-brand-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    More <ArrowRight size={10} />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </div>
    </>
  );
}
