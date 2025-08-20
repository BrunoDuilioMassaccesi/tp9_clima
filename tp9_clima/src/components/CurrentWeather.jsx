import React from 'react';
import { FaMapMarkerAlt, FaTint, FaWind } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';

function CurrentWeather({ weatherData }) {
  if (!weatherData) return null;

  const { name, sys, main, weather, wind } = weatherData;
  const temperature = Math.round(main.temp);
  const feelsLike = Math.round(main.feels_like);
  const description = weather[0].description;
  const icon = weather[0].icon;

  return (
    <div className="current-weather">
      <div className="weather-location">
        <h2>
          <FaMapMarkerAlt /> {name}, {sys.country}
        </h2>
      </div>

      <div className="weather-main">
        <div className="weather-icon">
          <img 
            src={`https://openweathermap.org/img/wn/${icon}@4x.png`} 
            alt={description}
          />
        </div>
        
        <div className="weather-info">
          <div className="temperature">
            <span className="temp-value">{temperature}°</span>
            <span className="temp-unit">C</span>
          </div>
          
          <div className="weather-description">
            <p>{description.charAt(0).toUpperCase() + description.slice(1)}</p>
            <span className="feels-like">Feels like {feelsLike}°</span>
          </div>
        </div>
      </div>

      <div className="weather-details">
        <div className="detail-item">
          <WiHumidity />
          <span>Humidity</span>
          <strong>{main.humidity}%</strong>
        </div>
        
        <div className="detail-item">
          <FaWind />
          <span>Wind</span>
          <strong>{wind.speed} m/s</strong>
        </div>
        
        <div className="detail-item">
          <FaTint />
          <span>Pressure</span>
          <strong>{main.pressure} hPa</strong>
        </div>
      </div>
    </div>
  );
}

export default CurrentWeather;
