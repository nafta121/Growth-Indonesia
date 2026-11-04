import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';

export default function TrustSection({
  kategoriName,
  kotaName
}: {
  kategoriName?: string;
  kotaName?: string;
}) {
  const isDynamic = kategoriName && kotaName;
  const headingText = isDynamic 
    ? `Mengapa Perusahaan Mempercayakan Program ${kategoriName} di ${kotaName} pada Growth Indonesia?`
    : 'Mengapa Perusahaan & Instansi Mempercayakan Agenda Mereka pada Growth Indonesia?';
  const trustTiles = [
    {
      index: '01',
      title: 'Master Trainer Berpengalaman',
      description: 'Dipimpin langsung oleh praktisi Experiential Learning berpengalaman lebih dari 10 tahun dengan kurikulum berbasis asesmen kebutuhan tim (TNA).',
    },
    {
      index: '02',
      title: 'Zero Accident & Plan B Cuaca',
      description: 'Dilengkapi peralatan berstandar keselamatan UIAA/CE, tim medis P3K lapangan, serta jaminan skenario Plan B (indoor/pendopo) jika turun hujan.',
    },
    {
      index: '03',
      title: 'Dokumentasi & Laporan Evaluasi',
      description: 'Mencakup produksi foto, video sinematik, dan drone, ditambah Laporan Evaluasi Performa Tim tertulis sebagai bukti pertanggungjawaban HRD.',
    },
  ];

  const comparisonData = [
    {
      feature: 'Metodologi & Kurikulum',
      us: 'Experiential Learning Berbasis TNA & Debriefing',
      them: 'Permainan Massal Tanpa Asesmen Kebutuhan Tim',
    },
    {
      feature: 'Durasi & Output Program',
      us: 'Program Harian Terstruktur + Laporan Evaluasi SDM',
      them: 'Fun Games Singkat (Maks 2 Jam) Tanpa Laporan',
    },
    {
      feature: 'Kualifikasi Pemandu',
      us: 'Dipimpin Langsung Master Trainer Berpengalaman',
      them: 'Pemandu Lepas / Fokus Sewa Transportasi Wisata',
    },
    {
      feature: 'Penguasaan Venue & Mitigasi Cuaca',
      us: 'Spesialis Lokal Jatim + Siaga Plan B Indoor/Pendopo',
      them: 'Vendor Luar Kota / Tanpa Skenario Kontingensi Hujan',
    },
    {
      feature: 'Transparansi RAB & Pengadaan',
      us: 'Kalkulator RAB Instan & Dokumen SPJ Lengkap',
      them: 'Harga Tertutup (Wajib Telepon) / Rawan Biaya Tambahan',
    },
  ];

  return (
    <section className="py-20 md:py-32 bg-white relative overflow-hidden" id="trust-section">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Header Section */}
        <ScrollReveal className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-ink leading-[1.15]">
            {headingText}
          </h2>
          <p className="mt-6 text-lg text-muted font-medium">
            Setiap program dirancang berdasarkan asesmen kebutuhan tim (Training Need Analysis), dipandu langsung oleh Master Trainer dan fasilitator berpengalaman, serta dievaluasi secara terukur melalui laporan pasca-kegiatan.
          </p>
        </ScrollReveal>

        {/* Editorial Pillar Ledger */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 md:mb-32">
          {trustTiles.map((tile, idx) => (
            <ScrollReveal 
              key={idx} 
              delay={idx * 0.12} 
              className="bg-paper border border-rule border-t-4 border-t-brand-dark p-8 rounded-2xl hover:shadow-md transition-[transform,box-shadow,border-color] duration-200"
            >
              <span className="font-display text-3xl font-black text-brand-dark block mb-4 num">
                {tile.index}
              </span>
              <h3 className="text-xl md:text-2xl font-black font-display text-ink mb-4">
                {tile.title}
              </h3>
              <p className="text-muted leading-relaxed font-medium">
                {tile.description}
              </p>
            </ScrollReveal>
          ))}
        </div>

        {/* Comparison Table */}
        <ScrollReveal delay={0.2} className="max-w-5xl mx-auto relative">
          <div className="text-center mb-10">
            <h3 className="font-display text-2xl md:text-4xl font-black tracking-tight text-ink">
              Perbandingan Nilai &amp; Kualitas Pengadaan
            </h3>
          </div>

          <div className="bg-white border border-rule rounded-3xl shadow-md overflow-hidden relative z-10">
            {/* Desktop / Tab View */}
            <div className="hidden md:block">
              <div className="grid grid-cols-12 bg-paper border-b border-rule p-6">
                <div className="col-span-4 font-bold text-muted text-sm">Aspek / Kriteria</div>
                <div className="col-span-4 font-black text-ink text-lg text-center flex items-center justify-center gap-2">
                  Growth Indonesia <CheckCircle2 className="w-5 h-5 text-brand-dark" />
                </div>
                <div className="col-span-4 font-bold text-muted text-lg text-center flex items-center justify-center gap-2">
                  Provider Lain <XCircle className="w-5 h-5 text-muted" />
                </div>
              </div>
              {comparisonData.map((row, idx) => (
                <div key={idx} className={`grid grid-cols-12 p-6 items-center ${idx !== comparisonData.length - 1 ? 'border-b border-rule' : ''} hover:bg-paper/60 transition-colors`}>
                  <div className="col-span-4 font-bold text-ink">{row.feature}</div>
                  <div className="col-span-4 text-center font-semibold text-brand-dark bg-brand-tint/60 py-3 px-2 rounded-xl">
                    {row.us}
                  </div>
                  <div className="col-span-4 text-center text-muted font-medium">
                    {row.them}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="block md:hidden">
              {comparisonData.map((row, idx) => (
                <div key={idx} className={`p-6 ${idx !== comparisonData.length - 1 ? 'border-b border-rule' : ''}`}>
                  <div className="font-black text-ink text-lg mb-4 text-center border-b border-rule pb-2">
                    {row.feature}
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-brand-tint rounded-2xl p-4 text-center border border-brand-border flex flex-col items-center justify-center">
                      <div className="font-bold text-ink text-xs mb-2">Growth Indonesia</div>
                      <CheckCircle2 className="w-6 h-6 text-brand-dark mx-auto mb-2" />
                      <div className="font-bold text-brand-dark text-sm leading-snug">{row.us}</div>
                    </div>
                    <div className="bg-paper rounded-2xl p-4 text-center border border-rule flex flex-col items-center justify-center">
                      <div className="font-bold text-muted text-xs mb-2">Provider Lain</div>
                      <XCircle className="w-6 h-6 text-muted mx-auto mb-2" />
                      <div className="font-medium text-muted text-sm leading-snug">{row.them}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
