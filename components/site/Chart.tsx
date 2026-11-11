import * as React from 'react';

import { cn } from '@/lib/utils';

// Charts and figures (brand book): drawn inline as SVG from data in the codebase, never from a charting library's
// defaults and never as a screenshot. A server component: no JavaScript ships for a chart.
//
//   - Grey first. Every series and bar is ink-muted at reduced opacity; brass-600 marks the one series, or the one or
//     two points, the title is about. tone="good" or "critical" swaps brass for signal-good or signal-critical, only
//     where the chart is about a thing going right or wrong, and the title must say so in words.
//   - The finding is the title (what changed, from what to what, and when), the source and date sit beneath in small,
//     ink-muted, and the values the finding rests on are printed on the marks.
//   - Bars start at zero. Gridlines are rule, 1px, never heavier; the zero line and axis labels are ink-muted; labels
//     are small.
//   - Accessible: the svg is an image named by its title and desc, and a visually hidden table carries every value.
//
// Responsive drawing. A chart scaled whole through a viewBox shrinks its labels with it, to about 8px on a phone. So
// the text and marks are placed in the svg's own pixel space, across in percentages and down in pixels, and the line
// paths, which need a coordinate system, are drawn in a nested svg with a viewBox stretched to the plot (strokes keep
// their width with vector-effect: non-scaling-stroke). The chart fills any width from 280px up and its labels stay
// 14px. Fixed heights in pixels mean nothing moves on load.
//
// Opacity of the grey. Bars and lines are 70%, which keeps 3:1 on paper (3.32:1 light, 4.75:1 dark): with more than
// eight bars, and on a phone, the grey values are not printed, so the marks carry the data. One rule for every grey
// mark, the horizontal bars included, though they always print their values.
//
// Phase 2.4 (brand book, Charts and figures; the homepage proof chart): the title may be set in heading-2 where the
// chart heads its own part of a page; the source line carries the class source-line, the one caption the brand keeps
// and the taste gate's visual-caption waiver names; a negative value is written with its sign before the prefix
// (minus £143, not £-143) and its bar rests on the zero line, since bars start at zero; and category labels thin out at
// every width, not only on a phone, so 24 months never collide.

export interface ChartPoint {
  /** The category: a month, a store, an option. */
  label: string;
  value: number;
  /** The value as printed on the mark and in the table ('£4k'). Default: the value in the chart's format. */
  display?: string;
  /** One of the one or two points the title is about: drawn in the accent, with its value printed. */
  emphasis?: boolean;
}

export interface ChartSeries {
  /** The series name, for the legend and the table header. */
  name: string;
  /** One point per category, in the same order in every series. */
  points: ChartPoint[];
  /** The series the title is about: drawn in the accent. One per chart. */
  emphasis?: boolean;
}

export interface ChartFormat {
  /** Before the number: '£'. */
  prefix?: string;
  /** After the number: '%', ' hours'. */
  suffix?: string;
  /** 'short' writes 4500 as 4.5k and 2500000 as 2.5M, as the site writes money. Default 'full' (4,500). */
  notation?: 'full' | 'short';
  /** Decimal places, at most. Default 1. */
  maximumFractionDigits?: number;
}

interface ChartBaseProps {
  /** The finding, as a sentence. Not a label: what the reader should take away. */
  title: string;
  /** What the reader is looking at, whose data it is, and the date (brand book, Imagery: captions). */
  source: string;
  /** The svg's desc. Default: the chart type and the range of categories, with a pointer to the table. */
  description?: string;
  /** Header of the table's first column ('Month'). Default 'Category'. */
  categoryLabel?: string;
  /** brass by default; good or critical only for a chart about a thing going right or wrong. */
  tone?: 'brass' | 'good' | 'critical';
  /** How values are written on the marks, the axis and in the table, unless a point carries its own display. */
  format?: ChartFormat;
  /** The plot's height in pixels, without its labels. */
  plotHeight?: number;
  /** The title's element: a paragraph, or h3 or h4 where the chart heads its own part of a page. */
  titleAs?: 'p' | 'h3' | 'h4';
  /** The title's type: body in weight 500 (the default), or heading-2 where the chart heads its own part of a page. */
  titleStyle?: 'body' | 'heading-2';
  className?: string;
}

export interface BarChartProps extends ChartBaseProps {
  type: 'bar';
  data: ChartPoint[];
  /** vertical: columns over the categories (a time series). horizontal: one labelled bar per row (a comparison). */
  orientation?: 'vertical' | 'horizontal';
  /** Header of the table's value column ('Revenue'). Default 'Value'. */
  valueLabel?: string;
  /** Print every value, or only the emphasised ones. Default: every value up to eight columns, else emphasis. */
  values?: 'all' | 'emphasis';
  /**
   * Vertical bars only. outside (the default): the value labels in a narrow column left of the plot. inline: each
   * label sits on the plot's left edge just above its gridline, so the plot runs the container's full width, line to
   * line; a label an early bar would cover is left out (the zero line, ink-muted, needs none).
   */
  axis?: 'outside' | 'inline';
}

export interface LineChartProps extends ChartBaseProps {
  type: 'line';
  series: ChartSeries[];
  /** The scale's floor. Lines may start above zero where the change is the point; bars never do. Default 0. */
  yMin?: number;
}

export type ChartProps = BarChartProps | LineChartProps;

// ------------------------------------------------------------------ scales and labels

const toneFill = { brass: 'fill-brass-600', good: 'fill-signal-good', critical: 'fill-signal-critical' } as const;
const toneStroke = { brass: 'stroke-brass-600', good: 'stroke-signal-good', critical: 'stroke-signal-critical' } as const;
const toneBg = { brass: 'bg-brass-600', good: 'bg-signal-good', critical: 'bg-signal-critical' } as const;

/** Space above the plot for the printed values, and below it for the category labels, in pixels. */
const VALUE_ROOM = 28;
const LABEL_ROOM = 28;
/** The y-axis labels' baseline offset, so a 14px label sits centred on its gridline. */
const MIDLINE = 5;

/** The minus sign (U+2212), as a set figure writes it; screen readers read it as minus. */
const MINUS = '\u2212';

function formatNumber(value: number, format: ChartFormat = {}) {
  const { prefix = '', suffix = '', notation = 'full', maximumFractionDigits = 1 } = format;
  const number = (n: number, digits = maximumFractionDigits) =>
    new Intl.NumberFormat('en-GB', { maximumFractionDigits: digits }).format(n);
  let body: string;
  const size = Math.abs(value);
  if (notation === 'short' && size >= 1_000_000) body = `${number(size / 1_000_000)}M`;
  else if (notation === 'short' && size >= 1_000) body = `${number(size / 1_000)}k`;
  else body = number(size);
  // The sign leads the prefix: minus £143, never £-143. A value that rounds to zero takes no sign.
  const sign = value < 0 && body !== '0' ? MINUS : '';
  return `${sign}${prefix}${body}${suffix}`;
}

function shown(point: ChartPoint, format?: ChartFormat) {
  return point.display ?? formatNumber(point.value, format);
}

/** A rounded scale from min to a little above max, with about four steps. */
function niceScale(min: number, max: number) {
  const span = Math.max(max - min, 1);
  const rough = span / 4;
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * magnitude).find((s) => s >= rough) ?? 10 * magnitude;
  const floor = Math.floor(min / step) * step;
  const top = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let t = floor; t <= top + step / 2; t += step) ticks.push(Number(t.toFixed(10)));
  return { min: floor, max: top === floor ? floor + step : top, ticks };
}

/** A generous width for a small label in pixels (Schibsted Grotesk at 14px runs to about 9px a figure). */
function labelWidth(text: string) {
  return Math.ceil(text.length * 9);
}

const pct = (n: number) => `${Number(n.toFixed(4))}%`;

// ------------------------------------------------------------------ the parts every chart shares

function Frame({
  title,
  titleAs: TitleTag = 'p',
  titleStyle = 'body',
  titleId,
  source,
  className,
  children,
}: {
  title: string;
  titleAs?: 'p' | 'h3' | 'h4';
  titleStyle?: 'body' | 'heading-2';
  titleId: string;
  source: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <figure aria-labelledby={titleId} className={cn('m-0 grid min-w-0 gap-space-3', className)}>
      <TitleTag
        id={titleId}
        className={cn('max-w-measure text-ink', titleStyle === 'heading-2' ? 'heading-2' : 'body font-medium')}
      >
        {title}
      </TitleTag>
      {children}
      {/* The source line: what the reader is looking at, whose data it is and the date (brand book, Imagery). */}
      <figcaption className="source-line small max-w-measure text-ink-muted">{source}</figcaption>
    </figure>
  );
}

function DataTable({
  caption,
  categoryLabel,
  columns,
  rows,
}: {
  caption: string;
  categoryLabel: string;
  columns: string[];
  rows: { label: string; cells: string[] }[];
}) {
  // The wrapper is what is visually hidden: a table ignores the 1px box sr-only gives it and would widen the page.
  return (
    <div className="sr-only">
      <table>
        <caption>{caption}</caption>
        <thead>
          <tr>
            <th scope="col">{categoryLabel}</th>
            {columns.map((column) => (
              <th key={column} scope="col">
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, index) => (
                <td key={columns[index]}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The y-axis labels in their own narrow svg, so the plot beside them can run in percentages to the right edge. */
function YAxis({ ticks, y, height, format }: { ticks: number[]; y: (v: number) => number; height: number; format?: ChartFormat }) {
  const labels = ticks.map((tick) => formatNumber(tick, format));
  const width = Math.max(...labels.map(labelWidth)) + 8;
  return (
    <svg aria-hidden="true" focusable="false" width={width} height={height} className="block shrink-0 overflow-visible">
      {ticks.map((tick, index) => (
        <text key={tick} x={width - 8} y={y(tick) + MIDLINE} textAnchor="end" className="small fill-ink-muted">
          {labels[index]}
        </text>
      ))}
    </svg>
  );
}

/**
 * The value labels of an inline axis: on the plot's left edge, 6px above their gridlines. A label is left out where one
 * of the bars beneath it could reach it at the narrowest plot (288px, a 320 screen), since bars are drawn first and the
 * label would sit on a mark.
 */
function InlineTicks({
  ticks,
  y,
  data,
  format,
}: {
  ticks: number[];
  y: (v: number) => number;
  data: ChartPoint[];
  format?: ChartFormat;
}) {
  const NARROWEST = 288;
  const slot = NARROWEST / Math.max(data.length, 1);
  return (
    <g aria-hidden="true">
      {ticks.map((tick) => {
        const label = formatNumber(tick, format);
        const under = data.slice(0, Math.ceil((labelWidth(label) + 4) / slot));
        // The label's foot is 3px above its gridline's: a bar whose top passes that line would cut it.
        if (under.some((point) => y(point.value) < y(tick) - 3)) return null;
        return (
          <text key={tick} x="0" y={y(tick) - 6} className="small fill-ink-muted">
            {label}
          </text>
        );
      })}
    </g>
  );
}

function Gridlines({ ticks, y, floor }: { ticks: number[]; y: (v: number) => number; floor: number }) {
  return (
    <g aria-hidden="true">
      {ticks.map((tick) => (
        <line
          key={tick}
          x1="0"
          x2="100%"
          y1={y(tick) + 0.5}
          y2={y(tick) + 0.5}
          strokeWidth={1}
          shapeRendering="crispEdges"
          // The floor of the scale is the axis: ink-muted. The rest are rule, the lightest line the brand has.
          className={tick === floor ? 'stroke-ink-muted' : 'stroke-rule'}
        />
      ))}
    </g>
  );
}

/**
 * The plot each width band can count on (the container less the y-axis), in pixels: 320 to 719, 720 to 1199, and
 * 1200 up. A band's labels must fit side by side in it at labelWidth's generous estimate; the phone's 264 is 244px at
 * 320 wide, where four month labels of about 44px still stand 17px apart.
 */
const PLOT_WIDTHS = [
  { width: 264, hide: 'max-[719px]:hidden' },
  { width: 620, hide: 'min-[720px]:max-[1199px]:hidden' },
  { width: 1080, hide: 'min-[1200px]:hidden' },
] as const;
const LABEL_STEPS = [1, 2, 3, 4, 6, 12, 24] as const;

/**
 * Category labels thin out where they would not fit side by side: in each width band, every nth label shows, counted
 * back from the last, so the latest category always keeps its label and the gaps stay even. A label the title is
 * about (an emphasised point) always shows. 24 months print every second label from 1200px, every third from 720px
 * and every sixth on a phone; each step divides 12, so the same month a year apart always shows.
 */
function labelClass(index: number, labels: string[], emphasis = false) {
  if (emphasis) return undefined;
  const pitch = Math.max(...labels.map(labelWidth)) + 12;
  const hidden = PLOT_WIDTHS.filter(({ width }) => {
    const step = LABEL_STEPS.find((s) => Math.ceil(labels.length / s) * pitch <= width) ?? labels.length;
    return (labels.length - 1 - index) % step !== 0;
  });
  return hidden.length ? hidden.map((band) => band.hide).join(' ') : undefined;
}

// ------------------------------------------------------------------ bar charts

function VerticalBars({ props, ids }: { props: BarChartProps; ids: { title: string; desc: string } }) {
  const { data, format, tone = 'brass', plotHeight = 176 } = props;
  const valuesMode = props.values ?? (data.length <= 8 ? 'all' : 'emphasis');
  const scale = niceScale(0, Math.max(...data.map((d) => d.value), 0));
  const height = VALUE_ROOM + plotHeight + LABEL_ROOM;
  const y = (v: number) => VALUE_ROOM + plotHeight - ((v - scale.min) / (scale.max - scale.min)) * plotHeight;
  const slot = 100 / data.length;
  const barWidth = slot * 0.6;
  // With many columns the end labels hold to their bar's outer edge, so they never pass the container's lines.
  const edgeHeld = data.length > 6;
  const labelX = (index: number, x: number) =>
    edgeHeld && index === 0 ? x : edgeHeld && index === data.length - 1 ? x + barWidth : x + barWidth / 2;
  const labelAnchor = (index: number) =>
    edgeHeld && index === 0 ? 'start' : edgeHeld && index === data.length - 1 ? 'end' : 'middle';

  const inline = props.axis === 'inline';

  return (
    <div className="flex min-w-0">
      {inline ? null : <YAxis ticks={scale.ticks} y={y} height={height} format={format} />}
      <svg
        role="img"
        aria-labelledby={`${ids.title} ${ids.desc}`}
        width="100%"
        height={height}
        className="block min-w-0 flex-1 overflow-visible"
      >
        <title id={ids.title}>{props.title}</title>
        <desc id={ids.desc}>{props.description ?? describe('Bar chart', data.map((d) => d.label))}</desc>
        <Gridlines ticks={scale.ticks} y={y} floor={scale.min} />
        {inline ? <InlineTicks ticks={scale.ticks} y={y} data={data} format={format} /> : null}
        {data.map((point, index) => {
          const top = y(point.value);
          const x = index * slot + (slot - barWidth) / 2;
          const printed = valuesMode === 'all' || point.emphasis;
          return (
            <g key={point.label}>
              <rect
                x={pct(x)}
                y={top}
                width={pct(barWidth)}
                height={Math.max(y(0) - top, 0)}
                className={point.emphasis ? toneFill[tone] : 'fill-ink-muted opacity-70'}
              />
              {printed ? (
                <text
                  x={pct(labelX(index, x))}
                  y={top - 8}
                  textAnchor={labelAnchor(index)}
                  className={cn(
                    'small fill-ink',
                    point.emphasis && 'font-semibold',
                    // On a phone, more than four printed values collide: only the emphasised ones stay.
                    !point.emphasis && data.length > 4 && 'max-[719px]:hidden',
                  )}
                >
                  {shown(point, format)}
                </text>
              ) : null}
              <text
                x={pct(labelX(index, x))}
                y={height - 8}
                textAnchor={labelAnchor(index)}
                className={cn('small fill-ink-muted', labelClass(index, data.map((d) => d.label), point.emphasis))}
              >
                {point.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

function HorizontalBars({ props, ids }: { props: BarChartProps; ids: { title: string; desc: string } }) {
  const { data, format, tone = 'brass' } = props;
  // Phase 1's hero chart: each row is the label and its value on one line, the bar beneath, all on the left line;
  // the largest bar reaches the right line. Every value is printed, so the bars need no gridlines.
  const max = Math.max(...data.map((d) => d.value), 0) || 1;
  const ROW = 22; // label line
  const BAR = 16;
  const GAP = 12;
  const pitch = ROW + 4 + BAR + GAP;
  const height = data.length * pitch - GAP;

  return (
    <svg
      role="img"
      aria-labelledby={`${ids.title} ${ids.desc}`}
      width="100%"
      height={height}
      className="block min-w-0 overflow-visible"
    >
      <title id={ids.title}>{props.title}</title>
      <desc id={ids.desc}>{props.description ?? describe('Bar chart', data.map((d) => d.label))}</desc>
      {data.map((point, index) => {
        const top = index * pitch;
        return (
          <g key={point.label}>
            <text x="0" y={top + 16} className="small fill-ink-muted">
              <tspan>{point.label}</tspan>
              <tspan dx="8" className="fill-ink font-semibold">
                {shown(point, format)}
              </tspan>
            </text>
            <rect
              x="0"
              y={top + ROW + 4}
              width={pct((Math.max(point.value, 0) / max) * 100)}
              height={BAR}
              className={point.emphasis ? toneFill[tone] : 'fill-ink-muted opacity-70'}
            />
          </g>
        );
      })}
    </svg>
  );
}

// ------------------------------------------------------------------ line charts

function Lines({ props, ids }: { props: LineChartProps; ids: { title: string; desc: string } }) {
  const { series, format, tone = 'brass', plotHeight = 176 } = props;
  const labels = series[0]?.points.map((p) => p.label) ?? [];
  const all = series.flatMap((s) => s.points.map((p) => p.value));
  const scale = niceScale(Math.min(props.yMin ?? 0, ...all), Math.max(...all, 0));
  const height = VALUE_ROOM + plotHeight + LABEL_ROOM;
  const y = (v: number) => VALUE_ROOM + plotHeight - ((v - scale.min) / (scale.max - scale.min)) * plotHeight;
  // Points sit 1.5% in from each side so an end marker is never cut by the edge.
  const INSET = 1.5;
  const xAt = (index: number) => INSET + (labels.length > 1 ? (index / (labels.length - 1)) * (100 - 2 * INSET) : 50);
  const anchorAt = (index: number) => (index === 0 ? 'start' : index === labels.length - 1 ? 'end' : 'middle');
  // Draw grey series first, so the accent sits on top where lines cross.
  const ordered = [...series].sort((a, b) => Number(Boolean(a.emphasis)) - Number(Boolean(b.emphasis)));
  const VIEW = 1000;

  return (
    <div className="grid min-w-0 gap-space-3">
      {series.length > 1 ? (
        <ul className="small flex flex-wrap gap-x-space-6 gap-y-space-2 text-ink">
          {series.map((s) => (
            <li key={s.name} className="inline-flex items-center gap-space-2">
              <span
                aria-hidden="true"
                className={cn('block h-[2px] w-space-6', s.emphasis ? toneBg[tone] : 'bg-ink-muted opacity-70')}
              />
              {s.name}
            </li>
          ))}
        </ul>
      ) : null}
      <div className="flex min-w-0">
        <YAxis ticks={scale.ticks} y={y} height={height} format={format} />
        <svg
          role="img"
          aria-labelledby={`${ids.title} ${ids.desc}`}
          width="100%"
          height={height}
          className="block min-w-0 flex-1 overflow-visible"
        >
          <title id={ids.title}>{props.title}</title>
          <desc id={ids.desc}>{props.description ?? describe('Line chart', labels)}</desc>
          <Gridlines ticks={scale.ticks} y={y} floor={scale.min} />
          {/* The paths, in a viewBox stretched over the plot; the stroke keeps its pixel width. */}
          <svg
            x="0"
            y={VALUE_ROOM}
            width="100%"
            height={plotHeight}
            viewBox={`0 0 ${VIEW} ${VIEW}`}
            preserveAspectRatio="none"
            className="overflow-visible"
            aria-hidden="true"
          >
            {ordered.map((s) => (
              <polyline
                key={s.name}
                fill="none"
                strokeWidth={s.emphasis ? 2 : 1.5}
                strokeLinejoin="round"
                strokeLinecap="round"
                className={cn('[vector-effect:non-scaling-stroke]', s.emphasis ? toneStroke[tone] : 'stroke-ink-muted opacity-70')}
                points={s.points
                  .map((p, index) => {
                    const px = (xAt(index) / 100) * VIEW;
                    const py = ((y(p.value) - VALUE_ROOM) / plotHeight) * VIEW;
                    return `${Number(px.toFixed(2))},${Number(py.toFixed(2))}`;
                  })
                  .join(' ')}
              />
            ))}
          </svg>
          {/* Markers and printed values on the points the title rests on. Each sits in a nested svg placed at the
              point, so its square and label can be offset in pixels from a position given in percent. */}
          {ordered.flatMap((s) =>
            s.points.map((p, index) =>
              p.emphasis ? (
                <svg key={`${s.name}-${p.label}`} x={pct(xAt(index))} y={y(p.value)} className="overflow-visible" aria-hidden="true">
                  <rect x={-4} y={-4} width={8} height={8} className={s.emphasis ? toneFill[tone] : 'fill-ink-muted'} />
                  <text
                    x={anchorAt(index) === 'start' ? -4 : anchorAt(index) === 'end' ? 4 : 0}
                    y={-12}
                    textAnchor={anchorAt(index)}
                    className="small fill-ink font-semibold"
                  >
                    {shown(p, format)}
                  </text>
                </svg>
              ) : null,
            ),
          )}
          {labels.map((label, index) => (
            <text
              key={label}
              x={pct(xAt(index))}
              y={height - 8}
              textAnchor={anchorAt(index)}
              className={cn(
                'small fill-ink-muted',
                labelClass(index, labels, series.some((s) => s.points[index]?.emphasis)),
              )}
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

function describe(kind: string, labels: string[]) {
  const range = labels.length > 1 ? `, ${labels[0]} to ${labels[labels.length - 1]}` : '';
  return `${kind} of ${labels.length} ${labels.length === 1 ? 'value' : 'values'}${range}. The figures are in the table that follows.`;
}

// ------------------------------------------------------------------ the component

export function Chart(props: ChartProps) {
  const id = React.useId();
  const ids = { title: `${id}-svg-title`, desc: `${id}-svg-desc` };
  const titleId = `${id}-title`;
  const categoryLabel = props.categoryLabel ?? 'Category';

  let plot: React.ReactNode;
  let table: React.ReactNode;
  if (props.type === 'bar') {
    plot =
      props.orientation === 'horizontal' ? <HorizontalBars props={props} ids={ids} /> : <VerticalBars props={props} ids={ids} />;
    table = (
      <DataTable
        caption={props.title}
        categoryLabel={categoryLabel}
        columns={[props.valueLabel ?? 'Value']}
        rows={props.data.map((point) => ({ label: point.label, cells: [shown(point, props.format)] }))}
      />
    );
  } else {
    const labels = props.series[0]?.points.map((p) => p.label) ?? [];
    plot = <Lines props={props} ids={ids} />;
    table = (
      <DataTable
        caption={props.title}
        categoryLabel={categoryLabel}
        columns={props.series.map((s) => s.name)}
        rows={labels.map((label, index) => ({
          label,
          cells: props.series.map((s) => (s.points[index] ? shown(s.points[index], props.format) : '')),
        }))}
      />
    );
  }

  return (
    <Frame
      title={props.title}
      titleAs={props.titleAs}
      titleStyle={props.titleStyle}
      titleId={titleId}
      source={props.source}
      className={props.className}
    >
      {plot}
      {table}
    </Frame>
  );
}
