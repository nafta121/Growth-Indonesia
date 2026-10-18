import React from 'react';
import { Metadata } from 'next';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import WhatsAppFAB from '@/components/whatsapp-fab';
import CredibilityPortfolio from '@/components/credibility-portfolio';
import Breadcrumb from '@/components/breadcrumb';

export const metadata: Metadata = {
  title: 'Portofolio Klien & Sertifikasi Fasilitator BNSP',
  description: 'Profil fasilitator outbound tersertifikasi BNSP, rekam jejak studi kasus, dan daftar klien BUMN, instansi, serta sekolah yang menggunakan jasa Growth Indonesia.',
  alternates: {
    canonical: 'https://growthindonesia.my.id/portofolio-dan-sertifikasi',
  },
  openGraph: {
    title: 'Portofolio Klien & Sertifikasi Fasilitator BNSP | Growth Indonesia',
    description: 'Profil fasilitator outbound tersertifikasi BNSP, rekam jejak studi kasus, dan daftar klien BUMN, instansi, serta sekolah.',
    url: 'https://growthindonesia.my.id/portofolio-dan-sertifikasi',
    siteName: 'Growth Indonesia',
    locale: 'id_ID',
    type: 'website',
    images: [
      {
        url: 'https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg',
        width: 1200,
        height: 630,
        alt: 'Portofolio Klien & Sertifikasi Fasilitator BNSP - Growth Indonesia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Portofolio Klien & Sertifikasi Fasilitator BNSP | Growth Indonesia',
    description: 'Profil fasilitator outbound tersertifikasi BNSP, rekam jejak studi kasus, dan daftar klien BUMN, instansi, serta sekolah.',
    images: ['https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg'],
  },
};

export default function PortofolioPage() {
  return (
    <div className="relative min-h-screen bg-slate-50 selection:bg-[#EF4444] selection:text-white">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Portofolio & Sertifikasi', href: '/portofolio-dan-sertifikasi' },
            ]}
          />
        </div>
        <CredibilityPortfolio />
      </main>
      <Footer />
      <WhatsAppFAB />
    </div>
  );
}
