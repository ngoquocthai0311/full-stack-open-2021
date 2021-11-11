const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User')

const getTokenFrom = (request) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

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
    const token = getTokenFrom(request)
    /*global process*/
    try {
        const decodedToken = jwt.verify(token, process.env.SECRET)
        if (!token && !decodedToken.id) {
            return response.status(401).json({
                error: 'token is missing or invalid'
            })
        }
        const user = await User.findById(decodedToken.id)

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
    } catch (error) {
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
