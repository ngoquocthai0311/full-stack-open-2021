import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    let component
    let blogObject
    const mockUpdateBlog = jest.fn()
    const mockDeleteBlog = jest.fn()
    beforeEach(() => {
        blogObject = {
            author: 'author',
            title: 'title',
            likes: 0,
            url: 'url'
        }
        component = render(
            <Blog blog={blogObject} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog}/>
        )
    })
    test('renders title and author by default', () => {
        const shortBlogDiv = component.container.querySelector('.short-blog')
        const longBlogDiv = component.container.querySelector('.long-blog')
        expect(shortBlogDiv).toHaveTextContent(`${blogObject.title} ${blogObject.author}`)
        expect(longBlogDiv).toHaveStyle({ display: 'none' })
    })
    test('renders the rest of info by clicking view button', () => {
        const viewButton = component.getByText('view')
        const longBlogDiv = component.container.querySelector('.long-blog')
        const shortBlogDiv = component.container.querySelector('.short-blog')
        fireEvent.click(viewButton)

        expect(shortBlogDiv).toHaveStyle('display: none')
        expect(longBlogDiv).toHaveTextContent(`${blogObject.url} ${blogObject.likes}`)
    })
    test('renders twice when clicking the like button twice', () => {
        const likeButton = component.getByText('like')
        fireEvent.click(likeButton)
        fireEvent.click(likeButton)
        expect(mockUpdateBlog.mock.calls).toHaveLength(2)
    })
})
