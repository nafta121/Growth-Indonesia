import React from 'react';
import Image, { ImageProps } from 'next/image';

export interface SEOImageProps extends Omit<ImageProps, 'alt'> {
  /**
   * Mandatory descriptive alt text for Multimodal AI Grounding (Bing Copilot & LLM vision models).
   */
  alt: string;
  /**
   * Optional caption for enhanced multimodal visual context.
   */
  caption?: string;
  wrapperClassName?: string;
}

/**
 * SEOImage - Accessible & Multimodal AI Grounding Image Component
 * Enforces mandatory descriptive alt text for Bing Copilot, Bing Visual Search & AI Search Engines.
 */
export function SEOImage({
  alt,
  caption,
  className = '',
  wrapperClassName = '',
  ...props
}: SEOImageProps) {
  return (
    <figure className={`relative inline-block overflow-hidden ${wrapperClassName}`}>
      <Image
        {...props}
        alt={alt}
        className={className}
        referrerPolicy="no-referrer"
      />
      {caption && (
        <figcaption className="text-xs text-slate-400 mt-1.5 text-center italic font-sans">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
