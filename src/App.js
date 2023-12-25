import './App.css';
import Cards from './components/Cards';
import Dropdown from './components/Dropdown';

import { WeatherProvider }from './context/WeatherContext';

function App() {
  return (
     <WeatherProvider>
     <Dropdown/>
     <Cards/>
     </WeatherProvider>
  );
}

export default App;
