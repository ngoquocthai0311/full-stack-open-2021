const blogRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const middleware = require('../utils/middleware')

blogRouter.get('/', async (request, response, next) => {
    try {
        const blogs = await Blog.find({}).populate('user', { 'username': 1, 'name': 1 })
        response.json(blogs)
    } catch(error) {
        next(error)
    }
})

blogRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response, next) => {
    const body = request.body
    try {
        const user = request.user
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

blogRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response, next) => {
    try {
        // fetch blog from db
        const blog = await Blog.findById(request.params.id)

        // check if the user is authorized for the action
        // using equals() to compare ObjectId from mongodb instead of ===
        if (!(request.user._id.equals(blog.user))) {
            return response.status(401).json({
                error: 'unauthorized action'
            })
        }

        // fetch user from db to update new blog list
        const user = await User.findById(request.user._id)
        user.blogs = user.blogs.filter(item => {
            if (item.toString() !== request.params.id) {
                return item
            }
        })
        // save new list to user
        await user.save()
        // delete the blog from the database
        await Blog.findByIdAndRemove(request.params.id)
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
