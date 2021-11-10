const morgan = require('morgan')

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

const morganLog = morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        tokens.data(req, res)
    ].join(' ')
})

const errorHandler = (error, request, response, next) => {
    switch(error.name){
    case 'CastError': {
        response.status(400).json({
            error: 'malformed id'
        })
        break
    }
    case 'ValidationError': {
        response.status(400).json({
            error: error.message
        })
        break
    }
    case 'MongooseError': {
        response.status(400).json({
            error: error.message
        })
        break
    }
    default: {
        response.status(400).json({
            error: error.message
        })
    }
    }
    next(error)
}

const unknowEndPoint = (request, response) => {
    response.status(400).json({
        error: 'unknown endpoint'
    })
}

module.exports = {
    morganLog, errorHandler, unknowEndPoint
}