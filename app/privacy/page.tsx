import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy | Atherstone Digital',
  description: 'Privacy Policy for Atherstone Digital. Learn how we collect, use, and protect your data under UK GDPR.',
};

export default function PrivacyPage() {
  return (
    <div className="pt-40 pb-20 bg-brand-dark min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        <Link href="/" className="mb-8 text-brand-primary hover:text-white transition-colors flex items-center gap-2 font-medium">
          ← Back to Home
        </Link>
        <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">Privacy Policy</h1>
        <p className="text-brand-muted mb-12">Last Updated: October 2023</p>
        <div className="space-y-8 text-brand-text/90 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p>
              Atherstone Digital (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or engage with our services. We are registered in the United Kingdom, Company Number 14742215.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Data We Collect</h2>
            <p className="mb-4">We may collect personal identification information from you in a variety of ways, including when you visit our site, fill out a form, and in connection with other activities, services, features, or resources we make available on our Site.</p>
            <ul className="list-disc pl-5 space-y-2 text-brand-muted">
              <li><strong className="text-white/80">Personal Identity Data:</strong> Name, email address, phone number, company name.</li>
              <li><strong className="text-white/80">Technical Data:</strong> IP address, browser type, operating system, and usage details via cookies.</li>
              <li><strong className="text-white/80">Marketing Data:</strong> Your preferences in receiving marketing from us.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Data</h2>
            <p>We use the collected data for the following purposes:</p>
            <ul className="list-disc pl-5 space-y-2 text-brand-muted mt-2">
              <li>To provide and maintain our Service.</li>
              <li>To notify you about changes to our Service.</li>
              <li>To provide customer support.</li>
              <li>To gather analysis or valuable information so that we can improve our Service.</li>
              <li>To monitor the usage of our Service.</li>
              <li>To detect, prevent and address technical issues.</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Retention</h2>
            <p>
              We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations, resolve disputes, and enforce our legal agreements and policies.
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:{' '}
              <a href="mailto:info@atherstonedigital.com" className="text-brand-primary hover:underline">info@atherstonedigital.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
