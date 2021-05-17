import React, {useState} from 'react'

const Header = ({name}) => {
  return (
    <>
      <h1>{name}</h1>
    </>
  )
}

const Button = ({name, handleClick}) => {
  return (
    <>
      <button onClick={handleClick}>{name}</button>      
    </>
  )
}

const Statistic = ({name, value, notation}) => {
  return (
    <table>
      <tbody>
        <tr>
          <td style={{padding: 3}}>
            {name}
          </td>
          <td>
            {value} {notation}
          </td>
        </tr>
      </tbody>
    </table>
  )
}

const Statistics = ({good, neutral, bad, all, average, positive}) => {
  if (good === 0 & bad === 0 && neutral === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    )
  }
  return (
    <>
      <Statistic  name='good' value={good}/>
      <Statistic  name='neutral' value={neutral}/>
      <Statistic  name='bad' value={bad}/>
      <Statistic  name='all' value={all}/>
      <Statistic  name='average' value={average}/>
      <Statistic  name='positive' value={positive} notation='%'/>
    </>
  )
}

const App = () => {

  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleSetGood = () => setGood(good + 1)
  const handleSetNeutral = () => setNeutral(neutral + 1)
  const handleSetBad = () => setBad(bad + 1)
  const getAll = () => (good + bad + neutral)
  const getAverage = () => (good + bad * -1) / getAll()
  const getPositive = () => {
    if (good === 0) {
      return 0
    }
    return good / getAll() * 100
  }
  
  return (
    <>
      <Header name='give feedback'/>

      <Button name='good' handleClick={handleSetGood}/>
      <Button name='neutral' handleClick={handleSetNeutral}/>
      <Button name='bad' handleClick={handleSetBad}/>

      <Header name='statistics'/>

      <Statistics good={good} neutral={neutral} bad={bad} all={getAll()} average={getAverage()} positive={getPositive()}/>
    </>
  )
}

export default App