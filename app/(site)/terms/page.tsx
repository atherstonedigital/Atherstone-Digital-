import * as React from 'react';

import { termsPage as page } from '@/lib/content/pages/contact';
import { buildMetadata } from '@/lib/seo';

import { LegalDocument, LegalEmail, LegalParagraph, type LegalSection } from '../privacy/_legal';

// /terms: the pre-rebuild terms of service (app/(legacy)/terms/page.tsx), word for word, on the new system. Its date
// line reads October 2023. The text speaks as "we" and describes the services as "fractional ecommerce growth
// consultancy"; it is legal text, carried over unchanged, so the voice rules are not applied to it. Dan should review
// it against the three offers before launch.

export const metadata = buildMetadata('/terms');

const sections: LegalSection[] = [
  {
    id: 'agreement-to-terms',
    heading: '1. Agreement to terms',
    children: (
      <LegalParagraph>
        These Terms of Service constitute a legally binding agreement made between you, whether personally or on behalf
        of an entity (“you”) and Atherstone Digital (“we,” “us” or “our”), concerning your access to and use of our
        website and services.
      </LegalParagraph>
    ),
  },
  {
    id: 'services',
    heading: '2. Services',
    children: (
      <LegalParagraph>
        Atherstone Digital provides fractional ecommerce growth consultancy, development, and marketing services. The
        specific deliverables are defined in individual statements of work or service agreements with our clients.
      </LegalParagraph>
    ),
  },
  {
    id: 'intellectual-property-rights',
    heading: '3. Intellectual property rights',
    children: (
      <LegalParagraph>
        Unless otherwise indicated, the Site and our services are our proprietary property and all source code,
        databases, functionality, software, website designs, audio, video, text, photographs, and graphics on the Site
        (collectively, the “Content”) and the trademarks, service marks, and logos contained therein (the “Marks”) are
        owned or controlled by us or licensed to us, and are protected by copyright and trademark laws.
      </LegalParagraph>
    ),
  },
  {
    id: 'limitation-of-liability',
    heading: '4. Limitation of liability',
    children: (
      <LegalParagraph>
        In no event will we or our directors, employees, or agents be liable to you or any third party for any direct,
        indirect, consequential, exemplary, incidental, special, or punitive damages, including lost profit, lost
        revenue, loss of data, or other damages arising from your use of the site or services.
      </LegalParagraph>
    ),
  },
  {
    id: 'governing-law',
    heading: '5. Governing law',
    children: (
      <LegalParagraph>
        These Terms shall be governed by and defined following the laws of the United Kingdom. Atherstone Digital and
        yourself irrevocably consent that the courts of the United Kingdom shall have exclusive jurisdiction to resolve
        any dispute which may arise in connection with these terms.
      </LegalParagraph>
    ),
  },
  {
    id: 'contact-information',
    heading: '6. Contact information',
    children: (
      <LegalParagraph>
        Questions about the Terms of Service should be sent to us at: <LegalEmail />
      </LegalParagraph>
    ),
  },
];

export default function TermsPage() {
  return <LegalDocument h1={page.h1} dateLine="Effective date: October 2023" sections={sections} />;
}
