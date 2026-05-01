import React from 'react';

const CITY_GEO_DATA: Record<string, { lat: number; long: number }> = {
  madiun: { lat: -7.6298, long: 111.5239 },
  ponorogo: { lat: -7.8671, long: 111.4666 },
  magetan: { lat: -7.6543, long: 111.3282 },
  ngawi: { lat: -7.4026, long: 111.4449 },
  nganjuk: { lat: -7.6044, long: 111.9044 },
  pacitan: { lat: -8.1997, long: 111.0990 },
  kediri: { lat: -7.8480, long: 112.0178 },
};

export function CitySchema({ cityName, slug }: { cityName: string; slug: string }) {
  const cityKey = cityName.toLowerCase();
  const geo = CITY_GEO_DATA[cityKey];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `https://growthindonesia.my.id/layanan/${slug}#localbusiness`,
        name: `Growth Indonesia - Provider Outbound, Training dan Pengembangan SDM ${cityName}`,
        telephone: '+6285704748186',
        priceRange: 'Rp (Rupiah)',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Jl. Mujair No.3',
          addressLocality: 'Madiun',
          addressRegion: 'East Java',
          addressCountry: 'ID'
        },
        ...(geo ? {
          geo: {
            '@type': 'GeoCoordinates',
            latitude: geo.lat,
            longitude: geo.long
          }
        } : {}),
        areaServed: {
          '@type': 'AdministrativeArea',
          name: `${cityName}, East Java, Indonesia`
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: 5,
          reviewCount: 100
        }
      },
      {
        '@type': 'Service',
        '@id': `https://growthindonesia.my.id/layanan/${slug}#service`,
        serviceType: 'Outbound, Training, Fun Games, Gathering, LDK OSIS & Team Building',
        description: `Layanan pengembangan SDM dan outbound profesional untuk perusahaan, instansi dan sekolah di ${cityName}.`,
        provider: {
          '@id': `https://growthindonesia.my.id/layanan/${slug}#localbusiness`
        }
      },
      {
        '@type': 'Service',
        '@id': `https://growthindonesia.my.id/layanan/${slug}#ldk-osis`,
        name: `Program LDK OSIS & LDKS ${cityName}`,
        serviceType: 'Latihan Dasar Kepemimpinan Siswa (LDKS) & LDK OSIS',
        description: `Layanan edukatif Latihan Dasar Kepemimpinan (LDK) OSIS untuk membentuk karakter, kedisiplinan, dan jiwa kepemimpinan pelajar di ${cityName}.`,
        provider: {
          '@id': `https://growthindonesia.my.id/layanan/${slug}#localbusiness`
        }
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
