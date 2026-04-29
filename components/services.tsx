import { Badge } from '@/components/ui/badge';
import ServicesTabs from '@/components/services-tabs';
import ScrollReveal from '@/components/ui/scroll-reveal';

const SERVICES = {
  training: [
    { title: 'OUTBOUND TRAINING & TEAM BUILDING', desc: 'Membangun kekompakan dan kepemimpinan melalui simulasi alam yang menantang.' },
    { title: 'INDOOR CORPORATE TRAINING', desc: 'Peningkatan kompetensi manajerial dalam lingkungan belajar yang intensif.' },
    { title: 'MOTIVATIONAL & SOFT SKILL CLASSES', desc: 'Menanamkan mindset positif dan semangat juang tinggi bagi tim Anda.' },
    { title: 'Training of Trainer (ToT)', desc: 'Mempersiapkan internal trainer perusahaan dengan standar profesional.' },
    { title: 'Educational & Academic Training', desc: 'Program khusus untuk institusi pendidikan dan pengembangan karakter siswa.' },
    { title: 'Character Building Workshops', desc: 'Membentuk integritas dan etos kerja yang selaras dengan nilai perusahaan.' },
  ],
  entertainment: [
    { title: 'FUN OUTBOUND & ICE BREAKING', desc: 'Momen seru yang interaktif untuk mencairkan suasana dan menyegarkan pikiran.' },
    { title: 'EMPLOYEE & CORPORATE GATHERING', desc: 'Apresiasi dan perayaan kebersamaan untuk mempererat ikatan kekeluargaan perusahaan.' },
    { title: 'Family Gathering & Anniversary', desc: 'Perayaan spesial untuk keluarga besar karyawan dan hari jadi perusahaan.' },
    { title: 'Fun Adventure & Outing', desc: 'Petualangan luar ruangan yang menyenangkan untuk melepas penat rutinitas.' },
    { title: 'Custom Fun Trip & Travel', desc: 'Perjalanan wisata yang dipersonalisasi sesuai keinginan kelompok Anda.' },
    { title: 'Professional Event Organizer', desc: 'Manajemen acara yang detail dan terorganisir untuk kesuksesan event Anda.' },
  ],
};

export default function Services() {
  return (
    <section id="layanan" className="py-20 md:py-32 bg-[#0A1628] relative overflow-hidden" aria-labelledby="layanan-title">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EF4444]/5 skew-x-12 translate-x-32 hidden md:block" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <ScrollReveal delay={0} duration={0.8} yOffset={20} className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <Badge variant="dark" className="mb-4">Excellence in Execution</Badge>
          <h2 id="layanan-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Our <span className="text-white/40">Services</span>
          </h2>
        </ScrollReveal>

        <ServicesTabs services={SERVICES} />
      </div>
    </section>
  );
}
