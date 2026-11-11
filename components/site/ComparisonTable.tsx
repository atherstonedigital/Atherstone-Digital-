import * as React from 'react';

import { ForwardLink } from '@/components/brand/Button';
import { SectionHeading } from '@/components/brand/SectionHeading';
import type { ComparisonSection } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// "Agency, in-house, or a director" (plan, Homepage 5): the three options side by side, one table. From 720px it is a
// three-column table: the column heads in heading-2 over a rule-strong rule (a border that carries meaning, 3:1),
// the rows divided by rule hairlines, no fills, no shadows. Below 720px the three columns collapse to one, in the same
// order: each option's head, then its four rows (brand book, Layout: three-column rows collapse below 720px). The
// table's parts go display: contents there and the cells are ordered by column, so it stays one table in the DOM; the
// ARIA table roles are set explicitly because display: contents drops a table's native semantics in some browsers.

/** The column a cell sits in decides its place in the stacked order below 720px. */
const columnOrder = ['order-1', 'order-2', 'order-3'] as const;

export interface ComparisonTableProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'children'> {
  /** comparison from lib/content/site.ts on the homepage. note and link are optional elsewhere. */
  content: Pick<ComparisonSection, 'caption' | 'columns' | 'rows'> &
    Partial<Pick<ComparisonSection, 'eyebrow' | 'heading' | 'note' | 'link'>>;
  /** Open with the SectionHeading and render as a section labelled by it (the default); off, the table alone. */
  withHeading?: boolean;
  headingLevel?: 'h2' | 'h3';
  /** The heading's id, for aria-labelledby. Generated when left out. */
  headingId?: string;
}

export function ComparisonTable({
  content,
  withHeading = true,
  headingLevel = 'h2',
  headingId,
  className,
  ...props
}: ComparisonTableProps) {
  const autoId = React.useId();
  const titleId = headingId ?? autoId;
  // The heading renders when asked for and given; without it the block is a plain div.
  const showHeading = withHeading && Boolean(content.heading);
  const Root = showHeading ? 'section' : 'div';
  const { caption, columns, rows, note, link } = content;

  return (
    <Root
      aria-labelledby={showHeading ? titleId : undefined}
      // A grid of one column, and no colour of its own (the section round it sets ink): the block shares no class with
      // the cards on the page, so the gate's card-family never reads it as a card set in another face.
      className={cn('grid grid-cols-1', className)}
      {...props}
    >
      {showHeading && content.heading ? (
        <SectionHeading as={headingLevel} eyebrow={content.eyebrow} heading={content.heading} headingId={titleId} />
      ) : null}

      {/* The wrapper is the stacking context below 720px: a flex column the cells are ordered in. */}
      <div className="mb-space-6 flex flex-col min-[720px]:block">
        <table role="table" className="contents min-[720px]:table min-[720px]:w-full min-[720px]:table-fixed min-[720px]:border-collapse">
          <caption className="sr-only">{caption}</caption>
          {/* 34, 34 and 32% from 720px (Phase 1); not rendered below, where it would leave an empty box. */}
          <colgroup className="hidden min-[720px]:table-column-group">
            <col className="w-[34%]" />
            <col className="w-[34%]" />
            <col className="w-[32%]" />
          </colgroup>
          <thead role="rowgroup" className="contents min-[720px]:table-header-group">
            <tr role="row" className="contents min-[720px]:table-row">
              {columns.map((column, index) => (
                <th
                  key={column}
                  scope="col"
                  role="columnheader"
                  className={cn(
                    'heading-2 block border-b border-rule-strong pb-space-3 text-left align-top',
                    // Each option's group opens space-12 below the last one's final row; the first sits on the heading.
                    index === 0 ? 'pt-0' : 'pt-space-12',
                    columnOrder[index],
                    'min-[720px]:table-cell min-[720px]:pb-space-4 min-[720px]:pr-space-6 min-[720px]:pt-0 min-[720px]:last:pr-0',
                  )}
                >
                  {column}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup" className="contents min-[720px]:table-row-group">
            {rows.map((row) => (
              <tr key={row.join('|')} role="row" className="contents min-[720px]:table-row">
                {row.map((cell, index) => (
                  <td
                    key={columns[index]}
                    role="cell"
                    className={cn(
                      'body block border-b border-rule py-space-4 text-left align-top',
                      columnOrder[index],
                      'min-[720px]:table-cell min-[720px]:pr-space-6 min-[720px]:last:pr-0',
                    )}
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {note ? <p className="body mb-space-2 max-w-measure">{note}</p> : null}
      {link ? <ForwardLink link={link} className="justify-self-start" /> : null}
    </Root>
  );
}
