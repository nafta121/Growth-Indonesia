import Image from 'next/image';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/constants';
import { PRIORITY_CITIES } from '@/components/service-areas';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy pt-20 pb-28 md:pb-14 border-t border-navy-border text-white">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        {/* Statement Footer Header */}
        <div className="pb-14 mb-14 border-b border-navy-border flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              Siap Merancang Program Outbound &amp; Gathering Berikutnya?
            </h2>
            <p className="text-navy-muted text-base mt-3">
              Konsultasikan kebutuhan proposal, skenario kegiatan, dan rincian RAB instansi Anda bersama tim praktisi kami di Madiun.
            </p>
          </div>
          <div className="shrink-0">
            <a
              href={`https://wa.me/${COMPANY_INFO.whatsapp_number}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center px-7 py-3.5 rounded-xl bg-brand-dark hover:bg-brand text-white text-sm font-bold transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus"
            >
              Diskusi via WhatsApp
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center mb-6">
              <Image 
                src={COMPANY_INFO.logo_url} 
                alt={`${COMPANY_INFO.brand_name} - Provider Outbound & Event Organizer Madiun Jawa Timur`} 
                width={200} 
                height={56} 
                className="h-14 w-auto object-contain"
                style={{ width: 'auto' }}
                referrerPolicy="no-referrer"
              />
            </Link>
            <p className="text-navy-muted text-sm leading-relaxed max-w-xs">
              Mitra strategis pengembangan SDM, Outbound Training, Team Building, LDK Kepemimpinan, dan Event Organizer Korporat di Madiun serta Jawa Timur dengan metode Experiential Learning.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-6 text-base">Navigasi Cepat</h3>
            <ul className="space-y-3">
              {[
                { label: 'Beranda', href: '/' },
                { label: 'Tentang Kami', href: '/#tentang' },
                { label: 'Layanan', href: '/layanan' },
                { label: 'Paket Program', href: '/#paket' },
                { label: 'Kontak', href: '/#kontak' },
              ].map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href} 
                    className="text-navy-muted hover:text-white transition-colors inline-flex min-h-11 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg px-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Area Layanan */}
          <div>
            <h3 className="text-white font-bold mb-6 text-base">Area Utama</h3>
            <ul className="space-y-3">
              {PRIORITY_CITIES.map((city) => (
                <li key={city}>
                  <Link 
                    href={`/layanan/${city}`} 
                    className="text-navy-muted hover:text-white transition-colors capitalize inline-flex min-h-11 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg px-1"
                  >
                    Layanan di {city}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold mb-6 text-base">Alamat Kantor</h3>
            <address className="not-italic">
              <a 
                href={COMPANY_INFO.maps_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-navy-muted hover:text-white transition-colors duration-200 leading-relaxed block min-h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg p-1 -ml-1"
                aria-label={`Lihat lokasi ${COMPANY_INFO.brand_name} di Google Maps`}
              >
                {COMPANY_INFO.address}
              </a>
            </address>
          </div>

          {/* Direct Contact */}
          <div>
            <h3 className="text-white font-bold mb-6 text-base">Hubungi Kami</h3>
            <div className="space-y-4">
              <div>
                <p className="text-navy-muted mb-1 text-xs font-medium">WhatsApp Resmi</p>
                <a 
                  href={`https://wa.me/${COMPANY_INFO.whatsapp_number}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand hover:text-white font-black text-lg inline-flex items-center transition-colors min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg px-1 -ml-1 num"
                >
                  {COMPANY_INFO.whatsapp_display}
                </a>
              </div>
              <div>
                <p className="text-navy-muted mb-1 text-xs font-medium">Email</p>
                <a 
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="text-navy-muted hover:text-white transition-colors duration-200 inline-flex items-center underline underline-offset-4 min-h-11 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg px-1 -ml-1"
                  aria-label={`Kirim email ke ${COMPANY_INFO.brand_name}`}
                >
                  {COMPANY_INFO.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-navy-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-navy-muted text-xs text-center md:text-left">
            &copy; {currentYear} {COMPANY_INFO.brand_name}. Seluruh hak cipta dilindungi.
          </p>
          <div className="flex gap-6">
            <Link href="/#kontak" className="text-navy-muted hover:text-white text-xs transition-colors inline-flex min-h-11 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg px-2">Kebijakan Privasi</Link>
            <Link href="/#kontak" className="text-navy-muted hover:text-white text-xs transition-colors inline-flex min-h-11 items-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-focus rounded-lg px-2">Syarat &amp; Ketentuan</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
