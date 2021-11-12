const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response, next) => {
    const body = {
        username: request.body.username || null,
        password: request.body.password || null
    }

    try {
        const user = await User.findOne({ username: body.username })
        const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
        if (!(user && passwordCorrect)) {
            return response.status(401).json({
                error: 'invalid username or password'
            })
        }

        const userForToken = {
            username: user.username,
            id: user._id
        }

        /*global process*/
        const token = jwt.sign(userForToken, process.env.SECRET)
        response.status(200).json({
            token, username: user.username, name: user.name
        })
    } catch (error) {
        next(error)
    }
})

module.exports = loginRouter