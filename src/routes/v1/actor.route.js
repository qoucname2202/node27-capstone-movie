const express = require('express')
const actorController = require('../../controllers/actor.controller')
const { verifyAdmin, verifyToken } = require('../../middlewares/users.middleware')
const actorRoute = express.Router()

actorRoute.get('/all-actor', actorController.getAllActor)
actorRoute.post('/insert', verifyAdmin, actorController.insertActor)
actorRoute.put('/update', verifyAdmin, actorController.updateActor)
actorRoute.delete('/delete', verifyAdmin, actorController.deleteActor)
actorRoute.get('/profile', verifyToken, actorController.getProfileActor)
actorRoute.get('/movie-acting', verifyToken, actorController.getMovieActing)

module.exports = actorRoute
