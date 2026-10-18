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
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <ScrollReveal delay={0.1} yOffset={20}>
          {/* Quick Summary Block */}
          <div className="bg-slate-50 border border-slate-100 rounded-[2.5rem] p-8 md:p-10 mb-16 relative overflow-hidden shadow-sm">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#EF4444]"></div>
            <div className="flex flex-col md:flex-row items-start gap-6">
              <div className="bg-red-100 p-4 rounded-2xl shrink-0">
                <Sparkles className="w-8 h-8 text-[#EF4444]" aria-hidden="true" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EF4444] bg-red-50 border border-red-100 px-3 py-1 rounded-full mb-3">
                  <span>Terverifikasi Tim Praktisi Ahli • Diperbarui Oktober 2026</span>
                </div>
                <h3 className="font-display font-extrabold text-2xl text-gray-900 mb-4 tracking-tight">Ringkasan Layanan {kategoriName} di {cityName}</h3>
                <p className="text-slate-600 text-lg md:text-xl leading-relaxed font-medium text-pretty">
                  Growth Indonesia menyediakan layanan <strong>{kategoriName}, Corporate Gathering, dan Team Building</strong> profesional di {cityName} (termasuk area {venueSummary}). Dengan rekam jejak menangani <strong>250+ perusahaan, BUMN, dan instansi (15.000+ peserta)</strong> serta catatan <strong>0 insiden keselamatan (Zero Accident Policy)</strong>, setiap program dirancang berbasis <em>experiential learning</em> di bawah supervisi langsung Master Trainer berpengalaman (<strong>Naftalyndho</strong> dan <strong>Juprianto</strong>) untuk meningkatkan kepemimpinan, kolaborasi, dan produktivitas tim Anda.
                </p>
              </div>
            </div>
          </div>
          
          {/* Comparison & Sibling Spoke Internal Linking Table */}
          <div className="mb-16">
            <h3 className="font-display font-extrabold text-3xl text-gray-900 mb-3 tracking-tight">Pilihan Program & Layanan di {cityName}</h3>
            <p className="text-slate-500 text-base mb-8 font-medium">
              Bandingkan kategori program pengembangan SDM dan Event Organizer yang tersedia untuk wilayah {cityName}:
            </p>
            <div className="overflow-x-auto rounded-3xl border border-gray-100 shadow-sm">
              <table className="w-full text-left border-collapse min-w-[680px]">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="py-5 px-6 font-bold text-gray-900 border-b border-gray-100">Kategori Program di {cityName}</th>
                    <th className="py-5 px-6 font-bold text-gray-900 border-b border-gray-100">Fokus Utama</th>
                    <th className="py-5 px-6 font-bold text-gray-900 border-b border-gray-100">Ideal Untuk</th>
                    <th className="py-5 px-6 font-bold text-gray-900 border-b border-gray-100">Estimasi Investasi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {PROGRAM_MATRIX.map((row) => {
                    const isCurrent = currentKategori === row.slug;
                    return (
                      <tr
                        key={row.slug}
                        className={isCurrent ? 'bg-red-50/40' : 'hover:bg-slate-50/50 transition-colors'}
                      >
                        <td className="py-5 px-6 font-semibold text-gray-900">
                          <Link
                            href={`/layanan/${resolvedCityKey}/${row.slug}`}
                            className="inline-flex items-center gap-1.5 text-gray-900 hover:text-[#EF4444] transition-colors font-bold"
                          >
                            <span>{row.label} {cityName}</span>
                            <ArrowUpRight className="w-4 h-4 text-[#EF4444] shrink-0" aria-hidden="true" />
                          </Link>
                        </td>
                        <td className="py-5 px-6 text-slate-600">{row.focus}</td>
                        <td className="py-5 px-6 text-slate-600">{row.audience}</td>
                        <td className="py-5 px-6 font-semibold text-gray-900 tabular-nums whitespace-nowrap">{row.price}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500 px-2">
              <span>*Investasi dapat disesuaikan dengan kuota peserta, durasi, dan pilihan venue di {cityName}.</span>
              <div className="flex flex-wrap items-center gap-4">
                <Link
                  href="/pricing.md"
                  className="inline-flex items-center gap-1 font-semibold text-gray-700 hover:text-[#EF4444] transition-colors"
                >
                  <span>Rincian Harga Lengkap (pricing.md)</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EF4444]" aria-hidden="true" />
                </Link>
                <Link
                  href="/portofolio-dan-sertifikasi"
                  className="inline-flex items-center gap-1 font-semibold text-gray-700 hover:text-[#EF4444] transition-colors"
                >
                  <span>Portofolio & Rekam Jejak</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-[#EF4444]" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

          {/* Dynamic FAQ */}
          <div>
            <h3 className="font-display font-extrabold text-3xl text-gray-900 mb-8 tracking-tight">FAQ Seputar {kategoriName} di {cityName}</h3>
            <div className="space-y-4">
              {faqData.map((faq, index) => (
                <div key={index} className="bg-white border border-gray-100 p-6 md:p-8 rounded-[2rem] hover:border-red-100 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300">
                  <h4 className="font-display font-bold text-xl text-gray-900 mb-3">{faq.question}</h4>
                  <p className="text-slate-500 leading-relaxed font-medium text-pretty">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

