const express = require('express')
const userController = require('../../controllers/users.controller')
const { verifyAdmin, verifyToken } = require('../../middlewares/users.middleware')
const upload = require('../../middlewares/upload.middleware')
const userRoute = express.Router()

userRoute.get('/all-user', verifyAdmin, userController.getAllUsers)
userRoute.post('/test-token', userController.testToken)
userRoute.post('/refresh-token', userController.refreshToken)
userRoute.get('/forgot-password', userController.forgotPassword)
userRoute.put('/reset-password', userController.resetPassword)
userRoute.get('/user-types', verifyToken, userController.getAllUserType)
userRoute.get('/pagination', verifyAdmin, userController.getPaginationListOfUser)
userRoute.get('/search', verifyAdmin, userController.searchUser)
userRoute.get('/search-paging', verifyAdmin, userController.searchUserPagination)
userRoute.get('/profile', verifyToken, userController.getProfileUser)
userRoute.get('/account', verifyAdmin, userController.getInfoUser)
userRoute.post('/insert', verifyAdmin, userController.insertUser)
userRoute.put('/update', verifyToken, userController.updateUser)
userRoute.put('/update-admin', verifyAdmin, userController.updateUserByAdmin)
userRoute.post('/upload-avatar', verifyToken, upload.single('avatarURL'), userController.uploadAvatar)
userRoute.delete('/delete', verifyAdmin, userController.deleteUser)
userRoute.post('/like', verifyToken, userController.likeMovie)
userRoute.post('/unlike', verifyToken, userController.unlikeMovie)
userRoute.post('/rating', verifyToken, userController.ratingMovie)
userRoute.get('/movie-favorite', verifyToken, userController.getAllMovieFavorite)
userRoute.get('/movie-rating', verifyToken, userController.getAllMovieRating)

module.exports = userRoute
