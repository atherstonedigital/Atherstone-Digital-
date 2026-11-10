// Site content for the design-system route and the Phase 3 pages, taken verbatim from docs/site-plan.md where the
// plan has copy. Apostrophes are set typographically. Anything the plan does not supply is marked as a Phase 1 draft
// (Phase 1 report, section 5) and is pending Dan's approval before launch.
//
// Public repo rule: only figures already public on the live site appear here (16,193 product records, 120+ hours a
// month, £250k monthly revenue within six months via Ranch Creative, £115k+ incremental email revenue). The plan's
// other proof figures stay out of the code until each client gives written permission.

import type {
  AboutSection,
  ComparisonSection,
  ContactDetails,
  ContactSection,
  Faq,
  Hero,
  InsightsSection,
  LeadMagnet,
  Link,
  OffersSection,
  PageMeta,
  ProblemTag,
  ProblemsSection,
  ProofSection,
  SectorsSection,
  SiteFooter,
  SiteNav,
  StepsSection,
} from './types';

// ------------------------------------------------------------------ site and brand

/** The canonical origin: metadataBase in app/layout.tsx and the absolute URLs in structured data. */
export const siteUrl = 'https://www.atherstonedigital.com';

/** The brand book's descriptor, set beneath the wordmark in small where there is room (Wordmark and monogram). */
export const wordmarkDescriptor = 'Ecommerce director for furniture and interiors retailers';

// ------------------------------------------------------------------ contact details
// From components/Footer.tsx and lib/siteConfig.ts on the current site.

export const contact: ContactDetails = {
  email: 'info@atherstonedigital.com',
  emailHref: 'mailto:info@atherstonedigital.com',
  phoneDisplay: '07810 838 129',
  phoneHref: 'tel:+447810838129',
  linkedIn: { label: 'LinkedIn', href: 'https://www.linkedin.com/in/danlegresley/', external: true },
  companyName: 'Atherstone Digital Ltd',
  companyNumber: '14742215',
  calendlyUrl: 'https://calendly.com/dan-atherstonedigital/30min',
};

const bookACall: Link = { label: 'Book a 30-minute call', href: contact.calendlyUrl, external: true };

// ------------------------------------------------------------------ offers and sectors (shared by nav, footer, homepage)

export const offers: OffersSection = {
  eyebrow: 'What I do',
  heading: 'Three ways to work with me',
  offers: [
    {
      id: 'ecommerce-director',
      href: '/ecommerce-director',
      name: 'Ecommerce Director',
      // Eyebrows: Phase 1 draft, from the OfferCard preview; the plan has none.
      eyebrow: 'The retainer',
      summary: 'I run your online operation month to month: site, catalogue, feeds, ads, email, reporting, and any developers or agencies you already have.',
      price: { pre: 'From', amount: '£3,000', post: 'a month' },
      highlight: false,
      readMore: 'Read more',
      readMoreContext: 'about Ecommerce Director',
      page: {
        title: 'Fractional Ecommerce Director for Interiors Retailers | Atherstone Digital',
        description: 'A senior ecommerce director for your furniture or interiors business, two to four days a week on a rolling retainer. Owns the site, catalogue, ads, email and the weekly number. From £3,000 a month.',
        h1: 'An ecommerce director for your business, without the £90k hire',
      },
    },
    {
      id: 'store-health-check',
      href: '/store-health-check',
      name: 'Store and Catalogue Health Check',
      eyebrow: 'Start here',
      summary: 'Two weeks, fixed price. I find what your store, catalogue, tracking and ads are costing you and give you a prioritised 90-day plan.',
      price: { pre: 'From', amount: '£1,500' },
      highlight: true,
      readMore: 'Read more',
      readMoreContext: 'about the Store and Catalogue Health Check',
      page: {
        title: 'Shopify Store & Catalogue Health Check for Interiors Retailers | Atherstone Digital',
        description: 'A two-week, fixed-price audit of your Shopify store, product catalogue, Google Shopping feed, tracking and ads. Prioritised findings, what each problem costs, a 90-day plan. From £1,500.',
        h1: 'Find out what your store and catalogue are costing you. Two weeks, fixed price.',
      },
    },
    {
      id: 'shopify-builds-and-migrations',
      href: '/shopify-builds-and-migrations',
      name: 'Shopify Builds and Migrations',
      eyebrow: 'The project',
      summary: 'A Shopify store built for how furniture and interiors actually sell: variants, lead times, samples, delivery, trade accounts. By someone who’ll still be here after launch.',
      // The homepage gives no price for Builds; this is the Builds page's Pricing line.
      price: { amount: 'Quoted', post: 'after a scoping call' },
      highlight: false,
      readMore: 'Read more',
      readMoreContext: 'about Shopify Builds and Migrations',
      page: {
        title: 'Shopify Store Builds & Migrations for Furniture & Interiors Retailers | Atherstone Digital',
        description: 'Shopify stores built for how furniture and interiors sell: variants, lead times, samples, delivery, trade accounts. Migrations from WooCommerce, Magento and bespoke platforms with rankings intact.',
        h1: 'A Shopify store built by someone who’ll still be here after launch',
      },
    },
  ],
  // Phase 1 draft: the OfferCard README puts one primary button under the row.
  cta: bookACall,
};

export const sectors: SectorsSection = {
  eyebrow: 'Sectors',
  heading: 'Built around how your sector actually sells',
  sectors: [
    {
      slug: 'furniture-retailers',
      href: '/sectors/furniture-retailers',
      navLabel: 'Furniture',
      tileLabel: 'Furniture',
      tag: 'Furniture',
      titleTag: 'Furniture Ecommerce Agency & Director for UK Retailers',
      status: 'launch',
    },
    {
      slug: 'lighting-retailers',
      href: '/sectors/lighting-retailers',
      navLabel: 'Lighting',
      tileLabel: 'Lighting',
      tag: 'Lighting',
      titleTag: 'Ecommerce for Lighting Retailers',
      status: 'hold',
    },
    {
      slug: 'kitchen-and-bathroom-showrooms',
      href: '/sectors/kitchen-and-bathroom-showrooms',
      navLabel: 'Kitchens and Bathrooms',
      tileLabel: 'Kitchens and bathrooms',
      tag: 'Kitchens and bathrooms',
      titleTag: 'Websites & Ecommerce for Kitchen and Bathroom Showrooms',
      status: 'hold',
    },
    {
      slug: 'flooring-and-tile-retailers',
      href: '/sectors/flooring-and-tile-retailers',
      navLabel: 'Flooring and Tiles',
      tileLabel: 'Flooring and tiles',
      tag: 'Flooring and tiles',
      titleTag: 'Ecommerce for Tile & Flooring Retailers',
      status: 'launch',
    },
    {
      slug: 'homeware-and-gift-retailers',
      href: '/sectors/homeware-and-gift-retailers',
      navLabel: 'Homeware and Gifts',
      tileLabel: 'Homeware and gifts',
      tag: 'Homeware and gifts',
      titleTag: 'Ecommerce for Independent Homeware & Gift Retailers',
      status: 'launch',
    },
  ],
};

// ------------------------------------------------------------------ navigation and footer

export const nav: SiteNav = {
  services: {
    label: 'Services',
    items: offers.offers.map((offer) => ({ label: offer.name, href: offer.href })),
  },
  sectors: {
    label: 'Sectors',
    items: sectors.sectors.map((sector) => ({ label: sector.navLabel, href: sector.href })),
  },
  links: [
    { label: 'Results', href: '/results' },
    { label: 'Insights', href: '/insights' },
    { label: 'About', href: '/about' },
  ],
  cta: bookACall,
};

export const footer: SiteFooter = {
  columns: [
    { label: 'Services', links: nav.services.items },
    { label: 'Sectors', links: nav.sectors.items },
    {
      label: 'Company',
      links: [
        { label: 'About', href: '/about' },
        { label: 'Results', href: '/results' },
        { label: 'Insights', href: '/insights' },
        { label: 'Agency or in-house', href: '/agency-or-in-house' },
        { label: 'Contact', href: '/contact' },
        { label: 'Privacy', href: '/privacy' },
        { label: 'Terms', href: '/terms' },
      ],
    },
  ],
  descriptor: 'Ecommerce director for furniture and interiors retailers. UK wide.',
  // The plan's Organization line.
  legal: `${contact.companyName}, company number ${contact.companyNumber}`,
};

// ------------------------------------------------------------------ homepage

export const homeMeta: PageMeta = {
  title: 'Ecommerce Director for Furniture & Interiors Retailers | Atherstone Digital',
  description: 'One senior person runs the online side of your furniture, lighting, kitchen, flooring or homeware business. Site, catalogue, ads, email, reporting. From £3,000 a month. UK wide.',
};

export const hero: Hero = {
  eyebrow: 'For furniture and interiors retailers with a showroom',
  heading: 'Your ecommerce director. Hands on, on a monthly retainer.',
  headingLines: ['Your ecommerce director.', 'Hands on, on a monthly retainer.'],
  lead: 'One senior person runs the online side of your business: the Shopify site, the catalogue and feeds, Google and Meta, email, and the Monday numbers. Accountable for the result, not the deliverables. From £3,000 a month.',
  primary: bookACall,
  secondary: { label: 'See the results', href: '/results' },
  // Flagged in the Phase 1 report: a client count sits against the plan's "Limited roster, stated once, no number".
  fact: 'Currently running online for three UK interiors retailers across five showrooms.',
};

export const proof: ProofSection = {
  heading: 'The numbers',
  // Only the figures already public on the live site. The plan's quieter line is not carried: most of it is
  // permission-gated, and its two public sentences are the 120+ and £250k figures below.
  figures: [
    {
      figure: '16,193',
      line: 'Product records remediated in one furniture catalogue',
      source: 'Existing public claim (plan: What to claim, and where, Catalogue remediation)',
    },
    {
      figure: '120+',
      line: 'Hours a month of manual work automated',
      source: 'Existing public claim (plan: What to claim, and where, Automation)',
    },
    {
      figure: '£250k',
      line: 'Monthly revenue within six months for a home and interiors brand, via Ranch Creative',
      source: 'Existing public claim (plan: What to claim, and where, Ranch client)',
    },
    {
      figure: '£115k+',
      line: 'Incremental email revenue across partner accounts',
      source: 'Existing public claim (plan: Meet Dan credentials, Klaviyo)',
    },
  ],
  testimonials: [
    {
      quote: 'Dan understands premium brands. He doesn’t push for quick wins that compromise the positioning, he thinks carefully about how digital should work for a business like ours, where trust and relationship are everything. Having someone who can hold the strategic picture while also getting into the detail of how the site and our Google presence actually perform is exactly what we needed.',
      name: 'Gary Postlethwaite',
      business: 'Saverys of Broadway',
      // Case-study slugs are Phase 1 proposals; the plan defines none.
      href: '/results/saverys-of-broadway',
    },
    {
      quote: 'The scale of what Dan uncovered in our product catalogue was genuinely shocking. Thousands of product records with the wrong information, taxonomy misclassifications we’d never have found ourselves, alt text that had been wrong since day one. He fixed all of it systematically and quickly.',
      name: 'Gemma Pountney',
      business: 'Xshowhome',
      href: '/results/xshowhome',
    },
    {
      quote: 'Dan is the person we bring in when a client needs serious ecommerce thinking and we need to know it’ll be delivered properly. He operates with real commercial intelligence, not just technical output.',
      name: 'Luke Aling',
      business: 'Ranch Creative',
      href: '/results/ranch-creative',
    },
  ],
  link: { label: 'All results', href: '/results' },
};

export const problems: ProblemsSection = {
  eyebrow: 'Sound familiar?',
  heading: 'The showroom carries the business. The website should be carrying its share.',
  items: [
    {
      title: 'The site is an expensive brochure.',
      body: 'People find you online, then drive to the showroom to buy. Nothing wrong with that, except you can’t see it, measure it or grow it.',
    },
    {
      title: '4,000 products, half of them wrong.',
      body: 'Dimensions missing, variants in a muddle, supplier feeds nobody trusts. Google Shopping disapproves things every week and nobody knows why.',
    },
    {
      title: 'Ad spend goes up, orders don’t.',
      body: 'Google and Meta bring clicks. Sofas take six weeks of thinking. The campaigns aren’t built for that.',
    },
    {
      title: 'The agency built it and left.',
      body: 'Two years ago. Now a banner change costs £180 and takes nine days.',
    },
    {
      title: 'Nobody owns the number.',
      body: 'Everyone has an opinion about the website. Nobody’s job depends on it.',
    },
  ],
};

export const comparison: ComparisonSection = {
  eyebrow: 'Agency, in-house, or a director',
  heading: 'You have three options. Only one of them owns the number.',
  // Phase 1 draft: screen-reader caption, not in the plan.
  caption: 'Agency, full-time head of ecommerce and ecommerce director compared',
  columns: ['Agency', 'Full-time head of ecommerce', 'Ecommerce director (me)'],
  rows: [
    ['Junior account manager day to day', '£70k to £100k all in, plus recruitment', 'Direct access, every task'],
    ['Your work split across 20 clients', 'One person, one skill set, learning your stack', 'Twenty years across the stack'],
    ['£5k to £10k a month for fractured output', 'Six months to hire, three months to exit', 'From £3,000 a month, rolling'],
    ['Sells you more services', 'Needs an agency anyway', 'Owns the P&L line, buys nothing you don’t need'],
  ],
  note: 'Senior work at less than agency cost, because the repetitive jobs are automated rather than billed by the hour.',
  link: { label: 'The full comparison', href: '/agency-or-in-house' },
};

export const howItWorks: StepsSection = {
  heading: 'How it works',
  steps: [
    {
      number: 1,
      title: 'Week one: audit and baseline.',
      body: 'Tech stack, analytics, catalogue, ads, email. Quick wins and structural problems, in writing.',
    },
    {
      number: 2,
      title: 'A 90-day plan with weekly sprints.',
      body: 'Agreed with you, tracked in one place, nothing lost in email.',
    },
    {
      number: 3,
      title: 'I do the work.',
      body: 'Build, fix, launch, run. Not a brief to someone else.',
    },
    {
      number: 4,
      title: 'Every Monday, the numbers.',
      body: 'Weekly report, monthly commercial review, quarterly plan. You always know what online did last week.',
    },
  ],
};

export const meetDan: AboutSection = {
  eyebrow: 'Meet Dan',
  heading: 'Dan Le Gresley',
  // The plan's Licklibrary sentence ends with a revenue growth figure. It is not on the live site, so it stays out of
  // the public repo until Dan clears it; the sentence stops after the role.
  bio: 'Twenty years in ecommerce and digital. Blue chip work for GSK, Amazon, Ecolab, Eli Lilly and The Economist. Seven years as Digital Director at Licklibrary. Now I run online for premium interiors retailers, from a 16,000-product furniture catalogue to a three-showroom group’s weekly trading report. I own the strategy, write the code, run the ads and ship the automations. One person, one invoice, everything connected.',
  credentials: [
    'Shopify Partner since 2014',
    'Google Ads certified',
    'Klaviyo, £115k+ incremental email revenue across partner accounts',
    'n8n automation, 120+ hours a month saved',
  ],
  link: { label: 'Full background', href: '/about' },
};

export const insights: InsightsSection = {
  eyebrow: 'Insights',
  // The plan's line continues "Three latest articles with sector tags.", read as an instruction, not copy.
  heading: 'Thinking for showroom retailers',
  // The plan's weeks 1 to 3. No article is written yet; slugs are Phase 1 proposals.
  articles: [
    {
      week: 1,
      slug: 'why-half-your-furniture-catalogue-never-appears-in-google-shopping',
      href: '/insights/why-half-your-furniture-catalogue-never-appears-in-google-shopping',
      title: 'Why half your furniture catalogue never appears in Google Shopping',
      targetTerm: 'furniture Google Shopping feed',
      sectorTag: 'Furniture',
      linksTo: { sector: 'furniture-retailers', offer: 'store-health-check' },
    },
    {
      week: 2,
      slug: 'ga4-says-one-thing-shopify-says-another',
      href: '/insights/ga4-says-one-thing-shopify-says-another',
      title: 'GA4 says one thing, Shopify says another. Which one do you believe?',
      targetTerm: 'GA4 Shopify revenue mismatch',
      sectorTag: 'Furniture',
      linksTo: { sector: 'furniture-retailers', offer: 'store-health-check' },
    },
    {
      week: 3,
      slug: 'the-showroom-sale-your-website-made',
      href: '/insights/the-showroom-sale-your-website-made',
      title: 'The showroom sale your website made and never got credit for',
      targetTerm: 'showroom and online store attribution',
      sectorTag: 'Furniture',
      linksTo: { sector: 'furniture-retailers', offer: 'ecommerce-director' },
    },
  ],
};

// The confirmation links: two case studies, so the wait is not dead time (plan, /contact).
const caseStudyLinks: Link[] = [
  { label: 'Xshowhome: 16,193 product records remediated', href: '/results/xshowhome' },
  { label: 'Saverys of Broadway: ecommerce director across three showrooms', href: '/results/saverys-of-broadway' },
];

export const leadMagnet: LeadMagnet = {
  // The plan writes it in title case; headings are sentence case (brand book), as in Phase 1.
  heading: 'The showroom retailer’s online scorecard',
  description: 'The seven numbers to check every Monday morning, and what each one is telling you about the website. Two pages, no fluff, used by the retailers I work with.',
  netlifyFormName: 'scorecard',
  field: {
    name: 'email',
    label: 'Email',
    type: 'email',
    required: true,
    autoComplete: 'email',
    inputMode: 'email',
    // Phase 1 drafts.
    messages: {
      required: 'Enter your email address, so I can send you the scorecard.',
      invalid: 'Enter an email address with an @ and a domain, like name@yourshop.co.uk.',
    },
  },
  submit: 'Send me the scorecard',
  // Phase 1 draft. "Within one working day" is open against the plan's decision on scorecard delivery.
  confirmation: {
    heading: 'Thank you.',
    body: 'I’ll email the scorecard to {email} within one working day.',
    followUpLead: 'While you wait, two of the retailers I work with:',
    links: caseStudyLinks,
  },
};

export const contactSection: ContactSection = {
  eyebrow: 'Contact',
  heading: 'Tell me about your business',
  intro: 'If you’d like to talk, send a quick brief. Three to five lines is plenty.',
  netlifyFormName: 'brief',
  // The plan's fields in its order. "Business name and website" is a fieldset with two inputs, because one field
  // cannot carry both autocomplete="organization" and type="url" (Phase 1). Select options keep the plan's values,
  // capitalised as option labels. Placeholders and messages are Phase 1 drafts.
  fields: [
    {
      name: 'name',
      label: 'Name',
      type: 'text',
      required: true,
      autoComplete: 'name',
      messages: { required: 'Enter your name.' },
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      autoComplete: 'email',
      inputMode: 'email',
      messages: {
        required: 'Enter your email address, so I can reply.',
        invalid: 'Enter an email address with an @ and a domain, like name@yourshop.co.uk.',
      },
    },
    {
      legend: 'Business name and website',
      fields: [
        { name: 'business', label: 'Business name', type: 'text', required: false, autoComplete: 'organization' },
        {
          name: 'website',
          label: 'Website',
          type: 'url',
          required: false,
          autoComplete: 'url',
          inputMode: 'url',
          messages: { invalid: 'Enter the address of your online store, starting with https://' },
        },
      ],
    },
    {
      name: 'showrooms',
      label: 'Number of showrooms',
      type: 'select',
      required: false,
      placeholder: 'Choose one',
      options: ['0', '1', '2 to 3', '4+'],
    },
    {
      name: 'platform',
      label: 'Platform',
      type: 'select',
      required: false,
      placeholder: 'Choose one',
      options: ['Shopify', 'WooCommerce', 'Magento', 'Other', 'Not sure'],
    },
    {
      name: 'turnover',
      label: 'Approximate annual turnover',
      type: 'select',
      required: false,
      placeholder: 'Choose one',
      options: ['Under £1M', '£1M to £3M', '£3M to £10M', '£10M+'],
    },
    {
      name: 'first',
      label: 'What’s the one thing you’d want fixed first?',
      type: 'textarea',
      required: true,
      rows: 4,
      messages: { required: 'Write the one thing you’d want fixed first. A line or two is enough.' },
    },
  ],
  submit: 'Send brief',
  alternative: { lead: 'or', link: { label: 'book a 30-minute call', href: contact.calendlyUrl, external: true } },
  // Phase 1 drafts, except failed, which is new in Phase 2 (the brand book asks for a plain message on failure).
  status: {
    sending: 'Sending',
    oneInvalid: 'One field needs an answer before this can send.',
    manyInvalid: '{count} fields need an answer before this can send.',
    failed: 'That did not send. Check your connection and try again, or email me at info@atherstonedigital.com.',
  },
  confirmation: {
    heading: 'Thank you. Your brief is with me.',
    body: 'I read every brief myself and will reply to {email} with a few questions or a time to talk.',
    followUpLead: 'While you wait, two of the retailers I work with:',
    links: caseStudyLinks,
  },
};

// ------------------------------------------------------------------ case studies

/**
 * The Results index's problem filters, in the plan's order (/results: "filterable by sector and by problem (catalogue,
 * feeds, tracking, paid, email, build)"). The plan writes them in lower case; as labels they take a capital.
 */
export const problemTags: Record<ProblemTag, string> = {
  catalogue: 'Catalogue',
  feeds: 'Feeds',
  tracking: 'Tracking',
  paid: 'Paid',
  email: 'Email',
  build: 'Build',
};

// ------------------------------------------------------------------ FAQ

export const ecommerceDirectorFaq: Faq = {
  page: '/ecommerce-director',
  items: [
    {
      question: 'How is this different from an agency?',
      answer: 'An agency sells you services and staffs them with the cheapest person who can do them. I own the result and do the work myself. If the right answer is to spend less, I’ll say so.',
    },
    {
      question: 'How is it different from a freelancer?',
      answer: 'A freelancer takes tickets. I set the priorities, run the plan and report to you on the number. The building happens inside that.',
    },
    {
      question: 'Can you work alongside the agency we already use?',
      answer: 'Yes, and it’s common. I direct the work so it joins up, and I’ll tell you if you’re paying for something you don’t need.',
    },
    {
      question: 'How many clients do you take?',
      answer: 'A small roster, by design. I take on work where the data and the people in the business make the result achievable.',
    },
    {
      question: 'We’re not on Shopify. Does that matter?',
      answer: 'It matters for the retainer, because the stack is where the speed comes from. Most retailers I work with move to Shopify first; see Builds and Migrations.',
    },
    {
      question: 'What does “fractional ecommerce director” mean?',
      answer: 'A director-level person who works for your business part of the week, on retainer, rather than as an employee. Same accountability, a third of the cost.',
    },
  ],
};
