import axios from 'axios'

const getAllCountry = async(name) => {
    const response = await axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${name}`)
    return response.data
}
 

export default {getAllCountry}
