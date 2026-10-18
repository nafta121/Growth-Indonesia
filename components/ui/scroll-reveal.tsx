'use client';

import { motion, useReducedMotion } from 'motion/react';
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
  duration = 0.28,
  yOffset = 12,
  xOffset = 0,
  scale = 1,
  width = "auto",
  animateOnce = true,
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const clampedY = Math.min(yOffset, 16);
  const clampedDuration = Math.min(duration, 0.35);
  const clampedDelay = Math.min(delay, 0.16);

  return (
    <motion.div
      initial={
        shouldReduceMotion
          ? { opacity: 0 }
          : {
              opacity: 0,
              transform: `translate3d(${xOffset}px, ${clampedY}px, 0px) scale(${scale})`,
            }
      }
      whileInView={
        shouldReduceMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              transform: 'translate3d(0px, 0px, 0px) scale(1)',
            }
      }
      viewport={{ once: animateOnce, margin: "-10%" }}
      transition={{
        delay: shouldReduceMotion ? 0 : clampedDelay,
        duration: shouldReduceMotion ? 0.15 : clampedDuration,
        ease: [0.23, 1, 0.32, 1],
      }}
      className={cn(className)}
      style={{ width }}
    >
      {children}
    </motion.div>
  );
}
