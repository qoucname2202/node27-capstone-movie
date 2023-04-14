const express = require('express')
const ageTypeController = require('../../controllers/age.controller')
const ageTypeRoute = express.Router()
const { verifyAdmin } = require('../../middlewares/users.middleware')

ageTypeRoute.get('/all', ageTypeController.getAllAgeType)
ageTypeRoute.get('/type', ageTypeController.getAgeTypeById)
ageTypeRoute.post('/insert', verifyAdmin, ageTypeController.insertAgeType)
ageTypeRoute.put('/update', verifyAdmin, ageTypeController.updateAgeType)
ageTypeRoute.delete('/delete', verifyAdmin, ageTypeController.deleteAgeType)
ageTypeRoute.get('/movies', verifyAdmin, ageTypeController.getMovieByAgeType)

module.exports = ageTypeRoute
