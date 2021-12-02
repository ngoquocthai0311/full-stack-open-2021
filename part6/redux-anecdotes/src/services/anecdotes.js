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

const exportee  = {
    getAllAnecdotes, createNewAnecdote
}

export default exportee