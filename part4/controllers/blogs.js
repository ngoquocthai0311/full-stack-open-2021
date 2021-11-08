const blogRouter = require('express').Router()
const Blog = require('../models/Blog')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({})
        response.json(blogs)
    } catch(error) {
        next(error)
    }
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    // if there is no number in the body, assign it to zero
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes || 0
    })

    try {
        const savedBlog = await blog.save()
        response.status(201).json(savedBlog)
    } catch(error)  {
        next(error)
    }
})

blogRouter.delete('/:id', async (request, response, next) => {
    const id = request.params.id

    try {
        await Blog.findByIdAndRemove(id)
        response.status(204).end()
    } catch (error) {
        next(error)
    }
})

module.exports = blogRouter
