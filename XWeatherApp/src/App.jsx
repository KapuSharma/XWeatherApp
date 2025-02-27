import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchWeather = async () => {
    if (!city) return;

    setError('');
    setWeatherData(null); // Clear previous data
    setIsLoading(true);

    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=3c33ab9f9cac45c3bcc171004252702&q=${city}`
      );
      setWeatherData(response.data);
    } catch (err) {
      setError('Failed to fetch weather data. Please check the city name or try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          fetchWeather();
        }}
      >
        <input
          type="text"
          placeholder="Enter the city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading data...</p>}
      {error && <p className="error-message">{error}</p>}

      {weatherData && (
        <div className="weather-cards">
          <div className="weather-card">
            <h3>Temperature</h3>
            <p>{weatherData.current.temp_c}°C</p>
          </div>
          <div className="weather-card">
            <h3>Humidity</h3>
            <p>{weatherData.current.humidity}%</p>
          </div>
          <div className="weather-card">
            <h3>Condition</h3>
            <p>{weatherData.current.condition.text}</p>
          </div>
          <div className="weather-card">
            <h3>Wind Speed</h3>
            <p>{weatherData.current.wind_kph} kph</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
