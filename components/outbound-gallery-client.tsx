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
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.03 }}
            viewport={{ once: true }}
            onClick={() => setCurrentIndex(index)}
            className="group relative aspect-square overflow-hidden rounded-xl md:rounded-[2rem] cursor-pointer bg-white shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 active:scale-95"
          >
            {child}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
              <div className="bg-white/20 backdrop-blur-md p-3 md:p-4 rounded-xl border border-white/30 scale-50 group-hover:scale-100 transition-all duration-500">
                <Maximize2 className="text-white w-6 h-6 md:w-8 md:h-8" />
              </div>
            </div>
          </motion.div>
        ))}
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
                  src={photos[currentIndex].url}
                  alt={photos[currentIndex].alt}
                  fill
                  className="object-contain"
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
              {currentIndex + 1} / {photos.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
