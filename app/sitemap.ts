import { MetadataRoute } from 'next';
import { CITIES } from '@/lib/cities';

const BASE_URL = 'https://growthindonesia.my.id';

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
  ];

  const dynamicRoutes: MetadataRoute.Sitemap = Object.keys(CITIES).map((city) => ({
    url: `${BASE_URL}/layanan/outbound-${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
