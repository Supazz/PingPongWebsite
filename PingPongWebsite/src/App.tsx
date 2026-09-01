import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import heroImg from "./assets/hero.png";
import "./App.css";

import { WeatherDataComponent } from "./components/weather-data-component";
import type { NewPersonDTO, Person } from "./persons/persons.model";
import { createPerson } from "./persons/persons.service";

function App() {

  return (
    <>    
    This is my website 
    </>
  );
}

export default App;
