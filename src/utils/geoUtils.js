const EARTH_RADIUS_KM = 6371;

export const calculateLatLngBounds = (lat, lng, distanceKm = 30) => {
  const numLat = Number(lat);
  const numLng = Number(lng);

  if (isNaN(numLat) || isNaN(numLng)) {
    throw new Error(
      "Invalid latitude or longitude. Please provide numeric values."
    );
  }

  const latChange = (distanceKm / EARTH_RADIUS_KM) * (180 / Math.PI);
  const lngChange =
    (distanceKm / (EARTH_RADIUS_KM * Math.cos((numLat * Math.PI) / 180))) *
    (180 / Math.PI);

  const minLat = numLat - latChange;
  const maxLat = numLat + latChange;
  const minLng = numLng - lngChange;
  const maxLng = numLng + lngChange;

  return {
    minLat: Number(minLat.toFixed(8)),
    maxLat: Number(maxLat.toFixed(8)),
    minLng: Number(minLng.toFixed(8)),
    maxLng: Number(maxLng.toFixed(8)),
  };
};

export const calculateTimeDifference = (time1, time2) => {
  const date1 = new Date(time1);
  const date2 = new Date(time2);

  if (isNaN(date1.getTime()) || isNaN(date2.getTime())) {
    throw new Error("Invalid date format. Please provide valid date strings.");
  }

  const differenceInMs = date2 - date1;
  return Math.abs(differenceInMs / (1000 * 60));
};
