import React, { useState } from "react"

const BlogForm = ({addBlog}) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreateBlog = async (event) => {
        event.preventDefault()
        const newBlog = {
            title,
            author,
            url
        }
        await addBlog(newBlog)
        // clear input field
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <form onSubmit={handleCreateBlog}>
            title <input type='text' name='title' value={title} onChange={({ target }) => setTitle(target.value)}/> <br />
            author <input type='text' name='author' value={author} onChange={({ target }) => setAuthor(target.value)}/> <br />
            url <input type='text' name='url' value={url} onChange={({ target }) => setUrl(target.value)}/> <br />
            <button type='submit'>create</button>
        </form>
    )
}

export default BlogForm