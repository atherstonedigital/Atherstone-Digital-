import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, CheckCircle, AlertTriangle, Clock, Target, BarChart3, HelpCircle } from 'lucide-react';
import { Contact } from '@/components/Contact';
import { FAQAccordion } from '@/components/FAQAccordion';

export const metadata: Metadata = {
  title: 'Fractional Ecommerce Director for Shopify | Atherstone Digital',
  description: 'Senior operational leadership for Shopify brands doing £500k–£5M. Strategy, development, and growth — one senior partner, from £3,000/month.',
  alternates: {
    canonical: 'https://www.atherstonedigital.com/fractional-ecommerce-director',
  },
  openGraph: {
    title: 'Fractional Ecommerce Director for Shopify | Atherstone Digital',
    description: 'Senior operational leadership for Shopify brands doing £500k–£5M. Strategy, development, and growth — one senior partner, from £3,000/month.',
    url: 'https://www.atherstonedigital.com/fractional-ecommerce-director',
    type: 'website',
  },
};

export default function FractionalDirectorPage() {
  return (
    <div className="pt-36 pb-20 bg-brand-dark min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Fractional Ecommerce Director',
        provider: { '@type': 'Organization', name: 'Atherstone Digital', url: 'https://www.atherstonedigital.com' },
        description: 'Senior operational leadership for Shopify brands. We replace the need for a full-time Head of Ecommerce.',
        url: 'https://www.atherstonedigital.com/fractional-ecommerce-director',
        offers: { '@type': 'Offer', price: '3000', priceCurrency: 'GBP', description: 'Monthly retainers starting from £3,000/month depending on complexity.' },
      }) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What does a Fractional Ecommerce Director do?',
            acceptedAnswer: { '@type': 'Answer', text: 'A Fractional Ecommerce Director provides senior-level ecommerce leadership — strategy, execution, and technical oversight — on a part-time or retainer basis. Unlike an agency, they own the P&L and work directly on your business. Unlike a consultant, they actually execute the work.' },
          },
          {
            '@type': 'Question',
            name: 'How much does a Fractional Ecommerce Director cost in the UK?',
            acceptedAnswer: { '@type': 'Answer', text: 'Fractional Ecommerce Director retainers typically start from £3,000 per month in the UK. This compares to £85,000–£120,000 per year for a full-time hire, or £5,000–£10,000 per month for a traditional agency. Atherstone Digital retainers start from £3,000/month on a rolling monthly contract.' },
          },
          {
            '@type': 'Question',
            name: 'How quickly will we see results?',
            acceptedAnswer: { '@type': 'Answer', text: 'Technical quick wins — fixing tracking, site speed, and UX bugs — typically surface within the first 10 days. Revenue impact from CRO and paid media optimisation usually trends upward from Month 2–3 as changes compound.' },
          },
          {
            '@type': 'Question',
            name: 'Do you work with brands outside Shopify?',
            acceptedAnswer: { '@type': 'Answer', text: 'No. Atherstone Digital specialises exclusively in Shopify and Shopify Plus to maintain deep platform expertise. We do not work with Magento, WooCommerce, or BigCommerce.' },
          },
          {
            '@type': 'Question',
            name: 'What size brand is the fractional model right for?',
            acceptedAnswer: { '@type': 'Answer', text: 'The model works best for Shopify brands doing £500,000 to £5,000,000 in annual revenue. Brands in this range are typically too large to manage growth alone, but not yet large enough to justify a full-time senior hire at £100,000+ per year.' },
          },
          {
            '@type': 'Question',
            name: 'Is the retainer a fixed contract?',
            acceptedAnswer: { '@type': 'Answer', text: 'Retainers are fixed monthly based on agreed scope with no surprise hourly billing. Contracts are rolling monthly — pause or cancel with 30 days notice. There are no long-term lock-ins.' },
          },
        ],
      }) }} />

      {/* Hero */}
      <section className="relative px-6 mb-24">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-brand-primary/30 rounded-full bg-brand-primary/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            <span className="text-brand-primary text-xs font-mono uppercase tracking-widest font-bold">Limited Capacity: 2 Slots Available</span>
          </div>
          <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Fractional Ecommerce Director <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">(Shopify)</span>
          </h1>
          <p className="text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed mb-8">
            Senior operational leadership for brands doing £500k–£5M/year revenue. <br />Stop guessing. Start executing.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-brand-text mb-10">
            {['Hands-on Execution', 'Weekly Strategy', 'No Long Contracts'].map((tag) => (
              <span key={tag} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <CheckCircle size={14} className="text-brand-primary" /> {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <a href="https://calendly.com/dan-atherstonedigital/30min" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,220,130,0.4)] transition-all hover:bg-brand-accent min-w-[200px] text-center">
              Book a 20-min Fit Call
            </a>
            <Link href="/#contact" className="px-8 py-4 bg-transparent border border-brand-border text-white font-medium rounded-lg hover:bg-white/5 transition-all min-w-[200px] text-center">
              Complete the Application
            </Link>
          </div>
          <p className="text-sm font-mono text-brand-muted uppercase tracking-wider">
            Retainers from <span className="text-brand-primary font-bold">£3,000/month</span>
          </p>
        </div>
      </section>

      {/* Social proof */}
      <section className="container mx-auto px-6 mb-24">
        <div className="bg-brand-surface/30 border border-white/5 rounded-2xl p-8 max-w-4xl mx-auto text-center">
          <Target size={32} className="text-brand-primary mx-auto mb-4" />
          <p className="text-lg text-white font-medium mb-2">
            &ldquo;Dan brought clarity to our chaos. We finally have a roadmap that connects our ads to our inventory.&rdquo;
          </p>
          <p className="text-sm text-brand-muted">
            Example Outcome: Improved store conversion by 22% through better merchandising and speed optimisation (Apparel Brand, UK).
          </p>
        </div>
      </section>

      {/* Pain points */}
      <section className="container mx-auto px-6 mb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-8 text-center">If this sounds familiar...</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: AlertTriangle, title: 'Fragmented Agencies', desc: "Your PPC agency blames the site. Your dev agency blames the traffic. No one owns the P&L." },
              { icon: Clock, title: 'Unclear Priorities', desc: "You have a backlog of 50 ideas but don't know which one will actually move the needle this month." },
              { icon: BarChart3, title: 'Tracking Confusion', desc: "GA4 says one thing. Shopify says another. You're flying blind on profit margins." },
              { icon: Target, title: 'Leaky Funnel', desc: "Traffic is arriving, but mobile conversion is stuck. You need UX fixes, not just more ad spend." },
            ].map((item) => (
              <div key={item.title} className="bg-brand-surface border border-white/5 p-6 rounded-xl hover:border-red-500/30 transition-colors group">
                <div className="flex items-center gap-3 mb-3">
                  <item.icon className="text-red-500 group-hover:scale-110 transition-transform" size={24} />
                  <h3 className="font-bold text-white">{item.title}</h3>
                </div>
                <p className="text-brand-muted text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Deliverables */}
      <section className="container mx-auto px-6 mb-24">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">The Retainer: What You Get</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { n: '1', title: 'Commercial Strategy', items: ['Weekly 45-min sprint call', 'KPI Scoreboard & Profit tracking', 'Quarterly Roadmap planning'] },
              { n: '2', title: 'CRO & UX', items: ['Landing page optimisation', 'Mobile UX improvements', 'A/B testing (if traffic allows)'] },
              { n: '3', title: 'Paid Media', items: ['Google Shopping & Search', 'Meta Ads strategy', 'Feed optimisation'] },
              { n: '4', title: 'Lifecycle Marketing', items: ['Klaviyo email flows', 'SMS setup', 'Retention strategy'] },
              { n: '5', title: 'Technical Dev', items: ['Shopify theme edits', 'App integrations', 'n8n automation'] },
              { n: '6', title: 'Data & Reporting', items: ['GA4 + Shopify analytics', 'Weekly Slack report', 'Monthly P&L review'] },
            ].map((mod) => (
              <div key={mod.n} className="border-l-2 border-brand-primary pl-6 py-2">
                <h3 className="text-xl font-bold text-white mb-4">{mod.n}. {mod.title}</h3>
                <ul className="space-y-3 text-sm text-brand-muted">
                  {mod.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-primary mt-1.5 shrink-0"></div> {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* First 10 days */}
      <section className="container mx-auto px-6 mb-24">
        <div className="bg-brand-surfaceHighlight rounded-3xl p-8 md:p-12 max-w-4xl mx-auto border border-brand-border">
          <h2 className="text-2xl font-bold text-white mb-6 font-display">First 10 Days: The Audit & Plan</h2>
          <div className="space-y-4">
            {[
              { n: '01', title: 'Access & Audit', desc: "I get into your Shopify, GA4, and Ad accounts. I look for broken tracking, wasted spend, and low-hanging UX fruit." },
              { n: '02', title: 'The Roadmap', desc: 'I present a prioritised list of fixes. We agree on the "Critical Few" tasks for the first month.' },
              { n: '03', title: 'Implementation Begins', desc: "I don't wait for permission slips. I start fixing the obvious technical debt immediately." },
            ].map((step) => (
              <div key={step.n} className="flex gap-4 items-start">
                <div className="bg-brand-dark p-2 rounded-lg text-brand-primary font-bold font-mono shrink-0">{step.n}</div>
                <div>
                  <strong className="text-white block">{step.title}</strong>
                  <p className="text-brand-muted text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 90 day plan */}
      <section className="container mx-auto px-6 mb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Typical 90-Day Plan</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { month: 'Month 1: Stabilise', items: ['Fix tracking/data hygiene', 'Audit ad performance', 'Improve site speed', 'Fix checkout friction'] },
              { month: 'Month 2: Optimise', items: ['Merchandising overhaul', 'Email flow expansion', 'Landing page logic', 'Offer testing'] },
              { month: 'Month 3: Scale', items: ['Aggressive CRO testing', 'Channel expansion', 'Retention strategy', 'Automating ops (n8n)'] },
            ].map((m) => (
              <div key={m.month} className="bg-brand-surface p-6 rounded-2xl border border-white/5">
                <h3 className="text-brand-primary font-bold mb-2">{m.month}</h3>
                <ul className="text-sm text-brand-muted space-y-2">
                  {m.items.map((item) => <li key={item}>• {item}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="container mx-auto px-6 mb-24">
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-brand-surface to-brand-dark border border-brand-primary/30 rounded-3xl p-8 md:p-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 text-center">
            <h2 className="text-4xl font-display font-bold text-white mb-4">Investment</h2>
            <p className="text-2xl text-brand-primary font-bold mb-8">Retainers from £3,000 / month</p>
            <div className="text-left bg-black/20 p-6 rounded-xl border border-white/10 mb-8">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2"><HelpCircle size={16} /> What affects the retainer level?</h4>
              <ul className="space-y-2 text-sm text-brand-muted">
                <li className="flex gap-2">• <strong className="text-white/80">SKU Complexity:</strong> Single product vs 5,000 SKU catalogue.</li>
                <li className="flex gap-2">• <strong className="text-white/80">Channels:</strong> Just UK vs International stores (Multi-currency).</li>
                <li className="flex gap-2">• <strong className="text-white/80">Tech Debt:</strong> Fresh store vs messy legacy code.</li>
                <li className="flex gap-2">• <strong className="text-white/80">Ad Spend Volume:</strong> Higher volume requires more daily management.</li>
              </ul>
            </div>
            <p className="text-sm text-brand-muted mb-8">
              *Most brands fit between £3,000–£5,000/month depending on complexity. <br />
              Rolling monthly contract. Pause or cancel with 30 days notice.
            </p>
            <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-lg hover:bg-brand-accent transition-all w-full md:w-auto justify-center">
              Get a Quote for Your Brand
            </Link>
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="container mx-auto px-6 mb-24">
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><CheckCircle className="text-brand-primary" size={20} /> Who This Is For</h3>
            <ul className="space-y-3 text-brand-muted text-sm">
              {['Founders doing £500k–£5M/year revenue.', 'Brands on Shopify or Shopify Plus.', 'Teams frustrated with "hands-off" agencies.', 'Owners who want to focus on product/brand, not tech.'].map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2"><AlertTriangle className="text-red-500" size={20} /> Who This Is NOT For</h3>
            <ul className="space-y-3 text-brand-muted text-sm">
              {['Dropshippers or pre-revenue startups.', 'Brands not on Shopify (e.g. Magento/Woo).', 'Anyone looking for "guaranteed" hacks.', "Micromanagers who don't trust the process."].map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Revenue segmentation */}
      <section className="container mx-auto px-6 mb-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Where You Are Shapes How We Start</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-brand-surface p-8 rounded-2xl border border-brand-border">
              <div className="text-brand-primary font-bold text-lg mb-1">£500k – £1.5M Revenue</div>
              <div className="text-brand-muted text-sm mb-6">Founder-led, wearing 10 hats</div>
              <ul className="space-y-4 text-sm text-brand-muted">
                <li className="flex gap-2"><span className="text-brand-primary mt-0.5 shrink-0">▸</span>The first priority is usually fixing the data foundation — tracking, feed quality, and product data that&apos;s been neglected while you focused on growth.</li>
                <li className="flex gap-2"><span className="text-brand-primary mt-0.5 shrink-0">▸</span>We move fast on quick wins to prove the model: site speed, checkout friction, a first email flow.</li>
                <li className="flex gap-2"><span className="text-brand-primary mt-0.5 shrink-0">▸</span>Month 3 goal: a machine that works while you sleep.</li>
              </ul>
            </div>
            <div className="bg-brand-surface p-8 rounded-2xl border border-brand-border">
              <div className="text-brand-primary font-bold text-lg mb-1">£1.5M – £5M Revenue</div>
              <div className="text-brand-muted text-sm mb-6">Team in place, agencies frustrating you</div>
              <ul className="space-y-4 text-sm text-brand-muted">
                <li className="flex gap-2"><span className="text-brand-primary mt-0.5 shrink-0">▸</span>The first priority is usually replacing or auditing your existing agency setup — understanding what&apos;s actually working and what&apos;s burning budget.</li>
                <li className="flex gap-2"><span className="text-brand-primary mt-0.5 shrink-0">▸</span>We bring a single point of accountability to a fragmented supplier roster.</li>
                <li className="flex gap-2"><span className="text-brand-primary mt-0.5 shrink-0">▸</span>Month 3 goal: margin improvement, not just revenue growth.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQAccordion />

      {/* Final CTA */}
      <section className="container mx-auto px-6 mb-16">
        <div className="bg-gradient-to-br from-brand-surfaceHighlight to-brand-dark border border-brand-border rounded-3xl p-12 text-center relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-brand-primary/5 pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">Take control of your growth.</h2>
            <p className="text-brand-muted text-lg mb-4">One senior partner. Weekly execution. Clear pricing.</p>
            <p className="text-brand-primary font-bold text-xl mb-8">Retainers from £3,000 / month</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="https://calendly.com/dan-atherstonedigital/30min" target="_blank" rel="noopener noreferrer" className="px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,220,130,0.4)] transition-all hover:bg-brand-accent min-w-[200px] text-center">
                Book a 20-min Fit Call
              </a>
              <Link href="/#contact" className="px-8 py-4 bg-brand-surface border border-brand-border text-white font-medium rounded-lg hover:bg-white/5 transition-all min-w-[200px] text-center">
                Complete the Application
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
