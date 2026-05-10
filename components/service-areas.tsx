import Link from 'next/link';
import { MapPin, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';

export const PRIORITY_CITIES = ['madiun', 'surabaya', 'kediri', 'malang', 'magetan', 'ponorogo'];

export default function ServiceAreas() {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="area-layanan">
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <ScrollReveal delay={0} yOffset={20}>
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-5xl font-black tracking-tight text-gray-900 mb-6 leading-tight">
              Jangkauan <span className="text-brand">Layanan Utama</span>
            </h2>
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-medium">
              Kami melayani pelaksanaan program di seluruh Indonesia dengan titik fokus 
              pengembangan di kota-kota strategis Jawa Timur.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {PRIORITY_CITIES.map((city, i) => (
            <ScrollReveal key={city} delay={0.1 * i} yOffset={20}>
              <Link
                href={`/layanan/${city}`}
                className="group flex flex-col items-center p-6 bg-white rounded-3xl border border-gray-100 hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5 hover:-translate-y-1 transition-all duration-300 h-full"
              >
                <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center text-brand mb-4 group-hover:bg-brand group-hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-gray-900 text-center capitalize group-hover:text-brand transition-colors text-sm md:text-base">
                  {city}
                </h3>
              </Link>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.6} yOffset={20}>
          <div className="flex justify-center">
            <Button asChild size="lg" className="rounded-full bg-white border border-gray-200 text-gray-900 hover:bg-gray-50 flex items-center gap-2">
              <Link href="/layanan">
                Lihat Seluruh Area Layanan <ArrowRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
