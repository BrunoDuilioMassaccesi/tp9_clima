import React, { useEffect } from 'react';
import { useWeather } from '../context/WeatherContext';
import WeatherService from '../services/weatherService';
import SearchBar from './SearchBar';
import CurrentWeather from './CurrentWeather';
import HourlyForecast from './HourlyForecast';
import DailyForecast from './DailyForecast';
import WeatherControls from './WeatherControls';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import './WeatherApp.css';

function WeatherApp() {
  const { state, actions } = useWeather();
  const { lastSearchedCity, unit } = state;

  useEffect(() => {
    fetchWeatherData(lastSearchedCity);
  }, [lastSearchedCity, unit]);

  const fetchWeatherData = async (city) => {
    actions.setLoading(true);
    actions.setError(null);

    try {
      const [currentWeather, hourlyForecast] = await Promise.all([
        WeatherService.getCurrentWeather(city, unit),
        WeatherService.getHourlyForecast(city, unit)
      ]);

      actions.setWeather(currentWeather);
      actions.setForecast(hourlyForecast);
    } catch (error) {
      actions.setError(error.message);
    } finally {
      actions.setLoading(false);
    }
  };

  const handleCitySearch = async (city) => {
    actions.setCity(city);
  };

  return (
    <div className="weather-app">
      <header className="weather-header">
        <h1>Weather Forecast</h1>
        <WeatherControls />
      </header>

      <SearchBar onSearch={handleCitySearch} />

      {state.loading && <LoadingSpinner />}
      {state.error && <ErrorMessage message={state.error} />}
      
      {!state.loading && !state.error && state.currentWeather && (
        <div className="weather-content">
          <CurrentWeather weatherData={state.currentWeather} />
          <HourlyForecast forecastData={state.forecast} />
          <DailyForecast forecastData={state.forecast} />
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
