import axios from 'axios'
const baseUrl = 'api/users/id'

const getUserId = async (username) => {
    const response = await axios.get(`${baseUrl}/${username}`)
    return response.data
}

const exportee = {
    getUserId,
}

export default exportee
