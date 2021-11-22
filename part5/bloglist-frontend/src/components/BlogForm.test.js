import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {
    let blogFormComponent
    const mockAddBlog = jest.fn()
    const mockNotify = jest.fn()
    beforeEach(() => {
        blogFormComponent = render(
            <BlogForm addBlog={mockAddBlog} notify={mockNotify}/>
        )
    })
    test('updates parent state and call onSubmit', () => {
        const title = blogFormComponent.container.querySelector('#title')
        const author = blogFormComponent.container.querySelector('#author')
        const url = blogFormComponent.container.querySelector('#url')
        const form = blogFormComponent.container.querySelector('form')

        fireEvent.change(title, {
            target: { value: 'title' }
        })
        fireEvent.change(author, {
            target: { value: 'author' }
        })
        fireEvent.change(url, {
            target: { value: 'url' }
        })

        fireEvent.submit(form)

        expect(mockAddBlog.mock.calls).toHaveLength(1)
    })
})