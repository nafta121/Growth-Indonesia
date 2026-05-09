import React from 'react';
import { ShieldCheck, Video, Award, CheckCircle2, XCircle } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Badge } from '@/components/ui/badge';

export default function TrustSection({
  kategoriName,
  kotaName
}: {
  kategoriName?: string;
  kotaName?: string;
}) {
  const isDynamic = kategoriName && kotaName;
  const headingText = isDynamic 
    ? `Mengapa Perusahaan Mempercayakan Program ${kategoriName} di ${kotaName} pada `
    : 'Mengapa Perusahaan & Instansi Mempercayakan Agenda Mereka pada ';
  const trustTiles = [
    {
      icon: Award,
      title: 'Standardisasi BNSP',
      description: 'Seluruh fasilitator dan instruktur lapangan kami tersertifikasi resmi secara nasional oleh Badan Nasional Sertifikasi Profesi.',
    },
    {
      icon: ShieldCheck,
      title: 'Zero Accident Policy',
      description: 'Prioritas tertinggi kami adalah keselamatan. Setiap kegiatan dilengkapi Risk Management Plan dan Standard Operating Procedure (SOP) keamanan sekala industri.',
    },
    {
      icon: Video,
      title: 'Modern Documentation',
      description: 'Paket yang ditawarkan mencakup tim media profesional dengan peralatan lengkap mulai dari Drone, Mirrorless, hingga produksi video cinematic.',
    },
  ];

  const comparisonData = [
    {
      feature: 'Metode Pembelajaran',
      us: 'Experiential Learning Berbasis Objektif',
      them: 'Sekadar Fun Games Konvensional',
    },
    {
      feature: 'Fasilitator & Instruktur',
      us: 'Tersertifikasi BNSP',
      them: 'Seringkali Freelance / Belum Tersertifikasi',
    },
    {
      feature: 'Transparansi Harga',
      us: 'Terdapat Kalkulator Budget & RAB Detil',
      them: 'Harga Sering Tertutup / Banyak Hidden Fee',
    },
    {
      feature: 'Kualitas Dokumentasi',
      us: 'Premium (Drone, DSLR, Video Editing Cinematic)',
      them: 'Standar HP / Dokumentasi Seadanya',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden" id="trust-section">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header Section */}
        <ScrollReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <Badge className="mb-4">E-E-A-T & Proven Track Record</Badge>
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-[#0A1628] leading-[1.15]">
            {headingText} <span className="text-[#EF4444]">Growth Indonesia?</span>
          </h2>
          <p className="mt-6 text-lg text-slate-600 font-medium">
            Kami bukan sekadar Event Organizer. Kami adalah mitra strategis untuk akselerasi budaya kerja, peningkatan kapasitas kolaborasi, dan regenerasi kepemimpinan.
          </p>
        </ScrollReveal>

        {/* Trust Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 md:mb-32">
          {trustTiles.map((tile, idx) => (
            <ScrollReveal 
              key={idx} 
              delay={idx * 0.15} 
              className="bg-slate-50 border border-slate-100 p-8 rounded-3xl hover:shadow-xl hover:-translate-y-2 hover:shadow-red-500/5 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-red-50 text-[#EF4444] rounded-2xl flex items-center justify-center mb-6">
                <tile.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl md:text-2xl font-black font-display text-[#0A1628] mb-4">
                {tile.title}
              </h3>
              <p className="text-slate-600 leading-relaxed font-medium">
                {tile.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {/* Comparison Table */}
        <ScrollReveal delay={0.2} className="max-w-5xl mx-auto relative">
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl md:text-4xl font-black tracking-tight text-[#0A1628]">
              Perbandingan Value & Kualitas
            </h3>
          </div>

          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-xl shadow-slate-200/50 overflow-hidden relative z-10">
            {/* Desktop / Tab View */}
            <div className="hidden md:block">
              <div className="grid grid-cols-12 bg-slate-50 border-b border-slate-200 p-6">
                <div className="col-span-4 font-bold text-slate-500 uppercase tracking-wider text-sm">Aspek / Kriteria</div>
                <div className="col-span-4 font-black text-[#0A1628] text-lg text-center flex items-center justify-center gap-2">
                  Growth Indonesia <CheckCircle2 className="w-5 h-5 text-[#EF4444]" />
                </div>
                <div className="col-span-4 font-bold text-slate-500 text-lg text-center flex items-center justify-center gap-2">
                  Provider Lain <XCircle className="w-5 h-5 text-slate-400" />
                </div>
              </div>
              {comparisonData.map((row, idx) => (
                <div key={idx} className={`grid grid-cols-12 p-6 items-center ${idx !== comparisonData.length - 1 ? 'border-b border-slate-100' : ''} hover:bg-slate-50/50 transition-colors`}>
                  <div className="col-span-4 font-bold text-[#0A1628]">{row.feature}</div>
                  <div className="col-span-4 text-center font-semibold text-[#EF4444] bg-red-50/50 py-3 rounded-xl">
                    {row.us}
                  </div>
                  <div className="col-span-4 text-center text-slate-500 font-medium">
                    {row.them}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="block md:hidden">
              {comparisonData.map((row, idx) => (
                <div key={idx} className={`p-6 ${idx !== comparisonData.length - 1 ? 'border-b border-slate-200' : ''}`}>
                  <div className="font-black text-[#0A1628] text-lg mb-4 text-center border-b border-slate-100 pb-2">
                    {row.feature}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 rounded-2xl p-4 text-center border border-red-100 flex flex-col items-center justify-center">
                      <div className="font-bold text-[#0A1628] text-xs mb-2 uppercase tracking-wide opacity-50">Growth ID</div>
                      <CheckCircle2 className="w-6 h-6 text-[#EF4444] mx-auto mb-2" />
                      <div className="font-bold text-[#EF4444] text-sm leading-snug">{row.us}</div>
                    </div>
                    <div className="bg-slate-50 rounded-2xl p-4 text-center border border-slate-100 flex flex-col items-center justify-center">
                      <div className="font-bold text-slate-400 text-xs mb-2 uppercase tracking-wide">Provider Lain</div>
                      <XCircle className="w-6 h-6 text-slate-300 mx-auto mb-2" />
                      <div className="font-medium text-slate-500 text-sm leading-snug">{row.them}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Decorative Background Blob */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[120%] bg-gradient-to-r from-red-50 to-blue-50 blur-3xl opacity-50 -z-10 pointer-events-none rounded-[100%]" />
        </ScrollReveal>
      </div>
    </section>
  );
}
