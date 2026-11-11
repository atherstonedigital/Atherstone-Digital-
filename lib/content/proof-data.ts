import type { ProofData } from './types';

// The homepage proof block, public version: the figures, quieter line and chart the Netlify build ships.
//
// Public repo rule (CLAUDE.md): only figures already public on the live site appear in this repository, so this file
// holds the three public figures with their lines (the same three as proof.figures in lib/content/site.ts), no quieter
// line and no chart. The plan's full proof block waits for the client's written permission. Until then it lives only in
// lib/content/proof-data.private.ts, which is gitignored (lib/content/*.private.ts) and exports the same `proofData`.
//
// next.config.mjs swaps the private module in for this one at build whenever the private file exists, so a local build
// and every local screenshot show the full proof, and a build from git (Netlify) shows this version. Import this module
// as '@/lib/content/proof-data' and never import the private file directly: the swap is what keeps it out of a build
// that lacks it. Both files are typed as ProofData (lib/content/types.ts), so both builds type-check against one shape.
// Never write a permission-gated figure into this file, its comments or any other committed file.

export const proofData: ProofData = {
  figures: [
    {
      figure: '16,193',
      line: 'Product records remediated in one furniture catalogue',
    },
    {
      figure: '120+',
      line: 'Hours a month of manual work automated',
    },
    {
      figure: '£250k',
      line: 'Monthly revenue within six months for a home and interiors brand, via Ranch Creative',
    },
  ],
  quieterLine: null,
  chart: null,
};
