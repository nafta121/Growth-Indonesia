import Image from 'next/image';
import Link from 'next/link';

const CITIES = ['madiun', 'ponorogo', 'magetan', 'ngawi', 'nganjuk', 'pacitan', 'kediri'];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#0A1628] pt-20 pb-28 md:pb-12 border-t border-white/5">
      <div className="container mx-auto px-4 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-6">
              <Image 
                src="https://nafta121.sirv.com/Screenshot_20260423_192944_My%20Files.jpg" 
                alt="Growth Indonesia Logo" 
                width={200} 
                height={56} 
                className="h-14 w-auto object-contain"
                style={{ width: 'auto' }}
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-gray-400 leading-relaxed max-w-xs">
              Transforming organizations through human-centric development and 
              experiential learning since 2018.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Navigasi Cepat</h3>
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

          {/* Area Layanan */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Area Layanan</h3>
            <ul className="space-y-4">
              {CITIES.map((city) => (
                <li key={city}>
                  <Link 
                    href={`/layanan/outbound-${city}`} 
                    className="text-gray-500 hover:text-[#EF4444] transition-colors"
                  >
                    Outbound {city.charAt(0).toUpperCase() + city.slice(1)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Alamat Kantor</h3>
            <address className="not-italic">
              <a 
                href="https://maps.app.goo.gl/s5sLVajjti61reWw8?g_st=ac"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 hover:text-[#EF4444] transition-colors duration-200 leading-relaxed block"
                aria-label="Lihat lokasi Growth Indonesia di Google Maps"
              >
                Jl. Mujair No.3, Nambangan Kidul, Kota Madiun, Jawa Timur 63128
              </a>
            </address>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-white font-bold mb-6 tracking-wide uppercase text-sm">Hubungi Kami</h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 mb-1 text-xs uppercase tracking-wider">WhatsApp:</p>
                <a 
                  href="https://wa.me/6285704748186" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#EF4444] font-black text-lg block hover:scale-105 transition-transform origin-left"
                >
                  +62 857-0474-8186
                </a>
              </div>
              <div>
                <p className="text-gray-500 mb-1 text-xs uppercase tracking-wider">Email:</p>
                <a 
                  href="mailto:info@growthindonesia.my.id"
                  className="text-gray-500 hover:text-[#EF4444] transition-colors duration-200 block underline underline-offset-4"
                  aria-label="Kirim email ke Growth Indonesia"
                >
                  info@growthindonesia.my.id
                </a>
              </div>
            </div>
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
