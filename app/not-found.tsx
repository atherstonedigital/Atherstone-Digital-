import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { siteConfig } from '@/lib/siteConfig';
import { LegacyShell, legacyMetadata, legacyViewport } from './(legacy)/legacy-shell';

// Unmatched URLs render here inside the root layout only, outside app/(legacy), so the page wraps itself in the
// legacy shell and takes the legacy metadata to keep its old look and head until Phase 3 rebuilds it. The title is
// absolute because the root layout's template would otherwise add the brand suffix a second time.
export const metadata: Metadata = { ...legacyMetadata, title: { absolute: siteConfig.homepageTitle } };
export const viewport = legacyViewport;

export default function NotFound() {
  return (
    <LegacyShell>
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-6">
      <div className="text-center max-w-lg">
        <div className="font-display text-8xl font-bold text-brand-primary mb-4">404</div>
        <h1 className="font-display text-3xl md:text-4xl font-bold text-brand-text mb-4">
          Page Not Found.
        </h1>
        <p className="text-brand-muted text-lg mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-accent transition-colors"
          >
            Back to Home <ArrowRight size={18} />
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-4 bg-brand-text/[0.03] text-brand-text border border-brand-border hover:border-brand-primary/30 font-medium rounded-xl transition-all"
          >
            View Services
          </Link>
        </div>
      </div>
    </div>
    </LegacyShell>
  );
}
