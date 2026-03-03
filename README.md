# Atherstone Digital — Next.js 14

Rebuilt from Vite SPA → Next.js 14 with Static Site Generation for full SEO crawlability.

## Stack
- **Next.js 14** (App Router, `output: 'export'`)
- **TypeScript**
- **Tailwind CSS**
- **Netlify** (static hosting)

## Setup

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # Generates /out directory
```

## Deployment (Netlify)

1. Push this repo to GitHub
2. In Netlify: New site → Import from Git → select this repo
3. Build command: `npm run build`
4. Publish directory: `out`
5. Done — every push auto-deploys

## Adding Blog Posts

Edit `lib/data.ts` → `BLOG_POSTS` array. Each post has:
- `slug` — URL path
- `title`, `date`, `excerpt`, `category`, `readTime`
- `content` — Markdown string

## Adding Location Pages

Edit `lib/data.ts` → `LOCATIONS_DATA`. Add a new entry with a unique `slug` and `uniqueContent` — this is the city-specific paragraph that prevents duplicate content penalties.

## Page Structure

```
app/
├── page.tsx                    → / (Homepage)
├── services/[slug]/page.tsx    → /services/shopify-plus-architecture etc
├── [locationSlug]/page.tsx     → /shopify-expert-birmingham etc
├── blog/page.tsx               → /blog
├── blog/[slug]/page.tsx        → /blog/why-fractional-beats-agency etc
├── why-fractional/page.tsx     → /why-fractional
├── the-model/page.tsx          → /the-model
├── results/page.tsx            → /results
├── about/page.tsx              → /about
├── fractional-ecommerce-director/page.tsx
├── sitemap.ts                  → Auto-generates /sitemap.xml
└── robots.ts                   → Auto-generates /robots.txt
```

## SEO

- Every page has `metadata` export with unique title + description
- `sitemap.ts` auto-includes all pages, services, locations, blog posts
- `robots.ts` sets crawl rules
- JSON-LD schema on every relevant page
- `LocalBusiness` + `FAQPage` schema on location pages
- `BlogPosting` schema on blog posts
