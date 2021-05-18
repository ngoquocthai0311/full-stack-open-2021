import React from 'react'
import Header from "./Header"
import Content from "./Content"

const Course = ({course}) => {
    const name = course.name
    const parts = course.parts
    return (
        <>
            <Header name={name}/>
            <Content parts={parts}/>
        </>
    )
}


export default Course