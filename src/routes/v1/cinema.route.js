const express = require('express')
const cinemaController = require('../../controllers/cinema.controller')
const cinemaRoute = express.Router()

cinemaRoute.get('/info-cinema-system', cinemaController.getInfoCinemaSystem)
cinemaRoute.get('/info-cinema-clusters', cinemaController.getInfoCinemaCluster)
cinemaRoute.get('/showtimes-system', cinemaController.getInfoShowtimesSys)
cinemaRoute.get('/showtimes', cinemaController.getShowtimesMovie)

module.exports = cinemaRoute
