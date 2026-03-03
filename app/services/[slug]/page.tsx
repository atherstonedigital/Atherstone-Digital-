import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SERVICES_DATA } from '@/lib/data';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Contact } from '@/components/Contact';

export async function generateStaticParams() {
  return SERVICES_DATA.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const service = SERVICES_DATA.find((s) => s.slug === params.slug);
  if (!service) return {};
  return {
    title: service.seoTitle,
    description: service.seoDescription,
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = SERVICES_DATA.find((s) => s.slug === params.slug);
  if (!service) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.longDescription,
    provider: { '@type': 'ProfessionalService', name: 'Atherstone Digital', url: 'https://atherstonedigital.com' },
    areaServed: { '@type': 'Country', name: 'United Kingdom' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="pt-36 pb-20 bg-brand-dark min-h-screen">
        <div className="container mx-auto px-6 mb-8">
          <Link href="/services" className="text-brand-muted hover:text-brand-primary transition-colors inline-flex items-center gap-2 text-sm">
            <ArrowLeft size={16} /> All Services
          </Link>
        </div>

        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            <div className="inline-block px-3 py-1 mb-6 border border-brand-primary/30 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-mono uppercase tracking-widest">
              {service.outcome}
            </div>
            <h1 className="font-display text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">{service.title}</h1>
            <p className="text-xl text-brand-muted leading-relaxed max-w-3xl">{service.longDescription}</p>
          </div>
        </section>

        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto bg-brand-surface rounded-2xl p-10 border border-brand-border">
            <h2 className="font-display text-2xl font-bold text-white mb-8">What&apos;s Included</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.features.map((feature, i) => (
                <div key={i} className="flex items-start gap-3">
                  <CheckCircle size={18} className="text-brand-primary mt-0.5 shrink-0" />
                  <span className="text-brand-text">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-display text-2xl font-bold text-white mb-8">Other Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES_DATA.filter((s) => s.id !== service.id).slice(0, 3).map((s) => (
                <Link key={s.id} href={`/services/${s.slug}`}
                  className="group p-5 bg-brand-surface rounded-xl border border-brand-border hover:border-brand-primary/30 transition-all">
                  <div className="text-xs font-mono text-brand-primary mb-2">{s.outcome}</div>
                  <div className="font-display font-bold text-white group-hover:text-brand-primary transition-colors">{s.title}</div>
                  <div className="flex items-center gap-1 text-xs text-brand-primary mt-3 opacity-0 group-hover:opacity-100 transition-opacity">More <ArrowRight size={10} /></div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Contact />
      </div>
    </>
  );
}
