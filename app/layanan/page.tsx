import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import { CITIES } from '@/lib/cities';
import { COMPANY_INFO } from '@/lib/constants';
import { formatSlug } from '@/lib/format';
import TrustSection from '@/components/trust-section';
import { Breadcrumb } from '@/components/breadcrumb';

export const metadata: Metadata = {
  title: `Area Layanan ${COMPANY_INFO.brand_name} - Provider Outbound & Pelatihan`,
  description: `Temukan area layanan ${COMPANY_INFO.brand_name} di berbagai kota di Indonesia. Kami menyediakan program Outbound, Training, Fun Games & Team Building di lokasi terbaik.`,
  alternates: {
    canonical: 'https://growthindonesia.my.id/layanan',
  },
  openGraph: {
    title: `Area Layanan ${COMPANY_INFO.brand_name} - Provider Outbound & Pelatihan`,
    description: `Temukan area layanan ${COMPANY_INFO.brand_name} di berbagai kota di Indonesia. Kami menyediakan program Outbound, Training, Fun Games & Team Building di lokasi terbaik.`,
    url: 'https://growthindonesia.my.id/layanan',
    siteName: COMPANY_INFO.brand_name,
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg',
        width: 1200,
        height: 630,
        alt: `Area Layanan ${COMPANY_INFO.brand_name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `Area Layanan ${COMPANY_INFO.brand_name} - Provider Outbound & Pelatihan`,
    description: `Temukan area layanan ${COMPANY_INFO.brand_name} di berbagai kota di Indonesia.`,
    images: ['https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg'],
  },
};

export default function LayananHubPage() {
  const allCitiesKeys = Object.keys(CITIES);
  
  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Area Layanan ${COMPANY_INFO.brand_name}`,
    "description": `Jangkauan layanan ${COMPANY_INFO.brand_name} di seluruh kota.`,
    "url": "https://growthindonesia.my.id/layanan"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
      />
      
      <main className="flex-1 w-full flex flex-col pt-[72px] md:pt-[88px]">
        {/* Hub Hero */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-28 bg-[#0A1628] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-brand/10 to-[#0A1628]" />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10 text-center flex flex-col items-center">
            <div className="mb-6">
              <Breadcrumb
                items={[
                  { label: 'Beranda', href: '/' },
                  { label: 'Area Layanan' },
                ]}
                variant="dark"
                includeSchema={true}
              />
            </div>
            <h1 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white mb-6">
              Area <span className="text-[#EF4444]">Layanan Kami</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto font-medium">
              Jangkauan luas {COMPANY_INFO.brand_name} untuk menghadirkan pengalaman Outbound & Training berdampak tinggi di berbagai kota.
            </p>
          </div>
        </section>

        {/* Cities Grid */}
        <section className="py-20 md:py-32 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {allCitiesKeys.map((cityKey) => {
                const cityName = formatSlug(cityKey);
                const cityData = CITIES[cityKey];
                
                return (
                  <Link 
                    key={cityKey}
                    href={`/layanan/${cityKey}`}
                    className="group bg-white rounded-3xl p-6 border border-gray-100 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-brand group-hover:bg-brand group-hover:text-white transition-colors">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h2 className="font-display font-bold text-xl text-gray-900 group-hover:text-brand transition-colors">
                        {cityName}
                      </h2>
                    </div>
                    <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-grow">
                      {cityData.description}
                    </p>
                    <div className="flex items-center text-sm font-bold text-gray-900 group-hover:text-brand transition-colors mt-auto">
                      Lihat Layanan <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>

        <TrustSection kategoriName="Outbound" kotaName="Indonesia" />
      </main>
    </>
  );
}
