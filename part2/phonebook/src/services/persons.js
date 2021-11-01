import axios from "axios"
const baseURL = `/api/persons`

const create = newPerson => {
    return axios
        .post(baseURL, newPerson)
        .then(response => response.data)
}

const getPersons = () => {
    return axios
        .get(baseURL)
        .then(response => response.data)
}

const deletePerson = (id) => {
    return axios
        .delete(`${baseURL}/${id}`)
        .then(response => response)
}

const updatePerson = (id, updatedPerson) => {
    return axios    
        .put(`${baseURL}/${id}`, updatedPerson)
        .then(response => response)
}

const exportee = {
    create, 
    getPersons,
    deletePerson,
    updatePerson
}
export default exportee