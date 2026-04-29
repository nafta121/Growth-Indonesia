'use client';

import { motion } from 'motion/react';
import { Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

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

interface PricingProps {
  onSelect: (pkgId: string) => void;
}

export default function Pricing({ onSelect }: PricingProps) {
  const handleSelect = (pkgId: string) => {
    onSelect(pkgId);
    const contactSection = document.getElementById('kontak');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="paket" className="py-24 bg-gray-50 overflow-hidden" aria-labelledby="paket-title">
      <div className="container mx-auto px-4 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block mb-3 text-[#EF4444] font-bold uppercase tracking-[0.2em] text-xs">Invest in Growth</span>
          <h2 id="paket-title" className="font-display text-4xl md:text-5xl font-black text-gray-900 mb-6">Program & Investasi</h2>
          <p className="text-gray-600">Pilih paket pengembangan yang sesuai dengan kebutuhan dan target transformasi tim Anda.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {PACKAGES.map((pkg, idx) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.6 }}
              className={cn(
                "group relative flex flex-col p-8 rounded-3xl bg-white border border-gray-100 transition-all duration-500",
                "hover:scale-[1.02] hover:shadow-2xl hover:border-[#EF4444]/20",
                pkg.popular && "ring-2 ring-[#EF4444] shadow-xl"
              )}
            >
              {pkg.popular && (
                <div className="absolute top-0 right-10 -translate-y-1/2 bg-[#EF4444] text-white text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="font-display text-xl font-black text-gray-900 mb-2 leading-tight uppercase tracking-tight">{pkg.title}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-[#EF4444] tracking-tight">{pkg.price}</span>
                  <span className="text-gray-400 text-sm font-medium">/ pax</span>
                </div>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-8 h-12 overflow-hidden">
                {pkg.description}
              </p>

              <div className="space-y-4 mb-auto">
                {pkg.features.map((feat) => (
                  <div key={feat} className="flex items-center gap-3 text-sm text-gray-700">
                    <Check className="w-4 h-4 text-[#EF4444]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => handleSelect(pkg.id)}
                className={cn(
                  "mt-10 group/btn flex items-center justify-center gap-2 py-4 rounded-xl font-bold transition-all duration-300",
                  pkg.popular 
                    ? "bg-[#EF4444] text-white hover:bg-[#d63d3d] shadow-lg shadow-[#EF4444]/30" 
                    : "bg-gray-900 text-white hover:bg-black focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
                )}
              >
                Pilih Paket
                <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
