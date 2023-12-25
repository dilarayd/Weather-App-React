import { createContext, useContext, useEffect, useState } from "react";

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState("İstanbul")
  const [weatherData, setWeatherData] = useState(null)
  const [cityList, setCityList] = useState([]);
  const [dailyForecasts, setDailyForecasts] = useState([]);

  useEffect(() => {
    const fetchCityList = async () => {
      try {
        const response = await fetch('/cities.json');
        const data = await response.json();
        setCityList(data);
      } catch (error) {
        console.error('Error fetching city list:', error);
      }
    };

    fetchCityList();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${city},tr&APPID=4c0952198a288cd399002b53b2e8b8be`
        );
        const data = await response.json();

        setWeatherData(data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchData();
  }, [city]);

  useEffect(() => {
    const fetchDailyForecasts = async () => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${city}&tr&APPID=4c0952198a288cd399002b53b2e8b8be`
        );
        const data = await response.json();
        setDailyForecasts(data.list);
      } catch (error) {
        console.error('Error fetching daily weather data:', error);
      }
    };

    fetchDailyForecasts();
  }, [city]);

  const values = {
    city,
    setCity,
    weatherData,
    setWeatherData,
    cityList,
    dailyForecasts,
  };

  return (
    <WeatherContext.Provider value={values}>
      {children}
    </WeatherContext.Provider>
  )
}

export const useWeather = () => useContext(WeatherContext)

