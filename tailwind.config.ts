import type { Config } from 'tailwindcss';
import {
  borderRadius,
  colors,
  fontFamily,
  spacing,
  transitionDuration,
  transitionTimingFunction,
  zIndex,
} from './lib/design/tokens';

const config: Config = {
  // dark: follows the theme the site shows: data-theme="dark" when chosen, otherwise the system setting unless the
  // visitor chose light (the same rule as app/styles/tokens.css). Token colours flip by themselves, so components
  // should rarely need dark: at all.
  darkMode: [
    'variant',
    [
      '&:where([data-theme="dark"], [data-theme="dark"] *)',
      '@media (prefers-color-scheme: dark) { &:where(:root:not([data-theme="light"]), :root:not([data-theme="light"]) *) }',
    ],
  ],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Every value comes from lib/design/tokens.ts, generated from docs/brand/tokens.json; no hex is written here.
      colors: {
        ...colors,
        // shadcn/ui's semantic names, mapped to the tokens in app/globals.css, so hand-written shadcn primitives
        // inherit the brand.
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        card: { DEFAULT: 'var(--card)', foreground: 'var(--card-foreground)' },
        popover: { DEFAULT: 'var(--popover)', foreground: 'var(--popover-foreground)' },
        primary: { DEFAULT: 'var(--primary)', foreground: 'var(--primary-foreground)' },
        muted: { foreground: 'var(--muted-foreground)' },
        accent: { DEFAULT: 'var(--accent)', foreground: 'var(--accent-foreground)' },
        destructive: { DEFAULT: 'var(--destructive)' },
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
      },
      // space-1 to space-24, measure, container and the layout tokens. Tailwind 3.4 feeds spacing into width,
      // max-width, min-height, inset and gap, so max-w-measure and min-h-touch-target work from here.
      spacing: { ...spacing },
      borderRadius: { ...borderRadius },
      // font-display and font-sans read --font-display and --font-sans: Newsreader and Schibsted Grotesk.
      fontFamily: {
        display: [fontFamily.display],
        sans: [fontFamily.sans],
      },
      zIndex: { ...zIndex },
      transitionDuration: { ...transitionDuration },
      transitionTimingFunction: { ...transitionTimingFunction },
    },
  },
  plugins: [],
};

export default config;
