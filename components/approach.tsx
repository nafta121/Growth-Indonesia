import { Users, UserCheck, Award, ShieldCheck } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';

const PILLARS = [
  {
    title: 'Kurikulum Berbasis TNA',
    description: 'Setiap program diawali asesmen Training Need Analysis (TNA) agar simulasi selaras dengan target budaya kerja dan indikator kinerja organisasi Anda.',
    icon: Users,
  },
  {
    title: 'Master Trainer Berpengalaman',
    description: 'Dipandu langsung oleh praktisi Experiential Learning berpengalaman (Naftalyndho & Juprianto) dengan standar kompetensi kepelatihan profesional.',
    icon: UserCheck,
  },
  {
    title: 'Evaluasi & Laporan Terukur',
    description: 'Bukan sekadar rekreasi singkat. Setiap kegiatan dilengkapi sesi debriefing reflektif, laporan evaluasi performa tim, dan dokumen SPJ resmi.',
    icon: Award,
  },
  {
    title: 'Zero Accident & Plan B Cuaca',
    description: 'Penerapan protokol keselamatan ketat, kesiapan medis lapangan, serta jaminan skenario cadangan indoor/pendopo tanpa biaya tambahan jika turun hujan.',
    icon: ShieldCheck,
  },
];

export default function Approach() {
  return (
    <section id="approach" className="py-20 md:py-32 bg-paper border-y border-rule overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <ScrollReveal delay={0} duration={0.8} yOffset={20} className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-ink mb-4 tracking-tight">
            4 Pilar Keunggulan Metodologi
          </h2>
          <p className="text-muted text-base md:text-lg">
            Standar kualitas kurikulum, keselamatan lapangan, dan akuntabilitas administrasi di setiap program.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {PILLARS.map((pillar, idx) => (
            <ScrollReveal
              key={idx}
              delay={0.1 + idx * 0.1}
              duration={0.6}
              yOffset={20}
              className="group relative bg-white p-8 md:p-10 rounded-3xl border border-rule transition-[transform,border-color,box-shadow] duration-200 hover:-translate-y-1 hover:shadow-md hover:border-brand-border cursor-default"
            >
              <div className="flex items-start gap-3.5 mb-4 pb-4 border-b border-rule">
                <pillar.icon className="w-6 h-6 text-brand-dark shrink-0 mt-1" aria-hidden="true" />
                <h3 className="font-display text-xl md:text-2xl font-extrabold text-ink group-hover:text-brand-dark transition-colors duration-200 tracking-tight">
                  {pillar.title}
                </h3>
              </div>
              <p className="text-muted leading-relaxed font-medium text-sm md:text-base">
                {pillar.description}
              </p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
