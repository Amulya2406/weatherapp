import React, { useState } from 'react';
import './weather.css';

const WeatherApp = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] =useState('');
  const API_KEY = 'c9ff976efcb7da7ad33e73f754c33a35'; // Replace with your API key

  const fetchWeatherData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`
      );
  
      if (!response.ok) {
        throw new Error('Location not found. Please enter a valid city or zip code.');
      }
  
      const data = await response.json();
      setWeatherData(data);
      setLoading(false);
      setErrorMessage('');
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
      setWeatherData(null);
      setLoading(false);
      setErrorMessage(error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-app">
      <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter city"
        />
        <button type="submit">Get Weather</button>
      </form>
      {loading && <p>Loading...</p>}
    {weatherData ? (
      <div className="weather-info">
        <h2>{weatherData.name}</h2>
        <p>Temperature: {weatherData.main.temp}°C</p>
        <p>Weather: {weatherData.weather[0].description}</p>
      </div>
    ) : (
      <p className="error-message"> {errorMessage}</p>
    )}
  </div>

  );
};

export default WeatherApp;