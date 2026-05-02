import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const PACKAGES = [
  {
    id: 'leaders',
    title: 'GROWTH LEADERS TRAINING',
    price: 'Rp. 4.500.000',
    description: 'Menciptakan pemimpin percaya diri dan berkarakter untuk menggerakkan perubahan positif di perusahaan Anda.',
    features: ['Leadership Core', 'Strategic Thinking', 'Conflict Resolution', 'Mental Agility'],
    popular: false
  },
  {
    id: 'generation',
    title: 'GROWTH GENERATION',
    price: 'Rp. 4.000.000',
    description: 'Membentuk generasi baru yang cepat beradaptasi, inovatif, dan memiliki daya saing tinggi di era modern.',
    features: ['Adaptive Mindset', 'Digital Literacy', 'Collaborative Skills', 'Personal Growth'],
    popular: true
  },
  {
    id: 'fun',
    title: "FUN, PLAY 'N GROW",
    price: 'Rp. 3.500.000',
    description: 'Menciptakan kebersamaan, me-refresh pikiran, dan membangun sinergi tim melalui kegembiraan.',
    features: ['Ice Breaking', 'Team Synergy', 'Stress Relief', 'Fun Adventure'],
    popular: false
  },
];

export default function Pricing() {
  return (
    <section id="paket" className="py-20 md:py-32 bg-gray-50 overflow-hidden" aria-labelledby="paket-title">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <ScrollReveal delay={0} duration={0.8} className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <Badge className="mb-4 text-xs">Invest in Growth</Badge>
          <h2 id="paket-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-8 leading-[1.1]">
            Program & <span className="text-[#EF4444]">Investasi</span>
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            Pilih paket pengembangan yang sesuai dengan kebutuhan dan target transformasi tim Anda. 
            Membangun fundamental SDM yang tangguh melalui metode experiential learning.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 items-stretch">
          {PACKAGES.map((pkg, idx) => (
            <ScrollReveal
              key={pkg.id}
              delay={idx * 0.1}
              duration={0.6}
              className={cn(
                "group relative flex flex-col p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] bg-white border border-gray-100 transition-all duration-500",
                "hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] hover:border-[#EF4444]/20",
                pkg.popular && "ring-[3px] ring-[#EF4444] shadow-2xl shadow-[#EF4444]/10"
              )}
            >
              {pkg.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#EF4444] text-white text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-2 rounded-full shadow-lg overflow-hidden">
                  <div className="relative z-10">Most Popular</div>
                  <div className="absolute inset-0 bg-white/20 animate-glare" />
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="font-display text-xl font-extrabold text-gray-900 mb-3 leading-tight uppercase tracking-tight group-hover:text-[#EF4444] transition-colors">{pkg.title}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl md:text-4xl font-extrabold text-gray-900 whitespace-nowrap tracking-tighter">{pkg.price}</span>
                  <span className="text-gray-600 text-sm font-bold">/pax</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-10 h-auto">
                {pkg.description}
              </p>

              <div className="space-y-5 mb-auto">
                {pkg.features.map((feat) => (
                  <div key={feat} className="flex items-start gap-4 text-sm text-gray-700 group/item">
                    <div className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center shrink-0 group-hover/item:bg-green-500 group-hover/item:text-white transition-colors">
                      <Check className="w-3 h-3 text-green-500 group-hover/item:text-white transition-colors" />
                    </div>
                    <span className="font-medium">{feat}</span>
                  </div>
                ))}
              </div>

              <Button
                asChild
                variant={pkg.popular ? "default" : "outline"}
                className={cn("mt-12 w-full flex items-center justify-center gap-2 font-bold uppercase tracking-wider text-sm", pkg.popular && "bg-red-600 hover:bg-red-700 text-white")}
              >
                <Link href={`/?package=${pkg.id}#kontak`} scroll={false} aria-label={`Pilih Paket ${pkg.title}`}>
                  <span className="relative z-10">Pilih Paket</span>
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </Button>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
