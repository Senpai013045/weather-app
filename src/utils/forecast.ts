import axios from "axios";

export interface ForecastResponse {
  error: string | null;
  data: null | {
    timezone: string;
    current: {
      time: string;
      type: string;
      temperature: number;
      temperatureMin: number;
      temperatureMax: number;
      windSpeed: number;
      windGustsSpeed: number;
      windBearing: number;
      relHumidity: number;
      cloudCover: number;
      preasure: number;
      totalPrecipitation: number;
      rain: number;
      snow: number;
      uvIndex: number;
      airQualityIndex: number;
    };
  };
}

export const forecast = async (lat: number, lng: number) => {
  try {
    const response = await axios.get<ForecastResponse>(
      `https://api.troposphere.io/forecast/${lat},${lng}?token=e5e6b0fb6ba87c194ff46e91157c1c1e6ccf228642ce78bdea`
    );
    const {
      data: { error, data },
    } = response;

    if (!error && data) {
      const {
        current: { temperature },
      } = data;

      return { temperature };
    } else {
      throw new Error(`Location not found`);
    }
  } catch (err) {
    console.error(err.message || "Error fetching the forecast data");
  }
};
