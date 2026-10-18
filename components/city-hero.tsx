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
    <section className="relative pt-20 pb-16 md:pt-24 md:pb-24 bg-[#0A1628] overflow-hidden">
      <div className="absolute inset-0 z-0">
        <Image 
          src={heroImage}
          alt={`Kegiatan ${kategoriName} dan Team Building Growth Indonesia di ${kotaName}`}
          fill
          priority={true}
          fetchPriority="high"
          sizes="100vw"
          className="object-cover opacity-20 pointer-events-none"
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

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/10 mb-6">
            <div className="flex text-yellow-400" aria-hidden="true">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-sm font-medium text-white/90 tabular-nums">Fasilitator Bersertifikat BNSP</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white mb-6 leading-[1.1] text-balance">
            {content.h1}
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mb-8 text-pretty">
            <strong className="font-semibold text-white">{content.subheadline}</strong> {cityDescription}
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="lg" className="h-14 px-8 rounded-full bg-[#EF4444] text-white hover:bg-red-600 shadow-lg shadow-red-600/30 transition-all duration-300 active:scale-[0.98] flex items-center justify-center gap-2 whitespace-nowrap" asChild>
              <Link href="/#kontak" aria-label={`Konsultasi ${kategoriName} ${kotaName}`} className="text-sm font-bold">
                Konsultasi Program <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button size="lg" asChild className="h-14 px-8 rounded-full bg-transparent border border-white/30 text-white hover:bg-white/10 transition-all duration-300 active:scale-[0.98] flex items-center justify-center whitespace-nowrap">
              <Link href="/#paket" className="text-sm font-bold">
                Lihat Paket Harga
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
