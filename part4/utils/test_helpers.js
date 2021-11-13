const Blog = require('../models/Blog')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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
        'username': 'matti',
        'password': 'luukkainen',
        'name': 'Matti Luukkainen'
    }
]

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

const saveIntialUserToDb = async () => {
    const saltRound = 10
    const passwordHash = await bcrypt.hash(initialUsers[0].password, saltRound)
    const user = new User({
        username: initialUsers[0].username,
        passwordHash,
        name: initialUsers[0].name
    })
    await user.save()
}

const getIdAndTokenFromValidUser = async () => {
    const user = await User.findOne({ username: initialUsers[0].username })
    const userForToken = {
        username: user.username,
        id: user._id
    }
    /*global process*/
    const result = {
        id: user._id,
        token: jwt.sign(userForToken, process.env.SECRET)
    }
    return result
}

module.exports = {
    initalBlogs, nonExistBlog, blogsInDb, initialUsers, usersInDb, saveIntialUserToDb, getIdAndTokenFromValidUser
}