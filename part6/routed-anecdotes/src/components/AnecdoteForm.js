import React from "react"
import { useState } from "react"
import { useHistory } from "react-router-dom"
import { useField } from "../hooks"

const AnecdoteForm = (props) => {
    // const [content, setContent] = useState('')
    // const [author, setAuthor] = useState('')
    // const [info, setInfo] = useState('')
    const content = useField('text')
    const author = useField('text')
    const info = useField('text')
    const history = useHistory()        
  
    const handleSubmit = (e) => {
      e.preventDefault()
      props.addNew({
        content: content.value,
        author: author.value,
        info: info.value,
        votes: 0
      })      
      props.setNotification(`a new anecdote ${content.value} created`)
      history.push('/')
    }
  
    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content           
            <input name='content' {...content} /> 
          </div>
          <div>
            author          
            <input name='author' {...author} />
          </div>
          <div>
            url for more info            
            <input name='info' {...info} />
          </div>
          <button>create</button>
        </form>
      </div>
    )
  
}

export default AnecdoteForm