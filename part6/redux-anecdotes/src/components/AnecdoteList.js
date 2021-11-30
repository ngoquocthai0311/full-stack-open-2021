import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { increaseVote } from "../reducers/anecdoteReducer"

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state)
    const dispatch = useDispatch()

    const sortingAnecdotes = () => {
        return anecdotes.sort((first, second) => second.votes - first.votes)
    }

    const vote = (id) => {
        dispatch(increaseVote(id))
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
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )} 
        </>     
    )
}

export default AnecdoteList