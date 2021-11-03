const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const logger = require('./utils/logger')
const config = require('./utils/config')
const blogRouter = require('./controllers/blogs')

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

app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})
app.use('/api/blogs', blogRouter)

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
        default: {
            response.status(400).json({
                error: error.message
            })
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

app.listen(config.PORT, () => {    
    logger.info(`Server running on port ${config.PORT}`)
})
