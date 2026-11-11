// The image pipeline (Phase 2.6): every original in assets/photos/ becomes graded, cropped WebP renditions in
// public/images/ plus a 24px blurred placeholder, and lib/images.ts is rewritten as the manifest components import.
// The originals sit outside public/, so the static export never deploys them; only the renditions ship.
//
//   node scripts/images.mjs
//
// Rules it enforces:
//   - Only the client's own photographs, listed in SOURCES below with their crops and alt text. A file in assets/photos/
//     that is not listed stops the run: add its crops and alt text here first (and its line in public/images/CREDITS.md).
//   - One grade for every photograph, so they read as one set: red channel down 3%, blue up 2%, contrast +4%,
//     saturation -6%. No vignette and no sharpening beyond sharp's default resize (lanczos3).
//   - Widths 800, 1200, 1600 and 2400, never upscaled: a target wider than the crop becomes the crop's own width, and is
//     dropped when that is within 10% of the next width down.
//   - Every rendition under 150kb (CLAUDE.md): the WebP quality steps down from 80 until it fits, never below 44. A
//     rendition up to 1600 wide that cannot fit stops the run; a wider one that cannot fit is left out and reported, so
//     the 1600 rendition is then the largest served.
//
// The originals stay untouched; the renditions are rebuilt from them on every run, so a change of grade or crop is a
// change here and a rerun, never an edit to an output. Output is deterministic for a given sharp version.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'assets', 'photos');
const outDir = path.join(root, 'public', 'images');
const manifestFile = path.join(root, 'lib', 'images.ts');
const publicBase = '/images';

const WIDTHS = [800, 1200, 1600, 2400];
const BUDGET_BYTES = 150_000;
const PLACEHOLDER_WIDTH = 24;
const QUALITY = { start: 80, step: 4, floor: 44 };
const GRADE = { red: 0.97, blue: 1.02, contrast: 1.04, saturation: 0.94 };

/**
 * The originals and their crops. A crop is the largest rectangle of its ratio that fits the original, placed so its
 * centre sits as near the focus point (in the original's pixels) as the frame allows; a focus at x 0 crops from the
 * right. The key names the photograph in lib/images.ts.
 */
const SOURCES = {
  'canwell-showroom-wide.jpg': [
    {
      // 3:2 landscape. Keeps the beamed ceiling and the dining table; cropped from the right so the plant in the
      // foreground is not the subject (Phase 2.6).
      key: 'canwellShowroom',
      name: 'canwell-showroom',
      ratio: [3, 2],
      focus: { x: 0, y: 675 },
      alt: 'The Canwell Interiors showroom floor in Broadway',
    },
  ],
  'saverys-workshop.webp': [
    {
      // 3:2 landscape for the About page. The picture is the fabric library, not the upholstery workshop, so the alt
      // text says what is in it (Phase 2.4 decision 8).
      key: 'saverysFabricLibrary',
      name: 'saverys-fabric-library',
      ratio: [3, 2],
      focus: { x: 975, y: 540 },
      alt: 'The fabric library at Saverys of Broadway: pattern books on shelves and stands around a desk, beside a stone fireplace',
    },
    {
      // 4:5 portrait for the sector pages, centred on the fabric books and the desk.
      key: 'saverysFabricLibraryPortrait',
      name: 'saverys-fabric-library-portrait',
      ratio: [4, 5],
      focus: { x: 1000, y: 540 },
      alt: 'Fabric pattern books on display stands behind a desk in the Saverys of Broadway fabric library',
    },
  ],
};

// ------------------------------------------------------------------ geometry

/** The largest ratio rectangle inside the original, centred on the focus point and clamped to the frame. */
function cropFor({ width, height }, [rw, rh], focus) {
  const scale = Math.min(width / rw, height / rh);
  const cw = Math.floor(rw * scale);
  const ch = Math.floor(rh * scale);
  const clamp = (value, max) => Math.min(Math.max(Math.round(value), 0), max);
  return {
    left: clamp(focus.x - cw / 2, width - cw),
    top: clamp(focus.y - ch / 2, height - ch),
    width: cw,
    height: ch,
  };
}

/** The rendition widths for a crop: the targets, capped at the crop's width, each more than 10% wider than the last. */
function renditionWidths(cropWidth) {
  const widths = [];
  for (const target of WIDTHS) {
    const width = Math.min(target, cropWidth);
    const last = widths[widths.length - 1];
    if (last === undefined || width > last * 1.1) widths.push(width);
  }
  return widths;
}

// ------------------------------------------------------------------ processing

/** The graded crop at full resolution, as raw pixels, so every rendition is resized from the same graded image. */
async function gradedCrop(file, crop) {
  const { data, info } = await sharp(file)
    .extract(crop)
    .removeAlpha()
    .recomb([
      [GRADE.red, 0, 0],
      [0, 1, 0],
      [0, 0, GRADE.blue],
    ])
    .modulate({ saturation: GRADE.saturation })
    // Contrast about mid grey: out = in * c + 128 * (1 - c).
    .linear(GRADE.contrast, 128 * (1 - GRADE.contrast))
    .toColourspace('srgb')
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, raw: { width: info.width, height: info.height, channels: info.channels } };
}

/** Widths up to this must fit the budget; wider renditions are optional. */
const REQUIRED_UP_TO = 1600;

/** One WebP rendition under the budget, the quality stepping down until it fits; null for an optional width that cannot. */
async function rendition(graded, width) {
  let smallest = Infinity;
  for (let quality = QUALITY.start; quality >= QUALITY.floor; quality -= QUALITY.step) {
    const { data, info } = await sharp(graded.data, { raw: graded.raw })
      .resize({ width, kernel: 'lanczos3', withoutEnlargement: true })
      .webp({ quality, effort: 6, smartSubsample: true })
      .toBuffer({ resolveWithObject: true });
    if (data.length < BUDGET_BYTES) return { data, width: info.width, height: info.height, quality };
    smallest = Math.min(smallest, data.length);
  }
  const why = `${(smallest / 1000).toFixed(1)} kB at q${QUALITY.floor}, over the ${BUDGET_BYTES / 1000} kB budget`;
  if (width <= REQUIRED_UP_TO) throw new Error(`The ${width}px rendition cannot fit: ${why}.`);
  return { skipped: true, width, why };
}

/** The 24px blurred placeholder, as a file and as the data URL next/image takes for placeholder="blur". */
async function placeholder(graded) {
  const { data, info } = await sharp(graded.data, { raw: graded.raw })
    .resize({ width: PLACEHOLDER_WIDTH, kernel: 'lanczos3' })
    .blur(0.6)
    .webp({ quality: 50, effort: 6 })
    .toBuffer({ resolveWithObject: true });
  return { data, width: info.width, height: info.height, dataUrl: `data:image/webp;base64,${data.toString('base64')}` };
}

/** Removes the renditions an earlier run made for this name, so a changed width list leaves nothing stale behind. */
function clearOld(name) {
  const own = new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}-(\\d+|placeholder)\\.webp$`);
  for (const file of fs.readdirSync(outDir)) if (own.test(file)) fs.rmSync(path.join(outDir, file));
}

// ------------------------------------------------------------------ the manifest

function tsString(value) {
  return `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
}

function manifest(entries) {
  const body = entries
    .map((e) => {
      const largest = e.renditions[e.renditions.length - 1];
      const fallback = [...e.renditions].reverse().find((r) => r.width <= 1600) ?? largest;
      return [
        `  ${e.key}: {`,
        `    src: ${tsString(fallback.src)},`,
        `    srcSet: ${tsString(e.renditions.map((r) => `${r.src} ${r.width}w`).join(', '))},`,
        `    widths: [${e.renditions.map((r) => r.width).join(', ')}],`,
        `    width: ${largest.width},`,
        `    height: ${largest.height},`,
        `    blurDataURL: ${tsString(e.placeholder.dataUrl)},`,
        `    alt: ${tsString(e.alt)},`,
        `  },`,
      ].join('\n');
    })
    .join('\n');

  return `// Generated by scripts/images.mjs from the originals in assets/photos. Do not edit by hand: change the crops or alt
// text in the script and run \`node scripts/images.mjs\`.
//
// One entry per photograph crop: the WebP renditions (graded as one set, each under 150kb, never upscaled), the blurred
// placeholder for next/image's placeholder="blur", the largest rendition's size (so the frame holds its ratio and
// nothing shifts on load) and the alt text, one plain sentence saying what is in the picture. Credits and source URLs:
// public/images/CREDITS.md. These are the client's own photographs; nothing else on the site is a photograph except
// Dan's portrait.

export interface Photo {
  /** The fallback src: the 1600 rendition, or the largest under it. */
  src: string;
  /** Every rendition with its width descriptor, smallest first, for srcSet. Pair it with sizes at the rendered widths. */
  srcSet: string;
  /** The rendition widths, smallest first. */
  widths: readonly number[];
  /** The largest rendition's size in pixels: the intrinsic size and aspect ratio. */
  width: number;
  height: number;
  /** A 24px blurred WebP as a data URL. */
  blurDataURL: string;
  alt: string;
}

export const photos = {
${body}
} as const satisfies Record<string, Photo>;

export type PhotoName = keyof typeof photos;

/**
 * The rendition for a requested width: the narrowest at least that wide, else the widest. Written for a next/image
 * loader (loaderFile or getImageProps), which asks for a src at each width it lists; a src that is not one of these
 * photographs comes back unchanged.
 */
export function photoLoader({ src, width }: { src: string; width: number }): string {
  const photo = Object.values(photos).find((p: Photo) => p.src === src);
  if (!photo) return src;
  const chosen = photo.widths.find((w) => w >= width) ?? photo.widths[photo.widths.length - 1];
  return photo.src.replace(/-\\d+\\.webp$/, \`-\${chosen}.webp\`);
}
`;
}

// ------------------------------------------------------------------ run

async function main() {
  const originals = fs.readdirSync(sourceDir).filter((file) => !file.startsWith('.'));
  const unlisted = originals.filter((file) => !SOURCES[file]);
  if (unlisted.length) {
    throw new Error(`Not in SOURCES (add the crops and alt text first): ${unlisted.join(', ')}`);
  }
  const missing = Object.keys(SOURCES).filter((file) => !originals.includes(file));
  if (missing.length) throw new Error(`Listed in SOURCES but not in assets/photos: ${missing.join(', ')}`);

  const entries = [];
  for (const file of originals.sort()) {
    const input = path.join(sourceDir, file);
    const meta = await sharp(input).metadata();
    if (meta.orientation && meta.orientation !== 1) {
      throw new Error(`${file} carries EXIF orientation ${meta.orientation}; the crops assume an upright original.`);
    }
    for (const spec of SOURCES[file]) {
      const crop = cropFor({ width: meta.width, height: meta.height }, spec.ratio, spec.focus);
      const graded = await gradedCrop(input, crop);
      clearOld(spec.name);

      const renditions = [];
      const skipped = [];
      for (const width of renditionWidths(crop.width)) {
        const out = await rendition(graded, width);
        if (out.skipped) {
          skipped.push(out);
          continue;
        }
        const fileName = `${spec.name}-${out.width}.webp`;
        fs.writeFileSync(path.join(outDir, fileName), out.data);
        renditions.push({ src: `${publicBase}/${fileName}`, width: out.width, height: out.height, bytes: out.data.length, quality: out.quality });
      }
      const blur = await placeholder(graded);
      const placeholderName = `${spec.name}-placeholder.webp`;
      fs.writeFileSync(path.join(outDir, placeholderName), blur.data);

      entries.push({ ...spec, crop, renditions, placeholder: blur });
      console.log(
        `${file} -> ${spec.name} (${spec.ratio.join(':')}, crop ${crop.width}x${crop.height} at ${crop.left},${crop.top})`,
      );
      for (const r of renditions) {
        console.log(`  ${r.src}  ${r.width}x${r.height}  ${(r.bytes / 1000).toFixed(1)} kB  q${r.quality}`);
      }
      for (const out of skipped) console.log(`  left out: ${out.width}px (${out.why})`);
      console.log(`  ${publicBase}/${placeholderName}  ${blur.width}x${blur.height}  ${blur.data.length} B`);
    }
  }

  fs.writeFileSync(manifestFile, manifest(entries));
  console.log(`wrote ${path.relative(root, manifestFile)} (${entries.length} photographs)`);
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
