import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { FaMoon, FaSun, FaThermometerHalf, FaThermometerFull } from 'react-icons/fa';

function WeatherControls() {
  const { state, actions } = useWeather();

  const toggleTheme = () => {
    actions.setTheme(state.theme === 'light' ? 'dark' : 'light');
  };

  const toggleUnit = () => {
    actions.setUnit(state.unit === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="weather-controls">
      <button 
        className="control-button theme-toggle" 
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        {state.theme === 'light' ? <FaMoon /> : <FaSun />}
      </button>
      
      <button 
        className="control-button unit-toggle" 
        onClick={toggleUnit}
        aria-label="Toggle temperature unit"
      >
        {state.unit === 'metric' ? <FaThermometerHalf /> : <FaThermometerFull />}
        <span>{state.unit === 'metric' ? '°C' : '°F'}</span>
      </button>
    </div>
  );
}

export default WeatherControls;
