const mongoose = require('mongoose')
const supertest = require('supertest')
const User = require('../models/User')
const app = require('../app')
const helper = require('../utils/test_helpers')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await helper.saveIntialUserToDb()

}, 10000)

describe('post request', () => {
    test('valid username can be added', async () => {
        const newUser = {
            'username': 'hellas',
            'name': 'Arto Hellas',
            'password': 'hellas'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length + 1)
    })
    test('username must be unique', async () => {
        await api
            .post('/api/users')
            .send(helper.initialUsers[0])
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)
    })
    test('the length of username which is smaller than 3 can not be added to the database', async () => {
        const invalidUsernameUserObject = {
            username: 'te',
            name: 'name',
            password: 'password'
        }

        await api
            .post('/api/users')
            .send(invalidUsernameUserObject)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)
    })
})

afterAll(() => {
    mongoose.connection.close()
})