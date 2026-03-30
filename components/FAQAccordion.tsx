'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

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
      <button onClick={() => setOpen(!open)} className="w-full py-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-lg group" aria-expanded={open}>
        <span className={`font-medium text-lg ${open ? 'text-brand-primary' : 'text-white'} group-hover:text-brand-primary transition-colors`}>{question}</span>
        <ChevronDown className={`text-brand-muted transition-transform duration-300 ${open ? 'rotate-180 text-brand-primary' : ''}`} size={20} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-brand-muted leading-relaxed text-sm md:text-base pr-8">{answer}</p>
      </div>
    </div>
  );
}

export function FAQAccordion() {
  return (
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
  );
}
