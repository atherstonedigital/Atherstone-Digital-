import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Target, ShieldCheck, Zap, Layers, MapPin } from 'lucide-react';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'About Dan Le Gresley | Fractional Ecommerce Director, Warwickshire',
  description: 'Shopify Plus Architect & Growth Strategist based in Atherstone, Warwickshire. Founder of Atherstone Digital. AI-augmented fractional leadership for UK ecommerce brands.',
  alternates: {
    canonical: 'https://atherstonedigital.com/about/',
  },
};

const schema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  url: 'https://atherstonedigital.com/about/',
  mainEntity: {
    '@type': 'Person',
    name: 'Dan Le Gresley',
    jobTitle: 'Fractional Ecommerce Director',
    description: 'Shopify Plus Architect & Growth Strategist helping brands scale revenue via fractional leadership. Founder of Atherstone Digital, based in Warwickshire.',
    image: 'https://atherstonedigital.com/dan-le-gresley-speaker-fractional-ecommerce-director-shopify.png',
    sameAs: ['https://www.linkedin.com/in/danlegresley/', 'https://atherstonedigital.com'],
    worksFor: { '@type': 'Organization', name: 'Atherstone Digital', url: 'https://atherstonedigital.com' },
    knowsAbout: ['Shopify Plus', 'Ecommerce Strategy', 'n8n Automation', 'Google Ads', 'CRO', 'AI Search Optimization'],
  },
};

const principles = [
  { icon: Target, title: 'ROI Obsessed', desc: "If it doesn't contribute to revenue, profitability, or efficiency, I don't do it. I prioritise impact over \"looking busy\"." },
  { icon: Layers, title: 'Full Stack Context', desc: "A marketer who can't code is limited. A developer who doesn't understand margins is dangerous. I combine both." },
  { icon: ShieldCheck, title: 'Radical Transparency', desc: "I tell you what you need to hear, not what you want to hear. If a tech stack is wrong for you, I'll tell you." },
];

export default function AboutPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="pt-36 pb-20 bg-brand-dark min-h-screen">

        {/* Hero */}
        <section className="relative px-6 mb-24">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto max-w-4xl text-center relative z-10">
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              The Era of the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">AI-Augmented Expert.</span>
            </h1>
            <p className="text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
              I founded Atherstone Digital to prove a hypothesis: A single senior expert, augmented by custom AI agents, can outperform a traditional 10-person agency team.
            </p>
          </div>
        </section>

        {/* Founder section */}
        <section className="container mx-auto px-6 mb-24">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

            {/* Image */}
            <div className="relative group order-2 lg:order-1">
              <div className="absolute inset-0 bg-brand-primary/20 rounded-3xl rotate-6 group-hover:rotate-3 transition-transform duration-500 blur-2xl opacity-60"></div>
              <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl aspect-[4/5] group-hover:scale-[1.02] transition-transform duration-500 bg-brand-surface">
                <img
                  src="/dan-le-gresley-speaker-fractional-ecommerce-director-shopify.png"
                  alt="Dan Le Gresley - Speaker, Shopify Expert & Fractional Ecommerce Director"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="inline-block px-3 py-1 mb-2 bg-brand-primary text-brand-dark border border-brand-primary/50 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                    Founder & Director
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">Dan Le Gresley</h3>
                  <p className="text-brand-muted text-sm mt-1">Shopify Plus Architect & Growth Strategist</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="order-1 lg:order-2 space-y-10">
              <div>
                <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                  The &ldquo;Agency&rdquo; Model <br />
                  <span className="text-brand-muted">is broken.</span>
                </h2>
                <p className="text-lg text-brand-muted leading-relaxed">
                  Clients are tired of paying for overhead. I founded Atherstone Digital to offer a lean, high-impact alternative. <strong className="text-white">One senior partner</strong> replacing an entire department.
                </p>
              </div>

              <div className="space-y-6">
                <div className="bg-red-500/5 border border-red-500/20 p-6 rounded-2xl relative overflow-hidden group/card hover:bg-red-500/10 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/card:opacity-20 transition-opacity">
                    <ShieldCheck size={40} className="text-red-500" />
                  </div>
                  <h3 className="text-red-400 font-bold mb-2 text-lg">Traditional Agency</h3>
                  <ul className="space-y-2 text-sm text-brand-muted">
                    <li className="flex gap-2"><span className="text-red-500">×</span> High retainers paying for posh offices</li>
                    <li className="flex gap-2"><span className="text-red-500">×</span> Account managers blocking access to talent</li>
                    <li className="flex gap-2"><span className="text-red-500">×</span> Junior staff learning on your dime</li>
                  </ul>
                </div>
                <div className="bg-brand-primary/5 border border-brand-primary/20 p-6 rounded-2xl relative overflow-hidden group/card hover:bg-brand-primary/10 transition-colors">
                  <div className="absolute top-0 right-0 p-4 opacity-10 group-hover/card:opacity-20 transition-opacity">
                    <Zap size={40} className="text-brand-primary" />
                  </div>
                  <h3 className="text-brand-primary font-bold mb-2 text-lg">My Fractional Model</h3>
                  <ul className="space-y-2 text-sm text-brand-muted">
                    <li className="flex gap-2"><span className="text-brand-primary">✓</span> Direct access to C-suite Strategy</li>
                    <li className="flex gap-2"><span className="text-brand-primary">✓</span> Full Stack Execution (Dev + Growth)</li>
                    <li className="flex gap-2"><span className="text-brand-primary">✓</span> AI Agents handling the busy work</li>
                  </ul>
                </div>
              </div>

              <Link href="/services" className="text-white font-bold hover:text-brand-primary transition-colors inline-flex items-center gap-2 group border-b border-brand-primary/30 pb-1">
                Explore My Capabilities <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform text-brand-primary" />
              </Link>
            </div>
          </div>
        </section>

        {/* Local advantage */}
        <section className="container mx-auto px-6 mb-24">
          <div className="bg-brand-surfaceHighlight border border-brand-primary/20 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="grid md:grid-cols-3 gap-8 items-center relative z-10">
              <div className="md:col-span-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 border border-brand-primary/30 rounded-full bg-brand-primary/5">
                  <MapPin size={12} className="text-brand-primary" />
                  <span className="text-brand-primary text-xs font-bold uppercase tracking-widest">Midlands Based</span>
                </div>
                <h2 className="text-3xl font-display font-bold text-white mb-4">The Human Connection</h2>
                <p className="text-brand-muted text-lg leading-relaxed">
                  While I serve global clients remotely, I believe real business is built on relationships, not just Jira tickets. For partners in the West Midlands, I offer exclusive <strong className="text-white">Face-to-Face Sessions</strong>. I&apos;m just as comfortable whiteboarding complex logic with your dev team as I am presenting ROI to your stakeholders.
                </p>
              </div>
              <div className="bg-brand-dark/50 p-6 rounded-2xl border border-white/5 text-center">
                <div className="text-4xl font-bold text-white mb-2 font-display">50<span className="text-brand-primary text-2xl">mi</span></div>
                <p className="text-xs text-brand-muted uppercase tracking-widest">Radius from Atherstone (CV9)</p>
                <div className="mt-4 pt-4 border-t border-white/5 text-xs text-brand-muted">
                  Priority On-Site Support for <br />Warwickshire & West Mids
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Principles */}
        <section className="container mx-auto px-6 mb-24">
          <h2 className="text-3xl font-display font-bold text-white mb-12 text-center">My Operating Principles</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="bg-brand-surface p-8 rounded-2xl border border-brand-border hover:border-brand-primary/30 transition-colors">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center text-brand-primary mb-6">
                  <p.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{p.title}</h3>
                <p className="text-brand-muted">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 mb-16">
          <div className="bg-brand-surfaceHighlight rounded-3xl p-12 text-center border border-brand-border relative overflow-hidden max-w-4xl mx-auto">
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <Zap size={48} className="text-brand-primary mx-auto mb-6" />
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">Ready to upgrade your team?</h2>
              <p className="text-brand-muted text-lg mb-8">Stop paying for agency overhead. Start investing in senior talent that moves the needle.</p>
              <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,220,130,0.4)] transition-all transform hover:-translate-y-1">
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
