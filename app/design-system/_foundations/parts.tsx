import * as React from 'react';

import { cn } from '@/lib/utils';

// Small pieces shared by the token displays on the design-system page. The specs are ledger rows (a label on a fixed
// column, the value beside it, each row closed by a rule hairline), the form the sections group set for case-study
// tags: the brand has no badges, so nothing here is a pill or a chip.

/** The label on every proposed token: in words, never a badge. */
export const PROPOSED_LABEL = 'Proposed, pending approval';

export function ProposedMark({ className }: { className?: string }) {
  return <p className={cn('small font-medium text-ink', className)}>{PROPOSED_LABEL}</p>;
}

export interface LedgerRow {
  label: string;
  value: React.ReactNode;
}

/** A list of label and value pairs in small, each row closed by a rule hairline. */
export function Ledger({ rows, className }: { rows: LedgerRow[]; className?: string }) {
  return (
    <dl className={cn('small grid border-t border-rule', className)}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[var(--space-24)_minmax(0,1fr)] gap-x-space-4 border-b border-rule py-space-2"
        >
          <dt className="text-ink-muted">{row.label}</dt>
          <dd className="min-w-0 break-words text-ink">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

/** A sub-group inside a section: an h3 over a rule, then its content. */
export function TokenGroup({
  title,
  description,
  children,
  className,
}: {
  title: string;
  description?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('grid grid-cols-1 gap-space-6 border-t border-rule pt-space-8', className)}>
      <div className="grid gap-space-2">
        <h3 className="heading-2 text-ink">{title}</h3>
        {description ? <p className="body max-w-measure text-ink">{description}</p> : null}
      </div>
      {children}
    </div>
  );
}

/** A token name as written in code. */
export function TokenName({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn('body font-semibold text-ink', className)}>{children}</span>;
}
