// Generates the social share image at 1200x630 as PNG (primary) and JPG (fallback).
// LinkedIn does not reliably render SVG OG images, so the metadata references the
// rasterised JPG. Regenerate after brand changes:  node scripts/generate-og.mjs
// Requires `sharp` (dev-only, not a runtime dependency). The committed PNG/JPG are
// the source of truth used by the site; this script only reproduces them.
//
// Note: the brand display face is Fraunces. If Fraunces is installed on the machine
// running this script it will be used; otherwise it falls back to a bold serif.
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');

const BONE = '#F3F0E8';
const CLAY = '#BC4A2B';
const INK = '#17150F';
const MUTED = '#6B6557';
const display = "Fraunces, Georgia, 'DejaVu Serif', serif";
const sans = "'Hanken Grotesk', 'DejaVu Sans', 'Liberation Sans', Arial, sans-serif";

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${BONE}"/>
  <rect x="0" y="0" width="1200" height="6" fill="${CLAY}"/>
  <rect x="40" y="40" width="1120" height="550" fill="none" stroke="${CLAY}" stroke-opacity="0.15" stroke-width="1" rx="20"/>
  <text x="96" y="190" font-family="${sans}" font-size="22" letter-spacing="6" fill="${CLAY}" text-transform="uppercase">SHOPIFY ECOMMERCE CONSULTANT</text>
  <text x="92" y="330" font-family="${display}" font-weight="800" font-size="124" fill="${INK}">ATHERSTONE<tspan fill="${CLAY}">.</tspan></text>
  <text x="96" y="410" font-family="${display}" font-weight="500" font-size="36" fill="${MUTED}">Senior Shopify operator for brands doing £500k to £5M.</text>
  <text x="96" y="556" font-family="${sans}" font-size="24" letter-spacing="2" fill="${CLAY}">atherstonedigital.com</text>
</svg>`;

const buf = Buffer.from(svg);

await sharp(buf).png().toFile(join(root, 'og-image.png'));
await sharp(buf).flatten({ background: BONE }).jpeg({ quality: 90 }).toFile(join(root, 'og-image.jpg'));

console.log('Wrote public/og-image.png and public/og-image.jpg (1200x630)');
