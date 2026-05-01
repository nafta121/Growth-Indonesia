import { MetadataRoute } from 'next';

const CITIES = ['madiun', 'ponorogo', 'magetan', 'ngawi', 'nganjuk', 'pacitan', 'kediri'];
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

  const dynamicRoutes: MetadataRoute.Sitemap = CITIES.map((city) => ({
    url: `${BASE_URL}/layanan/outbound-${city}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
