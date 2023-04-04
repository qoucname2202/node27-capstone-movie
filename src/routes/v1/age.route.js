const express = require('express')
const ageTypeController = require('../../controllers/age.controller')
const ageTypeRoute = express.Router()

ageTypeRoute.get('/all', ageTypeController.getAllAgeType)
ageTypeRoute.post('/insert', ageTypeController.insertAgeType)
ageTypeRoute.put('/update', ageTypeController.updateAgeType)
ageTypeRoute.delete('/delete', ageTypeController.deleteAgeType)
ageTypeRoute.get('/movies', ageTypeController.getMovieByAgeType)
ageTypeRoute.get('/search', ageTypeController.searchAgeType)

module.exports = ageTypeRoute
