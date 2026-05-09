import Link from 'next/link';
import { Home, MessageCircle } from 'lucide-react';
import { COMPANY_INFO } from '@/lib/constants';

export default function NotFound() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-white px-4 md:px-12 relative overflow-hidden" style={{ paddingTop: '80px' }}>
      {/* Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#EF4444]/5 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#0A1628]/5 rounded-full blur-[150px] animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <div className="w-24 h-24 bg-red-50 rounded-3xl mx-auto flex items-center justify-center mb-8 rotate-12 hover:rotate-0 transition-transform duration-500 shadow-sm border border-red-100">
          <span className="text-4xl font-black text-[#EF4444]">404</span>
        </div>
        
        <h1 className="font-display text-4xl md:text-5xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6">
          Halaman Tidak <span className="text-[#EF4444]">Ditemukan</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-500 mb-10 leading-relaxed max-w-xl mx-auto font-medium">
          Maaf, halaman yang Anda cari mungkin telah dipindahkan atau dihapus. Jangan khawatir, mari diskusi program menarik lainnya bersama kami!
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href={`https://wa.me/${COMPANY_INFO?.whatsapp_number || '6285704748186'}?text=Halo%20tim%20Growth%20Indonesia,%20saya%20ingin%20berkonsultasi%20mengenai%20layanan%20Anda.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto h-14 px-8 rounded-full bg-[#EF4444] text-white hover:bg-red-600 shadow-lg shadow-red-600/30 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-sm font-bold"
          >
            <MessageCircle className="w-5 h-5" />
            KONSULTASI WHATSAPP
          </Link>
          
          <Link 
            href="/" 
            className="w-full sm:w-auto h-14 px-8 rounded-full bg-white border-2 border-gray-100 text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 text-sm font-bold"
          >
            <Home className="w-5 h-5" />
            KEMBALI KE BERANDA
          </Link>
        </div>
      </div>
    </main>
  );
}
