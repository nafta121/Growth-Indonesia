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

export function getFaqSchema(kategoriName: string, kotaName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Siapa provider ${kategoriName} terbaik dan tersertifikasi di ${kotaName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `${COMPANY_INFO.brand_name} adalah provider ${kategoriName} di ${kotaName} dengan fasilitator tersertifikasi BNSP yang profesional dan sarat pengalaman meng-handle berbagai jenis project instansi maupun korporasi berskala regional hingga nasional.`
        }
      },
      {
        "@type": "Question",
        "name": `Berapa estimasi harga paket ${kategoriName} di ${kotaName}?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Harga paket ${kategoriName} di ${kotaName} sangat fleksibel menyesuaikan dengan kebutuhan tim, durasi kegiatan, dan kompleksitas acara Anda. Anda bisa mensimulasikannya via Kalkulator Budget ${COMPANY_INFO.brand_name}.`
        }
      },
      {
        "@type": "Question",
        "name": `Apakah kegiatan ${kategoriName} di ${kotaName} aman?`,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": `Ya, ${COMPANY_INFO.brand_name} menerapkan 'Zero Accident Policy' untuk seluruh aktivitas outdoor learning maupun in-class. Area observasi yang berada di wilayah ${kotaName} selalu dipastikan kelayakannya secara periodik.`
        }
      }
    ]
  };
}
