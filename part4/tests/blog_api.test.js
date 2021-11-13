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
    await helper.saveIntialUserToDb()
    const user = await User.findOne({ username: helper.initialUsers[0].username })

    // Promise.all() executes promises in parallel
    /*
    const blogObjects = helper.initalBlogs.map(blog => new Blog(blog))
    const promiseBlogsArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseBlogsArray)
    */

    // for of block can execute promises in order
    for (let each of helper.initalBlogs) {
        let blog = new Blog({
            _id: each._id,
            user: user._id,
            title: each.title,
            author: each.author,
            url: each.url,
            likes: each.likes || 0
        })
        let blogSaved = await blog.save()
        user.blogs = user.blogs.concat(blogSaved._id)
        await user.save()
    }
}, 20000)

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

        const titles = response.body.map(blog => blog.title)
        const specificedTitle = 'Go To Statement Considered Harmful'
        expect(titles).toContain(specificedTitle)
    })
})

describe('post request', () => {
    test('blog can not be added without credentials', async () => {
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
        }
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(helper.initalBlogs.length)
    })
    test('a valid blog can be added', async () => {
        const IdAndToken = await helper.getIdAndTokenFromValidUser()
        const newBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
            likes: 12,
        }
        await api
            .post('/api/blogs')
            .auth(IdAndToken.token, { type: 'bearer' })
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
        const IdAndToken = await helper.getIdAndTokenFromValidUser()
        const newBlog = {
            'title': 'Shot from the Street',
            'author': 'Lizzy Hadfield',
            'url': 'https://www.lizzyhadfield.com/'
        }

        await api
            .post('/api/blogs')
            .auth(IdAndToken.token, { type: 'bearer' })
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        const likes = blogs.map(blog => blog.likes)
        expect(blogs).toHaveLength(helper.initalBlogs.length + 1)
        expect(likes).toContain(0)
    })
    test('blog without title and url can not be added', async () => {
        const IdAndToken = await helper.getIdAndTokenFromValidUser()
        const blogWithoutTitleAndUrl = {
            'author': 'Lizzy Hadfield',
            'likes': 4
        }
        await api
            .post('/api/blogs')
            .auth(IdAndToken.token, { type: 'bearer' })
            .send(blogWithoutTitleAndUrl)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(helper.initalBlogs.length)
    })
})

describe('delete request', () => {
    test('a valid id can not be deleted without credentials', async () => {
        await api
            .delete(`/api/blogs/${helper.initalBlogs[0]._id}`)
            .expect(401)
    })

    test('a valid id can be used to delete the blog', async () => {
        const IdAndToken = await helper.getIdAndTokenFromValidUser()
        await api
            .delete(`/api/blogs/${helper.initalBlogs[0]._id}`)
            .auth(IdAndToken.token, { type: 'bearer' })
            .expect(204)

        const blogs = await helper.blogsInDb()
        const ids = blogs.map(blog => blog.id)

        expect(blogs).toHaveLength(helper.initalBlogs.length - 1)
        expect(ids).not.toContain(helper.initalBlogs[0]._id)
    })
    test('an invalid id can not be used', async () => {
        const IdAndToken = await helper.getIdAndTokenFromValidUser()
        await api
            .delete('/api/blogs/invalidid')
            .auth(IdAndToken.token, { type: 'bearer' })
            .expect(400)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        expect(blogs).toHaveLength(helper.initalBlogs.length)
    })
})

describe('put request', () => {
    test('a valid id can not be used to update without credentials', async () => {
        const validID = helper.initalBlogs[0]._id
        const updatedObject = {
            ...helper.initalBlogs[0],
            likes: 10
        }

        await api
            .put(`/api/blogs/${validID}`)
            .send(updatedObject)
            .expect(401)
    })
    test('a valid id can be used to update blog', async () => {
        const IdAndToken = await helper.getIdAndTokenFromValidUser()
        const validID = helper.initalBlogs[0]._id
        const updatedObject = {
            ...helper.initalBlogs[0],
            likes: 10
        }

        await api
            .put(`/api/blogs/${validID}`)
            .auth(IdAndToken.token, { type: 'bearer' })
            .send(updatedObject)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const blogs = await helper.blogsInDb()
        const likeslist = blogs.map(blog => blog.likes)

        expect(likeslist).toContain(updatedObject.likes)
    })
    test('an invalid id can not be added', async () => {
        const IdAndToken = await helper.getIdAndTokenFromValidUser()
        const invalidID = '123invalid'
        const updatedObject = {
            ...helper.initalBlogs[0],
            likes: 10
        }
        await api
            .put(`/api/blogs/${invalidID}`)
            .auth(IdAndToken.token, { type: 'bearer' })
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