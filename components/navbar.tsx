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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      id="navbar"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled 
          ? 'bg-[#0A1628]/95 backdrop-blur-md h-20 border-white/10' 
          : 'bg-transparent h-24 border-transparent'
      )}
    >
      <div className="container mx-auto h-full px-4 md:px-12">
        <nav className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-white flex items-center justify-center">
              <div className="w-full h-full bg-[#EF4444] flex items-center justify-center font-black text-white text-xl italic leading-none">GI</div>
            </div>
            <span className="font-display font-extrabold text-xl tracking-tighter uppercase text-white">
              GROWTH <span className="text-[#EF4444]">INDONESIA</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className="group relative py-1 text-sm font-semibold tracking-wide text-gray-200 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-[#EF4444] rounded-sm px-1"
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
            className="relative z-50 p-2 text-white md:hidden focus:outline-none focus:ring-2 focus:ring-[#EF4444] rounded-md transition-all active:scale-95"
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
            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-[#0A1628] md:hidden"
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
                    className="block py-4 text-3xl font-display font-bold text-gray-200 hover:text-[#EF4444] active:scale-95 transition-all focus:outline-none focus:ring-2 focus:ring-[#EF4444] rounded-xl"
                  >
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>

            {/* Decoration for Mobile Menu */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-10 pointer-events-none">
              <span className="text-8xl font-display font-black whitespace-nowrap">GROWTH INDONESIA</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
