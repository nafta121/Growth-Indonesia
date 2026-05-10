import { CITIES } from './cities';

export function getNearbyCities(targetCityKey: string, count: number = 6): string[] {
  const allCities = Object.keys(CITIES);
  const index = allCities.indexOf(targetCityKey);
  
  if (index === -1) {
    return allCities.slice(0, count);
  }

  const nearby: string[] = [];
  for (let i = 1; i <= count; i++) {
    nearby.push(allCities[(index + i) % allCities.length]);
  }
  
  return nearby;
}
