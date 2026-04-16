'use client';

import { useEffect, useRef, useState } from 'react';

export function MondayDigestPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`max-w-2xl mx-auto transition-all duration-700 ease-out ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
    >
      <div className="bg-brand-dark border border-brand-border rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(74,222,128,0.05)]">
        {/* Subject line */}
        <div className="px-6 py-4 border-b border-brand-border flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-brand-primary" />
          <span className="text-brand-text text-sm font-medium">
            Your Week in Numbers — Monday 14 April
          </span>
          <span className="ml-auto text-brand-muted text-xs font-mono">08:00</span>
        </div>

        {/* Data blocks */}
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-brand-border">
          <DataBlock
            label="Revenue (GA4)"
            value="£28,450"
            change="+12% vs last week"
            positive
            delay={visible ? 200 : 0}
          />
          <DataBlock
            label="Paid ROAS (Blended)"
            value="4.2x"
            change="Google Ads + Meta"
            positive
            delay={visible ? 400 : 0}
          />
          <DataBlock
            label="Email Revenue (Klaviyo)"
            value="£4,120"
            change="14% of total"
            positive
            delay={visible ? 600 : 0}
          />
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-brand-border bg-brand-surface/30">
          <p className="text-brand-muted text-xs font-mono">
            Generated automatically by n8n at 08:00 every Monday. No dashboards. No manual pulls.
          </p>
        </div>
      </div>

      {/* Placeholder note for Dan */}
      <p className="text-brand-muted/40 text-xs text-center mt-3 italic">
        {/* TODO: Dan to replace mockup data with real redacted screenshot */}
        Illustrative data. Your digest is tailored to your stack.
      </p>
    </div>
  );
}

function DataBlock({
  label,
  value,
  change,
  positive,
  delay,
}: {
  label: string;
  value: string;
  change: string;
  positive: boolean;
  delay: number;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setShow(true);
      return;
    }

    const timer = setTimeout(() => setShow(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      className={`px-6 py-5 transition-all duration-500 ease-out ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}
    >
      <div className="text-brand-muted text-xs font-mono uppercase tracking-wider mb-2">
        {label}
      </div>
      <div className="text-brand-text text-2xl font-display font-bold mb-1">
        {value}
      </div>
      <div
        className={`text-xs font-medium ${
          positive ? 'text-brand-primary' : 'text-red-400'
        }`}
      >
        {change}
      </div>
    </div>
  );
}
