const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const crypto = require('crypto')

require('dotenv').config()

const Phonebook = require('./models/phonebook')

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

app.get('/api/persons', (request, response, next) => {
    Phonebook.find({})
        .then(result => {
            response.json(result)
        })
        .catch(error => {
            response.status(404).json({
                error: 'can not retrieve information from the database'
            })
        })
})

app.get('/info', (request, response) => {
    Phonebook.estimatedDocumentCount()
        .then(result => {
            response.send(`<p>Phonebook has info for ${result} people</p><p>${new Date()}</p>`)        
        })
        .catch(error => {
            response.status(404).json({
                error
            })
        })
})

app.get('/api/persons/:id', (request, response, next) => {
    Phonebook.findById(request.params.id)
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(404).json({
                    error: 'can not find the id'
                })
            }
        })
        .catch(error => {
            next(error)
        })
})

app.delete('/api/persons/:id', (request, response, next) => {
    Phonebook.findByIdAndRemove(request.params.id)
        .then(result => {
            if (result) {
                response.status(204).end()
            } else {
                return response.status(400).json({
                    error: 'id does not exist'
                })
            }
            
        })
        .catch(error => {
            next(error)
        })
})

app.post('/api/persons', (request, response, next) => {
    const body = request.body

    const id = crypto.randomBytes(12).toString('hex')
    const phonebook = new Phonebook({
        _id: id,
        name: body.name,
        number: body.number
    })

    phonebook.save()
        .then(result => {
            response.json(result)
        })
        .catch(error => {
            next(error)
        })
})

app.put('/api/persons/:id', (request, response, next) => {
    const body = request.body
    const id = request.params.id

    const phonebook = {
        _id: id, 
        name: body.name,
        number: body.number
    }

    Phonebook.findByIdAndUpdate(id, phonebook, {new: true})
        .then(result => {
            if (result) {
                response.json(result)
            } else {
                response.status(500).end()
            }
        })
        .catch(error => {
            next(error)
        })
})

const errorHandler = (error, request, response, next) => {
    console.log(error.message) 

    if (error.name === 'CastError') {
        return response.status(400).send({
            error: 'malformated id'
        })
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({
            error: error.message,
            name: 'ValidationError'
        })
    }

    next(error)
}
app.use(errorHandler)

const unknowEndPoint = (request, response) => {
    response.status(400).send({
        error: 'unknow endpoint'
    })
}
app.use(unknowEndPoint)

const PORT = process.env.PORT 
app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`)
})