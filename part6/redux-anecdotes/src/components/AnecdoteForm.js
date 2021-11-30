import React from "react"
import { useDispatch } from "react-redux"
import { addNewAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = () => {
    const dispatch = useDispatch()

    const handleAddAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        // reset input field 
        event.target.anecdote.value = ''
    
        dispatch(addNewAnecdote(content))
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