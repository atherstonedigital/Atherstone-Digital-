'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, Download, Loader2 } from 'lucide-react';

export function LeadMagnet() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(false);
    const formData = new FormData(e.currentTarget);
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then(() => {
        setSubmitted(true);
        setIsSubmitting(false);
        // Auto-download the PDF
        const link = document.createElement('a');
        link.href = '/atherstone-5-metrics.pdf';
        link.download = 'atherstone-5-metrics.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(() => { setIsSubmitting(false); setError(true); });
  };

  return (
    <section className="py-20 bg-brand-surface">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto border-l-4 border-brand-primary bg-brand-dark rounded-2xl p-8 md:p-12">
          <span className="text-brand-primary text-xs font-mono font-bold uppercase tracking-widest">Free Download</span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-3 mb-3">
            The 5 Shopify Metrics Most Brands Track Wrong
          </h2>
          <p className="text-brand-muted text-lg mb-8 leading-relaxed">
            A practical guide to the numbers that actually predict revenue growth. Used by brands doing £500k–£5M.
          </p>

          {submitted ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-xl">
                <CheckCircle size={20} className="text-brand-primary shrink-0" />
                <p className="text-brand-text font-medium">Your guide is ready — download it now.</p>
              </div>
              <a
                href="/atherstone-5-metrics.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-brand-dark font-bold rounded-lg hover:bg-brand-accent transition-colors"
              >
                <Download size={18} /> Download the Guide (PDF)
              </a>
            </div>
          ) : (
            <>
              <form name="lead-magnet" method="POST" data-netlify="true" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                <input type="hidden" name="form-name" value="lead-magnet" />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Your work email"
                  className="flex-1 bg-white/5 border border-brand-border rounded-lg px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:border-brand-primary/50 transition-colors text-sm"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-6 py-3 bg-brand-primary text-brand-dark font-bold rounded-lg hover:bg-brand-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <>Send Me the Guide <ArrowRight size={16} /></>}
                </button>
              </form>
              {error && (
                <p className="mt-3 text-sm text-red-400">Something went wrong. Please try again.</p>
              )}
              <p className="mt-3 text-xs text-brand-muted/60">No spam. Unsubscribe any time.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
