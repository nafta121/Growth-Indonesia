'use client';

import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  scale?: number;
  width?: "100%" | "fit-content" | "auto";
  animateOnce?: boolean;
}

export default function ScrollReveal({
  children,
  className,
  delay = 0,
  duration = 0.8,
  yOffset = 40,
  xOffset = 0,
  scale = 1,
  width = "auto",
  animateOnce = true,
}: ScrollRevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: yOffset, x: xOffset, scale }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: animateOnce, margin: "-10%" }}
      transition={{ delay, duration, ease: [0.16, 1, 0.3, 1] }}
      className={cn(className)}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
