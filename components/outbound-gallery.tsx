'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

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
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);

  // Disable body scroll when lightbox is open
  useEffect(() => {
    if (currentIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [currentIndex]);

  const handlePrev = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev !== null ? (prev - 1 + outboundPhotos.length) % outboundPhotos.length : null));
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev !== null ? (prev + 1) % outboundPhotos.length : null));
  }, []);

  const handleClose = useCallback(() => {
    setCurrentIndex(null);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (currentIndex === null) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentIndex, handleClose, handleNext, handlePrev]);

  return (
    <section id="galeri" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-12">
        <div className="text-center mb-16">
          <span className="inline-block mb-4 text-[#EF4444] font-bold uppercase tracking-widest text-xs">Our Moments</span>
          <h2 className="font-display text-4xl md:text-5xl font-black text-[#0A1628] leading-tight mb-4">
            Dokumentasi <span className="text-[#EF4444]">Kegiatan</span>
          </h2>
          <div className="w-24 h-1.5 bg-[#EF4444] mx-auto rounded-full" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {outboundPhotos.map((photo, index) => (
            <motion.div
              key={photo.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              viewport={{ once: true }}
              onClick={() => setCurrentIndex(index)}
              className="group relative aspect-square overflow-hidden rounded-2xl cursor-pointer bg-gray-200"
            >
              <Image
                src={photo.url}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Maximize2 className="text-white w-8 h-8" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-12"
          >
            <button
              onClick={handleClose}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-[110]"
            >
              <X className="w-10 h-10" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <button
                onClick={handlePrev}
                className="absolute left-0 md:-left-12 text-white/50 hover:text-white transition-colors p-2 z-[110]"
              >
                <ChevronLeft className="w-12 h-12" />
              </button>

              <motion.div
                key={currentIndex}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="relative w-full h-full flex items-center justify-center"
                onClick={(e) => e.stopPropagation()}
              >
                <Image
                  src={outboundPhotos[currentIndex].url}
                  alt={outboundPhotos[currentIndex].alt}
                  fill
                  className="object-contain"
                  priority
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <button
                onClick={handleNext}
                className="absolute right-0 md:-right-12 text-white/50 hover:text-white transition-colors p-2 z-[110]"
              >
                <ChevronRight className="w-12 h-12" />
              </button>
            </div>

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 font-mono text-sm">
              {currentIndex + 1} / {outboundPhotos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
