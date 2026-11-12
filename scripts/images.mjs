// The image pipeline (Phase 2.6): every original in assets/photos/ becomes graded, cropped WebP renditions in
// public/images/ plus a 24px blurred placeholder, and lib/images.ts is rewritten as the manifest components import.
// The originals sit outside public/, so the static export never deploys them; only the renditions ship. The originals
// are kept locally and are not in git (.gitignore, assets/photos/): this script needs them to regenerate the committed
// renditions, and without them it leaves the photographs and lib/images.ts as they are.
//
// Screenshots (the Xshowhome catalogue screenshot beside Gary's testimonial): save the PNG as
// public/images/xshowhome-catalogue.png, as the brief asks, or straight into assets/screenshots/. The script moves a PNG
// it finds in public/images/ into assets/screenshots/, so the raw file never ships, then writes WebP renditions at 800,
// 1200 and 1600 wide (no grade, no crop, the same 150kb budget) and the manifest lib/screenshots.json, which
// app/(site)/_home/CatalogueScreenshot.tsx reads at build. Xshowhome cleared the screenshot in writing (Dan, 12 Nov
// 2026), so the renditions and the manifest are committed; the original stays local in assets/screenshots/, like the
// photographs.
//
//   node scripts/images.mjs   (npm run images)
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
// Dan's portrait (Phase 2.7, step 3b): the homepage's Meet Dan sets the portrait on a green slab, so its black
// background is tinted toward the slab's green and photo and slab read as one object. The source is Dan's own
// photograph, public/dan-le-gresley-shopify-ecommerce-consultant.png, which is in git, so this part always runs. It is
// cropped square as before (670px at x 354, y 28), then only the background's shadows move: each pixel is blended
// toward the slab's colour by a luminance mask, fully at luminance 8 of 255 and below, easing to nothing at 22, so the
// black T-shirt (about 23) stays black. The mask only reaches dark pixels joined to the frame's edge by others (a
// flood fill from the top, left and right edges: 10 or less, or 18 or less where the neighbourhood is quiet, which
// takes in the soft grey backdrop down the left edge but not a seam in the shirt), so a shadow inside the face or the shirt, the open mouth, a nostril, the inside
// of the collar, is never tinted. The anti-aliased edge of the head and shoulders is the one exception: within 2px of
// the background the fade runs on to luminance 40, so the cut-out edge blends into the green instead of leaving a dark
// ring round the head. The mask is feathered by a 1.5px blur so the edge stays soft, and peaks at full strength, so the
// filled background is the slab's colour exactly. sharp's tint() keeps each pixel's luminance, so it cannot lift a
// black background, and a multiply layer leaves black black; the mask can. The face is untouched: the run measures a
// box over the forehead, eyes, nose and cheeks, one over the mouth and one over the black T-shirt, before and after the
// grade, and stops if any box's mean channel difference passes 0.5 of 255.
//
// Two grades, one per theme, because the slab is bg-band and band is two colours: toward band's light value (#163a2c,
// the same as green-900's, as the brief asks) for the light theme, and toward band's dark value for the dark theme, so
// the photograph's ground equals the slab in both. The colours are read from lib/design/tokens.ts (colorValues), never
// written here. Output: public/images/dan-le-gresley-portrait-green-670.webp and
// dan-le-gresley-portrait-green-dark-670.webp, their placeholders, and lib/portraits.json, which
// components/site/AboutStrip.tsx reads. The ungraded portrait (public/dan-le-gresley-portrait.webp) stays for the About
// page.
//
// The originals stay untouched; the renditions are rebuilt from them on every run, so a change of grade or crop is a
// change here and a rerun, never an edit to an output. Output is deterministic for a given sharp version.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sourceDir = path.join(root, 'assets', 'photos');
const screenshotDir = path.join(root, 'assets', 'screenshots');
const outDir = path.join(root, 'public', 'images');
const manifestFile = path.join(root, 'lib', 'images.ts');
const screenshotManifestFile = path.join(root, 'lib', 'screenshots.json');
const portraitManifestFile = path.join(root, 'lib', 'portraits.json');
const tokensFile = path.join(root, 'lib', 'design', 'tokens.ts');
const publicBase = '/images';

const WIDTHS = [800, 1200, 1600, 2400];
/** Screenshots: the brief asks for 1600 wide; nothing is served wider. */
const SCREENSHOT_WIDTHS = [800, 1200, 1600];
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

/**
 * The screenshots, each rendered at its own ratio. The key names it in lib/screenshots.json. The alt text says what the
 * screenshot shows. The Shopify admin is not reachable from the build machine, so the screenshot is the live storefront:
 * the xshowhome.com furniture collection, captured 12 Nov 2026 at 1440 by 1080 (2x), with the product type filter open.
 */
const SCREENSHOTS = {
  'xshowhome-catalogue.png': {
    key: 'xshowhomeCatalogue',
    name: 'xshowhome-catalogue',
    alt: 'The furniture collection on xshowhome.com, with the product type filter open and each category listed with its product count',
  },
};

/**
 * Dan's portrait for the homepage slab: the square crop of his own photograph, its shadows tinted toward the slab's
 * colour, once per theme. face, mouth and shirt are the boxes (in the crop's pixels) that must come through the grade
 * unchanged. Each grade names the colorValues token and theme it blends toward.
 */
const PORTRAITS = {
  'dan-le-gresley-shopify-ecommerce-consultant.png': {
    crop: { left: 354, top: 28, width: 670, height: 670 },
    face: { left: 110, top: 180, width: 220, height: 180 },
    mouth: { left: 150, top: 410, width: 80, height: 30 },
    shirt: { left: 120, top: 600, width: 160, height: 60 },
    // The approved alt text of the ungraded portrait (components/site/AboutStrip.tsx) with 'against a black
    // background' taken out, since the background is no longer black: words removed, none added.
    alt: 'Dan Le Gresley, head and shoulders, in a black T-shirt, looking to one side',
    grades: [
      { key: 'danPortraitGreen', name: 'dan-le-gresley-portrait-green', token: 'band', theme: 'light' },
      { key: 'danPortraitGreenDark', name: 'dan-le-gresley-portrait-green-dark', token: 'band', theme: 'dark' },
    ],
  },
};
/**
 * The shadow mask: full at or below `full`, easing (smoothstep) to nothing at `none`, luminance out of 255, at most
 * `strength`, on the dark pixels joined to the border (luminance `core` or less, or `reach` or less where the 5x5
 * neighbourhood is no brighter than `quiet`), feathered by `feather` px. Within
 * `ring` px of that background (on either side of its edge) the fade runs on to `ringNone`, so the anti-aliased edge of
 * the head blends in.
 */
const SHADOWS = { full: 8, none: 22, strength: 1, core: 10, reach: 18, quiet: 24, feather: 1.5, ring: 2, ringNone: 40 };
/** The face box's largest allowed mean channel difference, out of 255. */
const FACE_LIMIT = 0.5;

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
function renditionWidths(cropWidth, targets = WIDTHS) {
  const widths = [];
  for (const target of targets) {
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
/** A screenshot is set at most about 590px wide, so its 1200 rendition covers a 2x screen; 1600 is optional. */
const SCREENSHOT_REQUIRED_UP_TO = 1200;

/** One WebP rendition under the budget, the quality stepping down until it fits; null for an optional width that cannot. */
async function rendition(graded, width, requiredUpTo = REQUIRED_UP_TO) {
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
  if (width <= requiredUpTo) throw new Error(`The ${width}px rendition cannot fit: ${why}.`);
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

/** The renditions and placeholder for one prepared image, written to public/images/, and their log lines. */
async function writeRenditions(spec, graded, width, targets, requiredUpTo) {
  clearOld(spec.name);
  const renditions = [];
  const skipped = [];
  for (const target of renditionWidths(width, targets)) {
    const out = await rendition(graded, target, requiredUpTo);
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
  for (const r of renditions) {
    console.log(`  ${r.src}  ${r.width}x${r.height}  ${(r.bytes / 1000).toFixed(1)} kB  q${r.quality}`);
  }
  for (const out of skipped) console.log(`  left out: ${out.width}px (${out.why})`);
  console.log(`  ${publicBase}/${placeholderName}  ${blur.width}x${blur.height}  ${blur.data.length} B`);
  return { renditions, placeholder: blur };
}

/** The client photographs: graded, cropped renditions and lib/images.ts. Skipped when the originals are not here. */
async function photographs() {
  if (!fs.existsSync(sourceDir)) {
    console.log('assets/photos/ is not here (the originals are kept locally, not in git): photographs left as they are.');
    return;
  }
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
      console.log(
        `${file} -> ${spec.name} (${spec.ratio.join(':')}, crop ${crop.width}x${crop.height} at ${crop.left},${crop.top})`,
      );
      const out = await writeRenditions(spec, graded, crop.width, WIDTHS, REQUIRED_UP_TO);
      entries.push({ ...spec, crop, ...out });
    }
  }

  fs.writeFileSync(manifestFile, manifest(entries));
  console.log(`wrote ${path.relative(root, manifestFile)} (${entries.length} photographs)`);
}

/** A screenshot at its own size, as raw pixels on white (a PNG's transparency would show the page through). */
async function flatScreenshot(file) {
  const { data, info } = await sharp(file)
    .flatten({ background: { r: 255, g: 255, b: 255 } })
    .toColourspace('srgb')
    .raw()
    .toBuffer({ resolveWithObject: true });
  return { data, raw: { width: info.width, height: info.height, channels: info.channels } };
}

/**
 * The screenshots: a PNG dropped in public/images/ moves to assets/screenshots/ (so it never ships raw), then each
 * listed screenshot becomes WebP renditions and an entry in lib/screenshots.json. A screenshot that is not
 * there loses its renditions and its entry, so the page falls back to the stand-in.
 */
async function screenshots() {
  const entries = {};
  for (const [file, spec] of Object.entries(SCREENSHOTS)) {
    const dropped = path.join(outDir, file);
    const input = path.join(screenshotDir, file);
    if (fs.existsSync(dropped)) {
      fs.mkdirSync(screenshotDir, { recursive: true });
      fs.renameSync(dropped, input);
      console.log(`moved public/images/${file} to assets/screenshots/${file}, so the raw PNG never ships`);
    }
    if (!fs.existsSync(input)) {
      clearOld(spec.name);
      console.log(`${file}: not in assets/screenshots/, so the page shows its stand-in`);
      continue;
    }
    const meta = await sharp(input).metadata();
    const flat = await flatScreenshot(input);
    console.log(`${file} -> ${spec.name} (${meta.width}x${meta.height}, its own ratio, no grade, no crop)`);
    const out = await writeRenditions(spec, flat, meta.width, SCREENSHOT_WIDTHS, SCREENSHOT_REQUIRED_UP_TO);
    const largest = out.renditions[out.renditions.length - 1];
    entries[spec.key] = {
      src: largest.src,
      srcSet: out.renditions.map((r) => `${r.src} ${r.width}w`).join(', '),
      widths: out.renditions.map((r) => r.width),
      width: largest.width,
      height: largest.height,
      blurDataURL: out.placeholder.dataUrl,
      alt: spec.alt,
    };
  }
  if (Object.keys(entries).length) {
    fs.writeFileSync(screenshotManifestFile, `${JSON.stringify(entries, null, 2)}\n`);
    console.log(`wrote ${path.relative(root, screenshotManifestFile)}`);
  } else if (fs.existsSync(screenshotManifestFile)) {
    fs.rmSync(screenshotManifestFile);
    console.log(`removed ${path.relative(root, screenshotManifestFile)}`);
  }
}

/** A colour token's value for a theme from the generated tokens (colorValues), as [r, g, b]. */
function tokenColour(token, theme) {
  const source = fs.readFileSync(tokensFile, 'utf8');
  const name = token.replace(/[-]/g, '\\-');
  const line = new RegExp(`(?:'${name}'|\\b${name}): \\{ light: '(#[0-9a-f]{6})', dark: '(#[0-9a-f]{6})' \\}`, 'i').exec(source);
  if (!line) throw new Error(`${token} not found in lib/design/tokens.ts (colorValues).`);
  const hex = theme === 'dark' ? line[2] : line[1];
  return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

/** The mean absolute channel difference of two raw images inside a box. */
function meanDifference(a, b, raw, box) {
  let sum = 0;
  let count = 0;
  for (let y = box.top; y < box.top + box.height; y += 1) {
    for (let x = box.left; x < box.left + box.width; x += 1) {
      const i = (y * raw.width + x) * raw.channels;
      for (let c = 0; c < 3; c += 1) sum += Math.abs(a[i + c] - b[i + c]);
      count += 3;
    }
  }
  return sum / count;
}

/** Dan's portrait: the square crop, its shadows blended toward the slab's colour once per theme, and lib/portraits.json. */
async function portraits() {
  const entries = {};
  for (const [file, spec] of Object.entries(PORTRAITS)) {
    const input = path.join(root, 'public', file);
    const { data, info } = await sharp(input)
      .extract(spec.crop)
      .removeAlpha()
      .toColourspace('srgb')
      .raw()
      .toBuffer({ resolveWithObject: true });
    const raw = { width: info.width, height: info.height, channels: info.channels };
    const { width: W, height: H, channels: C } = raw;
    const lum = new Float32Array(W * H);
    for (let p = 0; p < W * H; p += 1) lum[p] = 0.2126 * data[p * C] + 0.7152 * data[p * C + 1] + 0.0722 * data[p * C + 2];

    // The background: dark pixels joined to the frame's edge, found by a flood fill from the top, left and right edges
    // (the bottom edge is the T-shirt). A pixel joins at luminance SHADOWS.core or less, or at SHADOWS.reach or less
    // where nothing in its 5x5 neighbourhood is brighter than SHADOWS.quiet: the backdrop's soft dark grey down the left
    // edge joins, but a dark seam inside the T-shirt (luminance 9 to 13 between cloth at 20 to 35) cannot carry the
    // fill into the shirt.
    const localMax = new Float32Array(W * H);
    for (let y = 0; y < H; y += 1) {
      for (let x = 0; x < W; x += 1) {
        let max = 0;
        for (let yy = Math.max(0, y - 2); yy <= Math.min(H - 1, y + 2); yy += 1) {
          for (let xx = Math.max(0, x - 2); xx <= Math.min(W - 1, x + 2); xx += 1) max = Math.max(max, lum[yy * W + xx]);
        }
        localMax[y * W + x] = max;
      }
    }
    const reached = new Uint8Array(W * H);
    const stack = [];
    const reach = (p) => {
      if (reached[p]) return;
      if (lum[p] <= SHADOWS.core || (lum[p] <= SHADOWS.reach && localMax[p] <= SHADOWS.quiet)) {
        reached[p] = 1;
        stack.push(p);
      }
    };
    for (let x = 0; x < W; x += 1) reach(x);
    for (let y = 0; y < H; y += 1) [y * W, y * W + W - 1].forEach(reach);
    while (stack.length) {
      const p = stack.pop();
      const x = p % W;
      if (x > 0) reach(p - 1);
      if (x < W - 1) reach(p + 1);
      if (p >= W) reach(p - W);
      if (p < (H - 1) * W) reach(p + W);
    }

    // The ring: pixels within SHADOWS.ring px of the background's edge, on either side of it (a pixel whose square
    // neighbourhood holds both background and not-background).
    const ring = new Uint8Array(W * H);
    const r = SHADOWS.ring;
    for (let y = 0; y < H; y += 1) {
      for (let x = 0; x < W; x += 1) {
        let inside = false;
        let outside = false;
        for (let dy = -r; dy <= r && !(inside && outside); dy += 1) {
          const yy = y + dy;
          if (yy < 0 || yy >= H) continue;
          for (let dx = -r; dx <= r; dx += 1) {
            const xx = x + dx;
            if (xx < 0 || xx >= W) continue;
            if (reached[yy * W + xx]) inside = true;
            else outside = true;
            if (inside && outside) break;
          }
        }
        if (inside && outside) ring[y * W + x] = 1;
      }
    }

    // The weight per pixel, 0 to 255, then feathered.
    const fade = (l, none) => {
      const t = Math.min(Math.max((none - l) / (none - SHADOWS.full), 0), 1);
      return t * t * (3 - 2 * t);
    };
    const weight = Buffer.alloc(W * H);
    for (let p = 0; p < W * H; p += 1) {
      if (!reached[p] && !ring[p]) continue;
      const t = ring[p] ? Math.max(fade(lum[p], SHADOWS.ringNone), reached[p] ? fade(lum[p], SHADOWS.none) : 0) : fade(lum[p], SHADOWS.none);
      weight[p] = Math.round(t * SHADOWS.strength * 255);
    }
    // One channel in, one channel out: sharp would otherwise hand back sRGB, three bytes a pixel.
    const feathered = await sharp(weight, { raw: { width: W, height: H, channels: 1 } })
      .blur(SHADOWS.feather)
      .toColourspace('b-w')
      .extractChannel(0)
      .raw()
      .toBuffer();
    if (feathered.length !== W * H) throw new Error('The feathered mask is not one byte a pixel.');

    for (const grade of spec.grades) {
      const [gr, gg, gb] = tokenColour(grade.token, grade.theme);
      const graded = Buffer.from(data);
      for (let p = 0; p < W * H; p += 1) {
        const w = feathered[p] / 255;
        if (w === 0) continue;
        const i = p * C;
        graded[i] = Math.round(data[i] + (gr - data[i]) * w);
        graded[i + 1] = Math.round(data[i + 1] + (gg - data[i + 1]) * w);
        graded[i + 2] = Math.round(data[i + 2] + (gb - data[i + 2]) * w);
      }
      const face = meanDifference(data, graded, raw, spec.face);
      const mouth = meanDifference(data, graded, raw, spec.mouth);
      const shirt = meanDifference(data, graded, raw, spec.shirt);
      const corner = meanDifference(data, graded, raw, { left: 0, top: 0, width: 80, height: 80 });
      console.log(
        `${file} -> ${grade.name} (crop ${spec.crop.width}x${spec.crop.height} at ${spec.crop.left},${spec.crop.top}, shadows toward ${grade.token} ${grade.theme}, rgb ${gr},${gg},${gb})`,
      );
      console.log(
        `  mean channel difference: face box ${face.toFixed(3)}, mouth box ${mouth.toFixed(3)}, shirt box ${shirt.toFixed(3)}, background corner ${corner.toFixed(1)} (of 255)`,
      );
      if (face > FACE_LIMIT || mouth > FACE_LIMIT || shirt > FACE_LIMIT) {
        throw new Error(
          `The grade moved the face (${face.toFixed(3)}), the mouth (${mouth.toFixed(3)}) or the shirt (${shirt.toFixed(3)}), over ${FACE_LIMIT}.`,
        );
      }
      const out = await writeRenditions({ name: grade.name }, { data: graded, raw }, raw.width, WIDTHS, REQUIRED_UP_TO);
      const largest = out.renditions[out.renditions.length - 1];
      entries[grade.key] = {
        src: largest.src,
        width: largest.width,
        height: largest.height,
        blurDataURL: out.placeholder.dataUrl,
        alt: spec.alt,
      };
    }
  }
  fs.writeFileSync(portraitManifestFile, `${JSON.stringify(entries, null, 2)}\n`);
  console.log(`wrote ${path.relative(root, portraitManifestFile)}`);
}

async function main() {
  await photographs();
  await screenshots();
  await portraits();
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exit(1);
});
