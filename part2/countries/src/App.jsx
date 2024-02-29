import { useState } from "react";
import axios from "axios";
import "./App.css";
import { useEffect } from "react";
import Filter from "./component/Filter";
import Country from "./component/Country";
import CountryList from "./component/CountryList";

function App() {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState("");
  const api_key = import.meta.env.VITE_SOME_KEY;

  const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/all`;

  useEffect(() => {
    axios.get(baseUrl).then((res) => setCountries(res.data));
  }, []);

  const handleChange = (e) => {
    setFilter(e.target.value);
  };
  if (!countries) {
    return <div>Loading....</div>;
  }
  let filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  console.log(filteredCountries);

  return (
    <div>
      <Filter filter={filter} handleChange={handleChange} />
      {filteredCountries.length === 1 ? (
        <Country country={filteredCountries[0]} />
      ) : (
        <CountryList countries={filteredCountries} filter={filter} />
      )}
    </div>
  );
}

export default App;




