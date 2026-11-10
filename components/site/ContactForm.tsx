'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ExternalLink } from 'lucide-react';
import { useForm, type FieldErrors, type UseFormReturn } from 'react-hook-form';
import { z } from 'zod';

import { ForwardLink, TextLink } from '@/components/brand/Button';
import { formPanelClasses } from '@/components/site/form-panel-styles';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { contactSection } from '@/lib/content/site';
import type {
  ContactSection,
  FieldGroup,
  FormConfirmation,
  FormField as FieldDef,
  FormStatus,
} from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The brief form (plan, Homepage 11 and /contact), built to the brand book's Forms rules without exception:
//   - every label above its field in small, weight 500, ink, with "(required)" in words after it;
//   - the right input types, keyboards and autocomplete (name, email, organization, url) from lib/content/site.ts;
//   - one zod schema made from the same field list, validated on blur once a field has been typed in (so tabbing
//     past a field never scolds), re-checked as the visitor types once it has failed, and checked in full on submit;
//   - errors directly below their field in small, signal-critical, the border signal-critical, linked to the field
//     with aria-describedby (FormControl), each saying what to do;
//   - a failed submit moves focus to the first field that needs an answer and the status line counts them;
//   - while sending, the button reads "Sending" and is aria-disabled (so it keeps keyboard focus) and a second submit
//     is ignored; on success the confirmation replaces the form, says what happens next, links two case studies and
//     takes focus; on failure a plain message, and the form stays as it was.
//
// Netlify Forms with output: 'export'. Netlify finds forms by reading the deployed HTML, and this form is rendered by
// React, so public/__forms.html carries a static copy of every field for detection at deploy. The submit is a fetch
// POST to "/" as application/x-www-form-urlencoded with form-name and the honeypot, built from the validated values.
// Keep the field names in public/__forms.html in step with lib/content/site.ts: Netlify drops any field it has not
// seen in a detected form. Without JavaScript the form still posts natively to the same endpoint.
//
// The helpers below are exported for components/site/LeadMagnet.tsx, which follows the same rules for the scorecard.

// ------------------------------------------------------------------ rules

/** Where the forms post. Netlify answers form posts on any static path; "/" is the exported homepage. */
export const NETLIFY_ENDPOINT = '/';

/** The honeypot field, declared with netlify-honeypot in public/__forms.html. People never see it. */
export const HONEYPOT_NAME = 'bot-field';

/** The address shown in the design-system page's held confirmation; the format the email message suggests. */
const SAMPLE_EMAIL = 'name@yourshop.co.uk';

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const HAS_SCHEME = /^[a-z][a-z0-9+.-]*:\/\//i;
const LOOKS_LIKE_DOMAIN = /^[^\s/]+\.[^\s]{2,}/;

function isWebAddress(value: string) {
  try {
    const url = new URL(value);
    return (url.protocol === 'https:' || url.protocol === 'http:') && url.hostname.includes('.');
  } catch {
    return false;
  }
}

/** A bare domain typed into the website field ("yourshop.co.uk") gains https:// on blur, as in Phase 1. */
export function withScheme(value: string) {
  const trimmed = value.trim();
  return trimmed && !HAS_SCHEME.test(trimmed) && LOOKS_LIKE_DOMAIN.test(trimmed) ? `https://${trimmed}` : trimmed;
}

/**
 * The zod rule for one field from lib/content/site.ts. Messages come from the field's content; the fallbacks only
 * apply to a field added without them, and still say what to do.
 */
export function fieldRule(field: FieldDef): z.ZodTypeAny {
  const verb = field.type === 'select' ? 'Choose' : 'Enter';
  const required = field.messages?.required ?? `${verb} ${field.label.toLowerCase()}.`;
  const invalid = field.messages?.invalid ?? required;
  const text = z.string().trim();
  const valid = (test: (value: string) => boolean) =>
    field.required
      ? text.min(1, required).refine((value) => value === '' || test(value), invalid)
      : text.refine((value) => value === '' || test(value), invalid);

  switch (field.type) {
    case 'email':
      return valid((value) => EMAIL_PATTERN.test(value));
    case 'url':
      return valid(isWebAddress);
    case 'select':
      return valid((value) => (field.options ?? []).includes(value));
    default:
      return field.required ? text.min(1, required) : text;
  }
}

function isGroup(item: FieldDef | FieldGroup): item is FieldGroup {
  return 'fields' in item;
}

/** The fields in page order, with fieldsets opened out. */
export function flattenFields(items: (FieldDef | FieldGroup)[]): FieldDef[] {
  return items.flatMap((item) => (isGroup(item) ? item.fields : [item]));
}

export function schemaFor(fields: FieldDef[]) {
  return z.object(Object.fromEntries(fields.map((field) => [field.name, fieldRule(field)])));
}

/** POSTs one submission to Netlify Forms. Throws when the request fails or Netlify does not answer 2xx. */
export async function sendToNetlify(
  formName: string,
  values: Record<string, string>,
  honeypot = '',
  endpoint: string = NETLIFY_ENDPOINT,
) {
  const body = new URLSearchParams({ ...values, [HONEYPOT_NAME]: honeypot, 'form-name': formName });
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  });
  if (!response.ok) {
    throw new Error(`The form service answered ${response.status}`);
  }
}

// ------------------------------------------------------------------ behaviour, shared with the scorecard form

type FormValues = Record<string, string>;

type Phase = 'idle' | 'invalid' | 'sending' | 'failed' | 'sent';

/**
 * For the design-system page only. Any demo value stops the form posting to Netlify: 'interactive' behaves like the
 * live form and pretends to send for 700ms; the others hold one state so both themes can be checked at a glance.
 */
export type FormDemo = 'interactive' | 'invalid' | 'sending' | 'failed' | 'sent';

export interface NetlifyFormOptions {
  formName: string;
  fields: FieldDef[];
  endpoint?: string;
  demo?: FormDemo;
}

export interface NetlifyFormHandle {
  form: UseFormReturn<FormValues>;
  phase: Phase;
  /** How many fields failed at the last submit. */
  invalidCount: number;
  /** The address the visitor gave, for the confirmation. */
  sentTo: string;
  honeypotRef: React.RefObject<HTMLInputElement>;
  confirmationRef: React.RefObject<HTMLParagraphElement>;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onFieldChange: (field: FieldDef, value: string, commit: (value: string) => void) => void;
  onFieldBlur: (field: FieldDef, value: string, commit: () => void) => void;
}

const wait = (ms: number) => new Promise<void>((resolve) => window.setTimeout(resolve, ms));

export function useNetlifyForm({ formName, fields, endpoint = NETLIFY_ENDPOINT, demo }: NetlifyFormOptions): NetlifyFormHandle {
  const schema = React.useMemo(() => schemaFor(fields), [fields]);
  const defaultValues = React.useMemo(
    () => Object.fromEntries(fields.map((field) => [field.name, ''])) as FormValues,
    [fields],
  );
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    // Validation runs on blur (below) and on submit; after a submit, every change re-checks its field.
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    // Focus moves in field order in onInvalid, after the status line is set.
    shouldFocusError: false,
  });

  const initialPhase: Phase = demo === 'sending' || demo === 'failed' || demo === 'sent' ? demo : 'idle';
  const [phase, setPhaseState] = React.useState<Phase>(initialPhase);
  const phaseRef = React.useRef<Phase>(initialPhase);
  const setPhase = React.useCallback((next: Phase) => {
    phaseRef.current = next;
    setPhaseState(next);
  }, []);
  const [invalidCount, setInvalidCount] = React.useState(0);
  const [sentTo, setSentTo] = React.useState(demo === 'sent' ? SAMPLE_EMAIL : '');
  // The guard that makes a second submit a no-op, set before any await so a double press cannot slip through.
  const sending = React.useRef(demo === 'sending');
  // Fields the visitor has typed in: only these are checked on blur.
  const typed = React.useRef(new Set<string>());
  const honeypotRef = React.useRef<HTMLInputElement>(null);
  const confirmationRef = React.useRef<HTMLParagraphElement>(null);
  const moveFocusToConfirmation = React.useRef(false);

  const clearCountOnceFixed = React.useCallback(() => {
    if (phaseRef.current === 'invalid' && fields.every((field) => !form.getFieldState(field.name).error)) {
      setPhase('idle');
    }
  }, [fields, form, setPhase]);

  const onFieldChange = React.useCallback(
    (field: FieldDef, value: string, commit: (value: string) => void) => {
      commit(value);
      typed.current.add(field.name);
      if (form.getFieldState(field.name).error) {
        void form.trigger(field.name).then(clearCountOnceFixed);
      }
    },
    [form, clearCountOnceFixed],
  );

  const onFieldBlur = React.useCallback(
    (field: FieldDef, value: string, commit: () => void) => {
      if (field.type === 'url') {
        const fixed = withScheme(value);
        if (fixed !== value) form.setValue(field.name, fixed);
      }
      commit();
      if (typed.current.has(field.name)) {
        void form.trigger(field.name).then(clearCountOnceFixed);
      }
    },
    [form, clearCountOnceFixed],
  );

  const onValid = async (values: FormValues) => {
    if (sending.current || phaseRef.current === 'sent') return;
    sending.current = true;
    setPhase('sending');
    try {
      if (demo) {
        await wait(700);
      } else {
        await sendToNetlify(formName, values, honeypotRef.current?.value ?? '', endpoint);
      }
      setSentTo(values.email ?? '');
      moveFocusToConfirmation.current = true;
      setPhase('sent');
    } catch {
      setPhase('failed');
    } finally {
      sending.current = false;
    }
  };

  const onInvalid = (errors: FieldErrors<FormValues>) => {
    const failed = fields.filter((field) => errors[field.name]);
    failed.forEach((field) => typed.current.add(field.name));
    setInvalidCount(failed.length);
    setPhase('invalid');
    if (failed[0]) form.setFocus(failed[0].name);
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (sending.current) {
      event.preventDefault();
      return;
    }
    void form.handleSubmit(onValid, onInvalid)(event);
  };

  // The held "invalid" demo: check every field once, as a submit would, without moving focus.
  React.useEffect(() => {
    if (demo !== 'invalid') return;
    void form.trigger().then(() => {
      const failed = fields.filter((field) => form.getFieldState(field.name).error);
      failed.forEach((field) => typed.current.add(field.name));
      setInvalidCount(failed.length);
      setPhase('invalid');
    });
    // Runs once, on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    if (phase === 'sent' && moveFocusToConfirmation.current) {
      moveFocusToConfirmation.current = false;
      confirmationRef.current?.focus();
    }
  }, [phase]);

  return {
    form,
    phase,
    invalidCount,
    sentTo,
    honeypotRef,
    confirmationRef,
    onSubmit,
    onFieldChange,
    onFieldBlur,
  };
}

// ------------------------------------------------------------------ pieces, shared with the scorecard form

/** The status line's words for the current phase. */
export function statusMessage(phase: Phase, invalidCount: number, status: FormStatus) {
  switch (phase) {
    case 'sending':
      return status.sending;
    case 'invalid':
      return invalidCount === 1 ? status.oneInvalid : status.manyInvalid.replace('{count}', String(invalidCount));
    case 'failed':
      return status.failed;
    default:
      return '';
  }
}

/**
 * The polite live region under the button: "Sending", how many fields need an answer, or the plain failure message.
 * It is always in the page so screen readers announce each change, and it keeps one line of height so nothing jumps.
 * Ink while sending; signal-critical when something needs fixing, as the brand book allows for form errors, and
 * always in words.
 */
export function StatusLine({ phase, invalidCount, status }: { phase: Phase; invalidCount: number; status: FormStatus }) {
  const message = statusMessage(phase, invalidCount, status);
  return (
    <p
      role="status"
      className={cn(
        'small min-h-[calc(var(--small-font-size)*var(--small-line-height))] max-w-measure',
        phase === 'invalid' || phase === 'failed' ? 'text-signal-critical' : 'text-ink',
      )}
    >
      {message}
    </p>
  );
}

/** The honeypot, hidden from everyone: bots that fill every field mark themselves as spam for Netlify. */
export function Honeypot({ inputRef }: { inputRef: React.RefObject<HTMLInputElement> }) {
  return (
    <div hidden>
      <label>
        Leave this field empty
        <input ref={inputRef} name={HONEYPOT_NAME} type="text" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}

/**
 * What replaces the form on success: the check icon beside the words that say the same, in the ink of the line it sits
 * on (brand book, Iconography: functional icons in ink or on-green; Icons README: currentColor), what happens
 * next (with the address the visitor gave), and two case studies, so the wait is not dead time. The first line takes
 * focus, so a screen reader reads the confirmation where the form was. It is a paragraph, not a heading: an icon never
 * sits beside a heading (Icons README), and heading-2 would make a thank-you louder than the form it replaces.
 */
export function Confirmation({
  content,
  email,
  firstLineRef,
}: {
  content: FormConfirmation;
  email: string;
  firstLineRef?: React.Ref<HTMLParagraphElement>;
}) {
  const [before, after = ''] = content.body.split('{email}');
  return (
    <div className="grid gap-space-4 text-ink">
      <p
        ref={firstLineRef}
        tabIndex={-1}
        // A focus target for screen readers, not a control: it carries no ring.
        className="body flex items-center gap-space-2 font-semibold focus-visible:outline-none"
      >
        <Check aria-hidden="true" size={20} strokeWidth={1.5} className="shrink-0" />
        <span>{content.heading}</span>
      </p>
      <p className="body max-w-measure">
        {before}
        <strong className="font-semibold">{email || 'you'}</strong>
        {after}
      </p>
      <p className="body max-w-measure">{content.followUpLead}</p>
      <ul className="grid gap-space-2">
        {content.links.map((link) => (
          <li key={link.href} className="body flex min-h-touch-target items-center">
            <ForwardLink link={link} layout="wrap" />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** One field from lib/content/site.ts as label, control and message, wired to the form. */
export function FieldControl({
  field: def,
  handle,
  className,
  controlClassName,
}: {
  field: FieldDef;
  handle: NetlifyFormHandle;
  className?: string;
  controlClassName?: string;
}) {
  return (
    <FormField
      control={handle.form.control}
      name={def.name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel required={def.required}>{def.label}</FormLabel>
          {def.type === 'select' ? (
            <Select
              name={field.name}
              value={field.value}
              onValueChange={(value) => handle.onFieldChange(def, value, field.onChange)}
            >
              <FormControl>
                <SelectTrigger
                  ref={field.ref}
                  aria-required={def.required || undefined}
                  className={controlClassName}
                  onBlur={() => handle.onFieldBlur(def, field.value, field.onBlur)}
                >
                  <SelectValue placeholder={def.placeholder} />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {(def.options ?? []).map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <FormControl>
              {def.type === 'textarea' ? (
                <Textarea
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  rows={def.rows}
                  required={def.required}
                  className={controlClassName}
                  onChange={(event) => handle.onFieldChange(def, event.target.value, field.onChange)}
                  onBlur={(event) => handle.onFieldBlur(def, event.target.value, field.onBlur)}
                />
              ) : (
                <Input
                  name={field.name}
                  ref={field.ref}
                  value={field.value}
                  type={def.type}
                  inputMode={def.inputMode}
                  autoComplete={def.autoComplete}
                  required={def.required}
                  // Email and web addresses are typed as they are: no capital, no spelling fixes.
                  autoCapitalize={def.type === 'email' || def.type === 'url' ? 'none' : undefined}
                  spellCheck={def.type === 'email' || def.type === 'url' ? false : undefined}
                  className={controlClassName}
                  onChange={(event) => handle.onFieldChange(def, event.target.value, field.onChange)}
                  onBlur={(event) => handle.onFieldBlur(def, event.target.value, field.onBlur)}
                />
              )}
            </FormControl>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

/** The raised panel (components/site/form-panel-styles.ts), re-exported for components/site/LeadMagnet.tsx. */
export { formPanelClasses };

// ------------------------------------------------------------------ the brief form

type Row =
  | { kind: 'pair'; fields: FieldDef[] }
  | { kind: 'choices'; fields: FieldDef[] }
  | { kind: 'group'; group: FieldGroup }
  | { kind: 'single'; field: FieldDef };

/**
 * Phase 1's rows, from the field list: text fields in pairs, the selects three to a row, a fieldset with its two
 * inputs side by side, the long answer on its own. Rows follow the form's own width (a container query), so the form
 * lays out the same in the homepage's half column and on a full-width /contact page. Pairs split from 28rem; the
 * selects go three across from 30rem, where each still reads "Choose one" in full.
 */
function rowsFor(items: (FieldDef | FieldGroup)[]): Row[] {
  const rows: Row[] = [];
  for (const item of items) {
    if (isGroup(item)) {
      rows.push({ kind: 'group', group: item });
      continue;
    }
    if (item.type === 'textarea') {
      rows.push({ kind: 'single', field: item });
      continue;
    }
    const kind = item.type === 'select' ? 'choices' : 'pair';
    const last = rows[rows.length - 1];
    if (last && last.kind === kind) last.fields.push(item);
    else rows.push({ kind, fields: [item] });
  }
  return rows;
}

const pairRow = 'grid grid-cols-1 items-start gap-space-4 [@container_(min-width:28rem)]:grid-cols-2';
const choiceColumns: Record<number, string> = {
  1: '',
  2: '[@container_(min-width:30rem)]:grid-cols-2',
  3: '[@container_(min-width:30rem)]:grid-cols-3',
};

export interface ContactFormProps {
  /** contactSection from lib/content/site.ts by default. */
  content?: Pick<
    ContactSection,
    'heading' | 'netlifyFormName' | 'fields' | 'submit' | 'alternative' | 'status' | 'confirmation'
  >;
  /** The id of the section heading that names the form. Without it the form is named by content.heading. */
  labelledBy?: string;
  /** The ground the panel sits on: the green band on the homepage, paper elsewhere. */
  ground?: 'paper' | 'band';
  /** Draw the raised panel around the form. On by default. */
  panel?: boolean;
  /** Where to POST. "/" by default. */
  endpoint?: string;
  /** Design-system page only; see FormDemo. Never set on a live page. */
  demo?: FormDemo;
  className?: string;
}

export function ContactForm({
  content = contactSection,
  labelledBy,
  ground = 'paper',
  panel = true,
  endpoint = NETLIFY_ENDPOINT,
  demo,
  className,
}: ContactFormProps) {
  const fields = React.useMemo(() => flattenFields(content.fields), [content.fields]);
  const rows = React.useMemo(() => rowsFor(content.fields), [content.fields]);
  const handle = useNetlifyForm({ formName: content.netlifyFormName, fields, endpoint, demo });
  const { phase } = handle;
  const isSending = phase === 'sending';

  return (
    <div className={cn(panel && formPanelClasses(ground), className)}>
      {phase === 'sent' ? (
        <Confirmation content={content.confirmation} email={handle.sentTo} firstLineRef={handle.confirmationRef} />
      ) : (
        <Form {...handle.form}>
          <form
            name={content.netlifyFormName}
            method="post"
            action={endpoint}
            noValidate
            aria-labelledby={labelledBy}
            aria-label={labelledBy ? undefined : content.heading}
            onSubmit={handle.onSubmit}
            className="grid gap-space-4 [container-type:inline-size]"
          >
            <input type="hidden" name="form-name" value={content.netlifyFormName} />
            <Honeypot inputRef={handle.honeypotRef} />

            {rows.map((row) => {
              switch (row.kind) {
                case 'pair':
                  return (
                    <div key={row.fields[0].name} className={pairRow}>
                      {row.fields.map((field) => (
                        <FieldControl key={field.name} field={field} handle={handle} />
                      ))}
                    </div>
                  );
                case 'choices':
                  return (
                    // Labels of different lengths wrap differently in three columns, so the controls align on
                    // their foot (Phase 1).
                    <div
                      key={row.fields[0].name}
                      className={cn('grid grid-cols-1 items-end gap-space-4', choiceColumns[Math.min(row.fields.length, 3)])}
                    >
                      {row.fields.map((field) => (
                        <FieldControl key={field.name} field={field} handle={handle} />
                      ))}
                    </div>
                  );
                case 'group':
                  return (
                    // The plan's one field "Business name and website" is a fieldset: its name is the legend, and
                    // each input keeps its own label and autocomplete (Phase 1).
                    <fieldset key={row.group.legend} className="m-0 min-w-0 border-0 p-0">
                      <legend className="small mb-space-2 p-0 font-medium text-ink">{row.group.legend}</legend>
                      <div className={pairRow}>
                        {row.group.fields.map((field) => (
                          <FieldControl key={field.name} field={field} handle={handle} />
                        ))}
                      </div>
                    </fieldset>
                  );
                default:
                  return (
                    <FieldControl
                      key={row.field.name}
                      field={row.field}
                      handle={handle}
                      // Phase 1's short-screen rule: a 96px answer box at 1024x768 and 1280x800.
                      controlClassName="[@media(min-width:900px)_and_(max-height:860px)]:min-h-space-24 [@media(min-width:900px)_and_(max-height:860px)]:h-space-24"
                    />
                  );
              }
            })}

            <div className="flex flex-wrap items-center gap-x-space-4 gap-y-space-3">
              {/* Full width until the form is 28rem wide, as Phase 1's form button below 720px. */}
              <Button
                type="submit"
                aria-disabled={isSending || undefined}
                className="w-full [@container_(min-width:28rem)]:w-auto"
              >
                {isSending ? content.status.sending : content.submit}
              </Button>
              <span className="body inline-flex flex-wrap items-center gap-x-space-1 text-ink">
                {content.alternative.lead}{' '}
                <TextLink
                  href={content.alternative.link.href}
                  external={content.alternative.link.external}
                  className="inline-flex min-h-touch-target items-center gap-space-1"
                >
                  {content.alternative.link.label}
                  {content.alternative.link.external ? (
                    <ExternalLink aria-hidden="true" size={20} strokeWidth={1.5} className="shrink-0" />
                  ) : null}
                </TextLink>
              </span>
            </div>

            <StatusLine phase={phase} invalidCount={handle.invalidCount} status={content.status} />
          </form>
        </Form>
      )}
    </div>
  );
}
