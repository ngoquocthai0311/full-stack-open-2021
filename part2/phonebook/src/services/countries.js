import axios from "axios";
const baseURL = 'https://restcountries.com/v2/name'

const getCountries = name => {
    return axios.get(`${baseURL}/${name}`)
        .then(response => {
            return response.data
        })
}

const exportee = {
    getCountries
}

export default exportee