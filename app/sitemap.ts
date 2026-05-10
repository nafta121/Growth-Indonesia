import { MetadataRoute } from 'next';
import { CITIES } from '@/lib/cities';
import { KATEGORI } from '@/lib/categories';

const PRIORITY_CITIES = ['madiun', 'surabaya', 'kediri', 'malang', 'magetan', 'ponorogo'];

export function generateSitemaps() {
  return [{ id: 'priority' }, { id: 'secondary' }];
}

export default function sitemap({ id }: { id: string }): MetadataRoute.Sitemap {
  const baseUrl = 'https://growthindonesia.my.id';
  
  const allCities = Object.keys(CITIES);
  
  let targetCities: string[] = [];
  
  if (id === 'priority') {
    targetCities = allCities.filter(city => PRIORITY_CITIES.includes(city));
  } else if (id === 'secondary') {
    targetCities = allCities.filter(city => !PRIORITY_CITIES.includes(city));
  } else {
    // Fallback if accessed without specific ID matching our generated ones
    targetCities = allCities;
  }

  const fixedDate = new Date('2026-05-01');

  const siloUrls: MetadataRoute.Sitemap = targetCities.flatMap((city) => 
    KATEGORI.map((kategori) => ({
      url: `${baseUrl}/layanan/${city}/${kategori}`,
      lastModified: fixedDate,
      changeFrequency: 'monthly',
      priority: id === 'priority' ? 0.9 : 0.8,
    }))
  );

  // Add the base url only on the priority index
  if (id === 'priority') {
    return [
      {
        url: baseUrl,
        lastModified: fixedDate,
        changeFrequency: 'weekly',
        priority: 1,
      },
      ...siloUrls,
    ];
  }

  return siloUrls;
}
