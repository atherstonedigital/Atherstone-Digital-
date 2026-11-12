# Image credits

Every photograph on the site other than Dan's own portrait is the client's own, taken from the client's own website.
No stock, generated or placeholder photograph is used anywhere. Permission is tracked locally in docs/permissions.md.

The originals are kept untouched in `assets/photos/`, outside `public/`, so they are never deployed. They are kept
locally and are not in the repository: `node scripts/images.mjs` (`npm run images`) needs them to regenerate the
committed WebP renditions in `public/images/` and the manifest `lib/images.ts`, which it grades, crops and writes.

| Original | Client | Source URL | Downloaded |
| --- | --- | --- | --- |
| `assets/photos/canwell-showroom-wide.jpg` | Canwell Interiors | https://canwellinteriors.com/cdn/shop/files/showroom-interior-wide.jpg?v=1788794088&width=2400 | 2026-11-11 |
| `assets/photos/saverys-workshop.webp` | Saverys of Broadway | https://www.saverys.co.uk/_next/image?url=%2Fimages%2Fsaverys-of-broadway-hero-2.webp&w=3840&q=75 | 2026-11-11 |
| `public/dan-le-gresley-portrait.webp` | Dan's own | Cropped from `public/dan-le-gresley-shopify-ecommerce-consultant.png`, Dan's own photograph | n/a |
| `public/images/dan-le-gresley-portrait-green-670.webp` | Dan's own | The same crop of the same photograph, its black background tinted toward green-900 by `scripts/images.mjs` (the face untouched), for the homepage's Meet Dan slab | n/a |

The two client photographs were downloaded at the largest width each CDN serves: the Canwell original is 2400 by 1350, the Saverys original
1920 by 1080 (the CDN serves nothing larger).

## Screenshots

| Original | Client | Source URL | Captured |
| --- | --- | --- | --- |
| `assets/screenshots/xshowhome-catalogue.png` | Xshowhome | https://xshowhome.com/collections/furniture, product type filter open, 1440 by 1080 at 2x (the floating chat button hidden) | 2026-11-12 |

The original is kept locally in `assets/screenshots/`, like the photographs; its WebP renditions (800, 1200 and 1600 wide,
no grade, no crop) and `lib/screenshots.json` are committed.
