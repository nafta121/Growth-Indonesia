import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import OutboundGalleryClient from './outbound-gallery-client';

const outboundPhotos = [
  { id: 1, url: 'https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg', alt: 'Kegiatan Outbound Growth Indonesia 1' },
  { id: 2, url: 'https://nafta121.sirv.com/OUTBOUND/2022-11-05%2006-52-48.jpeg', alt: 'Kegiatan Outbound Growth Indonesia 2' },
  { id: 3, url: 'https://nafta121.sirv.com/OUTBOUND/2022-11-05%2007-25-41.jpeg', alt: 'Kegiatan Outbound Growth Indonesia 3' },
  { id: 4, url: 'https://nafta121.sirv.com/OUTBOUND/2022-11-05%2009-09-46.jpeg', alt: 'Kegiatan Outbound Growth Indonesia 4' },
  { id: 5, url: 'https://nafta121.sirv.com/OUTBOUND/2022-12-08%2009-01-25.jpeg', alt: 'Kegiatan Outbound Growth Indonesia 5' },
  { id: 6, url: 'https://nafta121.sirv.com/OUTBOUND/2022-12-08%2010-17-30.jpeg', alt: 'Kegiatan Outbound Growth Indonesia 6' },
  { id: 7, url: 'https://nafta121.sirv.com/OUTBOUND/2022-12-08%2010-56-15.jpeg', alt: 'Kegiatan Outbound Growth Indonesia 7' },
  { id: 8, url: 'https://nafta121.sirv.com/OUTBOUND/2022-12-08%2011-00-35.jpeg', alt: 'Kegiatan Outbound Growth Indonesia 8' },
  { id: 9, url: 'https://nafta121.sirv.com/OUTBOUND/2022-12-08%2011-31-54.jpeg', alt: 'Kegiatan Outbound Growth Indonesia 9' },
  { id: 10, url: 'https://nafta121.sirv.com/OUTBOUND/2022-12-17%2009-59-56.jpeg', alt: 'Kegiatan Outbound Growth Indonesia 10' },
  { id: 11, url: 'https://nafta121.sirv.com/OUTBOUND/2023-01-07%2007-48-27.jpeg', alt: 'Kegiatan Outbound Growth Indonesia 11' },
  { id: 12, url: 'https://nafta121.sirv.com/OUTBOUND/2023-01-07%2007-52-36.jpeg', alt: 'Kegiatan Outbound Growth Indonesia 12' },
  { id: 13, url: 'https://nafta121.sirv.com/OUTBOUND/2023-01-07%2008-09-44.jpeg', alt: 'Kegiatan Outbound Growth Indonesia 13' },
  { id: 14, url: 'https://nafta121.sirv.com/OUTBOUND/IMG-20250420-WA0002.jpg', alt: 'Kegiatan Outbound Growth Indonesia 14' }
];

export default function OutboundGallery() {
  return (
    <section id="galeri" className="py-20 md:py-32 bg-gray-50 overflow-hidden" aria-labelledby="galeri-title">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        <div className="text-center mb-16 md:mb-24">
          <Badge className="mb-4">Our Moments</Badge>
          <h2 id="galeri-title" className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-[#0A1628] leading-[1.1] mb-6">
            Dokumentasi <span className="text-[#EF4444]">Kegiatan</span>
          </h2>
          <div className="w-16 h-2 bg-[#EF4444] mx-auto rounded-full" />
        </div>

        <OutboundGalleryClient photos={outboundPhotos}>
          {outboundPhotos.map((photo) => (
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
