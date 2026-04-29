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
      <div className="max-w-7xl mx-auto h-full px-6 md:px-12">
        <nav className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center group active:scale-95 transition-transform" aria-label="Growth Indonesia Home">
              <Image 
                src="https://nafta121.sirv.com/Screenshot_20260423_192944_My%20Files.jpg" 
                alt="Growth Indonesia Logo" 
                width={200} 
                height={48} 
                className="h-10 md:h-12 w-auto object-contain transition-all duration-300 group-hover:brightness-110"
                style={{ width: 'auto' }}
                referrerPolicy="no-referrer"
                priority={true}
              />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-8 lg:gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="group relative py-1 text-sm font-bold tracking-tight text-gray-800 transition-all duration-300 hover:text-[#EF4444] focus:outline-none focus:ring-2 focus:ring-[#EF4444]/20 rounded-sm px-2"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-2 h-0.5 w-0 bg-[#EF4444] transition-all duration-300 ease-out group-hover:w-[calc(100%-1rem)]" />
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Toggle */}
          <button
            id="mobile-menu-toggle"
            className="relative z-50 p-2.5 text-slate-900 md:hidden focus:outline-none bg-gray-50 rounded-xl transition-all active:scale-90"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
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
        </nav>
      </div>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 flex flex-col bg-white md:hidden"
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
            <div className="mt-auto w-full px-8 pb-12 flex flex-col gap-6">
              <div className="h-px w-full bg-gray-100 mb-4" />
              
              <a 
                href="https://wa.me/6285704748186"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-[#EF4444] hover:text-white transition-all active:scale-95"
              >
                <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#EF4444] shadow-sm">
                  <Phone className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">WhatsApp Kami</span>
                  <span className="text-sm font-bold tracking-tight">+62 857-0474-8186</span>
                </div>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a 
                  href="mailto:info@growthindonesia.my.id"
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors text-center"
                >
                  <Mail className="w-5 h-5 text-[#EF4444]" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Email</span>
                </a>
                <a 
                  href="https://maps.app.goo.gl/s5sLVajjti61reWw8?g_st=ac"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:bg-gray-100 transition-colors text-center"
                >
                  <MapPin className="w-5 h-5 text-[#EF4444]" />
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Location</span>
                </a>
              </div>
            </div>

            {/* Decoration for Mobile Menu */}
            <div className="absolute bottom-6 left-0 right-0 flex justify-center opacity-5 pointer-events-none">
              <span className="text-6xl font-display font-extrabold whitespace-nowrap text-gray-900">GROWTH INDONESIA</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
