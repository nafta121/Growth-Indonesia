import { Badge } from '@/components/ui/badge';
import ServicesTabs from '@/components/services-tabs';
import ScrollReveal from '@/components/ui/scroll-reveal';

const SERVICES = {
  training: [
    { title: 'Outbound Training & Team Building Corporate', desc: 'Membangun kekompakan dan kepemimpinan melalui simulasi alam yang menantang & berstandar BNSP.' },
    { title: 'Indoor Corporate Training & Capacity Building', desc: 'Peningkatan kompetensi manajerial dalam lingkungan belajar yang intensif dan aplikatif.' },
    { title: 'Motivational & Soft Skill Classes', desc: 'Menanamkan mindset positif dan semangat juang tinggi bagi tim Anda.' },
    { title: 'Training of Trainer (ToT) Sertifikasi', desc: 'Mempersiapkan internal trainer perusahaan dengan standar profesional BNSP.' },
    { title: 'Kemah Besar & LDK OSIS Leadership', desc: 'Program khusus pembentukan karakter, kedisiplinan, dan jiwa kepemimpinan siswa.' },
    { title: 'Character Building & High Performance Team', desc: 'Membentuk integritas, adaptabilitas, dan etos kerja selaras dengan target perusahaan.' },
  ],
  entertainment: [
    { title: 'Fun Outbound & Ice Breaking Games', desc: 'Momen seru yang interaktif untuk mencairkan suasana dan menyegarkan pikiran tim.' },
    { title: 'Event Organizer & Corporate Gathering Madiun', desc: 'Apresiasi dan perayaan kebersamaan untuk mempererat ikatan kekeluargaan perusahaan.' },
    { title: 'Family Gathering & Anniversary Celebration', desc: 'Perayaan spesial untuk keluarga besar karyawan dan hari jadi instansi/perusahaan.' },
    { title: 'Fun Adventure, Rafting & Outing', desc: 'Petualangan luar ruangan yang menyenangkan untuk melepas penat rutinitas kerja.' },
    { title: 'Custom Fun Trip & Wisata Edukasi', desc: 'Perjalanan wisata yang dipersonalisasi sesuai keinginan dan budget kelompok Anda.' },
    { title: 'Event Organizer & Management Professional', desc: 'Manajemen acara yang detail dan terorganisir penuh untuk kesuksesan event Anda.' },
  ],
};

export default function Services() {
  return (
    <section id="layanan" className="py-20 md:py-32 bg-[#0A1628] relative overflow-hidden" aria-labelledby="layanan-title">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EF4444]/5 skew-x-12 translate-x-32 hidden md:block" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <ScrollReveal delay={0} duration={0.8} yOffset={20} className="text-center max-w-3xl mx-auto mb-12 md:mb-20">
          <Badge variant="dark" className="mb-4">Program Unggulan Growth Indonesia</Badge>
          <h2 id="layanan-title" className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
            Layanan <span className="text-[#EF4444]">Provider Outbound & Event Organizer</span> Madiun
          </h2>
        </ScrollReveal>

        <ServicesTabs services={SERVICES} />
      </div>
    </section>
  );
}
