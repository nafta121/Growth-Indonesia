'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'training', label: 'TRAINING & DEVELOPMENT' },
  { id: 'entertainment', label: 'NON-TRAINING & ENTERTAINING' },
] as const;

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
  const [activeTab, setActiveTab] = useState<typeof CATEGORIES[number]['id']>('training');

  return (
    <section id="layanan" className="py-24 bg-[#0A1628] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-[#EF4444]/5 skew-x-12 translate-x-20" />
      
      <div className="container mx-auto px-4 md:px-12 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block mb-3 text-[#EF4444] font-bold uppercase tracking-[0.2em] text-xs">Excellence in Execution</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-8 uppercase tracking-tight">Our Services</h2>
          
          {/* Category Toggle */}
          <div className="relative inline-flex p-1.5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 w-full max-w-2xl mx-auto">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={cn(
                  "relative z-10 flex-1 py-4 px-4 text-xs md:text-sm font-bold tracking-widest transition-colors duration-300 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#EF4444]",
                  activeTab === cat.id ? "text-white" : "text-gray-300 hover:text-white"
                )}
              >
                {cat.label}
                {activeTab === cat.id && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-[#EF4444] rounded-xl -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {SERVICES[activeTab].map((item, idx) => (
                <div 
                  key={idx}
                  className="group flex items-center gap-5 p-6 rounded-2xl bg-white/5 border border-white/5 hover:border-[#EF4444]/30 hover:bg-white/10 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#EF4444]/10 flex items-center justify-center text-[#EF4444] shrink-0 group-hover:scale-110 transition-transform">
                    {activeTab === 'training' ? <Star className="w-6 h-6" /> : <Sparkles className="w-6 h-6" />}
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-white mb-1 uppercase tracking-tight">{item.title}</h4>
                    <p className="text-gray-400 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
