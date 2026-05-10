import { CITIES } from './cities';

export function getCityImage(cityKey: string): string {
  const allCities = Object.keys(CITIES);
  const index = allCities.indexOf(cityKey);
  
  const images = [
    "https://nafta121.sirv.com/OUTBOUND/2022-10-22%2009-00-09.jpeg",
    "https://nafta121.sirv.com/OUTBOUND/2022-11-05%2006-52-48.jpeg",
    "https://nafta121.sirv.com/Screenshot_20260430_171224_Chrome.jpg"
  ];
  
  if (index === -1) return images[0];
  
  return images[index % images.length];
}
