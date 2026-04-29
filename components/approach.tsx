import { Users, UserCheck, Award, ShieldCheck } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Badge } from '@/components/ui/badge';

const PILLARS = [
  {
    title: 'Client-Centric Focus',
    description: 'Pendekatan strategi dan modul pelatihan yang dirancang khusus menyesuaikan dengan budaya dan target unik organisasi Anda.',
    icon: Users,
  },
  {
    title: 'Professional Team',
    description: 'Didampingi oleh konsultan dan trainer ahli dengan rekam jejak yang solid dalam pengembangan kapasitas SDM.',
    icon: UserCheck,
  },
  {
    title: 'Quality',
    description: 'Standar keunggulan tanpa kompromi dalam setiap sesi indoor, kelas motivasi, maupun pengalaman outbound.',
    icon: Award,
  },
  {
    title: 'Safety First',
    description: 'Penerapan standar keselamatan mutlak dan protokol keamanan ketat untuk seluruh aktivitas outdoor.',
    icon: ShieldCheck,
  },
];

export default function Approach() {
  return (
    <section id="approach" className="py-20 md:py-32 bg-gray-50 border-y border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <ScrollReveal delay={0} duration={0.8} yOffset={20} className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <Badge className="mb-4 md:mb-6">
            How We Work
          </Badge>
          <h2
            className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-8 tracking-tight"
          >
            Our <span className="text-gray-400">Approach</span>
          </h2>
          <div
            className="h-2 w-16 bg-[#EF4444] mx-auto rounded-full"
          />
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {PILLARS.map((pillar, idx) => (
            <ScrollReveal
              key={idx}
              delay={0.2 + idx * 0.2}
              duration={0.6}
              yOffset={30}
              className="group relative bg-white p-8 md:p-10 rounded-3xl md:rounded-[2.5rem] border border-gray-100 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] active:scale-[0.98] cursor-default"
            >
              <div className="mb-8 inline-flex p-4 rounded-2xl bg-gray-50 text-[#EF4444] transition-all duration-500 group-hover:bg-[#EF4444] group-hover:text-white group-hover:-translate-y-2 shadow-sm">
                <pillar.icon className="w-8 h-8 md:w-9 md:h-9" />
              </div>
              <h3 className="font-display text-xl md:text-2xl font-extrabold text-gray-900 mb-4 group-hover:text-[#EF4444] transition-colors duration-300 tracking-tight">
                {pillar.title}
              </h3>
              <p className="text-gray-500 leading-relaxed font-medium text-sm md:text-base">
                {pillar.description}
              </p>
              <div className="absolute bottom-4 right-4 text-[40px] font-extrabold text-gray-50 opacity-[0.05] group-hover:opacity-10 transition-opacity">
                0{idx + 1}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
