import { useWeather } from "../context/WeatherContext";

function Cards() {
  const { dailyForecasts } = useWeather();

  const groupedForecasts = dailyForecasts.reduce((grouped, forecast) => {
    const date = new Date(forecast.dt * 1000).toLocaleDateString('tr-TR', { weekday: 'long' });

    if (!grouped[date]) {
      grouped[date] = { min: forecast.main.temp, max: forecast.main.temp, icon: forecast.weather[0].icon };
    } else {
      grouped[date].min = Math.min(grouped[date].min, forecast.main.temp);
      grouped[date].max = Math.max(grouped[date].max, forecast.main.temp);
    }

    return grouped;
  }, {});

  const today = new Date().toLocaleDateString('tr-TR', { weekday: 'long' });

  return (
    <div style={{ display: "flex", gap: "10px", overflowX: "auto" }} className="card-top">
      {Object.entries(groupedForecasts).map(([date, temperatures]) => (
        <div
          key={date}
          style={{
            border: date === today ? "1px solid #ccc" : "none",
            padding: "10px",
          }}
        >
          <p>{date}</p>
          <div>
            <img
              src={`https://openweathermap.org/img/wn/${temperatures.icon}@2x.png`}
              alt="Weather Icon"
            />
            <p className="temperature">
              <span>{parseInt(temperatures.max - 273.15)}° </span>
              {""}
              <span className="temperature-min"> {parseInt(temperatures.min - 273.15)}°</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cards;
