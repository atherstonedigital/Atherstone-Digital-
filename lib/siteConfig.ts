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
  descriptor: 'Shopify ecommerce consultant',
  titleSuffix: 'Shopify Ecommerce Consultant UK',
  homepageTitle: 'Shopify Ecommerce Consultant for DTC Brands | Atherstone Digital',
  entity:
    'Atherstone Digital is a Shopify ecommerce consultancy for brands doing £500k to £5M in annual revenue, based in Warwickshire, UK. One senior operator runs the whole Shopify ecommerce function, for less than an agency.',
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
  revenueBand: '£500k to £5M',
  location: {
    town: 'Atherstone',
    county: 'Warwickshire',
    country: 'United Kingdom',
    postcodePrefix: 'CV9',
  },
};

// Page titles render as "[Page title] | Shopify Ecommerce Consultant UK".
// The homepage uses siteConfig.homepageTitle directly.
export function pageTitle(title: string): string {
  return `${title} | ${siteConfig.titleSuffix}`;
}
