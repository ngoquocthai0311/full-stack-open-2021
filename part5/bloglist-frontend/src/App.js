import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificaiton, setNotification] = useState(null)

  useEffect(() => {
    if (user === null) {
      const loggedUserJson = window.localStorage.getItem('loggedBlogListUser')
      if (loggedUserJson) {
        const loggedUser = JSON.parse(loggedUserJson)

        setUser(loggedUser)
        blogService.setToken(loggedUser.token)
        notifyWith('logged in successfully')
      }
    }
  }, [user])

  useEffect(() => {
    if (user !== null) {
      async function fetchBlogs() {
        try {
          const data = await blogService.getAll()
          setBlogs(data)
        } catch (error) {
          notifyWith(error.message, 'error')
        }
      }

      fetchBlogs()
    }
  }, [user])

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const loginForm = () => (
    <>
      <h2>Login to application</h2>
      <Notification notification={notificaiton}/>
      <LoginForm notify={notifyWith} username={username} password={password} setUsername={setUsername} setPassword={setPassword} setUser={setUser}/>
    </>
  )

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogListUser')
    notifyWith('logged out successfully')
  }

  const blogRender =  () => (
      <div>
        <h2>blogs</h2>
        <Notification notification={notificaiton}/>
        <p>{user.name} logged in <button onClick={() => {handleLogout()}}>log out</button></p>
        <h2>create new</h2>
        <BlogForm notify={notifyWith} title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} blogs={blogs} setBlogs={setBlogs}/>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
  )

  return (
    <>
      {user === null && loginForm()}
      {user !== null && blogRender()}
    </>
  )
}

export default App