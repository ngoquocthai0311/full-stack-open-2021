import React from "react"
import LoginService from '../services/login.js'

const Login = ({username, password, setUsername, setPassword, setUser}) => {
    const handleLogin = async (event) => {
        event.preventDefault()
        try {
          const user = await LoginService.login({ username, password }) 
          setUser(user)
          setUsername('')
          setPassword('')
        } catch (error) {
          console.log(error)
        }
    }

    return (
        <div>
            <h2>Login to application</h2>
            <form onSubmit={handleLogin}>
                username <input type='text' name='username' value={username} onChange={({target}) => setUsername(target.value)}/> <br />
                password <input type='password' name='password' value={password} onChange={({target}) => setPassword(target.value)}/> <br />
                <button type='submit'>Log in</button>
            </form>
        </div>
    )
}

export default Login