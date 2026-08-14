import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";
import {
  getWeatherForcast,
  type WeatherData,
} from "./services/weather-service";
import { WeatherDataComponent } from "./components/weather-data-component";
import type { NewPersonDTO, Person } from "./persons/persons.model";
import { createPerson } from "./persons/persons.service";

function App() {
  const [counter, setCounter] = useState(0);
  const [weeklyWeatherData, setWeeklyWeatherData] = useState<WeatherData[]>([]);
  console.log("Rendering Component, counter " + counter);

  // function updateCounter() {

  return (
    <>
      <h1>Ping Pong Website</h1>
      <p>This button has been clicked {counter} times </p>
      <button
        onClick={() => {
          setCounter(counter + 1);
          console.log("setting counter to value: " + counter);
        }}
      >
        Click Me
      </button>
      {weeklyWeatherData.map((weatherData) => {
        return (
          <WeatherDataComponent
            weatherData={weatherData}
          ></WeatherDataComponent>
        );
      })}
      <button
        onClick={async () => {
          const weatherData: WeatherData[] = await getWeatherForcast();
          setWeeklyWeatherData(weatherData);
        }}
      >
        Get Weather Data
      </button>

      <button
        onClick={async () => {
          console.log("Creating Person!");
          const person: NewPersonDTO = {
            name: "Alice",
            email: "alice@test.com",
            elo: 1200,
          };
          const createdPerson: Person = await createPerson(person);
        }}
      >
        CREATE PERSON!
      </button>
    </>
  );
}

export default App;
