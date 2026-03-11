import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service | Atherstone Digital',
  description: "Terms of Service for Atherstone Digital's fractional ecommerce consultancy and development services.",
  alternates: {
    canonical: 'https://atherstonedigital.com/terms/',
  },
};

export default function TermsPage() {
  return (
    <div className="pt-40 pb-20 bg-brand-dark min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="mb-8 text-brand-primary hover:text-white transition-colors flex items-center gap-2 font-medium">
          ← Back to Home
        </Link>
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">Terms of Service</h1>
        <p className="text-brand-muted mb-12">Effective Date: October 2023</p>
        <div className="space-y-8 text-brand-text/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Agreement to Terms</h2>
            <p>
              These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf of an entity (&ldquo;you&rdquo;) and Atherstone Digital (&ldquo;we,&rdquo; &ldquo;us&rdquo; or &ldquo;our&rdquo;), concerning your access to and use of our website and services.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Services</h2>
            <p>
              Atherstone Digital provides fractional ecommerce growth consultancy, development, and marketing services. The specific deliverables are defined in individual statements of work or service agreements with our clients.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property Rights</h2>
            <p>
              Unless otherwise indicated, the Site and our services are our proprietary property and all source code, databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site (collectively, the &ldquo;Content&rdquo;) and the trademarks, service marks, and logos contained therein (the &ldquo;Marks&rdquo;) are owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Limitation of Liability</h2>
            <p>
              In no event will we or our directors, employees, or agents be liable to you or any third party for any direct, indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost revenue, loss of data, or other damages arising from your use of the site or services.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Governing Law</h2>
            <p>
              These Terms shall be governed by and defined following the laws of the United Kingdom. Atherstone Digital and yourself irrevocably consent that the courts of the United Kingdom shall have exclusive jurisdiction to resolve any dispute which may arise in connection with these terms.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Contact Information</h2>
            <p>
              Questions about the Terms of Service should be sent to us at:{' '}
              <a href="mailto:info@atherstonedigital.com" className="text-brand-primary hover:underline">info@atherstonedigital.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
