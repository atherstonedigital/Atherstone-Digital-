import { MetadataRoute } from 'next';
import { SERVICES_DATA, BLOG_POSTS, LOCATIONS_DATA } from '@/lib/data';

const BASE_URL = 'https://www.atherstonedigital.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'daily' as const, priority: 1.0 },
    { url: `${BASE_URL}/fractional-ecommerce-director`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.95 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.9 },
    { url: `${BASE_URL}/why-fractional`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.8 },
    { url: `${BASE_URL}/results`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.85 },
    { url: `${BASE_URL}/the-model`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.7 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.75 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
  ];

  const servicePages = SERVICES_DATA.map((s) => ({
    url: `${BASE_URL}/services/${s.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const blogPages = BLOG_POSTS.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: new Date(p.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }));

  const categories = Array.from(new Set(BLOG_POSTS.map((p) => p.category)));
  const categoryPages = categories.map((cat) => ({
    url: `${BASE_URL}/blog/category/${cat.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  const locationPages = LOCATIONS_DATA.map((loc) => ({
    url: `${BASE_URL}/${loc.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...locationPages, ...servicePages, ...blogPages, ...categoryPages];
}
