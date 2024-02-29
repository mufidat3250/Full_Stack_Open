import { useState, useEffect } from "react";
import axios from 'axios'
const Country = ({ country }) => {
    console.log(country);
    const { name, languages, flags, capital, area } = country;
    console.log({ name });
    const [weather, setWeather] = useState(null);
    const api_key = import.meta.env.VITE_SOME_KEY;
  
    // const url = `https://api.openweathermap.org/data/2.5/weather?=${country[0].capital[0]}&units=metric&appid=${api_key}`;
  
    // https://api.openweathermap.org/data/2.5/weather?lat=${country.latlng[0]}$lng=${country.latlng[1]}&units=metric&appid=${api_key}
  
    useEffect(() => {
      axios
        .get
        // `https://api.openweathermap.org/data/2.5/weather?lat=${country[0].latlng[0]}$lng=${country[0].latlng[1]}&units=metric&appid=${api_key}`
        ()
        .then((res) => {
          setWeather(res.data);
        })
        .catch((error) => console.log(error));
    }, []);
  
    if (weather) {
      return (
        <div>
          <div>
            <h1>{name.common}</h1>
            <p>Capital: {capital[0]}</p>
            <p>Area: {area}</p>
            <h1>Languages</h1>
            <ul>
              {Object.values(eachCountry?.languages).map((language, index) => (
                <div key={`${index}`}>{language}</div>
              ))}
            </ul>
            <img src={flags.png} alt="flag" />
            <div>
              <h1>Weather in {name.common}</h1>
              <p>temperature: {weather.main.temp} Celcius</p>
              <img
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt=""
              />
              <p>{weather.wind.speed}m/s</p>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div>
        <div>
          <h1>{name.common}</h1>
          <p>Capital: {capital[0]}</p>
          <p>Area: {area}</p>
          <h1>Languages</h1>
          <ul>
            {Object.values(languages).map((language, index) => (
              <div key={`${index}`}>{language}</div>
            ))}
          </ul>
          <img src={flags.png} alt="flag" />
        </div>
      </div>
    );
    
  };
  export default Country