import Image from 'next/image';
import { Target, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { getCityImage } from '@/lib/city-images';

interface CityContentProps {
  kategoriName: string;
  kotaName: string;
  cityKey: string;
  cityData: {
    uniqueSellingPoint: string;
    popularVenues: string[];
  };
}

export default function CityContent({ kategoriName, kotaName, cityKey, cityData }: CityContentProps) {
  const contentImage = getCityImage(cityKey);

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <ScrollReveal delay={0.2} xOffset={-30} className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden relative">
               <Image 
                  src={contentImage}
                  alt={`${kategoriName} di ${kotaName}`}
                  fill
                  className="object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-gray-900/10 rounded-3xl" />
            </div>
            <div className="absolute -bottom-8 -right-8 w-48 h-48 bg-white p-6 rounded-3xl shadow-xl border border-gray-100 hidden md:block">
              <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mb-4">
                <Target className="w-6 h-6" />
              </div>
              <div className="text-3xl font-black text-gray-900 mb-1">10+</div>
              <div className="text-sm font-semibold text-gray-500">Tahun Pengalaman</div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} xOffset={30}>
            <Badge className="mb-4">Keunggulan Spesifik Kami</Badge>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-gray-900 leading-[1.1] mb-6">
              Layanan, Jasa EO {kategoriName} Terbaik di <span className="text-[#EF4444]">{kotaName}</span>
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Sebagai provider B2B pilihan untuk layanan {kategoriName.toLowerCase()} di {kotaName}, kami tidak sekadar menghadirkan &quot;fun games&quot;. Kami merancang program dengan pendekatan <em>experiential learning</em> yang 100% selaras dengan visi dan misi institusi serta budaya kerja Anda.
            </p>
            
            <div className="bg-red-50 border border-red-100 rounded-3xl p-6 md:p-8 mb-10 relative overflow-hidden group transition-all duration-500 hover:shadow-xl hover:shadow-red-500/5 hover:-translate-y-1">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="text-red-600 w-6 h-6" />
                  <h3 className="font-display font-extrabold tracking-tight text-gray-900 text-2xl">Layanan {kategoriName} di {kotaName}</h3>
                </div>
                <p className="text-gray-800 leading-relaxed font-medium">
                  {cityData.uniqueSellingPoint}
                </p>
              </div>
              <div className="absolute -right-10 -bottom-10 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 pointer-events-none">
                 <MapPin className="w-64 h-64 text-red-600" />
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-display font-extrabold tracking-tight text-gray-900 text-2xl mb-2">Venue Favorit di {kotaName}:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cityData.popularVenues.map((venue, i) => (
                  <div 
                    key={i} 
                    className="group flex items-center gap-4 bg-white p-4 rounded-3xl border border-gray-100 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-500"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-red-600 group-hover:bg-red-50 transition-colors">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <span className="font-bold text-gray-800 text-base">{venue}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
