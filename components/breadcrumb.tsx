'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  variant?: 'dark' | 'light';
  className?: string;
  includeSchema?: boolean;
}

export function Breadcrumb({
  items,
  variant = 'dark',
  className = '',
  includeSchema = true,
}: BreadcrumbProps) {
  if (!items || items.length === 0) return null;

  const isDark = variant === 'dark';

  const containerClasses = isDark
    ? 'text-slate-300'
    : 'text-slate-600';

  const linkClasses = isDark
    ? 'hover:text-white transition-colors'
    : 'hover:text-brand transition-colors';

  const activeClasses = isDark
    ? 'text-white font-semibold'
    : 'text-gray-900 font-semibold';

  const separatorClasses = isDark
    ? 'text-slate-500'
    : 'text-slate-400';

  // Build JSON-LD BreadcrumbList Schema
  const schemaLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => {
      const fullUrl = item.href
        ? item.href.startsWith('http')
          ? item.href
          : `https://growthindonesia.my.id${item.href}`
        : undefined;

      const listItem: Record<string, unknown> = {
        '@type': 'ListItem',
        position: index + 1,
        name: item.label,
      };

      if (fullUrl) {
        listItem.item = fullUrl;
      }

      return listItem;
    }),
  };

  return (
    <>
      {includeSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaLd) }}
        />
      )}
      <nav
        aria-label="Breadcrumb"
        className={`flex items-center text-xs sm:text-sm ${containerClasses} ${className}`}
      >
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            const isFirst = index === 0;

            return (
              <li key={index} className="inline-flex items-center gap-1.5 sm:gap-2">
                {index > 0 && (
                  <ChevronRight
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${separatorClasses}`}
                    aria-hidden="true"
                  />
                )}
                {isLast || !item.href ? (
                  <span
                    className={`inline-flex items-center gap-1.5 ${activeClasses} truncate max-w-[180px] sm:max-w-xs`}
                    aria-current={isLast ? 'page' : undefined}
                  >
                    {isFirst && <Home className="w-3.5 h-3.5 shrink-0" />}
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.href}
                    className={`inline-flex items-center gap-1.5 ${linkClasses} truncate max-w-[140px] sm:max-w-xs`}
                  >
                    {isFirst && <Home className="w-3.5 h-3.5 shrink-0" />}
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
export default Breadcrumb;
