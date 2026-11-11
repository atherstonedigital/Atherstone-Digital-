import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(fileURLToPath(import.meta.url));

// The homepage proof block (lib/content/proof-data.ts). The committed module holds the public figures only. Its
// gitignored twin, lib/content/proof-data.private.ts, holds the full proof that waits for the client's written
// permission. When the private file exists (a local checkout that has it), every import that resolves to the public
// module is swapped for it, so local builds and screenshots show the full proof. A build from git (Netlify) has no
// private file and ships the public version. Both export the same ProofData, so both builds type-check.
// The dev server reads this once at start: restart it after adding or removing the private file.
const proofPrivate = path.join(root, 'lib', 'content', 'proof-data.private.ts');
const usePrivateProof = existsSync(proofPrivate);
const proofPublicResource = /[\\/]lib[\\/]content[\\/]proof-data\.ts$/;

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: false,
  images: {
    unoptimized: true,
  },
  webpack(config, { webpack }) {
    if (usePrivateProof) {
      // Matched against the resolved file path, so '@/lib/content/proof-data' and './proof-data' are both caught.
      config.plugins.push(new webpack.NormalModuleReplacementPlugin(proofPublicResource, proofPrivate));
    }
    // Keep the two versions in separate webpack caches, so a cached build of one never serves the other.
    if (config.cache && typeof config.cache === 'object') {
      config.cache.version = `${config.cache.version ?? ''}|proof-${usePrivateProof ? 'private' : 'public'}`;
    }
    return config;
  },
};

export default nextConfig;
