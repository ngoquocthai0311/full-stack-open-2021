import axios from "axios"

const baseURL = 'https://restcountries.com/v3.1/name/'

const getCountry = async (name) => {
    const response = await axios.get(`${baseURL}/${name}`)
    return response.data
}

const exportee = {
    getCountry
}

export default exportee