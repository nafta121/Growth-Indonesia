'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1628] pt-20 pb-10 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-12 h-12 overflow-hidden rounded-lg bg-white flex items-center justify-center">
                <div className="w-full h-full bg-[#EF4444] flex items-center justify-center font-black text-white text-2xl italic leading-none">GI</div>
              </div>
              <span className="font-display font-extrabold text-2xl tracking-tighter uppercase text-white">
                GROWTH <span className="text-[#EF4444]">INDONESIA</span>
              </span>
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Transforming organizations through human-centric development and 
              experiential learning since 2018.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">NavigasiCepat</h4>
            <ul className="space-y-4">
              {['Beranda', 'Tentang Kami', 'Layanan', 'Paket Program', 'Kontak'].map((link) => (
                <li key={link}>
                  <Link 
                    href={`#${link.toLowerCase().replace(' ', '-')}`} 
                    className="text-gray-500 hover:text-[#EF4444] transition-colors"
                  >
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">AlamatKantor</h4>
            <p className="text-gray-500 leading-relaxed">
              Jl. Mujair No.3, Nambangan Kidul, Kota Madiun, Jawa Timur 63128
            </p>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Hubungi Kami</h4>
            <p className="text-gray-500 mb-2">WhatsApp:</p>
            <Link 
              href="https://wa.me/6285704748186" 
              className="text-[#EF4444] font-black text-lg block mb-4"
            >
              +62 857-0474-8186
            </Link>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-600 text-xs text-center md:text-left">
            &copy; {currentYear} GROWTH INDONESIA. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-600 hover:text-white text-xs transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-gray-600 hover:text-white text-xs transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
