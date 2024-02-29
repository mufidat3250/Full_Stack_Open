import axios from "axios";
const baseUrl = '/api/persons'

const getAll = ()=> {
    return axios.get(baseUrl).then((res)=> res.data)
}
const create = (newObject) => {
    return axios.post(baseUrl, newObject).then((res)=> res.data)
}
const update = (id, newObject) => {
    return axios.put(`${baseUrl}/${id}`, newObject).then((res)=> res.data)
}
const deletePerson = (id) => {
    return axios.delete(`${baseUrl}/${id}`).then((res)=> res)
}

export default{
    getAll,
    create,
    update,
    deletePerson

}
