import Link from 'next/link';
import { Sparkles, ArrowUpRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { getCityServiceFaqs } from '@/lib/schema';

interface AiOverviewProps {
  cityName: string;
  cityKey?: string;
  kategoriName: string;
  currentKategori?: string;
  venues: string[];
}

const PROGRAM_MATRIX = [
  {
    slug: 'outbound',
    label: 'Outbound & Team Building',
    focus: 'Sinergi, Komunikasi & Problem Solving',
    audience: 'Karyawan Korporat, BUMN & Tim Lintas Divisi',
    price: 'Mulai Rp 150.000/pax',
  },
  {
    slug: 'training',
    label: 'Indoor Training & Capacity Building',
    focus: 'Kepemimpinan, Soft Skill & Motivasi Kerja',
    audience: 'Manajerial, Supervisor & Staf Profesional',
    price: 'Mulai Rp 7.000.000/paket',
  },
  {
    slug: 'gathering',
    label: 'EO Corporate & Family Gathering',
    focus: 'Apresiasi, Kebersamaan & Gala Dinner',
    audience: 'Seluruh Karyawan & Keluarga Besar Perusahaan',
    price: 'Mulai Rp 9.500.000/paket',
  },
  {
    slug: 'ldk-osis',
    label: 'LDK OSIS & Character Building',
    focus: 'Karakter, Kedisiplinan & Kepemimpinan Siswa',
    audience: 'Pengurus OSIS, Pelajar SMP/SMA & Mahasiswa',
    price: 'Mulai Rp 150.000/pax',
  },
  {
    slug: 'fun-games',
    label: 'Fun Games & Ice Breaking',
    focus: 'Refreshment, Energizer & Keakraban Tim',
    audience: 'Company Outing, Komunitas & Instansi',
    price: 'Mulai Rp 5.500.000/paket',
  },
];

export function AiOverviewSection({
  cityName,
  cityKey,
  kategoriName,
  currentKategori,
  venues,
}: AiOverviewProps) {
  const resolvedCityKey = cityKey || cityName.toLowerCase().replace(/\s+/g, '-');
  const faqData = getCityServiceFaqs(kategoriName, cityName, venues);
  const venueSummary = venues.length > 0 ? venues.slice(0, 3).join(', ') : cityName;

  return (
    <section className="py-20 bg-white border-t border-rule">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <ScrollReveal delay={0.1} yOffset={20}>
          {/* Quick Summary Block */}
          <div className="bg-paper border border-rule rounded-[2.5rem] p-8 md:p-10 mb-16 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-2 h-full bg-brand-dark"></div>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="bg-brand-tint p-4 rounded-2xl shrink-0">
                <Sparkles className="w-8 h-8 text-brand-dark" aria-hidden="true" />
              </div>
              <div>
                <h3 className="font-display font-extrabold text-2xl text-ink mb-4 tracking-tight">Ringkasan Layanan {kategoriName} di {cityName}</h3>
                <p className="text-ink-2 text-lg md:text-xl leading-relaxed font-medium text-pretty">
                  Growth Indonesia menyediakan layanan <strong>{kategoriName}, Corporate Gathering, dan Team Building</strong> profesional di {cityName} (termasuk area {venueSummary}). Dengan rekam jejak menangani <strong>250+ perusahaan, BUMN, dan instansi (15.000+ peserta)</strong> serta catatan <strong>0 insiden keselamatan (Zero Accident Policy)</strong>, setiap program dirancang berbasis <em>experiential learning</em> di bawah supervisi langsung Master Trainer berpengalaman (<strong>Naftalyndho</strong> dan <strong>Juprianto</strong>) untuk meningkatkan kepemimpinan, kolaborasi, dan produktivitas tim Anda.
                </p>
                <p className="text-xs font-semibold text-brand-dark mt-4">
                  Terverifikasi Tim Praktisi Ahli • Diperbarui Oktober 2026
                </p>
              </div>
            </div>
          </div>
          
          {/* Comparison & Sibling Spoke Internal Linking Table */}
          <div className="mb-16">
            <h3 className="font-display font-extrabold text-3xl text-ink mb-3 tracking-tight">Pilihan Program &amp; Layanan di {cityName}</h3>
            <p className="text-muted text-base mb-8 font-medium">
              Bandingkan kategori program pengembangan SDM dan Event Organizer yang tersedia untuk wilayah {cityName}:
            </p>
            <div className="overflow-x-auto rounded-3xl border border-rule shadow-sm">
              <table className="w-full text-left border-collapse min-w-[680px]">
                <thead>
                  <tr className="bg-paper">
                    <th className="py-5 px-6 font-bold text-ink border-b border-rule">Kategori Program di {cityName}</th>
                    <th className="py-5 px-6 font-bold text-ink border-b border-rule">Fokus Utama</th>
                    <th className="py-5 px-6 font-bold text-ink border-b border-rule">Ideal Untuk</th>
                    <th className="py-5 px-6 font-bold text-ink border-b border-rule">Estimasi Investasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rule">
                  {PROGRAM_MATRIX.map((row) => {
                    const isCurrent = currentKategori === row.slug;
                    return (
                      <tr
                        key={row.slug}
                        className={isCurrent ? 'bg-brand-tint/50' : 'hover:bg-paper/60 transition-colors'}
                      >
                        <td className="py-5 px-6 font-semibold text-ink">
                          <Link
                            href={`/layanan/${resolvedCityKey}/${row.slug}`}
                            className="inline-flex items-center gap-1.5 text-ink hover:text-brand-dark transition-colors font-bold"
                          >
                            <span>{row.label} {cityName}</span>
                            <ArrowUpRight className="w-4 h-4 text-brand-dark shrink-0" aria-hidden="true" />
                          </Link>
                        </td>
                        <td className="py-5 px-6 text-muted">{row.focus}</td>
                        <td className="py-5 px-6 text-muted">{row.audience}</td>
                        <td className="py-5 px-6 font-semibold text-ink num whitespace-nowrap">{row.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-muted px-2">
              <span>*Investasi dapat disesuaikan dengan kuota peserta, durasi, dan pilihan venue di {cityName}.</span>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/pricing.md"
                  className="inline-flex items-center gap-1 font-semibold text-ink-2 hover:text-brand-dark transition-colors"
                >
                  <span>Rincian Harga Lengkap (pricing.md)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" />
                </Link>
                <Link
                  href="/portofolio-dan-sertifikasi"
                  className="inline-flex items-center gap-1 font-semibold text-ink-2 hover:text-brand-dark transition-colors"
                >
                  <span>Portofolio &amp; Rekam Jejak</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-brand-dark" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Dynamic FAQ */}
          <div>
            <h3 className="font-display font-extrabold text-3xl text-ink mb-8 tracking-tight">FAQ Seputar {kategoriName} di {cityName}</h3>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white border border-rule p-6 md:p-8 rounded-[2rem] hover:border-brand-border hover:shadow-md transition-[border-color,box-shadow] duration-200">
                  <h4 className="font-display font-bold text-xl text-ink mb-3">{faq.question}</h4>
                  <p className="text-muted leading-relaxed font-medium text-pretty">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
