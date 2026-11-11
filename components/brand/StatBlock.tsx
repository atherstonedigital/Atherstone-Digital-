import * as React from 'react';

import type { ProofFigure } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The StatBlock component (docs/brand/components/StatBlock): a proof figure set like a ledger entry. A hairline across
// the top, the brass marker, the number in figure, and the one line that says what, who and when. No icons, no
// colour on the figure, no counting up, never a figure without its line.
//
// Phase 2.4 (ui-ux-pro-max, semantics): the block is a <figure> and its line the <figcaption>, because the line is the
// figure's caption: what the number is and where it came from. Screen readers name the figure by its line, and the
// taste gate reads the line as a caption (4.5:1) rather than running text (7:1). The colour stays ink-muted, as the
// README sets it (6.62:1 on paper, 7.4:1 in the dark theme).

export interface StatBlockProps extends React.HTMLAttributes<HTMLElement> {
  /** A short string: '16,193', '120+', '£250k'. Only figures already public may appear in this repository. */
  figure: string;
  /** Under 90 characters: what, who and when, so a reader can guess the source. */
  line: string;
  /**
   * The hairline across the top, with space-4 beneath. Turn it off where the row sits straight under a
   * SectionHeading, whose hairline then serves as the stats' top rule (Phase 1).
   */
  rule?: boolean;
}

export function StatBlock({ figure, line, rule = true, className, ...props }: StatBlockProps) {
  return (
    <figure className={cn(rule && 'border-t border-rule pt-space-4', className)} {...props}>
      {/* The brass marker: a 24px by 1px bar, space-3 above the figure. */}
      <span aria-hidden="true" className="mb-space-3 block h-px w-space-6 bg-brass-600" />
      <p className="figure mb-space-2 text-ink">{figure}</p>
      {/* small, ink-muted, at most 28ch: the component's own measure for the line. */}
      <figcaption className="small max-w-[28ch] text-ink-muted">{line}</figcaption>
    </figure>
  );
}

/** One to three figures; never four. The type enforces it. */
export type StatRowItems =
  | [Pick<ProofFigure, 'figure' | 'line'>]
  | [Pick<ProofFigure, 'figure' | 'line'>, Pick<ProofFigure, 'figure' | 'line'>]
  | [Pick<ProofFigure, 'figure' | 'line'>, Pick<ProofFigure, 'figure' | 'line'>, Pick<ProofFigure, 'figure' | 'line'>];

const columns: Record<StatRowItems['length'], string> = {
  1: '',
  2: 'min-[720px]:grid-cols-2',
  3: 'min-[720px]:grid-cols-3',
};

export interface StatRowProps extends React.HTMLAttributes<HTMLDivElement> {
  stats: StatRowItems;
  /** Passed to each StatBlock. */
  rule?: boolean;
}

/**
 * A row of StatBlocks with space-6 between them: one column below 720px, then side by side in the same order. The
 * markers in a row count as one brass use (proposed ruling, Phase 1 report section 5).
 *
 * With rule off, the first figure sits on the SectionHeading's hairline. Below 720px the others stack beneath it, so
 * they keep their own top rule there and drop it only once the row stands side by side.
 */
export function StatRow({ stats, rule = true, className, ...props }: StatRowProps) {
  return (
    <div className={cn('grid grid-cols-1 gap-space-6', columns[stats.length], className)} {...props}>
      {stats.map((stat, index) => (
        <StatBlock
          key={stat.figure}
          figure={stat.figure}
          line={stat.line}
          rule={rule}
          className={
            !rule && index > 0 ? 'border-t border-rule pt-space-4 min-[720px]:border-t-0 min-[720px]:pt-0' : undefined
          }
        />
      ))}
    </div>
  );
}
