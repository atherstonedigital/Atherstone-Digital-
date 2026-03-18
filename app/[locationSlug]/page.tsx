import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { LOCATIONS_DATA } from '@/lib/data';
import { ArrowLeft, ArrowRight, MapPin, Coffee, Users, ShieldCheck, TrendingUp, Cpu } from 'lucide-react';
import { Contact } from '@/components/Contact';

export async function generateStaticParams() {
  return LOCATIONS_DATA.map((l) => ({ locationSlug: l.slug }));
}

export async function generateMetadata({ params }: { params: { locationSlug: string } }): Promise<Metadata> {
  const loc = LOCATIONS_DATA.find((l) => l.slug === params.locationSlug);
  if (!loc) return {};
  return {
    title: loc.seoTitle,
    description: loc.seoDescription,
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `https://www.atherstonedigital.com/${loc.slug}`,
    },
    openGraph: { title: loc.seoTitle, description: loc.seoDescription, url: `https://www.atherstonedigital.com/${loc.slug}` },
  };
}

export default function LocationPage({ params }: { params: { locationSlug: string } }) {
  const location = LOCATIONS_DATA.find((l) => l.slug === params.locationSlug);
  if (!location) notFound();

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: `Atherstone Digital — Fractional Ecommerce Director serving ${location.city}`,
    description: location.seoDescription,
    url: `https://www.atherstonedigital.com/${location.slug}`,
    telephone: '+447810838129',
    email: 'info@atherstonedigital.com',
    address: { '@type': 'PostalAddress', addressLocality: 'Atherstone', addressRegion: 'Warwickshire', addressCountry: 'GB', postalCode: 'CV9' },
    geo: { '@type': 'GeoCoordinates', latitude: 52.5746, longitude: -1.5492 },
    areaServed: { '@type': 'City', name: location.city },
    priceRange: '£3000 - £10000',
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: `Do you offer face-to-face meetings in ${location.city}?`,
        acceptedAnswer: { '@type': 'Answer', text: `Yes. ${location.city} is ${location.distance === 'HQ' ? 'my home base' : `${location.distance} from my Atherstone studio`}. In-person strategy sessions are included in all retainer packages at no extra travel cost.` },
      },
      {
        '@type': 'Question',
        name: `What does a Fractional Ecommerce Director do for ${location.city} brands?`,
        acceptedAnswer: { '@type': 'Answer', text: 'I act as your senior ecommerce leader on a part-time basis — owning the strategy, the technical roadmap, and the growth execution for your Shopify store. This includes CRO, paid media, Klaviyo lifecycle marketing, and automation.' },
      },
      {
        '@type': 'Question',
        name: 'How much does it cost?',
        acceptedAnswer: { '@type': 'Answer', text: 'Retainers start from £3,000/month. This is typically 40-70% less than the equivalent agency retainer, with senior-level expertise at every touchpoint.' },
      },
    ],
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.atherstonedigital.com' },
      { '@type': 'ListItem', position: 2, name: `Fractional Ecommerce Director ${location.city}`, item: `https://www.atherstonedigital.com/${location.slug}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-36 pb-20 bg-brand-dark min-h-screen">
        <div className="container mx-auto px-6 mb-8">
          <Link href="/" className="text-brand-muted hover:text-brand-primary transition-colors inline-flex items-center gap-2 text-sm">
            <ArrowLeft size={16} /> Back to Overview
          </Link>
        </div>

        {/* Hero */}
        <section className="relative px-6 mb-24">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="container mx-auto max-w-5xl text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 border border-brand-primary/30 rounded-full bg-brand-primary/5 backdrop-blur-sm">
              <MapPin size={12} className="text-brand-primary" />
              <span className="text-brand-primary text-xs font-mono uppercase tracking-widest font-bold">Serving {location.city}</span>
            </div>
            <h1 className="font-display text-5xl lg:text-7xl font-bold text-white mb-8 tracking-tight">
              Fractional Ecommerce Director{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-accent">
                for {location.heroTitle} Brands.
              </span>
            </h1>
            <p className="text-xl text-brand-muted max-w-3xl mx-auto leading-relaxed mb-10">
              You don&apos;t need a London agency charging London rates. You need a senior partner based in the Midlands who understands your P&amp;L and can meet you in <strong>{location.city}</strong> for real strategy sessions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/#contact" className="px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,220,130,0.4)] transition-all hover:bg-brand-accent min-w-[200px] flex items-center justify-center gap-2">
                Book a Strategy Coffee <Coffee size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* Unique local content */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto bg-brand-surface rounded-2xl p-10 border border-brand-border">
            <h2 className="font-display text-2xl font-bold text-white mb-6">Working With {location.city} Brands</h2>
            <p className="text-brand-muted text-lg leading-relaxed">{location.uniqueContent}</p>
          </div>
        </section>

        {/* Local Advantage */}
        <section className="container mx-auto px-6 mb-24">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div>
              <h2 className="text-3xl font-display font-bold text-white mb-6">Why Local Matters</h2>
              <p className="text-brand-muted text-lg mb-6 leading-relaxed">
                Ecommerce is digital, but <strong>Trust</strong> is human. While I work with brands globally, my {location.city} partners get a distinct advantage: <span className="text-white font-bold">Face-to-Face Strategy</span>.
              </p>
              <ul className="space-y-4">
                {[
                  { icon: Users, title: 'Boardroom Presence', desc: 'I can present roadmaps to your stakeholders in person, acting as your interim Head of Ecommerce.' },
                  { icon: TrendingUp, title: 'Whiteboarding Sessions', desc: 'Complex problems like data migration or attribution are solved faster with a marker pen and a whiteboard.' },
                  { icon: ShieldCheck, title: 'Local Accountability', desc: `I'm based ${location.distance === 'HQ' ? 'in Atherstone' : `${location.distance} away`}. Not in a distant timezone. I'm accountable.` },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="w-10 h-10 rounded-lg bg-brand-primary/10 flex items-center justify-center text-brand-primary shrink-0">
                      <item.icon size={20} />
                    </div>
                    <div>
                      <strong className="text-white block">{item.title}</strong>
                      <span className="text-sm text-brand-muted">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-brand-surfaceHighlight rounded-3xl p-8 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-2xl"></div>
              <div className="relative z-10 text-center">
                <div className="inline-block p-4 rounded-full bg-brand-dark border border-brand-primary/30 mb-6 shadow-lg">
                  <MapPin size={32} className="text-brand-primary" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{location.city}</h3>
                <p className="text-brand-muted mb-6">Priority Service Area</p>
                <div className="bg-brand-dark/50 rounded-xl p-4 border border-white/5">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-brand-muted uppercase tracking-wider">Travel Time</span>
                    <span className="text-brand-primary font-bold font-mono">{location.distance}</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-primary h-full w-1/4 animate-pulse"></div>
                  </div>
                  <p className="text-xs text-brand-muted mt-3 text-left">*No travel costs billed for monthly strategy sessions in this zone.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Services */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-white mb-4">Full Stack Capabilities</h2>
            <p className="text-brand-muted">I bring the same enterprise-grade stack to {location.city} that I deploy for global brands.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: Cpu, title: 'Shopify Development', desc: 'Custom themes, speed optimisation, and complex migrations (Magento/Woo to Shopify).' },
              { icon: TrendingUp, title: 'Growth & CRO', desc: 'A/B testing, landing page strategy, and Paid Media management (Google/Meta).' },
              { icon: ShieldCheck, title: 'Automation', desc: 'n8n workflows to automate inventory, reporting, and customer tagging.' },
            ].map((item) => (
              <div key={item.title} className="bg-brand-surface p-6 rounded-2xl border border-white/5">
                <item.icon className="text-brand-primary mb-4" size={24} />
                <h3 className="font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sm text-brand-muted">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="container mx-auto px-6 mb-24">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-3xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: `Do you offer face-to-face meetings in ${location.city}?`, a: `Yes. ${location.city} is ${location.distance === 'HQ' ? 'my home base' : `${location.distance} from my Atherstone studio`}. In-person strategy sessions are included in all retainer packages at no extra travel cost.` },
                { q: 'What does a Fractional Ecommerce Director cost?', a: 'Retainers start from £3,000/month — typically 40–70% less than an equivalent agency retainer, with senior expertise at every touchpoint.' },
                { q: 'How quickly can you start?', a: 'Subject to capacity, I can usually begin within 2 weeks. Week one is a full tech stack audit and commercial baseline.' },
              ].map((faq, i) => (
                <div key={i} className="bg-brand-surface rounded-xl p-6 border border-brand-border">
                  <h3 className="font-bold text-white mb-2">{faq.q}</h3>
                  <p className="text-brand-muted text-sm leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-6 mb-16">
          <div className="bg-gradient-to-br from-brand-surface to-brand-dark border border-brand-border rounded-3xl p-12 text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/5 rounded-full blur-3xl pointer-events-none group-hover:bg-brand-primary/10 transition-colors duration-700"></div>
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-display font-bold text-white mb-6">Let&apos;s meet in {location.city}.</h2>
              <p className="text-brand-muted text-lg mb-8">Stop relying on Zoom calls with junior account managers. Get a senior partner on your team.</p>
              <Link href="/#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-brand-dark font-bold rounded-lg hover:shadow-[0_0_20px_rgba(0,220,130,0.4)] transition-all transform hover:-translate-y-1 hover:bg-brand-accent">
                Book a Coffee <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
