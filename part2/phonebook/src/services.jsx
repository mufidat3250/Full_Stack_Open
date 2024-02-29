import axios from "axios";
const baseUrl = '/api/persons'

const getAll = async()=> {
    const response = await axios.get(baseUrl)
    const data = await response.data
    return data
    // return axios.get(baseUrl).then((res)=> res.data)
}
const create = async(newObject) => {
    const response = await axios.post(baseUrl, newObject)
    const data = await response.data
    return data 
    // return axios.post(baseUrl, newObject).then((res)=> res.data)
}
const update = async(id, newObject) => {
    const response = await axios.put(`${baseUrl}/${id}`, newObject)
    const data = await response.data
    return data
    // return axios.put(`${baseUrl}/${id}`, newObject).then((res)=> res.data)
}
const deletePerson = async(id) => {
    const response = await axios.delete(`${baseUrl}/${id}`)
    const data = await response.data
    return data
    // return axios.delete(`${baseUrl}/${id}`).then((res)=> res)
}

export default{
    getAll,
    create,
    update,
    deletePerson

}
