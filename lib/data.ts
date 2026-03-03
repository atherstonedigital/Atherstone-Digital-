export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  outcome: string;
  longDescription: string;
  features: string[];
  slug: string;
  seoTitle: string;
  seoDescription: string;
}

export interface LocationItem {
  city: string;
  slug: string;
  distance: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  uniqueContent: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  category: string;
  readTime: string;
  content: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'shopify',
    title: 'Shopify Store Builds',
    description: 'High-converting, scalable stores. Migrations, custom themes, and headless architectures designed for speed and sales.',
    outcome: 'Increased conversion & speed',
    longDescription: 'We build high-performance, scalable Shopify stores designed for growth. Whether you are migrating from a legacy platform or upgrading your existing stack, our builds prioritise speed, conversion, and operational efficiency.',
    features: [
      'Custom Theme Development (Liquid & Headless)',
      'Complex Platform Migrations (Magento, Woo, BigCommerce)',
      'Checkout Extensibility & Customisation',
      'Speed Performance Optimisation (90+ Core Vitals)',
    ],
    slug: 'shopify-plus-architecture',
    seoTitle: 'Shopify Plus Consultant & Developer | Fractional Ecommerce Director',
    seoDescription: 'Expert Shopify Plus architecture and development. I replace agencies with a senior fractional partner model to build high-converting stores.',
  },
  {
    id: 'cro',
    title: 'CRO & Optimisation',
    description: 'Data-driven testing and UX improvements to turn more visitors into customers. We analyse, hypothesise, and validate.',
    outcome: '+20-30% Revenue/Visitor',
    longDescription: 'Stop guessing and start converting. We use data-driven insights to identify friction points in your user journey and implement tests that lift revenue per visitor.',
    features: [
      'A/B Testing & Multivariate Experimentation',
      'Heatmap & User Session Analysis',
      'UX/UI Design Improvements',
      'Funnel Drop-off Analysis & Fixes',
    ],
    slug: 'conversion-rate-optimisation',
    seoTitle: 'Ecommerce CRO Consultant | Increase Revenue Per Visitor',
    seoDescription: 'Data-driven Conversion Rate Optimisation services. As a fractional director, I implement A/B tests that directly improve your bottom line.',
  },
  {
    id: 'ppc',
    title: 'Paid Media & PPC',
    description: 'Performance marketing across Google & Meta. We structure campaigns for ROAS and scale profitable acquisition channels.',
    outcome: 'Lower CAC, Higher ROAS',
    longDescription: 'Don\'t just spend budget, invest it. Our paid media strategies across Google and Meta are engineered to lower CAC and maximise ROAS through granular targeting, creative testing, and rigorous bid management.',
    features: [
      'Google Ads (Search, Shopping, Performance Max)',
      'Meta Ads (Facebook & Instagram) Scaling',
      'Retargeting & Dynamic Product Ads',
      'Attribution Modelling & Server-Side Tracking',
    ],
    slug: 'paid-media-growth',
    seoTitle: 'Fractional Paid Media Director | Google & Meta Ads Expert',
    seoDescription: 'Senior-level PPC management without the agency fees. I engineer Google and Meta campaigns for profitability and ROAS.',
  },
  {
    id: 'automation',
    title: 'n8n Automation',
    description: 'Streamline operations by connecting your apps. Automated inventory syncs, customer tagging, and reporting workflows.',
    outcome: 'Saved 100+ hours/mo',
    longDescription: 'Eliminate repetitive tasks and human error. We build custom n8n workflows that connect your tech stack, ensuring data flows seamlessly between Shopify, your ERP, Marketing tools, and Slack.',
    features: [
      'Inventory & Order Syncing across platforms',
      'Automated Customer Tagging & Segmentation',
      'Custom Reporting & Daily Slack Dashboards',
      'Review & UGC Management Workflows',
    ],
    slug: 'ecommerce-automation',
    seoTitle: 'Ecommerce Automation Consultant | n8n & Shopify Flow',
    seoDescription: 'Automate your ecommerce operations. I build custom n8n workflows to sync data, manage inventory, and report on profit automatically.',
  },
  {
    id: 'feeds',
    title: 'Feed Optimisation',
    description: 'Google Merchant Center & catalogue management to ensure your products appear correctly and competitively.',
    outcome: 'Flawless channel data',
    longDescription: 'Your product feed is the foundation of your shopping campaigns. We optimise data attributes to ensure your products show up for the right searches at the lowest possible cost.',
    features: [
      'Google Merchant Center Audits & Fixes',
      'Product Title & Description SEO',
      'Custom Label Strategy for Bidding',
      'Multi-Currency & Multi-Language Feeds',
    ],
    slug: 'google-feed-management',
    seoTitle: 'Google Shopping Feed Consultant | Merchant Center Expert',
    seoDescription: 'Fix disapprovals and optimise titles for Google Shopping. Expert feed management to lower CPC and increase visibility.',
  },
  {
    id: 'retention',
    title: 'Lifecycle Marketing',
    description: 'Email & SMS automation flows (Klaviyo) that increase Customer Lifetime Value and repeat purchase rates.',
    outcome: 'Increased LTV',
    longDescription: 'Acquisition is expensive; retention is profitable. We build sophisticated email and SMS automation flows that nurture customers from their first visit to their tenth purchase.',
    features: [
      'Advanced Klaviyo Flow Setup',
      'Customer Segmentation Strategy',
      'SMS Marketing & Conversational Flows',
      'Win-back & VIP Retention Campaigns',
    ],
    slug: 'retention-marketing',
    seoTitle: 'Fractional Retention Director | Klaviyo & Email Strategy',
    seoDescription: 'Increase LTV with expert lifecycle marketing. I build automated Klaviyo flows that turn one-time buyers into loyal customers.',
  },
  {
    id: 'llm',
    title: 'LLM Search Readiness',
    description: 'Future-proof your store for AI search. Optimising structured data and content for the next generation of discovery.',
    outcome: 'First-mover advantage',
    longDescription: 'The way people search is changing. We optimise your store\'s structure and content to ensure your brand is understood and recommended by AI search engines like Gemini, ChatGPT, and Perplexity.',
    features: [
      'Structured Data (Schema) Optimisation',
      'Entity-Based SEO Strategy',
      'Content Engineering for AI Answers',
      'Knowledge Graph Authority Building',
    ],
    slug: 'ai-search-optimization',
    seoTitle: 'LLM & AI Search Optimization Consultant | GEO Strategy',
    seoDescription: 'Prepare your Shopify store for Google Gemini and ChatGPT search. I implement advanced schema and entity strategies for AI visibility.',
  },
  {
    id: 'dev',
    title: 'Technical Execution',
    description: 'Custom app development, script editor logic, and checkout extensibility for complex business requirements.',
    outcome: 'Solved complex logic',
    longDescription: 'Have a complex requirement? We write the code to solve it. From custom Shopify Functions to complex API integrations, we handle the heavy technical lifting.',
    features: [
      'Shopify Functions & Script Editor',
      'Custom Private App Development',
      'Third-Party API Integrations',
      'Complex Bundle & Discount Logic',
    ],
    slug: 'technical-development',
    seoTitle: 'Senior Shopify Developer & Technical Consultant',
    seoDescription: 'Complex Shopify development without the agency bloat. Custom apps, checkout functions, and API integrations handled by a senior expert.',
  },
];

export const LOCATIONS_DATA: LocationItem[] = [
  {
    city: 'Atherstone',
    slug: 'ecommerce-agency-atherstone',
    distance: 'HQ',
    seoTitle: 'Ecommerce Agency Atherstone | Shopify Growth Partner',
    seoDescription: 'Fractional Ecommerce Director based in Atherstone (CV9). Local Shopify strategy and growth for Midlands brands. Book a strategy coffee at my HQ.',
    heroTitle: 'Atherstone',
    uniqueContent: 'Atherstone is home base. My studio is based in CV9, right in the heart of North Warwickshire. If you\'re a local brand looking for a senior ecommerce partner who truly understands the Midlands market — someone you can have a coffee with, not a Zoom call — this is where it starts. Being embedded in the local business community means I\'m genuinely invested in the growth of Atherstone brands.',
  },
  {
    city: 'Birmingham',
    slug: 'shopify-expert-birmingham',
    distance: '40 mins',
    seoTitle: 'Shopify Expert Birmingham | Fractional Ecommerce Director',
    seoDescription: 'Looking for a Shopify Expert in Birmingham? I provide Fractional Director services to Birmingham brands. Strategy, Dev & Growth with face-to-face support.',
    heroTitle: 'Birmingham',
    uniqueContent: 'Birmingham is the UK\'s second city and its ecommerce scene is exploding. From the Jewellery Quarter to Digbeth\'s creative district, I work with Birmingham brands that are ready to scale beyond the region. At just 40 minutes from my Atherstone HQ, face-to-face strategy sessions are the norm — not the exception. Whether you\'re in the NEC corridor or the city centre, I\'ll be there.',
  },
  {
    city: 'Tamworth',
    slug: 'ecommerce-consultant-tamworth',
    distance: '15 mins',
    seoTitle: 'Ecommerce Consultant Tamworth | Shopify Strategy',
    seoDescription: 'Senior Ecommerce Consultant serving Tamworth brands. I replace agencies with a fractional partner model. 15 mins from Ventura Park.',
    heroTitle: 'Tamworth',
    uniqueContent: 'Tamworth is practically on my doorstep — 15 minutes from my Atherstone studio. The town has a strong retail and manufacturing heritage, and I work with several Tamworth-based brands making their move into direct-to-consumer ecommerce. If you\'re an established local business looking to build or scale an online revenue channel, I offer a level of proximity and accountability that no London agency can match.',
  },
  {
    city: 'Leicester',
    slug: 'ecommerce-agency-leicester',
    distance: '35 mins',
    seoTitle: 'Ecommerce Agency Leicester | Shopify Plus Partner',
    seoDescription: 'Don\'t hire a remote agency. Hire a Fractional Ecommerce Director who can meet you in Leicester. Strategy, CRO, and Development for Leicestershire brands.',
    heroTitle: 'Leicester',
    uniqueContent: 'Leicester has one of the UK\'s most vibrant and diverse SME communities — particularly in fashion, food, and manufacturing. I\'ve worked with Leicester brands navigating the complexities of multi-currency stores, international shipping logic, and complex product catalogues. At 35 minutes away, I can be in your office for a quarterly strategy review without charging you travel fees.',
  },
  {
    city: 'Coventry',
    slug: 'shopify-agency-coventry',
    distance: '30 mins',
    seoTitle: 'Shopify Agency Coventry | Ecommerce Strategy',
    seoDescription: 'Expert Shopify growth for Coventry brands. I provide C-suite strategy and technical execution. Local support, global results.',
    heroTitle: 'Coventry',
    uniqueContent: 'Coventry is a city reinventing itself — and its business community reflects that ambition. I work with Coventry brands that are serious about ecommerce, from University of Warwick spinouts to established retailers looking to grow their DTC channel. With Coventry just 30 minutes from my studio, quarterly in-person reviews are standard, not a premium add-on.',
  },
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'why-fractional-ecommerce-director-beats-agency',
    title: 'Why a Fractional Ecommerce Director Beats a Retainer Agency in 2025',
    date: '2025-03-15',
    excerpt: 'The traditional agency model is broken for scaling Shopify brands. Here\'s the commercial case for going fractional — and what you actually get for your money.',
    category: 'Strategy',
    readTime: '7 min read',
    content: `
## The Problem With Agencies

Most ecommerce brands on Shopify are paying £3,000–£8,000/month to an agency and getting a rotating cast of junior account managers. The senior strategist who sold you the contract? You'll see them at the quarterly review. Maybe.

The agency model is structurally misaligned with your interests. Their incentive is to keep you retained — not to solve problems so efficiently that you no longer need them.

## What Fractional Actually Means

A fractional director is not a consultant who writes decks. It's a senior operator who owns a defined part of your business — in this case, your ecommerce P&L — and executes alongside your team.

With Atherstone Digital, that means:

- **Weekly sprint calls** with a set agenda and defined deliverables
- **Direct Slack access** — no account manager layer
- **Technical execution** — I build the things we agree need building
- **Commercial accountability** — my fee is tied to your growth trajectory

## The Numbers

A full-time ecommerce director costs £80,000–£120,000/year in salary alone. Add NI, pension, benefits and you're at £100k+. A good agency retainer runs £5,000–£10,000/month — that's £60k–£120k/year for work that's split across 10 other clients.

A fractional engagement with Atherstone Digital starts at £3,000/month. You get senior strategy and technical execution, without the overhead.

## Is Fractional Right For You?

The fractional model works best for brands doing £500k–£5M in annual ecommerce revenue who:

- Have a product that works and a customer who loves it
- Are being held back by technical debt, poor attribution, or lack of strategy
- Can't justify a full-time director hire yet
- Are frustrated with agency account management

If that's you, [book a strategy call](/fractional-ecommerce-director).
    `,
  },
  {
    slug: 'shopify-seo-guide-2025',
    title: 'The Shopify SEO Playbook for 2025: From Zero to Organic Revenue',
    date: '2025-04-02',
    excerpt: 'Organic search remains one of the highest-ROI channels for Shopify brands — if you do it properly. Here\'s the complete playbook we use with our partners.',
    category: 'SEO',
    readTime: '12 min read',
    content: `
## Why Shopify SEO Is Different

Shopify has quirks that trip up most SEO guides written for WordPress. Duplicate content from collections, faceted navigation issues, and the platform's inflexibility around URL structures are all real problems that need specific solutions.

This guide covers what we actually do for our Shopify partners — not generic advice.

## Technical Foundation First

Before any content work, the technical foundation must be solid:

**1. Canonical tags on collection pages**
Shopify generates duplicate URLs for products accessed through different collections. Make sure your theme implements canonical tags correctly, or you'll have Google splitting link equity across duplicate pages.

**2. Index/noindex strategy for faceted navigation**
Filter and sort URLs (e.g. ?sort_by=price-ascending) should be noindexed. These create thousands of near-duplicate URLs that dilute your crawl budget.

**3. Schema markup**
Every product page should have Product schema. Every collection should have ItemList. Your homepage and about page should carry Organization and LocalBusiness schema.

**4. Core Web Vitals**
Shopify themes have gotten heavier over the years. A bloated app stack — loyalty programmes, review widgets, bundle builders — can destroy your LCP score. Audit your apps quarterly.

## Content Architecture

The biggest missed opportunity for Shopify brands is category page content. Most have thin collection pages with just product grids. Google has no idea what to rank them for.

For each major collection:
- Write 200-300 words of genuine, helpful buying guide content above the fold
- Use H2s naturally incorporating your target keywords
- Add an FAQ section (and FAQ schema)

## The Link Building Reality

For most regional and DTC brands, link building comes from:
- Industry press and trade publications
- Supplier/partner link exchanges
- Local business directories and chambers of commerce
- Creating genuinely useful content that earns links naturally

Don't buy links. Don't use PBNs. The risk/reward is terrible in 2025.

## Measuring What Matters

Set up Google Search Console from day one. The queries report will tell you what Google thinks your pages are about — often surprising.

Track:
- Organic sessions (non-branded)
- Revenue from organic channel (in GA4)
- Average position for target keywords
- Core Web Vitals pass rate

We run monthly SEO reviews for all our fractional partners. [Get in touch](/#contact) if you'd like us to audit your Shopify store.
    `,
  },
  {
    slug: 'n8n-shopify-automation-workflows',
    title: '5 n8n Workflows Every Shopify Brand Should Be Running',
    date: '2025-04-20',
    excerpt: 'Automation isn\'t just for enterprise. Here are five n8n workflows we build for every Shopify partner — saving hundreds of hours and eliminating manual errors.',
    category: 'Automation',
    readTime: '9 min read',
    content: `
## Why n8n Over Zapier or Make?

n8n is self-hostable, significantly cheaper at scale, and more powerful for complex conditional logic. For Shopify brands doing serious volume, the ability to run complex multi-branch workflows without paying per-operation is a game changer.

We self-host n8n for all our automation work and connect it directly to Shopify's API.

## Workflow 1: Daily P&L Dashboard to Slack

Every morning at 8am, a workflow pulls:
- Yesterday's revenue and orders from Shopify
- Ad spend from Google Ads API
- Email revenue from Klaviyo
- Refunds and returns

It calculates contribution margin and posts a formatted summary to a Slack channel. No spreadsheet, no manual pull — the team wakes up knowing the numbers.

## Workflow 2: High-Value Customer Tagging

When a customer places their third order, or their cumulative spend crosses a threshold (e.g. £500), n8n fires and:
- Tags them as 'VIP' in Shopify
- Adds them to a Klaviyo VIP segment
- Creates a task in your CRM to send a personal thank-you

This powers personalised experiences without manual intervention.

## Workflow 3: Review Request Sequencing

Post-purchase, n8n waits for the estimated delivery date (pulled from your fulfilment partner's API), then triggers a Klaviyo review request exactly 3 days after delivery — not 3 days after dispatch.

This simple change typically improves review response rates by 30-40%.

## Workflow 4: Inventory Alert System

When any SKU's available inventory drops below a set threshold, n8n sends an alert to Slack and optionally creates a purchase order draft in your ERP or sends an email to your supplier.

No more stockouts discovered only when orders start failing.

## Workflow 5: Subscription Churn Prevention

For brands with subscription products, n8n monitors upcoming renewals and, 7 days before a renewal where the customer hasn't purchased anything else in 90+ days, triggers a Klaviyo 'at risk' flow with a personalised retention offer.

## Getting Started

n8n has a cloud version if you don't want to self-host. The learning curve is real but manageable — the drag-and-drop interface is intuitive once you understand the node model.

We build and manage all automation infrastructure for our fractional partners. If you want these workflows running in your stack, [let's talk](/fractional-ecommerce-director).
    `,
  },
];
