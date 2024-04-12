import { useState, useEffect } from "react"
import CountriesServices from '../services'

export const useField = (type) => {
    const [value, setValue] = useState('')
  
    const onChange = (event) => {
      setValue(event.target.value)
    }
  
    return {
      type,
      value,
      onChange
    }
  }

  export const useCountry = (name) => {
    const [country, setCountry] = useState(null)
  
    useEffect(() => {
      CountriesServices.getAllCountry(name).then((res)=> setCountry({
        data:{
          name:res.name.common,
          capital: res.capital.join(', '),
          population: res.population,
          flag:res.flags.svg
        },
        found: true
      })).catch((error)=> setCountry({found:false}))
    },[name])
    return country
  }