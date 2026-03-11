import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Brain, Workflow, Database, Bot, Layers } from 'lucide-react';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'The Force Multiplier Model: Human Strategy + AI Execution',
  description: 'How Atherstone Digital combines Human Commercial Strategy with Autonomous AI Agents and n8n workflows to deliver 10x output for UK ecommerce brands.',
  alternates: {
    canonical: 'https://atherstonedigital.com/the-model/',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'The Force Multiplier Operating System: Human Strategy + AI Execution',
  description: 'How to achieve 10x output with 1x headcount by combining a Fractional Director with autonomous AI agents.',
  url: 'https://atherstonedigital.com/the-model/',
  author: { '@type': 'Person', name: 'Dan Le Gresley' },
  publisher: { '@type': 'Organization', name: 'Atherstone Digital' },
};

const steps = [
  { num: '01', title: 'Audit & Onboarding', desc: 'Week 1: Full tech stack audit, analytics review, and commercial baseline. We find the quick wins and the structural problems simultaneously.' },
  { num: '02', title: 'Sprint Planning', desc: 'We agree a 90-day roadmap with weekly sprint priorities. Everything is tracked in a shared workspace. Nothing gets lost in email threads.' },
  { num: '03', title: 'Execution', desc: 'I build, test, and launch. Whether that\'s a new Shopify flow, a paid media campaign, or an n8n automation — I do the work, not an account manager.' },
  { num: '04', title: 'Measure & Iterate', desc: 'Weekly performance reviews. Monthly commercial reports. Quarterly strategy sessions. The feedback loop never stops compounding.' },
];

export default function TheModelPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
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
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-brand-primary/30 rounded-full bg-brand-primary/5">
              <span className="text-brand-primary text-xs font-mono uppercase tracking-widest font-bold">Strategy + Automation</span>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              The Force Multiplier <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Operating System.</span>
            </h1>
            <p className="text-xl text-brand-muted max-w-3xl mx-auto leading-relaxed">
              A hybrid workflow where <span className="text-white font-medium">Human Strategy</span> defines the direction, and <span className="text-white font-medium">AI Agents</span> handle the heavy lifting. This is how I achieve 10x output with 1x headcount.
            </p>
          </div>
        </section>

        {/* Process steps */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-white mb-12 text-center">How It Works in Practice</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        {/* Two columns: Human vs AI */}
        <section className="container mx-auto px-6 mb-24">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-stretch max-w-5xl mx-auto">

            <div className="relative group bg-brand-surface/40 border border-white/5 rounded-3xl p-8 lg:p-10 hover:bg-brand-surface/60 transition-colors">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary/50 to-transparent rounded-t-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center text-brand-primary border border-brand-primary/20 shadow-[0_0_20px_rgba(0,220,130,0.15)]">
                  <Brain size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-white">The Human Role</h2>
                  <p className="text-brand-muted text-sm font-mono uppercase tracking-wide">Direction & Intuition</p>
                </div>
              </div>
              <p className="text-brand-muted text-lg leading-relaxed mb-8">
                AI is powerful, but it cannot replace <strong className="text-white">Commercial Intuition</strong>. My role is to act as your Fractional C-Suite partner — sitting in your leadership meetings, auditing your P&L, and making the high-stakes decisions that algorithms can&apos;t.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Layers, title: 'Brand Positioning', desc: 'Defining how you win in a crowded market. AI can write copy, but it can\'t define the soul of the brand.' },
                  { icon: Layers, title: 'Risk Management', desc: 'Knowing when to double down on ad spend and when to pull back based on macro-economic signals.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <item.icon className="text-brand-primary mt-1 shrink-0" size={24} />
                    <div>
                      <strong className="text-white block text-lg mb-1">{item.title}</strong>
                      <span className="text-sm text-brand-muted">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative group bg-brand-surface/40 border border-white/5 rounded-3xl p-8 lg:p-10 hover:bg-brand-surface/60 transition-colors">
              <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-l from-brand-accent/50 to-transparent rounded-t-3xl opacity-50 group-hover:opacity-100 transition-opacity"></div>
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-brand-accent/10 rounded-2xl flex items-center justify-center text-brand-accent border border-brand-accent/20 shadow-[0_0_20px_rgba(204,240,120,0.15)]">
                  <Bot size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-display font-bold text-white">The AI Agents</h2>
                  <p className="text-brand-muted text-sm font-mono uppercase tracking-wide">Execution & Scale</p>
                </div>
              </div>
              <p className="text-brand-muted text-lg leading-relaxed mb-8">
                While I set the strategy, my fleet of custom <strong className="text-white">n8n Workflows</strong> and <strong className="text-white">LLM Agents</strong> execute the tactical work 24/7 — eliminating human error and busy work entirely.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Workflow, title: 'The Analyst Agent', desc: 'Pulls data from GA4, Shopify, and Meta Ads every morning to generate a unified profit report on Slack.' },
                  { icon: Database, title: 'The Merchandiser Agent', desc: 'Automatically tags products, hides out-of-stock variants, and reorders collections based on 7-day sales velocity.' },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                    <item.icon className="text-brand-accent mt-1 shrink-0" size={24} />
                    <div>
                      <strong className="text-white block text-lg mb-1">{item.title}</strong>
                      <span className="text-sm text-brand-muted">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Tech stack visual */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-4xl mx-auto bg-brand-surface border border-brand-border rounded-2xl p-10">
            <h2 className="font-display text-2xl font-bold text-white mb-8 text-center">The Tool Stack</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {['Shopify Plus', 'n8n Workflows', 'Klaviyo', 'Google Ads', 'Meta Ads', 'GA4', 'Hotjar', 'Slack'].map((tool) => (
                <div key={tool} className="text-center p-4 bg-brand-dark rounded-xl border border-brand-border">
                  <div className="text-sm font-medium text-brand-text">{tool}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 mb-16">
          <div className="bg-brand-surfaceHighlight rounded-3xl p-12 text-center border border-brand-border relative overflow-hidden group max-w-4xl mx-auto">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-primary/10 transition-colors duration-700"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">Ready to deploy this system?</h2>
              <p className="text-brand-muted text-lg mb-8">I can audit your current stack and show you exactly where AI agents can replace manual drudgery.</p>
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
