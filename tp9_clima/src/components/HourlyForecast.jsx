import React from 'react';
import { FaClock } from 'react-icons/fa';

function HourlyForecast({ forecastData }) {
  if (!forecastData || !forecastData.list) return null;

  const hourlyData = forecastData.list.slice(0, 8); // Next 24 hours (3-hour intervals)

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      hour12: true 
    });
  };

  return (
    <div className="hourly-forecast">
      <h3>
        <FaClock /> Hourly Forecast
      </h3>
      
      <div className="hourly-container">
        {hourlyData.map((hour, index) => (
          <div key={index} className="hourly-item">
            <span className="hour">{formatTime(hour.dt)}</span>
            <img 
              src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}.png`} 
              alt={hour.weather[0].description}
            />
            <span className="temp">{Math.round(hour.main.temp)}°</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HourlyForecast;
