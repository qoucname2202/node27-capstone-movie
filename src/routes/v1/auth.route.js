const express = require('express')
const authController = require('../../controllers/auth.controller')
const authRoute = express.Router()

authRoute.get('/signup', authController.signup)

module.exports = authRoute
