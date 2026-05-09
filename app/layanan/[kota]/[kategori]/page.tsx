import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { CITIES } from '@/lib/cities';
import { COMPANY_INFO } from '@/lib/constants';
import { getLocalBusinessSchema, getFaqSchema } from '@/lib/schema';
import { formatSlug } from '@/lib/format';
import { getContentVariations } from '@/lib/content-variations';
import { BreadcrumbSchema } from '@/components/breadcrumb-schema';
import { NearbyCities } from '@/components/nearby-cities';
import KalkulatorBudget from '@/components/kalkulator-budget';
import { AiOverviewSection } from '@/components/ai-overview';
import TrustSection from '@/components/trust-section';
import CityHero from '@/components/city-hero';
import CityContent from '@/components/city-content';
import CityCta from '@/components/city-cta';

type Props = {
  params: Promise<{ kota: string; kategori: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kota, kategori } = await params;
  const decodedKota = decodeURIComponent(kota).toLowerCase();
  const decodedKategori = decodeURIComponent(kategori).toLowerCase();
  
  const cityData = CITIES[decodedKota];
  
  if (!cityData) {
    notFound();
  }

  const kotaName = formatSlug(decodedKota);
  const kategoriName = formatSlug(decodedKategori);
  const content = getContentVariations(decodedKategori, kotaName);

  const title = content.title;
  const description = `${COMPANY_INFO.brand_name} adalah provider ${kategoriName.toLowerCase()} dan penyedia jasa EO profesional di ${kotaName}. ${cityData.description} Hubungi kami untuk penawaran terbaik.`;

  return {
    title,
    description,
    keywords: [
      kategoriName,
      `${kategoriName} ${kotaName}`,
      `Provider ${kategoriName} ${kotaName}`,
      `Jasa ${kategoriName} ${kotaName}`,
      `Event Organizer ${kategoriName} ${kotaName}`,
      `EO ${kategoriName} ${kotaName}`,
      `Paket ${kategoriName} ${kotaName}`,
      `Harga ${kategoriName} ${kotaName}`
    ],
    openGraph: {
      title,
      description,
      url: `https://growthindonesia.my.id/layanan/${decodedKota}/${decodedKategori}`,
      siteName: 'Growth Indonesia',
      locale: 'id_ID',
      type: 'website',
      images: [
        {
          url: 'https://nafta121.sirv.com/Screenshot_20260430_171224_Chrome.jpg',
          width: 1200,
          height: 630,
          alt: `Provider ${kategoriName} di ${kotaName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['https://nafta121.sirv.com/Screenshot_20260430_171224_Chrome.jpg'],
    },
  };
}

export async function generateStaticParams() {
  const KATEGORI = ['outbound', 'training', 'fun-games', 'ldk-osis', 'gathering'];
  return Object.keys(CITIES).flatMap((kota) => 
    KATEGORI.map((kategori) => ({ kota, kategori }))
  );
}

export const revalidate = 3600;

export default async function ProgrammaticSiloPage({ params }: Props) {
  const { kota, kategori } = await params;
  const decodedKota = decodeURIComponent(kota).toLowerCase();
  const decodedKategori = decodeURIComponent(kategori).toLowerCase();

  const cityData = CITIES[decodedKota];

  if (!cityData) {
    notFound();
  }

  const kotaName = formatSlug(decodedKota);
  const kategoriName = formatSlug(decodedKategori);

  const schemaLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "itemListElement": [
          {
            "@type": "ListItem",
            "position": 1,
            "name": "Home",
            "item": "https://growthindonesia.my.id/"
          },
          {
            "@type": "ListItem",
            "position": 2,
            "name": `Layanan ${kotaName}`,
            "item": `https://growthindonesia.my.id/layanan/${decodedKota}`
          },
          {
            "@type": "ListItem",
            "position": 3,
            "name": `${kategoriName} ${kotaName}`,
            "item": `https://growthindonesia.my.id/layanan/${decodedKota}/${decodedKategori}`
          }
        ]
      },
      {
        "@type": "Service",
        "name": `${kategoriName} di ${kotaName}`,
        "description": `Layanan profesional provider ${kategoriName.toLowerCase()} dan EO terbaik di ${kotaName} bersama ${COMPANY_INFO.brand_name}. ${cityData.description}`,
        "provider": {
          "@type": "LocalBusiness",
          "name": COMPANY_INFO.brand_name
        },
        "areaServed": kotaName
      },
      getLocalBusinessSchema(kotaName)
    ]
  };

  const faqSchema = getFaqSchema(kategoriName, kotaName);

  const content = getContentVariations(decodedKategori, kotaName);

  return (
    <>
      <BreadcrumbSchema cityName={kotaName} cityKey={decodedKota} />
      {/* Menggunakan Schema.org JSON-LD Langsung di Komponen Utama */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="flex-1 w-full flex flex-col pt-[72px] md:pt-[88px]">
        {/* Modularized Content Sections */}
        <CityHero 
          kategoriName={kategoriName} 
          kotaName={kotaName} 
          cityDescription={cityData.description} 
          content={content} 
        />
        
        <CityContent 
          kategoriName={kategoriName} 
          kotaName={kotaName} 
          cityData={cityData} 
        />
        
        {/* AI Overview & FAQ Section */}
        <AiOverviewSection cityName={kotaName} venues={cityData.popularVenues} />

        {/* Trust Section */}
        <TrustSection kategoriName={kategoriName} kotaName={kotaName} />

        {/* CTA Section */}
        <CityCta kategoriName={kategoriName} kotaName={kotaName} />

        {/* Kalkulator Budget Estimasi */}
        <section className="py-20 bg-white border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <div className="text-center mb-12">
              <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-gray-900 leading-[1.1] mb-6">
                Kalkulator <span className="text-[#EF4444]">Investasi</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
                 Simulasikan estimasi budget program Anda secara instan sebelum berkonsultasi dengan tim kami.
              </p>
            </div>
            <KalkulatorBudget />
          </div>
        </section>

        {/* Nearby Cities */}
        <NearbyCities currentCityKey={decodedKota} allCities={CITIES} />
      </main>
    </>
  );
}
