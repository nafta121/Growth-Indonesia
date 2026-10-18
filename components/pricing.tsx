import { Check, ArrowRight, ShieldCheck, FileText, CloudRain, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PACKAGES } from '@/lib/packages';
import { COMPANY_INFO } from '@/lib/seo';

const RISK_REVERSAL_GUARANTEES = [
  {
    icon: FileText,
    title: 'Garansi Draf Proposal & RAB 1x24 Jam',
    description:
      'Pengiriman draf proposal kegiatan, 2 opsi rundown acara, dan estimasi anggaran resmi siap presentasi direksi tanpa biaya komitmen.',
  },
  {
    icon: CloudRain,
    title: 'Jaminan Skenario Plan B Cuaca (Tanpa Biaya Tambahan)',
    description:
      'Jika turun hujan di lokasi kegiatan, program otomatis dialihkan ke kurikulum indoor/pendopo berstandar Experiential Learning tanpa biaya tambahan.',
  },
  {
    icon: ShieldCheck,
    title: 'Dokumen Pertanggungjawaban Lengkap',
    description:
      'Mencakup administrasi pengadaan (SPJ/kuitansi resmi) serta Laporan Evaluasi Performa Tim tertulis pasca-kegiatan.',
  },
];

const COMMITTEE_KIT_ITEMS = [
  'Template Proposal Pengajuan Dana ke Direksi / Kepala Sekolah',
  'Checklist Persiapan Panitia H-30 s/d Hari-H',
  'Matriks Perbandingan 15 Venue Terbaik Madiun Raya, Sarangan, Trawas & Batu',
];

export default function Pricing() {
  const leadMagnetWaText = encodeURIComponent(
    'Halo Tim Growth Indonesia, saya ingin meminta Dokumen Kerja Gratis: Kit Panitia Outing, Gathering & LDK Jawa Timur 2026 (Template Proposal, Checklist H-30 s/d Hari-H, dan Matriks 15 Venue) untuk referensi rapat panitia kami. Terima kasih.'
  );

  return (
    <section id="paket" className="py-20 md:py-32 bg-gray-50 overflow-hidden" aria-labelledby="paket-title">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <ScrollReveal delay={0} duration={0.8} className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <Badge className="mb-4 text-xs">Paket & Investasi SDM</Badge>
          <h2 id="paket-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-[1.1]">
            Program & <span className="text-[#EF4444]">Investasi</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Pilih paket pengembangan yang sesuai dengan kebutuhan dan target transformasi tim Anda. 
            Membangun fundamental SDM yang tangguh melalui metode experiential learning bersama Fasilitator Berpengalaman.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 items-stretch">
          {PACKAGES.filter(pkg => pkg.id !== 'other').map((pkg, idx) => {
            const isAnchor = idx === 1;
            return (
            <ScrollReveal
              key={pkg.id}
              delay={idx * 0.1}
              duration={0.6}
              className={cn(
                "group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] transition-all duration-500 hover:-translate-y-2",
                isAnchor
                  ? "border-2 border-[#EF4444] bg-[#EF4444]/5 lg:scale-105 shadow-xl shadow-red-500/10 z-10"
                  : "bg-white border border-gray-100 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-[#EF4444]/20"
              )}
            >
              {isAnchor && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#DC2626] text-white px-4 py-1 text-xs md:text-sm rounded-full font-bold shadow-md whitespace-nowrap z-20">
                  Paling Diminati
                </span>
              )}
              
              <div className="mb-8">
                <h3 className="font-display text-xl font-extrabold text-gray-900 mb-3 leading-tight uppercase tracking-tight group-hover:text-[#EF4444] transition-colors">{pkg.title}</h3>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl md:text-4xl font-extrabold text-gray-900 whitespace-nowrap tracking-tighter tabular-nums">{pkg.price}</span>
                  <span className="text-gray-600 text-sm font-bold">/paket</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-10 h-auto">
                {pkg.description}
              </p>

              <div className="space-y-5 mb-auto">
                {pkg.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-4 text-sm text-gray-700 group/item">
                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0 group-hover/item:bg-green-500 group-hover/item:text-white transition-colors">
                      <Check className="w-3 h-3 text-green-500 group-hover/item:text-white transition-colors" />
                    </div>
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant={(isAnchor || pkg.popular) ? "default" : "outline"}
                className={cn("mt-12 w-full flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm", (isAnchor || pkg.popular) && "bg-red-600 hover:bg-red-700 text-white")}
              >
                <Link href={`/?package=${pkg.id}#kontak`} scroll={false} aria-label={`Pilih Paket ${pkg.title}`}>
                  <span className="relative z-10">Pilih Paket</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </ScrollReveal>
            );
          })}
        </div>

        {/* Blok 2 Kolom: Garansi Pengadaan B2B & Lead Magnet Kit Panitia 2026 */}
        <ScrollReveal delay={0.2} duration={0.7} className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch">
            {/* Kolom Kiri - Jaminan Ketenangan Komite & HRD (Risk-Free Procurement) */}
            <div className="bg-white border border-gray-200 rounded-[2.5rem] p-8 md:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-50 text-[#DC2626] text-xs font-bold uppercase tracking-wider mb-5">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Risk-Free Procurement</span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 mb-3 leading-tight">
                  Jaminan Ketenangan Komite & HRD
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  Kami memahami tingginya tuntutan akuntabilitas panitia pengadaan di BUMN, instansi pemerintah, korporasi swasta, maupun lembaga pendidikan. Setiap kerja sama bersama Growth Indonesia dilindungi tiga garansi operasional:
                </p>

                <div className="space-y-6">
                  {RISK_REVERSAL_GUARANTEES.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-red-50 text-[#EF4444] flex items-center justify-center shrink-0 mt-0.5">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 text-sm md:text-base mb-1">
                            {item.title}
                          </h4>
                          <p className="text-gray-600 text-xs md:text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Kolom Kanan - Lead Magnet Gratis: Kit Panitia Outing, Gathering & LDK Jawa Timur 2026 */}
            <div className="bg-[#0A1628] text-white rounded-[2.5rem] p-8 md:p-10 shadow-xl flex flex-col justify-between relative overflow-hidden border border-white/10">
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#EF4444]/15 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10">
                <Badge variant="dark" className="mb-5 text-xs">
                  Dokumen Kerja Panitia (Gratis)
                </Badge>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                  Kit Panitia Outing, Gathering & LDK 2026
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-6">
                  Belum siap menentukan tanggal? Dapatkan bundel dokumen kerja praktis untuk mempermudah rapat panitia internal Anda:
                </p>

                <ol className="space-y-4 mb-8">
                  {COMMITTEE_KIT_ITEMS.map((item, index) => (
                    <li key={item} className="flex items-start gap-3.5 text-sm text-slate-200">
                      <span className="w-6 h-6 rounded-full bg-[#EF4444] text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {index + 1}
                      </span>
                      <span className="font-medium leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="relative z-10 pt-2">
                <Button
                  asChild
                  className="w-full bg-[#EF4444] hover:bg-[#DC2626] text-white font-bold uppercase tracking-wider text-xs md:text-sm py-6 rounded-2xl shadow-lg shadow-red-600/25 flex items-center justify-center gap-2"
                >
                  <a
                    href={`https://wa.me/${COMPANY_INFO.whatsapp_number}?text=${leadMagnetWaText}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Minta Kit Panitia 2026 Gratis via WhatsApp"
                  >
                    <Download className="w-4 h-4 mr-1.5" />
                    <span>Minta Kit Panitia 2026 Gratis</span>
                    <ArrowRight className="w-4 h-4 ml-1.5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

