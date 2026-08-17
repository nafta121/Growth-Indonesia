import { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import { CITIES } from '@/lib/cities';
import { COMPANY_INFO } from '@/lib/constants';
import { getServicePageSchema, getCategoryOgImage } from '@/lib/seo';
import { formatSlug } from '@/lib/format';
import { getContentVariations } from '@/lib/content-variations';
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

  const title = content.title.includes('Growth Indonesia') ? content.title : `${content.title} | ${COMPANY_INFO.brand_name}`;
  const description = `Jasa ${kategoriName.toLowerCase()} & event organizer profesional di ${kotaName} bersertifikat BNSP. ${cityData.description} Hubungi ${COMPANY_INFO.brand_name} untuk penawaran harga terbaik!`;
  const ogImages = getCategoryOgImage(decodedKategori, kotaName);
  const canonicalUrl = `https://growthindonesia.my.id/layanan/${decodedKota}/${decodedKategori}`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: {
        'id-ID': canonicalUrl,
      },
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: COMPANY_INFO.brand_name,
      locale: 'id_ID',
      type: 'website',
      images: ogImages,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImages[0].url],
    },
  };
}

export async function generateViewport({ params }: Props): Promise<Viewport> {
  const { kota } = await params;
  const decodedKota = decodeURIComponent(kota).toLowerCase();
  const cityData = CITIES[decodedKota];

  if (!cityData) {
    return {
      themeColor: '#0A1628',
      width: 'device-width',
      initialScale: 1,
    };
  }

  return {
    themeColor: '#0A1628',
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
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
  const description = `Jasa ${kategoriName.toLowerCase()} & event organizer profesional di ${kotaName} bersertifikat BNSP. ${cityData.description} Hubungi ${COMPANY_INFO.brand_name} untuk penawaran harga terbaik!`;

  const schemaLd = getServicePageSchema({
    kotaName,
    cityKey: decodedKota,
    kategoriName,
    kategoriKey: decodedKategori,
    cityDescription: cityData.description,
  });

  const content = getContentVariations(decodedKategori, kotaName);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
      <main className="flex-1 w-full flex flex-col pt-[72px] md:pt-[88px]">
        {/* Modularized Content Sections */}
        <article itemScope itemType="https://schema.org/Service">
          <meta itemProp="name" content={`${kategoriName} di ${kotaName}`} />
          <meta itemProp="description" content={description} />
          <meta itemProp="category" content={kategoriName} />
          <meta itemProp="provider" content={COMPANY_INFO.brand_name} />
          <meta itemProp="areaServed" content={kotaName} />
          <meta itemProp="award" content="Fasilitator & Instructor Tersertifikasi BNSP" />
          <meta itemProp="serviceType" content={`${kategoriName} Outbound & Event Organizer`} />
          
          <CityHero 
            kategoriName={kategoriName} 
            kotaName={kotaName} 
            cityKey={decodedKota}
            cityDescription={cityData.description} 
            content={content} 
          />
          
          <CityContent 
            kategoriName={kategoriName} 
            kotaName={kotaName} 
            cityKey={decodedKota}
            cityData={cityData} 
          />
          
          {/* AI Overview & FAQ Section */}
          <AiOverviewSection cityName={kotaName} kategoriName={kategoriName} venues={cityData.popularVenues} />

          {/* Trust Section */}
          <TrustSection kategoriName={kategoriName} kotaName={kotaName} />

          {/* CTA Section */}
          <CityCta kategoriName={kategoriName} kotaName={kotaName} />
        </article>

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
        <NearbyCities currentCityKey={decodedKota} currentKategori={decodedKategori} allCities={CITIES} />
      </main>
    </>
  );
}
