import { useState } from "react";
import Country from "./Country";
const CountryList = ({ countries, filter}) => {
    const [show, setShow] = useState(false)
    if(!filter){
        return 'Enter Country to search'
    }
    return (
        <>
        <div>
          {
            countries.length === 0 ? <p>No Search found</p> : countries.length > 10 ? (
                <p>To many match specify another filter</p>
              ) : (
                countries.map((country) => {
                  return (
                    <div>
                      <p>
                        {country.name.common} <button onClick={()=> setShow(!show)}>show</button>
                      </p>
                      {show && <Country country={country} />}
                    </div>
                  );
                })
              )
          }
      </div>
      </>
    );
  };
  export default CountryList