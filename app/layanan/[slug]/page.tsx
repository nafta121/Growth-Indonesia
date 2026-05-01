import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Target, ShieldCheck, ArrowRight, CheckCircle2, MessageCircle, Star, Home, ChevronRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CitySchema } from '@/components/city-schema';
import { AiOverviewSection } from '@/components/ai-overview';

type CityData = {
  name: string;
  uniqueSellingPoint: string;
  popularVenues: string[];
  description: string;
};

const CITIES: Record<string, CityData> = {
  madiun: {
    name: 'Madiun',
    uniqueSellingPoint: 'Sebagai pusat operasional utama kami, Growth Indonesia memiliki jaringan terluas di Madiun dengan berbagai pilihan venue berkapasitas besar untuk ratusan hingga ribuan peserta, sangat ideal untuk family gathering besar.',
    popularVenues: ['Wana Wisata Graha', 'Sun City', 'Nongko Ijo', 'Wana Wisata Grape'],
    description: 'Pusat layanan outbound dan HR development terbaik.',
  },
  ponorogo: {
    name: 'Ponorogo',
    uniqueSellingPoint: 'Kami menggabungkan nilai-nilai kepemimpinan dengan filosofi ketangguhan budaya lokal Ponorogo, memberikan pengalaman outbound yang berkesan, transformatif, dan selaras dengan budaya kearifan lokal.',
    popularVenues: ['Telaga Ngebel', 'Mloko Sewu', 'Nyawiji Park'],
    description: 'Layanan team building dengan sentuhan kearifan lokal.',
  },
  magetan: {
    name: 'Magetan',
    uniqueSellingPoint: 'Kami memiliki akses langsung ke venue atau playground premium di kawasan Telaga Sarangan dan lereng Gunung Lawu, memberikan udara pegunungan yang sejuk dan ideal untuk refreshment karyawan Anda.',
    popularVenues: ['Telaga Sarangan', 'Lawu Green Forest', 'Mojosemi Forest Park'],
    description: 'Rasakan sensasi outbound di area sejuk kaki pegunungan.',
  },
  ngawi: {
    name: 'Ngawi',
    uniqueSellingPoint: 'Nikmati program capacity building di kawasan asri Ngawi dengan berbagai program petualangan (adventure) seperti jeep offroad dan susur kebun teh yang dirancang khusus untuk memacu kolaborasi tim.',
    popularVenues: ['Srambang Park', 'Kebun Teh Jamus', 'Air Terjun Suwono'],
    description: 'Sinergi tim berbalut keindahan alam yang menakjubkan.',
  },
  nganjuk: {
    name: 'Nganjuk',
    uniqueSellingPoint: 'Program outbound kami di Nganjuk didesain khusus untuk mengoptimalkan potensi bentang alam perbukitan Wilis dan keindahan air terjun sebagai sarana belajar yang menantang sekaligus asri.',
    popularVenues: ['Air Terjun Sedudo', 'Bukit Wilis', 'Margo Mulyo'],
    description: 'Program akselerasi SDM di tengah pesona alam perbukitan.',
  },
  pacitan: {
    name: 'Pacitan',
    uniqueSellingPoint: 'Growth Indonesia menghadirkan konsep beach-outbound dan cave-exploration eksklusif di Pacitan, mengasah kekompakan tim Anda dengan latar pesisir pantai selatan yang magis dan memukau.',
    popularVenues: ['Pantai Klayar', 'Goa Gong', 'Pantai Teleng Ria'],
    description: 'Keseruan outbound tak terlupakan bernuansa pantai tropis.',
  },
  kediri: {
    name: 'Kediri',
    uniqueSellingPoint: 'Bagi perusahaan di area Kediri Raya, kami menyediakan fasilitator bersertifikat BNSP yang siap mengadakan program in-house training maupun outdoor team building di lereng Gunung Kelud.',
    popularVenues: ['Gunung Kelud', 'Kawasan Besuki', 'Simpang Lima Gumul'],
    description: 'Pilihan venue premium dan fasilitator tersertifikasi standar nasional.',
  }
};

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  const cityNameKey = decodedSlug.replace('outbound-', '');
  const cityData = CITIES[cityNameKey];
  
  if (!cityData) notFound();

  const title = `Provider Outbound Corporate Premium di ${cityData.name} | Growth Indonesia`;
  const description = `Growth Indonesia adalah provider outbound terbaik di ${cityData.name}. Melayani training SDM, team building, dan gathering perusahaan dengan fasilitator BNSP.`;

  return {
    title,
    description,
    // ... rest of metadata remains same
  };
}

export async function generateStaticParams() {
  return Object.keys(CITIES).map((city) => ({
    slug: `outbound-${city}`,
  }));
}

export default async function OutboundLocationPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();
  const cityNameKey = decodedSlug.replace('outbound-', '');
  const cityData = CITIES[cityNameKey];

  if (!cityData) notFound();

  return (
    <>
      <CitySchema cityName={cityData.name} slug={decodedSlug} />
      <main className="flex-1 w-full flex flex-col pt-[72px] md:pt-[88px]">
        <article>
          {/* Hero Section */}
          <section className="relative pt-12 pb-20 md:pt-24 md:pb-28 bg-[#0A1628] overflow-hidden">
            <div className="absolute inset-0 z-0">
              <Image 
                src="https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg"
                alt={`Dokumentasi outbound training profesional di ${cityData.name} - Growth Indonesia`}
                fill
                priority
                className="object-cover opacity-20"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/80 to-transparent" />
            </div>
            
            <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
              {/* Breadcrumb - Essential for SEO Structure */}
              <nav className="flex items-center gap-2 text-slate-400 text-xs mb-8 uppercase tracking-widest" aria-label="Breadcrumb">
                <Link href="/" className="hover:text-white transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-slate-500">Layanan</span>
                <ChevronRight className="w-3 h-3" />
                <span className="text-[#EF4444] font-bold">Outbound {cityData.name}</span>
              </nav>

              <ScrollReveal delay={0} yOffset={20} className="max-w-4xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 fill-current" />)}
                  </div>
                  <span className="text-xs md:text-sm font-medium text-white/90">Top Rated Provider di Jawa Timur</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-white mb-8 leading-[1.1]">
                  Provider Outbound Corporate Premium di <span className="text-[#EF4444]">{cityData.name}</span>
                </h1>

                <p className="text-lg md:text-xl text-slate-200 leading-relaxed mb-10 max-w-2xl">
                  <strong>Growth Indonesia adalah provider outbound terbaik di {cityData.name}</strong> yang berfokus pada transformasi budaya kerja dan akselerasi potensi SDM melalui metode <em>experiential learning</em> yang inovatif.
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <Button size="lg" className="h-14 px-8 rounded-full bg-[#EF4444] hover:bg-red-700 shadow-xl shadow-red-600/20 group" asChild>
                    <Link href={`https://wa.me/6285704748186?text=Halo Growth Indonesia, saya ingin bertanya tentang paket outbound di ${cityData.name}.`} target="_blank">
                      KONSULTASI SEKARANG <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button variant="outline" size="lg" className="h-14 px-8 rounded-full border-white/20 text-white hover:bg-white/10" asChild>
                    <Link href="/#paket">Lihat Pricelist</Link>
                  </Button>
                </div>
              </ScrollReveal>
            </div>
          </section>

          {/* Programmatic Content Section */}
          <section className="py-20 md:py-32 bg-white">
            {/* ... Content here is already good, just ensure Image alt is dynamic ... */}
            <div className="max-w-7xl mx-auto px-4 md:px-12">
               <div className="bg-slate-50 rounded-[3rem] p-8 md:p-16 border border-slate-100">
                  <h2 className="font-display text-3xl md:text-4xl font-black text-slate-900 mb-6">MENGAPA MEMILIH KAMI DI {cityData.name.toUpperCase()}?</h2>
                  <p className="text-slate-600 text-lg mb-12">{cityData.uniqueSellingPoint}</p>
                  
                  {/* Venue Grid with better styling */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {cityData.popularVenues.map((venue, idx) => (
                      <div key={idx} className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-50 text-red-600 rounded-full flex items-center justify-center shrink-0">
                          <MapPin className="w-5 h-5" />
                        </div>
                        <span className="font-bold text-slate-800">{venue}</span>
                      </div>
                    ))}
                  </div>
               </div>
            </div>
          </section>

          {/* FAQ & AI Section */}
          <AiOverviewSection cityName={cityData.name} venues={cityData.popularVenues} />

          {/* Internal Link Section: Essential for Crawling */}
          <section className="py-20 bg-slate-900 text-white">
            <div className="max-w-7xl mx-auto px-4 md:px-12">
              <h3 className="font-display text-2xl font-bold mb-8">Area Layanan Lainnya:</h3>
              <div className="flex flex-wrap gap-3">
                {Object.keys(CITIES).filter(c => c !== cityNameKey).map((city) => (
                  <Link 
                    key={city} 
                    href={`/layanan/outbound-${city}`}
                    className="px-6 py-3 rounded-full bg-white/5 border border-white/10 hover:bg-[#EF4444] hover:border-[#EF4444] transition-all text-sm font-medium"
                  >
                    Outbound {CITIES[city].name}
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </article>
      </main>
    </>
  );
}
