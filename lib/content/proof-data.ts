import type { ProofData } from './types';

// The homepage proof block: the three StatBlock figures with their lines, the quieter line beneath them and the online
// store revenue chart. The Xshowhome figures, the quieter line and the chart were cleared for publication by the
// client's written permission (Dan, 12 Nov 2026), so they are committed here and ship in every build. Values as
// supplied on 11 Nov 2026, unrounded; the apostrophes are set typographically, as in the rest of the content.
//
// next.config.mjs still swaps in lib/content/proof-data.private.ts (gitignored) when that file exists, for any future
// figure that waits on a client's permission. It must export the same `proofData`, typed as ProofData. There is no
// private file at present.

export const proofData: ProofData = {
  figures: [
    {
      figure: '7x',
      line: 'Online store revenue year on year for a furniture retailer, £6.9k to £48.8k a month, Oct 2025 to Oct 2026',
    },
    {
      figure: '4.2x',
      line: 'Average Google Ads ROAS across 2026 for the same retailer, with monthly spend scaled sevenfold',
    },
    {
      figure: '16,193',
      line: 'Product records remediated in one furniture catalogue',
    },
  ],
  quieterLine:
    '36 to 347 online orders a month. Conversion rate more than doubled. 120+ hours a month of manual work automated. £250k monthly revenue within six months for a home and interiors brand, via Ranch Creative. All figures from the clients’ own Shopify and ad accounts.',
  chart: {
    title: 'Online store revenue: £6.9k in Oct 2025 to £48.8k in Oct 2026',
    source: 'Shopify analytics, xshowhome.com, Online Store channel only, pulled 9 Nov 2026',
    data: [
      { label: 'Nov 24', value: 1989 },
      { label: 'Dec 24', value: -143 },
      { label: 'Jan 25', value: 17697 },
      { label: 'Feb 25', value: 13118 },
      { label: 'Mar 25', value: 9007 },
      { label: 'Apr 25', value: 6891 },
      { label: 'May 25', value: 2737 },
      { label: 'Jun 25', value: 8997 },
      { label: 'Jul 25', value: 3804 },
      { label: 'Aug 25', value: 2812 },
      { label: 'Sep 25', value: 4576 },
      { label: 'Oct 25', value: 6865, emphasis: true },
      { label: 'Nov 25', value: 3430 },
      { label: 'Dec 25', value: 9343 },
      { label: 'Jan 26', value: 13806 },
      { label: 'Feb 26', value: 16733 },
      { label: 'Mar 26', value: 22633 },
      { label: 'Apr 26', value: 21082 },
      { label: 'May 26', value: 32134 },
      { label: 'Jun 26', value: 37573 },
      { label: 'Jul 26', value: 24608 },
      { label: 'Aug 26', value: 44619 },
      { label: 'Sep 26', value: 35423 },
      { label: 'Oct 26', value: 48847, emphasis: true },
    ],
  },
};
