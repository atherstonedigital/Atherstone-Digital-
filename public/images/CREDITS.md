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

The two client photographs were downloaded at the largest width each CDN serves: the Canwell original is 2400 by 1350, the Saverys original
1920 by 1080 (the CDN serves nothing larger).
