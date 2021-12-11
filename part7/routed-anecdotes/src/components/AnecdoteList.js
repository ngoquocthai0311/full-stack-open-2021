import React from "react"
import { Link } from "react-router-dom"

const AnecdoteList = ({ anecdotes }) => {
    const renderAnecdotes = () => {
        return anecdotes !== null ?
            <>  
                <ul>
                    {anecdotes.map(item => <li key={item.id}><Link to={`/anecdote/${item.id}`}>{item.content}</Link></li>)}
                </ul>
            </> :
            null
    }

    return (
        <>
            <h2>Anecdotes</h2>
            {renderAnecdotes()}
        </>
        
    )
}

export default AnecdoteList