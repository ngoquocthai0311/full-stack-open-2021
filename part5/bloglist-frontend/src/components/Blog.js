import React, { useState } from 'react'

const Blog = ({blog}) => {
  const [visibility, setVisibility] = useState(false)

  const hideWhenVisibile = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none'}

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const inlineStyle = {
    border: '2px solid black',
    padding: '10px 0px 0px 0px',
    margin: '0px 0px 10px 0px'
  }
  return (
  <div style={inlineStyle}>
    <div style={hideWhenVisibile}>
      {blog.title} <button onClick={toggleVisibility}>view</button>
    </div>
    <div style={showWhenVisible}>
      {blog.title} <button onClick={toggleVisibility}>hide</button> <br />
      {blog.url} <br />
      {blog.likes} <button>like</button> <br />
      {blog.author} <br />
    </div>
  </div>  
)}

export default Blog