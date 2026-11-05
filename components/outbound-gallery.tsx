import type { ReactNode } from 'react';
import OutboundGalleryClient from './outbound-gallery-client';

export const galleryItems = [
  {
    id: 1,
    url: 'https://growthindonesia.my.id/cdn/outbound/2022-10-22-09-00-09.webp',
    alt: 'Sesi ice breaking dan pencairan suasana peserta outbound korporat bersama fasilitator Growth Indonesia di Kota Madiun',
  },
  {
    id: 2,
    url: 'https://growthindonesia.my.id/cdn/outbound/2022-11-05-06-52-48.webp',
    alt: 'Senam pagi dan pemanasan tim sebelum simulasi experiential learning di kawasan wisata Telaga Sarangan Magetan',
  },
  {
    id: 3,
    url: 'https://growthindonesia.my.id/cdn/outbound/2022-11-05-07-25-41.webp',
    alt: 'Permainan kolaborasi tim dan penyelarasan komunikasi antar-divisi instansi pemerintah di hutan pinus Sarangan Magetan',
  },
  {
    id: 4,
    url: 'https://growthindonesia.my.id/cdn/outbound/2022-11-05-09-09-46.webp',
    alt: 'Simulasi pemecahan masalah dan kepemimpinan kelompok dalam program capacity building SDM di Ponorogo',
  },
  {
    id: 5,
    url: 'https://growthindonesia.my.id/cdn/outbound/2022-12-08-09-01-25.webp',
    alt: 'Pelatihan kepemimpinan dasar LDK OSIS dan MPK untuk penguatan karakter serta kedisiplinan pelajar di Ngawi',
  },
  {
    id: 6,
    url: 'https://growthindonesia.my.id/cdn/outbound/2022-12-08-10-17-30.webp',
    alt: 'Tantangan strategi kelompok dan ketangkasan fisik peserta team building perusahaan swasta di Kediri',
  },
  {
    id: 7,
    url: 'https://growthindonesia.my.id/cdn/outbound/2022-12-08-10-56-15.webp',
    alt: 'Aktivitas sinergi kelompok dan kepercayaan tim pada acara employee gathering korporasi di Trawas Mojokerto',
  },
  {
    id: 8,
    url: 'https://growthindonesia.my.id/cdn/outbound/2022-12-08-11-00-35.webp',
    alt: 'Kompetisi permainan ketelitian dan koordinasi tim pada program corporate outing di lapangan terbuka Kota Batu',
  },
  {
    id: 9,
    url: 'https://growthindonesia.my.id/cdn/outbound/2022-12-08-11-31-54.webp',
    alt: 'Sesi refleksi dan evaluasi pembelajaran experiential learning bersama Master Trainer Growth Indonesia di Surabaya',
  },
  {
    id: 10,
    url: 'https://growthindonesia.my.id/cdn/outbound/2022-12-17-09-59-56.webp',
    alt: 'Foto bersama seluruh peserta family gathering dan manajemen acara BUMN di kawasan wisata alam Madiun Raya',
  },
  {
    id: 11,
    url: 'https://growthindonesia.my.id/cdn/outbound/2023-01-07-07-48-27.webp',
    alt: 'Pengarahan standar keselamatan dan pembagian kelompok oleh fasilitator berpengalaman di lokasi outbound Kota Batu',
  },
  {
    id: 12,
    url: 'https://growthindonesia.my.id/cdn/outbound/2023-01-07-07-52-36.webp',
    alt: 'Dinamika kelompok untuk membangun kekompakan dan budaya kerja berkinerja tinggi bagi karyawan di Trawas Mojokerto',
  },
  {
    id: 13,
    url: 'https://growthindonesia.my.id/cdn/outbound/2023-01-07-08-09-44.webp',
    alt: 'Simulasi ketangguhan mental dan komunikasi efektif peserta pelatihan SDM dari Surabaya dan Kediri',
  },
  {
    id: 14,
    url: 'https://growthindonesia.my.id/cdn/outbound/img-20250420-wa0002.webp',
    alt: 'Perayaan keberhasilan tim pasca-pelatihan outbound dan capacity building bersama Growth Indonesia di Jawa Timur',
  },
];

export default function OutboundGallery({ children }: { children?: ReactNode }) {
  return (
    <section id="galeri" className="py-20 md:py-32 bg-paper overflow-hidden" aria-labelledby="galeri-title">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <h2 id="galeri-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-ink leading-[1.1] mb-4">
            Dokumentasi Kegiatan Lapangan
          </h2>
          <p className="text-muted text-base md:text-lg max-w-2xl mx-auto">
            Rekaman aktivitas nyata pelatihan outbound, capacity building, dan gathering instansi di berbagai kota Jawa Timur.
          </p>
        </div>

        {children ? children : <OutboundGalleryClient photos={galleryItems} />}
      </div>
    </section>
  );
}
