import React from 'react'

const Header = (props) => {
  return (
    <>
      <h1>{props.course}</h1>
    </>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.part} {props.number}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <>
      <Part part={props.part1} number={props.num1}/>
      <Part part={props.part2} number={props.num2}/>
      <Part part={props.part3} number={props.num3}/>
    </>
  )
}

const Total = (props) => {
  return (
    <>
      <p>Number of exercise {props.num1 + props.num2 + props.num3}</p>
    </>
  )
}

const App = () => {
  const course = 'Half Stack application development' 
  const part1 = 'Fundementals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} part2={part2} part3={part3} num1={exercises1} num2={exercises2} num3={exercises3}/>
      <Total num1={exercises1} num2={exercises2} num3={exercises3}/>
    </div>
  )
}

export default App