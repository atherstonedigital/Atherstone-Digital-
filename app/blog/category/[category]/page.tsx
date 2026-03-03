import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { BLOG_POSTS } from '@/lib/data';
import { ArrowLeft, ArrowRight, Calendar, Clock } from 'lucide-react';

const CATEGORIES = Array.from(new Set(BLOG_POSTS.map((p) => p.category)));

function slugify(cat: string) {
  return cat.toLowerCase().replace(/\s+/g, '-');
}

export async function generateStaticParams() {
  return CATEGORIES.map((cat) => ({ category: slugify(cat) }));
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = CATEGORIES.find((c) => slugify(c) === params.category);
  if (!category) return {};
  return {
    title: `${category} Articles | Ecommerce Growth Blog`,
    description: `${category} insights and guides from Dan Le Gresley — Fractional Ecommerce Director. Practical ${category.toLowerCase()} content for Shopify brands.`,
    alternates: {
      canonical: `https://atherstonedigital.com/blog/category/${params.category}`,
    },
  };
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const category = CATEGORIES.find((c) => slugify(c) === params.category);
  if (!category) notFound();

  const posts = BLOG_POSTS.filter((p) => p.category === category);

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${category} Articles — Atherstone Digital Blog`,
    url: `https://atherstonedigital.com/blog/category/${params.category}`,
    description: `${category} insights and guides for Shopify brands.`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: posts.map((p, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        url: `https://atherstonedigital.com/blog/${p.slug}`,
        name: p.title,
      })),
    },
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://atherstonedigital.com' },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://atherstonedigital.com/blog' },
      { '@type': 'ListItem', position: 3, name: category, item: `https://atherstonedigital.com/blog/category/${params.category}` },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <div className="pt-36 pb-20 bg-brand-dark min-h-screen">
        <section className="container mx-auto px-6 mb-16">
          <Link href="/blog" className="text-brand-muted hover:text-brand-primary transition-colors inline-flex items-center gap-2 text-sm mb-8">
            <ArrowLeft size={16} /> All Articles
          </Link>
          <div className="max-w-3xl">
            <span className="inline-block px-3 py-1 mb-4 border border-brand-primary/30 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-mono uppercase tracking-widest">{category}</span>
            <h1 className="font-display text-5xl font-bold text-white mb-4 tracking-tight">{category} Articles.</h1>
            <p className="text-xl text-brand-muted leading-relaxed">
              All {category.toLowerCase()} guides and insights from the Atherstone Digital blog.
            </p>
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
