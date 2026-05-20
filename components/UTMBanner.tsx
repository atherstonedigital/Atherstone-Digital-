'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const SOURCES: Record<string, { greeting: string }> = {
  linkedin: { greeting: 'Welcome from LinkedIn. Skip the pitch. Here’s what I do.' },
};

export function UTMBanner() {
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const source = (params.get('utm_source') || '').toLowerCase();
      const entry = SOURCES[source];
      if (!entry) return;
      if (sessionStorage.getItem(`utm-banner-dismissed:${source}`)) return;
      setMessage(entry.greeting);
    } catch {
      // ignore, sessionStorage or URL access can throw in privacy modes
    }
  }, []);

  if (!message) return null;

  const dismiss = () => {
    try {
      const source = (new URLSearchParams(window.location.search).get('utm_source') || '').toLowerCase();
      sessionStorage.setItem(`utm-banner-dismissed:${source}`, '1');
    } catch {
      // ignore
    }
    setMessage(null);
  };

  return (
    <div className="bg-brand-primary text-brand-dark relative z-[60]">
      <div className="container mx-auto px-6 py-2 flex items-center justify-between gap-3 text-sm">
        <p className="font-medium leading-snug">
          {message}{' '}
          <Link href="/results" className="underline underline-offset-2 font-bold">See the work</Link>.
        </p>
        <button
          type="button"
          aria-label="Dismiss"
          onClick={dismiss}
          className="shrink-0 p-1 rounded hover:bg-brand-dark/10 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
