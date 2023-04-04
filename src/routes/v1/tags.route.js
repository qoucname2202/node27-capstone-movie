const express = require('express')
const tagsController = require('../../controllers/tags.controller')
const tagsRoute = express.Router()

tagsRoute.get('/all', tagsController.getAllTags)
tagsRoute.post('/insert', tagsController.insertTags)
tagsRoute.put('/update', tagsController.updateTags)
tagsRoute.delete('/delete', tagsController.deleteTags)
tagsRoute.get('/movies', tagsController.getMoviesByTags)
tagsRoute.get('/search', tagsController.searchTags)

module.exports = tagsRoute
