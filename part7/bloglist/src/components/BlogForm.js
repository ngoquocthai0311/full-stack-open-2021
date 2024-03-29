import React, { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog, notify }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title,
            author,
            url,
        }
        try {
            await addBlog(newBlog)
            notify(`a new blog ${title} by ${author} added`)
            // clear input field
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (error) {
            notify(
                'please fill in all required infomation in the form',
                'error'
            )
        }
    }

    return (
        <form onSubmit={handleCreateBlog}>
            title{' '}
            <input
                id="title"
                type="text"
                name="title"
                value={title}
                onChange={({ target }) => setTitle(target.value)}
            />{' '}
            <br />
            author{' '}
            <input
                id="author"
                type="text"
                name="author"
                value={author}
                onChange={({ target }) => setAuthor(target.value)}
            />{' '}
            <br />
            url{' '}
            <input
                id="url"
                type="text"
                name="url"
                value={url}
                onChange={({ target }) => setUrl(target.value)}
            />{' '}
            <br />
            <button id="button-create" type="submit">
                create
            </button>
        </form>
    )
}

BlogForm.propTypes = {
    addBlog: PropTypes.func.isRequired,
    notify: PropTypes.func.isRequired,
}

export default BlogForm
