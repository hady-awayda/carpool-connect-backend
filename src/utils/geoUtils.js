const EARTH_RADIUS_KM = 6371;

export const calculateLatLngBounds = (lat, lng, distanceKm = 30) => {
  const latChange = (distanceKm / EARTH_RADIUS_KM) * (180 / Math.PI); // Approx change in lat
  const lngChange =
    (distanceKm / (EARTH_RADIUS_KM * Math.cos((lat * Math.PI) / 180))) *
    (180 / Math.PI); // Approx change in lng

  const minLat = lat - latChange;
  const maxLat = lat + latChange;
  const minLng = lng - lngChange;
  const maxLng = lng + lngChange;

  return { minLat, maxLat, minLng, maxLng };
};

export const calculateProximity = (lat1, lon1, lat2, lon2) => {
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = EARTH_RADIUS_KM * c;
  return distance;
};

export const calculateTimeDifference = (time1, time2) => {
  const differenceInMs = new Date(time2) - new Date(time1);
  return Math.abs(differenceInMs / (1000 * 60));
};
