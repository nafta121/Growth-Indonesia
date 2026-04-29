'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'training', label: 'TRAINING & DEVELOPMENT' },
  { id: 'entertainment', label: 'NON-TRAINING & ENTERTAINING' },
] as const;

export default function ServicesTabs({ services }: { services: Record<string, { title: string, desc: string }[]> }) {
  const [activeTab, setActiveTab] = useState<typeof CATEGORIES[number]['id']>('training');

  return (
    <>
      <div className="relative flex flex-col sm:flex-row p-1.5 bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-white/10 w-full max-w-2xl mx-auto mb-12 md:mb-20">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className={cn(
              "relative z-10 flex-1 py-4 md:py-5 px-6 text-xs md:text-sm font-bold tracking-[0.15em] transition-all duration-300 rounded-xl md:rounded-2xl focus:outline-none uppercase active:scale-95",
              activeTab === cat.id ? "text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
            )}
          >
            {cat.label}
            {activeTab === cat.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#EF4444] rounded-xl md:rounded-2xl -z-10 shadow-[0_0_20px_rgba(239,68,68,0.3)]"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {services[activeTab].map((item, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                className="group relative flex flex-col p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-[#EF4444]/30 hover:bg-white/[0.08] transition-all duration-500 overflow-hidden active:scale-[0.98] cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center text-[#EF4444] mb-6 group-hover:bg-[#EF4444] group-hover:text-white transition-all duration-500 shadow-lg shadow-black/20">
                  {activeTab === 'training' ? <Star className="w-7 h-7" /> : <Sparkles className="w-7 h-7" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#EF4444] transition-colors duration-300">{item.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{item.desc}</p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="w-2 h-2 bg-[#EF4444] rounded-full animate-pulse" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
