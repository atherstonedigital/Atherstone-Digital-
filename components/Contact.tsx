'use client';

import { useState } from 'react';
import { ArrowRight, CheckCircle, Loader2, Lock } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(false);
  const [revenue, setRevenue] = useState('');

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
            <h2 className="font-display text-3xl font-bold text-white mb-4">Application Received.</h2>
            <p className="text-brand-muted text-lg">I&apos;ll review your application and be in touch within 24 hours. Talk soon.</p>
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
                <Lock size={14} /><span>Waitlist Application</span>
              </div>
              <h2 className="font-display text-3xl font-bold mb-4">Partner Application.</h2>
              <p className="text-brand-muted mb-8 leading-relaxed">
                I only work with 3 partners at a time to ensure maximum focus. Complete this application to see if we&apos;re a fit.
              </p>
              <ul className="space-y-4 text-sm text-brand-text">
                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-brand-primary" /> Direct access to Dan (Founder)</li>
                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-brand-primary" /> Full tech stack audit</li>
                <li className="flex items-center gap-3"><CheckCircle size={18} className="text-brand-primary" /> Custom AI agent deployment</li>
              </ul>
            </div>
            <div className="mt-12 relative z-10">
              <p className="text-xs text-brand-muted font-mono">Current Capacity: <span className="text-brand-primary">{siteConfig.capacity.filled}/{siteConfig.capacity.total}</span></p>
            </div>
          </div>

          <div className="p-10 md:w-3/5">
            <div className="mb-8 text-center">
              <a
                href={siteConfig.cta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full py-4 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-brand-accent transition-colors shadow-[0_0_20px_rgba(74,222,128,0.2)]"
              >
                {siteConfig.cta.label} <ArrowRight size={18} />
              </a>
              <div className="flex items-center gap-4 mt-6">
                <div className="flex-1 h-px bg-brand-border"></div>
                <span className="text-xs text-brand-muted uppercase tracking-wider">or complete the partner application below</span>
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
                <input id="app-website" type="url" name="website" placeholder="https://yourstore.com" className="w-full bg-white/5 border border-brand-border rounded-lg px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-1 focus:ring-offset-brand-dark focus:border-brand-primary/50 transition-colors text-sm" />
              </div>
              <div>
                <label htmlFor="app-revenue" className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Annual Revenue (approx)</label>
                <select id="app-revenue" name="revenue" value={revenue} onChange={(e) => setRevenue(e.target.value)} required aria-describedby={revenue === 'under-500k' ? 'revenue-warning' : undefined} aria-invalid={revenue === 'under-500k' ? true : undefined} className="w-full bg-brand-surface border border-brand-border rounded-lg px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-1 focus:ring-offset-brand-dark focus:border-brand-primary/50 transition-colors text-sm appearance-none">
                  <option value="">Select range...</option>
                  <option value="under-500k">Under £500k</option>
                  <option value="500k-1m">£500k – £1M</option>
                  <option value="1m-2m">£1M – £2M</option>
                  <option value="2m-5m">£2M – £5M</option>
                  <option value="5m+">£5M+</option>
                </select>
                {revenue === 'under-500k' && <p id="revenue-warning" role="alert" className="mt-2 text-xs text-amber-400">This engagement may not be cost-effective at this stage. I&apos;d recommend getting organic traffic and product-market fit first.</p>}
              </div>
              <div>
                <label htmlFor="app-stack" className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Current Tech Stack</label>
                <input id="app-stack" type="text" name="stack" placeholder="e.g. Shopify Plus, Klaviyo, Recharge" className="w-full bg-white/5 border border-brand-border rounded-lg px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-1 focus:ring-offset-brand-dark focus:border-brand-primary/50 transition-colors text-sm" />
              </div>
              <div>
                <label htmlFor="app-challenge" className="block text-xs font-medium text-brand-muted mb-2 uppercase tracking-wider">Biggest Challenge Right Now</label>
                <textarea id="app-challenge" name="why_switch" required rows={3} placeholder="What's holding your growth back?" className="w-full bg-white/5 border border-brand-border rounded-lg px-4 py-3 text-white placeholder-brand-muted/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-1 focus:ring-offset-brand-dark focus:border-brand-primary/50 transition-colors text-sm resize-none" />
              </div>
              {error && (
                <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-3">
                  Something went wrong. Please try again or email <a href="mailto:info@atherstonedigital.com" className="underline">info@atherstonedigital.com</a> directly.
                </p>
              )}
              <button type="submit" disabled={isSubmitting} className="w-full py-4 bg-brand-primary text-brand-dark font-bold rounded-xl hover:bg-brand-accent transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,220,130,0.2)]">
                {isSubmitting ? <><Loader2 size={20} className="animate-spin" /> Submitting...</> : <>Submit Application <ArrowRight size={18} /></>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
