import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getBlogsOfUser = async (userId) => {
  const response = await axios.get(`baseUrl/${userId}`)
  return response.data
}

const exportee = {
  getAll, getBlogsOfUser
}

export default exportee