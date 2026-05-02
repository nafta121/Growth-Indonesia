'use client';

import React, { useState } from 'react';
import { Calculator, Users, Compass, Clock, MessageCircle } from 'lucide-react';

const PROGRAMS = [
  { id: 'fun-game', name: 'Fun Game', basePrice: 100000 },
  { id: 'team-building', name: 'Team Building', basePrice: 250000 },
  { id: 'ldk-osis', name: 'LDK OSIS', basePrice: 250000 },
];

const DURATIONS = [
  { id: '1-day', name: 'One Day Activity', multiplier: 1 },
  { id: '2-days', name: '2 Hari 1 Malam', multiplier: 1.8 },
];

export default function KalkulatorBudget() {
  const [pax, setPax] = useState<number>(50);
  const [program, setProgram] = useState(PROGRAMS[0]);
  const [duration, setDuration] = useState(DURATIONS[0]);

  const totalEstimate = pax * program.basePrice * duration.multiplier;

  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleWhatsAppClick = () => {
    const text = `Halo tim Growth Indonesia, saya ingin konsultasi program outbound dengan detail estimasi berikut:
- Jumlah Peserta: ${pax} Pax
- Tipe Program: ${program.name}
- Durasi: ${duration.name}
- Estimasi Total: ${formatRupiah(totalEstimate)}

Apakah ada jadwal kosong?`;
    
    const url = `https://wa.me/6285704748186?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl overflow-hidden max-w-2xl mx-auto">
      {/* Header */}
      <div className="bg-[#0A1628] p-6 sm:p-8 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-bl-full opacity-50"></div>
        <div className="flex items-center gap-4 relative z-10">
          <div className="bg-[#EF4444] p-3 rounded-2xl shrink-0">
            <Calculator className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-display font-extrabold text-2xl tracking-tight mb-1">Kalkulator Estimasi</h3>
            <p className="text-slate-300 text-sm md:text-base font-medium">Hitung estimasi investasi program Anda dengan cepat</p>
          </div>
        </div>
      </div>

      <div className="p-6 sm:p-8 space-y-8">
        {/* Peserta Slider */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
             <label htmlFor="pax-slider" className="flex items-center gap-2 font-bold text-gray-900 border-b-2 border-transparent">
               <Users className="w-5 h-5 text-[#EF4444]" />
               Jumlah Peserta
             </label>
             <span className="font-display font-black text-2xl text-[#0A1628] bg-slate-100 px-4 py-1.5 rounded-full border border-slate-200">
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
            className="w-full h-3 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#EF4444] hover:accent-red-600 transition-all"
          />
          <div className="flex justify-between text-xs font-semibold text-slate-400 px-1">
            <span>20</span>
            <span>200+</span>
          </div>
        </div>

        {/* Program Selection */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 font-bold text-gray-900">
            <Compass className="w-5 h-5 text-[#EF4444]" />
            Tipe Program
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
             {PROGRAMS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setProgram(p)}
                  className={`px-4 py-3 rounded-2xl text-sm md:text-base font-bold transition-all duration-300 border-2 active:scale-95 ${
                    program.id === p.id 
                    ? 'border-[#0A1628] bg-[#0A1628] text-white shadow-md shadow-[#0A1628]/20' 
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {p.name}
                </button>
             ))}
          </div>
        </div>

        {/* Duration Selection */}
        <div className="space-y-4">
          <label className="flex items-center gap-2 font-bold text-gray-900">
            <Clock className="w-5 h-5 text-[#EF4444]" />
            Durasi Program
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
             {DURATIONS.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDuration(d)}
                  className={`px-4 py-3 rounded-2xl text-sm md:text-base font-bold transition-all duration-300 border-2 active:scale-95 ${
                    duration.id === d.id 
                    ? 'border-[#0A1628] bg-[#0A1628] text-white shadow-md shadow-[#0A1628]/20' 
                    : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {d.name}
                </button>
             ))}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-slate-100 my-2"></div>

        {/* Result & CTA */}
        <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 sm:p-8 text-center space-y-6 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-2 h-full bg-[#EF4444]"></div>
           <div>
             <p className="font-bold text-slate-500 uppercase tracking-wider text-sm mb-2">Estimasi Total Investasi</p>
             <p className="font-display font-black text-4xl sm:text-5xl text-[#0A1628] tracking-tight">
               {formatRupiah(totalEstimate)}
             </p>
           </div>
           
           <p className="text-xs sm:text-sm text-slate-500 font-medium leading-relaxed max-w-sm mx-auto">
             *Harga tersebut hanya estimasi bukan harga real. Untuk mendapatkan paket atau harga yang lebih menarik, silahkan hubungi kontak Admin kami.
           </p>

           <button
             type="button"
             onClick={handleWhatsAppClick}
             className="w-full flex items-center justify-center gap-3 bg-[#EF4444] hover:bg-red-600 text-white font-bold text-xl py-4 px-6 rounded-2xl transition-all duration-300 active:scale-95 shadow-xl shadow-red-500/25"
           >
             <MessageCircle className="w-6 h-6" />
             Kirim Estimasi ke WhatsApp
           </button>
        </div>
      </div>
    </div>
  );
}
