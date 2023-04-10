const express = require('express')
const commentController = require('../../controllers/comment.controller')
const commentRoute = express.Router()
const { verifyToken, verifyAdmin } = require('../../middlewares/users.middleware')

commentRoute.get('/all-comment', verifyToken, commentController.getCommentByMovieId)
commentRoute.post('/insert', verifyToken, commentController.insertComment)
commentRoute.put('/update', verifyToken, commentController.updateComment)
commentRoute.delete('/delete', verifyToken, commentController.deleteComment)
commentRoute.get('/users', verifyAdmin, commentController.getUsersCommentMovie)

module.exports = commentRoute
