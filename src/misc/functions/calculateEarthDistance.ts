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
