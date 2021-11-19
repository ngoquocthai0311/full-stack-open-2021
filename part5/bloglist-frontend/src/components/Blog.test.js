import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
    test('renders title and author by default', () => {
        const blogObject = {
            author: 'author',
            title: 'title',
            likes: 0,
            url: 'url'
        }
        const mockUpdateBlog = jest.fn()
        const mockDeleteBlog = jest.fn()

        const component = render(
            <Blog blog={blogObject} updateBlog={mockUpdateBlog} deleteBlog={mockDeleteBlog}/>
        )
        const shortBlogDiv = component.container.querySelector('.short-blog')
        const longBlogDiv = component.container.querySelector('.long-blog')
        expect(shortBlogDiv).toHaveTextContent(`${blogObject.title} ${blogObject.author}`)
        expect(longBlogDiv).toHaveStyle({ display: 'none' })
    })
})
