const mongo = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const helper = require('../utils/test_helpers')

beforeEach(async () => {
    await Blog.deleteMany({})

    // Promise.all() executes promises in parallel
    /*
    const blogObjects = helper.initalBlogs.map(blog => new Blog(blog))
    const promiseBlogsArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseBlogsArray)
    */

    // for of block can execute promises in order
    for (let each of helper.initalBlogs) {
        let blog = new Blog(each)
        await blog.save()
    }
}, 10000)

const api = supertest(app)

describe('get request', () => {
    test('blog are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    test('there are two blogs', async() => {
        const response = await api.get('/api/blogs')
        expect(response.body).toHaveLength(helper.initalBlogs.length)
    })
    test('the first blog has the title React patterns', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].title).toBe('React patterns')
    })
    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const ids = response.body.map(blog => blog.id)
        const specificedID = '5a422a851b54a676234d17f7'
        expect(ids).toContain(specificedID)
    })
})

afterAll(() => {
    mongo.connection.close()
})