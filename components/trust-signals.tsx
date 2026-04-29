'use client';

import { motion } from 'motion/react';
import { Building2, Globe, GraduationCap, HardHat, Landmark, Ship, TowerControl as Tower, Truck } from 'lucide-react';

const CLIENTS = [
  { name: 'Petrokimia Gresik', icon: <HardHat className="w-5 h-5" />, color: 'text-green-600' },
  { name: 'Semen Indonesia', icon: <Building2 className="w-5 h-5" />, color: 'text-blue-700' },
  { name: 'Bank Jatim', icon: <Landmark className="w-5 h-5" />, color: 'text-red-600' },
  { name: 'Maspion Group', icon: <Globe className="w-5 h-5" />, color: 'text-blue-600' },
  { name: 'Kapal Api', icon: <Ship className="w-5 h-5" />, color: 'text-amber-900' },
  { name: 'PT KAI', icon: <Truck className="w-5 h-5" />, color: 'text-orange-600' },
  { name: 'Pertamina', icon: <Tower className="w-5 h-5" />, color: 'text-red-500' },
  { name: 'Universitas Brawijaya', icon: <GraduationCap className="w-5 h-5" />, color: 'text-blue-900' },
  { name: 'Wings Group', icon: <Building2 className="w-5 h-5" />, color: 'text-blue-500' },
  { name: 'Gudang Garam', icon: <Globe className="w-5 h-5" />, color: 'text-amber-600' },
  { name: 'PLN Persero', icon: <Tower className="w-5 h-5" />, color: 'text-cyan-600' },
  { name: 'WIKA', icon: <HardHat className="w-5 h-5" />, color: 'text-blue-800' },
];

export default function TrustSignals() {
  // Triple the list to ensure seamless infinite scroll on all screen sizes
  const scrollItems = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  return (
    <section className="py-20 bg-white border-b border-gray-100 overflow-hidden" aria-labelledby="trust-title">
      <div className="container mx-auto px-4 md:px-12 mb-12">
        <div className="text-center">
          <h3 id="trust-title" className="text-gray-900 font-display text-2xl md:text-3xl font-bold tracking-tight">
            Dipercaya oleh <span className="text-[#EF4444]">100+ Perusahaan</span> & Instansi
          </h3>
          <p className="text-gray-500 mt-2 text-sm">Mitra strategis dalam pengembangan sumber daya manusia</p>
        </div>
      </div>

      <div className="relative flex overflow-hidden py-4">
        {/* Gradient overlays for smooth fading effect */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{
            x: [0, -1 * (100 / 3) + '%'],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 30,
              ease: "linear",
            },
          }}
          className="flex whitespace-nowrap gap-8 items-center"
        >
          {scrollItems.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex items-center gap-3 px-8 py-4 rounded-xl bg-gray-50 border border-gray-100 hover:border-[#EF4444]/20 hover:bg-white hover:shadow-sm transition-all duration-300 group"
            >
              <div className={`${client.color} opacity-40 group-hover:opacity-100 transition-opacity`}>
                {client.icon}
              </div>
              <span className="font-display font-bold text-gray-400 group-hover:text-gray-800 transition-colors uppercase tracking-tight text-sm">
                {client.name}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="container mx-auto px-4 text-center mt-12">
        <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300">Sustainable Growth Partnerships</p>
      </div>
    </section>
  );
}
