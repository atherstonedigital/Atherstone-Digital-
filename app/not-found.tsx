import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function NotFound() {
  return (
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
  );
}
