'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'training', label: 'TRAINING & DEVELOPMENT', shortLabel: 'TRAINING' },
  { id: 'entertainment', label: 'NON-TRAINING & ENTERTAINING', shortLabel: 'ENTERTAINING' },
] as const;

export default function ServicesTabs({ services }: { services: Record<string, { title: string, desc: string }[]> }) {
  const [activeTab, setActiveTab] = useState<typeof CATEGORIES[number]['id']>('training');
  const shouldReduceMotion = useReducedMotion();

  return (
    <>
      <div
        role="tablist"
        aria-label="Kategori Layanan Growth Indonesia"
        className="relative flex flex-nowrap overflow-x-auto p-1.5 bg-white/5 backdrop-blur-sm rounded-2xl md:rounded-3xl border border-white/10 w-full max-w-2xl mx-auto mb-12 md:mb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            id={`tab-${cat.id}`}
            role="tab"
            type="button"
            aria-selected={activeTab === cat.id}
            aria-controls={`tabpanel-${cat.id}`}
            onClick={() => setActiveTab(cat.id)}
            className={cn(
              "relative z-10 flex-1 min-w-fit min-h-12 shrink-0 snap-center py-4 md:py-5 px-6 text-xs md:text-sm font-bold tracking-[0.15em] transition-[color,background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-xl md:rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#EF4444] uppercase active:scale-[0.98]",
              activeTab === cat.id ? "text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
            )}
          >
            <span className="sm:hidden">{cat.shortLabel}</span>
            <span className="hidden sm:inline">{cat.label}</span>
            {activeTab === cat.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-[#DC2626] rounded-xl md:rounded-2xl -z-10 shadow-[0_0_20px_rgba(220,38,38,0.35)]"
                transition={{ type: "spring", bounce: 0.15, duration: 0.25 }}
              />
            )}
          </button>
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            id={`tabpanel-${activeTab}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeTab}`}
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(8px)' }}
            animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, transform: 'translateY(0px)' }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'translateY(-6px)' }}
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
          >
            {services[activeTab].map((item, idx) => (
              <div 
                key={idx}
                className="group relative flex flex-col p-8 rounded-3xl bg-white/5 border border-white/5 hover:border-[#EF4444]/30 hover:bg-white/[0.08] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 transition-[transform,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#EF4444]/10 flex items-center justify-center text-[#EF4444] mb-6 group-hover:bg-[#EF4444] group-hover:text-white transition-colors duration-200 ease-out shadow-lg shadow-black/20">
                  {activeTab === 'training' ? <Star className="w-7 h-7" /> : <Sparkles className="w-7 h-7" />}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-[#EF4444] transition-colors duration-200">{item.title}</h3>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">{item.desc}</p>
                </div>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-2 h-2 bg-[#EF4444] rounded-full" />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
