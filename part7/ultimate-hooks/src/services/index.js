import axios from 'axios'

const getAll = async (url) => {
    const repsonse = await axios.get(url)
    return repsonse.data
}

const create = async (url, newNoteObject) => {
    const response = await axios.post(url, newNoteObject)
    return response.data
}

const exportee = {
    getAll,
    create
}

export default exportee