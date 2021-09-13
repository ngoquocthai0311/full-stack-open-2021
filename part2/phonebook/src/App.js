import React, { useState } from 'react'
import Filter from './components/Filter'
import PersonalForm from './components/PersonalForm'
import Persons from './components/Persons'

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas', phone: '040-123456', id: 1 },
    { name: 'Ada Lovelace', phone: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', phone: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', phone: '39-23-6423122', id: 4 }
  ]) 
  
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')

  const handleNewNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhoneChange = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNewFilter = (event) => {
    setFilter(event.target.value)
  }


  const addNewPerson = (event) => {
    event.preventDefault()
    const newpPerson = { // create an object name to add into array
      name: newName,
      phone: newPhone
    }

    if (!persons.find(person => person.name === newpPerson.name)) {
      setPersons(persons.concat(newpPerson))
    } else {
      alert(newpPerson.name + " is already added to phonebook")
    }

    setNewName('')
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <Filter state={filter} setState={handleNewFilter}/>

      <h2>add a new</h2>
      
      <PersonalForm 
        name={newName} phone={newPhone} 
        setStateName={handleNewNameChange} setStatePhone={handleNewPhoneChange}
        handleSubmit={addNewPerson}/>

      <h2>Numbers</h2>

      <Persons text={filter} persons={persons}/>
      
    </div>
  )
}

export default App