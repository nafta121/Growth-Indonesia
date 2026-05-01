import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Users, Target, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

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
  
  if (!decodedSlug.startsWith('outbound-')) {
    notFound();
  }

  const cityName = decodedSlug.replace('outbound-', '');
  const cityData = CITIES[cityName];
  
  if (!cityData) {
    notFound();
  }

  const title = `Provider Outbound Corporate di ${cityData.name} | Growth Indonesia`;
  const description = `Growth Indonesia adalah provider outbound dan training SDM profesional di ${cityData.name}. ${cityData.description} Hubungi kami untuk program B2B berkualitas.`;

  return {
    title,
    description,
    keywords: [
      'Outbound', 
      'Training', 
      'Outbound Training', 
      `Outbound ${cityData.name}`, 
      `Provider Outbound ${cityData.name}`, 
      `LDK OSIS ${cityData.name}`, 
      `Team Building ${cityData.name}`,
      'HR Development'
    ],
    openGraph: {
      title,
      description,
      url: `https://growthindonesia.my.id/layanan/${decodedSlug}`,
      siteName: 'Growth Indonesia',
      locale: 'id_ID',
      type: 'website',
      images: [
        {
          url: 'https://nafta121.sirv.com/Screenshot_20260430_171224_Chrome.jpg',
          width: 1200,
          height: 630,
          alt: `Provider Outbound Corporate di ${cityData.name}`,
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
  return Object.keys(CITIES).map((city) => ({
    slug: `outbound-${city}`,
  }));
}

export default async function OutboundLocationPage({ params }: Props) {
  const { slug } = await params;
  const decodedSlug = decodeURIComponent(slug).toLowerCase();

  if (!decodedSlug.startsWith('outbound-')) {
    notFound();
  }

  const cityName = decodedSlug.replace('outbound-', '');
  const cityData = CITIES[cityName];

  if (!cityData) {
    notFound();
  }

  return (
    <main className="flex-1 w-full flex flex-col pt-[72px] md:pt-[88px]">
      {/* Hero Section */}
      <section className="relative pt-20 pb-20 md:pt-32 md:pb-28 bg-[#0A1628] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image 
            src="https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg"
            alt="Background Outbound"
            fill
            priority
            className="object-cover opacity-20"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/80 to-transparent" />
        </div>
        
        <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
          <ScrollReveal delay={0} yOffset={20} className="max-w-3xl">
            <Badge variant="dark" className="mb-6"><MapPin className="w-3 h-3 mr-2 inline-block" /> Wilayah Jangkauan Khusus</Badge>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-8 leading-[1.1]">
              Provider Outbound Corporate Premium di <span className="text-[#EF4444]">{cityData.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed mb-10">
              {cityData.description} Transformasi budaya perusahaan dan semangat kolaborasi tim Anda bersama instruktur profesional Growth Indonesia.
            </p>
            <Button size="lg" className="h-14 px-8 text-base shadow-red-500/25" asChild>
              <Link href="/#kontak">Konsultasi Program {cityData.name} Sekarang <ArrowRight className="w-5 h-5 ml-2" /></Link>
            </Button>
          </ScrollReveal>
        </div>
      </section>

      {/* Programmatic / Localized Content Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <ScrollReveal delay={0.2} xOffset={-30} className="relative">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden relative">
                 <Image 
                    src="https://nafta121.sirv.com/OUTBOUND/2022-11-05%2006-52-48.jpeg"
                    alt={`Outbound Training di ${cityData.name}`}
                    fill
                    className="object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 ring-1 ring-inset ring-gray-900/10 rounded-3xl" />
              </div>
              <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
                <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4">
                  <Target className="w-6 h-6" />
                </div>
                <div className="text-3xl font-black text-gray-900 mb-1">10+</div>
                <div className="text-sm font-semibold text-gray-500">Tahun Pengalaman</div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.3} xOffset={30}>
              <Badge className="mb-4">Keunggulan Spesifik Kami</Badge>
              <h2 className="font-display text-3xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-6">
                Menciptakan Impact Nyata Bagi SDM <span className="text-[#EF4444]">{cityData.name}</span>
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Sebagai provider outbound B2B pilihan, kami tidak sekadar menghadirkan "fun games". Kami merancang program dengan pendekatan <em>experiential learning</em> yang 100% selaras dengan visi dan misi institusi serta budaya kerja Anda.
              </p>
              
              {/* Dynamic USP - Vital for SEO / Avoiding Doorway Page penalty */}
              <div className="bg-red-50 border border-red-100 rounded-2xl p-6 md:p-8 mb-8 relative overflow-hidden group">
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="text-red-600 w-6 h-6" />
                    <h3 className="font-bold text-gray-900 text-xl">Layanan Eksklusif di {cityData.name}</h3>
                  </div>
                  <p className="text-gray-800 leading-relaxed font-medium">
                    {cityData.uniqueSellingPoint}
                  </p>
                </div>
                <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                   <MapPin className="w-64 h-64 text-red-600" />
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="font-bold text-gray-900 text-lg mb-4">Rekomendasi Venue Favorit Klien di {cityData.name}:</h4>
                <div className="flex flex-wrap gap-3">
                  {cityData.popularVenues.map((venue, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-xl border border-gray-100">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="font-semibold text-gray-700 text-sm">{venue}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-20 bg-gray-50 border-t border-gray-100">
         <div className="max-w-7xl mx-auto px-4 md:px-12 text-center">
            <h2 className="font-display text-3xl font-black text-gray-900 mb-12">
              Mengapa Memilih Kami untuk Program di <span className="text-[#EF4444]">{cityData.name}?</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { icon: ShieldCheck, title: 'Fasilitator BNSP', desc: 'Instruktur kami adalah praktisi berpengalaman dan tersertifikasi secara nasional di bidang pelatihan SDM.' },
                { icon: Target, title: 'Tailor-Made Program', desc: 'Setiap materi dirancang menyesuaikan dengan budaya perusahaan serta KPI dan Core Values dari manajemen.' },
                { icon: Users, title: 'Zero Accident Policy', desc: 'Keselamatan dan keamanan adalah prioritas mutlak. Kami merancang aktivitas dengan rasio risiko yang sangat terukur.' },
              ].map((feat, idx) => (
                <div key={idx} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <feat.icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-bold text-xl text-gray-900 mb-3">{feat.title}</h3>
                  <p className="text-gray-600">{feat.desc}</p>
                </div>
              ))}
            </div>
         </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-[#EF4444] relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg')] opacity-10 mix-blend-overlay bg-cover bg-center" />
         <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
            <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Wujudkan Agenda Company Gathering Impian di {cityData.name}
            </h2>
            <p className="text-xl text-white/90 mb-10 font-medium max-w-2xl mx-auto">
              Konsultasikan kebutuhan spesifik tim Anda bersama tenaga ahli kami. Kami akan siapkan proposal komprehensif tanpa biaya!
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="h-16 px-10 text-base rounded-2xl bg-white text-red-600 font-bold hover:bg-white/90 shadow-xl" asChild>
                <Link href={`https://wa.me/6285704748186?text=Halo tim Growth Indonesia, saya ingin berdiskusi mengenai program outbound corporate untuk wilayah ${cityData.name}.`} target="_blank">Chat WhatsApp Sekarang</Link>
              </Button>
            </div>
         </div>
      </section>
    </main>
  );
}
