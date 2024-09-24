import axios from "axios";
import { frechetDistance } from "frechet";
import { dtwDistance } from "dtw";

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

    const route1 = route1Response.data.routes[0].overview_polyline.points;
    const route2 = route2Response.data.routes[0].overview_polyline.points;

    const decodedRoute1 = decodePolyline(route1);
    const decodedRoute2 = decodePolyline(route2);

    const frechetScore = frechetDistance(decodedRoute1, decodedRoute2);
    const dtwScore = dtwDistance(decodedRoute1, decodedRoute2);

    const combinedScore = (frechetScore + dtwScore) / 2;

    return { frechetScore, dtwScore, combinedScore };
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
