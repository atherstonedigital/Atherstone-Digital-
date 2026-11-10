import * as React from 'react';

import { SectionHeading } from '@/components/brand/SectionHeading';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import type { FaqItem } from '@/lib/content/types';
import { cn } from '@/lib/utils';

// The FAQ block (plan: every offer and sector page, and SEO 6, "FAQ blocks with direct answers"): the Accordion with
// the questions in heading-2 and the answers in body, and FAQPage JSON-LD made from the same items, so the schema and
// the page can never disagree. Every answer stays in the static HTML while its item is closed (see
// components/ui/accordion.tsx), so the marked-up answers are on the page, as Google's structured data rules require.
//
// A server component: the JSON-LD is written into the exported HTML, and only the Accordion hydrates.

export interface FAQProps extends Omit<React.HTMLAttributes<HTMLElement>, 'content' | 'children'> {
  /** The questions and answers, for example ecommerceDirectorFaq from lib/content/site.ts, plus an optional heading. */
  content: { eyebrow?: string; heading?: string; items: FaqItem[] };
  /** Open with the SectionHeading and render as a section labelled by it; off, the list alone. */
  withHeading?: boolean;
  /** The SectionHeading's level; the questions sit one level below it. With no heading, questions are h3. */
  headingLevel?: 'h2' | 'h3';
  /** The heading's id, for aria-labelledby. Generated when left out. */
  headingId?: string;
  /** Write the FAQPage JSON-LD. On by default; one FAQPage per page. */
  schema?: boolean;
  /** Questions open on load, by index. None by default. */
  defaultOpen?: number[];
}

/** FAQPage structured data for a list of questions. Plain text in, plain text out. */
export function faqPageSchema(items: FaqItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: { '@type': 'Answer', text: item.answer },
    })),
  };
}

/** JSON for a script tag: "<" escaped so no answer can close the tag early. */
function jsonForScript(value: unknown) {
  return JSON.stringify(value).replace(/</g, '\\u003c');
}

export function FAQ({
  content,
  withHeading = true,
  headingLevel = 'h2',
  headingId,
  schema = true,
  defaultOpen = [],
  className,
  ...props
}: FAQProps) {
  const autoId = React.useId();
  const titleId = headingId ?? `${autoId}-heading`;
  const showHeading = withHeading && Boolean(content.heading);
  const Root = showHeading ? 'section' : 'div';
  const questionLevel = showHeading && headingLevel === 'h3' ? 4 : 3;
  const values = content.items.map((_, index) => `question-${index + 1}`);

  return (
    <Root aria-labelledby={showHeading ? titleId : undefined} className={cn('text-ink', className)} {...props}>
      {showHeading && content.heading ? (
        <SectionHeading as={headingLevel} eyebrow={content.eyebrow} heading={content.heading} headingId={titleId} />
      ) : null}
      {/* Several answers can be open at once, so a reader can compare them. The SectionHeading's hairline is the
          first question's top rule; without a heading, the list draws its own. */}
      <Accordion
        type="multiple"
        defaultValue={defaultOpen.map((index) => values[index]).filter(Boolean)}
        className={cn(!showHeading && 'border-t border-rule')}
      >
        {content.items.map((item, index) => (
          <AccordionItem key={item.question} value={values[index]}>
            <AccordionTrigger headingLevel={questionLevel}>{item.question}</AccordionTrigger>
            <AccordionContent>
              <p>{item.answer}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      {schema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonForScript(faqPageSchema(content.items)) }} />
      ) : null}
    </Root>
  );
}
