import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
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

  const addBlog = async (blog) => {
    const data = await blogService.createBlog(blog)
    setBlogs(blogs.concat(data))
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogListUser')
    notifyWith('logged out successfully')
  }

  const handleLogin = async (credentials) => {
    const data = await loginService.login(credentials)
    return data
  }

  const loginForm = () => (
    <>
      <h2>Login to application</h2>
      <Notification notification={notificaiton}/>
      <LoginForm login={handleLogin} notify={notifyWith} setUser={setUser}/>
    </>
  )

  const blogRender = () => (
      <div>
        <h2>blogs</h2>

        <Notification notification={notificaiton}/>

        <p>{user.name} logged in <button onClick={() => {handleLogout()}}>log out</button></p>

        <Togglable buttonLabel='create new blog'>
          <BlogForm notify={notifyWith} addBlog={addBlog} />
        </Togglable>

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