'use client';

import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function WhatsAppFAB() {
  return (
    <Link
      href="https://wa.me/6285704748186"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-50 transition-all active:scale-90"
      aria-label="Chat with Growth Indonesia on WhatsApp"
    >
      <motion.div
        initial={{ scale: 0, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group"
      >
        {/* Pulsing Aura */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-20" />
        
        {/* Main Button */}
        <div className="relative h-14 w-14 md:h-16 md:w-16 bg-[#25D366] rounded-2xl md:rounded-3xl shadow-[0_15px_30px_rgb(37,211,102,0.3)] flex items-center justify-center text-white border border-white/20">
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 fill-white/10" />
        </div>

        {/* Label (Desktop Only) */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden md:block">
          <div className="bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
            <p className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] whitespace-nowrap">Chat Admin</p>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
