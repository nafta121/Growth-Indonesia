'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Mail, MapPin, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang Kami', href: '#tentang' },
  { name: 'Layanan', href: '#layanan' },
  { name: 'Kontak', href: '#kontak' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header
      id="navbar"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b bg-white shadow-md border-gray-100 h-20'
      )}
    >
      <div className="container mx-auto h-full px-4 md:px-12">
        <nav className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center" aria-label="Growth Indonesia Home">
            <Image 
              src="https://nafta121.sirv.com/Screenshot_20260423_192944_My%20Files.jpg" 
              alt="Growth Indonesia Logo" 
              width={200} 
              height={48} 
              className="h-12 w-auto object-contain"
              referrerPolicy="no-referrer"
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="group relative py-1 text-sm font-semibold tracking-wide text-gray-700 transition-colors hover:text-[#EF4444] focus:outline-none focus:ring-2 focus:ring-[#EF4444] rounded-sm px-1"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-[#EF4444] transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            className="relative z-50 p-2 text-slate-900 md:hidden focus:outline-none focus:ring-2 focus:ring-[#EF4444] rounded-md transition-all active:scale-95"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-white md:hidden"
          >
            <ul className="flex flex-col items-center gap-6 w-full px-8">
              {NAV_LINKS.map((link, i) => (
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
                    className="block py-4 text-3xl font-display font-bold text-gray-800 hover:text-[#EF4444] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#EF4444] rounded-xl"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Contact Info for Mobile Menu */}
            <div className="absolute bottom-20 left-0 right-0 flex flex-col items-center gap-4 px-8 border-t border-gray-100 pt-8 mt-auto">
              <a 
                href="https://wa.me/6285704748186"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-800 font-bold hover:text-[#EF4444] transition-colors"
                aria-label="Hubungi Growth Indonesia via WhatsApp"
              >
                <Phone className="w-4 h-4 text-[#EF4444]" /> +62 857-0474-8186
              </a>
              <a 
                href="mailto:info@growthindonesia.my.id"
                className="flex items-center gap-2 text-gray-600 text-sm hover:text-[#EF4444] transition-colors"
                aria-label="Kirim email ke Growth Indonesia"
              >
                <Mail className="w-4 h-4 text-[#EF4444]" /> info@growthindonesia.my.id
              </a>
              <a 
                href="https://maps.app.goo.gl/s5sLVajjti61reWw8?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-500 text-xs text-center hover:text-[#EF4444] transition-colors"
                aria-label="Lihat lokasi Growth Indonesia di Google Maps"
              >
                <MapPin className="w-4 h-4 text-[#EF4444]" /> Jl. Mujair No.3, Madiun
              </a>
            </div>

            {/* Decoration for Mobile Menu */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-5 pointer-events-none">
              <span className="text-6xl font-display font-black whitespace-nowrap text-gray-900">GROWTH INDONESIA</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
