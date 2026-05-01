import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-[#0A1628] py-20 md:py-32"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#EF4444]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <ScrollReveal
          delay={0}
          duration={1}
          className="max-w-5xl mx-auto flex flex-col items-center"
        >
          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[9rem] font-black text-white leading-[1.1] mb-8 md:mb-12 tracking-tighter uppercase sm:whitespace-nowrap lg:whitespace-normal">
            <Badge variant="dark" className="mb-4 md:mb-8 font-sans">Provider Outbound Madiun</Badge>
            <span className="block mt-4 relative">
              Let&apos;s Grow 
              <div 
                className="absolute -bottom-2 md:-bottom-4 left-0 h-1.5 md:h-2 bg-[#EF4444]/20 rounded-full w-full animate-pulse"
              />
            </span>
            <span className="text-[#EF4444] inline-block relative font-bold">Together!</span>
          </h1>

          {/* Subheadline */}
          <p className="text-slate-100 text-sm sm:text-base md:text-xl lg:text-2xl font-medium max-w-2xl mx-auto leading-relaxed mb-10 md:mb-16 px-4">
            Berdayakan potensi terbaik tim Anda melalui solusi pengembangan SDM, 
            modul pelatihan inovatif, dan program outbound strategis untuk menghadapi era digital.
          </p>

          {/* CTA Button */}
          <div className="flex justify-center items-center">
            <Button asChild size="lg" className="w-full sm:w-auto min-w-[280px] group">
              <Link href="#paket">
                Lihat Paket Program
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* Scroll Indicator */}
      <ScrollReveal
        delay={2}
        duration={1}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none"
      >
        <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
      </ScrollReveal>
    </section>
  );
}
