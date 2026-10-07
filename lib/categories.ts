export const KATEGORI = ['outbound', 'training', 'fun-games', 'ldk-osis', 'gathering'] as const;

export type KategoriSlug = typeof KATEGORI[number];

export const CATEGORIES_SET: Set<string> = new Set<string>(KATEGORI);
