import Link from 'next/link';
import Image from 'next/image';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CityCtaProps {
  kategoriName: string;
  kotaName: string;
}

export default function CityCta({ kategoriName, kotaName }: CityCtaProps) {
  return (
    <section className="py-24 md:py-32 bg-[#0A1628] relative overflow-hidden">
      <Image
        src="https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg"
        alt={`Background ${kategoriName} ${kotaName}`}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center opacity-20 mix-blend-overlay absolute inset-0 -z-10"
        referrerPolicy="no-referrer"
      />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
          Wujudkan Agenda {kategoriName} Impian di {kotaName}
        </h2>
        <p className="text-xl text-slate-300 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
          Konsultasikan kebutuhan spesifik tim Anda bersama tenaga ahli kami. Kami akan siapkan proposal komprehensif tanpa biaya!
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="h-16 px-8 rounded-full bg-[#EF4444] text-white hover:bg-red-600 shadow-lg shadow-red-600/30 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2" asChild>
            <Link href={`https://wa.me/6285704748186?text=Halo tim Growth Indonesia, saya ingin berdiskusi mengenai program ${kategoriName.toLowerCase()} untuk wilayah ${kotaName}.`} target="_blank" className="font-bold text-xs sm:text-sm">
              <MessageCircle className="w-5 h-5" />
              KONSULTASI PROGRAM {kotaName.toUpperCase()}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
