import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, TrendingUp, BarChart3, PieChart, LineChart, Database } from 'lucide-react';
import { Contact } from '@/components/Contact';
import { BreadcrumbsJsonLd } from '@/components/Breadcrumbs';
import { siteConfig } from '@/lib/siteConfig';

export const metadata: Metadata = {
  title: { absolute: 'Shopify Ecommerce Case Studies, Numbers | Atherstone Digital' },
  description: 'Real, named Shopify case studies and the measurement framework. Xshowhome catalogue health and Saverys multi-location fractional, attributed quotes and numbers.',
  alternates: {
    canonical: 'https://www.atherstonedigital.com/results',
  },
  openGraph: {
    title: 'Shopify Ecommerce Case Studies, Numbers | Atherstone Digital',
    description: 'Real, named Shopify case studies and the measurement framework. Xshowhome catalogue health and Saverys multi-location fractional, attributed quotes and numbers.',
    url: 'https://www.atherstonedigital.com/results',
    type: 'website',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Ecommerce Growth Results & Case Studies',
  description: 'Real, named commercial work and the measurement framework behind the fractional model for Shopify brands.',
  url: 'https://www.atherstonedigital.com/results',
};

const stats = [
  { value: '16,193', label: 'Product Records Remediated', sublabel: 'Xshowhome data audit: alt text, taxonomy, pricing' },
  { value: '15,668', label: 'Alt Texts Corrected', sublabel: 'Xshowhome: 97% of the catalogue, brand leaks removed' },
  { value: '6,337', label: 'Products Remapped', sublabel: 'Xshowhome: full Shopify Standard Taxonomy rebuild' },
  { value: '66 to 84', label: 'SEO Audit Score', sublabel: 'Xshowhome: measured before and after remediation' },
];

const metrics = [
  {
    icon: BarChart3,
    bgIcon: TrendingUp,
    color: 'brand-primary',
    title: 'Revenue Per Visitor (RPV)',
    desc: 'This is my North Star metric. Traffic is vanity; RPV is sanity. By focusing on increasing the value of every visitor through CRO and AOV strategies, we build sustainable growth regardless of ad cost fluctuations.',
  },
  {
    icon: LineChart,
    bgIcon: PieChart,
    color: 'brand-accent',
    title: 'Contribution Margin',
    desc: 'Revenue without profit is a vanity metric. I track Contribution Margin 1, 2, and 3 to ensure that every campaign we scale is actually putting cash in the bank, not just increasing the Stripe top-line.',
  },
  {
    icon: Database,
    bgIcon: Database,
    color: 'brand-primary',
    title: 'Data Integrity as a Foundation',
    desc: 'Before optimising for growth, the data has to be clean. Broken taxonomy, wrong brand attribution in alt text, and NaN values in product descriptions all suppress organic visibility before a single ad is run. We audit the foundation first, then we scale.',
  },
];

export default function ResultsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BreadcrumbsJsonLd label="Results" path="/results" />
      <div className="pt-36 pb-20 bg-brand-dark min-h-screen">
        <div className="container mx-auto px-6 mb-8">
          <Link href="/" className="text-brand-muted hover:text-brand-primary transition-colors inline-flex items-center gap-2 text-sm font-medium">
            <ArrowLeft size={16} /> Back to Overview
          </Link>
        </div>

        {/* Hero */}
        <section className="relative px-6 mb-20">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Commercial <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Impact.</span>
            </h1>
            <p className="text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
              I don&apos;t sell hours. I sell outcomes. <br />
              Here is the data behind the fractional model.
            </p>
          </div>
        </section>

        {/* Stats grid */}
        <section className="container mx-auto px-6 mb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.value} className="bg-brand-surface border border-brand-border rounded-2xl p-6 text-center hover:border-brand-primary/30 transition-colors">
                <div className="font-display text-4xl lg:text-5xl font-bold text-brand-primary mb-2">{stat.value}</div>
                <div className="text-white font-medium text-sm mb-1">{stat.label}</div>
                <div className="text-brand-muted text-xs">{stat.sublabel}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Case studies */}
        <section className="container mx-auto px-6 mb-24 space-y-12">
          {[
            {
              eyebrow: 'Furniture & Homeware · Shopify · Warwickshire, UK',
              brand: 'Xshowhome',
              headline: '16,193 product records remediated',
              situation:
                'Xshowhome operates a multi-showroom ex-showhome furniture retail business across Warwickshire and the Midlands. The Shopify store had grown organically and the underlying data was in poor shape: thousands of product images attributed to the wrong brand, the Shopify Standard Taxonomy broken with 1,373 products assigned to nonsense categories like "Address Signs" and "Earthquake Alarms", and the store’s own legal entity name leaking into Google indexed page titles.',
              did:
                'Three-phase data remediation via Python/openpyxl scripts and Matrixify bulk import. Phase 1: alt text correction across all 16,193 image rows, 15,668 corrected, 190 generated from scratch. Phase 2: product type standardisation, 71 inconsistent values cleaned to 50 correct types across 1,486 rows. Phase 3: full taxonomy rebuild, all 6,337 products remapped to correct Shopify Standard Taxonomy paths.',
              outcome: [
                '16,193 product records remediated across the catalogue',
                '15,668 alt texts corrected (97% of the catalogue), 190 generated from scratch',
                '6,337 products remapped to a clean Shopify Standard Taxonomy',
                'SEO audit score moved from 66 to 84 (before and after remediation)',
                'Brand-name leaks removed from store name, alt text, and indexed titles',
              ],
              quote:
                'The scale of what Dan uncovered in our product catalogue was genuinely shocking. Thousands of product records with the wrong information, taxonomy misclassifications we’d never have found ourselves. He fixed all of it systematically and quickly.',
              cite: 'Gemma Pountney, Xshowhome',
            },
            {
              eyebrow: 'Premium Retail · Multi-Location · Broadway, UK',
              brand: 'Saverys of Broadway',
              headline: 'Embedded fractional director across three showrooms',
              situation:
                'Saverys of Broadway is a premium Cotswolds retailer trading across three showroom locations. They needed someone senior who could hold the strategic picture for a premium brand without compromising the positioning, while also getting into the detail of how the site and Google presence actually performed week to week.',
              did:
                'Fractional director engagement spanning ecommerce strategy and ongoing execution: site work, Google presence (organic visibility, listings, search performance), and the weekly cadence of measurement and prioritisation that a multi-location premium retailer needs but rarely has in-house.',
              outcome: [
                'Embedded fractional director across three premium retail showrooms',
                'Site and Google presence owned end to end, no agency relay',
                'Strategy and execution delivered inside one rolling monthly retainer',
              ],
              quote:
                'Dan understands premium brands. Having someone who can hold the strategic picture while also getting into the detail of how the site and our Google presence actually perform is exactly what we needed.',
              cite: 'Gary Postlethwaite, Saverys of Broadway',
            },
          ].map((c) => (
            <article key={c.brand} className="relative bg-brand-surface border border-white/10 rounded-3xl overflow-hidden max-w-5xl mx-auto shadow-2xl p-8 md:p-12">
              <span className="text-xs font-mono text-brand-primary uppercase tracking-widest">{c.eyebrow}</span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-8 tracking-tight">
                {c.brand}: <span className="text-brand-primary">{c.headline}</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-8 mb-10">
                <section>
                  <h3 className="text-white font-display font-bold mb-3">The situation</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{c.situation}</p>
                </section>
                <section>
                  <h3 className="text-white font-display font-bold mb-3">What I did</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{c.did}</p>
                </section>
                <section>
                  <h3 className="text-white font-display font-bold mb-3">The outcome</h3>
                  <ul className="space-y-2 text-sm text-brand-muted">
                    {c.outcome.map((m) => (
                      <li key={m} className="flex gap-2">
                        <span className="text-brand-primary mt-0.5 shrink-0">▸</span>
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              </div>
              <blockquote className="border-l-2 border-brand-primary pl-6 italic text-brand-text leading-relaxed">
                &ldquo;{c.quote}&rdquo;
                <cite className="block not-italic text-sm text-brand-muted mt-3">{c.cite}</cite>
              </blockquote>
            </article>
          ))}
        </section>

        {/* Sectors */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-5xl mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Sectors &amp; Verticals</h2>
            <p className="text-brand-muted mb-8">The fractional model works across Shopify verticals. Current and past partner sectors include:</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Furniture & Homeware', 'Fashion & Apparel', 'Health & Wellness', 'Lifestyle & Gifting', 'Beauty & Skincare', 'Sports & Outdoors'].map((sector) => (
                <span key={sector} className="px-4 py-2 text-sm text-brand-muted border border-white/10 rounded-full bg-brand-surface">{sector}</span>
              ))}
            </div>
          </div>
        </section>

        {/* Measurement framework */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Measurement Framework</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {metrics.map((m) => (
                <div key={m.title} className="group relative bg-brand-surface/40 p-8 rounded-3xl border border-white/5 hover:border-brand-primary/30 transition-all duration-300">
                  <div className="absolute top-4 right-4 text-brand-primary/20 group-hover:text-brand-primary/40 transition-colors">
                    <m.bgIcon size={48} />
                  </div>
                  <div className="relative z-10">
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary mb-6 border border-brand-primary/20">
                      <m.icon size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3 font-display">{m.title}</h3>
                    <p className="text-brand-muted leading-relaxed text-sm">{m.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 mb-16">
          <div className="bg-gradient-to-br from-brand-surfaceHighlight to-brand-dark border border-brand-border rounded-3xl p-12 text-center relative overflow-hidden group max-w-4xl mx-auto">
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">Let&apos;s improve your numbers.</h2>
              <p className="text-brand-muted text-lg mb-8">Apply for a partnership to see what the Fractional model can do for your bottom line.</p>
              <Link href={siteConfig.ctas.secondary.href} className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all transform hover:-translate-y-1 hover:bg-brand-accent">
                {siteConfig.ctas.secondary.label} <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        <Contact />
      </div>
    </>
  );
}
