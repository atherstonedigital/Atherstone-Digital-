import { Metadata } from 'next';
import { Hero } from '@/components/Hero';
import { Contact } from '@/components/Contact';
import { LeadMagnet } from '@/components/LeadMagnet';
import { SERVICES_DATA } from '@/lib/data';
import Link from 'next/link';
import { ArrowRight, CheckCircle, TrendingUp, Users, Zap, Quote } from 'lucide-react';

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
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.atherstonedigital.com/favicon-c-bef0ns.svg',
      },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Atherstone',
        addressRegion: 'Warwickshire',
        postalCode: 'CV9',
        addressCountry: 'GB',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+447810838129',
        email: 'info@atherstonedigital.com',
        contactType: 'customer service',
      },
      sameAs: ['https://www.linkedin.com/in/danlegresley/'],
      description: 'Fractional Ecommerce Director for Shopify brands doing £500k–£5M. Senior strategy, development, CRO and growth execution. Based in Atherstone, Warwickshire.',
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        reviewCount: '3',
        bestRating: '5',
      },
      review: [
        {
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Founder, UK Apparel Brand' },
          reviewBody: 'Dan brought clarity to our chaos. We finally have a roadmap that connects our ads to our inventory to our bottom line.',
        },
        {
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Managing Director, DTC Homeware Brand' },
          reviewBody: 'We replaced two agencies with Dan. One person, more output, less politics. Revenue is up 47% year-on-year.',
        },
        {
          '@type': 'Review',
          reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
          author: { '@type': 'Person', name: 'Operations Lead, Health & Wellness Brand' },
          reviewBody: 'The n8n automations alone saved us 25 hours a week. Dan thinks in systems, not just campaigns.',
        },
      ],
    },
    {
      '@type': 'Person',
      '@id': 'https://www.atherstonedigital.com/#dan',
      name: 'Dan Le Gresley',
      jobTitle: 'Fractional Ecommerce Director',
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

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageSchema) }} />
      <Hero />
      <SocialProof />
      <DirectorTeaser />
      <ValueComparison />
      <ServicesPreview />
      <ProcessSection />
      <ResultsSection />
      <LeadMagnet />
      <Contact />
    </div>
  );
}

function SocialProof() {
  const testimonials = [
    { quote: 'Dan brought clarity to our chaos. We finally have a roadmap that connects our ads to our inventory to our bottom line.', result: '+22% conversion rate in 90 days', who: 'Founder, UK Apparel Brand (Shopify Plus)' },
    { quote: 'We replaced two agencies with Dan. One person, more output, less politics. Revenue is up 47% year-on-year.', result: '+47% YoY revenue growth', who: 'Managing Director, DTC Homeware Brand' },
    { quote: 'The n8n automations alone saved us 25 hours a week. Dan thinks in systems, not just campaigns.', result: '100+ hours saved per month', who: 'Operations Lead, Health & Wellness Brand' },
  ];

  return (
    <section className="py-16 bg-brand-dark border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="text-center mb-10">
          <p className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-2">Trusted by Shopify Brands Doing £500k–£5M</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-brand-surface rounded-2xl p-6 border border-brand-border relative">
              <Quote size={20} className="text-brand-primary/30 mb-3" />
              <p className="text-brand-text text-sm leading-relaxed mb-4">&ldquo;{t.quote}&rdquo;</p>
              <div className="pt-4 border-t border-white/5">
                <div className="text-brand-primary font-bold text-sm mb-1">{t.result}</div>
                <div className="text-brand-muted text-xs">{t.who}</div>
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
            <div className="relative w-52 h-52 rounded-2xl overflow-hidden border-2 border-brand-primary/20 shadow-[0_0_40px_rgba(0,220,130,0.1)]">
              <img src="/dan-le-gresley-speaker-fractional-ecommerce-director-shopify.png" alt="Dan Le Gresley — Fractional Ecommerce Director based in Atherstone, Warwickshire" width={208} height={208} loading="lazy" decoding="async" className="w-full h-full object-cover object-top" />
            </div>
          </div>
          <div className="md:w-2/3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-brand-primary/30 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase tracking-widest">The Director</div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">Meet Dan Le Gresley.</h2>
            <p className="text-brand-muted text-lg leading-relaxed mb-6">
              15+ years scaling ecommerce brands. Former Head of Ecommerce at a UK £50M retailer. Now I take on 3 partners at a time and operate as their fractional director — owning the strategy, the tools, and the execution.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-8">
              {['Shopify Plus Partner', 'Google Ads Certified', 'Klaviyo Expert', 'n8n Automation'].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs rounded-full font-mono">{tag}</span>
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
      items: ['Direct access to Dan (Founder)', 'One senior expert, every task', 'Max 3 partners at a time', 'From £3,000/mo. Full stack.', 'Full P&L accountability', 'Week 1 execution, weekly sprints'],
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
          <p className="text-brand-muted text-xl max-w-2xl mx-auto">Compare the real cost of your options. The maths is uncomfortable for agencies.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cols.map((col) => (
            <div key={col.label} className={`rounded-2xl p-8 border relative ${col.highlight ? 'bg-brand-surfaceHighlight border-brand-primary/40 shadow-[0_0_40px_rgba(0,220,130,0.1)]' : 'bg-brand-surface border-white/5'}`}>
              {col.highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-brand-primary text-brand-dark text-xs font-bold rounded-full">BEST VALUE</div>}
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
  return (
    <section className="py-24 bg-brand-surface">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">The Force Multiplier Stack.</h2>
          <p className="text-brand-muted text-xl max-w-2xl mx-auto">Everything a £100k/year ecommerce director would own. Delivered fractionally.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
          {SERVICES_DATA.map((service) => (
            <Link key={service.id} href={`/services/${service.slug}`}
              className="group p-6 bg-brand-dark rounded-2xl border border-brand-border hover:border-brand-primary/30 hover:shadow-[0_0_20px_rgba(0,220,130,0.05)] transition-all duration-300">
              <div className="text-xs font-mono text-brand-primary uppercase tracking-wider mb-3">{service.outcome}</div>
              <h3 className="font-display font-bold text-white mb-2 group-hover:text-brand-primary transition-colors">{service.title}</h3>
              <p className="text-sm text-brand-muted leading-relaxed">{service.description}</p>
              <div className="mt-4 flex items-center gap-1 text-brand-primary text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                Learn more <ArrowRight size={12} />
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link href="/services" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-brand-accent transition-colors shadow-[0_0_20px_rgba(0,220,130,0.2)]">
            View All Services <ArrowRight size={18} />
          </Link>
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
    { icon: TrendingUp, value: '+47%', label: 'Average YoY Revenue Growth', sub: 'Across active partners, last 12 months' },
    { icon: Users, value: '+22%', label: 'Average CVR Improvement', sub: 'From CRO programme, first 90 days' },
    { icon: Zap, value: '100+', label: 'Hours Saved Per Month', sub: 'Via n8n automation workflows' },
  ];

  return (
    <section id="results" className="py-24 bg-brand-surface scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">The Numbers.</h2>
          <p className="text-brand-muted text-xl max-w-2xl mx-auto">Real commercial outcomes from real partnerships.</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
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
