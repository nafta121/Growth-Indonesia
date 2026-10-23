export const KATEGORI = ['outbound', 'training', 'fun-games', 'ldk-osis', 'gathering'] as const;

export type KategoriSlug = typeof KATEGORI[number];

export const CATEGORIES_SET: Set<string> = new Set<string>(KATEGORI);

export function getLegacyServiceRedirect(slug: string): string | null {
  if (CATEGORIES_SET.has(slug)) {
    return `/layanan/madiun/${slug}`;
  }
  const parts = slug.split('-');
  if (parts.length >= 3) {
    const cat2 = `${parts[0]}-${parts[1]}`;
    if (CATEGORIES_SET.has(cat2)) {
      const city = parts.slice(2).join('-');
      if (city) return `/layanan/${city}/${cat2}`;
    }
  }
  if (parts.length >= 2 && CATEGORIES_SET.has(parts[0])) {
    const city = parts.slice(1).join('-');
    if (city) return `/layanan/${city}/${parts[0]}`;
  }
  return null;
}
