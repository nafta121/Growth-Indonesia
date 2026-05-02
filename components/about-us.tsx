import ScrollReveal from '@/components/ui/scroll-reveal';
import { Badge } from '@/components/ui/badge';

const MISSIONS = [
  'Menyediakan layanan pengembangan SDM yang profesional dan kreatif.',
  'Membangun budaya berkelanjutan dengan sikap positif.',
  'Menciptakan layanan yang saling mendukung untuk pengalaman terbaik bagi pelanggan.',
  'Membangun relasi positif untuk sinergi dan kolaborasi, mengutamakan pelayanan yang melebihi harapan pelanggan.',
];

export default function AboutUs() {
  return (
    <section id="tentang" className="py-20 md:py-32 bg-white overflow-hidden" aria-labelledby="tentang-title">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Vision Section */}
          <ScrollReveal delay={0} duration={0.8} xOffset={-30} yOffset={0}>
            <Badge className="mb-4">Vision</Badge>
            <h2 id="tentang-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 leading-[1.1] mb-8">
              Membangun Kualitas <span className="text-[#EF4444]">SDM Unggul</span> & Bermental Positif.
            </h2>
            <div className="relative p-8 rounded-3xl bg-gray-50 border-l-4 border-[#EF4444] mb-8 group overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity">
                <span className="font-display text-8xl font-black italic">GROW</span>
              </div>
              <p className="italic font-medium text-gray-700 text-lg leading-relaxed relative z-10">
                &quot;Terbaik dan terpercaya dalam layanan training & development untuk mewujudkan kualitas SDM yang unggul dan bersikap mental positif.&quot;
              </p>
            </div>
          </ScrollReveal>

          {/* Mission Section */}
          <ScrollReveal 
            delay={0.2} 
            duration={0.8} 
            xOffset={30} 
            yOffset={0}
            className="mt-12 lg:mt-0 bg-[#0A1628] p-8 md:p-12 lg:p-16 rounded-[2.5rem] md:rounded-[4rem] text-white shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#EF4444]/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <Badge variant="dark" className="mb-4">Mission</Badge>
            <ul className="space-y-6 md:space-y-8">
              {MISSIONS.map((mission, idx) => (
                <li key={idx}>
                  <ScrollReveal
                    delay={0.4 + idx * 0.1}
                    yOffset={10}
                    className="flex gap-4 items-start group/item"
                  >
                    <div className="mt-0.5 shrink-0 bg-slate-800 text-red-500 rounded-full w-8 h-8 flex items-center justify-center font-bold">
                      {idx + 1}
                    </div>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed font-medium group-hover/item:text-white transition-colors duration-300">{mission}</p>
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
