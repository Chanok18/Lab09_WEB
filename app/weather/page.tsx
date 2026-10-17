import axios from "axios";
import ClientWeatherWidget from "./ClientWeatherWidget";

export const dynamic = "force-dynamic";

interface WeatherData {
  current_weather: {
    temperature: number;
    windspeed: number;
    weathercode: number;
  };
}

async function getWeatherServer(): Promise<WeatherData> {
  const response = await axios.get<WeatherData>(
    "https://api.open-meteo.com/v1/forecast",
    {
      params: {
        latitude: -12.04,
        longitude: -77.03,
        current_weather: true,
      },
    }
  );

  return response.data;
}

export default async function WeatherDashboard() {
  let serverWeather: WeatherData | null = null;

  try {
    serverWeather = await getWeatherServer();
  } catch {
    console.error("No se pudo obtener el clima de Lima.");
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600 p-8">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-8 text-center text-5xl font-bold text-white drop-shadow-lg">
          ☁️ Dashboard del Clima
        </h1>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border-4 border-white bg-white/90 p-6 shadow-2xl backdrop-blur">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-3 animate-pulse rounded-full bg-green-500" />
              <h2 className="text-2xl font-bold text-gray-800">
                Lima - SSR
              </h2>
            </div>

            {serverWeather ? (
              <>
                <div className="mb-2 text-6xl font-bold text-blue-600">
                  {serverWeather.current_weather.temperature}°C
                </div>
                <p className="text-gray-600">
                  Viento: {serverWeather.current_weather.windspeed} km/h
                </p>
              </>
            ) : (
              <p className="text-red-600">
                No se pudo obtener el clima de Lima.
              </p>
            )}

            <div className="mt-4 rounded-lg border-2 border-green-200 bg-green-50 p-3">
              <p className="text-xs text-green-800">
                ✅ Datos obtenidos en el servidor - SEO friendly
              </p>
            </div>
          </div>

          <ClientWeatherWidget />
        </div>

        <div className="mt-8 rounded-2xl border-4 border-white bg-white/90 p-6 shadow-2xl backdrop-blur">
          <h3 className="mb-4 text-2xl font-bold text-gray-800">
            📊 Comparación SSR vs CSR
          </h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-800">
                <tr>
                  <th className="px-4 py-3">Característica</th>
                  <th className="px-4 py-3">SSR</th>
                  <th className="px-4 py-3">CSR</th>
                </tr>
              </thead>

              <tbody className="text-gray-700">
                <tr className="border-t">
                  <td className="px-4 py-3 font-semibold">SEO</td>
                  <td className="px-4 py-3 text-green-700">✅ Favorable</td>
                  <td className="px-4 py-3 text-red-600">⚠️ Limitado</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-4 py-3 font-semibold">Contenido inicial</td>
                  <td className="px-4 py-3 text-green-700">✅ Ya renderizado</td>
                  <td className="px-4 py-3 text-yellow-700">⏳ Carga después</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-3 font-semibold">Interactividad</td>
                  <td className="px-4 py-3">Requiere componentes cliente</td>
                  <td className="px-4 py-3 text-green-700">✅ Dinámica</td>
                </tr>
                <tr className="border-t bg-gray-50">
                  <td className="px-4 py-3 font-semibold">Carga del servidor</td>
                  <td className="px-4 py-3">Procesa la consulta</td>
                  <td className="px-4 py-3">Consulta desde el navegador</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
