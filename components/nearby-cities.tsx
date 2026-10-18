import Link from 'next/link';
import { MapPin, ArrowRight, Layers } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { getNearbyCities } from '@/lib/city-proximity';
import { KATEGORI as CANONICAL_CATEGORIES } from '@/lib/categories';
import { formatSlug } from '@/lib/format';

function formatCategoryName(slug: string): string {
  if (slug === 'ldk-osis') return 'LDK OSIS';
  return formatSlug(slug);
}

interface CityData {
  name: string;
  uniqueSellingPoint: string;
  popularVenues: string[];
  description: string;
}

interface NearbyCitiesProps {
  currentCityKey: string;
  currentKategori: string;
  allCities: Record<string, CityData>;
}

export function NearbyCities({ currentCityKey, currentKategori, allCities }: NearbyCitiesProps) {
  const nearbyCityKeys = getNearbyCities(currentCityKey);
  const kategoriName = formatCategoryName(currentKategori);
  const currentCityName = allCities[currentCityKey]?.name || formatSlug(currentCityKey);

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <ScrollReveal delay={0.1}>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Layanan {kategoriName} di Kota Lainnya
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Jelajahi opsi lokasi {kategoriName.toLowerCase()} dan corporate gathering di kota terdekat lainnya
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyCityKeys.map((key) => {
              const city = allCities[key];
              if (!city) return null;
              return (
                <Link 
                  key={key} 
                  href={`/layanan/${key}/${currentKategori}`}
                  className="group block h-full"
                >
                  <div className="h-full bg-slate-50 border border-slate-100 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5 hover:border-red-100 hover:-translate-y-1 relative overflow-hidden flex flex-col">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-50 to-transparent rounded-bl-full opacity-50 transition-transform duration-500 group-hover:scale-110"></div>
                    
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="bg-red-100/80 p-2.5 rounded-xl text-[#EF4444] group-hover:bg-[#EF4444] group-hover:text-white transition-colors duration-300">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-gray-900 group-hover:text-[#EF4444] transition-colors leading-tight">
                        {kategoriName} {city.name}
                      </h3>
                    </div>
                    
                    <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2 relative z-10">
                      {city.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-semibold text-[#EF4444] group-hover:text-red-700 transition-colors mt-auto relative z-10">
                      Lihat Layanan {kategoriName} {city.name}
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* Cross-Category Internal Linking Block (Hub-and-Spoke Silo) */}
          <div className="mt-16 pt-12 border-t border-slate-100">
            <div className="bg-slate-50 border border-slate-100 rounded-3xl p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#EF4444] mb-2">
                    <Layers className="w-4 h-4" />
                    <span>Navigasi Silo Regional</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
                    Layanan Lainnya di {currentCityName}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    href={`/layanan/${currentCityKey}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-slate-200 text-sm font-bold text-gray-900 hover:border-[#EF4444] hover:text-[#EF4444] transition-colors"
                  >
                    <span>Hub Layanan {currentCityName}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                  <Link
                    href="/layanan"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-900 text-sm font-bold text-white hover:bg-[#EF4444] transition-colors"
                  >
                    <span>Indeks Direktori Jawa Timur</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {CANONICAL_CATEGORIES.map((kat) => {
                  const isActive = kat === currentKategori;
                  const label = formatCategoryName(kat);
                  return (
                    <Link
                      key={kat}
                      href={`/layanan/${currentCityKey}/${kat}`}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group flex flex-col justify-between p-4 rounded-2xl border transition-all duration-200 ${
                        isActive
                          ? 'bg-amber-50/70 border-amber-400 shadow-sm ring-1 ring-amber-400/50'
                          : 'bg-white border-slate-200/80 hover:border-[#EF4444] hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                          {currentCityName}
                        </span>
                        {isActive && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-400/20 text-amber-900 border border-amber-400/40">
                            Aktif
                          </span>
                        )}
                      </div>
                      <div className="font-display font-bold text-base text-gray-900 group-hover:text-[#EF4444] transition-colors flex items-center justify-between gap-1">
                        <span>{label} {currentCityName}</span>
                        <ArrowRight className="w-4 h-4 shrink-0 text-slate-400 group-hover:text-[#EF4444] group-hover:translate-x-0.5 transition-all" />
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

