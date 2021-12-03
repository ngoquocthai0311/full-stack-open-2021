import React from "react"
import { connect } from "react-redux"
import { addNewAnecdote } from "../reducers/anecdoteReducer"

const AnecdoteForm = (props) => {
    const handleAddAnecdote = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        // reset input field 
        event.target.anecdote.value = ''
        props.addNewAnecdote(content)
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

const mapDispatchToProps = {
    addNewAnecdote
}

const ConnectedAnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteForm)

export default ConnectedAnecdoteForm