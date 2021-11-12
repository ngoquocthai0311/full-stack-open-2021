const mongo = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/User')
const helper = require('../utils/test_helpers')

const api = supertest(app)

beforeEach(async () => {
    await User.deleteMany({})
    await helper.saveIntialUserToDb()
}, 10000)

describe('test login', () => {
    test('valid username and password can login', async () => {
        const user = {
            username: helper.initialUsers[0].username,
            password: helper.initialUsers[0].password
        }
        await api
            .post('/api/login')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('invalid username and password can not login', async () => {
        const user = {
            username: helper.initialUsers[0].username,
            password: 'wrong'
        }

        await api
            .post('/api/login')
            .send(user)
            .expect(401)
            .expect('Content-Type', /application\/json/)
    })
    test('empty either username or password can not be accepted', async () => {
        const user = {
            username: helper.initialUsers[0].username,
        }

        await api
            .post('/api/login')
            .send(user)
            .expect(400)
            .expect('Content-Type', /application\/json/)
    })
})

afterAll(() => {
    mongo.connection.close()
})