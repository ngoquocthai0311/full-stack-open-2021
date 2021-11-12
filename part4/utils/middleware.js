const jwt = require('jsonwebtoken')
const morgan = require('morgan')
const User = require('../models/User')
// const logger = require('../utils/logger')

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

const tokenExtractor = (request, response, next) => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        request.token = authorization.substring(7)
        next()
    } else {
        return response.status(401).json({
            error: 'token is missing or invalid'
        })
    }
}

const userExtractor = async (request, response, next) => {
    /*global process*/
    try {
        const decodedToken = jwt.verify(request.token, process.env.SECRET)
        if (!decodedToken.id) {
            return response.status(401).json({
                error: 'token is mising or invalid'
            })
        }
        request.user = await User.findById(decodedToken.id)
        next()
    } catch (error) {
        next(error)
    }
}

const errorHandler = (error, request, response, next) => {
    if (error.name === 'CastError') {
        return response.status(400).json({
            error: 'malformed id'
        })
    } else {
        response.status(400).json({
            error: error.message
        })
    }
}

const unknowEndPoint = (request, response) => {
    response.status(404).send({
        error: 'unknown endpoint'
    })
}

module.exports = {
    morganLog, tokenExtractor, userExtractor, errorHandler, unknowEndPoint
}