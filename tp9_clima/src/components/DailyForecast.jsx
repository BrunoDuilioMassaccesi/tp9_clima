import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

function DailyForecast({ forecastData }) {
  if (!forecastData || !forecastData.list) return null;

  // Group forecast by days
  const dailyData = [];
  const seenDates = new Set();

  forecastData.list.forEach(item => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    if (!seenDates.has(date)) {
      seenDates.add(date);
      dailyData.push(item);
    }
  });

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  return (
    <div className="daily-forecast">
      <h3>
        <FaCalendarAlt /> 5-Day Forecast
      </h3>
      
      <div className="daily-container">
        {dailyData.slice(0, 5).map((day, index) => (
          <div key={index} className="daily-item">
            <span className="day">{formatDay(day.dt)}</span>
            <img 
              src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`} 
              alt={day.weather[0].description}
            />
            <div className="temp-range">
              <span className="max">{Math.round(day.main.temp_max)}°</span>
              <span className="min">{Math.round(day.main.temp_min)}°</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DailyForecast;
