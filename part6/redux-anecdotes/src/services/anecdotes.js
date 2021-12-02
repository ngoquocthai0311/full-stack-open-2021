import axios from 'axios'

const baseURL = 'http://localhost:3001'

const getAllAnecdotes = async () => {
    const response = await axios.get(`${baseURL}/anecdotes`)
    return response.data
}

const createNewAnecdote = async (anecdote) => {    
    const response = await axios.post(`${baseURL}/anecdotes`, anecdote)
    return response.data
}

const increaseVote = async (updatedAnecdote) => {
    const respsonse = await axios.put(`${baseURL}/anecdotes/${updatedAnecdote.id}`, updatedAnecdote)
    return respsonse.data
}

const exportee  = {
    getAllAnecdotes, createNewAnecdote, increaseVote
}

export default exportee