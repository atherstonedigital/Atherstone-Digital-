import * as React from 'react';

import { privacyPage as page } from '@/lib/content/pages/contact';
import { contact } from '@/lib/content/site';
import { buildMetadata } from '@/lib/seo';

import { LegalDocument, LegalEmail, LegalList, LegalParagraph, type LegalSection } from './_legal';

// /privacy: the pre-rebuild privacy policy (app/(legacy)/privacy/page.tsx), word for word, on the new system. Its date
// line reads October 2023. Before launch it needs updating for the brief form's new fields (showrooms, platform,
// turnover, website), the scorecard form, the Calendly booking and GA4 (lib/content/pages/contact.ts). The text speaks
// as "we"; it is legal text, carried over unchanged, and the voice rules' first person singular is not applied to it.

export const metadata = buildMetadata('/privacy');

const sections: LegalSection[] = [
  {
    id: 'introduction',
    heading: '1. Introduction',
    children: (
      <LegalParagraph>
        Atherstone Digital (“we”, “our”, or “us”) is committed to protecting your privacy. This Privacy Policy explains
        how we collect, use, disclose, and safeguard your information when you visit our website or engage with our
        services. We are registered in the United Kingdom, Company Number {contact.companyNumber}.
      </LegalParagraph>
    ),
  },
  {
    id: 'data-we-collect',
    heading: '2. Data we collect',
    children: (
      <>
        <LegalParagraph>
          We may collect personal identification information from you in a variety of ways, including when you visit our
          site, fill out a form, and in connection with other activities, services, features, or resources we make
          available on our Site.
        </LegalParagraph>
        <LegalList>
          <li>
            <strong className="font-semibold">Personal Identity Data:</strong> Name, email address, phone number, company
            name.
          </li>
          <li>
            <strong className="font-semibold">Technical Data:</strong> IP address, browser type, operating system, and
            usage details via cookies.
          </li>
          <li>
            <strong className="font-semibold">Marketing Data:</strong> Your preferences in receiving marketing from us.
          </li>
        </LegalList>
      </>
    ),
  },
  {
    id: 'how-we-use-your-data',
    heading: '3. How we use your data',
    children: (
      <>
        <LegalParagraph>We use the collected data for the following purposes:</LegalParagraph>
        <LegalList>
          <li>To provide and maintain our Service.</li>
          <li>To notify you about changes to our Service.</li>
          <li>To provide customer support.</li>
          <li>To gather analysis or valuable information so that we can improve our Service.</li>
          <li>To monitor the usage of our Service.</li>
          <li>To detect, prevent and address technical issues.</li>
        </LegalList>
      </>
    ),
  },
  {
    id: 'data-retention',
    heading: '4. Data retention',
    children: (
      <LegalParagraph>
        We will retain your Personal Data only for as long as is necessary for the purposes set out in this Privacy
        Policy. We will retain and use your Personal Data to the extent necessary to comply with our legal obligations,
        resolve disputes, and enforce our legal agreements and policies.
      </LegalParagraph>
    ),
  },
  {
    id: 'contact-us',
    heading: '5. Contact us',
    children: (
      <LegalParagraph>
        If you have any questions about this Privacy Policy, please contact us at: <LegalEmail />
      </LegalParagraph>
    ),
  },
];

export default function PrivacyPage() {
  return <LegalDocument h1={page.h1} dateLine="Last updated: October 2023" sections={sections} />;
}
