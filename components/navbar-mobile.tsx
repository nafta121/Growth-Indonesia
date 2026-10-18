'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Mail, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { COMPANY_INFO } from '@/lib/constants';

interface NavLink {
  name: string;
  href: string;
}

export default function NavbarMobile({ navLinks }: { navLinks: NavLink[] }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        id="mobile-menu-toggle"
        type="button"
        className="relative z-50 min-h-12 min-w-12 p-3 text-slate-900 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 bg-gray-50 rounded-xl transition-all active:scale-90 flex items-center justify-center"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Tutup menu" : "Buka menu"}
        aria-expanded={isOpen}
        aria-controls="mobile-menu-panel"
      >
        <div className="relative w-6 h-6 flex items-center justify-center">
          <motion.div
            animate={isOpen ? { rotate: 45, y: 0 } : { rotate: 0, y: -6 }}
            className="absolute w-6 h-0.5 bg-gray-900 rounded-full"
          />
          <motion.div
            animate={isOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
            className="absolute w-6 h-0.5 bg-gray-900 rounded-full"
          />
          <motion.div
            animate={isOpen ? { rotate: -45, y: 0 } : { rotate: 0, y: 6 }}
            className="absolute w-6 h-0.5 bg-gray-900 rounded-full"
          />
        </div>
      </button>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Menu Navigasi Mobile"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 flex flex-col bg-white md:hidden overflow-y-auto"
          >
            <ul className="flex flex-col items-center gap-4 w-full px-8 pt-24">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="w-full text-center"
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 min-h-12 text-2xl sm:text-3xl font-display font-bold text-gray-800 hover:text-brand-dark active:scale-95 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark rounded-xl"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Contact Info for Mobile Menu */}
            <div className="mt-auto w-full px-8 pt-6 pb-[max(3rem,env(safe-area-inset-bottom))] flex flex-col gap-6">
              <div className="h-px w-full bg-gray-100 mb-4" />
              
              <a 
                href={`https://wa.me/${COMPANY_INFO.whatsapp_number}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-gray-100 hover:bg-brand hover:border-brand transition-all active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-red-600 shadow-sm transition-colors group-hover:text-brand">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-slate-500 group-hover:text-white/80 uppercase tracking-widest transition-colors">WhatsApp Kami</span>
                  <span className="text-sm font-bold text-gray-900 group-hover:text-white tracking-tight transition-colors">{COMPANY_INFO.whatsapp_display}</span>
                </div>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a 
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-gray-100 hover:bg-gray-100 transition-colors text-center"
                >
                  <Mail className="w-5 h-5 text-red-600" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Email</span>
                </a>
                <a 
                  href={COMPANY_INFO.maps_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-slate-50 border border-gray-100 hover:bg-gray-100 transition-colors text-center"
                >
                  <MapPin className="w-5 h-5 text-red-600" />
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Location</span>
                </a>
              </div>
            </div>

            {/* Decoration for Mobile Menu */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-5 pointer-events-none">
              <span className="text-6xl font-display font-extrabold whitespace-nowrap text-gray-900">{COMPANY_INFO.brand_name}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
