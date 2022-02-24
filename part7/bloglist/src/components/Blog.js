import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, deleteBlog }) => {
    const [visibility, setVisibility] = useState(false)

    const hideWhenVisibile = { display: visibility ? 'none' : '' }
    const showWhenVisible = { display: visibility ? '' : 'none' }

    const toggleVisibility = () => {
        setVisibility(!visibility)
    }

    const handleRemoveBlog = async () => {
        await deleteBlog(blog.id)
    }

    const handleLikeIncrement = async () => {
        const requestBody = {
            likes: blog.likes + 1,
            author: blog.author,
            title: blog.title,
            url: blog.url,
        }
        await updateBlog(blog.id, requestBody)
    }

    const inlineStyle = {
        border: '2px solid black',
        padding: '10px 0px 0px 0px',
        margin: '0px 0px 10px 0px',
    }
    return (
        <div style={inlineStyle} className="blog">
            <div style={hideWhenVisibile} className="short-blog">
                {blog.title} {blog.author}{' '}
                <button onClick={toggleVisibility}>view</button>
            </div>
            <div style={showWhenVisible} className="long-blog">
                {blog.title} <button onClick={toggleVisibility}>hide</button>{' '}
                <br />
                {blog.url} <br />
                {blog.likes} <button onClick={handleLikeIncrement}>like</button>{' '}
                <br />
                {blog.author} <br />
                <button onClick={handleRemoveBlog}>remove</button>
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    updateBlog: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
}

export default Blog
