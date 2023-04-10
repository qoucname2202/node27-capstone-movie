const express = require('express')
const actorController = require('../../controllers/actor.controller')
const { verifyAdmin, verifyToken } = require('../../middlewares/users.middleware')
const actorRoute = express.Router()
const upload = require('../../middlewares/upload.middleware')

actorRoute.get('/all-actor', actorController.getAllActor)
actorRoute.post('/insert', verifyAdmin, actorController.insertActor)
actorRoute.put('/update', verifyAdmin, actorController.updateActor)
actorRoute.delete('/delete', verifyAdmin, actorController.deleteActor)
actorRoute.get('/profile', verifyToken, actorController.getProfileActor)
actorRoute.get('/movie-acting', verifyToken, actorController.getMovieActing)
actorRoute.post('/upload-avatar', verifyAdmin, upload.single('actURL'), actorController.uploadAvatar)

module.exports = actorRoute
