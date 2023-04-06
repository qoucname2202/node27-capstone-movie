const validators = require('../middlewares/validation.middleware')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
const RessponseMessage = require('../constants/response')
const moment = require('moment')
const file = {
  updateAvatar: async (res, avatarURL, user_id) => {
    let result = await model.user.update({
      where: {
        user_id: user_id
      },
      data: {
        avatar: avatarURL,
        updated_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
      }
    })
    if (result) {
      return RessponseMessage.success(res, '', 'Upload avatar successfully!')
    }
  },
  uploadPoster: async (res, posterURL, movie_id) => {
    let result = await model.movie.update({
      where: {
        movie_id: Number(movie_id)
      },
      data: {
        poster: posterURL,
        updated_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
      }
    })
    if (result) {
      return RessponseMessage.success(res, '', 'Upload poster successfully!')
    }
  }
}

module.exports = file
