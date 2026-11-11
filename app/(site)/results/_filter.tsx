'use client';

import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { CaseStudyCard, type CaseStudyCardData, type FilterValue } from './_card';

// The Results index's filter (plan, /results: "Filterable by sector and by problem"). It runs in the browser, because
// the site is a static export: the exported HTML lists every case study, so the page reads in full without JavaScript,
// and the filter narrows the list once the page has loaded.
//
// Two shadcn Selects (brand book: the one shadcn control for a choice, restyled to the tokens), each labelled above in
// small, weight 500, as the brand book's Forms rules set a label. "All" is each filter's first option. The state lives
// in the query string (?sector=furniture-retailers&problem=catalogue), so the case study pages' tags can link to a
// filtered view and a filtered view can be shared. The string is read once on load and rewritten in place on each
// change (history.replaceState), so Back still leaves the page.
//
// A polite status line under the filters says how many case studies show; when two filters leave none, a plain line
// and a secondary button bring the full list back.

const ALL = 'all';

export interface ResultsFilterLabels {
  /** The filters' labels and their first option (lib/content/pages/results.ts, filters). */
  sector: string;
  problem: string;
  all: string;
  /** Screen-reader name for the group of filters. */
  legend: string;
  /** {total}: every case study shows. */
  showingAll: string;
  /** {count} of {total}. */
  showingSome: string;
  /** No case study carries both tags. */
  empty: string;
  /** The button that clears both filters. */
  reset: string;
}

export interface ResultsFilterProps {
  cards: CaseStudyCardData[];
  sectors: FilterValue[];
  problems: FilterValue[];
  labels: ResultsFilterLabels;
  /** The query parameter names (./_cards.ts, FILTER_PARAMS). */
  params: { sector: string; problem: string };
  className?: string;
}

function fill(template: string, values: Record<string, number>) {
  return template.replace(/\{(\w+)\}/g, (match, key: string) => (key in values ? String(values[key]) : match));
}

export function ResultsFilter({ cards, sectors, problems, labels, params, className }: ResultsFilterProps) {
  const [sector, setSector] = React.useState(ALL);
  const [problem, setProblem] = React.useState(ALL);
  const id = React.useId();
  const sectorId = `${id}-sector`;
  const problemId = `${id}-problem`;

  // Read the filters from the address once, after hydration, so the exported HTML (every case study) matches the
  // first render. Values the list does not offer are ignored.
  React.useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const fromQuery = (name: string, options: FilterValue[]) => {
      const value = query.get(name);
      return value && options.some((option) => option.value === value) ? value : ALL;
    };
    setSector(fromQuery(params.sector, sectors));
    setProblem(fromQuery(params.problem, problems));
  }, [params.problem, params.sector, problems, sectors]);

  const update = React.useCallback(
    (nextSector: string, nextProblem: string) => {
      setSector(nextSector);
      setProblem(nextProblem);
      const query = new URLSearchParams(window.location.search);
      for (const [name, value] of [
        [params.sector, nextSector],
        [params.problem, nextProblem],
      ] as const) {
        if (value === ALL) query.delete(name);
        else query.set(name, value);
      }
      const search = query.toString();
      window.history.replaceState(window.history.state, '', `${window.location.pathname}${search ? `?${search}` : ''}`);
    },
    [params.problem, params.sector],
  );

  const shown = cards.filter(
    (card) =>
      (sector === ALL || card.sector.value === sector) &&
      (problem === ALL || card.problems.some((item) => item.value === problem)),
  );
  const total = cards.length;
  const status =
    shown.length === total ? fill(labels.showingAll, { total }) : fill(labels.showingSome, { count: shown.length, total });

  return (
    <div className={cn('grid grid-cols-1 gap-space-6', className)}>
      <fieldset className="m-0 min-w-0 border-0 p-0">
        <legend className="sr-only">{labels.legend}</legend>
        {/* Side by side from 720px; from 900px each takes three of the grid's twelve columns. */}
        <div className="grid grid-cols-1 gap-space-4 min-[720px]:grid-cols-2 min-[720px]:gap-x-gutter min-[900px]:grid-cols-12">
          <div className="grid gap-space-2 min-[900px]:col-span-3">
            <Label htmlFor={sectorId}>{labels.sector}</Label>
            <Select value={sector} onValueChange={(value) => update(value, problem)}>
              <SelectTrigger id={sectorId}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{labels.all}</SelectItem>
                {sectors.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-space-2 min-[900px]:col-span-3">
            <Label htmlFor={problemId}>{labels.problem}</Label>
            <Select value={problem} onValueChange={(value) => update(sector, value)}>
              <SelectTrigger id={problemId}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL}>{labels.all}</SelectItem>
                {problems.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </fieldset>

      {/* Always in the page, so each change is announced. */}
      <p role="status" className="small -mt-space-2 text-ink">
        {status}
      </p>

      {shown.length ? (
        <ul className="grid grid-cols-1 gap-space-6 min-[720px]:grid-cols-2 min-[720px]:gap-x-space-6">
          {shown.map((card) => (
            <li key={card.slug} className="grid">
              <CaseStudyCard card={card} />
            </li>
          ))}
        </ul>
      ) : (
        <div className="grid justify-items-start gap-space-4">
          <p className="body max-w-measure">{labels.empty}</p>
          <Button type="button" variant="secondary" onClick={() => update(ALL, ALL)}>
            {labels.reset}
          </Button>
        </div>
      )}
    </div>
  );
}
