import { Metadata } from 'next';
import { notFound, permanentRedirect } from 'next/navigation';
import Link from 'next/link';
import { MapPin, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CITIES } from '@/lib/cities';
import { getCityImage } from '@/lib/city-images';
import { KATEGORI } from '@/lib/categories';
import { COMPANY_INFO } from '@/lib/constants';
import { formatSlug } from '@/lib/format';
import TrustSection from '@/components/trust-section';
import { Breadcrumb } from '@/components/breadcrumb';

type Props = {
  params: Promise<{ kota: string }>;
};

const CATEGORIES = ['outbound', 'training', 'fun-games', 'ldk-osis', 'gathering'];

function getRedirectDestination(slug: string): string | null {
  for (const cat of CATEGORIES) {
    if (slug.startsWith(`${cat}-`)) {
      const detectedCity = slug.replace(`${cat}-`, '');
      return `/layanan/${detectedCity}/${cat}`;
    }
  }
  return null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { kota } = await params;
  const decodedKota = decodeURIComponent(kota).toLowerCase();
  const cityData = CITIES[decodedKota];
  
  if (!cityData) {
    const redirectUrl = getRedirectDestination(decodedKota);
    if (redirectUrl) {
      permanentRedirect(redirectUrl);
    }
    notFound();
  }

  const kotaName = formatSlug(decodedKota);
  const title = `Layanan Outbound & Training di ${kotaName} - ${COMPANY_INFO.brand_name}`;
  const description = `Pilihan layanan unggulan ${COMPANY_INFO.brand_name} di ${kotaName}. Menyediakan Outbound, Training, Fun Games & LDK OSIS. ${cityData.description}`;
  const cityImage = getCityImage(decodedKota);

  return {
    title,
    description,
    alternates: {
      canonical: `https://growthindonesia.my.id/layanan/${decodedKota}`,
    },
    robots: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
    },
    openGraph: {
      title,
      description,
      url: `https://growthindonesia.my.id/layanan/${decodedKota}`,
      siteName: COMPANY_INFO.brand_name,
      locale: 'id_ID',
      type: 'website',
      images: [
        {
          url: cityImage,
          width: 1200,
          height: 630,
          alt: `Layanan Outbound & Training di ${kotaName} - ${COMPANY_INFO.brand_name}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [cityImage],
    },
  };
}

export async function generateStaticParams() {
  return Object.keys(CITIES).map((kota) => ({ kota }));
}

export const revalidate = 3600;

export default async function CityHubPage({ params }: Props) {
  const { kota } = await params;
  const decodedKota = decodeURIComponent(kota).toLowerCase();
  const cityData = CITIES[decodedKota];

  if (!cityData) {
    const redirectUrl = getRedirectDestination(decodedKota);
    if (redirectUrl) {
      permanentRedirect(redirectUrl);
    }
    notFound();
  }

  const kotaName = formatSlug(decodedKota);

  const schemaLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": `Layanan Outbound & Training di ${kotaName}`,
    "description": cityData.description,
    "url": `https://growthindonesia.my.id/layanan/${decodedKota}`,
    "about": {
      "@type": "Place",
      "name": kotaName
    }
  };

  return (
    <>
      <main className="flex-1 w-full flex flex-col pt-[72px] md:pt-[88px]">
        {/* City Hub Hero */}
        <section className="relative pt-20 pb-20 md:pt-32 md:pb-28 bg-[#0A1628] overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-brand/10 to-[#0A1628]" />
          </div>
          
          <div className="max-w-5xl mx-auto px-4 md:px-12 relative z-10 text-center flex flex-col items-center">
            <div className="mb-6">
              <Breadcrumb
                items={[
                  { label: 'Beranda', href: '/' },
                  { label: 'Layanan', href: '/layanan' },
                  { label: kotaName },
                ]}
                variant="dark"
                includeSchema={true}
              />
            </div>

            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8">
               <MapPin className="w-5 h-5 text-brand" />
               <span className="text-sm font-bold text-white tracking-wider uppercase">Layanan Regional</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl md:text-7xl font-black tracking-tight text-white mb-6 leading-tight">
              Layanan Outbound & Training di <span className="text-[#EF4444] break-words">{kotaName}</span>
            </h1>
            <p className="text-lg md:text-2xl text-slate-300 font-medium leading-relaxed max-w-3xl mx-auto">
              Berbagai pilihan program pengembangan SDM profesional dari {COMPANY_INFO.brand_name} yang dirancang khusus untuk memenuhi kebutuhan organisasi Anda di wilayah {kotaName}.
            </p>
          </div>
        </section>

        {/* Kategori Layanan List */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 md:px-12">
            <div className="text-center mb-16">
               <h2 className="font-display text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-4">
                 Pilih Kategori <span className="text-brand">Program</span>
               </h2>
               <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                 Jelajahi berbagai solusi pelatihan yang tersedia di lokasi terpilih area {kotaName}.
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {KATEGORI.map((kategori) => {
                const kategoriName = formatSlug(kategori);
                return (
                  <Link
                    key={kategori}
                    href={`/layanan/${decodedKota}/${kategori}`}
                    className="group flex flex-col bg-slate-50 rounded-3xl overflow-hidden border border-gray-100 hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-500"
                  >
                    <div className="p-8 pb-6 flex-grow">
                      <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center text-brand mb-6 border border-gray-100 group-hover:bg-brand group-hover:text-white transition-colors">
                        <CheckCircle2 className="w-7 h-7" />
                      </div>
                      <h3 className="font-display font-bold text-2xl text-gray-900 mb-3 group-hover:text-brand transition-colors">
                        {kategoriName} {kotaName}
                      </h3>
                      <p className="text-slate-500 font-medium leading-relaxed">
                        Solusi terbaik untuk {kategoriName.toLowerCase()} di area {kotaName} dengan pendekatan profesional.
                      </p>
                    </div>
                    <div className="px-8 py-5 border-t border-gray-100 bg-white group-hover:bg-red-50/50 transition-colors flex items-center justify-between">
                       <span className="font-bold text-gray-900 group-hover:text-brand text-sm">Lihat Detail Program</span>
                       <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand group-hover:translate-x-1 transition-transform" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* Local Information Context */}
        <section className="py-20 bg-slate-50 border-t border-gray-100">
          <div className="max-w-4xl mx-auto px-4 md:px-12 text-center">
            <h2 className="font-display text-3xl font-black text-gray-900 mb-6">Mengapa Memilih Layanan Kami di {kotaName}?</h2>
            <p className="text-lg text-slate-600 leading-relaxed font-medium">
               {cityData.uniqueSellingPoint} Kami mengombinasikan akses ke <span className="font-bold text-gray-900">{cityData.popularVenues.join(', ')}</span> dengan metode experiential learning yang teruji.
            </p>
          </div>
        </section>

        <TrustSection kategoriName="Program" kotaName={kotaName} />
      </main>
    </>
  );
}
