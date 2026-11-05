import { COMPANY_INFO } from './constants';

export const CATEGORY_IMAGES: Record<string, { url: string; alt: string }> = {
  'outbound': {
    url: 'https://growthindonesia.my.id/cdn/outbound/2022-10-22-09-00-09.webp',
    alt: 'Kegiatan Outbound & Team Building'
  },
  'training': {
    url: 'https://growthindonesia.my.id/cdn/outbound/2022-12-08-09-01-25.webp',
    alt: 'Indoor Training & Motivasi Karyawan'
  },
  'fun-games': {
    url: 'https://growthindonesia.my.id/cdn/outbound/2022-11-05-06-52-48.webp',
    alt: 'Fun Games & Ice Breaking'
  },
  'ldk-osis': {
    url: 'https://growthindonesia.my.id/cdn/smp-1-geger-2026/20260623-144948.webp',
    alt: 'LDK OSIS & Character Building Siswa'
  },
  'gathering': {
    url: 'https://growthindonesia.my.id/cdn/outbound/2023-01-07-07-48-27.webp',
    alt: 'Corporate & Family Gathering'
  }
};

export function getCategoryOgImage(kategoriKey: string, kotaName?: string) {
  const normalizedKey = kategoriKey.toLowerCase();
  const categoryData = CATEGORY_IMAGES[normalizedKey] || {
    url: 'https://growthindonesia.my.id/cdn/outbound/screenshot-20260430-171224.webp',
    alt: 'Layanan Growth Indonesia'
  };

  const altText = kotaName 
    ? `${categoryData.alt} di ${kotaName} - ${COMPANY_INFO.brand_name}`
    : `${categoryData.alt} - ${COMPANY_INFO.brand_name}`;

  return [
    {
      url: categoryData.url,
      width: 1200,
      height: 630,
      alt: altText,
    }
  ];
}
