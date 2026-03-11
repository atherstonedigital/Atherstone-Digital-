import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, TrendingUp, BarChart3, PieChart, LineChart } from 'lucide-react';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Shopify Ecommerce Results & Case Studies',
  description: 'Real results from real Shopify partnerships. +47% YoY revenue, +22% CVR, 100+ hours saved. See case studies.',
  alternates: {
    canonical: 'https://atherstonedigital.com/results/',
  },
  openGraph: {
    title: 'Shopify Ecommerce Results & Case Studies | Atherstone Digital',
    description: 'Real results from real Shopify partnerships. +47% YoY revenue, +22% CVR, 100+ hours saved. See case studies.',
    url: 'https://atherstonedigital.com/results/',
    type: 'website',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Ecommerce Growth Results & Case Studies',
  description: 'Real commercial results from real partners. See how the fractional model drives +47% YoY revenue growth, +22% conversion rate, and +115% email revenue for Shopify brands.',
  url: 'https://atherstonedigital.com/results/',
};

const stats = [
  { value: '+47%', label: 'YoY Revenue Growth', sublabel: 'UK Fashion Brand, 12 months' },
  { value: '+22%', label: 'Conversion Rate', sublabel: 'Post-UX overhaul, 90 days' },
  { value: '+115%', label: 'Email Revenue', sublabel: 'Klaviyo flows rebuilt' },
  { value: '-40%', label: 'Agency Cost Savings', sublabel: 'Replacing 2 agencies' },
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
];

export default function ResultsPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
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

        {/* Case study terminal */}
        <section className="container mx-auto px-6 mb-24">
          <div className="relative bg-[#05110d] border border-white/10 rounded-3xl overflow-hidden max-w-5xl mx-auto shadow-2xl">
            <div className="bg-white/5 border-b border-white/5 px-6 py-3 flex items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
              </div>
              <div className="text-xs font-mono text-brand-muted uppercase tracking-widest">CASE_STUDY_004.JSON</div>
            </div>
            <div className="p-8 md:p-12 grid lg:grid-cols-2 gap-12">
              <div className="space-y-6 text-brand-muted">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-brand-primary/30 rounded-full bg-brand-primary/5">
                    <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">Client: UK Fashion Brand</span>
                  </div>
                  <h2 className="text-3xl font-display font-bold text-white mb-4">From Stagnation to <br /><span className="text-brand-primary">+47% YoY Growth</span></h2>
                </div>
                <div>
                  <strong className="text-white block mb-2 font-display">The Challenge</strong>
                  <p className="text-sm">A £2M GMV apparel brand was stuck. Their agency was burning £5k/mo on management fees with generic results. Ads were breaking even, and email flows were untouched.</p>
                </div>
                <div>
                  <strong className="text-white block mb-2 font-display">The Fix</strong>
                  <p className="text-sm">I replaced the agency. We audited the stack, implemented 12 automated Klaviyo flows, and rebuilt the product page UX. We then used n8n to sync inventory data to Google Shopping in real-time.</p>
                </div>
              </div>
              <div className="bg-black/40 border border-white/5 rounded-2xl p-6 flex flex-col justify-center">
                <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                  <span className="text-white font-medium font-display">Performance Report</span>
                  <span className="text-brand-primary font-mono text-xs bg-brand-primary/10 px-2 py-1 rounded">90 DAY IMPACT</span>
                </div>
                <div className="space-y-6">
                  {[
                    { label: 'Conversion Rate', value: '+22%', width: '75%', color: 'bg-brand-primary' },
                    { label: 'Email Revenue', value: '+115%', width: '90%', color: 'bg-brand-accent' },
                    { label: 'Cost Savings', value: '-40%', width: '60%', color: 'bg-blue-400' },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-brand-muted text-sm">{item.label}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-32 h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className={`h-full ${item.color}`} style={{ width: item.width }}></div>
                        </div>
                        <span className="text-white font-bold font-mono">{item.value}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Measurement framework */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">Measurement Framework</h2>
            <div className="grid md:grid-cols-2 gap-8">
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
              <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,220,130,0.4)] transition-all transform hover:-translate-y-1 hover:bg-brand-accent">
                Apply for the Waitlist <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        <Contact />
      </div>
    </>
  );
}
