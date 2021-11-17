import React, { useState } from 'react'

const Blog = ({blog, updateBlog, notify, updateBlogList}) => {
  const [visibility, setVisibility] = useState(false)

  const hideWhenVisibile = { display: visibility ? 'none' : '' }
  const showWhenVisible = { display: visibility ? '' : 'none'}

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const handleLikeIncrement = async () => {
    const requestBody = {
      likes: blog.likes + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url
    }
    try {
      const data = await updateBlog(blog.id, requestBody)
      notify(`The blog ${data.title} by ${data.author} updated likes to ${data.likes}`)
      updateBlogList(data)
    } catch (error) {
      notify('something went wrong', 'error')
    }
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
      {blog.likes} <button onClick={handleLikeIncrement}>like</button> <br />
      {blog.author} <br />
    </div>
  </div>  
)}

export default Blog