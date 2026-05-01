import React from 'react';

interface BreadcrumbSchemaProps {
  cityName: string;
  cityKey: string;
}

export function BreadcrumbSchema({ cityName, cityKey }: BreadcrumbSchemaProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://growthindonesia.my.id"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Layanan",
        "item": "https://growthindonesia.my.id/layanan"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": `Outbound ${cityName}`,
        "item": `https://growthindonesia.my.id/layanan/outbound-${cityKey}`
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
