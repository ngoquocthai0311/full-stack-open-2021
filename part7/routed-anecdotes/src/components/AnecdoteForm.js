import React from "react"
import { useHistory } from "react-router-dom"
import { useField } from "../hooks"

const AnecdoteForm = (props) => {    
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
    
    const handleOnClick = () => {
      content.reset()
      author.reset()
      info.reset()
    }

    const _omitResetUseField = (object) => {
      if (!object.reset) {
        return null
      }
      const {reset, ...omitResetContentObj } = object
      return omitResetContentObj
    }

    return (
      <div>
        <h2>create a new anecdote</h2>
        <form onSubmit={handleSubmit}>
          <div>
            content           
            <input name='content' {..._omitResetUseField(content)} /> 
          </div>
          <div>
            author          
            <input name='author' {..._omitResetUseField(author)} />
          </div>
          <div>
            url for more info            
            <input name='info' {..._omitResetUseField(info)} />
          </div>
          <button type='submit'>create</button>                   
          <button type='button' onClick={handleOnClick}>reset</button>
        </form>        
      </div>
    )
  
}

export default AnecdoteForm