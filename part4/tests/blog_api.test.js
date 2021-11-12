const mongo = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/Blog')
const User = require('../models/User')
const helper = require('../utils/test_helpers')

const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})
    await User.deleteMany({})

    await api
        .post('/api/user')
        .send(helper.initialUsers)

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
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
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

        const blogs = await helper.blogsInDb()
        const likes = blogs.map(blog => blog.likes)
        expect(blogs).toHaveLength(helper.initalBlogs.length + 1)
        expect(likes).toContain(0)
    })
    test('blog without title and url can not be added', async () => {
        const blogWithoutTitleAndUrl = {
            'author': 'Lizzy Hadfield',
            'likes': 4
        }
        await api
            .post('/api/blogs')
            .send(blogWithoutTitleAndUrl)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(helper.initalBlogs.length)
    })
})

describe('delete request', () => {
    test('a valid id can be used to delete the blog', async () => {
        await api
            .delete(`/api/blogs/${helper.initalBlogs[0]._id}`)
            .expect(204)

        const blogs = await helper.blogsInDb()
        const ids = blogs.map(blog => blog.id)

        expect(blogs).toHaveLength(helper.initalBlogs.length - 1)
        expect(ids).not.toContain(helper.initalBlogs[0]._id)
    })
    test('an invalid id can not be used', async () => {
        await api
            .delete('/api/blogs/invalidid')
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(helper.initalBlogs.length)
    })
})

describe('put request', () => {
    test('a valid id can be used to update blog', async () => {
        const validID = helper.initalBlogs[0]._id
        const updatedObject = {
            ...helper.initalBlogs[0],
            likes: 10
        }

        await api
            .put(`/api/blogs/${validID}`)
            .send(updatedObject)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        const likeslist = blogs.map(blog => blog.likes)

        expect(likeslist).toContain(updatedObject.likes)
    })
    test('an invalid id can not be added', async () => {
        const invalidID = '123invalid'
        const updatedObject = {
            ...helper.initalBlogs[0],
            likes: 10
        }
        await api
            .put(`/api/blogs/${invalidID}`)
            .send(updatedObject)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        const likes = blogs.map(blog => blog.likes)
        expect(likes).not.toContain(updatedObject.likes)
    })
})

afterAll(() => {
    mongo.connection.close()
})