import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import anecdotesService from './services/anecdotes'
import { initializeAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    anecdotesService.getAllAnecdotes().then((data) => {
      dispatch(initializeAnecdotes(data))
    })
  }, [dispatch])
  return (
    <div>
      <h2>Anecdotes</h2>   
      <Notification />   
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App