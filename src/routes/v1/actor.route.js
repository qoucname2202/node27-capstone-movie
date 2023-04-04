const express = require('express')
const actorController = require('../../controllers/actor.controller')
const actorRoute = express.Router()

actorRoute.get('/all', actorController.getAllActor)
actorRoute.post('/insert', actorController.insertActor)
actorRoute.put('/update', actorController.updateActor)
actorRoute.delete('/delete', actorController.deleteActor)
actorRoute.get('/profile', actorController.getProfileActor)
actorRoute.get('/movie-directing', actorController.getMovieActing)

module.exports = actorRoute
