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
        alt={`Dokumentasi Kegiatan ${kategoriName} bersama Fasilitator Growth Indonesia di ${kotaName}`}
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover object-center opacity-20 mix-blend-overlay absolute inset-0 -z-10"
        referrerPolicy="no-referrer"
      />
      <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
        <h2 className="font-display text-4xl md:text-6xl font-black tracking-tight text-white mb-6 leading-tight">
          Siap Menyusun Proposal & RAB {kategoriName} di {kotaName}?
        </h2>
        <p className="text-xl text-slate-300 mb-12 font-medium max-w-2xl mx-auto leading-relaxed">
          Diskusikan jumlah peserta, target capaian SDM, dan preferensi venue Anda bersama Master Trainer berpengalaman kami. Dapatkan draf proposal, opsi rundown, dan estimasi anggaran resmi tanpa biaya komitmen.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="h-16 px-8 rounded-full bg-[#DC2626] text-white hover:bg-red-700 shadow-lg shadow-red-600/30 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2" asChild>
            <Link href={`https://wa.me/6285704748186?text=Halo tim Growth Indonesia, saya ingin meminta draf proposal dan rincian RAB program ${kategoriName} untuk wilayah ${kotaName}.`} target="_blank" rel="noopener noreferrer" className="font-bold text-sm sm:text-base">
              <MessageCircle className="w-5 h-5" />
              Minta Proposal & RAB {kotaName}
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
