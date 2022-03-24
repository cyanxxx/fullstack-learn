import React, { useEffect, useState } from 'react'
import axios from "axios"
function Weather({title, latlng}) {
  const [weather, setWeather] = useState({})
  const api_key = process.env.REACT_APP_API_KEY
  useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&units=metric&appid=${api_key}`).then((response) => {
      const data = response.data
      setWeather(data)
    })
  })
  return (
    <div>
      {Object.keys(weather).length > 0 && (
        <>
         <h2>
            Weather in {title}
          </h2>
          <div>temperature: {weather.main.temp} Celsius</div>
          <img src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`} alt={weather.weather.main} />
          <div>wind: {weather.wind.speed} meter/sec direction{weather.wind.deg} degrees </div>
        </>
      )}
    </div>
  )
}
function Country({info}) {
  return (
    <div>
      <h1>{info.name.common}</h1>
      <div>capital {info.capital.join(", ")}</div>
      <div>population {info.population}</div>
      <h2>Spoken Language</h2>
      <ul>
        {Object.values(info.languages).map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={info.flags.png} alt="flag" />
      <Weather title={info.name.common} latlng={info.latlng}></Weather>
    </div>
  )
}
function CountryList({info}) {
  const [ view, setView ] = useState(false)
  return (
    <div>
      {info.name.common}
      <button onClick={() => setView(true)}>show</button>
      {view && <Country info={info}></Country>}
    </div>
  )
}
function App() {
  const [ searchCountry, setSearchCountry ] = useState("")
  const [ countries, setCountries ] = useState([])
  const [ filterCountries, setFilterCountries ] = useState([])
  const isNone = () => {
    return filterCountries.length === 0
  }
  const tooMany = () => {
    return filterCountries.length > 10
  }
  const matchOne = () => {
    return filterCountries.length === 1
  }
  const handleFilter = (e) => {
    const value = e.target.value
    setSearchCountry(value)
    console.log(value)
    setFilterCountries(countries.filter(c => c.name.common.toLowerCase().indexOf(value) > -1))
  }
  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      const data = response.data
      setCountries(data)
    })
  }, [])
  return (
    <div>
      find countries <input value={searchCountry} onChange={handleFilter} />
      {!isNone() && (
        tooMany()? (
          <div>
            Too Many matches, specify another filter
          </div> 
        ):
        (
          matchOne()? (
            <Country info={filterCountries[0]}></Country> 
          ) : (
            filterCountries.map(country => <CountryList info={country} key={country.name.common}></CountryList>)
          )
        )
      )}
    </div>
  );
}

export default App;
