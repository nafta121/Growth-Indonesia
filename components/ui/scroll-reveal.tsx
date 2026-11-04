import React from 'react';
import { cn } from '@/lib/utils';

export interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  xOffset?: number;
  scale?: number;
  width?: "100%" | "fit-content" | "auto";
  animateOnce?: boolean;
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  className,
  width = "auto",
  style,
}: ScrollRevealProps) {
  return (
    <div
      className={cn(className)}
      style={{
        width: width === "auto" ? undefined : width,
        ...style,
      }}
    >
      {children}
    </div>
  );
}
