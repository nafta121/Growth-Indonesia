export const KATEGORI = ['outbound', 'training', 'fun-games', 'ldk-osis', 'gathering'] as const;

export type KategoriSlug = typeof KATEGORI[number];
