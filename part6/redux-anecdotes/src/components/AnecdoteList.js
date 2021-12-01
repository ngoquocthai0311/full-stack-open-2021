import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { increaseVote } from "../reducers/anecdoteReducer"
import { setMessage, removeMessage } from "../reducers/messageReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter !== '') {
            return state.anecdotes.filter(item => item.content.toLowerCase().includes(state.filter))
        }
        return state.anecdotes
    })
    const dispatch = useDispatch()

    const sortingAnecdotes = () => {
        return anecdotes.sort((first, second) => second.votes - first.votes)
    }

    const vote = (anecdote) => {
        dispatch(increaseVote(anecdote.id))
        dispatch(setMessage(`you voted '${anecdote.content}'`))
        setTimeout(() => {
            dispatch(removeMessage())
        }, 5000)
    }

    return (
        <>
           {sortingAnecdotes().map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote)}>vote</button>
                    </div>
                </div>
            )} 
        </>     
    )
}

export default AnecdoteList