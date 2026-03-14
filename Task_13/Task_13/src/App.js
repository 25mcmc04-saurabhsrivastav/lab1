import React, { useState } from "react";
import SearchBar from "./SearchBar";
import Weather from "./Weather";
import Forecast from "./Forecast";
import { getWeather, getForecast } from "./weatherService";

function App() {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);

  const searchCity = async (city) => {
    const w = await getWeather(city);
    const f = await getForecast(city);
    setWeather(w);
    setForecast(f);
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <SearchBar onSearch={searchCity} />
      {weather && <Weather data={weather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;