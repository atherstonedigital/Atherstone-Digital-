# Share-image fonts

The two brand families as static TrueType files, for the share images that `app/og/[group]/[image]/route.tsx` renders at build time with `next/og` (Satori). Satori reads TTF, OTF and WOFF but not WOFF2 or variable axes, so the site's own fonts (next/font, WOFF2) cannot be reused here.

| File | Face | Used for |
| --- | --- | --- |
| `Newsreader-opsz72-Medium.ttf` | Newsreader 500, optical size 72 | The headline, the wordmark and the monogram A |
| `SchibstedGrotesk-SemiBold.ttf` | Schibsted Grotesk 600 | The eyebrow |
| `SchibstedGrotesk-Regular.ttf` | Schibsted Grotesk 400 | The foot line |

They are the static instances the Google Fonts CSS API serves for `Newsreader:opsz,wght@72,500` and `Schibsted Grotesk:wght@400;600`. Both families are under the SIL Open Font License 1.1; the licences are `OFL-Newsreader.txt` and `OFL-SchibstedGrotesk.txt`. Nothing here is served to visitors.
