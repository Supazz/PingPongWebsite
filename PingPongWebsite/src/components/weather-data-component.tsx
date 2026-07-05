import type { WeatherData } from "../services/weather-service";

export function WeatherDataComponent({
  weatherData,
}: {
  weatherData: WeatherData;
}) {
  const formattedDate = new Date(weatherData.date).toLocaleDateString(
    undefined,
    {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    },
  );

  return (
    <div className="max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
      <h2 className="mb-4 text-2xl font-bold text-gray-800">
        Weather Forecast
      </h2>

      <div className="space-y-3">
        <div>
          <p className="text-sm font-medium text-gray-500">Date</p>
          <p className="text-lg text-gray-900">{formattedDate}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-lg bg-blue-50 p-4 text-center">
            <p className="text-sm text-gray-500">Celsius</p>
            <p className="text-3xl font-bold text-blue-600">
              {weatherData.temperatureC}°C
            </p>
          </div>

          <div className="rounded-lg bg-orange-50 p-4 text-center">
            <p className="text-sm text-gray-500">Fahrenheit</p>
            <p className="text-3xl font-bold text-orange-600">
              {weatherData.temperatureF}°F
            </p>
          </div>
        </div>

        <div>
          <p className="text-sm font-medium text-gray-500">Conditions</p>
          <p className="text-lg font-semibold text-gray-800">
            {weatherData.summary}
          </p>
        </div>
      </div>
    </div>
  );
}
