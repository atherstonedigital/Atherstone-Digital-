// Text measurement for the share images: advance widths read straight from a TrueType file's cmap and hmtx tables,
// so the headline can shrink to fit before Satori lays it out (Satori wraps text but never resizes it). Kerning is
// ignored, as Satori ignores it when it draws the text, so a measured width is the drawn width.

/** Advance widths in font units, by code point. */
export interface FontMetrics {
  unitsPerEm: number;
  advance: (codePoint: number) => number;
}

function tableOffsets(view: DataView) {
  const count = view.getUint16(4);
  const tables = new Map<string, number>();
  for (let i = 0; i < count; i += 1) {
    const record = 12 + i * 16;
    const tag = String.fromCharCode(
      view.getUint8(record),
      view.getUint8(record + 1),
      view.getUint8(record + 2),
      view.getUint8(record + 3),
    );
    tables.set(tag, view.getUint32(record + 8));
  }
  return tables;
}

/** Code point to glyph id, from the cmap's format 4 (BMP) or format 12 subtable. */
function readCmap(view: DataView, offset: number) {
  const map = new Map<number, number>();
  const count = view.getUint16(offset + 2);
  let format4: number | undefined;
  let format12: number | undefined;
  for (let i = 0; i < count; i += 1) {
    const record = offset + 4 + i * 8;
    const platform = view.getUint16(record);
    const encoding = view.getUint16(record + 2);
    const sub = offset + view.getUint32(record + 4);
    const format = view.getUint16(sub);
    const unicode = platform === 0 || (platform === 3 && (encoding === 1 || encoding === 10));
    if (!unicode) continue;
    if (format === 12) format12 = sub;
    if (format === 4) format4 = sub;
  }
  if (format12 !== undefined) {
    const groups = view.getUint32(format12 + 12);
    for (let g = 0; g < groups; g += 1) {
      const base = format12 + 16 + g * 12;
      const start = view.getUint32(base);
      const end = view.getUint32(base + 4);
      const glyph = view.getUint32(base + 8);
      for (let c = start; c <= end; c += 1) map.set(c, glyph + (c - start));
    }
    return map;
  }
  if (format4 === undefined) throw new Error('measure: the font has no Unicode cmap subtable.');
  const segments = view.getUint16(format4 + 6) / 2;
  const ends = format4 + 14;
  const starts = ends + segments * 2 + 2;
  const deltas = starts + segments * 2;
  const rangeOffsets = deltas + segments * 2;
  for (let s = 0; s < segments; s += 1) {
    const end = view.getUint16(ends + s * 2);
    const start = view.getUint16(starts + s * 2);
    const delta = view.getInt16(deltas + s * 2);
    const rangeOffset = view.getUint16(rangeOffsets + s * 2);
    for (let c = start; c <= end && c !== 0xffff; c += 1) {
      let glyph: number;
      if (rangeOffset === 0) {
        glyph = (c + delta) & 0xffff;
      } else {
        const at = rangeOffsets + s * 2 + rangeOffset + (c - start) * 2;
        glyph = view.getUint16(at);
        if (glyph !== 0) glyph = (glyph + delta) & 0xffff;
      }
      map.set(c, glyph);
    }
  }
  return map;
}

export function readMetrics(font: ArrayBuffer): FontMetrics {
  const view = new DataView(font);
  const tables = tableOffsets(view);
  const head = tables.get('head');
  const hhea = tables.get('hhea');
  const hmtx = tables.get('hmtx');
  const cmap = tables.get('cmap');
  if (head === undefined || hhea === undefined || hmtx === undefined || cmap === undefined) {
    throw new Error('measure: the font is missing head, hhea, hmtx or cmap.');
  }
  const unitsPerEm = view.getUint16(head + 18);
  const longMetrics = view.getUint16(hhea + 34);
  const glyphs = readCmap(view, cmap);
  const lastAdvance = view.getUint16(hmtx + (longMetrics - 1) * 4);
  const advanceOfGlyph = (glyph: number) => (glyph < longMetrics ? view.getUint16(hmtx + glyph * 4) : lastAdvance);
  const fallback = advanceOfGlyph(glyphs.get(0x20) ?? 0);
  return {
    unitsPerEm,
    advance: (codePoint) => {
      const glyph = glyphs.get(codePoint);
      return glyph === undefined ? fallback : advanceOfGlyph(glyph);
    },
  };
}

/** Width in px of a run of text at a size, with letter-spacing in em applied after every character, as CSS does. */
export function textWidth(metrics: FontMetrics, text: string, fontSize: number, letterSpacingEm = 0) {
  let units = 0;
  let characters = 0;
  for (const character of text) {
    units += metrics.advance(character.codePointAt(0) ?? 0x20);
    characters += 1;
  }
  return (units / metrics.unitsPerEm) * fontSize + characters * letterSpacingEm * fontSize;
}

/** Greedy word wrap, as the browser and Satori do it: the lines a text breaks into at a width. */
export function wrap(metrics: FontMetrics, text: string, fontSize: number, maxWidth: number, letterSpacingEm = 0) {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let current = '';
  for (const word of words) {
    const candidate = current ? `${current} ${word}` : word;
    if (!current || textWidth(metrics, candidate, fontSize, letterSpacingEm) <= maxWidth) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);
  return lines;
}

/**
 * The largest size, from `max` down in `step` px, at which the text fits the box in at most `maxLines` lines with no
 * line wider than the box, and the lines it breaks into there. Below `min` it stops at `min`, the only case in which it
 * may run over.
 */
export function fitText(
  metrics: FontMetrics,
  text: string,
  options: { max: number; min: number; step: number; maxWidth: number; maxLines: number; letterSpacingEm?: number },
) {
  const { max, min, step, maxWidth, maxLines, letterSpacingEm = 0 } = options;
  const width = maxWidth;
  for (let fontSize = max; fontSize >= min; fontSize -= step) {
    const lines = wrap(metrics, text, fontSize, width, letterSpacingEm);
    const widest = Math.max(...lines.map((line) => textWidth(metrics, line, fontSize, letterSpacingEm)));
    if (lines.length <= maxLines && widest <= width) return { fontSize, lines };
  }
  return { fontSize: min, lines: wrap(metrics, text, min, width, letterSpacingEm) };
}
