import { COMPANY_INFO } from './constants';

export const CATEGORY_IMAGES: Record<string, { url: string; alt: string }> = {
  'outbound': {
    url: 'https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg',
    alt: 'Kegiatan Outbound & Team Building'
  },
  'training': {
    url: 'https://nafta121.sirv.com/OUTBOUND/2022-12-08%2009-01-25.jpeg',
    alt: 'Indoor Training & Motivasi Karyawan'
  },
  'fun-games': {
    url: 'https://nafta121.sirv.com/OUTBOUND/2022-11-05%2006-52-48.jpeg',
    alt: 'Fun Games & Ice Breaking'
  },
  'ldk-osis': {
    url: 'https://nafta121.sirv.com/OUTBOUND/SMP%201%20GEGER%202026/20260623_144948.jpg',
    alt: 'LDK OSIS & Character Building Siswa'
  },
  'gathering': {
    url: 'https://nafta121.sirv.com/OUTBOUND/2023-01-07%2007-48-27.jpeg',
    alt: 'Corporate & Family Gathering'
  }
};

export function getCategoryOgImage(kategoriKey: string, kotaName?: string) {
  const normalizedKey = kategoriKey.toLowerCase();
  const categoryData = CATEGORY_IMAGES[normalizedKey] || {
    url: 'https://nafta121.sirv.com/Screenshot_20260430_171224_Chrome.jpg',
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
