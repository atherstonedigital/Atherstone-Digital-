import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, PoundSterling, ShieldAlert, Briefcase, CheckCircle } from 'lucide-react';
import { Contact } from '@/components/Contact';

export const metadata: Metadata = {
  title: 'Why Go Fractional? Director vs Agency vs Full-Time',
  description: 'See exactly why a fractional ecommerce director beats an agency and costs 70% less than a full-time hire. Real numbers, real savings.',
  alternates: {
    canonical: 'https://www.atherstonedigital.com/why-fractional',
  },
  openGraph: {
    title: 'Why Go Fractional? Director vs Agency vs Full-Time',
    description: 'See exactly why a fractional ecommerce director beats an agency and costs 70% less than a full-time hire. Real numbers, real savings.',
    url: 'https://www.atherstonedigital.com/why-fractional',
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  url: 'https://www.atherstonedigital.com/why-fractional',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Why choose a Fractional Ecommerce Director over an Agency?',
      acceptedAnswer: { '@type': 'Answer', text: 'Agencies charge high retainers to cover office rent, account managers, and junior staff learning curves. A Fractional Director provides senior-level strategy and execution directly — eliminating the overhead and saving an estimated £98,000 per year versus a comparable agency roster.' },
    },
    {
      '@type': 'Question',
      name: 'Is a Fractional Director cheaper than hiring full-time?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. A full-time Head of Ecommerce plus a Senior Developer typically costs over £140,000 per year including salary, National Insurance, pension, and benefits. Atherstone Digital\u2019s fractional model starts from £36,000/year (£3,000/month) for equivalent output \u2014 versus £140,000+ all-in for a comparable full-time team.' },
    },
    {
      '@type': 'Question',
      name: 'What is the minimum commitment?',
      acceptedAnswer: { '@type': 'Answer', text: 'Atherstone Digital operates on a rolling monthly retainer. There is no minimum term. You can scale up during Q4 peak periods or pause during quiet months — unlike a full-time employee.' },
    },
    {
      '@type': 'Question',
      name: 'Can I use a Fractional Director alongside my existing agency?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes. A fractional director can manage your existing agency relationships, brief creative suppliers, and audit their output. Many partners find they can replace one or more agencies entirely once the fractional model is in place.' },
    },
  ],
};

export default function WhyFractionalPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
              The Maths <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">Just Makes Sense.</span>
            </h1>
            <p className="text-xl text-brand-muted max-w-2xl mx-auto leading-relaxed">
              Why pay for a traditional agency&apos;s office rent, account managers, and junior learning curves? The Fractional model is engineered for ROI.
            </p>
          </div>
        </section>

        {/* Cost comparison table */}
        <section className="container mx-auto px-6 mb-24">
          <div className="overflow-x-auto max-w-5xl mx-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  <th className="text-left p-4 text-brand-muted font-mono uppercase tracking-wider text-xs"></th>
                  <th className="p-4 text-center text-red-400 font-bold">Traditional Agency</th>
                  <th className="p-4 text-center text-blue-400 font-bold">Full-Time Director</th>
                  <th className="p-4 text-center text-brand-primary font-bold bg-brand-primary/5 rounded-t-xl border-t border-x border-brand-primary/20">Atherstone Digital</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['Monthly cost', '£5,000–£10,000', '£7,000–£10,000', 'From £3,000'],
                  ['Annual cost', '£60k–£120k', '£85k–£120k + NI/pension', 'From £36k'],
                  ['Seniority level', 'Junior execution', 'Varies', 'Director-level only'],
                  ['Time to start', '4–6 weeks', '3–6 months to hire', 'Week 1'],
                  ['P&L ownership', '✗', '✓', '✓'],
                  ['Tech execution', 'Separate dev cost', '✗ (strategy only)', '✓ Built-in'],
                  ['Flexibility', 'Fixed contract', 'Fixed salary', 'Monthly rolling'],
                ].map(([label, agency, fulltime, frac], i) => (
                  <tr key={i} className="border-t border-brand-border">
                    <td className="p-4 text-brand-muted font-medium">{label}</td>
                    <td className="p-4 text-center text-brand-muted">{agency}</td>
                    <td className="p-4 text-center text-brand-muted">{fulltime}</td>
                    <td className="p-4 text-center text-brand-primary font-bold bg-brand-primary/5 border-x border-brand-primary/20">{frac}</td>
                  </tr>
                ))}
                <tr>
                  <td className="p-4"></td>
                  <td className="p-4"></td>
                  <td className="p-4"></td>
                  <td className="p-4 bg-brand-primary/5 rounded-b-xl border-b border-x border-brand-primary/20">
                    <Link href="/#contact" className="block w-full text-center py-2 bg-brand-primary text-brand-dark font-bold rounded-lg text-xs hover:bg-brand-accent transition-colors">
                      Get Started
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Three comparison cards */}
        <section className="container mx-auto px-6 mb-24">
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start max-w-5xl mx-auto">

            <div className="group relative bg-brand-surface/30 border border-white/5 p-8 rounded-3xl hover:border-red-500/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center mb-6 border border-red-500/20 group-hover:scale-110 transition-transform duration-300">
                  <ShieldAlert size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-display">The Agency Trap</h3>
                <p className="text-red-400/80 text-sm font-medium mb-6 uppercase tracking-wider">High Overhead • Slow</p>
                <ul className="space-y-4 text-brand-muted text-sm leading-relaxed">
                  {[
                    ['Bloated Retainers', "You pay for their infrastructure, not the work."],
                    ['Gatekeepers', 'Account managers block you from talking to the talent.'],
                    ['Junior Execution', 'Senior partners pitch you; interns do the work.'],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center text-xs font-bold">×</span>
                      <span><strong className="text-white block mb-0.5">{title}</strong>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="group relative bg-brand-surface/30 border border-white/5 p-8 rounded-3xl hover:border-blue-500/30 transition-all duration-500">
              <div className="absolute inset-0 bg-gradient-to-b from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none"></div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-blue-500/10 text-blue-400 rounded-2xl flex items-center justify-center mb-6 border border-blue-500/20 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-display">The Full-Time Risk</h3>
                <p className="text-blue-400/80 text-sm font-medium mb-6 uppercase tracking-wider">Fixed Cost • Inflexible</p>
                <ul className="space-y-4 text-brand-muted text-sm leading-relaxed">
                  {[
                    ['Fixed Liability', '£85k+ salary + NI + pension regardless of performance.'],
                    ['Recruitment Lag', '3–6 months to find, hire, and onboard a Head of Ecom.'],
                    ['Single Skillset', 'A Director creates strategy but rarely writes code. You still need a dev.'],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-xs font-bold">!</span>
                      <span><strong className="text-white block mb-0.5">{title}</strong>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="relative bg-gradient-to-b from-brand-surfaceHighlight to-brand-terminal border border-brand-primary/40 p-8 rounded-3xl shadow-[0_0_50px_rgba(74,222,128,0.1)] transform md:-translate-y-6">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-primary text-brand-dark text-[10px] font-bold px-4 py-1.5 rounded-full tracking-widest uppercase shadow-[0_4px_20px_rgba(74,222,128,0.4)]">
                Recommended Model
              </div>
              <div className="relative z-10">
                <div className="w-14 h-14 bg-brand-primary text-brand-dark rounded-2xl flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(74,222,128,0.4)]">
                  <PoundSterling size={32} />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2 font-display">The Fractional Edge</h3>
                <p className="text-brand-primary text-sm font-bold mb-6 uppercase tracking-wider">Agile • Senior • ROI-First</p>
                <ul className="space-y-5 text-brand-text text-sm leading-relaxed">
                  {[
                    ['Senior Talent Only', 'You work directly with Dan. No juniors, no delegation.'],
                    ['Instant Impact', 'I audit and execute from Week 1. Zero onboarding lag.'],
                    ['Full Stack', 'Strategy, Dev, and Growth in one retainer. I build what I plan.'],
                  ].map(([title, desc]) => (
                    <li key={title} className="flex gap-3">
                      <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-brand-primary text-brand-dark flex items-center justify-center text-xs font-bold">✓</span>
                      <span><strong className="text-white block mb-0.5">{title}</strong>{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">Common Questions</h2>
            <div className="space-y-4">
              {faqSchema.mainEntity.map((item, i) => (
                <div key={i} className="bg-brand-surface rounded-xl p-6 border border-brand-border">
                  <h3 className="font-bold text-white mb-2">{item.name}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{item.acceptedAnswer.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 mb-16">
          <div className="bg-gradient-to-br from-brand-surface to-brand-dark border border-brand-border rounded-3xl p-12 text-center relative overflow-hidden group max-w-4xl mx-auto">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-primary/10 transition-colors duration-700"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">Stop paying for overhead.</h2>
              <p className="text-brand-muted text-lg mb-8">Allocate your budget to execution and growth, not account management layers.</p>
              <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(74,222,128,0.4)] transition-all transform hover:-translate-y-1 hover:bg-brand-accent">
                Book a Free Commercial Review <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>

        <Contact />
      </div>
    </>
  );
}
