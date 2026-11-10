'use client';

import * as React from 'react';

import { TextLink } from '@/components/brand/Button';
import {
  Confirmation,
  FieldControl,
  Honeypot,
  NETLIFY_ENDPOINT,
  StatusLine,
  formPanelClasses,
  useNetlifyForm,
  type FormDemo,
} from '@/components/site/ContactForm';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { contactSection, leadMagnet } from '@/lib/content/site';
import type { FormStatus, LeadMagnet as LeadMagnetContent } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The scorecard form (plan, Homepage 10, and /scorecard): the site's second conversion, so it follows the same Forms
// rules as the brief form, from the same helpers in components/site/ContactForm.tsx. One email field, labelled above
// with "(required)", type email with the email keyboard and autocomplete; validated on blur once typed in and on
// submit; the error below the field says what to do; "Sending" and no double submit; on success the panel's heading
// and description stay, and the confirmation replaces the form, says when the scorecard arrives and links two case
// studies. It posts to Netlify Forms as "scorecard"; public/__forms.html carries its static copy for detection.
//
// Phase 1 set it as a raised panel beside the Insights articles, its heading an h3 in heading-2 (a panel title), the
// description in body at measure. As an h2 the heading takes heading-1. On /scorecard the page's H1 and intro are the
// panel's heading and description word for word, so the page passes labelledBy (its H1's id): the panel then drops its
// own heading and description and the form is named by the H1 (Phase 3 integrate step).
//
// Phase 3 review: where the content carries an href (leadMagnet.href, /scorecard) the heading is a text link to it, so
// the homepage panel reaches the landing page in one click. No new copy: the link is the heading's own words.

export interface LeadMagnetProps {
  /** leadMagnet from lib/content/site.ts by default. */
  content?: LeadMagnetContent;
  /** The status lines; the brief form's by default, so the two forms speak alike. */
  status?: FormStatus;
  /** h3 inside a section (the homepage), h2 where the panel is the section. */
  headingLevel?: 2 | 3;
  /** The heading's id; generated when left out. It also names the form. */
  headingId?: string;
  /**
   * The id of a heading outside the panel that already says the panel's heading and description (the /scorecard H1).
   * When set, the panel renders neither, and that heading names the form.
   */
  labelledBy?: string;
  /** Draw the raised panel. On by default. */
  panel?: boolean;
  /** Where to POST. "/" by default. */
  endpoint?: string;
  /** Design-system page only; see FormDemo in ContactForm.tsx. Never set on a live page. */
  demo?: FormDemo;
  className?: string;
}

export function LeadMagnet({
  content = leadMagnet,
  status = contactSection.status,
  headingLevel = 3,
  headingId,
  labelledBy,
  panel = true,
  endpoint = NETLIFY_ENDPOINT,
  demo,
  className,
}: LeadMagnetProps) {
  const autoId = React.useId();
  const titleId = labelledBy ?? headingId ?? `${autoId}-heading`;
  const fields = React.useMemo(() => [content.field], [content.field]);
  const handle = useNetlifyForm({ formName: content.netlifyFormName, fields, endpoint, demo });
  const { phase } = handle;
  const isSending = phase === 'sending';
  const Heading = headingLevel === 2 ? 'h2' : 'h3';

  return (
    <div className={cn(panel && formPanelClasses('paper'), className)}>
      {labelledBy ? null : (
        <>
          <Heading id={titleId} className={cn(headingLevel === 2 ? 'heading-1' : 'heading-2', 'mb-space-3 text-ink')}>
            {/* With an href the heading is the way to the landing page: a text link that keeps the heading's weight
                (heading-1 is 500, the link's own weight; heading-2 is 600). */}
            {content.href ? (
              <TextLink href={content.href} className={headingLevel === 2 ? undefined : 'font-semibold'}>
                {content.heading}
              </TextLink>
            ) : (
              content.heading
            )}
          </Heading>
          <p className="body mb-space-6 max-w-measure text-ink">{content.description}</p>
        </>
      )}

      {phase === 'sent' ? (
        <Confirmation content={content.confirmation} email={handle.sentTo} firstLineRef={handle.confirmationRef} />
      ) : (
        <Form {...handle.form}>
          <form
            name={content.netlifyFormName}
            method="post"
            action={endpoint}
            noValidate
            aria-labelledby={titleId}
            onSubmit={handle.onSubmit}
            className="grid gap-space-4 [container-type:inline-size]"
          >
            <input type="hidden" name="form-name" value={content.netlifyFormName} />
            <Honeypot inputRef={handle.honeypotRef} />
            <FieldControl field={content.field} handle={handle} />
            <div className="flex flex-wrap items-center gap-space-3">
              <Button
                type="submit"
                aria-disabled={isSending || undefined}
                className="w-full [@container_(min-width:28rem)]:w-auto"
              >
                {isSending ? status.sending : content.submit}
              </Button>
            </div>
            <StatusLine phase={phase} invalidCount={handle.invalidCount} status={status} />
          </form>
        </Form>
      )}
    </div>
  );
}
