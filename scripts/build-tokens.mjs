#!/usr/bin/env node
// Builds the design tokens: reads docs/brand/tokens.json, merges design/tokens.additions.json after it, and writes
// app/styles/tokens.css and lib/design/tokens.ts. Both outputs are committed.
//
// Run by hand with `npm run tokens`. docs/brand is kept out of git because the repo is public, so nothing at build
// or deploy time may run this script or read docs/brand: the committed outputs are the build's only source.
// It also writes lib/design/tokens.docs.ts: every token's value, usage note and proposal status, plus the type samples,
// for the /design-system page.

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const BRAND_FILE = 'docs/brand/tokens.json';
const ADDITIONS_FILE = 'design/tokens.additions.json';
const CSS_OUT = 'app/styles/tokens.css';
const TS_OUT = 'lib/design/tokens.ts';
const DOCS_OUT = 'lib/design/tokens.docs.ts';
const HEADER = 'generated from docs/brand/tokens.json, do not edit.';

// next/font variables that app/layout.tsx sets on <html>, keyed by the first family of each tokens.json stack.
// The generated stack reads the self-hosted font first and keeps the brand's fallbacks after it.
const NEXT_FONT_VARIABLES = {
  Newsreader: '--font-newsreader',
  'Schibsted Grotesk': '--font-schibsted-grotesk',
};

// Pairs checked on every run, from the usage notes in tokens.json and the additions. [foreground, ground, minimum]
const CONTRAST_PAIRS = [
  ['ink', 'paper', 4.5],
  ['ink', 'paper-raised', 4.5],
  ['ink-muted', 'paper', 4.5],
  ['ink-muted', 'paper-raised', 4.5],
  ['green-700', 'paper', 4.5],
  ['brass-600', 'paper', 4.5],
  ['on-green', 'green-900', 4.5],
  ['on-green', 'green-700', 4.5],
  ['ink', 'brass-300', 4.5],
  ['link-on-highlight', 'brass-300', 4.5],
  ['on-band', 'band', 4.5],
  ['signal-critical', 'paper-raised', 4.5],
  ['signal-good', 'paper', 3],
  ['rule-strong', 'paper', 3],
  ['rule-strong', 'paper-raised', 3],
  ['focus', 'paper', 3],
  ['focus', 'paper-raised', 3],
  ['focus', 'band', 3],
  ['focus-on-highlight', 'brass-300', 3],
  ['band', 'button-on-band-hover', 4.5],
  ['rule-strong-on-band', 'band', 3],
];

// Type samples the public repo cannot carry as tokens.json writes them. The figure sample there is a client figure
// that needs the client's written permission, so the generated docs show a figure already public on the live site.
const PUBLIC_SAMPLES = {
  figure: '16,193',
};

// ------------------------------------------------------------------ input

function readJson(rel) {
  const file = resolve(ROOT, rel);
  if (!existsSync(file)) {
    console.error(`build-tokens: ${rel} not found. It lives outside git; copy the brand folder into docs/brand first.`);
    process.exit(1);
  }
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    console.error(`build-tokens: ${rel} is not valid JSON: ${error.message}`);
    process.exit(1);
  }
}

const brand = readJson(BRAND_FILE);
const additions = readJson(ADDITIONS_FILE);
const fail = (message) => {
  console.error(`build-tokens: ${message}`);
  process.exit(1);
};
const requireProposal = (entry, where) => {
  if (!entry.status) fail(`${where} "${entry.name}" in ${ADDITIONS_FILE} has no status.`);
  if (!entry.reason) fail(`${where} "${entry.name}" in ${ADDITIONS_FILE} has no reason.`);
};
// Copy is written without em dashes; comments carried over from the JSON are held to the same rule.
const clean = (text = '') => text.replace(/\u2014/g, ',').replace(/\*\//g, '* /');
const pxNumber = (value) => {
  const match = /^(\d+(?:\.\d+)?)px$/.exec(value);
  if (!match) fail(`"${value}" is not a px value.`);
  return Number(match[1]);
};

// ------------------------------------------------------------------ colour

const THEMES = brand.color.themes.map((theme) => theme.id);
if (THEMES.join() !== 'light,dark') fail(`expected the themes light and dark, found ${THEMES.join(', ')}.`);

/** name -> { value: {light, dark}, usage, proposed, reason, was } in tokens.json order, additions after */
const colours = new Map();
for (const token of brand.color.tokens) {
  colours.set(token.name, { value: token.value, usage: token.usage, proposed: false });
}
for (const token of additions.color?.tokens ?? []) {
  requireProposal(token, 'Colour');
  const existing = colours.get(token.name);
  colours.set(token.name, {
    value: token.value,
    usage: token.usage ?? existing?.usage,
    proposed: true,
    reason: token.reason,
    was: existing ? existing.value : undefined,
  });
}

const HEX = /^#[0-9a-f]{6}$/i;
const REF = /^\{([a-z0-9-]+)\}$/;
const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const rgbToHex = (rgb) => `#${rgb.map((c) => Math.round(c).toString(16).padStart(2, '0')).join('')}`;

/** The hex a colour token has in a theme, following references and computing mixes. */
function resolveHex(name, theme, seen = []) {
  if (seen.includes(name)) fail(`colour reference loop: ${[...seen, name].join(' -> ')}`);
  const token = colours.get(name);
  if (!token) fail(`unknown colour token "${name}" (referenced from ${seen.at(-1) ?? 'a pair'}).`);
  const raw = token.value[theme];
  if (raw === undefined) fail(`colour "${name}" has no ${theme} value.`);
  return resolveRaw(raw, theme, [...seen, name]);
}

function resolveRaw(raw, theme, seen) {
  if (typeof raw === 'string' && HEX.test(raw)) return raw.toLowerCase();
  if (typeof raw === 'string' && REF.test(raw)) return resolveHex(REF.exec(raw)[1], theme, seen);
  if (raw && typeof raw === 'object' && 'mix' in raw) {
    const weight = Number(raw.weight);
    if (!(weight > 0 && weight < 1)) fail(`mix weight for "${seen.at(-1)}" must be between 0 and 1.`);
    const a = hexToRgb(resolveHex(raw.mix, theme, seen));
    const b = hexToRgb(resolveHex(raw.into, theme, seen));
    return rgbToHex(a.map((channel, i) => channel * weight + b[i] * (1 - weight)));
  }
  fail(`colour "${seen.at(-1)}" has an unreadable ${theme} value: ${JSON.stringify(raw)}`);
}

/** The CSS value for a colour in a theme: hex, or var() for a plain reference so the link stays live in CSS. */
function cssColour(name, theme) {
  const raw = colours.get(name).value[theme];
  if (typeof raw === 'string' && REF.test(raw)) {
    const ref = REF.exec(raw)[1];
    resolveHex(ref, theme, [name]);
    return `var(--${ref})`;
  }
  return resolveHex(name, theme);
}

const describeRaw = (raw) => {
  if (typeof raw === 'string') return raw;
  return `${raw.mix} at ${Math.round(raw.weight * 100)}% into ${raw.into}`;
};

// ------------------------------------------------------------------ type

const families = brand.type.families;

// Metric-matched local fallback faces (size-adjust and the metric overrides), keyed by family name: tokens.json
// type.fonts first, additions after.
const fontFallbacks = new Map();
for (const font of brand.type.fonts ?? []) if (font.fallback) fontFallbacks.set(font.family, { ...font, proposed: false });
for (const font of additions.type?.fonts ?? []) {
  requireProposal({ ...font, name: font.family }, 'Font');
  fontFallbacks.set(font.family, { ...font, proposed: true });
}

function fontStack(stack) {
  const parts = stack.split(',').map((part) => part.trim());
  const first = parts[0].replace(/^"|"$/g, '');
  const variable = NEXT_FONT_VARIABLES[first];
  const fallback = fontFallbacks.get(first)?.fallback;
  const head = variable ? [`var(${variable}, ${parts[0]})`] : [parts[0]];
  if (!variable) console.warn(`build-tokens: no next/font variable for "${first}"; its name is emitted as written.`);
  // The adjusted fallback goes straight after the web font, so it is what shows until the swap.
  if (fallback) head.push(`"${fallback.name}"`);
  return [...head, ...parts.slice(1)].join(', ');
}

const typeAdditions = new Map((additions.type?.styles ?? []).map((style) => {
  requireProposal(style, 'Type style');
  return [style.name, style];
}));

const typeStyles = brand.type.groups.flatMap((group) =>
  group.styles.map((style) => ({ ...style, family: group.family, addition: typeAdditions.get(style.name) })),
);
for (const name of typeAdditions.keys()) {
  if (!typeStyles.some((style) => style.name === name)) fail(`type addition "${name}" names no style in tokens.json.`);
}

// ------------------------------------------------------------------ scales

const spacingTokens = brand.spacing.tokens.map((token) => ({ ...token, proposed: false }));
const layoutTokens = (additions.layout?.tokens ?? []).map((token) => {
  requireProposal(token, 'Layout token');
  return { ...token, proposed: true };
});
const radiusTokens = brand.radius.tokens;
const zTokens = (additions.zIndex?.tokens ?? []).map((token) => {
  requireProposal(token, 'z-index token');
  return token;
});
const motionTokens = (additions.motion?.tokens ?? []).map((token) => {
  requireProposal(token, 'Motion token');
  return token;
});

/** min-width in px -> declarations for :root at that width */
const steps = new Map();
const addStep = (minWidth, declaration) => {
  const px = pxNumber(minWidth);
  if (!steps.has(px)) steps.set(px, []);
  steps.get(px).push(declaration);
};
const baseOfSteps = (list, key, owner) => {
  if (!list?.length || list[0].minWidth) fail(`the first step of "${owner}" must have no minWidth (it is the base).`);
  return list[0][key];
};

// ------------------------------------------------------------------ tokens.css

const css = [];
const line = (text = '') => css.push(text);
const PROPOSED = 'PROPOSED, pending approval: see design/tokens.additions.json.';

line(`/* ${HEADER} */`);
line(`/* Merged with ${ADDITIONS_FILE}: every line marked PROPOSED comes from it and is pending the brand owner's`);
line('   approval. Regenerate with `npm run tokens` (needs docs/brand/tokens.json locally; the build never reads it). */');
line();

function colourBlock(theme, indent) {
  const out = [];
  out.push(`${indent}color-scheme: ${theme};`);
  for (const [name, token] of colours) {
    if (theme === 'light') {
      const notes = [];
      if (token.usage) notes.push(clean(token.usage));
      if (token.proposed) notes.push(token.was ? `${PROPOSED} Was ${describeRaw(token.was.light)} (light), ${describeRaw(token.was.dark)} (dark).` : PROPOSED);
      for (const note of notes) out.push(`${indent}/* ${note} */`);
    } else if (token.proposed) {
      out.push(`${indent}/* ${name}: ${PROPOSED} */`);
    }
    const raw = token.value[theme];
    const value = cssColour(name, theme);
    const derived = raw && typeof raw === 'object' ? ` /* ${describeRaw(raw)} */` : '';
    out.push(`${indent}--${name}: ${value};${derived}`);
  }
  return out;
}

line('/* ------------------------------------------------------------------ colour */');
line('/* Light: the default, and any subtree marked data-theme="light". */');
line(':root,');
line('[data-theme="light"] {');
colourBlock('light', '  ').forEach((l) => line(l));
line('}');
line();
line('/* Dark: chosen with the theme toggle, on <html> or a subtree. */');
line('[data-theme="dark"] {');
colourBlock('dark', '  ').forEach((l) => line(l));
line('}');
line();
line('/* Dark: the system setting, until the visitor chooses light. */');
line('@media (prefers-color-scheme: dark) {');
line('  :root:not([data-theme="light"]) {');
colourBlock('dark', '    ').forEach((l) => line(l));
line('  }');
line('}');
line();

if (fontFallbacks.size) {
  line('/* ------------------------------------------------------------------ fallback faces');
  line('   Local fonts scaled to the web font\'s metrics, so text does not reflow when the web font swaps in. */');
  for (const [family, font] of fontFallbacks) {
    const f = font.fallback;
    line(`/* ${family}${font.proposed ? `: ${PROPOSED}` : ''} */`);
    line('@font-face {');
    line(`  font-family: "${f.name}";`);
    line(`  src: ${f.local.map((name) => `local("${name}")`).join(', ')};`);
    line(`  size-adjust: ${f.sizeAdjust};`);
    line(`  ascent-override: ${f.ascentOverride};`);
    line(`  descent-override: ${f.descentOverride};`);
    line(`  line-gap-override: ${f.lineGapOverride};`);
    line('}');
  }
  line();
}

line('/* ------------------------------------------------------------------ type, spacing, radius, layout, z-index, motion */');
line(':root {');
line('  /* Families: the next/font face first (set on <html> by app/layout.tsx), then any metric-matched fallback');
line('     face, then the brand\'s fallbacks. */');
for (const [family, stack] of Object.entries(families)) line(`  --font-${family}: ${fontStack(stack)};`);
line();
line('  /* Type style properties, read by the type classes below. */');
for (const style of typeStyles) {
  const add = style.addition;
  let size = style.fontSize;
  if (add?.steps) {
    size = baseOfSteps(add.steps, 'fontSize', style.name);
    for (const step of add.steps.slice(1)) addStep(step.minWidth, `--${style.name}-font-size: ${step.fontSize}; /* PROPOSED */`);
    const widest = add.steps.at(-1).fontSize;
    if (widest !== style.fontSize) console.warn(`build-tokens: ${style.name} widest step ${widest} differs from tokens.json ${style.fontSize}.`);
  }
  const proposedNote = add?.steps ? ' /* PROPOSED: responsive steps, tokens.json size applies from the widest step */' : '';
  line(`  --${style.name}-font-size: ${size};${proposedNote}`);
  line(`  --${style.name}-line-height: ${style.lineHeight};`);
  line(`  --${style.name}-font-weight: ${style.fontWeight};`);
  if (style.letterSpacing) line(`  --${style.name}-letter-spacing: ${style.letterSpacing};`);
}
line();
line('  /* Spacing */');
for (const token of spacingTokens) line(`  --${token.name}: ${token.value}; /* ${clean(token.usage)} */`);
line();
line('  /* Radius */');
for (const token of radiusTokens) line(`  --${token.name}: ${token.value}; /* ${clean(token.usage)} */`);
line();
line(`  /* Layout: ${PROPOSED} */`);
for (const token of layoutTokens) {
  let value = token.value;
  if (token.steps) {
    value = baseOfSteps(token.steps, 'value', token.name);
    for (const step of token.steps.slice(1)) addStep(step.minWidth, `--${token.name}: ${step.value}; /* PROPOSED */`);
  }
  line(`  --${token.name}: ${value}; /* ${clean(token.usage)} */`);
}
line();
line(`  /* z-index scale: ${PROPOSED} */`);
for (const token of zTokens) line(`  --z-${token.name}: ${token.value};`);
line();
line(`  /* Motion: ${PROPOSED} */`);
for (const token of motionTokens) line(`  --${token.name}: ${token.value};`);
line('}');
line();

const sortedSteps = [...steps.entries()].sort((a, b) => a[0] - b[0]);
if (sortedSteps.length) {
  line('/* Responsive steps (PROPOSED), mobile first. */');
  for (const [px, declarations] of sortedSteps) {
    line(`@media (min-width: ${px}px) {`);
    line('  :root {');
    declarations.forEach((d) => line(`    ${d}`));
    line('  }');
    line('}');
  }
  line();
}

line('/* ------------------------------------------------------------------ type styles');
line('   One class per tokens.json style, named exactly as the token. Newsreader styles set optical sizing to auto so the');
line('   large cuts stay sharp and the italic stays readable (brand book, Type). Colour is not part of a type style. */');
for (const style of typeStyles) {
  const add = style.addition;
  line(`.${style.name} {`);
  line(`  font-family: var(--font-${style.family});`);
  line(`  font-size: var(--${style.name}-font-size);`);
  line(`  line-height: var(--${style.name}-line-height);`);
  line(`  font-weight: var(--${style.name}-font-weight);`);
  if (style.letterSpacing) line(`  letter-spacing: var(--${style.name}-letter-spacing);`);
  if (style.fontStyle) line(`  font-style: ${style.fontStyle};`);
  if (style.family === 'display') line('  font-optical-sizing: auto;');
  if (add?.fontVariationSettings) line(`  font-variation-settings: ${add.fontVariationSettings}; /* PROPOSED */`);
  if (add?.fontVariantNumeric) line(`  font-variant-numeric: ${add.fontVariantNumeric}; /* PROPOSED */`);
  if (add?.textTransform) line(`  text-transform: ${add.textTransform}; /* PROPOSED */`);
  line('}');
}

// ------------------------------------------------------------------ lib/design/tokens.ts

const q = (value) => `'${String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
const key = (name) => (/^[a-z][a-zA-Z0-9]*$/.test(name) ? name : q(name));
const objectLiteral = (entries, indent = '  ') => entries.map(([k, v]) => `${indent}${key(k)}: ${v},`).join('\n');

const ts = [];
const tsLine = (text = '') => ts.push(text);
const durationKey = (name) => name.replace(/^duration-/, '');
const easeKey = (name) => name.replace(/^ease-/, '');
const durations = motionTokens.filter((t) => t.name.startsWith('duration-'));
const eases = motionTokens.filter((t) => t.name.startsWith('ease-'));
const maxWidthNames = ['measure', 'measure-lg', 'container'];
const knownSizes = new Set([...spacingTokens, ...layoutTokens].map((t) => t.name));
for (const name of maxWidthNames) if (!knownSizes.has(name)) fail(`maxWidth needs a "${name}" token.`);

tsLine(`// ${HEADER}`);
tsLine(`// Merged with ${ADDITIONS_FILE}; the names in \`proposed\` are pending the brand owner's approval.`);
tsLine('// Regenerate with `npm run tokens`. Values are the custom properties defined in app/styles/tokens.css, so the');
tsLine('// theme flips without a rebuild; tailwind.config.ts and lib/utils.ts read these objects.');
tsLine();
tsLine('/** Colour tokens as CSS custom properties. */');
tsLine('export const colors = {');
tsLine(objectLiteral([...colours.keys()].map((name) => [name, q(`var(--${name})`)])));
tsLine('} as const;');
tsLine();
tsLine('export type ColorToken = keyof typeof colors;');
tsLine();
tsLine('/** Resolved hex per theme, for places a custom property cannot reach (theme-color metadata, contrast checks). */');
tsLine('export const colorValues = {');
tsLine(objectLiteral([...colours.keys()].map((name) => [name, `{ light: ${q(resolveHex(name, 'light'))}, dark: ${q(resolveHex(name, 'dark'))} }`])));
tsLine('} as const;');
tsLine();
tsLine('/** Spacing scale plus the measure, container and layout tokens. */');
tsLine('export const spacing = {');
tsLine(objectLiteral([...spacingTokens, ...layoutTokens].map((t) => [t.name, q(`var(--${t.name})`)])));
tsLine('} as const;');
tsLine();
tsLine('/** Column widths, for max-width. */');
tsLine('export const maxWidth = {');
tsLine(objectLiteral(maxWidthNames.map((name) => [name, q(`var(--${name})`)])));
tsLine('} as const;');
tsLine();
tsLine('export const borderRadius = {');
tsLine(objectLiteral(radiusTokens.map((t) => [t.name, q(`var(--${t.name})`)])));
tsLine('} as const;');
tsLine();
tsLine('/** Font families: --font-display (Newsreader) and --font-sans (Schibsted Grotesk). */');
tsLine('export const fontFamily = {');
tsLine(objectLiteral(Object.keys(families).map((family) => [family, q(`var(--font-${family})`)])));
tsLine('} as const;');
tsLine();
tsLine('/** The stacks as tokens.json writes them, without the next/font variable. */');
tsLine('export const fontStacks = {');
tsLine(objectLiteral(Object.entries(families).map(([family, stack]) => [family, q(stack)])));
tsLine('} as const;');
tsLine();
tsLine('/** The type style classes in app/styles/tokens.css. */');
tsLine(`export const typeStyleNames = [${typeStyles.map((s) => q(s.name)).join(', ')}] as const;`);
tsLine();
tsLine('export type TypeStyle = (typeof typeStyleNames)[number];');
tsLine();
tsLine('export const typeStyles = {');
for (const style of typeStyles) {
  const parts = [`family: ${q(style.family)}`, `fontSize: ${q(style.fontSize)}`, `lineHeight: ${q(style.lineHeight)}`, `fontWeight: ${style.fontWeight}`];
  if (style.letterSpacing) parts.push(`letterSpacing: ${q(style.letterSpacing)}`);
  if (style.fontStyle) parts.push(`fontStyle: ${q(style.fontStyle)}`);
  if (style.addition?.steps) {
    parts.push(`steps: [${style.addition.steps.map((s) => `{ minWidth: ${s.minWidth ? pxNumber(s.minWidth) : 0}, fontSize: ${q(s.fontSize)} }`).join(', ')}]`);
  }
  tsLine(`  ${key(style.name)}: { ${parts.join(', ')} },`);
}
tsLine('} as const;');
tsLine();
tsLine('/** z-index scale, for the z-* utilities. */');
tsLine('export const zIndex = {');
tsLine(objectLiteral(zTokens.map((t) => [t.name, q(`var(--z-${t.name})`)])));
tsLine('} as const;');
tsLine();
tsLine('export const zIndexValues = {');
tsLine(objectLiteral(zTokens.map((t) => [t.name, String(t.value)])));
tsLine('} as const;');
tsLine();
tsLine('/** Transition durations, for the duration-* utilities. */');
tsLine('export const transitionDuration = {');
tsLine(objectLiteral(durations.map((t) => [durationKey(t.name), q(`var(--${t.name})`)])));
tsLine('} as const;');
tsLine();
tsLine('/** The same durations in milliseconds, for GSAP. */');
tsLine('export const durationMs = {');
tsLine(objectLiteral(durations.map((t) => [durationKey(t.name), String(parseFloat(t.value))])));
tsLine('} as const;');
tsLine();
tsLine('export const transitionTimingFunction = {');
tsLine(objectLiteral(eases.map((t) => [easeKey(t.name), q(`var(--${t.name})`)])));
tsLine('} as const;');
tsLine();
tsLine('/** Raw easing curves, for GSAP (CustomEase) or inline use. */');
tsLine('export const easing = {');
tsLine(objectLiteral(eases.map((t) => [easeKey(t.name), q(t.value)])));
tsLine('} as const;');
tsLine();
const proposedNames = [
  ...[...colours].filter(([, t]) => t.proposed).map(([name]) => `colour ${name}`),
  ...[...fontFallbacks].filter(([, f]) => f.proposed).map(([family]) => `font ${family} fallback`),
  ...typeStyles.filter((s) => s.addition).map((s) => `type ${s.name}`),
  ...layoutTokens.map((t) => `layout ${t.name}`),
  ...zTokens.map((t) => `z-index ${t.name}`),
  ...motionTokens.map((t) => `motion ${t.name}`),
];
tsLine(`/** Tokens whose values come from ${ADDITIONS_FILE}, pending the brand owner's approval. */`);
tsLine('export const proposed = [');
proposedNames.forEach((name) => tsLine(`  ${q(name)},`));
tsLine('] as const;');

// ------------------------------------------------------------------ lib/design/tokens.docs.ts

// A colour's source as the system writes it: a hex, another token's name, or a mix.
const describeSource = (raw) => {
  if (typeof raw === 'string' && REF.test(raw)) return REF.exec(raw)[1];
  return describeRaw(raw).toLowerCase();
};
const cleanDeep = (value) => {
  if (typeof value === 'string') return clean(value);
  if (Array.isArray(value)) return value.map(cleanDeep);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).filter(([, v]) => v !== undefined).map(([k, v]) => [k, cleanDeep(v)]));
  }
  return value;
};
const additionColours = new Map((additions.color?.tokens ?? []).map((token) => [token.name, token]));
const additionLayout = new Map((additions.layout?.tokens ?? []).map((token) => [token.name, token]));

const colourDocs = [...colours].map(([name, token]) => {
  const addition = additionColours.get(name);
  return {
    name,
    light: resolveHex(name, 'light'),
    dark: resolveHex(name, 'dark'),
    source: { light: describeSource(token.value.light), dark: describeSource(token.value.dark) },
    usage: token.usage ?? '',
    proposed: token.proposed,
    change: addition?.change,
    reason: token.reason,
    was: token.was
      ? { light: describeSource(token.was.light), dark: describeSource(token.was.dark) }
      : undefined,
  };
});

const typeDocs = brand.type.groups.flatMap((group) =>
  group.styles.map((style) => {
    const add = typeAdditions.get(style.name);
    return {
      name: style.name,
      group: group.name,
      family: group.family,
      fontSize: style.fontSize,
      lineHeight: style.lineHeight,
      fontWeight: style.fontWeight,
      letterSpacing: style.letterSpacing,
      fontStyle: style.fontStyle,
      sample: PUBLIC_SAMPLES[style.name] ?? style.sample ?? style.name,
      usage: style.usage ?? '',
      proposed: add
        ? {
            change: add.change,
            reason: add.reason,
            steps: add.steps?.map((step) => ({ minWidth: step.minWidth ? pxNumber(step.minWidth) : 0, fontSize: step.fontSize })),
            fontVariationSettings: add.fontVariationSettings,
            fontVariantNumeric: add.fontVariantNumeric,
            textTransform: add.textTransform,
          }
        : undefined,
    };
  }),
);

const scaleDoc = (token) => ({ name: token.name, value: token.value, usage: token.usage ?? '' });
const layoutDocs = layoutTokens.map((token) => {
  const add = additionLayout.get(token.name);
  return {
    name: token.name,
    value: token.steps ? baseOfSteps(token.steps, 'value', token.name) : token.value,
    steps: token.steps?.map((step) => ({ minWidth: step.minWidth ? pxNumber(step.minWidth) : 0, value: step.value })),
    usage: token.usage ?? '',
    reason: add?.reason ?? '',
  };
});

const docs = {
  brandBasis: additions.basis ?? `docs/brand/tokens.json version ${brand.version}`,
  colourDocs,
  fontFallbackDocs: [...fontFallbacks].map(([family, font]) => ({
    family,
    ...font.fallback,
    proposed: font.proposed,
    reason: font.reason ?? '',
  })),
  typeDocs,
  spacingDocs: spacingTokens.map(scaleDoc),
  radiusDocs: radiusTokens.map(scaleDoc),
  layoutDocs,
  zIndexDocs: zTokens.map((token) => ({ name: token.name, value: token.value, reason: token.reason ?? '' })),
  motionDocs: motionTokens.map((token) => ({ name: token.name, value: token.value, reason: token.reason ?? '' })),
};

const DOC_TYPES = {
  brandBasis: 'string',
  colourDocs: 'readonly ColourDoc[]',
  fontFallbackDocs: 'readonly FontFallbackDoc[]',
  typeDocs: 'readonly TypeDoc[]',
  spacingDocs: 'readonly ScaleDoc[]',
  radiusDocs: 'readonly ScaleDoc[]',
  layoutDocs: 'readonly LayoutDoc[]',
  zIndexDocs: 'readonly ZIndexDoc[]',
  motionDocs: 'readonly MotionDoc[]',
};

const docsTs = [];
docsTs.push(`// ${HEADER}`);
docsTs.push(`// Merged with ${ADDITIONS_FILE}. Every token's value, source, usage note and proposal status, and the type`);
docsTs.push('// samples, for the /design-system page. Regenerate with `npm run tokens`; the build never reads docs/brand.');
docsTs.push('');
docsTs.push("import type { ColorToken, TypeStyle } from './tokens';");
docsTs.push('');
docsTs.push(`/** A colour token. source is what the system writes (a hex, another token, or a mix); light and dark are resolved. */
export interface ColourDoc {
  name: ColorToken;
  light: string;
  dark: string;
  source: { light: string; dark: string };
  usage: string;
  proposed: boolean;
  change?: string;
  reason?: string;
  /** The tokens.json value a proposal replaces. */
  was?: { light: string; dark: string };
}

/** A metric-matched local fallback face. */
export interface FontFallbackDoc {
  family: string;
  name: string;
  local: readonly string[];
  sizeAdjust: string;
  ascentOverride: string;
  descentOverride: string;
  lineGapOverride: string;
  proposed: boolean;
  reason: string;
}

/** A type style. proposed holds what the additions change. */
export interface TypeDoc {
  name: TypeStyle;
  group: string;
  family: 'display' | 'sans';
  fontSize: string;
  lineHeight: string;
  fontWeight: number;
  letterSpacing?: string;
  fontStyle?: string;
  sample: string;
  usage: string;
  proposed?: {
    change?: string;
    reason: string;
    steps?: readonly { minWidth: number; fontSize: string }[];
    fontVariationSettings?: string;
    fontVariantNumeric?: string;
    textTransform?: string;
  };
}

/** A spacing or radius token. */
export interface ScaleDoc {
  name: string;
  value: string;
  usage: string;
}

/** A proposed layout token; value is the base, steps the widths it changes at. */
export interface LayoutDoc {
  name: string;
  value: string;
  steps?: readonly { minWidth: number; value: string }[];
  usage: string;
  reason: string;
}

export interface ZIndexDoc {
  name: string;
  value: number;
  reason: string;
}

export interface MotionDoc {
  name: string;
  value: string;
  reason: string;
}`);
docsTs.push('');
for (const [name, value] of Object.entries(docs)) {
  docsTs.push(`export const ${name}: ${DOC_TYPES[name]} = ${JSON.stringify(cleanDeep(value), null, 2)};`);
  docsTs.push('');
}
docsTs.pop();

// ------------------------------------------------------------------ write

const write = (rel, text) => {
  const file = resolve(ROOT, rel);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, `${text.join('\n')}\n`);
  console.log(`build-tokens: wrote ${rel}`);
};
write(CSS_OUT, css);
write(TS_OUT, ts);
write(DOCS_OUT, docsTs);

// ------------------------------------------------------------------ contrast report

const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((c) => {
    const s = c / 255;
    return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
const ratio = (a, b) => {
  const [x, y] = [luminance(a), luminance(b)];
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
};

let failures = 0;
console.log('\nContrast (WCAG 2.x), both themes:');
for (const [fg, bg, min] of CONTRAST_PAIRS) {
  const cells = THEMES.map((theme) => {
    const value = ratio(resolveHex(fg, theme), resolveHex(bg, theme));
    if (value < min) failures += 1;
    return `${theme} ${value.toFixed(2)}${value < min ? ' FAIL' : ''}`;
  });
  console.log(`  ${`${fg} on ${bg}`.padEnd(34)} min ${String(min).padEnd(4)} ${cells.join('   ')}`);
}
console.log(failures ? `\n${failures} pair(s) below their minimum.` : '\nEvery checked pair meets its minimum.');
console.log(`${proposedNames.length} proposed token(s) merged from ${ADDITIONS_FILE}.`);
