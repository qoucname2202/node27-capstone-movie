const express = require('express')
const authController = require('../../controllers/auth.controller')
const authRoute = express.Router()

authRoute.post('/signup', authController.signup)
authRoute.post('/signin', authController.signin)
authRoute.post('/signout', authController.signout)

module.exports = authRoute
