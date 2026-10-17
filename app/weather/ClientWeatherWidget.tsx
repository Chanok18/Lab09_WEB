"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
  };
}

const cities = {
  Tokyo: { lat: 35.6762, lon: 139.6503 },
  "New York": { lat: 40.7128, lon: -74.006 },
  London: { lat: 51.5074, lon: -0.1278 },
  Sydney: { lat: -33.8688, lon: 151.2093 },
};

type City = keyof typeof cities;

export default function ClientWeatherWidget() {
  const [city, setCity] = useState<City>("Tokyo");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function fetchWeather() {
      setLoading(true);
      setError("");

      try {
        const coords = cities[city];

        const response = await axios.get<WeatherData>(
          "https://api.open-meteo.com/v1/forecast",
          {
            params: {
              latitude: coords.lat,
              longitude: coords.lon,
              current_weather: true,
            },
          }
        );

        if (active) setWeather(response.data);
      } catch {
        if (active) setError("No se pudo obtener el clima.");
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchWeather();

    return () => {
      active = false;
    };
  }, [city]);

  return (
    <div className="rounded-2xl border-4 border-white bg-white/90 p-6 shadow-2xl backdrop-blur">
      <div className="mb-4 flex items-center gap-2">
        <div className="h-3 w-3 animate-pulse rounded-full bg-blue-500" />
        <h2 className="text-2xl font-bold text-gray-800">
          Mundo - CSR
        </h2>
      </div>

      <select
        value={city}
        onChange={(e) => setCity(e.target.value as City)}
        className="mb-4 w-full rounded-lg border-2 border-gray-300 p-3 font-semibold text-gray-700"
      >
        {Object.keys(cities).map((name) => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </select>

      {loading ? (
        <p className="py-8 text-center text-gray-600">
          Cargando clima...
        </p>
      ) : error ? (
        <p className="py-8 text-red-600">{error}</p>
      ) : weather ? (
        <>
          <div className="mb-2 text-6xl font-bold text-blue-600">
            {weather.current_weather.temperature}°C
          </div>
          <p className="text-gray-600">
            Viento: {weather.current_weather.windspeed} km/h
          </p>
        </>
      ) : null}

      <div className="mt-4 rounded-lg border-2 border-blue-200 bg-blue-50 p-3">
        <p className="text-xs text-blue-800">
          🔄 Datos actualizados dinámicamente - Interactividad total
        </p>
      </div>
    </div>
  );
}
