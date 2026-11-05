import type { ReactNode } from 'react';
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

export default function Navbar({ children }: { children?: ReactNode }) {
  return (
    <header
      id="navbar"
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b bg-white shadow-sm border-rule min-h-20 pt-[env(safe-area-inset-top)]'
      )}
    >
      <div className="max-w-7xl mx-auto h-20 px-6 md:px-12">
        <nav className="flex items-center justify-between h-full">
          {/* Logo */}
          <a href="/" className="relative z-50 flex items-center shrink-0 group active:scale-95 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]" aria-label="Growth Indonesia Home">
            <img 
              src={COMPANY_INFO.logo_url} 
              alt={`${COMPANY_INFO.brand_name} - Corporate Outbound & Event Organizer Madiun`} 
              width={200} 
              height={48} 
              fetchPriority="high"
              loading="eager"
              decoding="async"
              className="h-10 md:h-12 w-auto object-contain transition-[filter] duration-200 ease-out group-hover:brightness-110"
              style={{ width: 'auto' }}
              referrerPolicy="no-referrer"
            />
          </a>

          {/* Desktop Nav & CTA */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-8">
            <ul className="flex items-center gap-1.5 xl:gap-5">
              {NAV_LINKS.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="group relative inline-flex min-h-12 items-center py-1 text-sm font-bold tracking-tight text-ink transition-colors duration-150 ease-out hover:text-brand-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2 rounded-lg px-2 whitespace-nowrap"
                  >
                    {link.name}
                    <span className="absolute -bottom-1 inset-x-2 h-0.5 origin-left scale-x-0 bg-brand-dark transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href="/#kontak"
              className="inline-flex min-h-11 items-center justify-center px-6 py-2.5 text-sm font-bold text-white bg-brand-dark hover:bg-brand rounded-xl transition-[transform,background-color,box-shadow] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95 shadow-sm hover:shadow-md shrink-0 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-dark focus-visible:ring-offset-2"
            >
              Minta Proposal
            </a>
          </div>

          {/* Slotted mobile drawer island or fallback */}
          {children ? children : <NavbarMobile navLinks={NAV_LINKS} />}
        </nav>
      </div>
    </header>
  );
}
