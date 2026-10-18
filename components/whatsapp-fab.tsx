import { MessageCircle } from 'lucide-react';
import Link from 'next/link';
import { COMPANY_INFO } from '@/lib/constants';

export default function WhatsAppFAB() {
  return (
    <Link
      href={`https://wa.me/${COMPANY_INFO.whatsapp_number}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-[max(1.5rem,env(safe-area-inset-bottom))] right-[max(1.5rem,env(safe-area-inset-right))] md:bottom-8 md:right-8 z-50 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] [@media(hover:hover)_and_(pointer:fine)]:hover:scale-105 active:scale-95 animate-fab-enter focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0A1628] rounded-2xl md:rounded-3xl"
      aria-label="Hubungi Admin Growth Indonesia melalui WhatsApp"
    >
      <div className="relative group">
        {/* Subtle Ambient Ring (replaces continuous infinite ping) */}
        <div className="absolute -inset-1 bg-[#25D366] rounded-2xl md:rounded-3xl opacity-20 group-hover:opacity-35 transition-opacity duration-200 pointer-events-none" />
        
        {/* Main Button */}
        <div className="relative h-14 w-14 md:h-16 md:w-16 bg-[#15803D] hover:bg-[#166534] rounded-2xl md:rounded-3xl shadow-[0_15px_30px_rgb(21,128,61,0.35)] flex items-center justify-center text-white border border-white/20 transition-colors duration-150 ease-out">
          <MessageCircle className="w-7 h-7 md:w-8 md:h-8 fill-white/10" />
        </div>

        {/* Origin-Anchored Tooltip (Desktop Only) */}
        <div className="absolute right-full mr-4 top-1/2 -translate-y-1/2 hidden md:block pointer-events-none">
          <div className="origin-right bg-white px-4 py-2 rounded-xl shadow-xl border border-gray-100 opacity-0 scale-95 translate-x-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 transition-[transform,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]">
            <p className="text-[10px] font-black text-gray-900 uppercase tracking-[0.2em] whitespace-nowrap">Chat Admin</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
