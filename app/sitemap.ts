import { MetadataRoute } from 'next';
import { CITIES } from '@/lib/cities';
import { KATEGORI } from '@/lib/categories';
import { getArticleSlugs } from '@/lib/mdx';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://growthindonesia.my.id';
  const currentDate = new Date();
  const allCities = Object.keys(CITIES);

  const corePages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/layanan`,
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

  const cityHubPages: MetadataRoute.Sitemap = allCities.map((city) => ({
    url: `${baseUrl}/layanan/${city}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const programmaticPages: MetadataRoute.Sitemap = allCities.flatMap((city) => 
    KATEGORI.map((kategori) => ({
      url: `${baseUrl}/layanan/${city}/${kategori}`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    }))
  );

  const articleSlugs = getArticleSlugs();
  const articlePages: MetadataRoute.Sitemap = articleSlugs.map((slug) => {
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