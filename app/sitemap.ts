import { MetadataRoute } from 'next';
import { CITIES } from '@/lib/cities';
import { PACKAGES } from '@/lib/packages';

export default function sitemap(): MetadataRoute.Sitemap {
  // Use the siteUrl, defaulting to the branded domain
  const baseUrl = 'https://growthindonesia.my.id';
  
  const cities = Object.keys(CITIES);
  
  // Dynamically generate URLs for the City Silo structure based on packages
  const siloUrls: MetadataRoute.Sitemap = cities.flatMap((city) => 
    PACKAGES.map((pkg) => ({
      url: `${baseUrl}/layanan/${city}/${pkg.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }))
  );

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...siloUrls,
  ];
}
