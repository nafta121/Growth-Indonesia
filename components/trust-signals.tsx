import { Building2, Globe, GraduationCap, HardHat, Landmark, Ship, TowerControl as Tower, Truck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
    <section className="py-20 md:py-32 bg-white border-b border-gray-100 overflow-hidden" aria-labelledby="trust-title">
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-16 md:mb-24">
        <div className="text-center">
          <Badge className="mb-4">Strategic Partners</Badge>
          <h3 id="trust-title" className="text-gray-900 font-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Dipercaya oleh <span className="text-[#EF4444]">100+ Perusahaan</span>
          </h3>
          <p className="text-gray-500 mt-4 text-sm md:text-base max-w-xl mx-auto">Mitra strategis dalam pengembangan sumber daya manusia melalui metode yang kreatif dan berkelanjutan.</p>
        </div>
      </div>

      <div className="relative flex overflow-hidden py-8 md:py-12 bg-gray-50/50">
        {/* Gradient overlays for smooth fading effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap gap-6 md:gap-10 items-center animate-marquee hover:[animation-play-state:paused]">
          {scrollItems.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex items-center gap-4 px-8 md:px-10 py-5 md:py-6 rounded-2xl md:rounded-3xl bg-white border border-gray-100 hover:border-[#EF4444]/30 hover:shadow-2xl hover:shadow-[#EF4444]/5 transition-all duration-500 group active:scale-95 grayscale hover:grayscale-0 hover:-translate-y-1"
            >
              <div className={`${client.color} opacity-40 group-hover:opacity-100 transition-opacity duration-500`}>
                {client.icon}
              </div>
              <span className="font-display font-extrabold text-gray-400 group-hover:text-gray-900 transition-colors duration-500 uppercase tracking-tight text-xs md:text-sm">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center mt-12 md:mt-16">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-200">Sustainable Growth Partnerships &copy; 2026</p>
      </div>
    </section>
  );
}
