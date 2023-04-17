const express = require('express')
const genresController = require('../../controllers/genres.controller')
const genresRoute = express.Router()
const { verifyAdmin, verifyToken } = require('../../middlewares/users.middleware')

genresRoute.get('/all-genres', genresController.getAllGenres)
genresRoute.get('/search', genresController.searchGenres)
genresRoute.post('/insert', verifyAdmin, genresController.insertGenres)
genresRoute.put('/update', verifyAdmin, genresController.updateGenres)
genresRoute.delete('/delete', verifyAdmin, genresController.deleteGenres)
genresRoute.get('/movies', verifyToken, genresController.getMoviesByGenres)

module.exports = genresRoute
