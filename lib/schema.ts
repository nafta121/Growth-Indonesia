import { COMPANY_INFO } from './constants';

export function getLocalBusinessSchema(additionalArea?: string) {
  const baseAreas = [
    { "@type": "City", "name": "Madiun" },
    { "@type": "City", "name": "Magetan" },
    { "@type": "City", "name": "Ponorogo" },
    { "@type": "City", "name": "Ngawi" },
    { "@type": "City", "name": "Pacitan" },
    { "@type": "City", "name": "Kediri" },
    { "@type": "City", "name": "Surabaya" }
  ];

  const areaServed = additionalArea 
    ? [...baseAreas, { "@type": "City", "name": additionalArea }]
    : baseAreas;

  return {
    "@type": "LocalBusiness",
    "@id": "https://growthindonesia.my.id/#organization",
    "name": COMPANY_INFO.brand_name,
    "image": COMPANY_INFO.logo_url,
    "telephone": `+${COMPANY_INFO.whatsapp_number}`,
    "priceRange": "Rp 150.000 - Rp 4.500.000",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Jl. Mujair No.3",
      "addressLocality": "Madiun",
      "addressRegion": "Jawa Timur",
      "postalCode": "63128",
      "addressCountry": "ID"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -7.6298,
      "longitude": 111.5239
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "17:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "15:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "250"
    },
    "areaServed": areaServed,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Layanan ${COMPANY_INFO.brand_name}`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Outbound"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Training"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Gathering"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "LDK"
          }
        }
      ]
    },
    "sameAs": [
      "https://www.instagram.com/growthindonesia/",
      "https://www.facebook.com/growthindonesia/"
    ]
  };
}

export interface FaqQuestionItem {
  question: string;
  answer: string;
}

export function generateFaqSchema(faqs: FaqQuestionItem[], id?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    ...(id ? { "@id": id } : {}),
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer,
      },
    })),
  };
}

export const HOMEPAGE_FAQS: FaqQuestionItem[] = [
  {
    question: "Mengapa memilih Growth Indonesia sebagai provider outbound & event organizer di Madiun?",
    answer: "Growth Indonesia adalah provider outbound & event organizer Madiun terpercaya dengan fasilitator bersertifikat BNSP, transparan dalam penganggaran, mengusung Zero Accident Policy, dan telah dipercaya oleh lebih dari 100+ perusahaan, BUMN, instansi pemerintah, serta sekolah.",
  },
  {
    question: "Layanan apa saja yang disediakan oleh Growth Indonesia?",
    answer: "Kami menyediakan layanan Outbound Training & Team Building Corporate, Event Organizer (EO) Corporate & Employee Gathering, Family Gathering, LDK OSIS & Kemah Besar, Capacity Building, serta Fun Adventure & Outing.",
  },
  {
    question: "Berapa estimasi biaya paket outbound dan event organizer di Madiun?",
    answer: "Biaya paket sangat fleksibel mulai dari paket hemat hingga custom premium, disesuaikan dengan jumlah peserta, lokasi, dan kebutuhan fasilitas acara Anda. Anda juga dapat mensimulasikan anggaran dengan Kalkulator Budget di website kami.",
  },
  {
    question: "Di wilayah mana saja Growth Indonesia melayani kegiatan outbound & event organizer?",
    answer: "Growth Indonesia berbasis di Madiun dan melayani seluruh wilayah Jawa Timur, termasuk Magetan (Sarangan), Ponorogo, Ngawi, Pacitan, Kediri, Madiun, Surabaya, Malang, dan sekitarnya.",
  },
  {
    question: "Apakah kegiatan outbound dari Growth Indonesia aman?",
    answer: "Ya, kami berkomitmen pada Zero Accident Policy dengan standar keselamatan ketat, peralatan teruji, instruktur/fasilitator bersertifikat BNSP, serta tim medis siaga di setiap lokasi acara.",
  },
];

export function getHomepageFaqSchema() {
  return generateFaqSchema(HOMEPAGE_FAQS, "https://growthindonesia.my.id/#faq");
}

export function getFaqSchema(kategoriName: string, kotaName: string) {
  return generateFaqSchema([
    {
      question: `Siapa provider ${kategoriName} terbaik dan tersertifikasi di ${kotaName}?`,
      answer: `${COMPANY_INFO.brand_name} adalah provider ${kategoriName} di ${kotaName} dengan fasilitator tersertifikasi BNSP yang profesional dan sarat pengalaman meng-handle berbagai jenis project instansi maupun korporasi berskala regional hingga nasional.`,
    },
    {
      question: `Berapa estimasi harga paket ${kategoriName} di ${kotaName}?`,
      answer: `Harga paket ${kategoriName} di ${kotaName} sangat fleksibel menyesuaikan dengan kebutuhan tim, durasi kegiatan, dan kompleksitas acara Anda. Anda bisa mensimulasikannya via Kalkulator Budget ${COMPANY_INFO.brand_name}.`,
    },
    {
      question: `Apakah kegiatan ${kategoriName} di ${kotaName} aman?`,
      answer: `Ya, ${COMPANY_INFO.brand_name} menerapkan 'Zero Accident Policy' untuk seluruh aktivitas outdoor learning maupun in-class. Area observasi yang berada di wilayah ${kotaName} selalu dipastikan kelayakannya secara periodik.`,
    },
  ]);
}

export interface BreadcrumbItemSchema {
  name: string;
  item: string;
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://growthindonesia.my.id/#breadcrumb",
    "name": "Navigasi Layanan Growth Indonesia",
    "itemListElement": items.map((crumb, idx) => ({
      "@type": "ListItem",
      "position": idx + 1,
      "name": crumb.name,
      "item": crumb.url.startsWith('http')
        ? crumb.url
        : `https://growthindonesia.my.id${crumb.url.startsWith('/') ? '' : '/'}${crumb.url}`,
    })),
  };
}

export function getBreadcrumbListSchema(items: BreadcrumbItemSchema[]) {
  return generateBreadcrumbSchema(
    items.map((crumb) => ({ name: crumb.name, url: crumb.item }))
  );
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

export function getServicePageSchema({
  kotaName,
  cityKey,
  kategoriName,
  kategoriKey,
  cityDescription,
}: {
  kotaName: string;
  cityKey: string;
  kategoriName: string;
  kategoriKey: string;
  cityDescription: string;
}) {
  const serviceUrl = `https://growthindonesia.my.id/layanan/${cityKey}/${kategoriKey}`;
  const cityUrl = `https://growthindonesia.my.id/layanan/${cityKey}`;
  const description = `Layanan profesional provider ${kategoriName.toLowerCase()} dan EO terbaik di ${kotaName} bersama ${COMPANY_INFO.brand_name}. ${cityDescription}`;

  const breadcrumb = getBreadcrumbListSchema([
    { name: "Home", item: "https://growthindonesia.my.id/" },
    { name: "Layanan", item: "https://growthindonesia.my.id/layanan" },
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

