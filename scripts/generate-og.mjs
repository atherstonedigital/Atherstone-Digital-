// Generates the social share image at 1200x630 as PNG (primary) and JPG (fallback).
// LinkedIn does not reliably render SVG OG images, so the metadata references the
// rasterised JPG. Regenerate after brand changes:  node scripts/generate-og.mjs
// Requires `sharp` (dev-only, not a runtime dependency). The committed PNG/JPG are
// the source of truth used by the site; this script only reproduces them.
//
// Note: the brand display face is Syne. If Syne is installed on the machine
// running this script it will be used; otherwise it falls back to a bold sans.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const DARK = '#060D08';
const LIME = '#4ADE80';
const TEXT = '#F1F5F9';
const MUTED = '#CBD5E1';
const display = "Syne, 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif";
const mono = "'DejaVu Sans Mono', 'Liberation Mono', monospace";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <radialGradient id="glow" cx="22%" cy="20%" r="70%">
      <stop offset="0%" stop-color="${LIME}" stop-opacity="0.16"/>
      <stop offset="55%" stop-color="${LIME}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="630" fill="${DARK}"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect x="0" y="0" width="1200" height="6" fill="${LIME}"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="${LIME}" stroke-opacity="0.12" stroke-width="1" rx="20"/>
  <text x="96" y="190" font-family="${mono}" font-size="26" letter-spacing="7" fill="${LIME}">FRACTIONAL ECOMMERCE DIRECTOR</text>
  <text x="92" y="330" font-family="${display}" font-weight="800" font-size="124" fill="${TEXT}">ATHERSTONE<tspan fill="${LIME}">.</tspan></text>
  <text x="96" y="410" font-family="${display}" font-weight="500" font-size="36" fill="${MUTED}">Fractional ecommerce help for £1M to £5M Shopify brands.</text>
  <text x="96" y="556" font-family="${mono}" font-size="24" letter-spacing="2" fill="${LIME}">atherstonedigital.com</text>
</svg>`;

const buf = Buffer.from(svg);

await sharp(buf).png().toFile(join(root, 'og-image.png'));
await sharp(buf).flatten({ background: DARK }).jpeg({ quality: 90 }).toFile(join(root, 'og-image.jpg'));

console.log('Wrote public/og-image.png and public/og-image.jpg (1200x630)');
