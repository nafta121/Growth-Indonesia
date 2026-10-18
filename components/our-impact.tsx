'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { useInView } from 'motion/react';
import ScrollReveal from '@/components/ui/scroll-reveal';
import { Users, CalendarCheck, Briefcase, Target } from 'lucide-react';

interface CounterProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
}

function Counter({ end, duration = 2500, suffix = '', prefix = '' }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView || !ref.current) return;

    const node = ref.current;
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.textContent = `${prefix}${end.toLocaleString()}${suffix}`;
      return;
    }

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // easeOutQuart easing function for smooth deceleration
      const easeOut = 1 - Math.pow(1 - progress, 4);
      
      const currentCount = Math.floor(easeOut * end);

      // ⚡ Bolt: Direct DOM mutation prevents excessive React re-renders during animation
      node.textContent = `${prefix}${currentCount.toLocaleString()}${suffix}`;

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        node.textContent = `${prefix}${end.toLocaleString()}${suffix}`;
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration, isInView, prefix, suffix]);

  return (
    <span ref={ref}>
      {prefix}0{suffix}
    </span>
  );
}

const IMPACT_STATS = [
  {
    icon: Briefcase,
    value: 10,
    suffix: '+',
    label: 'Tahun Pengalaman',
    description: 'Rekam jejak merancang pelatihan experiential learning & gathering korporat di Jawa Timur.',
  },
  {
    icon: CalendarCheck,
    value: 500,
    suffix: '+',
    label: 'Event Terselenggara',
    description: 'Skala penanganan mulai dari 30 hingga 500+ peserta per gelombang dengan rekam jejak Zero Accident.',
  },
  {
    icon: Target,
    value: 250,
    suffix: '+',
    label: 'Klien Terlayani',
    description: 'Tingkat kepuasan tinggi berdasarkan evaluasi pasca-kegiatan dan pemesanan berulang (repeat order) tahunan.',
  },
  {
    icon: Users,
    value: 15000,
    suffix: '+',
    label: 'Peserta Terlatih',
    description: 'Cakupan peserta lintas BUMN, instansi pemerintah, perusahaan swasta, dan pengurus OSIS/mahasiswa.',
  },
];

export default function OurImpact() {
  return (
    <section className="py-20 md:py-24 bg-gray-50 border-y border-gray-100 relative overflow-hidden" aria-labelledby="impact-title">
      <Image
        src="https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg"
        alt=""
        aria-hidden="true"
        fill
        loading="lazy"
        sizes="100vw"
        className="object-cover object-center opacity-5 mix-blend-overlay absolute inset-0 -z-10"
        referrerPolicy="no-referrer"
      />
      <div className="max-w-7xl mx-auto px-4 md:px-12 relative z-10">
        <ScrollReveal className="text-center mb-16">
          <h2 id="impact-title" className="font-display text-4xl md:text-5xl font-black text-gray-900 leading-[1.1] mb-6 text-balance">
            Jejak Langkah <span className="text-[#EF4444]">Penuh Makna</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed text-pretty">
            Sejak berdiri, Growth Indonesia telah menjadi katalis perubahan bagi ratusan perusahaan. Angka-angka ini adalah cerminan dari kepercayaan dan dedikasi kami.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {IMPACT_STATS.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <ScrollReveal 
                key={idx} 
                delay={idx * 0.15} 
                className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-red-100 hover:-translate-y-1 transition-all duration-300 relative group overflow-hidden"
              >
                <div className="absolute -right-4 -top-4 w-24 h-24 bg-red-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                <div className="w-14 h-14 bg-red-50 text-[#EF4444] rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 group-hover:bg-[#EF4444] group-hover:text-white transition-all duration-300">
                  <Icon className="w-7 h-7" />
                </div>
                <div className="font-display text-5xl font-black text-gray-900 mb-2 tabular-nums">
                  <Counter end={stat.value} suffix={stat.suffix} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{stat.label}</h3>
                <p className="text-gray-500 font-medium text-pretty">{stat.description}</p>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
