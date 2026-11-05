'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Star, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const CATEGORIES = [
  { id: 'training', label: 'Pelatihan & Pengembangan SDM', shortLabel: 'Pelatihan SDM' },
  { id: 'entertainment', label: 'Gathering & Hiburan Korporat', shortLabel: 'Gathering' },
] as const;

export default function ServicesTabs({ services }: { services: Record<string, { title: string, desc: string }[]> }) {
  const [activeTab, setActiveTab] = useState<typeof CATEGORIES[number]['id']>('training');
  const shouldReduceMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleTabKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      nextIndex = (index + 1) % CATEGORIES.length;
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      nextIndex = (index - 1 + CATEGORIES.length) % CATEGORIES.length;
    } else if (e.key === 'Home') {
      nextIndex = 0;
    } else if (e.key === 'End') {
      nextIndex = CATEGORIES.length - 1;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const nextCategory = CATEGORIES[nextIndex];
      setActiveTab(nextCategory.id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <>
      <div
        role="tablist"
        aria-label="Kategori Layanan Growth Indonesia"
        className="relative flex flex-nowrap overflow-x-auto p-1.5 bg-navy-2 rounded-2xl md:rounded-3xl border border-navy-border w-full max-w-2xl mx-auto mb-12 md:mb-20 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] snap-x snap-mandatory"
      >
        {CATEGORIES.map((cat, index) => (
          <button
            key={cat.id}
            ref={(el) => {
              tabRefs.current[index] = el;
            }}
            id={`tab-${cat.id}`}
            role="tab"
            type="button"
            tabIndex={activeTab === cat.id ? 0 : -1}
            aria-selected={activeTab === cat.id}
            aria-controls={`tabpanel-${cat.id}`}
            onClick={() => setActiveTab(cat.id)}
            onKeyDown={(e) => handleTabKeyDown(e, index)}
            className={cn(
              "relative z-10 flex-1 min-w-fit min-h-12 shrink-0 snap-center py-4 md:py-5 px-6 text-sm md:text-base font-bold transition-[color,background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] rounded-xl md:rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus whitespace-nowrap active:scale-[0.98]",
              activeTab === cat.id ? "text-white" : "text-navy-muted hover:bg-navy hover:text-white"
            )}
          >
            <span className="sm:hidden">{cat.shortLabel}</span>
            <span className="hidden sm:inline">{cat.label}</span>
            {activeTab === cat.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-brand-dark rounded-xl md:rounded-2xl -z-10 shadow-sm"
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
                className="group relative flex flex-col p-8 rounded-3xl bg-navy-2 border border-navy-border hover:border-brand/40 [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 transition-[transform,background-color,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] overflow-hidden cursor-default"
              >
                <div className="flex items-start gap-3.5 mb-3">
                  <span className="mt-1 text-brand shrink-0">
                    {activeTab === 'training' ? <Star className="w-5 h-5" aria-hidden="true" /> : <Sparkles className="w-5 h-5" aria-hidden="true" />}
                  </span>
                  <h3 className="text-xl font-bold text-white tracking-tight group-hover:text-brand transition-colors duration-200">{item.title}</h3>
                </div>
                <p className="text-navy-muted text-sm leading-relaxed mb-4">{item.desc}</p>
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <div className="w-2 h-2 bg-brand rounded-full" />
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </>
  );
}
