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
      className="md:hidden fixed bottom-24 right-6 z-[60]"
      aria-label="Chat with Growth Indonesia on WhatsApp"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="relative group"
      >
        {/* Pulsing Aura */}
        <div className="absolute inset-0 bg-[#25D366] rounded-full animate-ping opacity-25" />
        
        {/* Main Button */}
        <div className="relative h-14 w-14 bg-[#25D366] rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] flex items-center justify-center text-white border-2 border-white/20">
          <MessageCircle className="w-7 h-7 fill-white/10" />
        </div>

        {/* Small Tooltip */}
        <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-white text-gray-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          Chat Admin
        </div>
      </motion.div>
    </Link>
  );
}
