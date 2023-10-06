export default function calculateEarthDistance(
  lat1: number,
  long1: number,
  lat2: number,
  long2: number
) {
  return (
    Math.acos(
      Math.sin(lat1) * Math.sin(lat2) +
        Math.cos(lat1) * Math.cos(lat2) * Math.cos(long2 - long1)
    ) * 6371
  );
}

export function calculateEarthDistanceTwo(lat1, lat2, lon1, lon2) {
  // The math module contains a function
  // named toRadians which converts from
  // degrees to radians.
  lon1 = (lon1 * Math.PI) / 180;
  lon2 = (lon2 * Math.PI) / 180;
  lat1 = (lat1 * Math.PI) / 180;
  lat2 = (lat2 * Math.PI) / 180;

  // Haversine formula
  const dlon = lon2 - lon1;
  const dlat = lat2 - lat1;
  const a =
    Math.pow(Math.sin(dlat / 2), 2) +
    Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dlon / 2), 2);

  const c = 2 * Math.asin(Math.sqrt(a));

  // Radius of earth in kilometers. Use 3956
  // for miles
  const r = 6371;

  // calculate the result
  return c * r;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function flattenObject(obj: any, prefix = '') {
  if (obj) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return Object.keys(obj).reduce((acc: any, k) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[k] === 'object')
        Object.assign(acc, flattenObject(obj[k], pre + k));
      else acc[pre + k] = obj[k];
      return acc;
    }, {});
  }
  return '';
}
