import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, ArrowUpRight, Download, FileText } from 'lucide-react';

const SLUG = 'ai-writing-tells';
const TITLE = 'AI writing has a fingerprint. Most ecommerce brands are publishing it.';
const DEK = 'A free Claude skill that strips the patterns marking text as machine-generated. Built for ecommerce brands publishing at scale.';
const META_TITLE = 'AI writing has a fingerprint. Most ecommerce brands are publishing it. | Atherstone Digital';
const META_DESCRIPTION = 'A free Claude skill that strips the AI fingerprint out of ecommerce copy, emails, and blog posts. Download the rule set, no email gate.';
const CANONICAL = `https://www.atherstonedigital.com/blog/${SLUG}`;
const OG_IMAGE = 'https://www.atherstonedigital.com/og-ai-writing-tells.svg';
const PUBLISHED = '2026-05-12';
const DOWNLOAD_PATH = '/downloads/ai-writing-tells.skill';
const DOWNLOAD_SIZE = '12 KB';
const READING_TIME_MINUTES = 6;
const CONTACT_HREF = '/fractional-ecommerce-director';

export const metadata: Metadata = {
  title: META_TITLE,
  description: META_DESCRIPTION,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: META_TITLE,
    description: META_DESCRIPTION,
    url: CANONICAL,
    type: 'article',
    locale: 'en_GB',
    siteName: 'Atherstone Digital',
    publishedTime: PUBLISHED,
    modifiedTime: PUBLISHED,
    authors: ['Dan Le Gresley'],
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: TITLE }],
  },
  twitter: {
    card: 'summary_large_image',
    title: META_TITLE,
    description: META_DESCRIPTION,
    images: [OG_IMAGE],
  },
};

function H2({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-display text-3xl md:text-4xl font-bold text-white mt-20 mb-6 leading-tight tracking-tight">
      {children}
    </h2>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-brand-text/85 text-lg leading-[1.75] mb-6">
      {children}
    </p>
  );
}

function Tell({ name, children }: { name: string; children: React.ReactNode }) {
  return (
    <p className="text-brand-text/85 text-lg leading-[1.75] mb-6">
      <strong className="text-white font-semibold">{name}</strong> {children}
    </p>
  );
}

export default function AiWritingTellsPage() {
  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    description: META_DESCRIPTION,
    author: {
      '@type': 'Person',
      name: 'Dan Le Gresley',
      url: 'https://www.atherstonedigital.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Atherstone Digital',
      logo: {
        '@type': 'ImageObject',
        url: 'https://www.atherstonedigital.com/favicon-c-bef0ns.svg',
      },
    },
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    image: OG_IMAGE,
    mainEntityOfPage: CANONICAL,
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.atherstonedigital.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://www.atherstonedigital.com/blog' },
      { '@type': 'ListItem', position: 3, name: TITLE, item: CANONICAL },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <div className="pt-36 pb-24 bg-brand-dark min-h-screen">
        <div className="container mx-auto px-6 mb-10 max-w-3xl">
          <Link href="/blog" className="text-brand-muted hover:text-brand-primary transition-colors inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest">
            <ArrowLeft size={14} /> Back to all posts
          </Link>
        </div>

        <article className="container mx-auto px-6 max-w-3xl">
          <header className="mb-16">
            <div className="flex flex-wrap items-center gap-4 mb-8 font-mono text-xs uppercase tracking-widest text-brand-muted">
              <span className="px-3 py-1 border border-brand-primary/30 rounded-full bg-brand-primary/5 text-brand-primary">AI</span>
              <span>{new Date(PUBLISHED).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span>{READING_TIME_MINUTES} min read</span>
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white mb-8 leading-[1.05] tracking-tight">
              {TITLE}
            </h1>
            <p className="text-xl md:text-2xl text-brand-muted leading-relaxed">
              {DEK}
            </p>
          </header>

          <div className="text-brand-text/85">
            <P>
              You can usually tell. Even when you cannot articulate what gave it away, you can feel that a paragraph was written by ChatGPT. The cadence is off. The vocabulary is too polished. The structure is too tidy. Something in the back of your head flags it as machine before you have finished reading.
            </P>
            <P>This is becoming a commercial problem for ecommerce brands.</P>
            <P>
              Product pages, category descriptions, blog posts, welcome emails, abandoned cart sequences, paid social ads, founder LinkedIn posts. A growing share of all of it is now written by AI, and most of it carries the same fingerprint. Customers are getting better at spotting it. Google has been openly hostile to it since the helpful content update. And when your brand voice starts to read like everyone else&apos;s brand voice, you stop being a brand.
            </P>
            <P>
              I work with Shopify brands as a fractional ecommerce director, and over the last twelve months I have watched this problem creep into work that gets put in front of me. Copy that should sound like the founder ends up sounding like Claude. Customer service replies sound like ChatGPT. Even internal Slack messages drift toward the same flat, optimised, slightly hollow register.
            </P>
            <P>
              I use Claude heavily in my own work, so I had a direct stake in fixing this. The problem is that Claude, and every other large model, has been trained on so much corporate web prose that its defaults are corporate web prose. Even when you ask it to &quot;sound human&quot; or &quot;match my voice&quot;, it reverts to the same patterns within a paragraph or two.
            </P>
            <P>So I built a skill that forces it not to.</P>

            <H2>What the skill is</H2>
            <P>
              It is a Claude skill called <code className="font-mono text-brand-primary bg-brand-primary/10 px-1.5 py-0.5 rounded">ai-writing-tells</code>. A skill in this context is a markdown file Claude reads before doing certain kinds of work. This one defines the patterns that mark text as machine-generated and tells Claude to strip them out of any prose it produces before handing the output back.
            </P>
            <P>
              I built the rule set from Wikipedia&apos;s Signs of AI writing page, a field guide their cleanup team put together from thousands of real AI submissions. Then I added the tells most relevant to commercial work: emails, posts, proposals, product copy, briefs.
            </P>

            <H2>The tells the skill catches</H2>
            <P>
              These are the patterns I see most often in AI-written copy. The skill has more, but these are the heavy hitters.
            </P>

            <Tell name="Em dashes everywhere.">
              AI loves the em dash. It feels literary. In practice it is the single most reliable signal that a sentence came out of a language model. Commas, full stops, and rewrites cover almost every case where you would reach for one.
            </Tell>
            <Tell name="Negative parallelism.">
              &quot;It is not X, it is Y.&quot; &quot;Not just a tool, but a partner.&quot; &quot;This is not about price, it is about value.&quot; Once you start watching for it, you will see it in every AI-written paragraph. Cut it. State the positive directly.
            </Tell>
            <Tell name="Rule of three.">
              Three adjectives. Three benefits. Three transitions. AI reaches for triplets reflexively because it has been trained on web copy where they appear constantly. &quot;Fast, scalable, and reliable.&quot; &quot;Innovative, transformative, and groundbreaking.&quot; One adjective is usually enough.
            </Tell>
            <Tell name="Cursed vocabulary.">
              Delve. Tapestry. Landscape. Realm. Foster. Underscore. Pivotal. Robust. Seamless. Empower. Leverage. Enhance. Holistic. Comprehensive. Game-changer. In the ever-evolving landscape of. Each one is a flare. The skill swaps them for plain Anglo-Saxon alternatives.
            </Tell>
            <Tell name="Trailing puffery.">
              The participle phrase tacked on the end of a sentence to invent significance. &quot;...marking a pivotal moment in the industry.&quot; &quot;...further cementing his reputation as a leader.&quot; &quot;...emphasising the growing importance of.&quot; Delete the phrase. The sentence is always stronger without it.
            </Tell>
            <Tell name="Heritage tone.">
              When AI describes anything, a town, a brand, a product, a person, it lapses into tourist board language. &quot;Renowned for.&quot; &quot;Boasts.&quot; &quot;Rich heritage.&quot; &quot;Vibrant community.&quot; &quot;Iconic.&quot; &quot;World-class.&quot; Describe what the thing actually is and does. Specifics over adjectives.
            </Tell>
            <Tell name="Manufactured variation.">
              AI was trained on essays that taught it never to repeat a proper noun. So it calls the founder &quot;the entrepreneur&quot;, then &quot;the visionary&quot;, then &quot;the industry leader&quot;. A human would just say their name. Repeat the proper noun. It reads cleaner.
            </Tell>
            <Tell name="Bullet lists with bolded titles.">
              The pattern where every bullet starts with a bolded word followed by a colon and a sentence that just rewords the bolded word. &quot;Scalability: The system handles growth.&quot; Most lists of this shape work better as prose, or as plain bullets without the bold prefix.
            </Tell>

            <P>
              There is a longer catalogue in the skill itself, plus an appendix that breaks down the deeper structural and tonal tells.
            </P>

            <H2>Why this matters for ecommerce</H2>
            <P>A few reasons.</P>
            <P>
              First, customers can tell. The research is still early but the direction is clear: trust drops when buyers detect AI prose on a product page or a brand email. Even when they cannot name what is wrong, they bounce.
            </P>
            <P>
              Second, Google is actively trying to demote it. The helpful content system, the spam updates of the last two years, and the increasing weight on E-E-A-T are all aimed at the same problem: web text that reads optimised but says nothing real. If your collection pages and blog posts read like generic AI output, you are now competing on terms Google does not want you to win on.
            </P>
            <P>
              Third, your brand voice is the cheapest moat you have. When everyone in your category has access to the same model, the brands that win are the ones whose copy still sounds like a specific person with a specific point of view. AI can help you produce more, faster. But if the output reads the same as every other Shopify store&apos;s output, you have spent your most valuable asset on volume.
            </P>

            <H2>How to use it</H2>
            <P>
              Download the file below. It is a <code className="font-mono text-brand-primary bg-brand-primary/10 px-1.5 py-0.5 rounded">.skill</code> package, a zipped folder containing the rule set and the long-form catalogue.
            </P>
            <P>
              If you use Claude Code, drop the unzipped folder into your project&apos;s <code className="font-mono text-brand-primary bg-brand-primary/10 px-1.5 py-0.5 rounded">.claude/skills/</code> directory and Claude will read it automatically before any writing task.
            </P>
            <P>
              If you use Claude directly on the web or desktop app, you can either paste the contents of the <code className="font-mono text-brand-primary bg-brand-primary/10 px-1.5 py-0.5 rounded">SKILL.md</code> file into your system prompt, or upload the file and ask Claude to apply it when writing. The rules work the same way regardless of how you load them.
            </P>
            <P>
              It is free. No email gate. Take it, use it, fork it, change it. The point is to push back against AI slop, not to gatekeep the patch.
            </P>
          </div>
        </article>

        {/* Download block, visually distinct from prose */}
        <section className="container mx-auto px-6 max-w-4xl mt-16">
          <div className="bg-brand-surface border border-brand-primary/30 rounded-2xl p-8 md:p-10 shadow-[0_0_40px_rgba(74,222,128,0.06)]">
            <div className="flex items-center gap-2 mb-4 font-mono text-xs uppercase tracking-widest text-brand-primary">
              <FileText size={14} /> Free download
            </div>
            <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
              The ai-writing-tells skill
            </h3>
            <p className="text-brand-muted leading-relaxed mb-8 max-w-2xl">
              The full rule set Claude reads before writing. Drop it into your project, or paste it into a system prompt. No email gate.
            </p>
            <a
              href={DOWNLOAD_PATH}
              download
              className="inline-flex items-center gap-2 bg-brand-primary text-brand-dark font-bold px-6 py-3 rounded-lg hover:bg-brand-accent transition-colors focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 focus:ring-offset-brand-dark"
            >
              <Download size={18} /> Download the skill (.skill, {DOWNLOAD_SIZE})
            </a>
            <div className="mt-6 pt-6 border-t border-brand-border font-mono text-sm">
              <div className="text-brand-primary">ai-writing-tells.skill</div>
              <div className="text-brand-muted mt-1">
                A Claude skill that strips the AI fingerprint from any prose Claude writes.
              </div>
            </div>
          </div>
        </section>

        {/* Footer CTA, quieter than the download block */}
        <section className="container mx-auto px-6 max-w-3xl mt-16">
          <p className="text-brand-muted leading-relaxed">
            If you run a Shopify brand and want help making AI work for you without flattening your voice, that is what I do for a living. Fractional ecommerce direction for UK brands doing £500k to £5M.{' '}
            <Link href={CONTACT_HREF} className="text-brand-primary hover:text-brand-accent underline underline-offset-4 inline-flex items-center gap-1">
              Get in touch <ArrowUpRight size={14} />
            </Link>
          </p>
        </section>
      </div>
    </>
  );
}
