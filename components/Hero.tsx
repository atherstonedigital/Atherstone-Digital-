'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export function Hero() {
  return (
    <section
      id="home"
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-36 pb-32 bg-brand-dark"
    >
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center max-w-5xl">

        {/* Eyebrow */}
        <div
          className="hero-fade-up flex items-center gap-3 mb-10 opacity-0"
          style={{ animation: 'fadeUp 0.6s var(--ease-out) 1.6s forwards' }}
        >
          <span className="w-2 h-2 rounded-full bg-brand-primary" />
          <span className="font-sans text-xs uppercase tracking-widest text-brand-muted">
            {siteConfig.capacity.remaining} of {siteConfig.capacity.total} places open
          </span>
        </div>

        {/* Masked H1 */}
        <h1
          className="font-display text-center font-bold tracking-tight leading-[1.08] text-brand-text"
          style={{ fontSize: 'clamp(2.4rem, 5.6vw, 4.5rem)' }}
        >
          <span className="block overflow-hidden">
            <span
              className="hero-mask-line block opacity-0"
              style={{ animation: 'maskReveal 0.92s var(--ease-out) 0.2s forwards, fadeUp 0.01s linear 0.2s forwards' }}
            >
              Senior Shopify operator,
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="hero-mask-line block opacity-0"
              style={{ animation: 'maskReveal 0.92s var(--ease-out) 0.32s forwards, fadeUp 0.01s linear 0.32s forwards' }}
            >
              with the work actually
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="hero-mask-line block text-brand-primary opacity-0"
              style={{ animation: 'maskReveal 0.92s var(--ease-out) 0.44s forwards, fadeUp 0.01s linear 0.44s forwards' }}
            >
              done.
            </span>
          </span>
        </h1>

        {/* Subhead */}
        <p
          className="hero-fade-up text-lg md:text-xl text-brand-muted max-w-2xl mx-auto text-center mt-8 mb-10 leading-relaxed opacity-0"
          style={{ animation: 'fadeUp 0.6s var(--ease-out) 1.2s forwards' }}
        >
          End-to-end Shopify ecommerce for brands turning over{' '}
          <em className="text-brand-text not-italic font-medium">{siteConfig.revenueBand}</em>.
          {' '}Strategy, development, ads, and automation. One person.
          {' '}Three partners at a time. From {siteConfig.pricing.retainerFrom} a month.
        </p>

        {/* CTAs */}
        <div
          className="hero-fade-up flex flex-col sm:flex-row items-center justify-center gap-5 opacity-0 w-full sm:w-auto"
          style={{ animation: 'fadeUp 0.6s var(--ease-out) 1.4s forwards' }}
        >
          <a
            href={siteConfig.ctas.primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group w-full sm:w-auto px-10 py-4 bg-brand-primary text-white font-bold text-lg rounded-xl transition-all flex items-center justify-center gap-3 hover:bg-brand-accent"
          >
            {siteConfig.ctas.primary.label}
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </a>
          <Link
            href={siteConfig.ctas.secondary.href}
            className="group w-full sm:w-auto px-10 py-4 font-medium text-lg text-brand-text border border-brand-border rounded-xl transition-all flex items-center justify-center gap-2 hover:border-brand-primary/40"
          >
            {siteConfig.ctas.secondary.label}
            <ArrowRight size={18} className="text-brand-muted transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

      </div>
    </section>
  );
}
