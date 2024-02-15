import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weatherInfo, setWeatherInfo] = useState();
  const [currentDate, setDate] = useState(new Date());

  const WeatherReportCall = (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    const APIKey = "ee3a80c22900f5a43e517ffa956e525f";
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`;
    //const langUrl = `https://api.openweathermap.org/data/2.5/weather?id=524901&lang=fr&appid=${APIKey}`;
    console.log(url);
    //console.log(langUrl);

    fetch(url)
      .then((response) => response.json())
      .then((data) => setWeatherInfo(data))
      .catch((error) => console.log("Fetching Error", error));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const day = currentDate.getDate();

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
          <h2>
            Today is {year}/{month}/{day}
          </h2>
          <p>Temperature : {(weatherInfo.main.temp - 273.15).toFixed(2)}'C</p>
          <p>Humidity : {weatherInfo.main.humidity}%</p>
    
        </div>
      )}
    </div>
  );
}

export default App;
