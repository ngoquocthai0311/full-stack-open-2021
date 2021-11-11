const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const logger = require('./utils/logger')
const config = require('./utils/config')
const userRouter = require('./controllers/users')
const blogRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URI)
    .then(() => {
        logger.info('connected to mongodb')
    })
    .catch(error => {
        logger.error('can not connect to mongodb', error.message)
    })

const app = express()
app.use(cors())
app.use(express.json())
app.use(middleware.morganLog)
app.use(middleware.tokenExtractor)

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})
app.use('/api/login', loginRouter)
app.use('/api/users', userRouter)
app.use('/api/blogs', blogRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknowEndPoint)

module.exports = app