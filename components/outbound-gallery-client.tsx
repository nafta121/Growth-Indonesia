'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';

interface OutboundGalleryClientProps {
  photos: { id: number; url: string; alt: string }[];
  children: React.ReactNode;
}

export default function OutboundGalleryClient({ photos, children }: OutboundGalleryClientProps) {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

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
          <button
            key={index}
            type="button"
            onClick={() => setCurrentIndex(index)}
            aria-label={`Lihat gambar ${index + 1}`}
            className="group relative aspect-square overflow-hidden rounded-xl md:rounded-[2rem] cursor-pointer bg-white shadow-sm hover:shadow-2xl [@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 transition-[transform,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-red-500 text-left"
          >
            {child}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-md p-3 md:p-4 rounded-xl border border-white/30 scale-95 group-hover:scale-100 transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]">
                <Maximize2 className="text-white w-6 h-6 md:w-8 md:h-8" aria-hidden="true" />
              </div>
            </div>
          </button>
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
            transition={{ duration: 0.18, ease: [0.23, 1, 0.32, 1] }}
            onClick={handleClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 md:p-12"
          >
            <button
              type="button"
              onClick={handleClose}
              aria-label="Tutup galeri"
              className="absolute top-[max(1.5rem,env(safe-area-inset-top))] right-[max(1.5rem,env(safe-area-inset-right))] min-h-12 min-w-12 p-2.5 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-colors duration-150 z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
            >
              <X className="w-7 h-7" aria-hidden="true" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Gambar sebelumnya"
                className="absolute left-2 md:-left-12 min-h-12 min-w-12 p-2.5 flex items-center justify-center bg-black/60 hover:bg-black/80 border border-white/20 text-white transition-colors duration-150 z-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-full"
              >
                <ChevronLeft className="w-8 h-8" aria-hidden="true" />
              </button>

              <motion.div
                initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'scale(0.96)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, transform: 'scale(0.96)' }}
                transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
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
