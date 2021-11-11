const blogRouter = require('express').Router()
const jwt = require('jsonwebtoken')
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
    /*global process*/
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!request.token && !decodedToken.id) {
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
    try {
        // fetch blog from db
        const blog = await Blog.findById(request.params.id)

        // decode the token into object with 2 attributes
        // { username, id }
        const decodedToken = jwt.verify(request.token, process.env.SECRET)

        // check if decodedToken is valid
        if (!(decodedToken.id)) {
            return response.status(400).json({
                error: 'token is missing or invalid'
            })
        }
        // check if the user is authorized for the action
        if (!(decodedToken.id === blog.user.toString())) {
            return response.status(401).json({
                error: 'unauthorized action'
            })
        }

        // fetch user from db to update new blog list
        const user = await User.findById(decodedToken.id)
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
