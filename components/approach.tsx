'use client';

import { motion } from 'motion/react';
import { Users, UserCheck, Award, ShieldCheck } from 'lucide-react';

const PILLARS = [
  {
    title: 'Client-Centric Focus',
    description: 'Pendekatan strategi dan modul pelatihan yang dirancang khusus menyesuaikan dengan budaya dan target unik organisasi Anda.',
    icon: Users,
  },
  {
    title: 'Professional Team',
    description: 'Didampingi oleh konsultan dan trainer ahli dengan rekam jejak yang solid dalam pengembangan kapasitas SDM.',
    icon: UserCheck,
  },
  {
    title: 'Quality',
    description: 'Standar keunggulan tanpa kompromi dalam setiap sesi indoor, kelas motivasi, maupun pengalaman outbound.',
    icon: Award,
  },
  {
    title: 'Safety First',
    description: 'Penerapan standar keselamatan mutlak dan protokol keamanan ketat untuk seluruh aktivitas outdoor.',
    icon: ShieldCheck,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut' as const,
    },
  },
};

export default function Approach() {
  return (
    <section id="approach" className="py-24 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4 md:px-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block mb-3 text-[#EF4444] font-bold uppercase tracking-[0.2em] text-xs"
          >
            How We Work
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-black text-gray-900 mb-6"
          >
            Our Approach
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="h-1.5 w-24 bg-[#EF4444] mx-auto rounded-full"
          />
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="group bg-white p-8 rounded-2xl shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02]"
            >
              <div className="mb-6 inline-flex p-3 rounded-xl bg-gray-50 text-[#EF4444] transition-colors group-hover:bg-[#EF4444] group-hover:text-white">
                <pillar.icon className="w-8 h-8" />
              </div>
              <h3 className="font-display text-xl font-bold text-gray-900 mb-4 group-hover:text-[#EF4444] transition-colors">
                {pillar.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {pillar.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
