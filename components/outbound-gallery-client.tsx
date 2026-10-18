'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface OutboundGalleryClientProps {
  photos: { id: number; url: string; alt: string }[];
  children: React.ReactNode;
}

export default function OutboundGalleryClient({ photos, children }: OutboundGalleryClientProps) {
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
    setCurrentIndex((prev) => (prev !== null ? (prev - 1 + photos.length) % photos.length : null));
  }, [photos.length]);

  const handleNext = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCurrentIndex((prev) => (prev !== null ? (prev + 1) % photos.length : null));
  }, [photos.length]);

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
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {React.Children.map(children, (child, index) => (
          <motion.button
            key={index}
            type="button"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            viewport={{ once: true }}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Lihat gambar ${index + 1}`}
            className="group relative aspect-square overflow-hidden rounded-xl md:rounded-[2rem] cursor-pointer bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 active:scale-95 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500 text-left"
          >
            {child}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-md p-3 md:p-4 rounded-xl border border-white/30 scale-50 group-hover:scale-100 transition-all duration-500">
                <Maximize2 className="text-white w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Lightbox Overlay */}
      <AnimatePresence>
        {currentIndex !== null && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Galeri Foto Outbound"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-12"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Tutup galeri"
              className="absolute top-[max(1.5rem,env(safe-area-inset-top))] right-[max(1.5rem,env(safe-area-inset-right))] min-h-12 min-w-12 p-2.5 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-colors z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
            >
              <X className="w-7 h-7" aria-hidden="true" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Gambar sebelumnya"
                className="absolute left-2 md:-left-12 min-h-12 min-w-12 p-2.5 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-colors z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
              >
                <ChevronLeft className="w-8 h-8" aria-hidden="true" />
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
                  src={photos[currentIndex].url}
                  alt={photos[currentIndex].alt}
                  fill
                  className="object-contain"
                  referrerPolicy="no-referrer"
                />
              </motion.div>

              <button
                type="button"
                onClick={handleNext}
                aria-label="Gambar selanjutnya"
                className="absolute right-2 md:-right-12 min-h-12 min-w-12 p-2.5 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-colors z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
              >
                <ChevronRight className="w-8 h-8" aria-hidden="true" />
              </button>
            </div>

            {/* Counter */}
            <div className="absolute bottom-[max(1.5rem,env(safe-area-inset-bottom))] left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-black/60 border border-white/15 text-white font-mono text-sm tabular-nums">
              {currentIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
