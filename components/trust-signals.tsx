import { Building2, Globe, GraduationCap, HardHat, Landmark, Ship, TowerControl as Tower, Truck, Quote } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CLIENTS = [
  { name: 'Petrokimia Gresik', icon: <HardHat className="w-5 h-5" />, color: 'text-green-600' },
  { name: 'Semen Indonesia', icon: <Building2 className="w-5 h-5" />, color: 'text-blue-700' },
  { name: 'Bank Jatim', icon: <Landmark className="w-5 h-5" />, color: 'text-red-600' },
  { name: 'Maspion Group', icon: <Globe className="w-5 h-5" />, color: 'text-blue-600' },
  { name: 'Kapal Api', icon: <Ship className="w-5 h-5" />, color: 'text-amber-900' },
  { name: 'PT KAI', icon: <Truck className="w-5 h-5" />, color: 'text-orange-600' },
  { name: 'Pertamina', icon: <Tower className="w-5 h-5" />, color: 'text-red-500' },
  { name: 'Universitas Brawijaya', icon: <GraduationCap className="w-5 h-5" />, color: 'text-blue-900' },
  { name: 'Wings Group', icon: <Building2 className="w-5 h-5" />, color: 'text-blue-500' },
  { name: 'Gudang Garam', icon: <Globe className="w-5 h-5" />, color: 'text-amber-600' },
  { name: 'PLN Persero', icon: <Tower className="w-5 h-5" />, color: 'text-cyan-600' },
  { name: 'WIKA', icon: <HardHat className="w-5 h-5" />, color: 'text-blue-800' },
];

const TESTIMONIALS = [
  {
    name: 'Budi Santoso',
    company: 'PT Maju Bersama',
    quote: (
      <>
        &quot;Growth Indonesia adalah <strong className="text-gray-900 font-bold">jasa outbound madiun</strong> terbaik yang pernah kami gunakan. Kegiatan team building mereka sangat efektif meningkatkan produktivitas tim.&quot;
      </>
    ),
    plainTextQuote: "Growth Indonesia adalah jasa outbound madiun terbaik yang pernah kami gunakan. Kegiatan team building mereka sangat efektif meningkatkan produktivitas tim."
  },
  {
    name: 'Siti Rahma',
    company: 'SMA Negeri 1 Madiun',
    quote: (
      <>
        &quot;Sebagai panitia, saya sangat terbantu dengan paket <strong className="text-gray-900 font-bold">LDK OSIS</strong> ini. Pengalaman <strong className="text-gray-900 font-bold">outbound madiun</strong> yang hebat untuk melatih kepemimpinan.&quot;
      </>
    ),
    plainTextQuote: "Sebagai panitia, saya sangat terbantu dengan paket LDK OSIS ini. Pengalaman outbound madiun yang hebat untuk melatih kepemimpinan."
  },
  {
    name: 'Andi Kusuma',
    company: 'Bank Jatim Ponorogo',
    quote: (
      <>
        &quot;Mencari provider <strong className="text-gray-900 font-bold">outbound ponorogo</strong> profesional ternyata mudah. Program corporate gathering dan team building berjalan luar biasa lancar.&quot;
      </>
    ),
    plainTextQuote: "Mencari provider outbound ponorogo profesional ternyata mudah. Program corporate gathering dan team building berjalan luar biasa lancar."
  },
  {
    name: 'Diana Wijaya',
    company: 'RS Karya Husada',
    quote: (
      <>
        &quot;Acara tahunan kami penuh semangat karena layanan <strong className="text-gray-900 font-bold">outbound magetan</strong> yang seru dan penuh insight. Tim instruktur berpengalaman!&quot;
      </>
    ),
    plainTextQuote: "Acara tahunan kami penuh semangat karena layanan outbound magetan yang seru dan penuh insight. Tim instruktur berpengalaman!"
  },
  {
    name: 'Wahyu Hidayat',
    company: 'Dinas Kehutanan Ngawi',
    quote: (
      <>
        &quot;Sangat merekomendasikan mereka untuk momen <strong className="text-gray-900 font-bold">outbound ngawi</strong>. Sinergi antar pegawai kuat setelah sesi capacity building dari mereka.&quot;
      </>
    ),
    plainTextQuote: "Sangat merekomendasikan mereka untuk momen outbound ngawi. Sinergi antar pegawai kuat setelah sesi capacity building dari mereka."
  },
  {
    name: 'Rina Marlina',
    company: 'Gudang Garam',
    quote: (
      <>
        &quot;Pengalaman <strong className="text-gray-900 font-bold">outbound kediri</strong> yang paling berkesan. Pendekatan experiential learning sangat aplikatif untuk memecahkan kebekuan antar divisi.&quot;
      </>
    ),
    plainTextQuote: "Pengalaman outbound kediri yang paling berkesan. Pendekatan experiential learning sangat aplikatif untuk memecahkan kebekuan antar divisi."
  },
  {
    name: 'Joko Prabowo',
    company: 'BPR Pacitan',
    quote: (
      <>
        &quot;Aktivitas <strong className="text-gray-900 font-bold">outbound pacitan</strong> dari fasilitator ahli ini membuat outing kami tak terlupakan, aman, dan memupuk semangat kebersamaan!&quot;
      </>
    ),
    plainTextQuote: "Aktivitas outbound pacitan dari fasilitator ahli ini membuat outing kami tak terlupakan, aman, dan memupuk semangat kebersamaan!"
  }
];

export default function TrustSignals() {
  // Triple the list to ensure seamless infinite scroll on all screen sizes
  const scrollItems = [...CLIENTS, ...CLIENTS, ...CLIENTS];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": TESTIMONIALS.map((t) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.name
      },
      "reviewBody": t.plainTextQuote,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "publisher": {
        "@type": "Organization",
        "name": t.company
      },
      "itemReviewed": {
        "@type": "Organization",
        "name": "Growth Indonesia"
      }
    }))
  };

  return (
    <section className="py-20 md:py-32 bg-white border-b border-gray-100 overflow-hidden" aria-labelledby="trust-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-16 md:mb-24">
        <div className="text-center">
          <Badge className="mb-4">Strategic Partners</Badge>
          <h2 id="trust-title" className="text-gray-900 font-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Dipercaya oleh <span className="text-[#EF4444]">100+ Perusahaan</span>
          </h2>
          <p className="text-gray-600 mt-4 text-sm md:text-base max-w-xl mx-auto">Mitra strategis dalam pengembangan sumber daya manusia melalui metode yang kreatif dan berkelanjutan.</p>
        </div>
      </div>

      <div className="relative flex overflow-hidden py-8 md:py-12 bg-gray-50/50">
        {/* Gradient overlays for smooth fading effect */}
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-64 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

        <div className="flex whitespace-nowrap gap-6 md:gap-10 items-center animate-marquee hover:[animation-play-state:paused]">
          {scrollItems.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex items-center gap-4 px-8 md:px-10 py-5 md:py-6 rounded-2xl md:rounded-3xl bg-white border border-gray-100 hover:border-[#EF4444]/30 hover:shadow-2xl hover:shadow-[#EF4444]/5 transition-all duration-500 group active:scale-95 grayscale hover:grayscale-0 hover:-translate-y-1"
            >
              <div className={`${client.color} opacity-40 group-hover:opacity-100 transition-opacity duration-500`}>
                {client.icon}
              </div>
              <span className="font-display font-extrabold text-gray-600 group-hover:text-gray-900 transition-colors duration-500 uppercase tracking-tight text-xs md:text-sm">
                {client.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonial Scroll / Carousel */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-20 md:mt-32">
        <div className="text-center mb-12">
          <Badge className="mb-4">Testimoni Klien</Badge>
          <h2 className="text-gray-900 font-display text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Kisah Sukses Transformasi <span className="text-[#EF4444]">SDM</span>
          </h2>
        </div>
        
        {/* CSS Scroll Snapping Carousel */}
        <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-12 pt-4 px-4 -mx-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx}
              className="flex-none w-[85vw] sm:w-[350px] md:w-[400px] snap-center shrink-0 bg-white border border-gray-100 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1 hover:border-red-100 transition-all duration-300 relative group"
            >
              <div className="absolute top-6 right-6 text-gray-100 group-hover:text-red-50 transition-colors duration-300">
                <Quote className="w-12 h-12 fill-current" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-slate-600 text-sm md:text-base leading-relaxed mb-8 flex-grow">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4 border-t border-gray-50 pt-6 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 text-slate-600 font-black font-display text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 font-display text-sm md:text-base">{t.name}</div>
                    <div className="text-xs md:text-sm font-semibold text-[#EF4444] uppercase tracking-wider">{t.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 text-center mt-12 md:mt-16">
        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-300">Sustainable Growth Partnerships &copy; 2026</p>
      </div>
    </section>
  );
}
