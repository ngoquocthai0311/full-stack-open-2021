import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import blogService from './services/blogs'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (user === null) {
      const loggedUserJson = window.localStorage.getItem('loggedBlogListUser')
      if (loggedUserJson) {
        setUser(JSON.parse(loggedUserJson))
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
          console.log(error)
        }
      }

      fetchBlogs()
    }
  }, [user])

  const loginForm = () => (
    <>
      <Login username={username} password={password} setUsername={setUsername} setPassword={setPassword} setUser={setUser}/>
    </>
  )

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedBlogListUser')
  }

  const blogRender =  () => (
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in <button onClick={() => {handleLogout()}}>log out</button></p>
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