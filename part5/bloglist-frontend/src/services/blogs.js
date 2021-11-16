import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token},
  }
  console.log(token)
  const response = await axios.post(baseUrl, blog, config)
  return response.data
}

const exportee = {
  getAll, createBlog, setToken
}

export default exportee