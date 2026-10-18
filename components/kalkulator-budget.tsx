'use client';

import React, { useState } from 'react';
import { Calculator, Users, Compass, Clock, MessageCircle } from 'lucide-react';

const ACTIVITIES = [
  { id: 'outbound', label: 'Outbound & Team Building', pricePerPax: 150000 },
  { id: 'fun-game', label: 'Fun Games & Ice Breaking', pricePerPax: 150000 },
  { id: 'ldk-osis', label: 'LDK OSIS & Character Building', pricePerPax: 150000 },
  { id: 'training', label: 'Indoor Training & Capacity Building', pricePerPax: 200000 },
  { id: 'gathering', label: 'Corporate & Family Gathering', pricePerPax: 250000 },
];

const DURATIONS = [
  { id: '1-day', name: 'One Day Activity (1 Hari)', multiplier: 1 },
  { id: '2-days', name: 'Menginap (2 Hari 1 Malam)', multiplier: 1.8 },
  { id: '3-days', name: 'Menginap (3 Hari 2 Malam)', multiplier: 2.8 },
];

type Activity = typeof ACTIVITIES[0];
type Duration = typeof DURATIONS[0];

const formatRupiah = (amount: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

function KalkulatorHeader() {
  return (
    <div className="bg-[#0A1628] p-6 sm:p-8 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full opacity-50"></div>
      <div className="flex items-center gap-4 relative z-10">
        <div className="bg-[#EF4444] p-3 rounded-2xl shrink-0">
          <Calculator className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-display font-extrabold text-2xl tracking-tight mb-1">Kalkulator Estimasi RAB</h3>
          <p className="text-slate-300 text-sm md:text-base font-medium">Simulasikan estimasi anggaran awal kegiatan instansi Anda</p>
        </div>
      </div>
    </div>
  );
}

function PesertaSlider({ pax, setPax }: { pax: number, setPax: (pax: number) => void }) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
         <label htmlFor="pax-slider" className="flex items-center gap-2 font-bold text-gray-900 border-b-2 border-transparent">
           <Users className="w-5 h-5 text-[#EF4444]" aria-hidden="true" />
           Jumlah Peserta
         </label>
         <span className="font-display font-black text-2xl text-[#0A1628] bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200 tabular-nums">
           {pax} <span className="text-sm font-bold text-slate-500">Pax</span>
         </span>
      </div>
      <input
        id="pax-slider"
        type="range"
        min="20"
        max="200"
        step="10"
        value={pax}
        onChange={(e) => setPax(Number(e.target.value))}
        className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#EF4444] hover:accent-red-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] focus-visible:ring-offset-2 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-7 [&::-webkit-slider-thumb]:h-7 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#EF4444] [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white [&::-webkit-slider-thumb]:shadow-md [&::-moz-range-thumb]:w-7 [&::-moz-range-thumb]:h-7 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-[#EF4444] [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white [&::-moz-range-thumb]:shadow-md"
      />
      <div className="flex justify-between text-xs font-semibold text-slate-600 px-1 tabular-nums">
        <span>20 Pax</span>
        <span>200+ Pax</span>
      </div>
    </div>
  );
}

function ProgramSelection({ program, setProgram }: { program: Activity, setProgram: (program: Activity) => void }) {
  return (
    <div className="space-y-4" role="group" aria-labelledby="program-selection-label">
      <label id="program-selection-label" className="flex items-center gap-2 font-bold text-gray-900">
        <Compass className="w-5 h-5 text-[#DC2626]" aria-hidden="true" />
        Kategori Layanan
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
         {ACTIVITIES.map((p, index) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={program.id === p.id}
              onClick={() => setProgram(p)}
              className={`min-h-12 px-4 py-3.5 rounded-2xl text-sm font-bold transition-[transform,background-color,border-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] border-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:ring-offset-2 ${
                index === ACTIVITIES.length - 1 ? 'sm:col-span-2' : ''
              } ${
                program.id === p.id
                ? 'border-[#0A1628] bg-[#0A1628] text-white shadow-md shadow-[#0A1628]/20'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {p.label}
            </button>
         ))}
      </div>
    </div>
  );
}

function DurationSelection({ duration, setDuration }: { duration: Duration, setDuration: (duration: Duration) => void }) {
  return (
    <div className="space-y-4" role="group" aria-labelledby="duration-selection-label">
      <label id="duration-selection-label" className="flex items-center gap-2 font-bold text-gray-900">
        <Clock className="w-5 h-5 text-[#DC2626]" />
        Durasi Program
      </label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
         {DURATIONS.map((d, index) => (
            <button
              key={d.id}
              type="button"
              aria-pressed={duration.id === d.id}
              onClick={() => setDuration(d)}
              className={`min-h-12 px-4 py-3.5 rounded-2xl text-sm font-bold transition-[transform,background-color,border-color,color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] border-2 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:ring-offset-2 ${
                index === DURATIONS.length - 1 ? 'sm:col-span-2' : ''
              } ${
                duration.id === d.id
                ? 'border-[#0A1628] bg-[#0A1628] text-white shadow-md shadow-[#0A1628]/20'
                : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {d.name}
            </button>
         ))}
      </div>
    </div>
  );
}

function KalkulatorResult({
  totalEstimate,
  pax,
  program,
  duration
}: {
  totalEstimate: number;
  pax: number;
  program: Activity;
  duration: Duration;
}) {
  const handleWhatsAppClick = () => {
    const priorityScale =
      pax >= 100 || duration.id !== '1-day'
        ? 'Korporat / Instansi Skala Besar (Fast-Track RAB)'
        : 'Reguler B2B / Institusi';

    const text = `Halo tim Growth Indonesia, saya ingin meminta rincian RAB dan draf proposal kegiatan dengan estimasi berikut:
- Kategori Layanan: ${program.label}
- Durasi Program: ${duration.name}
- Jumlah Peserta: ${pax} Pax
- Estimasi Awal: ${formatRupiah(totalEstimate)}
- Skala Prioritas: ${priorityScale}
- Dokumen yang Diminta: Draf Proposal, Opsi Rundown & Estimasi RAB Resmi

Mohon informasi opsi venue dan ketersediaan jadwal.`;
    
    const url = `https://wa.me/6285704748186?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 sm:p-8 text-center space-y-6 relative overflow-hidden">
       <div className="absolute top-0 left-0 w-2 h-full bg-[#DC2626]"></div>
       <div>
         <p className="font-bold text-slate-600 uppercase tracking-wider text-sm mb-2">Estimasi Total Investasi</p>
         <p className="font-display font-black text-4xl sm:text-5xl text-[#0A1628] tracking-tight tabular-nums" aria-live="polite">
           {formatRupiah(totalEstimate)}
         </p>
       </div>

       <p className="text-xs sm:text-sm text-slate-600 font-medium leading-relaxed max-w-md mx-auto">
         *Estimasi mencakup fasilitator berpengalaman, properti program, dan standar keselamatan. Rincian final disesuaikan dengan pilihan venue, katering, serta akomodasi.
       </p>

       <button
         type="button"
         onClick={handleWhatsAppClick}
         className="w-full min-h-14 flex items-center justify-center gap-3 bg-[#DC2626] hover:bg-red-700 text-white font-bold text-base sm:text-lg py-4 px-6 rounded-2xl transition-[transform,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] shadow-xl shadow-red-600/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#DC2626] focus-visible:ring-offset-2"
       >
         <MessageCircle className="w-5 h-5 shrink-0" />
         <span>Minta Rincian RAB via WhatsApp</span>
       </button>
    </div>
  );
}

export default function KalkulatorBudget() {
  const [pax, setPax] = useState<number>(50);
  const [program, setProgram] = useState<Activity>(ACTIVITIES[0]);
  const [duration, setDuration] = useState<Duration>(DURATIONS[0]);

  const totalEstimate = pax * program.pricePerPax * duration.multiplier;

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden max-w-2xl mx-auto">
      <KalkulatorHeader />

      <div className="p-6 sm:p-8 space-y-8">
        <PesertaSlider pax={pax} setPax={setPax} />
        <ProgramSelection program={program} setProgram={setProgram} />
        <DurationSelection duration={duration} setDuration={setDuration} />

        <div className="h-px w-full bg-slate-100 my-2"></div>

        <KalkulatorResult
          totalEstimate={totalEstimate}
          pax={pax}
          program={program}
          duration={duration}
        />
      </div>
    </div>
  );
}
