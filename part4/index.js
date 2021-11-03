const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')

require('dotenv').config()

const app = express()
app.use(cors())
app.use(express.json())

morgan.token('data', (request, response) => {
    const body = request.body
    if (!body.title && !body.author && !body.url && !body.likes) {
        return ''
    }

    const blogObj = {
        title: body.listen,
        author: body.author,
        url: body.url,
        body: body.likes
    }
    return JSON.stringify(blogObj)
})
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.data(req, res)
    ].join(' ')
}))

const blogSchema = new mongoose.Schema({
    title: String,
    author: String,
    url: String,
    likes: Number
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl)
    .then(() => {
        console.log('connected to mongodb')
    })
    .catch(error => {
        console.log(error)
    })

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})
app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then(blogs => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
        response.status(201).json(result)
        })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
