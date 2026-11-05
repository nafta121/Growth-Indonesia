import ScrollReveal from '@/components/ui/scroll-reveal';

const MISSIONS = [
  'Menyusun kurikulum pelatihan SDM berbasis Training Need Analysis (TNA) dan metode Experiential Learning yang berdampak nyata pada kinerja tim.',
  'Membangun sinergi lintas divisi, kepemimpinan manajerial, dan karakter disiplin bagi BUMN, instansi pemerintah, korporasi swasta, serta institusi pendidikan.',
  'Menjamin standar keselamatan lapangan (Zero Accident Policy) dan kesiapan skenario cadangan (Plan B) di setiap lokasi kegiatan Jawa Timur.',
  'Memberikan ketenangan bagi panitia dan HRD melalui transparansi anggaran, kelengkapan dokumen SPJ, serta laporan evaluasi performa tim pasca-acara.',
];

export default function AboutUs() {
  return (
    <section id="tentang" className="py-20 md:py-32 bg-white overflow-hidden" aria-labelledby="tentang-title">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Vision Section */}
          <ScrollReveal delay={0} duration={0.8} xOffset={-30} yOffset={0}>
            <h2 id="tentang-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-ink leading-[1.1] mb-8">
              Membangun Kualitas SDM Unggul &amp; Bermental Positif
            </h2>
            <div className="relative p-8 rounded-3xl bg-paper border border-rule mb-8 overflow-hidden">
              <p className="italic font-medium text-ink-2 text-lg leading-relaxed relative z-10">
                &ldquo;Terbaik dan terpercaya dalam layanan training &amp; development untuk mewujudkan kualitas SDM yang unggul dan bersikap mental positif.&rdquo;
              </p>
            </div>
          </ScrollReveal>

          {/* Mission Section */}
          <ScrollReveal 
            delay={0.2} 
            duration={0.8} 
            xOffset={30} 
            yOffset={0}
            className="mt-12 lg:mt-0 bg-navy p-8 md:p-12 lg:p-16 rounded-[2.5rem] text-white shadow-lg border border-navy-border relative overflow-hidden"
          >
            <h3 className="font-display text-2xl md:text-3xl font-black text-white mb-6">Misi Utama Kami</h3>
            <ul className="space-y-6 md:space-y-8">
              {MISSIONS.map((mission, idx) => (
                <li key={idx}>
                  <ScrollReveal
                    delay={0.4 + idx * 0.1}
                    yOffset={10}
                    className="flex gap-4 items-start group/item"
                  >
                    <div className="mt-0.5 shrink-0 bg-navy-2 border border-navy-border text-white rounded-full w-8 h-8 flex items-center justify-center font-bold num">
                      {idx + 1}
                    </div>
                    <p className="text-navy-muted text-base md:text-lg leading-relaxed font-medium group-hover/item:text-white transition-colors duration-200">{mission}</p>
                  </ScrollReveal>
                </li>
              ))}
            </ul>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
