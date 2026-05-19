const ctas = {
  primary: {
    label: 'Book a 30-minute call',
    href: 'https://calendly.com/dan-atherstonedigital/30min',
  },
  secondary: {
    label: 'Send me a brief',
    href: '/#contact',
  },
} as const;

export const siteConfig = {
  name: 'Atherstone Digital',
  entity:
    'Atherstone Digital is a fractional ecommerce director service for Shopify brands doing £500k–£5M in annual revenue, based in Warwickshire, UK.',
  capacity: {
    total: 3,
    filled: 2,
    nextIntake: 'April 2026',
    get remaining() {
      return this.total - this.filled;
    },
  },
  ctas,
  // Back-compat alias: existing references to siteConfig.cta resolve to the primary CTA.
  cta: {
    label: ctas.primary.label,
    url: ctas.primary.href,
  },
  pricing: {
    retainerFrom: '£3,000',
    retainerRange: '£3,000 to £5,000',
  },
  revenueBand: '£500k–£5M',
  location: {
    town: 'Atherstone',
    county: 'Warwickshire',
    country: 'United Kingdom',
    postcodePrefix: 'CV9',
  },
};
