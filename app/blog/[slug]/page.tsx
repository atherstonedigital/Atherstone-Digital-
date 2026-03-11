import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/data';
import { ArrowLeft, Calendar, Clock, User, Share2, Linkedin, Twitter } from 'lucide-react';
import { Contact } from '@/components/Contact';

export async function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { title: post.title, description: post.excerpt, type: 'article', publishedTime: post.date, url: `https://atherstonedigital.com/blog/${post.slug}/` },
    alternates: {
      canonical: `https://atherstonedigital.com/blog/${post.slug}/`,
    },
  };
}

// Simple markdown-to-html converter (no external deps)
function renderMarkdown(content: string): string {
  return content
    .replace(/^## (.+)$/gm, '<h2 class="font-display text-2xl font-bold text-white mt-10 mb-4">$1</h2>')
    .replace(/^### (.+)$/gm, '<h3 class="font-display text-xl font-bold text-white mt-8 mb-3">$1</h3>')
    .replace(/\*\*(.+?)\*\*/g, '<strong class="text-white">$1</strong>')
    .replace(/^\- (.+)$/gm, '<li class="flex items-start gap-2 text-brand-muted mb-2"><span class="text-brand-primary mt-1.5 shrink-0">▸</span><span>$1</span></li>')
    .replace(/(<li[\s\S]+?<\/li>\n?)+/g, '<ul class="my-4 space-y-1">$&</ul>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-brand-primary hover:text-brand-accent underline underline-offset-2">$1</a>')
    .replace(/^(?!<[h|u|l])(.*\S.*)$/gm, '<p class="text-brand-muted leading-relaxed mb-4">$1</p>')
    .replace(/<p[^>]*><\/p>/g, '');
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = BLOG_POSTS.find((p) => p.slug === params.slug);
  if (!post) notFound();

  const related = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 2);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { '@type': 'Person', name: 'Dan Le Gresley', url: 'https://atherstonedigital.com/about/' },
    publisher: { '@type': 'Organization', name: 'Atherstone Digital', url: 'https://atherstonedigital.com' },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `https://atherstonedigital.com/blog/${post.slug}/` },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://atherstonedigital.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://atherstonedigital.com/blog/' },
      { '@type': 'ListItem', position: 3, name: post.title, item: `https://atherstonedigital.com/blog/${post.slug}/` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="pt-36 pb-20 bg-brand-dark min-h-screen">
        <div className="container mx-auto px-6 mb-8 max-w-3xl">
          <Link href="/blog" className="text-brand-muted hover:text-brand-primary transition-colors inline-flex items-center gap-2 text-sm">
            <ArrowLeft size={16} /> All Articles
          </Link>
        </div>

        <article className="container mx-auto px-6 max-w-3xl mb-20">
          <header className="mb-12">
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full">{post.category}</span>
              <span className="flex items-center gap-1 text-xs text-brand-muted"><Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              <span className="flex items-center gap-1 text-xs text-brand-muted"><Clock size={12} /> {post.readTime}</span>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">{post.title}</h1>
            <p className="text-xl text-brand-muted leading-relaxed">{post.excerpt}</p>
            <div className="mt-8 pt-8 border-t border-brand-border flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-brand-primary/20 flex items-center justify-center">
                <User size={18} className="text-brand-primary" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Dan Le Gresley</div>
                <div className="text-brand-muted text-xs">Fractional Ecommerce Director, Atherstone Digital</div>
              </div>
            </div>
          </header>

          <div
            className="prose-custom"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
          />

          {/* Share buttons */}
          <div className="mt-12 pt-8 border-t border-brand-border">
            <div className="flex items-center gap-4">
              <span className="text-brand-muted text-sm flex items-center gap-2"><Share2 size={14} /> Share this article</span>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://atherstonedigital.com/blog/${post.slug}/`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-primary/30 hover:bg-brand-primary/10 transition-all text-brand-muted hover:text-brand-primary"
                aria-label="Share on LinkedIn"
              >
                <Linkedin size={16} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(`https://atherstonedigital.com/blog/${post.slug}/`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:border-brand-primary/30 hover:bg-brand-primary/10 transition-all text-brand-muted hover:text-brand-primary"
                aria-label="Share on X (Twitter)"
              >
                <Twitter size={16} />
              </a>
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <section className="container mx-auto px-6 max-w-3xl mb-16">
            <h2 className="font-display text-2xl font-bold text-white mb-6">Related Articles</h2>
            <div className="grid sm:grid-cols-2 gap-6">
              {related.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}`}
                  className="group p-6 bg-brand-surface rounded-xl border border-brand-border hover:border-brand-primary/30 transition-all">
                  <span className="text-xs text-brand-primary font-bold">{p.category}</span>
                  <h3 className="font-display font-bold text-white mt-2 mb-2 group-hover:text-brand-primary transition-colors leading-snug">{p.title}</h3>
                  <p className="text-sm text-brand-muted line-clamp-2">{p.excerpt}</p>
                </Link>
              ))}
            </div>
          </section>
        )}

        <Contact />
      </div>
    </>
  );
}
