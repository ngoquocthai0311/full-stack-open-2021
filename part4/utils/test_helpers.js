const Blog = require('../models/Blog')
const User = require('../models/User')

const initalBlogs = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
]

const initialUsers = [
    {
        'username': 'hellas',
        'name': 'Arto Hellas',
        'password': 'hellas'
    },
    {
        'username': 'mluukkai',
        'password': 'hellas',
        'name': 'Matti Luukkainen'
    }
]

const newBlog = {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
}

const nonExistBlog = async () => {
    const blogObject = new Blog({
        'title': 'Shot from the Street',
        'author': 'Lizzy Hadfield',
        'url': 'https://www.lizzyhadfield.com/',
        'likes': 4
    })
    await blogObject.save()
    await blogObject.remove()

    return blogObject._id.toString()
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initalBlogs, newBlog, nonExistBlog, blogsInDb, initialUsers, usersInDb
}