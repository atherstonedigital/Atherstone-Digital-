import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { ImageResponse } from 'next/og';

import { colorValues } from '@/lib/design/tokens';

import { fitText, readMetrics } from './measure';

// The share image every page without a hand-made one gets at build time (docs/brand Social README): the Open Graph
// layout of the hand-made images in public/og, drawn with next/og. Type only, from the cover's blocks: the monogram and
// wordmark, an eyebrow naming the page, the page's H1 as the headline, the foot line on a rule, and the motif of a
// green-900 slab, a brass-600 fitting and an ink block with paper hairlines at the 64px pitch. No photographs and no
// client figures: callers pass headlines from lib/content, where only public figures live.
//
// The values are the README's: 72px left edge, eyebrow at 200px, headline at 66px shrinking in 2px steps to fit, the
// foot line under its rule at the foot, and the motif from x 880. The colours are the light theme's, from the generated
// tokens. Positions were matched pixel for pixel against public/og/og-ecommerce-director.png and its set.
//
// The headline is broken into lines here (lib/og/measure.ts) and each line is placed at the 1.05 line pitch of
// display-2, because Satori scales a line-height by the font's own metrics rather than its size.

export const SHARE_IMAGE_SIZE = { width: 1200, height: 630 } as const;

export interface ShareCard {
  /** Names the page; set in capitals with the eyebrow's tracking. */
  eyebrow: string;
  /** The page's H1. */
  headline: string;
  /** The line under the rule. The descriptor by default. */
  foot?: string;
  /** brass-600 eyebrow, as on the homepage hero. Off everywhere else. */
  accent?: boolean;
}

/** The descriptor line the hand-made offer and sector images end with. */
export const SHARE_FOOT = 'Ecommerce director for furniture and interiors retailers. UK wide.';

const colour = (name: keyof typeof colorValues) => colorValues[name].light;

const EDGE = 72;
const TEXT_WIDTH = 744;
const PITCH = 64;
const HEADLINE = { max: 66, min: 44, step: 2, maxLines: 3, lineHeight: 1.05, letterSpacingEm: -0.01 } as const;
/** Where the first line's capitals start, as in the hand-made set. */
const HEADLINE_TOP = 242;

const FONT_DIR = join(process.cwd(), 'assets', 'fonts');

let fontsPromise: Promise<{ display: ArrayBuffer; sans: ArrayBuffer; sansStrong: ArrayBuffer }> | undefined;

function toArrayBuffer(buffer: Buffer) {
  return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength) as ArrayBuffer;
}

/** The three faces, read once per build from assets/fonts. */
function loadFonts() {
  fontsPromise ??= Promise.all([
    readFile(join(FONT_DIR, 'Newsreader-opsz72-Medium.ttf')),
    readFile(join(FONT_DIR, 'SchibstedGrotesk-Regular.ttf')),
    readFile(join(FONT_DIR, 'SchibstedGrotesk-SemiBold.ttf')),
  ]).then(([display, sans, sansStrong]) => ({
    display: toArrayBuffer(display),
    sans: toArrayBuffer(sans),
    sansStrong: toArrayBuffer(sansStrong),
  }));
  return fontsPromise;
}

/** Paper hairlines across a block at every multiple of the pitch inside it. */
function hairlines(left: number, top: number, height: number) {
  const lines: number[] = [];
  for (let y = Math.ceil((top + 1) / PITCH) * PITCH; y < top + height; y += PITCH) lines.push(y);
  return lines.map((y) => (
    <div
      key={`${left}-${y}`}
      style={{ position: 'absolute', left, top: y, width: 144, height: 1, background: colour('paper') }}
    />
  ));
}

export async function renderShareCard({ eyebrow, headline, foot = SHARE_FOOT, accent = false }: ShareCard) {
  const fonts = await loadFonts();
  const { fontSize: headlineSize, lines } = fitText(readMetrics(fonts.display), headline, {
    max: HEADLINE.max,
    min: HEADLINE.min,
    step: HEADLINE.step,
    maxWidth: TEXT_WIDTH,
    maxLines: HEADLINE.maxLines,
    letterSpacingEm: HEADLINE.letterSpacingEm,
  });

  return new ImageResponse(
    (
      <div
        style={{
          position: 'relative',
          display: 'flex',
          width: '100%',
          height: '100%',
          background: colour('paper'),
          fontFamily: 'Schibsted Grotesk',
        }}
      >
        {/* The monogram and the wordmark. */}
        <div
          style={{
            position: 'absolute',
            left: EDGE,
            top: 64,
            width: 48,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: colour('green-900'),
            borderRadius: 4,
            color: colour('on-green'),
            fontFamily: 'Newsreader',
            fontSize: 34,
            lineHeight: 1,
          }}
        >
          A
        </div>
        <div
          style={{
            position: 'absolute',
            left: 140,
            top: 64,
            height: 48,
            display: 'flex',
            alignItems: 'center',
            color: colour('ink'),
            fontFamily: 'Newsreader',
            fontSize: 24,
            letterSpacing: '-0.015em',
          }}
        >
          Atherstone Digital
        </div>

        {/* The eyebrow, then the headline. */}
        <div
          style={{
            position: 'absolute',
            left: EDGE,
            top: 199,
            width: TEXT_WIDTH,
            display: 'flex',
            color: accent ? colour('brass-600') : colour('ink-muted'),
            fontSize: 18,
            fontWeight: 600,
            letterSpacing: '0.08em',
            lineHeight: 1.2,
          }}
        >
          {eyebrow.toUpperCase()}
        </div>
        {lines.map((text, index) => (
          <div
            key={text}
            style={{
              position: 'absolute',
              left: EDGE,
              top: Math.round(HEADLINE_TOP + index * headlineSize * HEADLINE.lineHeight),
              display: 'flex',
              whiteSpace: 'nowrap',
              color: colour('ink'),
              fontFamily: 'Newsreader',
              fontSize: headlineSize,
              lineHeight: 1,
              letterSpacing: `${HEADLINE.letterSpacingEm}em`,
            }}
          >
            {text}
          </div>
        ))}

        {/* The foot line on its rule. */}
        <div
          style={{
            position: 'absolute',
            left: EDGE,
            bottom: 55,
            width: TEXT_WIDTH,
            display: 'flex',
            borderTop: `1px solid ${colour('rule')}`,
            paddingTop: 16,
            color: colour('ink-muted'),
            fontSize: 20,
            lineHeight: 1.5,
          }}
        >
          {foot}
        </div>

        {/* The motif: green-900 slab; brass-600 fitting over an ink block; paper hairlines at the 64px pitch. */}
        <div style={{ position: 'absolute', left: 880, top: 0, width: 144, height: 630, background: colour('green-900') }} />
        <div style={{ position: 'absolute', left: 1056, top: 0, width: 144, height: 128, background: colour('brass-600') }} />
        <div style={{ position: 'absolute', left: 1056, top: 160, width: 144, height: 470, background: colour('ink') }} />
        {hairlines(880, 0, 630)}
        {hairlines(1056, 0, 128)}
        {hairlines(1056, 160, 470)}
      </div>
    ),
    {
      ...SHARE_IMAGE_SIZE,
      fonts: [
        { name: 'Newsreader', data: fonts.display, weight: 500, style: 'normal' },
        { name: 'Schibsted Grotesk', data: fonts.sans, weight: 400, style: 'normal' },
        { name: 'Schibsted Grotesk', data: fonts.sansStrong, weight: 600, style: 'normal' },
      ],
    },
  );
}
