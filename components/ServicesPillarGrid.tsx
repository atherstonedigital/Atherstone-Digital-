'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { SERVICES_DATA, ServicePillar } from '@/lib/data';

const PILLARS: { key: ServicePillar; title: string; sub: string }[] = [
  { key: 'grow', title: 'Grow the revenue', sub: 'CRO, Paid Media, Lifecycle' },
  { key: 'run', title: 'Run the operation', sub: 'Automation, Feed, Catalogue' },
  { key: 'build', title: 'Build the tech', sub: 'Store, Custom, AI-Ready' },
];

export function ServicesPillarGrid() {
  const searchParams = useSearchParams();
  const activePillar = searchParams.get('pillar') as ServicePillar | null;
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activePillar && scrollRef.current) {
      const el = scrollRef.current.querySelector(`[data-pillar="${activePillar}"]`);
      if (el) {
        setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
    }
  }, [activePillar]);

  return (
    <div ref={scrollRef} className="space-y-16">
      {PILLARS.map((pillar) => {
        const services = SERVICES_DATA.filter((s) => s.pillar === pillar.key);
        const isHighlighted = activePillar === pillar.key;

        return (
          <div
            key={pillar.key}
            data-pillar={pillar.key}
            className={`scroll-mt-32 transition-all duration-500 ${
              isHighlighted ? 'ring-1 ring-brand-primary/20 rounded-3xl p-6 -mx-6 bg-brand-surface/30' : ''
            }`}
          >
            <div className="mb-6">
              <div className="text-xs font-mono text-brand-primary uppercase tracking-widest mb-2">{pillar.sub}</div>
              <h3 className="font-display text-2xl font-bold text-white">{pillar.title}</h3>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service) => (
                <Link
                  key={service.id}
                  href={`/services/${service.slug}`}
                  className="relative p-6 rounded-2xl bg-brand-surface border border-white/5 overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-dark transition-colors">
                        <ArrowRight size={16} />
                      </div>
                      <ArrowRight size={16} className="text-brand-muted -rotate-45 group-hover:rotate-0 group-hover:text-brand-primary transition-all duration-300" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-2 font-display group-hover:text-brand-primary transition-colors">{service.title}</h4>
                    <p className="text-brand-muted text-sm mb-4 leading-relaxed flex-grow">{service.description}</p>
                    <div className="pt-4 border-t border-white/5 mt-auto">
                      <p className="text-[10px] font-bold text-brand-accent uppercase tracking-widest">Outcome: {service.outcome}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
