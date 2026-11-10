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
  /** The plan's title tag, written in full: lib/seo.ts sets it as title.absolute so the layout template does not
   *  repeat the brand suffix. */
  title: string;
  description: string;
}

// ------------------------------------------------------------------ stubs

/**
 * A part of a page the plan does not write yet (Phase 3 decisions 3 and 4). Pages render STUB_LABEL from
 * lib/content/stub.ts in its place, visibly, and a page that is mostly stubs is noindex. The note says what the plan
 * asks for there; it is for the writer and is never rendered.
 */
export interface Stub {
  stub: true;
  note: string;
}

/** Written copy, or a stub until it is written. */
export type Written<T> = T | Stub;

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
  /** The client's case study, for breadcrumbs and case-study links. The Testimonial component never links the name. */
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

/** One of the plan's twelve planned articles (Content and distribution, first 90 days). None is written yet. */
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
  /** The insight cluster it will sit in on /insights. A Phase 3 assignment; the plan does not give one. */
  cluster?: InsightClusterId;
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
   * band only with the client's written permission. A stub until the plan or the client supplies it.
   */
  business: Written<string>;
  /**
   * The headline number and its line. Only figures already public may appear in this repository. Left out where the
   * plan's headline has no number (Saverys of Broadway, Licklibrary); CaseStudyHeader then sets no StatBlock.
   */
  stat?: Pick<ProofFigure, 'figure' | 'line'>;
  /** The sector tag. Clients outside the five sectors (wellness, digital) carry a label and no sector page. */
  sector: { label: string; slug?: SectorSlug };
  problems: ProblemTag[];
  /** The testimonial on the page, by the quoting person's name in proof.testimonials. */
  quoteBy?: string;
}

/** What an article card needs: the planned articles and the archive posts both carry it. */
export type ArticleCard = Pick<Article, 'slug' | 'href' | 'title' | 'sectorTag'>;

export interface InsightsSection extends SectionIntro {
  articles: ArticleCard[];
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
  /** The landing page the heading links to (/scorecard), so the homepage panel puts it one click from home. */
  href?: string;
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

// ------------------------------------------------------------------ pages (lib/content/pages)

/** The head of a page: its title tag and meta description, and the H1. */
export interface PageHead {
  meta: PageMeta;
  h1: string;
}

/** A section with a heading and running copy: one string per paragraph. */
export interface TextSection {
  heading: string;
  paragraphs: Written<string[]>;
}

/** A section with a heading and a list (dash bullets, brand book Iconography). */
export interface ListSection {
  heading: string;
  /** A lead-in above the list. */
  intro?: string;
  items: Written<string[]>;
}

/** A section of titled items: a bold run-in title and its line or two. */
export interface ItemsSection {
  heading: string;
  items: Written<Problem[]>;
}

/** A two-column ledger table. */
export interface TableSection {
  heading: string;
  /** Screen-reader caption. */
  caption: string;
  columns: [string, string];
  rows: [string, string][];
}

/** The FAQ block: the FAQ component's content, FAQPage schema made from the same items. */
export interface FaqSection extends SectionIntro {
  items: FaqItem[];
}

/** A question the plan names whose answer is not written. Shown with STUB_LABEL, kept out of FAQPage schema. */
export interface FaqQuestionStub {
  question: string;
  answer: Stub;
}

/** The closing band on offer and sector pages (CTABand): book a call, or start with the Health Check. */
export interface ClosingActions {
  primary: Link;
  secondary: Link;
}

/** The links an offer page owes the rest of the site (plan, Internal linking rules). */
export interface OfferLinks {
  /** The two other offers. */
  offers: OfferId[];
  /** The sector pages. */
  sectors: SectorSlug[];
  /** Two case studies, by slug. The plan does not name them; Phase 3 picks. */
  caseStudies: [string, string];
}

/** Service JSON-LD inputs for an offer page (plan, Structured data: Service with price where stated). */
export interface ServiceSchema {
  name: string;
  description: string;
  /** Prices in GBP. A "from" price is a minimum; tiers are fixed prices. None where the plan states no price. */
  price?: { from: number; unit?: 'MONTH' } | { tiers: { name: string; price: number }[] };
}

export interface EcommerceDirectorPage extends PageHead {
  id: 'ecommerce-director';
  path: '/ecommerce-director';
  intro: string;
  whoFor: TextSection;
  whatIOwn: TableSection;
  month: TextSection;
  notIncluded: TextSection;
  pricing: TextSection;
  fit: { heading: string; good: { label: string; items: string[] }; notFit: { label: string; items: string[] } };
  faq: FaqSection;
  closing: ClosingActions;
  links: OfferLinks;
  service: ServiceSchema;
}

export interface PriceTier {
  /** The catalogue size the tier covers, as the plan writes it. */
  label: string;
  price: string;
  /** The tier the reader should choose: the one brass-300 band on the page. None is chosen by the plan, so none is set. */
  highlight?: boolean;
}

export interface StoreHealthCheckPage extends PageHead {
  id: 'store-health-check';
  path: '/store-health-check';
  intro: string;
  checked: { heading: string; items: Problem[] };
  deliverables: TextSection;
  pricing: {
    heading: string;
    intro: string;
    tiers: PriceTier[];
    note: string;
    /**
     * The tier table's caption (screen readers only) and column heads, and the word on a highlighted tier, so the
     * highlight is never carried by colour alone. Required when a tier is highlighted.
     */
    table: { caption: string; columns: [string, string]; highlightLabel?: string };
  };
  faq: FaqSection;
  closing: ClosingActions;
  links: OfferLinks;
  service: ServiceSchema;
}

export interface BuildsPage extends PageHead {
  id: 'shopify-builds-and-migrations';
  path: '/shopify-builds-and-migrations';
  intro: string;
  builtForTheSector: { heading: string; items: string[] };
  migrations: TextSection;
  howItRuns: TextSection;
  pricing: TextSection;
  faq: FaqSection;
  closing: ClosingActions;
  links: OfferLinks;
  service: ServiceSchema;
}

/** A proof card on a sector page: the matching case study with its headline number and a quote. */
export interface SectorProof {
  /** The case study, by slug in lib/content/pages/results.ts. */
  caseStudy: string;
  /** The quoting person's name in proof.testimonials (lib/content/site.ts). */
  quoteBy?: string;
}

export interface SectorPage extends PageHead {
  slug: SectorSlug;
  path: string;
  /** Written: the furniture page. Every other sector page is noindex until its body is written (decision 3). */
  written: boolean;
  /** Three sentences: the sector's online reality, what the site should be doing, one line on who I am. */
  intro: Written<string>;
  /** Five problems specific to the sector, each with two lines. The plan names the other sectors' problems only. */
  problems: { heading: string; items: { title: string; body: Written<string> }[] };
  /** Five or six bullets drawn from the three offers, worded for the sector. */
  differently: ListSection;
  proof: { heading: string; cards: Written<SectorProof[]> };
  /** Three articles from the sector's cluster, by slug in lib/content/insights-archive.ts or the planned list. */
  articles: { heading: string; slugs: Written<string[]> };
  /** Four questions the sector's owners ask, with FAQPage schema for the answered ones. */
  faq: SectionIntro & { items: Written<(FaqItem | FaqQuestionStub)[]> };
  closing: ClosingActions;
  /** What the plan says about the page that is not copy: proof to feature, launch status. Never rendered. */
  planNotes: string[];
}

/** One case study page (plan, Results: the case study template, parts 1 to 8). */
export interface CaseStudyPage extends PageHead {
  caseStudy: CaseStudy;
  /** Mostly unwritten pages are noindex (decision 4). */
  written: boolean;
  /** Part 1: the one-line summary beside the headline number, from the plan's "Write these four first" table. */
  summary: Written<string>;
  /** Part 2 is the CaseStudyHeader business line. Parts 3 to 7: */
  problem: TextSection;
  whatIDid: ListSection;
  result: TextSection;
  /** Part 6: the testimonial, by name in proof.testimonials. */
  quoteBy?: string;
  whatsNext: TextSection;
  /** Part 8: the offer it demonstrates, the sector page, two related articles. */
  links: { offer: Written<OfferId>; sector?: SectorSlug; articles: Written<string[]> };
  planNotes: string[];
}

export interface ResultsIndexPage extends PageHead {
  /** The page's short name: the nav and breadcrumb label, and the heading over two case studies on an offer page. */
  label: string;
  intro: Written<string>;
  /** The two filters (plan, /results). Labels for the problem values are problemTags in lib/content/site.ts. */
  filters: { sector: string; problem: string; all: string };
  /** Case-study slugs in the order the index lists them: the plan's "write these four first", then Licklibrary. */
  order: string[];
}

export interface AgencyOrInHousePage extends PageHead {
  /** The homepage comparison, which the page carries until the full cost table is written. */
  comparisonHeading: string;
  honestCase: TextSection;
  fullCost: TextSection;
  questions: ListSection;
  directorFit: TextSection;
  faq: SectionIntro & { items: Written<FaqItem[]> };
  closing: ClosingActions;
  planNotes: string[];
}

export interface AboutPage extends PageHead {
  /** Each part in the plan's order: the interiors work first, the career, how I work, the band, credentials. */
  interiors: TextSection;
  career: TextSection;
  howIWork: TextSection;
  band: TextSection;
  credentials: { heading: string; items: string[] };
  portraitAlt: string;
  closing: ClosingActions;
}

export interface ContactPage extends PageHead {
  intro: string;
  calendly: { heading: string; url: string; title: string };
}

export interface ThankYouPage extends PageHead {
  body: string;
  followUpLead: string;
  links: Link[];
}

export interface ScorecardPage extends PageHead {
  intro: string;
  /** The scorecard document's seven numbers. Not written yet (plan, open decisions). */
  document: Written<{ heading: string; items: Problem[] }>;
}

export interface LegalPage extends PageHead {
  /** The text is the pre-rebuild page's (app/(legacy)/privacy and /terms), ported by the page builder. */
  source: string;
}

export type InsightClusterId =
  | 'catalogue-and-feeds'
  | 'paid-media'
  | 'email-and-samples'
  | 'tracking-and-reporting'
  | 'showroom-and-online'
  | 'shopify-for-interiors'
  | 'archive';

export interface InsightCluster {
  id: InsightClusterId;
  /** The plan's cluster name; Archive is the Phase 3 home for posts that fit none (decision 8). */
  label: string;
}

/** A post moved from the pre-rebuild /blog (lib/content/insights-archive.ts). */
export interface ArchivePost {
  slug: string;
  href: string;
  title: string;
  excerpt: string;
  /** ISO 8601 date, as published on /blog. */
  published: string;
  /** Whole minutes at 230 words a minute (readingMinutes()), from the body. */
  minutes: number;
  cluster: InsightClusterId;
  /** The tag on its card and in its ArticleHeader: the sector where it is about one, else the cluster's label. */
  sectorTag: string;
  sector?: SectorSlug;
  /** The /blog category it was filed under. */
  legacyCategory: string;
  /** The live page is a custom one with no Markdown body (ai-writing-tells). */
  custom?: boolean;
  /** Markdown. */
  body: string;
}

export interface InsightsIndexPage extends PageHead {
  intro: Written<string>;
  clusters: InsightCluster[];
}

/** One 301 for netlify.toml (plan, Redirect map), in the order Netlify must read them: specific before splat. */
export interface Redirect {
  from: string;
  to: string;
  status: 301;
  force: true;
  /**
   * Where the rule comes from: the plan's map, a Phase 3 decision, an existing netlify.toml rule, a proposal, or a
   * removed pre-rebuild file pointed at its replacement.
   */
  source: 'plan' | 'decision' | 'existing' | 'proposed' | 'retired';
  note?: string;
}
