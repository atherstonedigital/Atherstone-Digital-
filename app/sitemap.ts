import { MetadataRoute } from 'next';
import { SERVICES_DATA, LOCATIONS_DATA, BLOG_POSTS } from '@/lib/data';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://atherstonedigital.com';
  const now = new Date().toISOString();

  const staticPages = [
    { url: base, lastModified: now, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${base}/fractional-ecommerce-director`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.95 },
    { url: `${base}/services`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${base}/why-fractional`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/the-model`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${base}/results`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${base}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  const servicePages = SERVICES_DATA.map((s) => ({
    url: `${base}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const locationPages = LOCATIONS_DATA.map((l) => ({
    url: `${base}/${l.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const blogPages = BLOG_POSTS.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  const categories = Array.from(new Set(BLOG_POSTS.map((p) => p.category)));
  const categoryPages = categories.map((cat) => ({
    url: `${base}/blog/category/${cat.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...locationPages, ...blogPages, ...categoryPages];
}
