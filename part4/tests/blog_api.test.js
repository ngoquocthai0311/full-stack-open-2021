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
    test('the unique identifier property of the blog posts is named id', async () => {
        const response = await api.get('/api/blogs')
        expect(response.body[0].id).toBeDefined()
    })
    test('a specific blog is within the returned blogs', async () => {
        const response = await api.get('/api/blogs')

        const ids = response.body.map(blog => blog.id)
        const specificedID = '5a422a851b54a676234d17f7'
        expect(ids).toContain(specificedID)
    })
})

describe('post request', () => {
    test('a valid blog can be added', async () => {
        await api
            .post('/api/blogs')
            .send(helper.newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const titles = response.body.map(blog => blog.title)
        const expectedTitle = 'Canonical string reduction'

        expect(response.body).toHaveLength(helper.initalBlogs.length + 1)
        expect(titles).toContain(expectedTitle)
    })
    test('blog without likes can be added', async () => {
        const newBlog = {
            'title': 'Shot from the Street',
            'author': 'Lizzy Hadfield',
            'url': 'https://www.lizzyhadfield.com/'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const likes = response.body.map(blog => blog.likes)
        expect(response.body).toHaveLength(helper.initalBlogs.length + 1)
        expect(likes).toContain(0)
    })
})

afterAll(() => {
    mongo.connection.close()
})