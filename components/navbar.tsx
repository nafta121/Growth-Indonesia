'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
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

            {/* Decoration for Mobile Menu */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-5 pointer-events-none">
              <span className="text-8xl font-display font-black whitespace-nowrap text-gray-900">GROWTH INDONESIA</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
