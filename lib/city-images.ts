import { CITIES } from './cities';

export function getCityImage(cityKey: string): string {
  const allCities = Object.keys(CITIES);
  const index = allCities.indexOf(cityKey);
  
  const images = [
    "https://growthindonesia.my.id/cdn/outbound/2022-10-22-09-00-09.webp",
    "https://growthindonesia.my.id/cdn/outbound/2022-11-05-06-52-48.webp",
    "https://growthindonesia.my.id/cdn/outbound/screenshot-20260430-171224.webp"
  ];
  
  if (index === -1) return images[0];
  
  return images[index % images.length];
}
