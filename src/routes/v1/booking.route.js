const express = require('express')
const bookingController = require('../../controllers/booking.controller')
const bookingRoute = express.Router()

bookingRoute.post('/booking-tickets', bookingController.bookingTicketMovie)
bookingRoute.get('/box-offiece', bookingController.getAllBoxOffiece)
bookingRoute.post('/insert-showtimes', bookingController.createShowTimes)

module.exports = bookingRoute
