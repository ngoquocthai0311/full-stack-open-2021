import React from "react";

const Persons = ({text , persons}) => {
    const isFilterApplied = () => {
        const lowerCaseText = text.toLowerCase()
        console.log(lowerCaseText)
        if (text === '') {
          return (
            <ul>
              {persons.map((person, index) => <li key={index}>{person.name} {person.phone}</li>)}
            </ul>
          )
        } else {
            return (
                <ul>
                  {persons.map((person, index) => {
                    
                    if (person.name.toLowerCase().includes(text) || person.phone.includes(text)) 
                      return (
                        <li key={index}>{person.name} {person.phone}</li>
                      )
                  })}
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