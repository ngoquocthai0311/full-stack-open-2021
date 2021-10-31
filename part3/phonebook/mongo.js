const mongoose = require('mongoose')

const paramLength = process.argv.length

if (paramLength < 3 || paramLength > 5 || paramLength === 4) {
    console.log('Please provide password, name and number as an argument: node mongo.js <password> <name> <number>')
    console.log('Or please provide only password as an argument: node mongo.js <password>')
    process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0.82gav.mongodb.net/phonebook-app?retryWrites=true&w=majority`

// connect the application to db
mongoose.connect(url)

// create Schema 
const phonebookSchema = new mongoose.Schema({
    _id: String,
    name: String,
    number: String
})

// create model in the collection 
const Phonebook = mongoose.model('Phonebook', phonebookSchema)

// execute the below if the length of argurment is correct 
if (paramLength === 3) {
    Phonebook.find({})
        .then(result => {
            console.log('Phonebook:')            
            result.map(item => console.log(`${item.name} ${item.number}`))
            mongoose.connection.close()
        })
} else {
    const id = Math.random(2^10)
    const phonebook = new Phonebook({
        _id: id,
        name: process.argv[3],
        number: process.argv[4]
    })
    phonebook.save().then(() => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
        mongoose.connection.close()
    })
}
