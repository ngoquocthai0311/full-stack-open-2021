const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', { 'url': 1, 'title': 1, 'author': 1 })
        response.status(200).json(users)
    } catch (error) {
        next(error)
    }
})

userRouter.get('/id/:username', async (request, response, next) => {
    try {
        const user = await User.findOne({ username: request.params.username })
        if (!user) {
            return response.status(404).json({
                error: 'can not find `username`'
            })
        }
        response.status(200).json({
            id: user.id
        })
    } catch (error) {
        next(error)
    }
})

userRouter.post('/', async (request, response, next) => {
    const body = request.body
    const saltRound = 10

    const passwordHash = await bcrypt.hash(body.password, saltRound)

    const user = new User({
        username: body.username,
        passwordHash,
        name: body.name
    })
    try {
        await user.save()
        response.status(200).json(user)
    } catch (error) {
        next(error)
    }
})

module.exports = userRouter
