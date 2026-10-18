import { MessageCircle, ShieldCheck, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-navy pt-24 pb-16 md:pt-24 md:pb-20"
    >
      {/* Subtle Ambient Backdrop */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg"
          alt="Peserta Corporate Outbound dan Team Building Growth Indonesia di Madiun Jawa Timur"
          fill
          priority={true}
          fetchPriority="high"
          sizes="100vw"
          className="object-cover opacity-15 pointer-events-none"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A1628] via-[#0A1628]/95 to-[#0A1628]/75" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: 4-Element Hero Stack (Eyebrow, Headline, Subtext <= 20 words, CTAs) */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <Badge variant="dark" className="mb-6 font-sans">
              Provider Outbound & EO Korporat
            </Badge>

            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.08] tracking-tight mb-6 opacity-0 animate-fade-in text-balance">
              Event Organizer Madiun &{' '}
              <span className="text-brand block mt-1">
                Provider Outbound Korporat
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg md:text-xl font-medium max-w-[54ch] leading-relaxed mb-8 opacity-0 animate-fade-in delay-200 text-pretty">
              Mitra strategis outbound training, team building, dan corporate gathering berpengalaman dengan metode experiential learning serta Zero Accident Policy.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto opacity-0 animate-fade-in delay-[400ms]">
              <Button
                asChild
                size="lg"
                className="bg-[#15803D] hover:bg-[#166534] text-white border-0 shadow-lg hover:shadow-xl transition-all group text-sm md:text-base h-14 px-8 rounded-xl whitespace-nowrap active:scale-[0.98] focus-visible:ring-[#25D366]"
              >
                <Link href="https://wa.me/6285704748186" target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2 shrink-0" />
                  Konsultasi via WhatsApp
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-white/5 border border-white/25 text-white hover:bg-white/15 hover:text-white transition-colors text-sm md:text-base h-14 px-8 rounded-xl group whitespace-nowrap active:scale-[0.98]"
              >
                <Link href="#paket">
                  Lihat Paket Program
                </Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Framed Field Photography Asset */}
          <div className="lg:col-span-5 w-full">
            <div className="relative rounded-3xl overflow-hidden border border-white/15 bg-slate-900/60 shadow-2xl aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/5]">
              <Image
                src="https://nafta121.sirv.com/OUTBOUND/2022-11-05%2009-09-46.jpeg"
                alt="Dokumentasi Sesi Team Building & Outbound Training Korporat bersama Fasilitator Growth Indonesia"
                fill
                priority={true}
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-[#0A1628]/85 backdrop-blur-md border border-white/10 flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-brand/20 border border-brand/30 flex items-center justify-center text-brand shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Zero Accident Policy</p>
                    <p className="text-[11px] text-slate-300">SOP Keamanan & Medis Lapangan</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 text-xs font-bold text-white shrink-0">
                  <Award className="w-4 h-4 text-brand" />
                  <span>250+ Klien</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

