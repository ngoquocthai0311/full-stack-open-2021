import React from "react"

const AnecdoteList = ({ anecdotes }) => {
    const renderAnecdotes = () => {
        return anecdotes !== null ?
            <>  
                <ul>
                    {anecdotes.map(item => <li key={item.id}>{item.content}</li>)}
                </ul>
            </> :
            null
    }

    return (
        <>
            {renderAnecdotes()}
        </>
        
    )
}

export default AnecdoteList