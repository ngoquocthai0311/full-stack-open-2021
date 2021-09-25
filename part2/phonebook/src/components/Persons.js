import React from "react";

const Persons = ({persons, filter, deletePerson}) => {
    const isFilterApplied = () => {
      if (filter === '') {
        if (persons.length !== 0) {
          return (
            <ul>
              {persons.map((person, index) => <li key={index}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></li>)}
            </ul>
          )
        }
      } else {
        const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter))
        return (
          <ul>
            {filteredPersons.map((person, index) => <li key={index}>{person.name} {person.number} <button onClick={() => deletePerson(person)}>delete</button></li>)}
          </ul>
        )
      }
    }
    return(
        <div>
            {isFilterApplied()}
        </div>
    )
}

export default Persons