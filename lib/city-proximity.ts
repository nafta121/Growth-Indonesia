import { CITIES } from './cities';

// Coordinates [latitude, longitude] for East Java cities
const CITY_COORDS: Record<string, [number, number]> = {
  madiun: [-7.6298, 111.5239],
  ponorogo: [-7.8671, 111.4666],
  magetan: [-7.6543, 111.3282],
  ngawi: [-7.4026, 111.4449],
  nganjuk: [-7.6044, 111.9044],
  pacitan: [-8.1997, 111.0990],
  kediri: [-7.8480, 112.0178],
  surabaya: [-7.2575, 112.7521],
  malang: [-7.9666, 112.6326],
  batu: [-7.8671, 112.5239],
  sidoarjo: [-7.4478, 112.7183],
  gresik: [-7.1567, 112.6555],
  mojokerto: [-7.4726, 112.4381],
  jombang: [-7.5460, 112.2331],
  jember: [-8.1845, 113.6681],
  banyuwangi: [-8.2192, 114.3691],
  probolinggo: [-7.7543, 113.2159],
  pasuruan: [-7.6453, 112.9075],
  trenggalek: [-8.0503, 111.7081],
  tulungagung: [-8.0657, 111.9026],
  blitar: [-8.0955, 112.1609],
  lamongan: [-7.1190, 112.4162],
  tuban: [-6.8976, 112.0649],
  bojonegoro: [-7.1502, 111.8817],
  bangkalan: [-7.0455, 112.7351],
  sampang: [-7.1872, 113.2394],
  pamekasan: [-7.1568, 113.4746],
  sumenep: [-7.0086, 113.8586],
  lumajang: [-8.1335, 113.2248],
  bondowoso: [-7.9135, 113.8214],
  situbondo: [-7.7062, 114.0098],
};

export function getNearbyCities(targetCityKey: string, count: number = 6): string[] {
  const allCities = Object.keys(CITIES);
  const origin = CITY_COORDS[targetCityKey];
  if (!origin) {
    return allCities.slice(0, count);
  }

  return allCities
    .filter((key) => key !== targetCityKey)
    .sort((a, b) => {
      const [aLat, aLng] = CITY_COORDS[a] || [0, 0];
      const [bLat, bLng] = CITY_COORDS[b] || [0, 0];
      const distA = (aLat - origin[0]) ** 2 + (aLng - origin[1]) ** 2;
      const distB = (bLat - origin[0]) ** 2 + (bLng - origin[1]) ** 2;
      return distA - distB;
    })
    .slice(0, count);
}
