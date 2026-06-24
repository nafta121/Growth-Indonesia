import { MetadataRoute } from 'next';
import { CITIES } from '@/lib/cities';
import { KATEGORI } from '@/lib/categories';
import { getArticleSlugs } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://growthindonesia.my.id';
  const fixedDate = new Date('2026-05-01');
  const allCities = Object.keys(CITIES);

  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: fixedDate,
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/layanan`,
      lastModified: fixedDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: fixedDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const cityHubPages: MetadataRoute.Sitemap = allCities.map((city) => ({
    url: `${baseUrl}/layanan/${city}`,
    lastModified: fixedDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const programmaticPages: MetadataRoute.Sitemap = allCities.flatMap((city) => 
    KATEGORI.map((kategori) => ({
      url: `${baseUrl}/layanan/${city}/${kategori}`,
      lastModified: fixedDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  );

  const articleSlugs = getArticleSlugs();
  const articlePages: MetadataRoute.Sitemap = articleSlugs.map((slug) => {
    const cleanSlug = slug.replace(/\.mdx$/, '');
    return {
      url: `${baseUrl}/artikel/${cleanSlug}`,
      lastModified: fixedDate,
      changeFrequency: 'weekly',
      priority: 0.7,
    };
  });

  return [...corePages, ...cityHubPages, ...programmaticPages, ...articlePages];
}