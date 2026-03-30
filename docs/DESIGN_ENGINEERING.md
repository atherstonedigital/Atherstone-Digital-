# Design Engineering Reference — Atherstone Digital

## Visual Identity

Atherstone Digital uses a dark-mode-first aesthetic with vivid green accents. The visual language communicates technical precision and premium quality — fitting for a fractional ecommerce director targeting DTC brands and Shopify Plus merchants.

### Color System

| Role        | Token                  | Hex / Value                 | Notes                                    |
|-------------|------------------------|-----------------------------|------------------------------------------|
| Background  | `brand-dark`           | `#020604`                   | Near-black with a green undertone        |
| Surface     | `brand-surface`        | `#041812`                   | Cards, sections, elevated containers     |
| Surface HL  | `brand-surfaceHighlight` | `#08261e`                 | Hover states, active elements            |
| Primary     | `brand-primary`        | `#00DC82`                   | CTAs, links, key UI accents              |
| Accent      | `brand-accent`         | `#CCF078`                   | Secondary highlights, badges, tags       |
| Text        | `brand-text`           | `#f1f5f9`                   | Primary body text (Slate 100)            |
| Muted       | `brand-muted`          | `#94a3b8`                   | Secondary text, captions (Slate 400)     |
| Border      | `brand-border`         | `rgba(255, 255, 255, 0.08)` | Subtle dividers and card edges           |

### Typography

| Role      | Font Family     | Tailwind Class   | Usage                          |
|-----------|-----------------|------------------|--------------------------------|
| Body      | Inter           | `font-sans`      | Paragraphs, UI text            |
| Display   | Space Grotesk   | `font-display`   | Headings, hero titles          |
| Code      | JetBrains Mono  | `font-mono`      | Code snippets, technical text  |

### Animations

Defined in `tailwind.config.ts`:

- **`blob`** — Slow floating movement (7s infinite) for ambient background blobs
- **`fade-in`** — 0.5s ease-out fade + slide-up for scroll-reveal elements
- **`background-shine`** — 3s linear infinite gradient sweep for shimmer effects
- **`pulse-fast`** — 1.5s pulse for attention-drawing elements

## Component Patterns

### Layout

- Full-width dark background (`bg-brand-dark`) with contained content via `max-w-7xl mx-auto px-4`
- Sections use generous vertical padding (`py-20` to `py-32`)
- Cards use `bg-brand-surface` with `border border-brand-border rounded-2xl`

### Interactive Elements

- Primary buttons: `bg-brand-primary text-brand-dark` with hover darkening
- Links: `text-brand-primary` with underline on hover
- Cards lift on hover: `hover:-translate-y-1 transition-transform`
- Focus rings: `focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-dark`

### Responsive Breakpoints

Standard Tailwind breakpoints apply:

| Breakpoint | Min Width | Usage                        |
|------------|-----------|------------------------------|
| `sm`       | 640px     | Single → two column layouts  |
| `md`       | 768px     | Navigation switches to desktop |
| `lg`       | 1024px    | Three column grids           |
| `xl`       | 1280px    | Max content width            |

## Page Templates

### Homepage (`app/page.tsx`)
Hero → Services overview → Social proof / testimonials → CTA

### Service Page (`app/services/[slug]/page.tsx`)
Service hero → Features/benefits → Process → FAQ → CTA

### Location Page (`app/[locationSlug]/page.tsx`)
Location hero → Local context (unique content) → Services → FAQ → CTA
Includes `LocalBusiness` + `FAQPage` JSON-LD schema.

### Blog Post (`app/blog/[slug]/page.tsx`)
Article header (title, date, read time) → MDX content → Related posts → CTA
Includes `BlogPosting` JSON-LD schema.

## Asset Guidelines

- All static assets live in `public/`
- Use Next.js `<Image>` with explicit `width` and `height` props
- Prefer WebP or SVG formats where possible
- Logo and brand marks go in `public/` root or `public/images/`

## Accessibility

- Maintain color contrast ratios: `brand-text` on `brand-dark` meets WCAG AA
- All interactive elements must be keyboard-navigable
- Use semantic HTML elements (`<nav>`, `<main>`, `<article>`, `<section>`)
- Images require meaningful `alt` text
- Focus states must be visible (use `focus:ring-*` utilities)

## Performance

- Static export means zero server-side rendering cost
- Minimize JS bundle — avoid heavy client-side libraries
- Use `loading="lazy"` on below-fold images
- Keep Lighthouse scores above 90 across all categories
