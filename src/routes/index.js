const express = require('express')
const authRoute = require('../routes/v1/auth.route')
const rootRoute = express.Router()

rootRoute.use('/v1/auth', authRoute)

module.exports = rootRoute
