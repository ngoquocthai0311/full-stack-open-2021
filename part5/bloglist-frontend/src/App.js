import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/Login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'
import usersService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [notificaiton, setNotification] = useState(null)
  const loginFormRef = useRef()

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
          const sortedBlogList = sortBlogList(data)
          setBlogs(sortedBlogList)
        } catch (error) {
          notifyWith(error.message, 'error')
        }
      }

      fetchBlogs()
    }
  }, [user])

  const sortBlogList = (unsortedBlogList) => {
    return unsortedBlogList.sort((item1, item2) => item2.likes - item1.likes)
  }

  const filterOutBlog = (blogId) => {
    const updatedBlogs = blogs.filter(blog => blog.id !== blogId)
    setBlogs(updatedBlogs)
  }

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const handleAddBlog = async (blog) => {
    const data = await blogService.createBlog(blog)
    setBlogs(blogs.concat(data))
  }

  const handleUpdateBlog = async (id, updatedBlog) => {
    const userId = await usersService.getUserId(user.username)
    if (!userId) {
      return null
    }

    updatedBlog = { ...updatedBlog, user: userId }
    try {
      const data = await blogService.updateBlog(id, updatedBlog)
      if (!data) {
        notifyWith('the blog is no longer exist', 'error')
        filterOutBlog(id)
      } else {
        notifyWith(`The blog ${data.title} by ${data.author} updated likes to ${data.likes}`)
        // sort the blogs after having been updated one blog 
        const sortedBlogList = sortBlogList(blogs.map(blog => blog.id === data.id ? data : blog))
        setBlogs(sortedBlogList)
      }
    } catch (error) {
      notifyWith(error.mesage, 'error')
    }
  }

  const handleDeleteBlog = async (blogId) => {
    try {
      await blogService.deleteBlog(blogId)      
      notifyWith('delete blog successfully')
    } catch (error) {
      notifyWith('the blog is no longer exist', 'error')
    }
    filterOutBlog(blogId)
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogListUser')
    notifyWith('logged out successfully')
  }

  const handleLogin = async (credentials) => {
    try {
      const data = await loginService.login(credentials)

      // using hooks to update state outside LoginForm component and add token
      loginFormRef.current.clearInputFields()
      loginFormRef.current.saveToken(data)

      notifyWith('logged in successfully')
      // update the state of parent component to trigger re-render after having done all work in this component
      // if setUser(data) is placed above window.localStorage.setItem() the App component will be triggered to re-render 
      // making loginForm to be unmounted
      // link to issue: https://dev.to/jexperton/how-to-fix-the-react-memory-leak-warning-d4i
      setUser(data)
    } catch (error) {
      notifyWith('wrong username or password', 'error')
    }
  }

  const loginForm = () => (
    <>
      <h2>Login to application</h2>
      <Notification notification={notificaiton}/>
      <LoginForm login={handleLogin} ref={loginFormRef}/>
    </>
  )

  const blogRender = () => (
      <div>
        <h2>blogs</h2>

        <Notification notification={notificaiton}/>

        <p>{user.name} logged in <button onClick={() => {handleLogout()}}>log out</button></p>

        <Togglable buttonLabel='create new blog'>
          <BlogForm notify={notifyWith} addBlog={handleAddBlog} />
        </Togglable>

        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={handleUpdateBlog} deleteBlog={handleDeleteBlog}/>
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