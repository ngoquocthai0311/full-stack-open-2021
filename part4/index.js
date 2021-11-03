const http = require('http')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const morgan = require('morgan')
const logger = require('./utils/logger')

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
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
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
        logger.info('connected to mongodb')
    })
    .catch(error => {
        logger.error('can not connect to mongodb', error.message)        
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

app.post('/api/blogs', (request, response, next) => {    
    const blog = new Blog(request.body)

    blog
        .save()
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => {
            next(error)
        })
})

const errorHandler = (error, request, response, next) => {    
        
    switch(error.name){
        case 'CastError': {
            response.status(400).json({
                error: 'malformed'
            })
            break;
        }
        case 'ValidationError': {
            response.status(400).json({
                error: 'validation error'
            })
            break;
        }       
        case 'MongooseError': {
            response.status(400).json({
                error: 'time out'
            })
            break;
        }
    }
    next(error)
}
app.use(errorHandler)

const unknowEndPoint = (request, response) => {
    response.status(400).json({
        error: 'unknown endpoint'
    })
}
app.use(unknowEndPoint)

const PORT = process.env.PORT
app.listen(PORT, () => {    
    logger.info(`Server running on port ${PORT}`)
})
