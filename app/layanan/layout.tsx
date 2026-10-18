import React from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import WhatsAppFAB from '@/components/whatsapp-fab';

export default function LayananLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col bg-[#0A1628] text-white selection:bg-[#EF4444] selection:text-white">
      <Navbar />
      {children}
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
