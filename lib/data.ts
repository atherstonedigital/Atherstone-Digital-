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
    seoTitle: 'Shopify Plus Store Builds | Custom Theme Architecture',
    seoDescription: 'Custom Shopify Plus theme builds and migrations. High-converting, fast, and architected for scale. Based in the UK, serving globally.',
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
    seoTitle: 'Shopify CRO Consultant UK | +20-30% Revenue Per Visitor',
    seoDescription: 'Data-driven CRO for Shopify stores. Average +22% CVR improvement across our partner brands. We test, validate and implement.',
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
    seoTitle: 'Shopify Paid Media & PPC | Google & Meta Ads',
    seoDescription: 'Performance Google & Meta campaigns for Shopify brands. Lower CAC, higher ROAS — managed by a certified Shopify growth director.',
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
    seoTitle: 'Shopify n8n Automation | Save 100+ Hours/Month',
    seoDescription: 'n8n automation workflows for Shopify brands. Connect your stack, eliminate manual tasks, save 100+ hours/month.',
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
    seoTitle: 'Google Feed Management | Merchant Centre Optimisation',
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
    seoTitle: 'Klaviyo Lifecycle Marketing | Email & SMS for Shopify',
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
    seoTitle: 'LLM Search Readiness | AI SEO for Shopify Brands',
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
    seoTitle: 'Shopify Technical Development | Custom Apps & Checkout',
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

If that's you, [book a strategy call](/fractional-ecommerce-director). You can also [see why fractional beats agencies on cost](/why-fractional).
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
Every product page should have Product schema. Every collection should have ItemList. Your homepage and about page should carry Organization and LocalBusiness schema. This is also the foundation of [AI search readiness](/services/ai-search-optimization).

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

We run monthly SEO reviews for all our [fractional partners](/fractional-ecommerce-director). [Get in touch](/#contact) if you'd like us to audit your Shopify store's [conversion rate](/services/conversion-rate-optimisation) and organic visibility.
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

We build and manage all [automation infrastructure](/services/ecommerce-automation) for our fractional partners. Pair these workflows with a solid [Klaviyo retention strategy](/services/retention-marketing) for maximum impact. If you want these workflows running in your stack, [let's talk](/fractional-ecommerce-director).
    `,
  },
  {
    slug: 'fractional-ecommerce-director-vs-consultant',
    title: 'Fractional Ecommerce Director vs Ecommerce Consultant: What\'s the Difference?',
    date: '2025-05-10',
    excerpt: 'Both sound similar, but the engagement model, accountability, and outcomes are fundamentally different. Here\'s how to choose the right one for your Shopify brand.',
    category: 'Strategy',
    readTime: '8 min read',
    content: `
## The Terms Are Used Interchangeably — They Shouldn't Be

If you're a Shopify brand searching for senior ecommerce help, you'll find two common titles: **Ecommerce Consultant** and **Fractional Ecommerce Director**. Most people treat them as synonyms. They're not.

The difference isn't just semantic — it changes the accountability model, the type of work delivered, and the commercial outcome for your business.

## What an Ecommerce Consultant Does

A consultant typically works in an **advisory capacity**. They audit your business, identify problems, and produce a strategy document or set of recommendations. Think slide decks, frameworks, and "you should do X" advice.

The consultant's engagement usually looks like:

- A fixed-scope project (4–12 weeks)
- A deliverable: audit report, strategy deck, or roadmap
- Limited or no involvement in execution
- Billing by the day (£500–£1,500/day is typical in the UK)

The problem? **Someone still has to do the work.** The consultant diagnoses; your team (or another agency) has to treat. This creates a gap between strategy and execution where things fall through the cracks.

## What a Fractional Ecommerce Director Does

A fractional director is an **embedded operator**. They don't just advise — they take ownership of a defined part of your business (typically your ecommerce P&L) and execute the strategy themselves.

The fractional model looks like:

- An ongoing monthly retainer (rolling, not fixed-term)
- Direct accountability for commercial outcomes (revenue, margin, CAC)
- Hands-on execution: writing code, managing ads, building automations
- Weekly sprint calls and daily Slack availability
- Full integration into your team's workflow

The fractional director *is* the strategy and the execution. There's no handoff gap.

## The Cost Comparison

**Ecommerce Consultant:** £500–£1,500/day. A 3-month engagement at 2 days/week = £12,000–£36,000 for advice and a plan.

**Fractional Ecommerce Director:** £3,000–£5,000/month. A 3-month engagement = £9,000–£15,000 for strategy *and* execution.

The fractional model is typically cheaper *and* delivers more tangible output because the same person who defines the strategy also builds and ships the work.

## When to Hire a Consultant

- You have a strong internal team that just needs strategic direction
- You need a one-off audit or second opinion
- You're preparing for a funding round and need a polished strategy document

## When to Hire a Fractional Director

- You don't have a senior ecommerce leader and can't justify a full-time hire
- You're frustrated with agencies and want one accountable partner
- You need both strategy and execution under one roof
- You want weekly progress, not quarterly reports

## The Bottom Line

If you need someone to **tell you what to do**, hire a consultant. If you need someone to **do it with you** (or for you), hire a fractional director.

For Shopify brands doing £500k–£5M in revenue, the fractional model almost always delivers better ROI. [See how the retainer works](/fractional-ecommerce-director) or [compare costs against agencies and full-time hires](/why-fractional).
    `,
  },
  {
    slug: 'how-to-hire-fractional-ecommerce-director',
    title: 'How to Hire a Fractional Ecommerce Director: The Complete Guide for Shopify Brands',
    date: '2025-05-25',
    excerpt: 'What to look for, what to avoid, and the questions to ask before hiring a fractional ecommerce director for your Shopify brand.',
    category: 'Strategy',
    readTime: '10 min read',
    content: `
## Why This Role Exists

The fractional ecommerce director is a relatively new role that's emerged because of a structural gap in the market: most Shopify brands between £500k and £5M in revenue **need** senior ecommerce leadership but **can't justify** a £100k+ full-time hire.

Agencies fill the gap poorly (junior execution, no P&L ownership). Freelancers fill it inconsistently (no strategic depth). A fractional director sits in the middle: senior enough to own the strategy, technical enough to execute, and flexible enough to fit a growing brand's budget.

## What to Look For

### 1. Operational Experience, Not Just Consulting

The best fractional directors have been **in-house leaders** before. They've owned a P&L, managed teams, and been accountable for commercial targets. This is different from someone who's only ever worked agency-side or as an independent consultant.

Ask: *"Have you ever been a Head of Ecommerce or Ecommerce Director in a full-time role?"*

### 2. Technical Depth

A fractional director who can't touch code, configure analytics, or build automation workflows is just an expensive project manager. You want someone who can go from strategy session to Shopify admin to Google Ads in the same afternoon.

Ask: *"Can you show me something you've built recently — a workflow, a theme edit, a campaign structure?"*

### 3. Platform Specialism

Ecommerce is broad. Shopify is its own ecosystem with specific quirks (Liquid templating, Checkout Extensibility, Shopify Functions). A generalist who also does WooCommerce and Magento will lack the depth you need.

Ask: *"Do you work exclusively with Shopify, or do you support multiple platforms?"*

### 4. Clear Commercial Model

Avoid fractional directors who bill by the hour. The incentive is misaligned — they get paid more when things take longer. Look for fixed monthly retainers with clear scope and rolling contracts.

Ask: *"What does your retainer include, and how do you handle scope changes?"*

### 5. Capacity Limits

A genuine fractional director limits their client count. If someone is juggling 10+ clients, they're a freelancer with a fancy title. Look for operators who take on 2–4 clients maximum.

Ask: *"How many active clients do you work with at any one time?"*

## Red Flags to Avoid

- **No portfolio or case studies** — If they can't show real outcomes, the experience may not exist.
- **Reluctance to sign an NDA** — You'll be sharing sensitive commercial data. An NDA should be standard.
- **No defined onboarding process** — A good fractional director has a repeatable audit and onboarding framework. If they're "winging it", you'll feel it.
- **Only strategic, never tactical** — If they refuse to get their hands dirty with execution, they're a consultant, not a director.
- **Long lock-in contracts** — The whole point of fractional is flexibility. Rolling monthly is the standard.

## The Interview Process

For a fractional director, the "interview" should be more like a commercial conversation than a job interview:

- **Discovery call (20 mins):** Do they understand your business model? Do they ask smart questions about your P&L, not just your website?
- **Mini audit (optional):** Some fractional directors will do a quick teardown of your store, ads, or analytics as part of their pitch. This shows their depth.
- **Scope alignment:** They should propose a clear plan for the first 30/60/90 days. If they can't, they haven't done this before.

## What to Expect in the First 90 Days

A good fractional director will follow a structured cadence:

- **Month 1 (Stabilise):** Full tech stack audit, fix tracking, identify quick wins, establish the KPI dashboard.
- **Month 2 (Optimise):** CRO testing, email flow expansion, paid media restructuring.
- **Month 3 (Scale):** Channel expansion, automation deployment, retention strategy activation.

By the end of 90 days, you should have clear commercial evidence of impact.

## Ready to Hire?

If you're a Shopify brand doing £500k–£5M and this model resonates, [book a 20-minute fit call](/fractional-ecommerce-director) to see if we're a good match.
    `,
  },
  {
    slug: 'ecommerce-director-salary-uk-vs-fractional',
    title: 'Ecommerce Director Salary UK (2025): Full-Time vs Fractional Cost Comparison',
    date: '2025-06-08',
    excerpt: 'A full-time Ecommerce Director costs £80k–£120k+ in the UK. Here\'s the real total cost of ownership — and why fractional is 60–70% cheaper for most Shopify brands.',
    category: 'Strategy',
    readTime: '7 min read',
    content: `
## The Headline Number

According to Glassdoor, Indeed, and our own market research, the **average Ecommerce Director salary in the UK in 2025** sits between:

- **£80,000–£120,000** base salary
- **£100,000–£150,000** total cost to employer (NI, pension, benefits, equipment)

For brands in the Midlands and North, salaries skew slightly lower (£70k–£100k). London and South East roles command the premium end.

## The Real Total Cost of a Full-Time Hire

Salary is only part of the equation. The true cost includes:

- **Employer's National Insurance:** 13.8% on earnings above £9,100 = ~£10,000–£15,000/year
- **Pension contributions:** 3–5% minimum = £2,400–£6,000/year
- **Benefits:** Health insurance, training budget, equipment = £3,000–£8,000/year
- **Recruitment:** Agency fees (15–25% of salary) or internal time = £12,000–£30,000 one-off
- **Onboarding:** 3–6 months before full productivity
- **Risk:** Notice periods, employment law, redundancy costs if it doesn't work out

**Total first-year cost:** £115,000–£200,000+ for a senior ecommerce director.

## The Fractional Alternative

A fractional ecommerce director charges a **fixed monthly retainer** — typically £3,000–£5,000/month for Shopify brands in the £500k–£5M revenue range.

**Annual cost:** £36,000–£60,000.

That's **60–70% less** than a full-time hire, with zero recruitment risk, no notice periods, and senior execution from day one.

## What You Actually Get

The concern with fractional is always: *"But I'm not getting a full-time person."* That's true — and it's the point.

Most Shopify brands in this revenue range don't need 40 hours/week of ecommerce director time. They need:

- **5–15 hours/week** of focused, senior-level execution
- Weekly strategy calls and daily Slack availability
- Someone who can move between CRO, paid media, development, and data analysis
- A partner who's done this before at scale

A full-time director fills 40 hours. A fractional director delivers **concentrated impact** in a fraction of the time because they've solved these exact problems dozens of times before.

## The Comparison Table

| Factor | Full-Time Director | Fractional Director |
|--------|-------------------|-------------------|
| Annual Cost | £100k–£150k+ | £36k–£60k |
| Recruitment Time | 3–6 months | 1–2 weeks |
| Onboarding | 3–6 months | Week 1 execution |
| Skill Range | One person's strengths | Full-stack (strategy + dev + growth) |
| Risk | Employment law, notice periods | Rolling monthly, cancel anytime |
| Accountability | Salary regardless of output | Retained for outcomes |

## When Full-Time Makes More Sense

To be fair, there are scenarios where a full-time hire is the better choice:

- You're doing **£10M+** in ecommerce revenue and need daily operational oversight
- You have a **large internal team** that needs direct line management
- Your business has **complex compliance or regulatory requirements** that demand dedicated attention

For everyone else — particularly Shopify brands in the £500k–£5M range — fractional delivers senior leadership at a fraction of the cost.

## Make the Switch

If you're weighing up these options, [see the full breakdown of what the retainer includes](/fractional-ecommerce-director) or [read why fractional beats agencies too](/why-fractional). Consider how [n8n automation](/services/ecommerce-automation) multiplies fractional output even further.
    `,
  },
  {
    slug: 'shopify-plus-agency-vs-fractional-director',
    title: 'Shopify Plus Agency vs Fractional Director: Which Is Right for Your Brand?',
    date: '2025-06-22',
    excerpt: 'Shopify Plus agencies charge £5k–£15k/month for junior execution. Here\'s why a growing number of brands are replacing them with a single fractional director.',
    category: 'Strategy',
    readTime: '9 min read',
    content: `
## The Agency Model Is Showing Cracks

If you're a Shopify Plus brand paying an agency £5,000–£15,000/month, you've probably experienced at least one of these:

- The **senior strategist** who pitched you is nowhere to be seen
- Your day-to-day contact is an **account manager** with 18 months of experience
- Work is split across **multiple departments** (dev team, PPC team, SEO team) with no one owning the whole picture
- You're paying for **internal agency overhead** — office rent, middle management, sales teams — not for your growth
- Monthly reports are **retrospective** and surface-level: "Here's what happened" instead of "Here's what we're doing next"

This isn't a criticism of every agency. Some are excellent. But the structural incentives of the traditional agency model create predictable problems for brands in the £500k–£5M range.

## Why Fractional Works Better at This Stage

A fractional ecommerce director replaces the agency with a **single senior operator** who owns your entire ecommerce function. Here's what changes:

### 1. One Brain, Not Five Departments

When strategy, development, [paid media](/services/paid-media-growth), [CRO](/services/conversion-rate-optimisation), and automation are managed by one person, there are no handoff delays, no "that's not my department" moments, and no coordination overhead. The person who spots a conversion problem on your product page can fix it the same day — because they write the code too.

### 2. Senior Execution, Every Task

At an agency, senior talent is reserved for pitches and quarterly reviews. The daily work is done by juniors. With a fractional director, every task gets senior-level thinking and execution. There's no one to delegate down to — and that's the point.

### 3. P&L Accountability

Agencies are accountable for **deliverables** (campaigns launched, pages built). A fractional director is accountable for **outcomes** (revenue growth, margin improvement, CAC reduction). This fundamentally changes the dynamic.

### 4. Speed and Agility

Agency timescales are driven by their capacity across all clients. A fractional director with 3 clients can reprioritise your sprint within hours if something urgent emerges. No project management bureaucracy. No scope change forms.

## The Cost Reality

**Typical Shopify Plus agency retainer:** £5,000–£15,000/month (£60k–£180k/year)

**Typical fractional director retainer:** £3,000–£5,000/month (£36k–£60k/year)

You're often paying **60–75% less** for more senior, more focused, more accountable execution.

## When an Agency Still Makes Sense

Agencies have genuine advantages in specific scenarios:

- **Creative production at scale:** If you need 50 ad creatives a week, a fractional director can't match an agency's production capacity.
- **Massive paid media budgets:** Spending £100k+/month on ads benefits from dedicated media buying teams with platform relationships.
- **Large, complex migrations:** A full-platform migration (Magento → Shopify Plus) might need an agency's dev team for the initial build, with a fractional director managing the project.

For ongoing **operational leadership, growth strategy, and technical execution**, a fractional director wins on cost, quality, and speed.

## How to Make the Transition

If you're considering switching from an agency to a fractional model, here's the typical process:

- **Month 1:** Overlap period. The fractional director audits your current setup while the agency continues operating.
- **Month 2:** Handover. The fractional director takes over accounts, ad platforms, and development environments.
- **Month 3:** Full operation. The agency relationship ends. One senior partner, full ownership.

Most brands complete the transition in 4–6 weeks without any disruption to their sales or marketing.

## Ready to Compare?

[Book a 20-minute fit call](/fractional-ecommerce-director) to discuss what the switch would look like for your brand. Or [see the full cost breakdown vs agencies and full-time hires](/why-fractional).
    `,
  },
  {
    slug: 'ecommerce-automation-roi-guide',
    title: 'The ROI of Ecommerce Automation: How n8n Workflows Pay for Themselves in 30 Days',
    date: '2025-07-05',
    excerpt: 'Ecommerce automation isn\'t just about saving time — it\'s about eliminating errors, improving customer experience, and unlocking margin. Here\'s the business case.',
    category: 'Automation',
    readTime: '8 min read',
    content: `
## Automation Is a Margin Play, Not Just an Efficiency Play

Most ecommerce brands think of automation as "saving time." That's true — but it's the least interesting benefit. The real ROI comes from three areas:

- **Eliminated errors:** Manual processes create mistakes. Wrong inventory counts, missed customer tags, delayed review requests, broken reporting. Each error has a direct cost.
- **Improved customer experience:** Timely, personalised communication (triggered by real events, not calendar dates) increases conversion and retention.
- **Unlocked capacity:** When your team isn't doing repetitive data entry, they can focus on high-value work like product development and brand building.

## The Business Case: Real Numbers

Here's what automation typically delivers for a Shopify brand doing £1M–£5M in annual revenue:

### Time Savings

| Workflow | Manual Time (Weekly) | Automated | Annual Saving |
|----------|---------------------|-----------|---------------|
| Daily P&L reporting | 5 hours | 0 hours | 260 hours |
| Customer tagging & segmentation | 3 hours | 0 hours | 156 hours |
| Inventory alerts & reordering | 4 hours | 0 hours | 208 hours |
| Review request sequencing | 2 hours | 0 hours | 104 hours |
| Ad spend reconciliation | 3 hours | 0 hours | 156 hours |
| **Total** | **17 hours/week** | **0 hours** | **884 hours/year** |

At an average cost of £25/hour for operational staff, that's **£22,100/year in direct labour savings**.

### Error Reduction

Manual inventory management typically has a 2–5% error rate. For a brand with 1,000 SKUs and £2M in revenue, a 3% stockout rate due to inventory errors costs approximately **£60,000 in lost sales annually**.

Automated inventory workflows reduce this error rate to near-zero.

### Revenue Uplift

Properly timed review request emails (triggered by delivery confirmation, not dispatch) improve review submission rates by **30–40%**. More reviews = higher conversion rates = more revenue.

For a brand converting at 2% with 50,000 monthly visitors, a 0.2% conversion lift from improved social proof equals approximately **£120,000 in additional annual revenue** (at a £100 AOV).

## Why n8n Over Other Platforms

We use n8n (self-hosted) for all our automation work. Here's why:

### Cost

- **Zapier:** £50–£500/month depending on task volume. Per-operation pricing means costs scale linearly with growth.
- **Make (Integromat):** £15–£100/month. Better value but still per-operation.
- **n8n (self-hosted):** £10–£30/month for hosting. Unlimited operations. Costs stay flat regardless of volume.

For a brand running 50,000+ automation operations per month, n8n saves **£3,000–£5,000/year** vs Zapier.

### Power

n8n supports complex conditional logic, loops, error handling, and sub-workflows that Zapier struggles with. When you need to pull data from 4 APIs, transform it, apply business logic, and push results to 3 destinations — n8n handles it natively.

### Data Control

Self-hosted n8n means your customer data never touches a third-party server. For brands handling sensitive customer information, this is a significant compliance advantage.

## The Five Workflows That Pay for Themselves

These are the workflows we deploy first for every new partner:

- **Daily P&L Dashboard to Slack** — Pulls revenue, ad spend, refunds, and calculates margin automatically. Team wakes up to the numbers every morning.
- **VIP Customer Tagging** — Automatically identifies high-value customers based on order frequency and lifetime spend. Triggers personalised Klaviyo flows.
- **Smart Review Requests** — Waits for confirmed delivery (not dispatch) before sending review requests. 30–40% higher response rate.
- **Inventory Alert System** — Monitors stock levels and alerts the team (or auto-creates purchase orders) before stockouts happen.
- **Churn Prevention** — Identifies subscription customers at risk of churning and triggers retention flows 7 days before renewal.

## Getting Started

The investment to set up a core automation stack is typically **£2,000–£5,000** as a one-off build, plus **£500–£1,000/month** for monitoring and iteration.

Given the numbers above (£22k in time savings + £60k in error reduction + revenue uplift), most brands see **positive ROI within 30 days**.

We build and manage all [automation infrastructure](/services/ecommerce-automation) for our fractional partners. [Let's talk about automating your operations](/fractional-ecommerce-director).
    `,
  },
  {
    slug: 'shopify-product-data-audit-guide',
    title: 'The Shopify Product Data Audit: Why 97% of Your Alt Text Might Be Wrong',
    date: '2025-10-14',
    excerpt: 'We audited a Shopify furniture store with 16,000+ product images. 97% had the wrong brand in the alt text. Here\'s how to find and fix the same problem in your store.',
    category: 'SEO',
    readTime: '11 min read',
    content: `
## Why This Happens

Alt text rarely gets audited. It's invisible to customers, so it doesn't trigger support tickets. It's set once during product upload and forgotten. If you use Matrixify, a third-party feed, or a manual import process, whatever value was in the supplier's data becomes your alt text — and stays there indefinitely.

When we ran a full data audit on a UK furniture retailer's Shopify store earlier this year, we expected to find some issues. What we found was worse.

Out of 16,193 product image rows, 15,668 — just under 97% — had the wrong brand name embedded in the alt text. The legal entity name of the holding company had been baked into every image's alt attribute when the product catalogue was originally set up, and no one had ever checked.

## How to Audit Your Store

**Step 1 — Export via Matrixify**

Export your Products sheet from Matrixify. The column you need is "Image Alt Text". Filter it and check for values that shouldn't be there: supplier names, legal entity names, placeholder text, or blank values.

**Step 2 — Check the scale of the problem**

In Excel or Python, count how many rows contain unexpected values. Our client's 97% figure sounds extreme — but we've seen 40–60% error rates in stores that have been running for 3+ years without an audit.

**Step 3 — Build a remediation script**

Python + openpyxl works well here. The logic is straightforward: if the alt text contains [wrong value], replace with [Product Title] + [Vendor] + [Brand]. Export the corrected file and import back via Matrixify with Command: MERGE.

**Step 4 — Fix the Liquid template**

Even after a bulk fix, your [Shopify theme's image rendering](/services/shopify-plus-architecture) Liquid may be pulling alt text from a field that gets overwritten on the next product sync. Check your product image Liquid and ensure it references image.alt with a sensible fallback.

## What This Is Worth

Image alt text is a genuine ranking signal for Google Image Search — especially for product photography. If your images are currently attributed to the wrong brand, you're invisible for brand + product searches that should be driving traffic.

This kind of data remediation sits at the foundation of any [LLM search readiness](/services/ai-search-optimization) strategy — AI models rely heavily on structured product data to surface recommendations.

For our client, fixing 16,193 rows took two days of scripting and one Matrixify import. That's a small investment against the visibility recovery.

---

If you'd like us to run a data audit on your Shopify store, [book a free 20-minute teardown](https://calendly.com/dan-atherstonedigital/30min).
    `,
  },
  {
    slug: 'shopify-taxonomy-guide-2025',
    title: 'Shopify Standard Taxonomy: How to Fix a Broken Product Catalogue',
    date: '2025-11-20',
    excerpt: 'We found 1,373 products assigned to \'Address Signs\' and 889 to \'Finials\' on a UK furniture store. Here\'s how to audit and rebuild your Shopify taxonomy correctly.',
    category: 'SEO',
    readTime: '9 min read',
    content: `
## Why Taxonomy Matters

Shopify introduced a standardised product taxonomy in 2023, with the goal of mapping your products to Google's product category system. For brands running Google Shopping, this taxonomy mapping feeds directly into your [feed quality score](/services/google-feed-management), your eligibility for free listings, and your product type match rates in Performance Max campaigns.

The problem: most stores have never audited their taxonomy mapping. And when it goes wrong, it goes spectacularly wrong.

## What We Found

On a recent client audit, we exported the full product catalogue and grouped products by their assigned Category Name. Here's a sample of what we found in a 6,337-product furniture and homeware store:

- **Address Signs:** 1,373 products (should be sofas, beds, tables)
- **Finials:** 889 products (should be curtain poles, accessories)
- **Earthquake Alarms:** 721 products (should be miscellaneous homeware)
- **Backrest Pillows:** Various (should be benches)
- **Bird Feeders:** Various (should be photo frames, outdoor furniture)

This isn't a minor error. These products are being fed to Google Shopping under completely incorrect categories, suppressing impression share and causing policy violations.

## Why It Happens

The taxonomy mapping happens at product import. If you're using a supplier feed or a migration tool, whatever category ID exists in the source data gets written as-is. Shopify's taxonomy uses a hierarchical ID system — and if a wrong ID gets applied to every row in a bulk import, you end up with 1,373 products in the wrong category overnight.

## How to Fix It

**Step 1 — Export via Matrixify**

Export the Products sheet. You need three columns: Handle, Category: ID, Category: Name.

**Step 2 — Identify the damage**

Group by Category Name, count products per category. Any furniture store with products in "Address Signs" or "Earthquake Alarms" has a problem.

**Step 3 — Build a mapping table**

Create a lookup: your product type → correct Shopify taxonomy path and ID. Critical rule: **only use taxonomy IDs verified from your own store's export**, not constructed IDs.

**Step 4 — Apply and import**

Write the corrected Category: ID and Category: Name columns using Python or Excel VLOOKUP. Import via Matrixify with Command: MERGE.

## Verification

After import, spot-check 10–15 products across different types in Shopify admin. In Google Merchant Center, check your product feed for category mismatch disapprovals — these should clear within 2–3 feed refresh cycles.

Getting your taxonomy right is a prerequisite for effective [paid media campaigns](/services/paid-media-growth) — broken categories mean broken Shopping ads.

---

Need a taxonomy audit? [Book a free session](https://calendly.com/dan-atherstonedigital/30min).
    `,
  },
  {
    slug: 'fractional-ecommerce-director-2026',
    title: 'The Fractional Ecommerce Director in 2026: What\'s Changed and What to Look For',
    date: '2026-01-15',
    excerpt: 'The fractional model is maturing. In 2026, the gap between a good fractional director and a bad one is wider than ever — here\'s what to look for.',
    category: 'Strategy',
    readTime: '8 min read',
    content: `
## What's Changed

Three years ago, "fractional ecommerce director" was a niche term that founders had to explain to their investors. Now it's a recognised model — and with recognition comes dilution.

The market has filled with consultants repositioning as [fractional directors](/fractional-ecommerce-director), agencies offering "fractional" services through junior staff, and solo operators who are great at one discipline (usually paid media) calling themselves full-stack ecommerce leaders.

### AI has raised the floor — and widened the gap

A fractional director who hasn't integrated AI into their delivery is working at a structural disadvantage. The operators who have integrated AI agents into their data workflows, content production, and reporting are delivering at a throughput that wasn't achievable two years ago.

### The data layer matters more

LLM-powered search (ChatGPT, Gemini, Perplexity) is changing how products get discovered. Structured data quality, taxonomy accuracy, and content richness are no longer just [SEO concerns](/services/ai-search-optimization) — they're feed quality concerns, AI citability concerns, and increasingly, [conversion concerns](/services/conversion-rate-optimisation).

### Founders want embedded operators, not advisors

The retainer-for-strategy model is being rejected. Founders who've been through agencies know what an advisor's slide deck looks like. They want someone who logs in, fixes the thing, and reports back.

## What to Look For in 2026

**Hands-on technical depth.** Can they write Liquid? Can they build an [n8n workflow](/services/ecommerce-automation)? Can they run a Matrixify import safely?

**AI integration in the workflow.** Not AI as a buzzword — AI as a delivery mechanism. Ask specifically: what agents do you run, what do they handle, and how does it change your output capacity?

**Commercial accountability.** Do they track contribution margin, not just revenue? A fractional director who only reports on top-line GMV doesn't understand your business.

**A tight ICP.** The best fractional directors work with a specific type of brand on a specific platform. Generalists are rarely as effective as specialists at this engagement model.

---

[Book a 20-minute fit call](https://calendly.com/dan-atherstonedigital/30min) to see if the Atherstone Digital model is right for your Shopify brand.
    `,
  },
  {
    slug: 'ai-search-shopify-2026',
    title: 'Is Your Shopify Store Ready for AI Search in 2026?',
    date: '2026-02-28',
    excerpt: 'ChatGPT, Gemini, and Perplexity are now product discovery channels. Here\'s what Shopify brands need to do to appear in AI-generated recommendations.',
    category: 'SEO',
    readTime: '10 min read',
    content: `
## How AI Search Works for Products

In 2024, "AI search" was a prediction. In 2026, it's a distribution channel.

ChatGPT's shopping integration, Gemini's product recommendations, and Perplexity's commerce answers are now returning product results to real buyers. Early data from brands in our partner network suggests that AI-referred traffic is converting at rates comparable to Google Shopping — possibly higher, because the buyer has usually been pre-qualified by the AI's response.

AI search engines don't crawl your store the same way Google does. They rely on:

- **Structured data** — JSON-LD Product schema with accurate pricing, availability, brand, and description
- **Content richness** — Product descriptions that answer real questions
- **Brand signal consistency** — Your brand name, product names, and category terms must be consistent across your store, your feed, and your structured data
- **Third-party citations** — Press mentions, review platforms, and comparison sites that reference your brand

## What to Check on Your Shopify Store

**Product schema**

Is your Product JSON-LD present on every PDP? Does it include brand, offers (with priceCurrency, price, availability), description, and image? Run a sample PDP through Google's Rich Results Test. This is a core part of our [LLM search readiness](/services/ai-search-optimization) service.

**Brand consistency**

Is your brand name consistent between: your Shopify store name, your product vendor field, your image alt text, your meta titles, and your [Google Merchant Center feed](/services/google-feed-management)? Inconsistency creates ambiguity for AI models.

**Description depth**

Thin product descriptions (under 100 words, or templated) are a liability. AI models prefer to cite sources with rich, specific, accurate information. This ties directly into [CRO](/services/conversion-rate-optimisation) — richer descriptions convert better too.

**Q&A and FAQ content**

Product page FAQs, collection page guides, and blog content that answers real pre-purchase questions are the highest-value content for AI citability. If your blog doesn't exist or hasn't been updated since 2024, you're invisible to AI models learning about your category.

## The First-Mover Advantage

Most Shopify brands are not optimising for AI search yet. The brands that get their structured data right, their content rich, and their brand signal consistent in the next 6–12 months will have a durable advantage.

Pair this with a solid [Klaviyo retention strategy](/services/retention-marketing) and you're building a compounding growth engine.

---

[Book a free teardown](https://calendly.com/dan-atherstonedigital/30min) to see where your Shopify store stands.
    `,
  },
  {
    slug: 'klaviyo-email-flows-shopify-brands',
    title: 'The 7 Klaviyo Email Flows Every Shopify Brand Needs (With Revenue Benchmarks)',
    date: '2025-07-18',
    excerpt: 'Email should drive 25–40% of your Shopify revenue. If it doesn\'t, you\'re leaving money on the table. Here are the 7 flows that move the needle — and the benchmarks to aim for.',
    category: 'SEO',
    readTime: '10 min read',
    content: `
## Email Is Your Highest-ROI Channel

For Shopify brands, email marketing (primarily through Klaviyo) should contribute **25–40% of total revenue**. If your email channel is under 20%, you have significant upside to capture.

The key is **automated flows** — not campaigns. Campaigns are one-off broadcasts. Flows are triggered sequences that run 24/7, delivering the right message at the right moment based on customer behaviour.

Here are the 7 flows that form the backbone of a high-performing Klaviyo setup.

## Flow 1: Welcome Series (Expected Revenue: 5–10% of Email Revenue)

**Trigger:** Newsletter signup or account creation.

This is your first impression. Most brands send a single welcome email with a discount code. That's a missed opportunity.

**Best practice structure:**
- **Email 1 (Immediate):** Welcome + brand story + discount code (if offering one)
- **Email 2 (Day 2):** Product education or bestseller showcase
- **Email 3 (Day 4):** Social proof — reviews, UGC, press mentions
- **Email 4 (Day 7):** Discount reminder (if not yet purchased) with urgency

**Benchmark:** 40–60% open rate on Email 1, 3–8% placed order rate across the series.

## Flow 2: Abandoned Cart (Expected Revenue: 15–25% of Email Revenue)

**Trigger:** Added to cart but didn't complete purchase.

This is the single highest-revenue flow for most Shopify brands. The key is timing and escalation.

**Best practice structure:**
- **Email 1 (1 hour):** "You left something behind" — product image, simple CTA, no discount
- **Email 2 (24 hours):** Social proof angle — reviews of the specific products in cart
- **Email 3 (48 hours):** Urgency or incentive — free shipping or small discount

**Benchmark:** 40–50% open rate, 5–15% recovered cart rate.

## Flow 3: Browse Abandonment (Expected Revenue: 5–10% of Email Revenue)

**Trigger:** Viewed a product page but didn't add to cart.

This catches people earlier in the funnel than cart abandonment. It's higher volume but lower intent, so the messaging needs to be softer.

**Best practice structure:**
- **Email 1 (4 hours):** "Still thinking about [Product]?" — personalised product recommendation
- **Email 2 (24 hours):** Category-level recommendation — "You might also like..."

**Benchmark:** 30–40% open rate, 1–3% click-to-purchase rate.

## Flow 4: Post-Purchase (Expected Revenue: Building LTV)

**Trigger:** Order placed.

This flow isn't about immediate revenue — it's about building the relationship that leads to repeat purchases.

**Best practice structure:**
- **Email 1 (Immediately):** Thank you + what to expect (shipping timeline, sizing guide, care instructions)
- **Email 2 (Day 3):** Brand story or founder note — build emotional connection
- **Email 3 (Delivery + 3 days):** Product review request (sync with delivery confirmation via n8n)
- **Email 4 (Day 14):** Cross-sell recommendation based on purchase

**Benchmark:** 60–70% open rate on Email 1, 8–15% review submission rate on Email 3.

## Flow 5: Win-Back (Expected Revenue: 3–5% of Email Revenue)

**Trigger:** Customer hasn't purchased in 60–90 days (adjust based on your purchase cycle).

Reactivating lapsed customers is significantly cheaper than acquiring new ones.

**Best practice structure:**
- **Email 1 (60 days):** "We miss you" — personalised product recommendations based on past purchases
- **Email 2 (75 days):** Incentive — exclusive discount or early access to new products
- **Email 3 (90 days):** Final attempt — "Is this goodbye?" with a clear CTA

**Benchmark:** 20–30% open rate, 2–5% reactivation rate.

## Flow 6: VIP/Loyalty (Expected Revenue: Building LTV)

**Trigger:** Customer reaches a spend or order threshold (e.g., 3rd order or £500 lifetime spend).

Your VIP customers drive disproportionate revenue. Treat them differently.

**Best practice structure:**
- **Email 1 (Threshold crossed):** "You're a VIP" — exclusive benefits, early access, or a personal note
- **Ongoing:** VIP-only product launches, exclusive discounts, birthday/anniversary emails

**Benchmark:** 50–60% open rate, 15–25% click rate.

## Flow 7: Sunset / List Hygiene

**Trigger:** Subscriber hasn't opened or clicked in 120+ days.

This isn't a revenue flow — it's a deliverability flow. A bloated, unengaged list hurts your sender reputation, which hurts open rates across *all* your flows.

**Best practice structure:**
- **Email 1 (120 days inactive):** "Do you still want to hear from us?" — simple yes/no CTA
- **Email 2 (135 days):** Final warning — "We're about to remove you"
- **Action (150 days):** Suppress unengaged profiles from all flows

**Benchmark:** 5–10% re-engagement rate. The rest should be suppressed.

## Getting Your Flows Audited

If your Klaviyo account has fewer than 5 active flows, or your email revenue is under 20% of total, there's significant upside to capture.

We audit and rebuild [Klaviyo accounts](/services/retention-marketing) as part of every [fractional engagement](/fractional-ecommerce-director). [Book a call to discuss your email strategy](/#contact).
    `,
  },
];
