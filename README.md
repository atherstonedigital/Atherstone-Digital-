# Atherstone Digital

The marketing site for Atherstone Digital, ecommerce director for furniture and interiors retailers. Next.js 14 (App Router, `output: 'export'`), TypeScript, Tailwind CSS, static hosting on Netlify.

## Setup

```bash
npm install
npm run dev       # http://localhost:3000
npm run build     # static export to /out
npm run tokens    # regenerate the design tokens (needs the local brand files)
```

## Deployment (Netlify)

Netlify builds every push with `npm run build` on Node 18 and publishes `out`. `netlify.toml` holds the 301 redirects from the old URLs (listed with their reasons in `lib/content/redirects.ts`) and the header rules. Forms post to Netlify Forms; `public/__forms.html` declares their fields.

## Where things live

```
app/(site)/                     the site: one folder per route, each page exporting metadata from lib/seo.ts
app/design-system/              every token and component in both themes (noindex)
app/og/[group]/[image]/         share images rendered at build time
app/sitemap.ts, app/robots.ts   sitemap.xml (indexable routes only) and robots.txt
components/ui, brand, site      the shadcn primitives, the brand components, the site components
lib/content/                    all copy: site.ts, pages/*.ts, the insights archive and the redirect map
lib/seo.ts                      title tags, descriptions, robots, canonicals and the JSON-LD builders
lib/design/tokens.ts            the generated design tokens (with app/styles/tokens.css)
```

## Content

- Copy lives in `lib/content`. Where it is not written yet, the content holds a stub and the page shows "Content to follow"; a page that is mostly stubs is noindex and stays out of the sitemap.
- Articles are in `lib/content/insights-archive.ts` and publish at `/insights/[slug]`.

## SEO

- Every page has a unique title tag, description and canonical (no trailing slash).
- JSON-LD: Organization site-wide; Person on /about and as every article's author; Service on the three offer pages; FAQPage wherever a FAQ block shows; Article on every insight; BreadcrumbList on sector, results and insights pages.
