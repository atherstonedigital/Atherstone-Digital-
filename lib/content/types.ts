// Types for the site's content (lib/content/site.ts). Copy is British English, first person singular, sentence case,
// with no em dashes.

export interface Link {
  label: string;
  href: string;
  /** Leaves the site (Calendly, LinkedIn). Components add the external-link icon and "(leaves this site)" for
   *  screen readers where the brand book asks for it. */
  external?: boolean;
}

export interface PageMeta {
  /** The plan's title tag, written in full: use it with title.absolute so the layout template does not repeat the
   *  brand suffix. */
  title: string;
  description: string;
}

// ------------------------------------------------------------------ navigation, footer, contact

export interface NavGroup {
  label: string;
  items: Link[];
}

export interface SiteNav {
  services: NavGroup;
  sectors: NavGroup;
  /** Results, Insights, About, in the plan's order after the two dropdowns. */
  links: Link[];
  /** The primary button at the end of the bar. */
  cta: Link;
}

export interface FooterColumn {
  label: string;
  links: Link[];
}

export interface SiteFooter {
  columns: FooterColumn[];
  /** The descriptor line under the columns. */
  descriptor: string;
  /** The legal line on its own rule at the foot. */
  legal: string;
}

export interface ContactDetails {
  email: string;
  emailHref: string;
  phoneDisplay: string;
  phoneHref: string;
  linkedIn: Link;
  companyName: string;
  companyNumber: string;
  /** Every "Book a 30-minute call" goes here. */
  calendlyUrl: string;
}

// ------------------------------------------------------------------ homepage sections

/** The SectionHeading block: an optional eyebrow (sentence case; the component sets it uppercase) and the heading. */
export interface SectionIntro {
  eyebrow?: string;
  heading: string;
}

export interface Hero {
  eyebrow: string;
  /** The H1 as one string, for metadata and screen readers. */
  heading: string;
  /** The H1 split at its sentences; from 720px each sits on its own line. */
  headingLines: string[];
  lead: string;
  primary: Link;
  secondary: Link;
  /** The one line under the buttons. */
  fact: string;
}

export interface ProofFigure {
  /** The figure as set in the StatBlock: '16,193', '120+', '£250k'. */
  figure: string;
  /** The StatBlock line: what, who, and when, under 90 characters. */
  line: string;
  /** Where the figure is already public; every figure here must be. */
  source: string;
}

export interface Testimonial {
  /** Verbatim, without quotation marks: the italic does the job. */
  quote: string;
  name: string;
  business: string;
  /** The case study the business name links to. */
  href?: string;
  /** The Testimonial component's one-line result (under 50 characters). None is approved yet. */
  result?: string;
}

export interface ProofSection {
  heading: string;
  figures: ProofFigure[];
  /** Gary first: he is the sector buyer. */
  testimonials: Testimonial[];
  link: Link;
}

export interface Problem {
  title: string;
  body: string;
}

export interface ProblemsSection extends SectionIntro {
  items: Problem[];
}

export type OfferId = 'ecommerce-director' | 'store-health-check' | 'shopify-builds-and-migrations';

export interface Price {
  /** Qualifier before the amount, set in small: 'From'. */
  pre?: string;
  /** Set in Newsreader with tabular numerals. */
  amount: string;
  /** Qualifier after the amount, set in small: 'a month', 'after a scoping call'. */
  post?: string;
}

export interface Offer {
  id: OfferId;
  href: string;
  /** The offer's name, a proper name in the plan's casing. */
  name: string;
  /** The OfferCard eyebrow. */
  eyebrow: string;
  /** The homepage copy without its price sentence, which the card sets in the price row. */
  summary: string;
  price: Price;
  /** The Health Check carries the brass-300 highlight: the step a cautious owner should take first. */
  highlight: boolean;
  /** Visible link text, and the screen-reader context that follows it. */
  readMore: string;
  readMoreContext: string;
  /** The offer page's title tag, meta description and H1, from the plan's Service pages. */
  page: PageMeta & { h1: string };
}

export interface OffersSection extends SectionIntro {
  offers: Offer[];
  /** The one primary button under the row of cards. */
  cta: Link;
}

export interface ComparisonSection extends SectionIntro {
  /** Screen-reader caption for the table. */
  caption: string;
  columns: [string, string, string];
  rows: [string, string, string][];
  note: string;
  link: Link;
}

export interface Step {
  number: number;
  title: string;
  body: string;
}

export interface StepsSection extends SectionIntro {
  steps: Step[];
}

export type SectorSlug =
  | 'furniture-retailers'
  | 'lighting-retailers'
  | 'kitchen-and-bathroom-showrooms'
  | 'flooring-and-tile-retailers'
  | 'homeware-and-gift-retailers';

export interface Sector {
  slug: SectorSlug;
  href: string;
  /** The label in the nav dropdown and footer, in the plan's casing until the plan owner rules on sentence case. */
  navLabel: string;
  /** The label on the homepage sector tile (a card title, so sentence case). */
  tileLabel: string;
  /** The tag on an article card. */
  tag: string;
  /** The plan's title tag for the sector page (The five variants table). */
  titleTag: string;
  /** The plan's launch status: launch now, or hold until there is proof. */
  status: 'launch' | 'hold';
}

export interface SectorsSection extends SectionIntro {
  sectors: Sector[];
}

export interface AboutSection extends SectionIntro {
  bio: string;
  credentials: string[];
  link: Link;
}

export interface Article {
  week: number;
  /** Proposed slug under /insights; the plan defines none. */
  slug: string;
  href: string;
  title: string;
  targetTerm: string;
  /** The sector tag shown on the card. */
  sectorTag: string;
  /** The one sector page and one offer page the article links to in its body. */
  linksTo: { sector: SectorSlug; offer: OfferId };
  /** Publication date, ISO 8601 (2026-11-16). Set when the article is published; none is written yet. */
  published?: string;
  /** Reading time in whole minutes (readingMinutes() in components/site/ArticleHeader.tsx). Set with published. */
  minutes?: number;
}

// ------------------------------------------------------------------ case studies

/** The Results index's problem filters (plan, /results). Labels are in lib/content/site.ts (problemTags). */
export type ProblemTag = 'catalogue' | 'feeds' | 'tracking' | 'paid' | 'email' | 'build';

/** One case study, as the plan's case study template opens it (headline number, the business, the tags). */
export interface CaseStudy {
  slug: string;
  /** /results/<slug>. */
  href: string;
  /** The client's business name, the page's H1. Named only with the client's written permission. */
  title: string;
  /**
   * The business line: sector, showrooms, platform and what online was doing before, in one sentence. The turnover
   * band only with the client's written permission.
   */
  business: string;
  /** The headline number and its line. Only figures already public may appear in this repository. */
  stat: Pick<ProofFigure, 'figure' | 'line'>;
  /** The sector tag. Clients outside the five sectors (wellness, digital) carry a label and no sector page. */
  sector: { label: string; slug?: SectorSlug };
  problems: ProblemTag[];
  /** The testimonial on the page, by the quoting person's name in proof.testimonials. */
  quoteBy?: string;
}

export interface InsightsSection extends SectionIntro {
  articles: Article[];
}

// ------------------------------------------------------------------ forms

export type FieldType = 'text' | 'email' | 'url' | 'select' | 'textarea';

export interface FormField {
  /** The field name posted to Netlify Forms; the static form stub must list it. */
  name: string;
  label: string;
  type: FieldType;
  required: boolean;
  autoComplete?: string;
  inputMode?: 'text' | 'email' | 'url';
  options?: string[];
  /** Select placeholder option. */
  placeholder?: string;
  rows?: number;
  /** What to do when the field fails: empty (required) or malformed (invalid). Never just "Invalid". */
  messages?: { required?: string; invalid?: string };
}

export interface FieldGroup {
  /** A fieldset: its legend names the group, each field keeps its own label. */
  legend: string;
  fields: FormField[];
}

export interface FormConfirmation {
  heading: string;
  /** The body, with {email} replaced by the address the visitor gave. */
  body: string;
  followUpLead: string;
  links: Link[];
}

export interface FormStatus {
  sending: string;
  /** One field failed. */
  oneInvalid: string;
  /** Several failed; {count} is replaced by the number. */
  manyInvalid: string;
  /** The send failed: the form stays as it was. */
  failed: string;
}

export interface LeadMagnet {
  heading: string;
  description: string;
  netlifyFormName: string;
  field: FormField;
  submit: string;
  confirmation: FormConfirmation;
}

export interface ContactSection extends SectionIntro {
  intro: string;
  netlifyFormName: string;
  fields: (FormField | FieldGroup)[];
  submit: string;
  /** The text link beside the submit button: lead then link. */
  alternative: { lead: string; link: Link };
  status: FormStatus;
  confirmation: FormConfirmation;
}

// ------------------------------------------------------------------ FAQ

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Faq {
  /** The page the FAQ belongs to; it carries FAQPage schema there. */
  page: string;
  items: FaqItem[];
}
