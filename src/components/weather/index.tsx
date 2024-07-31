import { useEffect, useState } from "react";

const Weather = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_APP_API_KEY;
  const city = import.meta.env.VITE_APP_CITY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(`La temperatura en ${city} es ${data.main.temp}°C`);
        setWeatherData(data);
      } catch (error) {
        console.error("Error:", error);
        setError("Failed to fetch weather data");
      }
    };

    fetchData();
  }, [url]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!weatherData) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h4>Clima</h4>
      <div>
        La temperatura en {city} es {weatherData.main.temp}°C
      </div>
    </>
  );
};

export default Weather;
