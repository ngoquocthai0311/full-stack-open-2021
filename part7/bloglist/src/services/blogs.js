import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
    token = `bearer ${newToken}`
}

const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
}

const createBlog = async (blog) => {
    const config = {
        headers: { Authorization: token },
    }
    const response = await axios.post(baseUrl, blog, config)
    return response.data
}

const updateBlog = async (blogId, updatedBlog) => {
    const response = await axios.put(`${baseUrl}/${blogId}`, updatedBlog)
    return response.data
}

const deleteBlog = async (blogId) => {
    const config = {
        headers: { Authorization: token },
    }
    await axios.delete(`${baseUrl}/${blogId}`, config)
}

const exportee = {
    getAll,
    createBlog,
    setToken,
    updateBlog,
    deleteBlog,
}

export default exportee
