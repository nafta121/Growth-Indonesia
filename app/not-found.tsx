import Link from 'next/link';
import { Home, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-paper px-4 md:px-12 relative overflow-hidden" style={{ paddingTop: '80px' }}>
      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 bg-brand-tint rounded-3xl mx-auto flex items-center justify-center mb-8 shadow-sm border border-brand-border">
          <span className="text-4xl font-black text-brand-dark num">404</span>
        </div>
        
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-ink mb-6">
          Halaman Tidak Ditemukan
        </h1>
        
        <p className="text-lg md:text-xl text-muted mb-10 leading-relaxed max-w-xl mx-auto font-medium">
          Halaman yang Anda cari mungkin telah dipindahkan. Mari diskusikan kebutuhan program pelatihan atau gathering instansi Anda bersama tim kami.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href={`https://wa.me/${COMPANY_INFO?.whatsapp_number || '6285704748186'}?text=Halo%20tim%20Growth%20Indonesia,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20Anda.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-14 px-8 rounded-full bg-brand-dark text-white hover:bg-brand shadow-md transition-colors duration-200 active:scale-95 flex items-center justify-center gap-2 text-sm font-bold whitespace-nowrap"
          >
            <MessageCircle className="w-5 h-5" />
            Konsultasi WhatsApp
          </Link>
          
          <Link 
            href="/" 
            className="w-full sm:w-auto h-14 px-8 rounded-full bg-white border-2 border-rule text-ink-2 hover:bg-paper-2 hover:text-ink transition-colors duration-200 active:scale-95 flex items-center justify-center gap-2 text-sm font-bold whitespace-nowrap"
          >
            <Home className="w-5 h-5" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </main>
  );
}
