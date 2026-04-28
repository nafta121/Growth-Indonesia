'use client';

import { motion } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A1628] pt-20"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#EF4444]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse delay-700" />
      </div>

      <div className="container relative z-10 mx-auto px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="max-w-5xl mx-auto"
        >
          {/* Headline */}
          <h1 className="font-display text-7xl md:text-8xl lg:text-[10rem] font-extrabold text-white leading-[0.9] mb-10 tracking-tighter">
            Let&apos;s Grow <br />
            <span className="text-[#EF4444]">Together!</span>
          </h1>

          {/* Subheadline */}
          <p className="text-gray-200 text-xl md:text-2xl font-medium md:max-w-3xl mx-auto leading-relaxed mb-12">
            Berdayakan potensi terbaik tim Anda melalui solusi pengembangan SDM, 
            modul pelatihan inovatif, dan program outbound strategis untuk menghadapi era digital.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center">
            <Link
              href="#paket"
              className={cn(
                "group relative overflow-hidden rounded-full bg-[#EF4444] px-10 py-5 text-lg font-bold text-white transition-all duration-300 uppercase tracking-widest shadow-xl",
                "hover:scale-[1.02] hover:shadow-[0_15px_30px_-5px_rgba(239,68,68,0.4)] active:scale-95 focus:outline-none focus:ring-2 focus:ring-[#EF4444] focus:ring-offset-2 focus:ring-offset-[#0A1628]"
              )}
            >
              <span className="relative z-10">
                Lihat Paket Program
              </span>
              <div className="absolute inset-0 h-full w-0 bg-white/10 transition-all duration-300 group-hover:w-full" />
            </Link>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        id="scroll-indicator"
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <Link href="#tentang" className="group flex flex-col items-center gap-3 focus:outline-none focus:ring-2 focus:ring-[#EF4444] rounded-full p-2">
          <div className="animate-editorial-bounce text-[#EF4444]">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m7 13 5 5 5-5"/><path d="m7 6 5 5 5-5"/>
            </svg>
          </div>
        </Link>
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />
    </section>
  );
}
