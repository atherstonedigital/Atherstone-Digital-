'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2, MessageSquare } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export function Contact() {
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
      .then(() => { setSubmitted(true); setIsSubmitting(false); })
      .catch(() => { setIsSubmitting(false); setError(true); });
  };

  if (submitted) {
    return (
      <section id="contact" className="py-24 bg-brand-surface relative overflow-hidden scroll-mt-28">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <div className="max-w-lg mx-auto">
            <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={32} className="text-brand-primary" />
            </div>
            <h2 className="font-display text-3xl font-bold text-white mb-4">Thanks, got it.</h2>
            <p className="text-brand-muted text-lg">I&apos;ll read your brief and be in touch within 24 hours. Talk soon.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-24 bg-brand-surface relative overflow-hidden scroll-mt-28">
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-5xl mx-auto bg-brand-dark rounded-3xl overflow-hidden shadow-2xl border border-brand-border flex flex-col md:flex-row">

          <div className="p-10 md:w-2/5 bg-gradient-to-br from-brand-surfaceHighlight to-brand-dark text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-accent/10 rounded-full blur-2xl"></div>
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold mb-6">
                <MessageSquare size={14} /><span>Quick brief</span>
              </div>
              <h2 className="font-display text-3xl font-bold mb-4">Tell me about your store.</h2>
              <p className="text-brand-muted leading-relaxed">
                If you&apos;d like to chat, send a quick brief. Three to five lines is plenty.
              </p>
            </div>
            <div className="mt-12 relative z-10">
              <p className="text-xs text-brand-muted font-mono">Current Capacity: <span className="text-brand-primary">{siteConfig.capacity.filled}/{siteConfig.capacity.total}</span></p>
            </div>
          </div>

          <div className="p-10 md:w-3/5">
            <div className="mb-8 text-center">
              <a
                href={siteConfig.ctas.primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-brand-accent transition-colors shadow-[0_0_20px_rgba(74,222,128,0.2)]"
              >
                {siteConfig.ctas.primary.label} <ArrowRight size={18} />
              </a>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex-1 h-px bg-brand-border"></div>
                <span className="text-xs text-brand-muted uppercase tracking-wider">or send a brief below</span>
                <div className="flex-1 h-px bg-brand-border"></div>
              </div>
            </div>
            <form name="application" method="POST" data-netlify="true" onSubmit={handleSubmit} className="space-y-5">
              <input type="hidden" name="form-name" value="application" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="app-name" className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Your Name</label>
                  <input id="app-name" type="text" name="name" required placeholder="Dan Smith" className="w-full bg-white/5 border border-brand-border rounded-lg px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-1 focus:ring-offset-brand-dark focus:border-brand-primary/50 transition-colors text-sm" />
                </div>
                <div>
                  <label htmlFor="app-email" className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Email</label>
                  <input id="app-email" type="email" name="email" required placeholder="dan@yourstore.com" className="w-full bg-white/5 border border-brand-border rounded-lg px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-1 focus:ring-offset-brand-dark focus:border-brand-primary/50 transition-colors text-sm" />
                </div>
              </div>
              <div>
                <label htmlFor="app-website" className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Store URL</label>
                <input id="app-website" type="url" name="website" required placeholder="https://yourstore.com" className="w-full bg-white/5 border border-brand-border rounded-lg px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-1 focus:ring-offset-brand-dark focus:border-brand-primary/50 transition-colors text-sm" />
              </div>
              <div>
                <label htmlFor="app-challenge" className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">What is the single biggest problem you&apos;d want help with?</label>
                <textarea id="app-challenge" name="why_switch" required rows={4} placeholder="A few lines is plenty." className="w-full bg-white/5 border border-brand-border rounded-lg px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-1 focus:ring-offset-brand-dark focus:border-brand-primary/50 transition-colors text-sm resize-none" />
              </div>
              <details className="group rounded-lg border border-brand-border bg-white/5">
                <summary className="cursor-pointer list-none px-4 py-3 text-xs font-medium text-brand-muted uppercase tracking-wider flex items-center justify-between">
                  Anything else? (optional)
                  <ArrowRight size={14} className="transition-transform group-open:rotate-90" />
                </summary>
                <div className="px-4 pb-4 pt-1 space-y-5">
                  <div>
                    <label htmlFor="app-revenue" className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Annual Revenue (approx)</label>
                    <select id="app-revenue" name="revenue" className="w-full bg-brand-surface border border-brand-border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-1 focus:ring-offset-brand-dark focus:border-brand-primary/50 transition-colors text-sm appearance-none">
                      <option value="">Select range...</option>
                      <option value="under-500k">Under £500k</option>
                      <option value="500k-1m">£500k to £1M</option>
                      <option value="1m-2m">£1M to £2M</option>
                      <option value="2m-5m">£2M to £5M</option>
                      <option value="5m+">£5M+</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="app-stack" className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Current Tech Stack</label>
                    <input id="app-stack" type="text" name="stack" placeholder="e.g. Shopify Plus, Klaviyo, Recharge" className="w-full bg-white/5 border border-brand-border rounded-lg px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-1 focus:ring-offset-brand-dark focus:border-brand-primary/50 transition-colors text-sm" />
                  </div>
                </div>
              </details>
              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  Something went wrong. Please try again or email <a href="mailto:info@atherstonedigital.com" className="underline">info@atherstonedigital.com</a> directly.
                </p>
              )}
              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-brand-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(74,222,128,0.2)]">
                {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Sending...</> : <>Send brief <ArrowRight size={18} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
