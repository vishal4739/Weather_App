import React, { useState, useEffect } from 'react';
import '../Css/Weather.css';
import cloud from '../assets/cloud.png';
import hum from '../assets/humidity.png';
import wind from '../assets/wind.png';
import search1 from '../assets/search.png';

const Weather = () => {
  const [city, setCity] = useState('Delhi');
  const [weatherData, setWeatherData] = useState(null);

  const apiKey = "e2186f18f9c8a4bd30379678a92d97c6";
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const search = async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      setWeatherData(data);

    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    search();
   
  }, []);

  return (
    <div>
      <div className="main">
        <div className="search">
          <input
            type="text"
            className="cityIn"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <span className='search-icon'>
            <img src={search1} alt="" onClick={search} />
          </span>
        </div>

        {weatherData && (
          <div className="main2">
            <div className="container1">
              <div className="city">
                <h1>{weatherData.name}</h1>
              </div>

              <div className='temp'>
                <img src={cloud} alt="" />
                <h1>{Math.round(weatherData.main.temp - 273.15)}°C</h1>
                <h6>{weatherData.weather[0].description}</h6>
              </div>
            </div>

            <div className="container2">
              <div className='wind'>
                <img src={wind} alt="" />
                <h1>{weatherData.wind.speed} km/h</h1>
                <h5>Wind Speed</h5>
              </div>

              <div className='hum'>
                <img src={hum} alt="" />
                <h1>{weatherData.main.humidity}%</h1>
                <h5>Humidity</h5>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Weather;
