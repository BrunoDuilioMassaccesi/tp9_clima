import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Estado inicial
const initialState = {
  theme: 'light',
  unit: 'metric', // 'metric' para Celsius, 'imperial' para Fahrenheit
  currentWeather: null,
  forecast: null,
  loading: false,
  error: null,
  lastSearchedCity: localStorage.getItem('lastSearchedCity') || 'Buenos Aires',
};

// Tipos de acciones
const actionTypes = {
  SET_THEME: 'SET_THEME',
  SET_UNIT: 'SET_UNIT',
  SET_LOADING: 'SET_LOADING',
  SET_WEATHER: 'SET_WEATHER',
  SET_FORECAST: 'SET_FORECAST',
  SET_ERROR: 'SET_ERROR',
  SET_CITY: 'SET_CITY',
};

// Reducer
const weatherReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_THEME:
      return { ...state, theme: action.payload };
    case actionTypes.SET_UNIT:
      return { ...state, unit: action.payload };
    case actionTypes.SET_LOADING:
      return { ...state, loading: action.payload };
    case actionTypes.SET_WEATHER:
      return { ...state, currentWeather: action.payload };
    case actionTypes.SET_FORECAST:
      return { ...state, forecast: action.payload };
    case actionTypes.SET_ERROR:
      return { ...state, error: action.payload };
    case actionTypes.SET_CITY:
      localStorage.setItem('lastSearchedCity', action.payload);
      return { ...state, lastSearchedCity: action.payload };
    default:
      return state;
  }
};

// Crear contexto
const WeatherContext = createContext();

// Provider
export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useReducer(weatherReducer, initialState);

  // Efecto para aplicar tema
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', state.theme);
    localStorage.setItem('theme', state.theme);
  }, [state.theme]);

  // Acciones
  const actions = {
    setTheme: (theme) => dispatch({ type: actionTypes.SET_THEME, payload: theme }),
    setUnit: (unit) => dispatch({ type: actionTypes.SET_UNIT, payload: unit }),
    setLoading: (loading) => dispatch({ type: actionTypes.SET_LOADING, payload: loading }),
    setWeather: (weather) => dispatch({ type: actionTypes.SET_WEATHER, payload: weather }),
    setForecast: (forecast) => dispatch({ type: actionTypes.SET_FORECAST, payload: forecast }),
    setError: (error) => dispatch({ type: actionTypes.SET_ERROR, payload: error }),
    setCity: (city) => dispatch({ type: actionTypes.SET_CITY, payload: city }),
  };

  return (
    <WeatherContext.Provider value={{ state, actions }}>
      {children}
    </WeatherContext.Provider>
  );
};

// Hook personalizado
export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (!context) {
    throw new Error('useWeather debe ser usado dentro de WeatherProvider');
  }
  return context;
};
