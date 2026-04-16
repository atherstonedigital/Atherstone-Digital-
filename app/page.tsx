import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Contact } from '@/components/Contact';
import { LeadMagnet } from '@/components/LeadMagnet';
import { SERVICES_DATA } from '@/lib/data';
import { siteConfig } from '@/lib/siteConfig';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap, Quote, BarChart2 } from 'lucide-react';
import { MondayDigestPreview } from '@/components/MondayDigestPreview';

export const metadata: Metadata = {
  title: 'Fractional Ecommerce Director for Shopify Brands | Warwickshire UK',
  description: 'Fractional Ecommerce Director for Shopify brands doing £500k–£5M. Senior CRO, paid media, Klaviyo & development from Atherstone, Warwickshire. 3 partners max.',
  alternates: {
    canonical: 'https://www.atherstonedigital.com',
  },
  openGraph: {
    title: 'Fractional Ecommerce Director for Shopify Brands | Warwickshire UK',
    description: 'Fractional Ecommerce Director for Shopify brands doing £500k–£5M. Senior CRO, paid media, Klaviyo & development from Atherstone, Warwickshire. 3 partners max.',
    url: 'https://www.atherstonedigital.com',
    type: 'website',
  },
};

const homepageSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://www.atherstonedigital.com/#organization',
      name: 'Atherstone Digital',
      url: 'https://www.atherstonedigital.com',
      logo: 'https://www.atherstonedigital.com/og-image.png',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Atherstone',
        addressRegion: 'Warwickshire',
        postalCode: 'CV9',
        addressCountry: 'GB',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+44-7810-838129',
        contactType: 'sales',
        email: 'info@atherstonedigital.com',
      },
      sameAs: ['https://www.linkedin.com/in/danlegresley/'],
      description: 'A fractional ecommerce director service for Shopify brands doing \u00a3500k\u2013\u00a35M in annual revenue. AI-augmented operator replacing fragmented agency rosters with one senior partner.',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '5',
        bestRating: '5',
      },
      review: [
        {
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Gemma Pountney' },
          reviewBody: 'The scale of what Dan uncovered in our product catalogue was genuinely shocking. Thousands of product records with the wrong information, taxonomy misclassifications we\u2019d never have found ourselves. He fixed all of it systematically and quickly.',
        },
        {
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Dr Frankie Harrison' },
          reviewBody: 'He built out a complete automation system that connected our Shopify store, our email platform, our supplier feeds, everything, and it just works. We saved over 120 hours a month almost immediately.',
        },
        {
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Gary Postlethwaite' },
          reviewBody: 'Dan understands premium brands. Having someone who can hold the strategic picture while also getting into the detail of how the site and our Google presence actually perform is exactly what we needed.',
        },
        {
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Luke Aling' },
          reviewBody: 'Dan is the person we bring in when a client needs serious ecommerce thinking and we need to know it\u2019ll be delivered properly. He works seamlessly as an extension of the Ranch team.',
        },
        {
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Kim Waller' },
          reviewBody: 'Dan came in, got into the analytics properly, and gave us a clear picture of where we were losing people and why. The recommendations were practical and prioritised, not a wishlist.',
        },
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.atherstonedigital.com/#person',
      name: 'Dan Le Gresley',
      jobTitle: 'Fractional Ecommerce Director',
      worksFor: { '@id': 'https://www.atherstonedigital.com/#organization' },
      url: 'https://www.atherstonedigital.com/about',
      sameAs: ['https://www.linkedin.com/in/danlegresley/'],
      knowsAbout: [
        'Shopify',
        'Shopify Plus',
        'Ecommerce Strategy',
        'Conversion Rate Optimisation',
        'Google Ads',
        'Klaviyo',
        'n8n Automation',
        'Ecommerce Data Remediation',
        'Google Shopping Feed Optimisation',
      ],
      description: '20 years in ecommerce and digital. Blue chip and DTC clients. Now provides fractional director services to Shopify brands doing £500k–£5M.',
      hasCredential: [
        { '@type': 'EducationalOccupationalCredential', name: 'Google Ads Certified' },
        { '@type': 'EducationalOccupationalCredential', name: 'Klaviyo Expert' },
        { '@type': 'EducationalOccupationalCredential', name: 'Shopify Plus Partner' },
      ],
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

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }} />
      <Hero />
      <EntityDefinition />
      <SocialProof />
      <DirectorTeaser />
      <ValueComparison />
      <ServicesPreview />
      <AILayerSection />
      <ProcessSection />
      <ResultsSection />
      <LeadMagnet />
      <Contact />
    </div>
  );
}

function EntityDefinition() {
  return null;
}

interface Testimonial {
  quote: string;
  name: string;
  title: string;
  company: string;
  companyUrl: string | null;
  metric: string;
  sector: string;
}

function SocialProof() {
  // VERIFIED: All testimonials provided directly by Dan, April 2026
  const testimonials: Testimonial[] = [
    {
      // VERIFIED: Gemma Pountney / Xshowhome — in portfolio, catalogue health project
      quote: 'The scale of what Dan uncovered in our product catalogue was genuinely shocking. Thousands of product records with the wrong information, taxonomy misclassifications we\u2019d never have found ourselves, alt text that had been wrong since day one. He fixed all of it systematically and quickly, and the difference in how our catalogue looks and performs has been significant. He\u2019s meticulous in a way that\u2019s hard to find.',
      name: 'Gemma Pountney',
      title: '',
      company: 'Xshowhome',
      companyUrl: 'https://xshowhome.com',
      metric: '16,193 product records remediated',
      sector: 'Furniture & Homeware \u00b7 Shopify \u00b7 Warwickshire, UK',
    },
    {
      // VERIFIED: Dr Frankie Harrison / Miracle Moon — automation project
      quote: 'Before working with Dan, our team was spending hours every week doing things manually that should never have been manual. He built out a complete automation system that connected our Shopify store, our email platform, our supplier feeds, everything, and it just works. We saved over 120 hours a month almost immediately. That\u2019s time we\u2019ve reinvested into actually growing the business.',
      name: 'Dr Frankie Harrison',
      title: '',
      company: 'Miracle Moon',
      companyUrl: null,
      metric: '120+ hours per month automated',
      sector: 'Health & Wellness \u00b7 Shopify \u00b7 UK DTC',
    },
    {
      // VERIFIED: Gary Postlethwaite / Saverys of Broadway — fractional director engagement
      quote: 'Dan understands premium brands. He doesn\u2019t push for quick wins that compromise the positioning, he thinks carefully about how digital should work for a business like ours, where trust and relationship are everything. Having someone who can hold the strategic picture while also getting into the detail of how the site and our Google presence actually perform is exactly what we needed.',
      name: 'Gary Postlethwaite',
      title: '',
      company: 'Saverys of Broadway',
      companyUrl: null,
      metric: 'Fractional director across 3 showrooms',
      sector: 'Premium Retail \u00b7 Multi-Location \u00b7 UK',
    },
    {
      // VERIFIED: Luke Aling / Ranch Creative — white-label partner
      quote: 'Dan is the person we bring in when a client needs serious ecommerce thinking and we need to know it\u2019ll be delivered properly. He works seamlessly as an extension of the Ranch team, the client never feels like they\u2019re dealing with a third party. The quality of the strategy and the execution is consistently high, and he operates with real commercial intelligence, not just technical output.',
      name: 'Luke Aling',
      title: '',
      company: 'Ranch Creative',
      companyUrl: null,
      metric: '\u00a3250k monthly revenue within 6 months',
      sector: 'Agency Partner \u00b7 Home & Interiors \u00b7 UK',
    },
    {
      // VERIFIED: Kim Waller / Licklibrary — Ranch Creative client (white label)
      quote: 'We\u2019d been sitting on a wealth of data and had no idea what it was telling us. Dan came in, got into the analytics properly, and gave us a clear picture of where we were losing people and why. The recommendations were practical and prioritised, not a wishlist. We finally understood our users, and the improvements we made off the back of his work had a real impact on how the site performed.',
      name: 'Kim Waller',
      title: '',
      company: 'Licklibrary',
      companyUrl: null,
      metric: 'Analytics-driven site improvements',
      sector: 'Music Education \u00b7 Digital \u00b7 UK',
    },
  ];

  return (
    <section className="py-16 bg-brand-dark border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-2">What Partners Say</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.slice(0, 3).map((t, i) => (
            <div key={i} className="bg-brand-surface rounded-2xl p-6 border border-brand-border relative">
              <Quote size={20} className="text-brand-primary/30 mb-3" />
              <p className="text-brand-text text-sm leading-relaxed mb-4 font-light italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="pt-4 border-t border-white/5">
                <div className="text-white font-semibold text-sm">
                  {t.name}{t.title ? ` \u2014 ${t.title}` : ''}
                </div>
                <div className="text-sm text-brand-muted mt-1">
                  {t.companyUrl ? (
                    <a href={t.companyUrl} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:text-brand-accent transition-colors">{t.company}</a>
                  ) : (
                    t.company
                  )}
                </div>
                <div className="inline-block px-3 py-1 mt-3 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded-full">{t.metric}</div>
                <div className="text-brand-muted/60 text-xs mt-2">{t.sector}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto mt-6">
          {testimonials.slice(3).map((t, i) => (
            <div key={i + 3} className="bg-brand-surface rounded-2xl p-6 border border-brand-border relative">
              <Quote size={20} className="text-brand-primary/30 mb-3" />
              <p className="text-brand-text text-sm leading-relaxed mb-4 font-light italic">&ldquo;{t.quote}&rdquo;</p>
              <div className="pt-4 border-t border-white/5">
                <div className="text-white font-semibold text-sm">
                  {t.name}{t.title ? ` \u2014 ${t.title}` : ''}
                </div>
                <div className="text-sm text-brand-muted mt-1">{t.company}</div>
                <div className="inline-block px-3 py-1 mt-3 bg-brand-primary/10 text-brand-primary text-xs font-medium rounded-full">{t.metric}</div>
                <div className="text-brand-muted/60 text-xs mt-2">{t.sector}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DirectorTeaser() {
  return (
    <section className="py-24 bg-brand-surface relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-brand-primary/30 to-transparent"></div>
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/3 flex justify-center">
            <div className="relative w-52 h-52 rounded-2xl overflow-hidden border-2 border-brand-primary/20 shadow-[0_0_40px_rgba(74,222,128,0.1)]">
              <Image src="/dan-le-gresley-speaker-fractional-ecommerce-director-shopify.png" alt="Dan Le Gresley — Fractional Ecommerce Director based in Atherstone, Warwickshire" width={208} height={208} className="w-full h-full object-cover object-top" />
            </div>
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-brand-primary/30 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase tracking-widest">The Director</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Meet Dan Le Gresley.</h2>
            <div className="text-brand-muted text-lg leading-relaxed mb-6 space-y-4">
              <p>20 years in ecommerce and digital, working across both ends of the market. Blue chip clients including GSK, Amazon, Ecolab, Eli Lilly, and The Economist. DTC brands like Onbord, My Expert Midwife, and Electrocore. The through-line is always the same: make the commercial side of digital actually work.</p>
              <p>Now I take on three partners at a time and work as their embedded fractional director. I own the strategy, write the code, run the ads, and ship the automations. One person. One invoice. Everything connected.</p>
            </div>
            <div className="flex flex-col gap-3 justify-center md:justify-start mb-8">
              {[
                { tag: 'Shopify Plus Partner', proof: 'Building on Shopify since 2014. From Dawn theme edits to headless architectures.' },
                { tag: 'Google Ads Certified', proof: 'ROAS-focused campaigns across Google Shopping, Search, and Performance Max.' },
                { tag: 'Klaviyo Expert', proof: 'Built flows generating £115k+ in incremental email revenue across partner accounts.' },
                { tag: 'n8n Automation', proof: 'Custom workflow automation — 120+ hours/month saved across active partners.' },
              ].map((item) => (
                <div key={item.tag} className="flex flex-col">
                  <span className="px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs rounded-full font-mono inline-block w-fit">{item.tag}</span>
                  <span className="text-brand-muted/70 text-xs mt-1 ml-1">{item.proof}</span>
                </div>
              ))}
            </div>
            <Link href="/about" className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-accent font-medium transition-colors">
              Full background <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueComparison() {
  const cols = [
    {
      label: 'Traditional Agency',
      highlight: false,
      items: ['Junior AM as day-to-day contact', 'Senior talent sold, juniors deliver', 'Work split across 20+ clients', '£5k–£10k/mo for fractured output', 'No P&L ownership', 'Long onboarding, slow iterations'],
    },
    {
      label: 'Atherstone Digital',
      highlight: true,
      items: [`Direct access to Dan (Founder)`, 'One senior expert, every task', `Max ${siteConfig.capacity.total} partners at a time`, `From ${siteConfig.pricing.retainerFrom}/mo. Full stack.`, 'Full P&L accountability', 'Week 1 execution, weekly sprints'],
    },
    {
      label: 'Full-Time Director',
      highlight: false,
      items: ['~£100k/year all-in cost', 'Recruitment risk & notice periods', 'One set of skills', 'Benefits, desk, equipment overhead', 'Limited tool stack bandwidth', 'Slow to hire, slow to exit'],
    },
  ];

  return (
    <section id="value" className="py-24 bg-brand-dark scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">Why Fractional Wins.</h2>
          <p className="text-brand-muted text-xl max-w-2xl mx-auto">Compare the real cost of your options.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cols.map((col) => (
            <div key={col.label} className={`rounded-2xl p-8 border relative ${col.highlight ? 'bg-brand-surfaceHighlight border-brand-primary/40 shadow-[0_0_40px_rgba(74,222,128,0.1)]' : 'bg-brand-surface border-white/5'}`}>
              <h3 className={`font-display text-lg font-bold mb-6 ${col.highlight ? 'text-brand-primary' : 'text-white'}`}>{col.label}</h3>
              <ul className="space-y-3">
                {col.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle size={14} className={`mt-0.5 shrink-0 ${col.highlight ? 'text-brand-primary' : 'text-brand-muted/40'}`} />
                    <span className={col.highlight ? 'text-brand-text' : 'text-brand-muted'}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/why-fractional" className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-accent font-medium transition-colors">
            See the full cost breakdown <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServicesPreview() {
  const pillars = [
    {
      title: 'Grow the revenue',
      sub: 'CRO, Paid Media, Lifecycle',
      body: 'The work that turns traffic into revenue and customers into repeat buyers.',
      pillar: 'grow' as const,
    },
    {
      title: 'Run the operation',
      sub: 'Automation, Feed, Catalogue',
      body: 'The unglamorous ops work that silently costs you revenue when it goes wrong.',
      pillar: 'run' as const,
    },
    {
      title: 'Build the tech',
      sub: 'Store, Custom, AI-Ready',
      body: 'The technical foundation your growth sits on top of.',
      pillar: 'build' as const,
    },
  ];

  return (
    <section className="py-24 bg-brand-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">The Force Multiplier Stack.</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {pillars.map((p) => {
            const services = SERVICES_DATA.filter((s) => s.pillar === p.pillar);
            return (
              <Link
                key={p.pillar}
                href={`/services?pillar=${p.pillar}`}
                className="group p-8 bg-brand-dark rounded-2xl border border-brand-border hover:border-brand-primary/30 hover:shadow-[0_0_20px_rgba(74,222,128,0.05)] transition-all duration-300"
              >
                <div className="text-xs font-mono text-brand-primary uppercase tracking-wider mb-3">{p.sub}</div>
                <h3 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors">{p.title}</h3>
                <p className="text-brand-muted text-sm leading-relaxed mb-6">{p.body}</p>
                <ul className="space-y-2 text-sm text-brand-muted/70">
                  {services.map((s) => (
                    <li key={s.id} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-brand-primary shrink-0" />
                      {s.title}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 flex items-center gap-1 text-brand-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View services <ArrowRight size={12} />
                </div>
              </Link>
            );
          })}
        </div>
        <div className="text-center mt-10">
          <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-brand-accent transition-colors shadow-[0_0_20px_rgba(74,222,128,0.2)]">
            View All Services <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function AILayerSection() {
  return (
    <section className="py-24 bg-brand-dark relative overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, rgba(74,222,128,0.3) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-3">What AI-Augmented Actually Means</div>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6">The AI agents do the grunt work.</h2>
        </div>

        <div className="max-w-3xl mx-auto mb-12 space-y-4 text-brand-muted text-lg leading-relaxed">
          <p>
            Most fractional directors bill you for time spent pulling data, writing product descriptions, and chasing catalogue errors. I don&apos;t. A stack of agents running on n8n handles the work that used to justify a junior team.
          </p>
          <p>
            That&apos;s what makes the economics work. You get senior strategy and execution at a fraction of director cost because the AI layer absorbs the grunt work.
          </p>
        </div>

        <MondayDigestPreview />

        <div className="max-w-3xl mx-auto mt-12 space-y-4">
          {[
            { label: 'Data', desc: 'Catalogue errors, alt text gaps, and pricing inconsistencies flagged automatically across your entire Shopify.' },
            { label: 'Content', desc: 'On-brand product descriptions and feed titles generated at scale, reviewed before publishing.' },
            { label: 'Reporting', desc: 'Weekly digest in your inbox every Monday. No dashboards to maintain.' },
          ].map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <span className="text-brand-primary font-mono text-xs font-bold mt-1 shrink-0 w-20">{item.label}</span>
              <p className="text-brand-muted text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProcessSection() {
  const steps = [
    { num: '01', title: 'Audit & Onboarding', desc: 'Week 1: Full tech stack audit, analytics review, and commercial baseline. We find the quick wins and the structural problems.' },
    { num: '02', title: 'Sprint Planning', desc: 'We agree a 90-day roadmap with weekly sprint priorities. Everything is tracked. Nothing gets lost in email threads.' },
    { num: '03', title: 'Execution', desc: 'I build, test, and launch. Whether that\'s a new Shopify flow, a paid media campaign, or an n8n automation — I do the work.' },
    { num: '04', title: 'Measure & Iterate', desc: 'Weekly performance reviews. Monthly commercial reports. Quarterly strategy sessions. The feedback loop never stops.' },
  ];

  return (
    <section id="process" className="py-24 bg-brand-dark scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">How It Works.</h2>
          <p className="text-brand-muted text-xl max-w-2xl mx-auto">No lengthy SOWs. No agency politics. Just a senior operator embedded in your business from week one.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step) => (
            <div key={step.num} className="relative">
              <div className="text-5xl font-display font-bold text-brand-primary/20 mb-4">{step.num}</div>
              <h3 className="font-display font-bold text-white text-xl mb-3">{step.title}</h3>
              <p className="text-brand-muted text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ResultsSection() {
  const stats = [
    { icon: TrendingUp, value: '£250k', label: 'Monthly Revenue in 6 Months', sub: 'Ranch Creative partnership, home and interiors brand' },
    { icon: Users, value: '16,193', label: 'Product Records Remediated', sub: 'Xshowhome, full catalogue health audit and taxonomy rebuild' },
    { icon: Zap, value: '120+', label: 'Hours Per Month Automated', sub: 'Miracle Moon, 14 n8n workflows across 4 connected systems' },
    { icon: BarChart2, value: '2.9%', label: 'Store Conversion Rate', sub: 'Site rebuild and CRO programme, Ranch Creative client' },
  ];

  return (
    <section id="results" className="py-24 bg-brand-surface scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">The Numbers.</h2>
          <p className="text-brand-muted text-xl max-w-2xl mx-auto">Real commercial outcomes from real partnerships.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto mb-12">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-8 bg-brand-dark rounded-2xl border border-brand-border">
              <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center mx-auto mb-4">
                <stat.icon size={24} className="text-brand-primary" />
              </div>
              <div className="font-display text-5xl font-bold text-brand-primary mb-2">{stat.value}</div>
              <div className="font-medium text-white mb-1">{stat.label}</div>
              <div className="text-xs text-brand-muted">{stat.sub}</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link href="/results" className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-accent font-medium transition-colors">
            View case studies <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
