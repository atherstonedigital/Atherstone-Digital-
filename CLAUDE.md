# CLAUDE.md: Atherstone Digital

## Project

Atherstone Digital is one person, Dan Le Gresley, working as the ecommerce director for premium furniture and interiors retailers with showrooms. This repo is the marketing site: Next.js 14.2.5 App Router with `output: 'export'`, TypeScript strict, Tailwind 3.4, deployed as static files from `/out` on Netlify (Node 18). The repo is public.

```bash
npm run dev       # http://localhost:3000
npm run build     # static export to /out
npm run lint
npm run tokens    # regenerate the design tokens (needs docs/brand locally)
```

Static export only: no API routes, server actions, middleware, SSR or `next.config` redirects. Redirects go in `netlify.toml` (the map is `lib/content/redirects.ts`). Forms post to Netlify Forms, so every field must also be in the static stub `public/__forms.html`.

## Where things live

- `app/(site)/`: the site. Its `layout.tsx` renders `components/site/SiteShell.tsx`: `header.nav`, `<main>` (padded by the nav's height) and `footer.closing`, straight inside `<body>` (the taste kit's shell). A page file renders only its sections and exports `metadata` from `buildMetadata()`. `app/(site)/_home/` holds the homepage-only pieces: `ShowroomPhoto` and `CatalogueScreenshot` (a paper-raised stand-in reading "Screenshot to follow" until the screenshot has been through the image pipeline: add the PNG as `public/images/xshowhome-catalogue.png`, then run `npm run images`, which moves it to `assets/screenshots/` and writes its WebP renditions and `lib/screenshots.private.json`; the build then renders those. All three are gitignored until Xshowhome's written permission, so a build from git shows the stand-in, and a PNG left in `public/images/` stops the build).
- `app/design-system/`: every token and component in both themes. Keep it; it is noindex.
- `app/og/[group]/[image]/route.tsx`: share images rendered at build for routes without a hand-made one (`lib/og/share-card.tsx`, fonts in `assets/fonts`). Hand-made ones are in `public/og`.
- Icons: `app/icon.svg`, `app/apple-icon.png`, `app/manifest.ts`, `public/favicon-32.png`, `public/favicon-48.png`, `public/icon-192.png`, `public/icon-512.png`.
- `docs/site-plan.md` (the plan: copy, sitemap, title tags, schema) and `docs/brand/` (brand book, `tokens.json`, component READMEs, assets) are local only and never in git. Nothing the build runs may read them.

## Design tokens

`scripts/build-tokens.mjs` reads `docs/brand/tokens.json`, merges `design/tokens.additions.json` (additions the brand owner approved; the script refuses any entry whose status is not `approved`) and writes `app/styles/tokens.css`, `lib/design/tokens.ts` and `lib/design/tokens.docs.ts`. The outputs are committed and are the build's only source: never edit them by hand, run `npm run tokens`. `tailwind.config.ts` reads `lib/design/tokens.ts`; type utilities are named exactly as the type styles (`display-1`, `display-2`, `heading-1`, `heading-2`, `figure`, `quote`, `eyebrow`, `body-lg`, `body`, `small`, `button`). Colours are tokens (`paper`, `paper-raised`, `ink`, `ink-muted`, `rule`, `rule-strong`, `green-900`, `green-700`, `on-green`, `brass-600`, `brass-300`, `signal-*`, `focus`, `band`, `on-band`); never write a hex in a component. Where a value cannot be a custom property (theme colour, manifest, share images) read `colorValues` from `lib/design/tokens.ts`. Fonts: Newsreader (display) and Schibsted Grotesk (sans) through next/font. No third face.

## Components (use them; do not restyle; extend minimally and say so)

- `components/ui`: the shadcn primitives the brand allows, restyled to the tokens: accordion, button, form, input, label, navigation-menu, select, sheet, textarea.
- `components/brand`: Wordmark, Button (with LinkButton, TextLink), SectionHeading, StatBlock, Testimonial, OfferCard, LinkedCard.
- `components/site`: SiteShell, Nav, Footer, Breadcrumbs, CTABand, ThemeToggle, Hero, Screen, ProblemCards, ComparisonTable, Steps, SectorTiles, AboutStrip, InsightCards, CaseStudyHeader, ArticleHeader, Photograph, PageBlocks, OfferLinks, ContactForm, DirectLines, LeadMagnet, FAQ, Chart, JsonLd, DrawerGesture, PressFeedback, form-panel-styles.

Layout rules the components carry (Phase 2.4 and 2.5; the owner's brief overrides the taste skill's one-section-per-screen rule):

- `Screen` is every section's frame: a `<section>` holding one `.wrap` (the exported `container` classes), its content plus space-16 above and below (space-12 below 720px), at least 60dvh, no maximum. Never a fixed screen height. Props: `first` (the page head: no rule above, space-24 from 1200px), `ground` (`paper` or `band`, the full-bleed green band), `rule` (the full-width rule above; on by default except on `first` and the band), `closing` (no minimum, before a CTABand), `labelledBy`, `innerClassName`. `as` and `phoneScreens` only remain for old call sites.
- The homepage hero is `Hero`: 100dvh less the nav, the copy centred above the fact line docked at its foot.
- Every two-column split is two halves 24px apart (`gap-x-space-6`), so the right column starts on the page's one split line (x 732 at 1440). Two columns of text that are not a split (the footer row, the ecommerce-director fit lists) stand a gutter apart (`gap-x-gutter`), on the 12-column grid's columns. The taste kit's two checkers disagree at 1200px and up: `consistency.mjs` puts the split line at k*(w+24)/12 (x 732), while the layout check reads the grid from `--gutter` (32px, approved), so it reports every split's right column as off its columns. That is an open conflict, not something to chase by hand.
- Running text in a split stays a column of text (`Paragraphs` stacks with `space-y`, `DirectLines` is a plain `dl`): a `.grid` inside a column makes the gate's edge checks treat it as a box that must end on a column line.
- `SectionHeading` sets the space-8 between its hairline and the content; do not add padding under it.
- `ProblemCards` `variant`: `paper` (default; sector pages, Health Check) or `band` (homepage). Both are a two-column ruled list on the split line.
- `Steps` `aside`: a second column beside the steps from 900px (the homepage's Canwell photograph).
- `SectorTiles` `layout`: `list` (default; a case study's one tile) or `row` (the homepage and the offer pages' sector links: five across from 1200px, three then two from 720px). Tiles are as tall as their words, never padded to fill a section; the frame centres the row (`className="flex flex-col justify-center"` on its `Screen`).
- `DirectLines`: Dan's email and phone as ledger rows (`ground` `paper` on /contact, `band` in the homepage contact band).
- `Chart` `axis="inline"` sets the value labels on the plot above their gridlines, so the plot runs line to line; `titleStyle="heading-2"` sets the title as a section's chart title. Grey bars are ink-muted at 70%.
- `Photograph` renders a client photograph outside the homepage (getImageProps, the generated srcset, blur placeholder, rule border, radius-0, no caption); `splitSizes` and `fiveColumnSizes` are its `sizes` lists.

GSAP is for the hero entrance and the mobile drawer only; no ScrollTrigger. Everything else is CSS transitions.

## Content and SEO

- `lib/content/site.ts`: nav, footer, contact details, homepage sections, offers and sectors. Kept light: the nav bundle imports it.
- `lib/content/pages/*.ts`: each route's copy (offers, sectors, results, about, agency-or-in-house, contact, scorecard, privacy, terms, insights). `lib/content/insights-archive.ts` holds the moved /blog posts. `lib/content/types.ts` types it all.
- Copy is verbatim from the plan. Where the plan writes nothing, the content holds a stub (`lib/content/stub.ts`): pages show "Content to follow" there, and a page that is mostly stubs is noindex. Never fill a stub with invented figures, client facts or testimonials. Drafts written for Dan to approve are marked as drafts in comments.
- `lib/seo.ts`: the route registry (title tag, description, H1, robots, share image), `buildMetadata()` (title.absolute, canonical on https://www.atherstonedigital.com with no trailing slash, Open Graph, Twitter) and the JSON-LD builders: Organization (site-wide, in the root layout), Person, Service, FAQPage, BreadcrumbList, Article. No LocalBusiness and no geo meta tags.

## Public repo rule: client figures

Only figures already public on the live site may appear anywhere in code, content or comments: 16,193 product records, 120+ hours a month automated, £250k monthly revenue within six months (a home and interiors brand, via Ranch Creative), £115k+ incremental email revenue across partner accounts, and the three testimonials. Every other client figure in the plan (revenue, orders, sessions, conversion rates, ROAS, Search Console data, any Saverys, Canwell or JLR figure, ad account IDs, turnover bands) stays out until the client gives written permission. Share images carry no client figures at all.

## Taste-skill rulings (owner approved)

The design-taste-frontend checks that conflict with the brand book are out of scope here: section-air (the hairline under every SectionHeading is the brand's structural device), no-visual, text-only and card-visual (no decorative visuals; only real photographs, screenshots and charts), visual-caption (source lines under charts and screenshots stay), moment-none and effect-kind (no dealt moments or effects), and phone-number (the real number is shown). No drag gesture on the FAQ accordion. Never invoke design-taste-frontend through the Skill tool: its Stop hook runs the gate against this repo.

## Voice and copy rules

Every page is written as Dan talking to a retailer who owns the building. These rules go into CLAUDE.md for the build so they hold across every Claude Code session.

- **First person singular.** "I", never "we". There is one person; pretending otherwise undercuts the proposition.
- **Buyer language.** "Showroom", "shop floor", "the website", "online", "your Google ads". Not "DTC", "omnichannel", "growth engine", "full stack" or "fractional" in body copy. "Fractional ecommerce director" appears only where it is the search term: the /ecommerce-director title tag, H1 variant and FAQ.
- **Sector detail in every section.** If a paragraph could sit on any ecommerce consultant's site, rewrite it until it couldn't. Sofas, swatches, lead times, two-person delivery, square metres, Christmas peak.
- **Specific over abstract.** A number, a client name, a dated event. "16,193 records" not "thousands of fixes". No "best-in-class", "cutting-edge", "seamless", "elevate", "leverage", "empower", "unlock", "tapestry", "delve".
- **Lead with the uncomfortable point.** Each page and article opens with the thing the reader would rather not hear, then helps.
- **One misconception corrected per piece.** "Shopify Plus pays for itself later than agencies say." "The showroom sale your site made doesn't show in GA4."
- **British English, no em dashes.** Commas, full stops, colons. Sentences under 25 words where possible. Paragraphs of three sentences or fewer.
- **No warm-ups.** No "In today's competitive landscape". No restating the heading in the first sentence.
- **Honest about scope.** Where there is no named client for a sector, say so rather than imply one. "I haven't run a lighting retailer yet; here's the catalogue work that transfers."
- **Design follows the same rules.** Type-led, minimal, one accent colour, Dan's face once on the homepage and once on About. No dashboard mock-ups, no capability badges, no automation theatre. Real screenshots of real catalogues and reports are the imagery.

Also: sentence case for every heading and button, and no em dashes anywhere, comments and code strings included. Never write "three partners", "max 3" or any client count as a capacity claim: the roster is "a small roster", stated once.

## Conventions

- TypeScript strict; Tailwind utilities on the tokens; no inline styles except where a component computes a value.
- Components in `components/`; page-only pieces stay in their route folder.
- Images: real photographs and screenshots only, under 150kb, WebP, optimised before they ship (`images.unoptimized` is on), with descriptive alt text.
- Client photographs: the originals live in `assets/photos/`, outside `public/`, so they never deploy. They are kept locally and are not in git (`.gitignore`), like `docs/brand`: `node scripts/images.mjs` (`npm run images`) needs them to regenerate the committed WebP renditions in `public/images/` and `lib/images.ts`, and leaves both as they are when the originals are missing. `lib/images.ts` is generated: change crops and alt text in the script, never in the output. Source URLs and dates are in `public/images/CREDITS.md`; permission status is in `docs/permissions.md` (local only).
- Proof figures: `lib/content/proof-data.ts` is committed and holds the public figures only. `lib/content/*.private.ts` is gitignored; when `lib/content/proof-data.private.ts` exists, `next.config.mjs` swaps it in at build (restart `next dev` after adding or removing it). Both export the same `ProofData` type, so both builds type-check. A build from git, as Netlify runs it, shows the public version.
- Python scripts that touch `.claude/skills` run with `python3 -I -B`, so no `__pycache__` lands in the repo.
