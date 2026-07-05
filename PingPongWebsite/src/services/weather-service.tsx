
export type WeatherData = {
  date: string;
  temperatureC: number;
  summary: string;
  temperatureF: number;
};

export const getWeatherForcast = async () => {
  const url = "http://localhost:5167/weatherforecast";
  const response = await fetch(url);
  const weatherData: WeatherData[] = await response.json();
  return weatherData;
};
