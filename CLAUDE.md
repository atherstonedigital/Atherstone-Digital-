# CLAUDE.md — Atherstone Digital

## Project Overview

Atherstone Digital is a fractional ecommerce director consultancy website built with Next.js 14 (App Router) and deployed as a static site on Netlify.

## Tech Stack

- **Framework**: Next.js 14 (App Router, `output: 'export'` for static generation)
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom brand theme
- **Hosting**: Netlify (static, `/out` directory)
- **Blog**: MDX-based via `next-mdx-remote` with `gray-matter` frontmatter parsing

## Key Commands

```bash
npm install       # Install dependencies
npm run dev       # Local dev server at http://localhost:3000
npm run build     # Static export to /out
npm run lint      # ESLint via Next.js
```

## Project Structure

```
app/                          # Next.js App Router pages
├── page.tsx                  # Homepage
├── layout.tsx                # Root layout
├── globals.css               # Global styles + Tailwind imports
├── services/[slug]/page.tsx  # Dynamic service pages
├── [locationSlug]/page.tsx   # Dynamic location/city pages
├── blog/[slug]/page.tsx      # Dynamic blog post pages
├── about/                    # About page
├── results/                  # Results/case studies
├── why-fractional/           # Why Fractional page
├── the-model/                # The Model page
├── fractional-ecommerce-director/
├── privacy/                  # Privacy policy
├── terms/                    # Terms of service
├── sitemap.ts                # Auto-generated sitemap.xml
└── robots.ts                 # Auto-generated robots.txt

components/                   # Shared React components
├── Header.tsx                # Site header/navigation
├── Footer.tsx                # Site footer
├── Hero.tsx                  # Homepage hero section
├── Contact.tsx               # Contact form
├── CustomCursor.tsx          # Custom cursor effect
├── LeadMagnet.tsx            # Lead magnet CTA
└── ThemeProvider.tsx          # Theme context provider

lib/
├── data.ts                   # Blog posts, locations, services data
└── config.ts                 # Site configuration

public/                       # Static assets (images, fonts)
```

## Brand & Design Tokens

Defined in `tailwind.config.ts` under `theme.extend.colors.brand`:

| Token              | Value                      | Usage                  |
|--------------------|-----------------------------|------------------------|
| `brand-dark`       | `#020604`                  | Page backgrounds       |
| `brand-surface`    | `#041812`                  | Card/section backgrounds |
| `brand-surfaceHighlight` | `#08261e`            | Hover/active surfaces  |
| `brand-primary`    | `#00DC82`                  | Primary green CTA/links |
| `brand-accent`     | `#CCF078`                  | Accent lime highlights |
| `brand-text`       | `#f1f5f9`                  | Body text (light)      |
| `brand-muted`      | `#94a3b8`                  | Secondary/muted text   |
| `brand-border`     | `rgba(255, 255, 255, 0.08)` | Subtle borders        |

Fonts: Inter (body), Space Grotesk (display headings), JetBrains Mono (code).

## Content Management

- **Blog posts**: Add entries to the `BLOG_POSTS` array in `lib/data.ts`
- **Location pages**: Add entries to `LOCATIONS_DATA` in `lib/data.ts` — include unique `uniqueContent` per city to avoid duplicate content penalties
- **Services**: Defined in `lib/data.ts` with dynamic routing via `app/services/[slug]/`

## SEO

Every page exports `metadata` with unique title + description. JSON-LD structured data is added per page type (`LocalBusiness`, `FAQPage`, `BlogPosting`). Sitemap and robots.txt are auto-generated.

## Coding Conventions

- Use TypeScript strict mode
- Use Tailwind utility classes; avoid inline styles
- Use the `brand-*` color tokens from the Tailwind config — do not hardcode hex values
- Components go in `components/`; page-level components stay in their `app/` route folder
- Keep `lib/data.ts` as the single source of truth for content data
- Static export only — no server-side features (no API routes, no SSR, no middleware)
- All images in `public/` — use Next.js `<Image>` component with explicit dimensions
