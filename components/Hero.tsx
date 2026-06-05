'use client';

import Link from 'next/link';
import { ArrowRight, Check } from 'lucide-react';
import { siteConfig } from '@/lib/siteConfig';

export function Hero() {
  return (
    <section
      id="home"
      className="hero-section relative min-h-screen flex items-center justify-center overflow-hidden pt-36 pb-32 bg-brand-dark"
      style={{ minHeight: '100svh' }}
    >
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center max-w-5xl">

        {/* Eyebrow */}
        <div
          className="hero-fade-up flex items-center gap-3 mb-10"
          style={{ animation: 'fadeUp 0.7s var(--ease-out) 0.8s both' }}
        >
          <Check size={14} className="text-brand-primary" strokeWidth={3} />
          <span
            className="font-sans uppercase text-brand-muted font-semibold"
            style={{ fontSize: '0.72rem', letterSpacing: '0.16em' }}
          >
            {siteConfig.capacity.remaining} of {siteConfig.capacity.total} places open
          </span>
        </div>

        {/* Masked H1 */}
        <h1
          className="font-display text-center font-semibold text-brand-text"
          style={{
            fontSize: 'clamp(2.7rem, 7.2vw, 5.6rem)',
            lineHeight: 1.0,
            letterSpacing: '-0.018em',
          }}
        >
          <span className="block overflow-hidden">
            <span
              className="hero-mask-line block"
              style={{ animation: 'maskReveal 0.92s var(--ease-out) 0.05s both' }}
            >
              Senior Shopify operator,
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="hero-mask-line block"
              style={{ animation: 'maskReveal 0.92s var(--ease-out) 0.15s both' }}
            >
              with the work actually
            </span>
          </span>
          <span className="block overflow-hidden">
            <span
              className="hero-mask-line block text-brand-primary"
              style={{ animation: 'maskReveal 0.92s var(--ease-out) 0.25s both' }}
            >
              done.
            </span>
          </span>
        </h1>

        {/* Subhead */}
        <p
          className="hero-fade-up text-lg md:text-xl text-brand-muted max-w-2xl mx-auto text-center mt-8 mb-10 leading-relaxed"
          style={{ animation: 'fadeUp 0.7s var(--ease-out) 0.52s both' }}
        >
          End-to-end Shopify ecommerce for brands turning over{' '}
          <em className="text-brand-text not-italic font-medium">{siteConfig.revenueBand}</em>.
          {' '}Strategy, development, ads, and automation. One person.
          {' '}Three partners at a time. From {siteConfig.pricing.retainerFrom} a month.
        </p>

        {/* CTAs */}
        <div
          className="hero-fade-up flex flex-col sm:flex-row items-center justify-center gap-5 w-full sm:w-auto"
          style={{ animation: 'fadeUp 0.7s var(--ease-out) 0.64s both' }}
        >
          <a
            href={siteConfig.ctas.primary.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-cta-primary w-full sm:w-auto px-10 py-4 bg-brand-primary text-white font-bold text-lg rounded-xl flex items-center justify-center gap-3"
          >
            {siteConfig.ctas.primary.label}
            <ArrowRight size={20} className="cta-arrow" />
          </a>
          <Link
            href={siteConfig.ctas.secondary.href}
            className="hero-cta-link w-full sm:w-auto px-6 py-4 font-medium text-lg text-brand-primary flex items-center justify-center gap-2"
          >
            {siteConfig.ctas.secondary.label}
            <ArrowRight size={18} className="cta-arrow" />
          </Link>
        </div>

      </div>
    </section>
  );
}
