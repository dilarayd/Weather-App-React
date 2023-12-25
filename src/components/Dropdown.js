import { useWeather } from '../context/WeatherContext'

function Dropdown() {
  const { city, setCity, cityList } = useWeather()

  return (
    <div className="dropdown-container">
      <select value={city} onChange={(e) => setCity(e.target.value)} className='dropdown-box'>
        {cityList.map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  )
}
export default Dropdown;