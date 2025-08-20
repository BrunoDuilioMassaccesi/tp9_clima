const API_KEY = '4d1f210849011189fe4b045d118f4b66';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

class WeatherService {
  // Obtener clima actual
  static async getCurrentWeather(city, unit = 'metric') {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      
      if (!response.ok) {
        throw new Error('Ciudad no encontrada');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener pronóstico por hora
  static async getHourlyForecast(city, unit = 'metric') {
    try {
      const response = await fetch(
        `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=${unit}`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener pronóstico por horas');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Obtener pronóstico diario
  static async getDailyForecast(lat, lon, unit = 'metric') {
    try {
      const response = await fetch(
        `${BASE_URL}/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&appid=${API_KEY}&units=${unit}`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener pronóstico diario');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Buscar ciudad por coordenadas
  static async getWeatherByCoords(lat, lon, unit = 'metric') {
    try {
      const response = await fetch(
        `${BASE_URL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=${unit}`
      );
      
      if (!response.ok) {
        throw new Error('Error al obtener clima por coordenadas');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default WeatherService;
