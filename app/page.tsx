'use client';

import { useState } from 'react';
import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import AboutUs from '@/components/about-us';
import Approach from '@/components/approach';
import Services from '@/components/services';
import Pricing from '@/components/pricing';
import TrustSignals from '@/components/trust-signals';
import OutboundGallery from '@/components/outbound-gallery';
import Contact from '@/components/contact';
import Footer from '@/components/footer';
import WhatsAppFAB from '@/components/whatsapp-fab';

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<string>('');

  return (
    <main className="relative min-h-screen selection:bg-[#EF4444] selection:text-white">
      <Navbar />
      <Hero />
      <AboutUs />
      <Approach />
      <Services />
      <Pricing onSelect={setSelectedPackage} />
      <OutboundGallery />
      <TrustSignals />
      <Contact initialPackage={selectedPackage} />
      <Footer />
      
      <WhatsAppFAB />

      {/* Branding Footer Stripe */}
      <div className="h-1.5 w-full flex fixed bottom-0 z-[70]">
        <div className="h-full flex-grow bg-[#EF4444]" />
        <div className="h-full w-1/4 bg-white" />
        <div className="h-full w-1/6 bg-[#EF4444]/50" />
      </div>
    </main>
  );
}
