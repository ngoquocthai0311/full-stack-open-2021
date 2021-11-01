import React, { useEffect, useState } from 'react'
import CountryFilter from './components/CountryFilter'
import NameFilter from './components/NameFilter'
import Persons from './components/Persons'
import PersonalForm from './components/PersonalForm'
import Notification from './components/Notification'
import personServices from './services/persons'
import countryServices from './services/countries';

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ filter, setFilter ] = useState('')
  const [ country, setCountry ] = useState('')
  const [ countries, setCountries ] = useState([])
  const [ notificationMessage, setNotificationMessage ] = useState('')
  const [ error, setError] = useState(false)

  const setTimeOutForNotification = () => {
    const timeOutForNotificationMessage = 5000
    setTimeout(() => { setNotificationMessage('')}, timeOutForNotificationMessage)
  }

  const notifyErrorWithTimeout = (boolVal, message) => {
    // update notification 
    setError(boolVal)
    setNotificationMessage(message)
    // set time out to delete notification 
    setTimeOutForNotification()
  }

  useEffect(() => {
    personServices.getPersons()
      .then(data => {
        setPersons(data)
      })
  }, [])


  const getCountriesFromApi = (name) => {
    countryServices.getCountries(name)
      .then(data => {
        setCountries(data)
      })
      .catch(error => {
        console.log("something is wrong")
      })
  }

  const handleCountryChange = (event) => {
    const newCountry = event.target.value
    setCountry(newCountry)

    if (newCountry !== '') {
      getCountriesFromApi(newCountry)
    }
  }  

  const addNewPerson = (event) => {
    event.preventDefault()
    
    // find duplicate
    const duplicatedPerson = persons.find(person => person.name === newName)

    if (!duplicatedPerson) { // there is no duplicate 
      // create new person object
      const newPerson = {
        name: newName,
        number: newPhone
      }
      console.log('tesing inside function')
      // post request to add new person into db.json
      personServices.create(newPerson)
        .then(data => {
          // update new states 
          setPersons(persons.concat(data))
          notifyErrorWithTimeout(false, `Added ${data.name}`)
        })
        .catch(error => {
          notifyErrorWithTimeout(true, error.response.data.error)
        })
    } else {
      // update phone number of existed person in the phone book
      const isReplace = window.confirm(duplicatedPerson.name + ' is already added to the phone book, replace the old number with a new one ? ')

      if (isReplace) {
        // update new phone for new person
        const updatedPerson = {...duplicatedPerson, number: newPhone} 

        // put request to update current person
        personServices.updatePerson(updatedPerson.id, updatedPerson)
          .then(data => {
            switch(data.status) {
              case 200: {
                setPersons(persons.map(person => person.name !== updatedPerson.name ? person : updatedPerson))      
                notifyErrorWithTimeout(false, `Phone number of ${updatedPerson.name} is changed`)
                break
              }
              default: {}
            }
          })
          .catch(error => {                      
            notifyErrorWithTimeout(true, `Information of ${updatedPerson.name} has already been removed from the server`)            
            // update state 
            personServices.getPersons()
              .then(data => setPersons(data))
          })
      }
    } 

    // reset state 
    setNewName('')
    setNewPhone('')
  }

  // handle delete a person from db.json
  const handleDeletePerson = deletedPerson => {
    const isDelete = window.confirm("Delete " + deletedPerson.name + " ?")
    
    if (isDelete) {
      personServices.deletePerson(deletedPerson.id)
        .then(response => {
          // filter deleted person => return new array 
          const filteredPersons = persons.filter(person => person.name !== deletedPerson.name)

          // update states 
          setPersons(filteredPersons)
          notifyErrorWithTimeout(false, `Deleted ${deletedPerson.name} successfully`)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  return (
    <div>
      find country <input value={country} onChange={handleCountryChange}/>

      <CountryFilter countries={countries} getCountriesFromAPI={getCountriesFromApi}/>

      <h2>Phonebook</h2>

      <Notification notificationMessage={notificationMessage} isError={error}/>

      <NameFilter state={filter} setState={setFilter}/>

      <h2>add a new</h2>
      
      <PersonalForm 
        name={newName} phone={newPhone} 
        setStateName={setNewName} setStatePhone={setNewPhone}
        handleSubmit={addNewPerson}/>
      <h2>Numbers</h2>

      <Persons persons={persons} filter={filter} deletePerson={handleDeletePerson}/>
    </div>
  )
}

export default App