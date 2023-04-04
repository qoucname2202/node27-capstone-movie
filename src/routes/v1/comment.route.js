const express = require('express')
const commentController = require('../../controllers/comment.controller')
const commentRoute = express.Router()

commentRoute.get('/:id', commentController.getCommentByMovieId)
commentRoute.post('/insert', commentController.insertComment)
commentRoute.put('/update', commentController.updateComment)
commentRoute.delete('/delete', commentController.deleteComment)
commentRoute.get('/users', commentController.getUsersCommentMovie)

module.exports = commentRoute
