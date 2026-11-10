import * as React from 'react';
import { Check, ChevronDown } from 'lucide-react';

import { Chart } from '@/components/site/Chart';
import { ContactForm } from '@/components/site/ContactForm';
import { FAQ } from '@/components/site/FAQ';
import { LeadMagnet } from '@/components/site/LeadMagnet';
import { Input, fieldClasses } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { selectContentClasses, selectItemClasses, selectItemHighlightClasses } from '@/components/ui/select-styles';
import { Textarea } from '@/components/ui/textarea';
import { contactSection, ecommerceDirectorFaq, leadMagnet } from '@/lib/content/site';
import type { FieldGroup, FormField as FieldDef } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The forms-data group on the design-system page: Label, Input, Textarea, Select, the brief form (ContactForm), the
// scorecard form (LeadMagnet), FAQ and Chart, each variant and state under a label, with content from
// lib/content/site.ts. The page supplies the container and the theme switch.
//
// The forms here never post: each runs with a demo value, so pressing send pretends for 700ms and shows the
// confirmation, and the held samples keep one state still. Live, interactive samples answer hover, focus and the
// keyboard; held samples (marked "held") use the classes the live state applies and sit out of the tab order.
//
// The charts use invented example data, labelled as such in every title and source line. No client figure appears.

function DemoLabel({ children, onBand = false }: { children: React.ReactNode; onBand?: boolean }) {
  return <p className={cn('eyebrow mb-space-3', onBand ? 'text-on-band opacity-80' : 'text-ink-muted')}>{children}</p>;
}

function Group({ title, intro, children }: { title: string; intro?: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-1 gap-space-8 border-t border-rule pt-space-8">
      <div className="grid gap-space-3">
        <h3 className="heading-2 text-ink">{title}</h3>
        {intro ? <p className="body max-w-measure text-ink">{intro}</p> : null}
      </div>
      {children}
    </div>
  );
}

function Sample({ label, className, children }: { label: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn('min-w-0', className)}>
      <DemoLabel>{label}</DemoLabel>
      {children}
    </div>
  );
}

/** The green contact band, as the homepage sets it. */
function Band({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="min-w-0 bg-band p-space-4 text-on-band min-[720px]:p-space-6">
      <DemoLabel onBand>{label}</DemoLabel>
      {children}
    </div>
  );
}

/** A raised panel for the primitives, as the forms sit in one. */
function Panel({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('grid gap-space-6 border border-rule bg-paper-raised p-space-6', className)}>{children}</div>;
}

// Fields from the brief form, so the primitives show real labels, types and messages.
const briefFields = contactSection.fields.flatMap((item) => ('fields' in item ? (item as FieldGroup).fields : [item as FieldDef]));
const byName = (name: string) => briefFields.find((field) => field.name === name) as FieldDef;
const nameField = byName('name');
const emailField = byName('email');
const websiteField = byName('website');
const businessField = byName('business');
const showroomsField = byName('showrooms');
const platformField = byName('platform');
const turnoverField = byName('turnover');
const firstField = byName('first');

const heldHover = 'border-ink';
const heldFocus = 'outline outline-2 outline-offset-2 outline-focus';

// Phase 2 draft, pending Dan's approval: the plan gives the FAQ blocks no heading.
const faqHeadingDraft = { eyebrow: 'FAQ', heading: 'Questions owners ask first' };

// Example data only. Round, invented numbers, so nothing here can be read as a client's figure.
const EXAMPLE_SOURCE = 'Example data for the component demo, not a client figure';

const monthly = [
  { label: 'Jan', value: 120 },
  { label: 'Feb', value: 135 },
  { label: 'Mar', value: 150 },
  { label: 'Apr', value: 170 },
  { label: 'May', value: 210 },
  { label: 'Jun', value: 240, emphasis: true },
];

const yearly = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((label, index) => ({
  label,
  value: [400, 420, 410, 450, 470, 500, 520, 560, 600, 640, 700, 800][index],
  emphasis: index === 0 || index === 11,
}));

const lineLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
const seriesA = [50, 52, 55, 54, 56, 58, 57, 60];
const seriesB = [20, 26, 34, 45, 58, 66, 74, 80];

export default function FormsDataSection() {
  return (
    <div className="grid grid-cols-1 gap-space-16 text-ink">
      {/* ------------------------------------------------------------------ Label, Input, Textarea */}
      <Group
        title="Label, Input, Textarea"
        intro="Label above every field in small, weight 500, ink, with (required) in words. Fields on paper-raised with a rule-strong border, radius-sm, 44px tall. Errors sit below in signal-critical and the border turns with them."
      >
        <div className="grid grid-cols-1 gap-space-6 min-[900px]:grid-cols-2">
          <Panel>
            <Sample label="Label, optional field">
              <div className="grid gap-space-2">
                <Label htmlFor="fd-business">{businessField.label}</Label>
                <Input id="fd-business" name="fd-business" autoComplete="organization" />
              </div>
            </Sample>
            <Sample label="Label, required, input at rest">
              <div className="grid gap-space-2">
                <Label htmlFor="fd-name" required>
                  {nameField.label}
                </Label>
                <Input id="fd-name" name="fd-name" autoComplete="name" required />
              </div>
            </Sample>
            <Sample label="Input, filled (email keyboard, autocomplete email)">
              <div className="grid gap-space-2">
                <Label htmlFor="fd-email" required>
                  {emailField.label}
                </Label>
                <Input
                  id="fd-email"
                  name="fd-email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  defaultValue="name@yourshop.co.uk"
                />
              </div>
            </Sample>
            <Sample label="Input, hover (held)">
              <div className="grid gap-space-2">
                <Label htmlFor="fd-hover">{websiteField.label}</Label>
                <Input id="fd-hover" type="url" tabIndex={-1} readOnly className={heldHover} defaultValue="https://yourshop.co.uk" />
              </div>
            </Sample>
          </Panel>
          <Panel>
            <Sample label="Input, focus (held): the 2px focus ring, 2px offset">
              <div className="grid gap-space-2">
                <Label htmlFor="fd-focus" required>
                  {nameField.label}
                </Label>
                <Input id="fd-focus" tabIndex={-1} readOnly className={heldFocus} defaultValue="Dan" />
              </div>
            </Sample>
            <Sample label="Input, invalid: the message says what to do">
              <div className="grid gap-space-2">
                <Label htmlFor="fd-invalid">{websiteField.label}</Label>
                <Input
                  id="fd-invalid"
                  type="url"
                  inputMode="url"
                  autoComplete="url"
                  defaultValue="yourshop"
                  aria-invalid="true"
                  aria-describedby="fd-invalid-message"
                />
                <p id="fd-invalid-message" className="small text-signal-critical">
                  {websiteField.messages?.invalid}
                </p>
              </div>
            </Sample>
            <Sample label="Input, disabled">
              <div className="grid gap-space-2">
                <Label htmlFor="fd-disabled">{businessField.label}</Label>
                <Input id="fd-disabled" disabled defaultValue="Not editable here" />
              </div>
            </Sample>
          </Panel>
          <Panel>
            <Sample label="Textarea, at rest (120px, drag to grow)">
              <div className="grid gap-space-2">
                <Label htmlFor="fd-first" required>
                  {firstField.label}
                </Label>
                <Textarea id="fd-first" rows={firstField.rows} />
              </div>
            </Sample>
          </Panel>
          <Panel>
            <Sample label="Textarea, invalid">
              <div className="grid gap-space-2">
                <Label htmlFor="fd-first-invalid" required>
                  {firstField.label}
                </Label>
                <Textarea
                  id="fd-first-invalid"
                  rows={firstField.rows}
                  aria-invalid="true"
                  aria-describedby="fd-first-invalid-message"
                />
                <p id="fd-first-invalid-message" className="small text-signal-critical">
                  {firstField.messages?.required}
                </p>
              </div>
            </Sample>
          </Panel>
        </div>
      </Group>

      {/* ------------------------------------------------------------------ Select */}
      <Group
        title="Select"
        intro="The shadcn Select on Radix: open with the keyboard (Space, Enter or the arrow keys), move with the arrows, type to jump, Escape to close. The highlighted option carries the focus ring; the chosen one carries the check."
      >
        <Panel className="min-[720px]:grid-cols-2">
          <Sample label="Select, placeholder">
            <div className="grid gap-space-2">
              <Label htmlFor="fd-showrooms">{showroomsField.label}</Label>
              <Select>
                <SelectTrigger id="fd-showrooms">
                  <SelectValue placeholder={showroomsField.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {showroomsField.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Sample>
          <Sample label="Select, chosen">
            <div className="grid gap-space-2">
              <Label htmlFor="fd-platform">{platformField.label}</Label>
              <Select defaultValue={platformField.options?.[0]}>
                <SelectTrigger id="fd-platform">
                  <SelectValue placeholder={platformField.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {platformField.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </Sample>
          <Sample label="Select, invalid (if a select is ever required)">
            <div className="grid gap-space-2">
              <Label htmlFor="fd-turnover" required>
                {turnoverField.label}
              </Label>
              <Select>
                <SelectTrigger id="fd-turnover" aria-invalid="true" aria-describedby="fd-turnover-message">
                  <SelectValue placeholder={turnoverField.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {turnoverField.options?.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {/* The fallback message the schema writes for a required select without its own message. */}
              <p id="fd-turnover-message" className="small text-signal-critical">
                Choose {turnoverField.label.toLowerCase()}.
              </p>
            </div>
          </Sample>
          <Sample label="Select, disabled">
            <div className="grid gap-space-2">
              <Label htmlFor="fd-select-disabled">{platformField.label}</Label>
              <Select disabled>
                <SelectTrigger id="fd-select-disabled">
                  <SelectValue placeholder={platformField.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Shopify">Shopify</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Sample>
          <Sample label="Select, open (held): highlighted option and chosen option" className="min-[720px]:col-span-2">
            <div aria-hidden="true" className="grid max-w-[22rem] gap-space-1">
              <span className={cn(fieldClasses, 'flex items-center justify-between gap-space-2', heldFocus)}>
                <span>{platformField.options?.[0]}</span>
                <ChevronDown size={20} strokeWidth={1.5} className="shrink-0 rotate-180 text-ink" />
              </span>
              <span className={cn(selectContentClasses, 'grid gap-space-2 p-space-1')}>
                {platformField.options?.map((option, index) => (
                  <span
                    key={option}
                    className={cn(selectItemClasses, 'cursor-default', index === 2 && selectItemHighlightClasses)}
                  >
                    <span className="absolute right-space-3 flex size-[20px] items-center justify-center">
                      {index === 0 ? <Check size={20} strokeWidth={1.5} /> : null}
                    </span>
                    {option}
                  </span>
                ))}
              </span>
            </div>
          </Sample>
        </Panel>
      </Group>

      {/* ------------------------------------------------------------------ ContactForm */}
      <Group
        title="ContactForm (the brief)"
        intro="Every field from the plan. Validation runs on blur once a field has been typed in, and in full on submit, when focus moves to the first field that needs an answer. On the site it posts to Netlify Forms as “brief”; here it pretends to send."
      >
        <div className="grid grid-cols-1 gap-space-8 min-[1200px]:grid-cols-2">
          <Sample label="ContactForm, live, on paper (try sending it empty)">
            <ContactForm demo="interactive" />
          </Sample>
          <Band label="ContactForm, live, on the green band">
            <ContactForm demo="interactive" ground="band" />
          </Band>
          <Sample label="ContactForm, after a failed submit (held)">
            <ContactForm demo="invalid" />
          </Sample>
          <Sample label="ContactForm, sending: aria-disabled, no second submit (held)">
            <ContactForm demo="sending" />
          </Sample>
          <Sample label="ContactForm, send failed: plain message, form intact (held)">
            <ContactForm demo="failed" />
          </Sample>
          <Sample label="ContactForm, sent: the confirmation replaces the form (held)">
            <ContactForm demo="sent" />
          </Sample>
        </div>
      </Group>

      {/* ------------------------------------------------------------------ LeadMagnet */}
      <Group
        title="LeadMagnet (the scorecard)"
        intro="The same rules for the one email field. On the site it posts to Netlify Forms as “scorecard”; here it pretends to send."
      >
        <div className="grid grid-cols-1 gap-space-8 min-[900px]:grid-cols-2">
          <Sample label="LeadMagnet, live">
            <LeadMagnet demo="interactive" />
          </Sample>
          <Sample label="LeadMagnet, after a failed submit (held)">
            <LeadMagnet demo="invalid" />
          </Sample>
          <Sample label="LeadMagnet, sending (held)">
            <LeadMagnet demo="sending" />
          </Sample>
          <Sample label="LeadMagnet, send failed (held)">
            <LeadMagnet demo="failed" />
          </Sample>
          <Sample label="LeadMagnet, sent (held)" className="min-[900px]:col-span-2">
            <LeadMagnet demo="sent" content={leadMagnet} />
          </Sample>
        </div>
      </Group>

      {/* ------------------------------------------------------------------ FAQ */}
      <Group
        title="FAQ"
        intro="Accordion rows closed by a rule, questions in heading-2, answers in body. Every answer stays in the page’s HTML while closed, and the FAQPage schema is written from the same items."
      >
        <Sample label="FAQ, with its section heading and the first answer open (writes FAQPage schema)">
          <FAQ
            content={{ ...faqHeadingDraft, items: ecommerceDirectorFaq.items }}
            headingLevel="h3"
            defaultOpen={[0]}
          />
        </Sample>
        <Sample label="FAQ, the list alone, all closed (schema off: one FAQPage per page)">
          <FAQ content={{ items: ecommerceDirectorFaq.items.slice(0, 3) }} schema={false} />
        </Sample>
      </Group>

      {/* ------------------------------------------------------------------ Chart */}
      <Group
        title="Chart"
        intro="Inline SVG from data in the code. Grey first, brass on what the title is about, the finding as the title, the source beneath, values on the marks, bars from zero. Every chart here uses invented example data."
      >
        <div className="grid grid-cols-1 gap-space-12 min-[900px]:grid-cols-2">
          <Sample label="Chart, bars, vertical: every value printed, brass on the one the title is about">
            <Chart
              type="bar"
              title="Example: the June figure is double January’s"
              source={EXAMPLE_SOURCE}
              categoryLabel="Month"
              valueLabel="Example units"
              data={monthly}
            />
          </Sample>
          <Sample label="Chart, bars, vertical, twelve columns: only the emphasised values printed">
            <Chart
              type="bar"
              title="Example: December is twice January"
              source={EXAMPLE_SOURCE}
              categoryLabel="Month"
              valueLabel="Example units"
              format={{ prefix: '£', notation: 'short' }}
              data={yearly}
            />
          </Sample>
          <Sample label="Chart, bars, horizontal: label and value above each bar (Phase 1's hero form)">
            <Chart
              type="bar"
              orientation="horizontal"
              title="Example: option C costs less than half of option A"
              source={EXAMPLE_SOURCE}
              categoryLabel="Option"
              valueLabel="Example cost"
              format={{ prefix: '£', notation: 'short' }}
              data={[
                { label: 'Option A', value: 9000 },
                { label: 'Option B', value: 6000 },
                { label: 'Option C', value: 4000, emphasis: true },
              ]}
            />
          </Sample>
          <Sample label="Chart, bars, tone critical: a thing going wrong, said in the title">
            <Chart
              type="bar"
              tone="critical"
              title="Example: errors rose in March, the month the feed changed"
              source={EXAMPLE_SOURCE}
              categoryLabel="Month"
              valueLabel="Example errors"
              data={[
                { label: 'Jan', value: 12 },
                { label: 'Feb', value: 14 },
                { label: 'Mar', value: 38, emphasis: true },
                { label: 'Apr', value: 16 },
              ]}
            />
          </Sample>
          <Sample label="Chart, lines: the series the title is about in brass, two points printed">
            <Chart
              type="line"
              title="Example: series B passes series A in May"
              source={EXAMPLE_SOURCE}
              categoryLabel="Month"
              series={[
                { name: 'Series A', points: lineLabels.map((label, index) => ({ label, value: seriesA[index] })) },
                {
                  name: 'Series B',
                  emphasis: true,
                  points: lineLabels.map((label, index) => ({
                    label,
                    value: seriesB[index],
                    emphasis: index === 0 || index === lineLabels.length - 1,
                  })),
                },
              ]}
            />
          </Sample>
          <Sample label="Chart, lines, tone good, one series, as an h4 title">
            <Chart
              type="line"
              tone="good"
              titleAs="h4"
              title="Example: the weekly figure climbed for six weeks running"
              source={EXAMPLE_SOURCE}
              categoryLabel="Week"
              format={{ suffix: '%' }}
              series={[
                {
                  name: 'Example rate',
                  emphasis: true,
                  points: [1.1, 1.2, 1.4, 1.5, 1.7, 1.9].map((value, index, all) => ({
                    label: `Week ${index + 1}`,
                    value,
                    emphasis: index === 0 || index === all.length - 1,
                  })),
                },
              ]}
            />
          </Sample>
        </div>
      </Group>
    </div>
  );
}
