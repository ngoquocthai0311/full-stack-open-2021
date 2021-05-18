import React from 'react'
import Part from "./Part"
import Result from './Result'

const Content = ({parts}) => {
    const getTotal = () => parts.map(part => part.exercises).reduce((accumulator, currentValue) => accumulator + currentValue)
    return (
        <>
            {parts.map(part => 
                <Part key={part.id} name={part.name} exercises={part.exercises} />
            )}
            <Result exercises={getTotal()}/>
        </>
    )
}

export default Content