import { MapPin, ArrowRight } from 'lucide-react';
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
    <section className="py-20 bg-white border-t border-rule">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <ScrollReveal delay={0.1}>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-ink tracking-tight mb-4">
              Layanan {kategoriName} di Kota Lainnya
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto font-medium">
              Jelajahi opsi lokasi {kategoriName.toLowerCase()} dan corporate gathering di kota terdekat lainnya
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyCityKeys.map((key) => {
              const city = allCities[key];
              if (!city) return null;
              return (
                <a 
                  key={key} 
                  href={`/layanan/${key}/${currentKategori}`}
                  className="group block h-full"
                >
                  <div className="h-full bg-paper border border-rule rounded-3xl p-6 transition-[transform,border-color,box-shadow] duration-200 hover:shadow-md hover:border-brand-border hover:-translate-y-1 relative overflow-hidden flex flex-col">
                    <div className="flex items-center gap-3 mb-4 relative z-10">
                      <div className="bg-brand-tint p-2.5 rounded-xl text-brand-dark group-hover:bg-brand-dark group-hover:text-white transition-colors duration-200">
                        <MapPin className="w-5 h-5" />
                      </div>
                      <h3 className="font-display font-bold text-xl text-ink group-hover:text-brand-dark transition-colors leading-tight">
                        {kategoriName} {city.name}
                      </h3>
                    </div>
                    
                    <p className="text-muted text-sm leading-relaxed mb-6 line-clamp-2 relative z-10">
                      {city.description}
                    </p>
                    
                    <div className="flex items-center text-sm font-semibold text-brand-dark group-hover:text-brand transition-colors mt-auto relative z-10">
                      Lihat Layanan {kategoriName} {city.name}
                      <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </div>
                  </div>
                </a>
              );
            })}
          </div>

          {/* Cross-Category Internal Linking Block (Hub-and-Spoke Silo) */}
          <div className="mt-16 pt-12 border-t border-rule">
            <div className="bg-paper border border-rule rounded-3xl p-6 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-2xl md:text-3xl font-extrabold text-ink tracking-tight">
                    Layanan Lainnya di {currentCityName}
                  </h3>
                  <p className="text-sm text-muted mt-1">
                    Navigasi kategori program untuk wilayah {currentCityName}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <a
                    href={`/layanan/${currentCityKey}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-white border border-rule text-sm font-bold text-ink hover:border-brand-dark hover:text-brand-dark transition-colors whitespace-nowrap"
                  >
                    <span>Hub Layanan {currentCityName}</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/layanan"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full bg-navy text-sm font-bold text-white hover:bg-brand-dark transition-colors whitespace-nowrap"
                  >
                    <span>Direktori Jawa Timur</span>
                    <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                {CANONICAL_CATEGORIES.map((kat) => {
                  const isActive = kat === currentKategori;
                  const label = formatCategoryName(kat);
                  return (
                    <a
                      key={kat}
                      href={`/layanan/${currentCityKey}/${kat}`}
                      aria-current={isActive ? 'page' : undefined}
                      className={`group flex flex-col justify-between p-4 rounded-2xl border transition-[border-color,box-shadow,background-color] duration-200 ${
                        isActive
                          ? 'bg-brand-tint border-brand-dark shadow-sm'
                          : 'bg-white border-rule hover:border-brand-dark hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-2">
                        <span className="text-xs font-semibold text-muted">
                          {currentCityName}
                        </span>
                        {isActive && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-bold bg-brand-dark text-white">
                            Aktif
                          </span>
                        )}
                      </div>
                      <div className="font-display font-bold text-base text-ink group-hover:text-brand-dark transition-colors flex items-center justify-between gap-1">
                        <span>{label} {currentCityName}</span>
                        <ArrowRight className="w-4 h-4 shrink-0 text-muted group-hover:text-brand-dark group-hover:translate-x-0.5 transition-[transform,color]" />
                      </div>
                    </a>
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
