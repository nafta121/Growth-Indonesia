import { COMPANY_INFO } from './constants';
import { getLocalBusinessSchema, getFaqSchema } from './schema';

export interface BreadcrumbItemSchema {
  name: string;
  item: string;
}

export function getBreadcrumbListSchema(items: BreadcrumbItemSchema[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": "https://growthindonesia.my.id/#breadcrumb",
    "name": "Navigasi Layanan Growth Indonesia",
    "itemListElement": items.map((crumb, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": crumb.name,
      "item": crumb.item.startsWith('http')
        ? crumb.item
        : `https://growthindonesia.my.id${crumb.item.startsWith('/') ? '' : '/'}${crumb.item}`,
    })),
  };
}

export function getServiceSchema(
  kategoriName: string,
  kotaName: string,
  description: string,
  serviceUrl?: string
) {
  return {
    "@type": "Service",
    "@id": serviceUrl ? `${serviceUrl}#service` : undefined,
    "name": `${kategoriName} di ${kotaName}`,
    "serviceType": kategoriName,
    "description": description,
    "provider": {
      "@type": "LocalBusiness",
      "@id": "https://growthindonesia.my.id/#organization",
      "name": COMPANY_INFO.brand_name,
      "telephone": `+${COMPANY_INFO.whatsapp_number}`,
      "url": "https://growthindonesia.my.id/"
    },
    "areaServed": {
      "@type": "City",
      "name": kotaName
    },
    "url": serviceUrl
  };
}

export interface ServicePageSchemaParams {
  kotaName: string;
  cityKey: string;
  kategoriName: string;
  kategoriKey: string;
  cityDescription: string;
}

export function getServicePageSchema({
  kotaName,
  cityKey,
  kategoriName,
  kategoriKey,
  cityDescription,
}: ServicePageSchemaParams) {
  const serviceUrl = `https://growthindonesia.my.id/layanan/${cityKey}/${kategoriKey}`;
  const cityUrl = `https://growthindonesia.my.id/layanan/${cityKey}`;
  const description = `Layanan profesional provider ${kategoriName.toLowerCase()} dan EO terbaik di ${kotaName} bersama ${COMPANY_INFO.brand_name}. ${cityDescription}`;

  const breadcrumb = getBreadcrumbListSchema([
    { name: "Home", item: "https://growthindonesia.my.id/" },
    { name: `Layanan ${kotaName}`, item: cityUrl },
    { name: `${kategoriName} ${kotaName}`, item: serviceUrl },
  ]);

  const service = getServiceSchema(kategoriName, kotaName, description, serviceUrl);
  const localBusiness = getLocalBusinessSchema(kotaName);
  const rawFaq = getFaqSchema(kategoriName, kotaName);

  return {
    "@context": "https://schema.org",
    "@graph": [
      breadcrumb,
      service,
      localBusiness,
      {
        ...rawFaq,
        "@id": "https://growthindonesia.my.id/#faq",
        "name": "FAQ Seputar Layanan Growth Indonesia",
      },
    ],
  };
}

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

