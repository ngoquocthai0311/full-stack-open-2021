const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

morgan.token('data', (request, response) => {
    const body = request.body
    
    if (!body.name && !body.number) {
        return ""
    }
    const obj = {
        name: body.name,
        number: body.number
    }
    return JSON.stringify(obj)
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

let data = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/', (request, response) => {
    response.send("<h1>Hello world!</h1>")
})

app.get('/api/persons', (request, response) => {
    response.json(data)
})

app.get('/info', (request, response) => {
    response.send(`<p>Phonebook has info for ${data.length} people</p><p>${new Date()}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id)
    let object = data.find(item => item.id === id)
    
    if (object) {
        response.json(object)
    } else {
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id) 
    let object = data.find(item => item.id === id) 

    if (object) {
        data = data.filter(item => item.id !== object.id)
        response.status(204).end()
    } else {
        response.status(404).end()
    }
})

app.post('/api/persons', (request, response) => {
    const body = request.body

    if (body.name && body.number) {
        const duplicatedName = data.find(item => item.name === body.name)
        if (duplicatedName) {
            return response.status(400).json({
                error: 'name should be unique'
            })
        }

        const id = Math.random(2^10)
        const object = {
            id,
            name: body.name,
            number: body.number
        }
        data = data.concat(object)

        response.json(object)
    } else {
        return response.status(400).json({
            error: 'content missing'
        })
    }
})

const PORT = process.env.PORT || 3001 
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})