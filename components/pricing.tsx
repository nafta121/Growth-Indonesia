import { Check, ArrowRight, ShieldCheck, FileText, CloudRain, Download } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';
import { PACKAGES } from '@/lib/packages';
import { COMPANY_INFO } from '@/lib/constants';

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
    <section id="paket" className="py-20 md:py-32 bg-paper overflow-hidden" aria-labelledby="paket-title">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <ScrollReveal delay={0} duration={0.28} className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <h2 id="paket-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-ink mb-8 leading-[1.1]">
            Program &amp; Paket Investasi
          </h2>
          <p className="text-muted text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
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
                delay={idx * 0.06}
                duration={0.28}
                className={cn(
                  "group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1.5",
                  isAnchor
                    ? "border-2 border-brand-dark bg-white lg:scale-105 shadow-lg z-10"
                    : "bg-white border border-rule hover:shadow-md hover:border-brand-border"
                )}
              >
                {isAnchor && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-dark text-white px-4 py-1 text-xs md:text-sm rounded-full font-bold shadow-sm whitespace-nowrap z-20">
                    Paling Diminati
                  </span>
                )}
                
                <div className="mb-8">
                  <h3 className="font-display text-xl font-extrabold text-ink mb-3 leading-tight tracking-tight group-hover:text-brand-dark transition-colors duration-150">
                    {pkg.title}
                  </h3>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl md:text-4xl font-extrabold text-ink whitespace-nowrap tracking-tighter num">{pkg.price}</span>
                    <span className="text-muted text-sm font-bold">/paket</span>
                  </div>
                </div>

                <p className="text-muted text-sm leading-relaxed mb-10 h-auto">
                  {pkg.description}
                </p>

                <div className="space-y-5 mb-auto">
                  {pkg.features.map((feat) => (
                    <div key={feat} className="flex items-start gap-4 text-sm text-ink-2 group/item">
                      <div className="w-5 h-5 rounded-full bg-brand-tint flex items-center justify-center shrink-0 group-hover/item:bg-brand-dark group-hover/item:text-white transition-colors duration-150">
                        <Check className="w-3 h-3 text-brand-dark group-hover/item:text-white transition-colors duration-150" />
                      </div>
                      <span className="font-medium">{feat}</span>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  variant={(isAnchor || pkg.popular) ? "default" : "outline"}
                  className="mt-12 w-full flex items-center justify-center gap-2 font-bold text-sm"
                >
                  <Link href={`/?package=${pkg.id}#kontak`} scroll={false} aria-label={`Pilih Paket ${pkg.title}`}>
                    <span className="relative z-10">Pilih Paket</span>
                    <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1" />
                  </Link>
                </Button>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Blok 2 Kolom: Garansi Pengadaan B2B & Lead Magnet Kit Panitia 2026 */}
        <ScrollReveal delay={0.2} duration={0.7} className="mt-16 md:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10 items-stretch">
            {/* Kolom Kiri - Jaminan Ketenangan Komite & HRD */}
            <div className="bg-white border border-rule rounded-[2.5rem] p-8 md:p-10 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-ink mb-3 leading-tight">
                  Jaminan Ketenangan Komite &amp; HRD
                </h3>
                <p className="text-muted text-sm leading-relaxed mb-8">
                  Kami memahami tingginya tuntutan akuntabilitas panitia pengadaan di BUMN, instansi pemerintah, korporasi swasta, maupun lembaga pendidikan. Setiap kerja sama bersama Growth Indonesia dilindungi tiga garansi operasional:
                </p>

                <div className="space-y-6">
                  {RISK_REVERSAL_GUARANTEES.map((item) => {
                    const IconComponent = item.icon;
                    return (
                      <div key={item.title} className="flex items-start gap-4">
                        <div className="w-11 h-11 rounded-2xl bg-brand-tint text-brand-dark flex items-center justify-center shrink-0 mt-0.5">
                          <IconComponent className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="font-bold text-ink text-sm md:text-base mb-1">
                            {item.title}
                          </h4>
                          <p className="text-muted text-xs md:text-sm leading-relaxed">
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
            <div className="bg-navy text-white rounded-[2.5rem] p-8 md:p-10 shadow-md flex flex-col justify-between relative overflow-hidden border border-navy-border">
              <div className="relative z-10">
                <h3 className="font-display text-2xl md:text-3xl font-extrabold text-white mb-3 leading-tight">
                  Kit Panitia Outing, Gathering &amp; LDK 2026
                </h3>
                <p className="text-navy-muted text-sm leading-relaxed mb-6">
                  Belum siap menentukan tanggal? Dapatkan bundel dokumen kerja praktis gratis untuk mempermudah rapat panitia internal Anda:
                </p>

                <ol className="space-y-4 mb-8">
                  {COMMITTEE_KIT_ITEMS.map((item, index) => (
                    <li key={item} className="flex items-start gap-3.5 text-sm text-navy-muted">
                      <span className="w-6 h-6 rounded-full bg-brand-dark text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 num">
                        {index + 1}
                      </span>
                      <span className="font-medium leading-relaxed text-white">{item}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="relative z-10 pt-2">
                <Button
                  asChild
                  className="w-full bg-brand-dark hover:bg-brand text-white font-bold text-xs md:text-sm py-6 rounded-2xl shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
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
