import React from 'react';
import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';

interface CityData {
  name: string;
  uniqueSellingPoint: string;
  popularVenues: string[];
  description: string;
}

interface NearbyCitiesProps {
  currentCityKey: string;
  allCities: Record<string, CityData>;
}

export function NearbyCities({ currentCityKey, allCities }: NearbyCitiesProps) {
  const nearbyCities = Object.entries(allCities).filter(([key]) => key !== currentCityKey);

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <ScrollReveal delay={0.1}>
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight mb-4">
              Layanan Outbound di Kota Lainnya
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto font-medium">
              Jelajahi opsi lokasi outbound dan corporate gathering di kota unggulan kami lainnya
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {nearbyCities.map(([key, city]) => (
              <Link 
                key={key} 
                href={`/layanan/outbound-${key}`}
                className="group block h-full"
              >
                <div className="h-full bg-slate-50 border border-slate-100 rounded-3xl p-6 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5 hover:border-red-100 hover:-translate-y-1 relative overflow-hidden flex flex-col">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-50 to-transparent rounded-bl-full opacity-50 transition-transform duration-500 group-hover:scale-110"></div>
                  
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className="bg-red-100/80 p-2.5 rounded-xl text-[#EF4444] group-hover:bg-[#EF4444] group-hover:text-white transition-colors duration-300">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h3 className="font-display font-bold text-xl text-gray-900 group-hover:text-[#EF4444] transition-colors">
                      Outbound {city.name}
                    </h3>
                  </div>
                  
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 line-clamp-2 relative z-10">
                    {city.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-semibold text-[#EF4444] group-hover:text-red-700 transition-colors mt-auto relative z-10">
                    Pelajari Selengkapnya
                    <ArrowRight className="w-4 h-4 ml-1.5 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link 
              href="/layanan" 
              className="inline-flex items-center justify-center h-14 px-8 rounded-full bg-slate-900 text-white font-bold text-lg hover:bg-[#EF4444] hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300 active:scale-95 group"
            >
              Lihat Semua Lokasi
              <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
