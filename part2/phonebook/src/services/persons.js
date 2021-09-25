import axios from "axios"
const baseURL = `http://localhost:3001/persons`

const create = newPerson => {
    return axios
        .post(baseURL, newPerson)
        .then(response => response.data)
        .catch(error => error)
}

const getPersons = () => {
    return axios
        .get(baseURL)
        .then(response => response.data)
        .catch(error => error)
}

const deletePerson = (id) => {
    return axios
        .delete(`${baseURL}/${id}`)
        .then(response => response)
        .catch(error => error)
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