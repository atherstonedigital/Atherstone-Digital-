'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, AlertTriangle, Clock, Target, BarChart3, HelpCircle, ChevronDown } from 'lucide-react';
import { Contact } from '@/components/Contact';

const faqs = [
  { q: 'Is the retainer fixed?', a: 'It is fixed monthly based on the scope we agree. No surprise hourly billing. If the scope needs to change (e.g. launching a new country), we discuss a new tier.' },
  { q: "What does 'from £3,000/month' mean?", a: 'This is the starting point for a standard single-store Shopify brand. Complex setups (Headless, Multi-store, heavy custom app logic) require more time and start higher.' },
  { q: 'How many hours do we get?', a: "I don't sell hours; I sell outcomes and availability. Some weeks I might work 15 hours on a migration; others 5 hours on monitoring. The value is in the result, not the timesheet." },
  { q: 'Do you run our ads?', a: "Yes. I lead the strategy and execution. For specific channel expertise or high-volume creative production, I bring in my select team of fractional experts. You get agency-level output with a single point of accountability." },
  { q: 'Do you do development work?', a: "Yes. I am a Full Stack Developer. I handle theme edits, script implementation, and n8n automations personally. For massive projects (e.g. full redesigns), I may bring in a partner dev, but I write code daily." },
  { q: 'Can you work with our existing agency?', a: "Yes, though I often replace them to improve efficiency. If you have a creative agency you love, I can manage them. If you want me to take over media buying, I can do that too." },
  { q: 'How quickly will we see results?', a: "We typically find technical 'quick wins' (speed, tracking, UX bugs) in the first 10 days. Revenue impact usually trends up by Month 2-3 as optimisations compound." },
  { q: 'What access do you need?', a: "Shopify Admin (Collaborator), GA4, Google Ads, Meta Ads, Klaviyo, and Search Console. I sign an NDA before we start." },
  { q: 'What if we are not on Shopify?', a: "I specialise exclusively in Shopify and Shopify Plus to maintain deep expertise. I do not work with Magento, WooCommerce, or BigCommerce." },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-border last:border-0">
      <button onClick={() => setOpen(!open)} className="w-full py-6 flex items-center justify-between text-left focus:outline-none group">
        <span className={`font-medium text-lg ${open ? 'text-brand-primary' : 'text-white'} group-hover:text-brand-primary transition-colors`}>{question}</span>
        <ChevronDown className={`text-brand-muted transition-transform duration-300 ${open ? 'rotate-180 text-brand-primary' : ''}`} size={20} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-brand-muted leading-relaxed text-sm md:text-base pr-8">{answer}</p>
      </div>
    </div>
  );
}

export default function FractionalDirectorPage() {
  return (
    <div className="pt-36 pb-20 bg-brand-dark min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Service',
        serviceType: 'Fractional Ecommerce Director',
        provider: { '@type': 'Organization', name: 'Atherstone Digital', url: 'https://atherstonedigital.com' },
        description: 'Senior operational leadership for Shopify brands. We replace the need for a full-time Head of Ecommerce.',
        url: 'https://atherstonedigital.com/fractional-ecommerce-director',
        offers: { '@type': 'Offer', price: '3000', priceCurrency: 'GBP', description: 'Monthly retainers starting from £3,000/month depending on complexity.' },
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
            Senior operational leadership for brands doing £50k–£500k/mo. <br />Stop guessing. Start executing.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-brand-text mb-10">
            {['Hands-on Execution', 'Weekly Strategy', 'No Long Contracts'].map((tag) => (
              <span key={tag} className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <CheckCircle size={14} className="text-brand-primary" /> {tag}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Link href="/#contact" className="px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,220,130,0.4)] transition-all hover:bg-brand-accent min-w-[200px] text-center">
              Book a 20-min Fit Call
            </Link>
            <Link href="/#contact" className="px-8 py-4 bg-transparent border border-brand-border text-white font-medium rounded-lg hover:bg-white/5 transition-all min-w-[200px] text-center">
              Request a Quick Teardown
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
              {['Founders doing £50k–£500k/mo revenue.', 'Brands on Shopify or Shopify Plus.', 'Teams frustrated with "hands-off" agencies.', 'Owners who want to focus on product/brand, not tech.'].map((item) => (
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

      {/* FAQ */}
      <section className="container mx-auto px-6 mb-24">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-display font-bold text-white mb-10 text-center">Common Questions</h2>
          <div className="bg-brand-surface rounded-2xl p-6 border border-brand-border">
            {faqs.map((faq) => (
              <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="container mx-auto px-6 mb-16">
        <div className="bg-gradient-to-br from-brand-surfaceHighlight to-brand-dark border border-brand-border rounded-3xl p-12 text-center relative overflow-hidden max-w-4xl mx-auto">
          <div className="absolute inset-0 bg-brand-primary/5 pointer-events-none"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">Take control of your growth.</h2>
            <p className="text-brand-muted text-lg mb-4">One senior partner. Weekly execution. Clear pricing.</p>
            <p className="text-brand-primary font-bold text-xl mb-8">Retainers from £3,000 / month</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#contact" className="px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,220,130,0.4)] transition-all hover:bg-brand-accent min-w-[200px] text-center">
                Book a 20-min Fit Call
              </Link>
              <Link href="/#contact" className="px-8 py-4 bg-brand-surface border border-brand-border text-white font-medium rounded-lg hover:bg-white/5 transition-all min-w-[200px] text-center">
                Request a Quick Teardown
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Contact />
    </div>
  );
}
