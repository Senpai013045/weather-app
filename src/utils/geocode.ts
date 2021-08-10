import axios from "axios";

export interface GeocodeResponse {
  type: string;
  query: Array<string>;
  features: Array<{
    id: string;
    type: string;
    place_type: Array<string>;
    relevance: number;
    properties: {
      [key: string]: string;
    };
    text: string;
    place_name: string;
    bbox: Array<number>;
    center: [lat: number, lng: number];
  }>;
}

export const geoCode = async (place: string) => {
  try {
    const response = await axios.get<GeocodeResponse>(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${place}.json?access_token=pk.eyJ1Ijoic2VucGFpMDEzMDQ1IiwiYSI6ImNrczN6dDlycDBzaWwydm10YXpveXR1eXoifQ.go9eT1BAS9DmvRAgYxgfTQ&limit=1`
    );
    const { data } = response;
    if (data.features[0]) {
      const latLng = data.features[0].center;
      const placeName = data.features[0].place_name;
      return { latLng, placeName };
    } else {
      throw new Error(`Place: ${place} not found in the response`);
    }
  } catch (err) {
    console.error(err.message || "Error fetching the geolocation");
  }
};
