import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { COMPANY_INFO } from '@/lib/constants';
import NavbarMobile from './navbar-mobile';

export const NAV_LINKS = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang Kami', href: '#tentang' },
  { name: 'Layanan', href: '#layanan' },
  { name: 'Kontak', href: '#kontak' },
];

export default function Navbar() {
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
                src={COMPANY_INFO.logo_url} 
                alt={`${COMPANY_INFO.brand_name} Logo`} 
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
                  className="group relative py-1 text-sm font-bold tracking-tight text-gray-800 transition-all duration-300 hover:text-brand focus:outline-none focus:ring-2 focus:ring-brand/20 rounded-sm px-2"
                >
                  {link.name}
                  <span className="absolute -bottom-1 left-2 h-0.5 w-0 bg-brand transition-all duration-300 ease-out group-hover:w-[calc(100%-1rem)]" />
                </Link>
              </li>
            ))}
          </ul>

          <NavbarMobile navLinks={NAV_LINKS} />
        </nav>
      </div>
    </header>
  );
}
