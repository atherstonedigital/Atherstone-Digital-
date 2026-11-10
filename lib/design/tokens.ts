// generated from docs/brand/tokens.json, do not edit.
// Merged with design/tokens.additions.json; the names in `proposed` are pending the brand owner's approval.
// Regenerate with `npm run tokens`. Values are the custom properties defined in app/styles/tokens.css, so the
// theme flips without a rebuild; tailwind.config.ts and lib/utils.ts read these objects.

/** Colour tokens as CSS custom properties. */
export const colors = {
  paper: 'var(--paper)',
  'paper-raised': 'var(--paper-raised)',
  ink: 'var(--ink)',
  'ink-muted': 'var(--ink-muted)',
  rule: 'var(--rule)',
  'rule-strong': 'var(--rule-strong)',
  'green-900': 'var(--green-900)',
  'green-700': 'var(--green-700)',
  'on-green': 'var(--on-green)',
  'brass-600': 'var(--brass-600)',
  'brass-300': 'var(--brass-300)',
  'signal-good': 'var(--signal-good)',
  'signal-critical': 'var(--signal-critical)',
  focus: 'var(--focus)',
  'focus-on-highlight': 'var(--focus-on-highlight)',
  'link-on-highlight': 'var(--link-on-highlight)',
  band: 'var(--band)',
  'on-band': 'var(--on-band)',
  'rule-on-band': 'var(--rule-on-band)',
} as const;

export type ColorToken = keyof typeof colors;

/** Resolved hex per theme, for places a custom property cannot reach (theme-color metadata, contrast checks). */
export const colorValues = {
  paper: { light: '#f5f6f3', dark: '#0e1612' },
  'paper-raised': { light: '#ffffff', dark: '#16211b' },
  ink: { light: '#121b16', dark: '#eceeea' },
  'ink-muted': { light: '#4f5a54', dark: '#a9b3ac' },
  rule: { light: '#cfd4ce', dark: '#2a3630' },
  'rule-strong': { light: '#78837c', dark: '#8a958e' },
  'green-900': { light: '#163a2c', dark: '#7fbf9e' },
  'green-700': { light: '#1f5c44', dark: '#5fa683' },
  'on-green': { light: '#f5f6f3', dark: '#0e1612' },
  'brass-600': { light: '#8a6520', dark: '#d9b45e' },
  'brass-300': { light: '#e9d9ae', dark: '#4a3b18' },
  'signal-good': { light: '#2f7d4f', dark: '#7fd19a' },
  'signal-critical': { light: '#a3342b', dark: '#f08a80' },
  focus: { light: '#a57825', dark: '#d9b45e' },
  'focus-on-highlight': { light: '#8a6520', dark: '#d9b45e' },
  'link-on-highlight': { light: '#1f5c44', dark: '#eceeea' },
  band: { light: '#163a2c', dark: '#25382e' },
  'on-band': { light: '#f5f6f3', dark: '#eceeea' },
  'rule-on-band': { light: '#546f64', dark: '#5d6b63' },
} as const;

/** Spacing scale plus the measure, container and layout tokens. */
export const spacing = {
  'space-1': 'var(--space-1)',
  'space-2': 'var(--space-2)',
  'space-3': 'var(--space-3)',
  'space-4': 'var(--space-4)',
  'space-6': 'var(--space-6)',
  'space-8': 'var(--space-8)',
  'space-12': 'var(--space-12)',
  'space-16': 'var(--space-16)',
  'space-24': 'var(--space-24)',
  measure: 'var(--measure)',
  container: 'var(--container)',
  'nav-height': 'var(--nav-height)',
  gutter: 'var(--gutter)',
  'measure-lg': 'var(--measure-lg)',
  'touch-target': 'var(--touch-target)',
  'sheet-width': 'var(--sheet-width)',
} as const;

/** Column widths, for max-width. */
export const maxWidth = {
  measure: 'var(--measure)',
  'measure-lg': 'var(--measure-lg)',
  container: 'var(--container)',
} as const;

export const borderRadius = {
  'radius-0': 'var(--radius-0)',
  'radius-sm': 'var(--radius-sm)',
  'radius-md': 'var(--radius-md)',
} as const;

/** Font families: --font-display (Newsreader) and --font-sans (Schibsted Grotesk). */
export const fontFamily = {
  display: 'var(--font-display)',
  sans: 'var(--font-sans)',
} as const;

/** The stacks as tokens.json writes them, without the next/font variable. */
export const fontStacks = {
  display: '"Newsreader", "Iowan Old Style", Georgia, serif',
  sans: '"Schibsted Grotesk", "Helvetica Neue", Arial, sans-serif',
} as const;

/** The type style classes in app/styles/tokens.css. */
export const typeStyleNames = ['display-1', 'display-2', 'figure', 'heading-1', 'quote', 'heading-2', 'eyebrow', 'body-lg', 'body', 'small', 'button'] as const;

export type TypeStyle = (typeof typeStyleNames)[number];

export const typeStyles = {
  'display-1': { family: 'display', fontSize: '64px', lineHeight: '1.0', fontWeight: 500, letterSpacing: '-0.015em', steps: [{ minWidth: 0, fontSize: '34px' }, { minWidth: 360, fontSize: '40px' }, { minWidth: 720, fontSize: '52px' }, { minWidth: 1024, fontSize: '64px' }] },
  'display-2': { family: 'display', fontSize: '44px', lineHeight: '1.05', fontWeight: 500, letterSpacing: '-0.01em' },
  figure: { family: 'display', fontSize: '72px', lineHeight: '1.0', fontWeight: 500, letterSpacing: '-0.02em' },
  'heading-1': { family: 'display', fontSize: '32px', lineHeight: '1.15', fontWeight: 500 },
  quote: { family: 'display', fontSize: '24px', lineHeight: '1.35', fontWeight: 400, fontStyle: 'italic' },
  'heading-2': { family: 'sans', fontSize: '22px', lineHeight: '1.3', fontWeight: 600 },
  eyebrow: { family: 'sans', fontSize: '12px', lineHeight: '1.2', fontWeight: 600, letterSpacing: '0.08em' },
  'body-lg': { family: 'sans', fontSize: '19px', lineHeight: '1.5', fontWeight: 400 },
  body: { family: 'sans', fontSize: '16px', lineHeight: '1.55', fontWeight: 400 },
  small: { family: 'sans', fontSize: '14px', lineHeight: '1.5', fontWeight: 400 },
  button: { family: 'sans', fontSize: '15px', lineHeight: '1.0', fontWeight: 600 },
} as const;

/** z-index scale, for the z-* utilities. */
export const zIndex = {
  content: 'var(--z-content)',
  nav: 'var(--z-nav)',
  dropdown: 'var(--z-dropdown)',
  'sheet-overlay': 'var(--z-sheet-overlay)',
  sheet: 'var(--z-sheet)',
  'skip-link': 'var(--z-skip-link)',
} as const;

export const zIndexValues = {
  content: 0,
  nav: 40,
  dropdown: 50,
  'sheet-overlay': 90,
  sheet: 100,
  'skip-link': 1000,
} as const;

/** Transition durations, for the duration-* utilities. */
export const transitionDuration = {
  colour: 'var(--duration-colour)',
  press: 'var(--duration-press)',
  drawer: 'var(--duration-drawer)',
} as const;

/** The same durations in milliseconds, for GSAP. */
export const durationMs = {
  colour: 150,
  press: 80,
  drawer: 320,
} as const;

export const transitionTimingFunction = {
  drawer: 'var(--ease-drawer)',
} as const;

/** Raw easing curves, for GSAP (CustomEase) or inline use. */
export const easing = {
  drawer: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
} as const;

/** Tokens whose values come from design/tokens.additions.json, pending the brand owner's approval. */
export const proposed = [
  'colour focus',
  'colour focus-on-highlight',
  'colour link-on-highlight',
  'colour band',
  'colour on-band',
  'colour rule-on-band',
  'font Newsreader fallback',
  'type display-1',
  'type figure',
  'type eyebrow',
  'layout nav-height',
  'layout gutter',
  'layout measure-lg',
  'layout touch-target',
  'layout sheet-width',
  'z-index content',
  'z-index nav',
  'z-index dropdown',
  'z-index sheet-overlay',
  'z-index sheet',
  'z-index skip-link',
  'motion duration-colour',
  'motion duration-press',
  'motion duration-drawer',
  'motion ease-drawer',
] as const;
