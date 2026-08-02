import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { getCityImage } from '@/lib/city-images';
import { Breadcrumb } from '@/components/breadcrumb';

interface CityHeroProps {
  kategoriName: string;
  kotaName: string;
  cityKey: string;
  cityDescription: string;
  content: {
    h1: ReactNode;
    subheadline: string;
    providerType: string;
  };
}

export default function CityHero({ kategoriName, kotaName, cityKey, cityDescription, content }: CityHeroProps) {
  const heroImage = getCityImage(cityKey);

  return (
    <section className="relative pt-20 pb-20 md:pt-32 md:pb-28 bg-[#0A1628] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src={heroImage}
          alt={`Background ${kategoriName} di ${kotaName}`}
          fill
          priority
          fetchPriority="high"
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628] via-[#0A1628]/80 to-transparent" />
      </div>
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <ScrollReveal delay={0} yOffset={20} className="max-w-3xl">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: 'Beranda', href: '/' },
                { label: 'Layanan', href: '/layanan' },
                { label: kotaName, href: `/layanan/${cityKey}` },
                { label: kategoriName },
              ]}
              variant="dark"
              includeSchema={false}
            />
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-8">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium text-white/90">Dipercaya 100+ Perusahaan dan Instansi</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-8 leading-[1.1]">
            {content.h1}
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-slate-100 leading-relaxed mb-6">
            <strong className="font-semibold text-white">{content.subheadline}</strong> {cityDescription}
          </p>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl mb-10">
            Growth Indonesia merupakan {content.providerType} terpercaya di {kotaName}. Fasilitator kami tersertifikasi BNSP, memastikan kegiatan Anda berjalan aman, interaktif, dan berdampak tinggi.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="h-14 px-8 rounded-full bg-[#EF4444] text-white hover:bg-red-600 shadow-lg shadow-red-600/30 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2" asChild>
              <Link href="/#kontak" className="text-xs sm:text-sm font-bold">
                KONSULTASI {kategoriName.toUpperCase()} {kotaName.toUpperCase()} <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" asChild className="h-14 px-8 rounded-full bg-transparent border border-white/30 text-white hover:bg-white/10 transition-all duration-300 active:scale-95 flex items-center justify-center">
              <Link href="/#paket" className="text-xs sm:text-sm font-bold">
                Lihat Paket Harga
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
