'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: 'Do I need to give you access to my Shopify admin?',
    a: 'We need a product data export, which can be generated via Matrixify or a standard Shopify CSV export. If it\'s easier, we can request collaborator access to pull the export ourselves. We never make changes to your live store without your explicit approval.',
  },
  {
    q: 'What if my catalogue has more complex issues beyond the standard audit?',
    a: 'The initial review call is designed to catch this. If your store has unusual data structures, custom metafield setups, or specific integration requirements, we\'ll scope a tailored engagement rather than shoehorning it into a standard tier.',
  },
  {
    q: 'Can you also handle ongoing catalogue maintenance?',
    a: 'Yes. Many brands benefit from a quarterly data health check after the initial remediation. We offer this as an add-on or as part of a retained engagement. We\'ll discuss options after the initial project if it makes sense for your store.',
  },
  {
    q: 'How is this different from what my Shopify agency does?',
    a: 'Most agencies focus on design, development, and marketing. Catalogue data operations is a specialist discipline that requires specific tooling and deep Shopify data knowledge. We regularly find issues that have been present since a store\'s original migration or theme build, simply because nobody with the right expertise ever looked.',
  },
  {
    q: 'What if I only need the audit, not the fix?',
    a: 'We offer the audit report as a standalone deliverable at a reduced rate. Get in touch and we\'ll quote based on your catalogue size.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-brand-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full py-6 flex items-center justify-between text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-lg group"
        aria-expanded={open}
      >
        <span className={`font-medium text-lg ${open ? 'text-brand-primary' : 'text-white'} group-hover:text-brand-primary transition-colors`}>
          {question}
        </span>
        <ChevronDown
          className={`text-brand-muted transition-transform duration-300 shrink-0 ml-4 ${open ? 'rotate-180 text-brand-primary' : ''}`}
          size={20}
        />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${open ? 'max-h-96 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
        <p className="text-brand-muted leading-relaxed text-sm md:text-base pr-8">{answer}</p>
      </div>
    </div>
  );
}

export function CatalogueHealthFAQ() {
  return (
    <section className="container mx-auto px-6 mb-20">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-10 text-center tracking-tight">
          Common questions
        </h2>
        <div className="bg-brand-surface rounded-2xl p-6 border border-brand-border">
          {faqs.map((faq) => (
            <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
          ))}
        </div>
      </div>
    </section>
  );
}
