import React,{useState,useEffect} from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

const Weather =({weather,capital})=>{
 console.log(weather);
 
 if (!weather) {
  return null
}
  return(
    <div>
    <h3>Weather in {capital}</h3>
    <div>
      <strong>temperature:</strong> {weather.temperature} Celcius
    </div>
    <img src={weather.weather_icons[0]} alt={weather.weather_descriptions[0]} />
    <div>
      <strong>wind:</strong> {weather.wind_speed} mph direction {weather.wind_dir}
    </div> 
  </div>
  )
}

const Country = ({country})=>{
  const [weather, setWeather] = useState(null)
  const api_key = process.env.REACT_APP_API_KEY
  console.log(api_key);
  useEffect(() => {
    axios.get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`).then(response=>{
      setWeather(response.data.current)
    })
  }, [api_key,country.capital])
  return(
    <div>
    <h1>{country.name}</h1>

    <div>
      <h2>Capital: {country.capital}</h2>
      <h2>Population: {country.population}</h2>
    </div>

    <h3>Languages</h3>
      <ul>
        {country.languages.map(lang => 
          <li key={lang.iso639_2}>
            {lang.name}
          </li>
        )}
      </ul>
      <div>
        <img src={country.flag} height="80px" alt="flag"/>
      </div> 
      <Weather weather={weather} capital={country.capital}/>
    </div>
  )
}


const Countries = ({ countries,setSearch}) => {
  if (countries.length === 0) {
    return (
      <div>
        no matches
      </div>
    )
  }

  if (countries.length === 1) {
    return (
      <Country country={countries[0]} />
    )
  }

  if (countries.length < 10) {
      return(
        <div>
          {countries.map(country =>
            <div key={country.name}>
              {country.name}
              <button onClick={() => setSearch(country.name)}>
                show
              </button>
            </div>
          )}
        </div>
      )
  }

  return (
    <div>
      Too many matches, specify another filter
    </div>
  )
}


const App = () => {
  const[search,setSearch]=useState('')
  const[countries,setCountries] = useState([])
  const handleSearch = (event)=>{
    setSearch(event.target.value);
  }
  useEffect(() => {
    axios.get(`https://restcountries.eu/rest/v2/name/${search}`).then(response=>{
      setCountries(response.data)
    })
  }, [search])
  return( 
  <>
  Search country name: <input value={search} onChange={handleSearch} />
  <Countries 
  countries={countries}
  setSearch={setSearch}
  />
  </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
