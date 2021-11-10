const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { 'username': 1, 'name': 1 })
        response.json(blogs)
    } catch(error) {
        next(error)
    }
})

blogRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
        const user = await User.findById(body.userId)

        // if there is no number in the body, assign it to zero
        const blog = new Blog({
            user: user._id,
            title: body.title,
            author: body.author,
            url: body.url,
            likes: body.likes || 0
        })
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()

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

blogRouter.put('/:id', async (request, response, next) => {
    const id = request.params.id
    const body = request.body

    const blogObject = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }

    try {
        // { new: true } param will cause the event handler to be called
        // with the new modified document instead of the original
        await Blog.findByIdAndUpdate(id, blogObject, { new: true })
        response.status(200).json(blogObject)
    } catch (error) {
        next(error)
    }
})

module.exports = blogRouter
