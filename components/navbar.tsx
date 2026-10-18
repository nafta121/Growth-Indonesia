import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { COMPANY_INFO } from '@/lib/constants';
import NavbarMobile from './navbar-mobile';

export const NAV_LINKS = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang Kami', href: '/#tentang' },
  { name: 'Layanan', href: '/#layanan' },
  { name: 'Paket', href: '/#paket' },
  { name: 'Portofolio', href: '/portofolio-dan-sertifikasi' },
  { name: 'Artikel', href: '/artikel' },
  { name: 'Kontak', href: '/#kontak' },
];

export default function Navbar() {
  return (
    <header
      id="navbar"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b bg-white shadow-md border-gray-100 min-h-20 pt-[env(safe-area-inset-top)]'
      )}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 md:px-12">
        <nav className="flex items-center justify-between h-full">
          {/* Logo */}
          <Link href="/" className="relative z-50 flex items-center group active:scale-95 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]" aria-label="Growth Indonesia Home">
              <Image 
                src={COMPANY_INFO.logo_url} 
                alt={`${COMPANY_INFO.brand_name} - Corporate Outbound & Event Organizer Madiun`} 
                width={200} 
                height={48} 
                className="h-10 md:h-12 w-auto object-contain transition-[filter] duration-200 ease-out group-hover:brightness-110"
                style={{ width: 'auto' }}
                referrerPolicy="no-referrer"
                priority={true}
              />
          </Link>

          {/* Desktop Nav & CTA */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <ul className="flex items-center gap-4 lg:gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="group relative inline-flex min-h-12 items-center py-1 text-sm font-bold tracking-tight text-gray-800 transition-colors duration-150 ease-out hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 rounded-lg px-2"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 inset-x-2 h-0.5 origin-left scale-x-0 bg-brand-dark transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/#kontak"
              className="inline-flex min-h-11 items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-brand-dark hover:bg-red-700 rounded-xl transition-[transform,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95 shadow-sm hover:shadow-md shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
            >
              Minta Proposal
            </Link>
          </div>

          <NavbarMobile navLinks={NAV_LINKS} />
        </nav>
      </div>
    </header>
  );
}
