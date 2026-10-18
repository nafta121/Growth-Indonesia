import Image from 'next/image';
import OutboundGalleryClient from './outbound-gallery-client';

export const galleryItems = [
  {
    id: 1,
    url: 'https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg',
    alt: 'Sesi ice breaking dan pencairan suasana peserta outbound korporat bersama fasilitator Growth Indonesia di Kota Madiun',
  },
  {
    id: 2,
    url: 'https://nafta121.sirv.com/OUTBOUND/2022-11-05%2006-52-48.jpeg',
    alt: 'Senam pagi dan pemanasan tim sebelum simulasi experiential learning di kawasan wisata Telaga Sarangan Magetan',
  },
  {
    id: 3,
    url: 'https://nafta121.sirv.com/OUTBOUND/2022-11-05%2007-25-41.jpeg',
    alt: 'Permainan kolaborasi tim dan penyelarasan komunikasi antar-divisi instansi pemerintah di hutan pinus Sarangan Magetan',
  },
  {
    id: 4,
    url: 'https://nafta121.sirv.com/OUTBOUND/2022-11-05%2009-09-46.jpeg',
    alt: 'Simulasi pemecahan masalah dan kepemimpinan kelompok dalam program capacity building SDM di Ponorogo',
  },
  {
    id: 5,
    url: 'https://nafta121.sirv.com/OUTBOUND/2022-12-08%2009-01-25.jpeg',
    alt: 'Pelatihan kepemimpinan dasar LDK OSIS dan MPK untuk penguatan karakter serta kedisiplinan pelajar di Ngawi',
  },
  {
    id: 6,
    url: 'https://nafta121.sirv.com/OUTBOUND/2022-12-08%2010-17-30.jpeg',
    alt: 'Tantangan strategi kelompok dan ketangkasan fisik peserta team building perusahaan swasta di Kediri',
  },
  {
    id: 7,
    url: 'https://nafta121.sirv.com/OUTBOUND/2022-12-08%2010-56-15.jpeg',
    alt: 'Aktivitas sinergi kelompok dan kepercayaan tim pada acara employee gathering korporasi di Trawas Mojokerto',
  },
  {
    id: 8,
    url: 'https://nafta121.sirv.com/OUTBOUND/2022-12-08%2011-00-35.jpeg',
    alt: 'Kompetisi permainan ketelitian dan koordinasi tim pada program corporate outing di lapangan terbuka Kota Batu',
  },
  {
    id: 9,
    url: 'https://nafta121.sirv.com/OUTBOUND/2022-12-08%2011-31-54.jpeg',
    alt: 'Sesi refleksi dan evaluasi pembelajaran experiential learning bersama Master Trainer Growth Indonesia di Surabaya',
  },
  {
    id: 10,
    url: 'https://nafta121.sirv.com/OUTBOUND/2022-12-17%2009-59-56.jpeg',
    alt: 'Foto bersama seluruh peserta family gathering dan manajemen acara BUMN di kawasan wisata alam Madiun Raya',
  },
  {
    id: 11,
    url: 'https://nafta121.sirv.com/OUTBOUND/2023-01-07%2007-48-27.jpeg',
    alt: 'Pengarahan standar keselamatan dan pembagian kelompok oleh fasilitator berpengalaman di lokasi outbound Kota Batu',
  },
  {
    id: 12,
    url: 'https://nafta121.sirv.com/OUTBOUND/2023-01-07%2007-52-36.jpeg',
    alt: 'Dinamika kelompok untuk membangun kekompakan dan budaya kerja berkinerja tinggi bagi karyawan di Trawas Mojokerto',
  },
  {
    id: 13,
    url: 'https://nafta121.sirv.com/OUTBOUND/2023-01-07%2008-09-44.jpeg',
    alt: 'Simulasi ketangguhan mental dan komunikasi efektif peserta pelatihan SDM dari Surabaya dan Kediri',
  },
  {
    id: 14,
    url: 'https://nafta121.sirv.com/OUTBOUND/IMG-20250420-WA0002.jpg',
    alt: 'Perayaan keberhasilan tim pasca-pelatihan outbound dan capacity building bersama Growth Indonesia di Jawa Timur',
  },
];

export default function OutboundGallery() {
  return (
    <section id="galeri" className="py-20 md:py-32 bg-gray-50 overflow-hidden" aria-labelledby="galeri-title">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <h2 id="galeri-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1628] leading-[1.1] mb-6">
            Dokumentasi <span className="text-[#EF4444]">Kegiatan</span>
          </h2>
          <div className="w-16 h-2 bg-[#EF4444] mx-auto rounded-full" />
        </div>

        <OutboundGalleryClient photos={galleryItems}>
          {galleryItems.map((photo) => (
            <Image
              key={photo.id}
              src={photo.url}
              alt={photo.alt}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              referrerPolicy="no-referrer"
            />
          ))}
        </OutboundGalleryClient>
      </div>
    </section>
  );
}

