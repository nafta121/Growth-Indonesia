import { ChevronDown, MessageCircle, Star } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
  return (
    <section 
      id="hero" 
      className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-navy py-20 md:py-32"
    >
      {/* Background Decor */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] animate-pulse delay-700" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 text-center">
        <div className="max-w-5xl mx-auto flex flex-col items-center">
          {/* Headline */}
          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.2] mb-6 md:mb-8 tracking-tight opacity-0 animate-fade-in">
            <Badge variant="dark" className="mb-4 md:mb-8 font-sans">Provider Outbound Profesional</Badge>
            <span className="block mt-4 relative">
              Transformasi SDM Perusahaan Melalui
            </span>
            <span className="text-brand inline-block relative font-bold">
              Program Outbound Terukur
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-slate-100 text-sm sm:text-base md:text-lg lg:text-xl font-medium max-w-3xl mx-auto leading-relaxed mb-10 md:mb-12 px-4 opacity-0 animate-fade-in delay-200">
            Fasilitator bersertifikat BNSP, transparan harga, dan dipercaya oleh 100+ perusahaan BUMN & Swasta.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 w-full sm:w-auto px-6 sm:px-0 opacity-0 animate-fade-in delay-[400ms] mb-12">
            <Button asChild size="lg" className="w-full sm:w-auto min-w-[260px] group text-sm md:text-base h-14 rounded-xl">
              <Link href="#kontak">
                Dapatkan Proposal & RAB
                <svg className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto min-w-[260px] bg-transparent border-white/20 text-white hover:bg-white/10 transition-colors text-sm md:text-base h-14 rounded-xl">
              <Link href="https://wa.me/6285704748186" target="_blank" rel="noopener noreferrer">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat via WhatsApp
              </Link>
            </Button>
          </div>

          {/* Trust Signals */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 opacity-0 animate-fade-in delay-[600ms] px-4">
            <div className="flex text-yellow-400 shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 md:w-5 md:h-5 fill-current" />
              ))}
            </div>
            <span className="text-xs sm:text-sm md:text-base font-medium text-slate-300 text-center">
              Dipercaya 250+ Perusahaan & Instansi Nasional
            </span>
          </div>
        </div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 z-1 pointer-events-none opacity-[0.03]" 
           style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 pointer-events-none opacity-0 animate-[fade-in_1s_ease-out_forwards] delay-[1s]">
        <ChevronDown className="w-6 h-6 text-gray-400 animate-bounce" />
      </div>
    </section>
  );
}
