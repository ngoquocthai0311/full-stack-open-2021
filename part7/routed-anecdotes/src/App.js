import React, { useState } from 'react'
import { useRouteMatch, Switch, Route } from 'react-router-dom'
import Menu from './components/Menu'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import About from './components/About'
import Footer from './components/Footer'
import Anecdote from './components/Anecdote'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])
  const [notification, setNotification] = useState('')
  const TIMEOUT = 10000

  const setTimoutForNotification = (message) => {
    setNotification(message)
    setTimeout(() => {
      setNotification('')
    }, TIMEOUT)
  }

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdote/:id')
  const anecdote = match ? anecdoteById(match.params.id)  : null  

  

  return (
    <div>
      <h1>Software anecdotes</h1>     
      <Menu />
      { notification }
      <Switch> 
        <Route path='/anecdote/:id'>
          <Anecdote anecdote={anecdote}/>
        </Route>
        <Route path='/create'>
          <AnecdoteForm addNew={addNew} setNotification={setTimoutForNotification}/>  
        </Route>
        <Route path='/about'>
          <About />
        </Route>
        <Route path='/'>
          <AnecdoteList anecdotes={anecdotes} />
        </Route>                              
      </Switch>                      
      <Footer />
    </div>
  )
}

export default App