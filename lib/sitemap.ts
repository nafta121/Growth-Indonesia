import { CITIES } from '@/lib/cities';
import { KATEGORI } from '@/lib/categories';
import { getArticleSlugs } from '@/lib/mdx';

export interface SitemapEntry {
  url: string;
  lastModified?: Date;
  changeFrequency?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

export default async function sitemap(): Promise<SitemapEntry[]> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://growthindonesia.my.id';
  const currentDate = new Date();
  const allCities = Object.keys(CITIES);

  const corePages: SitemapEntry[] = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/llms.txt`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/pricing.md`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/layanan`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/portofolio-dan-sertifikasi`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/docs/api`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
  ];

  const cityHubPages: SitemapEntry[] = allCities.map((city) => ({
    url: `${baseUrl}/layanan/${city}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const programmaticPages: SitemapEntry[] = new Array(allCities.length * KATEGORI.length);
  let pageIndex = 0;
  for (const city of allCities) {
    for (const kategori of KATEGORI) {
      programmaticPages[pageIndex++] = {
        url: `${baseUrl}/layanan/${city}/${kategori}`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      };
    }
  }

  const articleSlugs = await getArticleSlugs();
  const articlePages: SitemapEntry[] = articleSlugs.map((slug) => {
    const cleanSlug = slug.replace(/\.(mdx|md)$/, '');
    return {
      url: `${baseUrl}/artikel/${cleanSlug}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    };
  });

  return [...corePages, ...cityHubPages, ...programmaticPages, ...articlePages];
}
