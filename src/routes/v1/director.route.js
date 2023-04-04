const express = require('express')
const directorController = require('../../controllers/director.controller')
const dirRoute = express.Router()

dirRoute.get('/all', directorController.getAllDirector)
dirRoute.post('/insert', directorController.insertDirector)
dirRoute.put('/update', directorController.updateDirector)
dirRoute.delete('/delete', directorController.deleteDirector)
dirRoute.get('/search', directorController.searchDirector)
dirRoute.get('/movie-directing', directorController.getMovieDirecting)

module.exports = dirRoute
