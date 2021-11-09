const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const supertest = require('supertest')
const User = require('../models/User')
const app = require('../app')
const helper = require('../utils/test_helpers')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})

    const saltRound = 10
    const passwordHash = await bcrypt.hash(helper.initialUsers[0].password, saltRound)
    const user = new User({
        username: helper.initialUsers[0].username,
        passwordHash,
        name: helper.initialUsers[0].name
    })
    await user.save()
}, 10000)

describe('post request', () => {
    test('valid username can be added', async () => {
        await api
            .post('/api/users')
            .send(helper.initialUsers[1])
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length)
    }, 10000)
    test('username must be unique', async () => {
        await api
            .post('/api/users')
            .send(helper.initialUsers[0])
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const users = await helper.usersInDb()
        expect(users).toHaveLength(helper.initialUsers.length - 1)
    })
})

afterAll(() => {
    mongoose.connection.close()
})