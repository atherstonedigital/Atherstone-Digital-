import { Metadata } from 'next';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/data';
import { ArrowRight, Calendar, Clock } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Ecommerce Growth Blog | Shopify Strategy, CRO & Automation',
  description: 'Practical ecommerce growth content from Dan Le Gresley — Fractional Ecommerce Director. Shopify strategy, CRO, n8n automation, and paid media insights.',
};

export default function BlogPage() {
  const posts = BLOG_POSTS;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Atherstone Digital Blog',
    url: 'https://atherstonedigital.com/blog',
    description: 'Ecommerce growth insights from a Fractional Ecommerce Director',
    author: { '@type': 'Person', name: 'Dan Le Gresley' },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="pt-36 pb-20 bg-brand-dark min-h-screen">
        <section className="container mx-auto px-6 mb-16">
          <div className="max-w-3xl">
            <div className="inline-block px-3 py-1 mb-4 border border-brand-primary/30 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-mono uppercase tracking-widest">Insights</div>
            <h1 className="font-display text-5xl font-bold text-white mb-4 tracking-tight">Ecommerce Growth Blog.</h1>
            <p className="text-xl text-brand-muted leading-relaxed mb-6">
              Practical guides, case studies, and frameworks from the frontline of Shopify growth. No fluff — just what actually works.
            </p>
            <div className="flex flex-wrap gap-2">
              {Array.from(new Set(posts.map((p) => p.category))).map((cat) => (
                <Link key={cat} href={`/blog/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm text-brand-muted hover:text-brand-primary hover:border-brand-primary/30 transition-all">
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}
                className="group block bg-brand-surface rounded-2xl p-8 border border-brand-border hover:border-brand-primary/30 hover:shadow-[0_0_20px_rgba(0,220,130,0.05)] transition-all duration-300">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-brand-primary/10 text-brand-primary text-xs font-bold rounded-full">{post.category}</span>
                  <span className="flex items-center gap-1 text-xs text-brand-muted"><Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                  <span className="flex items-center gap-1 text-xs text-brand-muted"><Clock size={12} /> {post.readTime}</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-white mb-3 group-hover:text-brand-primary transition-colors leading-snug">{post.title}</h2>
                <p className="text-brand-muted leading-relaxed mb-4">{post.excerpt}</p>
                <div className="flex items-center gap-1 text-brand-primary text-sm font-medium">
                  Read article <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
