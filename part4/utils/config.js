const { info } = require('../utils/logger')
require('dotenv').config()

/* global process*/
const PORT = process.env.PORT
const MONGODB_URI = process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI

info('current mongodb uri is' ,MONGODB_URI)
module.exports = {
    PORT, MONGODB_URI
}