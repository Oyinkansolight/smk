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
