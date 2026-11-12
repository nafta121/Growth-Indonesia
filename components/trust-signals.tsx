import { Building2, Globe, GraduationCap, HardHat, Landmark, Ship, TowerControl as Tower, Truck, Quote } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

const CLIENTS = [
  { name: 'Petrokimia Gresik', icon: <HardHat className="w-5 h-5" /> },
  { name: 'Semen Indonesia', icon: <Building2 className="w-5 h-5" /> },
  { name: 'Bank Jatim', icon: <Landmark className="w-5 h-5" /> },
  { name: 'Maspion Group', icon: <Globe className="w-5 h-5" /> },
  { name: 'Kapal Api', icon: <Ship className="w-5 h-5" /> },
  { name: 'PT KAI', icon: <Truck className="w-5 h-5" /> },
  { name: 'Pertamina', icon: <Tower className="w-5 h-5" /> },
  { name: 'Universitas Brawijaya', icon: <GraduationCap className="w-5 h-5" /> },
  { name: 'Wings Group', icon: <Building2 className="w-5 h-5" /> },
  { name: 'Gudang Garam', icon: <Globe className="w-5 h-5" /> },
  { name: 'PLN Persero', icon: <Tower className="w-5 h-5" /> },
  { name: 'WIKA', icon: <HardHat className="w-5 h-5" /> },
];

const TESTIMONIALS = [
  {
    name: 'Budi Santoso',
    role: 'Manajer SDM & Umum',
    company: 'PT INKA (Persero) Madiun',
    quote: (
      <>
        &ldquo;Growth Indonesia adalah <strong className="text-ink font-bold">jasa outbound madiun</strong> terbaik yang pernah kami gunakan. Kegiatan team building mereka sangat efektif meningkatkan produktivitas tim.&rdquo;
      </>
    ),
    plainTextQuote: "Growth Indonesia adalah jasa outbound madiun terbaik yang pernah kami gunakan. Kegiatan team building mereka sangat efektif meningkatkan produktivitas tim."
  },
  {
    name: 'Siti Rahma',
    role: 'Wakasek Kesiswaan',
    company: 'SMA Negeri 1 Madiun',
    quote: (
      <>
        &ldquo;Sebagai panitia, saya sangat terbantu dengan paket <strong className="text-ink font-bold">LDK OSIS</strong> ini. Pengalaman <strong className="text-ink font-bold">outbound madiun</strong> yang hebat untuk melatih kepemimpinan.&rdquo;
      </>
    ),
    plainTextQuote: "Sebagai panitia, saya sangat terbantu dengan paket LDK OSIS ini. Pengalaman outbound madiun yang hebat untuk melatih kepemimpinan."
  },
  {
    name: 'Andi Kusuma',
    role: 'Pimpinan Cabang',
    company: 'Bank Jatim Ponorogo',
    quote: (
      <>
        &ldquo;Mencari provider <strong className="text-ink font-bold">outbound ponorogo</strong> profesional ternyata mudah. Program corporate gathering dan team building berjalan luar biasa lancar.&rdquo;
      </>
    ),
    plainTextQuote: "Mencari provider outbound ponorogo profesional ternyata mudah. Program corporate gathering dan team building berjalan luar biasa lancar."
  },
  {
    name: 'Diana Wijaya',
    role: 'Ketua Komite Diklat',
    company: 'RS Karya Husada',
    quote: (
      <>
        &ldquo;Acara tahunan kami penuh semangat karena layanan <strong className="text-ink font-bold">outbound magetan</strong> yang seru dan penuh insight. Tim instruktur berpengalaman.&rdquo;
      </>
    ),
    plainTextQuote: "Acara tahunan kami penuh semangat karena layanan outbound magetan yang seru dan penuh insight. Tim instruktur berpengalaman."
  },
  {
    name: 'Wahyu Hidayat',
    role: 'Kasubag Kepegawaian',
    company: 'Dinas Kehutanan Ngawi',
    quote: (
      <>
        &ldquo;Sangat merekomendasikan mereka untuk momen <strong className="text-ink font-bold">outbound ngawi</strong>. Sinergi antar pegawai kuat setelah sesi capacity building dari mereka.&rdquo;
      </>
    ),
    plainTextQuote: "Sangat merekomendasikan mereka untuk momen outbound ngawi. Sinergi antar pegawai kuat setelah sesi capacity building dari mereka."
  },
  {
    name: 'Rina Marlina',
    role: 'HR Development',
    company: 'Gudang Garam',
    quote: (
      <>
        &ldquo;Pengalaman <strong className="text-ink font-bold">outbound kediri</strong> yang paling berkesan. Pendekatan experiential learning sangat aplikatif untuk memecahkan kebekuan antar divisi.&rdquo;
      </>
    ),
    plainTextQuote: "Pengalaman outbound kediri yang paling berkesan. Pendekatan experiential learning sangat aplikatif untuk memecahkan kebekuan antar divisi."
  },
  {
    name: 'Joko Prabowo',
    role: 'Direktur Operasional',
    company: 'BPR Pacitan',
    quote: (
      <>
        &ldquo;Aktivitas <strong className="text-ink font-bold">outbound pacitan</strong> dari fasilitator ahli ini membuat outing kami tak terlupakan, aman, dan memupuk semangat kebersamaan.&rdquo;
      </>
    ),
    plainTextQuote: "Aktivitas outbound pacitan dari fasilitator ahli ini membuat outing kami tak terlupakan, aman, dan memupuk semangat kebersamaan."
  }
];

export default function TrustSignals() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      ...TESTIMONIALS.map((t) => ({
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": t.name,
          "jobTitle": t.role
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
          "@id": "https://growthindonesia.my.id/#organization",
          "name": COMPANY_INFO.brand_name
        }
      }))
    ]
  };

  return (
    <section className="py-20 md:py-28 bg-white border-b border-rule overflow-hidden" aria-labelledby="trust-title">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-7xl mx-auto px-4 md:px-12 mb-12 md:mb-16">
        <div className="text-center">
          <h2 id="trust-title" className="text-ink font-display text-3xl md:text-5xl font-black tracking-tight leading-tight">
            Dipercaya oleh 250+ Perusahaan &amp; Instansi
          </h2>
          <p className="text-muted mt-4 text-sm md:text-base max-w-xl mx-auto">
            Dipercaya oleh BUMN, korporasi swasta, instansi pemerintah, dan institusi pendidikan di 31 kota/kabupaten Jawa Timur.
          </p>
        </div>

        {/* Front-Loaded Self-Contained Entity & Pricing Definition (First 30% GEO Citability) */}
        <div className="mt-8 max-w-4xl mx-auto p-6 md:p-8 rounded-3xl bg-paper border border-rule text-left shadow-sm">
          <p className="text-ink-2 text-sm md:text-base leading-relaxed font-medium text-pretty">
            <strong>Growth Indonesia</strong> adalah provider <em>Corporate Outbound Training</em>, <em>Team Building</em>, <em>LDK OSIS</em>, dan <em>Event Organizer (EO)</em> profesional yang berbasis di Madiun (Jl. Mujair No.3, Nambangan Kidul) dan melayani 31 kota/kabupaten di Jawa Timur. Di bawah supervisi langsung Master Trainer <strong>Naftalyndho</strong> dan <strong>Juprianto</strong>, kami telah mendampingi <strong>250+ perusahaan, BUMN, instansi pemerintah, dan sekolah (15.000+ peserta)</strong> dengan catatan <strong>0 insiden keselamatan (Zero Accident Policy)</strong>, garansi <strong>Plan B cuaca (aula indoor)</strong>, serta pengiriman draf proposal, rundown, RAB, dan LPJ dalam <strong>1x24 jam</strong>. Investasi program tersedia mulai <strong>Rp 150.000/pax</strong> hingga paket bundel institusi <strong>Rp 5.500.000 - Rp 9.500.000</strong>.
          </p>
        </div>
      </div>

      <div className="py-8 md:py-12 bg-paper border-y border-rule">
        <div className="max-w-7xl mx-auto px-4 md:px-12">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {CLIENTS.map((client) => (
              <div
                key={client.name}
                className="flex items-center gap-3 px-5 py-4 rounded-2xl bg-white border border-rule hover:border-brand/40 hover:shadow-md transition-[transform,border-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1"
              >
                <div className="text-brand-dark opacity-80 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                  {client.icon}
                </div>
                <span className="font-display font-bold text-ink-2 group-hover:text-ink transition-colors duration-200 tracking-tight text-sm leading-tight">
                  {client.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonial Scroll / Carousel */}
      <div className="max-w-7xl mx-auto px-4 md:px-12 mt-20 md:mt-28">
        <div className="text-center mb-12">
          <h2 className="text-ink font-display text-2xl md:text-4xl font-extrabold tracking-tight leading-tight">
            Kisah Sukses Transformasi SDM
          </h2>
        </div>
        
        {/* CSS Scroll Snapping Carousel */}
        <div className="flex overflow-x-auto gap-4 sm:gap-6 pb-12 pt-4 px-4 -mx-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          {TESTIMONIALS.map((t, idx) => (
            <div 
              key={idx}
              className="flex-none w-[85vw] sm:w-[350px] md:w-[400px] snap-center shrink-0 bg-white border border-rule rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-md [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 hover:border-brand-border transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] relative group"
            >
              <div className="absolute top-6 right-6 text-paper-3 group-hover:text-brand-tint transition-colors duration-200">
                <Quote className="w-12 h-12 fill-current" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <p className="text-muted text-sm md:text-base leading-relaxed mb-8 flex-grow line-clamp-3">
                  {t.quote}
                </p>
                <div className="flex items-center gap-4 border-t border-rule pt-6 mt-auto">
                  <div className="w-12 h-12 rounded-full bg-paper-2 border border-rule flex items-center justify-center shrink-0 text-ink font-black font-display text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div className="font-bold text-ink font-display text-sm md:text-base">{t.name}</div>
                    <div className="text-xs font-medium text-muted">{t.role}</div>
                    <div className="text-xs font-semibold text-brand-dark mt-0.5">{t.company}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
