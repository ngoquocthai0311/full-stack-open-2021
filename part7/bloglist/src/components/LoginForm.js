import React, { useImperativeHandle, useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const LoginForm = React.forwardRef((props, ref) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const clearInputFields = () => {
        // clear input fields
        setUsername('')
        setPassword('')
    }

    const saveToken = (data) => {
        // save token to windows local storage
        window.localStorage.setItem('loggedBlogListUser', JSON.stringify(data))
        // set token for Blog Service
        blogService.setToken(data.token)
    }

    useImperativeHandle(ref, () => {
        return {
            clearInputFields,
            saveToken,
        }
    })

    const handleLogin = async (event) => {
        event.preventDefault()
        const credentials = {
            username,
            password,
        }
        await props.login(credentials)
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                username{' '}
                <input
                    id="username"
                    type="text"
                    name="username"
                    value={username}
                    onChange={({ target }) => setUsername(target.value)}
                />{' '}
                <br />
                password{' '}
                <input
                    id="password"
                    type="password"
                    name="password"
                    value={password}
                    onChange={({ target }) => setPassword(target.value)}
                />{' '}
                <br />
                <button type="submit">Log in</button>
            </form>
        </div>
    )
})

LoginForm.displayName = 'LoginForm'

LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
}

export default LoginForm
