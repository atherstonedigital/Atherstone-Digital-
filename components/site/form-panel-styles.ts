import { cn } from '@/lib/utils';

// The raised panel's classes, in a module without 'use client'. components/site/ContactForm.tsx is a client module, so
// a function exported from it reaches a server component as a client reference, not a function: CTABand (a server
// component) imports it from here instead. ContactForm re-exports it for LeadMagnet.

/**
 * The raised panel the forms and the band's actions sit in: paper-raised, a rule border, radius-0, space-6 padding, no
 * shadow (brand book, Colour). On the green band its border takes paper-raised, so no hairline shows against the band
 * (Phase 1). Short screens from 900px wide (1024x768, 1280x800) tighten its block padding, as Phase 1 did to keep the
 * contact section to one screen.
 */
export function formPanelClasses(ground: 'paper' | 'band' = 'paper') {
  return cn(
    'rounded-radius-0 border bg-paper-raised p-space-6 text-ink',
    '[@media(min-width:900px)_and_(max-height:860px)]:py-space-4',
    ground === 'band' ? 'border-paper-raised' : 'border-rule',
  );
}
