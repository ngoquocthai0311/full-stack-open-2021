import React from "react"
import { useDispatch } from "react-redux"
import { addNewAnecdote, asObject } from "../reducers/anecdoteReducer"
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAddAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        // reset input field 
        event.target.anecdote.value = ''
        
        const newAnecdote = await anecdoteService.createNewAnecdote(asObject(content))
        dispatch(addNewAnecdote(newAnecdote))
    }
    return (
        <>
            <h2>create new</h2>
            <form onSubmit={handleAddAnecdote}>
                <div><input name='anecdote'/></div>
                <button type='submit'>create</button>
            </form>
        </>
    )
}

export default AnecdoteForm