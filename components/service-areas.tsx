import { MapPin, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';

export const PRIORITY_CITIES = [
  'madiun',
  'surabaya',
  'kediri',
  'malang',
  'magetan',
  'ponorogo',
  'batu',
  'mojokerto',
  'ngawi',
  'pacitan',
  'banyuwangi',
  'jember',
];

export default function ServiceAreas() {
  return (
    <section className="py-24 bg-paper relative overflow-hidden" id="area-layanan">
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <ScrollReveal delay={0} yOffset={20}>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-ink mb-6 leading-tight">
              Jangkauan Layanan Utama
            </h2>
            <p className="text-lg md:text-xl text-muted max-w-2xl mx-auto font-medium">
              Kami melayani pelaksanaan program di seluruh Indonesia dengan titik fokus pengembangan di kota-kota strategis Jawa Timur.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {PRIORITY_CITIES.map((city, i) => (
            <ScrollReveal key={city} delay={0.05 * i} yOffset={12}>
              <a
                href={`/layanan/${city}`}
                className="group flex flex-col items-center p-6 bg-white rounded-3xl border border-rule hover:border-brand/40 hover:shadow-md [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] h-full"
              >
                <div className="w-12 h-12 rounded-full bg-brand-tint flex items-center justify-center text-brand-dark mb-4 group-hover:bg-brand-dark group-hover:text-white transition-colors duration-150">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-ink text-center capitalize group-hover:text-brand-dark transition-colors duration-150 text-sm md:text-base">
                  {city}
                </h3>
              </a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.15} yOffset={12}>
          <div className="flex justify-center">
            <Button asChild size="lg" variant="outline" className="rounded-2xl flex items-center gap-2">
              <a href="/layanan">
                Lihat Seluruh Area Layanan <ArrowRight className="w-4 h-4 ml-1" />
              </a>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
