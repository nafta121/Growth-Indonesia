import { Target, MapPin, CheckCircle2 } from 'lucide-react';
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
  content?: {
    subheadline?: string;
    bodyIntro: string;
    deliverables: string[];
  };
}

export default function CityContent({ kategoriName, kotaName, cityKey, cityData, content }: CityContentProps) {
  const contentImage = getCityImage(cityKey);
  const bodyIntro =
    content?.bodyIntro ||
    `Sebagai mitra pengembangan SDM pilihan untuk layanan ${kategoriName.toLowerCase()} di ${kotaName}, kami merancang program berbasis experiential learning yang 100% selaras dengan visi, misi institusi, serta budaya kerja Anda.`;
  const deliverables = content?.deliverables || [];

  return (
    <section className="py-20 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <ScrollReveal delay={0.2} xOffset={-30} className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden relative border border-rule">
              <img 
                src={contentImage}
                alt={`Kegiatan ${kategoriName} Growth Indonesia di ${kotaName}`}
                width={800}
                height={600}
                decoding="async"
                className="absolute inset-0 w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="absolute -bottom-8 -right-8 w-52 bg-white p-6 rounded-3xl shadow-md border border-rule hidden md:block">
              <div className="flex items-center gap-3 mb-2">
                <Target className="w-6 h-6 text-brand-dark shrink-0" aria-hidden="true" />
                <div className="text-3xl font-black text-ink num">10+</div>
              </div>
              <div className="text-sm font-semibold text-muted">Tahun Pengalaman</div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3} xOffset={30}>
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-ink leading-[1.1] mb-6 text-balance">
              Layanan &amp; Jasa EO {kategoriName} Terbaik di {kotaName}
            </h2>
            {content?.subheadline && (
              <p className="text-ink-2 text-base font-medium leading-relaxed mb-4 text-pretty">
                {content.subheadline}
              </p>
            )}
            <p className="text-muted text-lg leading-relaxed mb-8 text-pretty">
              {bodyIntro}
            </p>

            {deliverables.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {deliverables.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 bg-paper border border-rule rounded-2xl p-3.5"
                  >
                    <CheckCircle2 className="w-5 h-5 text-brand-dark shrink-0 mt-0.5" aria-hidden="true" />
                    <span className="text-sm font-semibold text-ink leading-snug">{item}</span>
                  </div>
                ))}
              </div>
            )}
            
            <div className="bg-brand-tint border border-brand-border rounded-3xl p-6 md:p-8 mb-10 relative overflow-hidden group transition-[transform,box-shadow] duration-200 hover:shadow-md hover:-translate-y-1">
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="text-brand-dark w-6 h-6" aria-hidden="true" />
                  <h3 className="font-display font-extrabold tracking-tight text-ink text-2xl">Keunggulan Lokal di {kotaName}</h3>
                </div>
                <p className="text-ink-2 leading-relaxed font-medium text-pretty">
                  {cityData.uniqueSellingPoint}
                </p>
              </div>
            </div>

            <div className="space-y-6">
              <h4 className="font-display font-extrabold tracking-tight text-ink text-2xl mb-2">Venue Favorit di {kotaName}:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {cityData.popularVenues.map((venue, i) => (
                  <div 
                    key={i} 
                    className="group flex items-center gap-4 bg-white p-4 rounded-3xl border border-rule hover:-translate-y-1 hover:shadow-md transition-[transform,box-shadow,border-color] duration-200"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-paper flex items-center justify-center text-brand-dark group-hover:bg-brand-tint transition-colors">
                      <MapPin className="w-5 h-5" aria-hidden="true" />
                    </div>
                    <span className="font-bold text-ink text-base">{venue}</span>
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
