import React from "react"
import LoginService from '../services/login.js'
import BlogService from '../services/blogs.js'

const LoginForm = ({notify, username, password, setUsername, setPassword, setUser}) => {
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await LoginService.login({ username, password }) 
          setUser(user)
          setUsername('')
          setPassword('')

          // save token to windows local storage
          window.localStorage.setItem('loggedBlogListUser', JSON.stringify(user))
          // set token for Blog Service
          BlogService.setToken(user.token)
          notify('logged in successfully')
        } catch (error) {
          notify('wrong username or password', 'error')
        }
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                username <input type='text' name='username' value={username} onChange={({target}) => setUsername(target.value)}/> <br />
                password <input type='password' name='password' value={password} onChange={({target}) => setPassword(target.value)}/> <br />
                <button type='submit'>Log in</button>
            </form>
        </div>
    )
}

export default LoginForm