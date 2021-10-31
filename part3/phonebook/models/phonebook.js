const mongo = require('mongoose')

const url = process.env.MONGODB_URI
mongo.connect(url)
    .then(result => {
        console.log('connected to mongodb')
    })
    .catch(error => {
        console.log('cannot connect to mongodb')
    })

const phonebookSchema = new mongo.Schema({
    _id: String,
    name: String,
    number: String
})

phonebookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongo.model('Phonebook', phonebookSchema)