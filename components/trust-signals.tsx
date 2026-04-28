'use client';

import { motion } from 'motion/react';

export default function TrustSignals() {
  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 md:px-12">
        <div className="text-center mb-12">
          <h3 className="text-gray-900 font-display text-2xl md:text-3xl font-bold tracking-tight">
            Dipercaya oleh <span className="text-[#EF4444]">100+ Perusahaan</span> & Instansi
          </h3>
        </div>
        
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-8">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group flex items-center justify-center h-20 rounded-2xl bg-gray-50 border border-transparent hover:border-[#EF4444]/10 transition-all duration-300 grayscale hover:grayscale-0 opacity-40 hover:opacity-100"
            >
              {/* Logo Placeholder */}
              <div className="w-2/3 h-8 bg-gray-300 rounded-md animate-pulse group-hover:bg-[#EF4444]/10 transition-colors" />
            </motion.div>
          ))}
        </div>

        <div className="mt-12 text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-gray-300">Join our growth community</p>
        </div>
      </div>
    </section>
  );
}
