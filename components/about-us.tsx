'use client';

import { motion } from 'motion/react';

const MISSIONS = [
  'Menyediakan layanan pengembangan SDM yang profesional dan kreatif.',
  'Membangun budaya berkelanjutan dengan sikap positif.',
  'Menciptakan layanan yang saling mendukung untuk pengalaman terbaik bagi pelanggan.',
  'Membangun relasi positif untuk sinergi dan kolaborasi, mengutamakan pelayanan yang melebihi harapan pelanggan.',
];

export default function AboutUs() {
  return (
    <section id="tentang" className="py-24 bg-white overflow-hidden" aria-labelledby="tentang-title">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Vision Section */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block mb-4 text-[#EF4444] font-bold uppercase tracking-widest text-xs">Vision</span>
            <h2 id="tentang-title" className="font-display text-4xl md:text-5xl font-black text-gray-900 leading-tight mb-8">
              Membangun Kualitas <span className="text-[#EF4444]">SDM Unggul</span> & Bermental Positif.
            </h2>
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed">
              &quot;Terbaik dan terpercaya dalam layanan training & development untuk mewujudkan kualitas SDM yang unggul dan bersikap mental positif.&quot;
            </p>
          </motion.div>

          {/* Mission Section */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-gray-50 p-8 md:p-12 rounded-3xl border border-gray-100"
          >
            <span className="inline-block mb-4 text-[#EF4444] font-bold uppercase tracking-widest text-xs">Mission</span>
            <ul className="space-y-4">
              {MISSIONS.map((mission, idx) => (
                <motion.li
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.1 }}
                  className="flex gap-4 items-start group"
                >
                  <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-[#EF4444] shrink-0 group-hover:scale-150 transition-transform" />
                  <p className="text-gray-600 text-lg leading-relaxed">{mission}</p>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
