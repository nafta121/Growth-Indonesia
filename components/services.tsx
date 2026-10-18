import { Users, Compass, Presentation, Map, CalendarCheck } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ServicesTabs from '@/components/services-tabs';
import ScrollReveal from '@/components/ui/scroll-reveal';

export const servicesData = [
  {
    icon: Users,
    title: "Outbound & Team Building Korporat",
    description:
      "Simulasi kolaborasi berbasis Experiential Learning untuk mencairkan sekat komunikasi antar-divisi, membangun kepercayaan tim, dan menyelaraskan budaya kerja di BUMN, instansi pemerintah, maupun perusahaan swasta.",
  },
  {
    icon: Compass,
    title: "LDK OSIS, MPK & Character Building",
    description:
      "Kurikulum kepemimpinan pelajar dan mahasiswa yang terstruktur untuk membentuk kedisiplinan, tanggung jawab organisasi, komunikasi publik, serta ketangguhan mental generasi muda.",
  },
  {
    icon: Presentation,
    title: "Indoor Training & Capacity Building SDM",
    description:
      "Pelatihan intensif di dalam ruangan (in-house training) yang berfokus pada kepemimpinan manajerial, pelayanan prima (service excellence), pemecahan masalah, dan motivasi kerja terukur.",
  },
  {
    icon: Map,
    title: "Corporate Outing & Wisata Edukasi Terpadu",
    description:
      "Rangkaian perjalanan penyegaran karyawan (company outing) dan kunjungan edukatif dengan skenario permainan kelompok yang mempererat keakraban di destinasi unggulan Jawa Timur.",
  },
  {
    icon: CalendarCheck,
    title: "Manajemen Acara & Family Gathering",
    description:
      "Pengelolaan acara menyeluruh (end-to-end event organizer) mulai dari perancangan konsep, seleksi venue dan katering, panggung hiburan, hingga dokumentasi sinematik dan pengamanan medis.",
  },
];

const SERVICES = {
  training: [
    {
      title: servicesData[0].title,
      desc: servicesData[0].description,
    },
    {
      title: servicesData[2].title,
      desc: servicesData[2].description,
    },
    {
      title: 'Kelas Motivasi Kerja & Komunikasi Efektif',
      desc: 'Penyelarasan pola pikir bertumbuh, etos pelayanan prima, dan komunikasi lintas fungsi bagi staf hingga jajaran supervisor.',
    },
    {
      title: 'Pelatihan Fasilitator Internal (Training of Trainer)',
      desc: 'Pembekalan metode fasilitasi dan pengelolaan dinamika kelompok bagi tim HRD serta instruktur internal perusahaan.',
    },
    {
      title: servicesData[1].title,
      desc: servicesData[1].description,
    },
    {
      title: 'Pembentukan Karakter & Tim Berkinerja Tinggi',
      desc: 'Program penguatan integritas, adaptabilitas perubahan, dan akuntabilitas eksekusi yang selaras dengan indikator kinerja utama instansi.',
    },
  ],
  entertainment: [
    {
      title: 'Simulasi Keakraban & Pencairan Suasana (Ice Breaking)',
      desc: 'Permainan kelompok interaktif berenergi tinggi untuk menyegarkan fokus peserta dan meruntuhkan kekakuan komunikasi.',
    },
    {
      title: servicesData[4].title,
      desc: servicesData[4].description,
    },
    {
      title: 'Apresiasi Karyawan & Perayaan Hari Jadi Instansi',
      desc: 'Penyelenggaraan malam keakraban, penghargaan masa kerja, dan perayaan ulang tahun perusahaan dengan tata panggung berkesan.',
    },
    {
      title: 'Petualangan Alam, Arung Jeram & Jelajah Offroad',
      desc: 'Aktivitas luar ruang berstandar keselamatan ketat di jalur sungai dan pegunungan Jawa Timur untuk melepas kejenuhan kerja.',
    },
    {
      title: servicesData[3].title,
      desc: servicesData[3].description,
    },
    {
      title: 'Pengelolaan Logistik, Venue & Dokumentasi Acara',
      desc: 'Koordinasi teknis menyeluruh mencakup akomodasi hotel, transportasi bus pariwisata, konsumsi, serta dokumentasi foto dan video drone.',
    },
  ],
};

export default function Services() {
  return (
    <section id="layanan" className="py-20 md:py-32 bg-[#0A1628] relative overflow-hidden" aria-labelledby="services-title">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EF4444]/5 skew-x-12 translate-x-32 hidden md:block" />
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <ScrollReveal delay={0} duration={0.8} yOffset={20} className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <Badge variant="dark" className="mb-4">Program Unggulan Growth Indonesia</Badge>
          <h2 id="services-title" className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Layanan <span className="text-[#EF4444]">Provider Outbound & Event Organizer</span> Madiun
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
            Setiap program disusun secara presisi melalui tahapan <em>Training Need Analysis (TNA)</em> bersama komite atau HRD Anda, dipandu oleh Master Trainer & Praktisi Experiential Learning Berpengalaman (Naftalyndho & Juprianto), serta dilengkapi laporan evaluasi pasca-kegiatan yang terukur.
          </p>
        </ScrollReveal>

        {/* 5 Pilar Kurikulum Utama (servicesData) */}
        <ScrollReveal delay={0.1} duration={0.8} yOffset={20} className="mb-16 md:mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 md:gap-5">
            {servicesData.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.title}
                  className="flex flex-col p-6 rounded-3xl bg-white/[0.04] border border-white/10 hover:border-[#EF4444]/40 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#EF4444]/15 text-[#EF4444] flex items-center justify-center mb-4 shrink-0">
                    <Icon className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2 leading-snug">
                    {service.title}
                  </h3>
                  <p className="text-slate-300 text-xs leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </ScrollReveal>

        <ServicesTabs services={SERVICES} />
      </div>
    </section>
  );
}

