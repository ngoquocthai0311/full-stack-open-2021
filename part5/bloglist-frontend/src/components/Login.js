import React, { useState } from "react"

const LoginForm = ({login}) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (event) => {
        event.preventDefault()
        const credentials = {
            username,
            password
        }
        await login(credentials)
        setUsername('')
        setPassword('')
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