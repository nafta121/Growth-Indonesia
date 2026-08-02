import React from 'react';
import { Breadcrumb } from './breadcrumb';

interface BreadcrumbSchemaProps {
  cityName: string;
  cityKey: string;
}

export function BreadcrumbSchema({ cityName, cityKey }: BreadcrumbSchemaProps) {
  const items = [
    { label: 'Beranda', href: '/' },
    { label: 'Layanan', href: '/layanan' },
  ];

  if (cityName && cityKey) {
    items.push({
      label: `Outbound ${cityName}`,
      href: `/layanan/${cityKey}`,
    });
  }

  return (
    <Breadcrumb
      items={items}
      variant="dark"
      includeSchema={true}
    />
  );
}
