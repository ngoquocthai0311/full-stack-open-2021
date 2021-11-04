const express = require('express')
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const middleware = require('./utils/middleware')

const app = express()
app.use(cors())
app.use(express.json())
app.use(middleware.morganLog)
app.use(cors())
app.use(express.json())

app.get('/', (request, response) => {
    response.send('<h1>Hello world</h1>')
})
app.use('/api/blogs', blogRouter)
app.use(middleware.errorHandler)
app.use(middleware.unknowEndPoint)

module.exports = app