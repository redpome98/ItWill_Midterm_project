import { useState } from "react";
import "./App.css";

function App(position) {
  const [weatherInfo, setWeatherInfo] = useState();

  const WeatherReportCall = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const APIKey = "ee3a80c22900f5a43e517ffa956e525f";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    console.log(url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => setWeatherInfo(data))
      .catch((error) => console.log("Fetching Error", error));
  };

  const BtnWeatherReport = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(WeatherReportCall);
    } else {
      console.log("This Browser is not support Geolocation");
    }
  };

  return (
    <div className="weatherReport">
      <button onClick={BtnWeatherReport}>Report Weather</button>
      {weatherInfo && (
        <div>
          <h2>Weather Report</h2>
          <p>Temperature : {(weatherInfo.main.temp - 273.15).toFixed(2)}'C</p>
          <p>Humid : {weatherInfo.humidty}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
