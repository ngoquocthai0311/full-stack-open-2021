import React, { useState } from "react"
import blogService from '../services/blogs'

const LoginForm = ({login, notify, setUser}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        const credentials = {
            username,
            password
        }        
        try {
            const data = await login(credentials)
            // clear input fields
            setUsername('')
            setPassword('')

            // save token to windows local storage
            window.localStorage.setItem('loggedBlogListUser', JSON.stringify(data))
            // set token for Blog Service
            blogService.setToken(data.token)
            notify('logged in successfully')

            // update the state of parent component to trigger re-render after having done all work in this component
            // if setUser(data) is placed above window.localStorage.setItem() the App component will be triggered to re-render 
            // making loginForm to be unmounted
            // link to issue: https://dev.to/jexperton/how-to-fix-the-react-memory-leak-warning-d4i
            setUser(data)
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