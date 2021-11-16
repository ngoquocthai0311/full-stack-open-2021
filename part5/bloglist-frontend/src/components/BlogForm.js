import React from "react"
import BlogService from '../services/blogs'

const BlogForm = ({notify, title, setTitle, author, setAuthor, url, setUrl, blogs, setBlogs}) => {
    const handleCreateBlog = async (event) => {
        event.preventDefault()
        try {
            const newBlog = {
                title,
                author,
                url
            }
            const data = await BlogService.createBlog(newBlog)
            setBlogs(blogs.concat(data))
            notify(`a new blog ${title} by ${author} added`)
            // clear input field
            setTitle('')
            setAuthor('')
            setUrl('')
        } catch (error) {
            
        }
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