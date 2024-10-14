import axios from "axios";
import frechetDistance from "frechet";
import DTW from "dtw";

const resamplePolyline = (polyline, numPoints) => {
  const resampled = [];
  const step = (polyline.length - 1) / (numPoints - 1);

  for (let i = 0; i < numPoints; i++) {
    const idx = Math.floor(i * step);
    const t = i * step - idx;

    if (idx >= polyline.length - 1) {
      resampled.push(polyline[polyline.length - 1]);
    } else {
      const lat = polyline[idx][0] * (1 - t) + polyline[idx + 1][0] * t;
      const lng = polyline[idx][1] * (1 - t) + polyline[idx + 1][1] * t;
      resampled.push([lat, lng]);
    }
  }

  return resampled;
};

const calculateCoordinateDistance = (point1, point2) => {
  const [lat1, lng1] = point1;
  const [lat2, lng2] = point2;

  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const distance = R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return distance;
};

export const getGoogleDirections = async (
  originLat1,
  originLng1,
  destLat1,
  destLng1,
  originLat2,
  originLng2,
  destLat2,
  destLng2
) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;

  const directionsUrl1 = `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat1},${originLng1}&destination=${destLat1},${destLng1}&key=${apiKey}`;
  const directionsUrl2 = `https://maps.googleapis.com/maps/api/directions/json?origin=${originLat2},${originLng2}&destination=${destLat2},${destLng2}&key=${apiKey}`;

  try {
    const [route1Response, route2Response] = await Promise.all([
      axios.get(directionsUrl1),
      axios.get(directionsUrl2),
    ]);

    if (route1Response.data.status !== "OK") {
      console.error(
        "Error fetching route 1:",
        route1Response.data.status,
        route1Response.data.error_message
      );
      return null;
    }

    if (route2Response.data.status !== "OK") {
      console.error(
        "Error fetching route 2:",
        route2Response.data.status,
        route2Response.data.error_message
      );
      return null;
    }

    const route1 = route1Response.data.routes[0].overview_polyline.points;
    const route2 = route2Response.data.routes[0].overview_polyline.points;

    const decodedRoute1 = decodePolyline(route1);
    const decodedRoute2 = decodePolyline(route2);

    const maxLength = Math.max(decodedRoute1.length, decodedRoute2.length);
    const resampledRoute1 = resamplePolyline(decodedRoute1, maxLength);
    const resampledRoute2 = resamplePolyline(decodedRoute2, maxLength);

    const frechetScore = frechetDistance(resampledRoute1, resampledRoute2);

    // Initialize DTW with a valid options object and a distance function that compares lat/lng pairs
    // const dtw = new DTW({ distanceFunction: calculateCoordinateDistance });
    // const dtwScore = dtw.compute(resampledRoute1, resampledRoute2);

    // const combinedScore = (frechetScore + dtwScore) / 2;

    return { frechetScore };
  } catch (error) {
    console.error("Google Maps API error:", error);

    return null;
  }
};

const decodePolyline = (encoded) => {
  let index = 0,
    lat = 0,
    lng = 0,
    coordinates = [];

  while (index < encoded.length) {
    let b,
      shift = 0,
      result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const deltaLat = result & 1 ? ~(result >> 1) : result >> 1;
    lat += deltaLat;

    shift = 0;
    result = 0;
    do {
      b = encoded.charCodeAt(index++) - 63;
      result |= (b & 0x1f) << shift;
      shift += 5;
    } while (b >= 0x20);
    const deltaLng = result & 1 ? ~(result >> 1) : result >> 1;
    lng += deltaLng;

    coordinates.push([lat / 1e5, lng / 1e5]);
  }

  return coordinates;
};
