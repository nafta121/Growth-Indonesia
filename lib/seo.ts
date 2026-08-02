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
