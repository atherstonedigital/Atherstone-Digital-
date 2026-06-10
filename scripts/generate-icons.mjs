// Rasterises the committed SVG brand assets:
//   public/favicon-a-clay.svg      -> public/apple-touch-icon.png (180x180)
//   public/og-ai-writing-tells.svg -> public/og-ai-writing-tells.png (1200x630)
// LinkedIn/X do not reliably render SVG OG images, so blog metadata references
// the PNG. Regenerate after brand changes:  node scripts/generate-icons.mjs
// Requires `sharp` (dev-only, not a runtime dependency).
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public');
const BONE = '#F3F0E8';

await sharp(join(root, 'favicon-a-clay.svg'), { density: 300 })
  .resize(180, 180)
  .flatten({ background: BONE })
  .png()
  .toFile(join(root, 'apple-touch-icon.png'));

await sharp(join(root, 'og-ai-writing-tells.svg'))
  .png()
  .toFile(join(root, 'og-ai-writing-tells.png'));

console.log('Wrote public/apple-touch-icon.png and public/og-ai-writing-tells.png');
