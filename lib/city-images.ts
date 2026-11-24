import { CITIES } from './cities';

const PRIMARY_CITY_IMAGES = [
  'https://growthindonesia.my.id/cdn/outbound/2022-10-22-09-00-09.webp',
  'https://growthindonesia.my.id/cdn/outbound/2022-11-05-06-52-48.webp',
  'https://growthindonesia.my.id/cdn/outbound/screenshot-20260430-171224.webp',
];

const SECONDARY_SLOT_IMAGES = [
  'https://growthindonesia.my.id/cdn/outbound/2022-11-05-07-25-41.webp',
  'https://growthindonesia.my.id/cdn/outbound/2022-11-05-09-09-46.webp',
  'https://growthindonesia.my.id/cdn/outbound/2022-12-08-09-01-25.webp',
  'https://growthindonesia.my.id/cdn/outbound/2022-12-08-10-17-30.webp',
  'https://growthindonesia.my.id/cdn/outbound/2022-12-08-10-56-15.webp',
  'https://growthindonesia.my.id/cdn/outbound/2022-12-08-11-00-35.webp',
  'https://growthindonesia.my.id/cdn/outbound/2022-12-08-11-31-54.webp',
  'https://growthindonesia.my.id/cdn/outbound/2023-01-07-07-48-27.webp',
  'https://growthindonesia.my.id/cdn/outbound/2023-01-07-07-52-36.webp',
  'https://growthindonesia.my.id/cdn/outbound/2023-01-07-08-09-44.webp',
  'https://growthindonesia.my.id/cdn/outbound/img-20250420-wa0002.webp',
];

export function getCityImage(cityKey: string, slotOffset = 0): string {
  const allCities = Object.keys(CITIES);
  const index = allCities.indexOf(cityKey);

  if (slotOffset <= 0) {
    if (index === -1) return PRIMARY_CITY_IMAGES[0];
    return PRIMARY_CITY_IMAGES[index % PRIMARY_CITY_IMAGES.length];
  }

  const baseIdx = index === -1 ? 0 : index;
  return SECONDARY_SLOT_IMAGES[(baseIdx + slotOffset - 1) % SECONDARY_SLOT_IMAGES.length];
}
