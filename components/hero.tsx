import { MessageCircle, ShieldCheck, Award } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { COMPANY_INFO } from '@/lib/constants';

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-[100dvh] flex items-center overflow-hidden bg-navy pt-24 pb-16 md:pt-28 md:pb-24"
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
        <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Stage Headline, <= 12-word Subtext, Dual CTAs, Field Ledger */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.06] tracking-tight mb-6 animate-fade-in text-balance">
              Outbound Korporat &amp; Event Organizer Madiun
            </h1>

            <p className="text-navy-muted text-base sm:text-lg md:text-xl font-medium max-w-[52ch] leading-relaxed mb-8 animate-fade-in [animation-delay:60ms] text-pretty">
              Pelatihan experiential learning, team building, dan gathering instansi dengan standar keselamatan lapangan.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto animate-fade-in [animation-delay:120ms]">
              <Button
                asChild
                size="lg"
                className="bg-whatsapp-dark hover:bg-whatsapp-hover text-white border-0 shadow-md transition-[transform,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group text-sm md:text-base h-14 px-8 rounded-xl whitespace-nowrap active:scale-[0.98] focus-visible:ring-whatsapp"
              >
                <Link href={`https://wa.me/${COMPANY_INFO.whatsapp_number}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="w-5 h-5 mr-2 shrink-0" />
                  Konsultasi via WhatsApp
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="bg-navy-2 border border-navy-border text-white hover:bg-navy hover:border-brand hover:text-white transition-[transform,background-color,border-color,color] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] text-sm md:text-base h-14 px-8 rounded-xl group whitespace-nowrap active:scale-[0.98]"
              >
                <Link href="#paket">
                  Lihat Paket Program
                </Link>
              </Button>
            </div>

            {/* Field Operations Ledger */}
            <dl className="mt-10 pt-8 border-t border-navy-border grid grid-cols-3 gap-6 w-full max-w-lg">
              <div>
                <dt className="text-xs font-medium text-navy-muted">Rekam Jejak</dt>
                <dd className="font-display text-2xl sm:text-3xl font-black text-white mt-1 num">250+ Klien</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-navy-muted">Kapasitas Alumni</dt>
                <dd className="font-display text-2xl sm:text-3xl font-black text-white mt-1 num">15.000+ Pax</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-navy-muted">Kantor Operasional</dt>
                <dd className="font-display text-2xl sm:text-3xl font-black text-white mt-1">Madiun, Jatim</dd>
              </div>
            </dl>
          </div>

          {/* Right Column: Framed Field Photography Asset + External Caption Bar */}
          <div className="lg:col-span-5 w-full">
            <figure className="rounded-3xl overflow-hidden border border-navy-border bg-navy-2 shadow-md">
              <div className="relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/4]">
                <Image
                  src="https://nafta121.sirv.com/OUTBOUND/2022-11-05%2009-09-46.jpeg"
                  alt="Dokumentasi Sesi Team Building & Outbound Training Korporat bersama Fasilitator Growth Indonesia"
                  fill
                  priority={true}
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <figcaption className="p-4 bg-navy border-t border-navy-border flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-navy-2 border border-navy-border flex items-center justify-center text-brand shrink-0">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Zero Accident Policy</p>
                    <p className="text-xs text-navy-muted">SOP Keamanan &amp; Medis Lapangan</p>
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-navy-2 border border-navy-border text-xs font-bold text-white shrink-0 num">
                  <Award className="w-4 h-4 text-brand" />
                  <span>250+ Instansi</span>
                </div>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
}
