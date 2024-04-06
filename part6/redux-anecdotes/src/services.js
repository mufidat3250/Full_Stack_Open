import axios from 'axios'
const baseurl = 'http://localhost:3001/anecdotes'

const getAllAnecdote = async()=> {
    const response = await axios.get(baseurl)
    return response.data
}

const createNew = async(obj) => {
    const response = await axios.post(baseurl, obj)
    return response.data
}

const updateVote = async(obj) => {
    const response = await axios.put(`${baseurl}/${obj.id}`, {...obj, votes: obj.votes + 1 })
    return response.data
}

export default {getAllAnecdote, createNew, updateVote}