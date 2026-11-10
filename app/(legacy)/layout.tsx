import { LegacyShell, legacyMetadata, legacyViewport } from './legacy-shell';

// Every pre-rebuild route lives in this route group, so its URLs are unchanged. Phase 3 deletes the group.
export const metadata = legacyMetadata;
export const viewport = legacyViewport;

export default function LegacyLayout({ children }: { children: React.ReactNode }) {
  return <LegacyShell>{children}</LegacyShell>;
}
