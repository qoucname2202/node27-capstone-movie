const express = require('express')
const genresController = require('../../controllers/genres.controller')
const genresRoute = express.Router()

genresRoute.get('/all', genresController.getAllGenres)
genresRoute.post('/insert', genresController.insertGenres)
genresRoute.put('/update', genresController.updateGenres)
genresRoute.delete('/delete', genresController.deleteGenres)
genresRoute.get('/movies', genresController.getMoviesByGenres)
genresRoute.get('/search', genresController.searchGenres)

module.exports = genresRoute
