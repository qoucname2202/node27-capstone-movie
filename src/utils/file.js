const validators = require('../middlewares/validation.middleware')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
const RessponseMessage = require('../constants/response')
const moment = require('moment')
const file = {
  updateAvatar: async (res, avatarURL, user_id) => {
    try {
      let userExist = await model.user.findUnique({
        where: {
          user_id: Number(user_id)
        }
      })
      if (userExist) {
        let result = await model.user.update({
          where: {
            user_id: Number(user_id)
          },
          data: {
            avatar: avatarURL,
            updated_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
          }
        })
        if (result) {
          return RessponseMessage.success(res, '', 'Upload avatar successfully!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'User does not exist!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Upload failed!')
    }
  },
  uploadPoster: async (res, posterURL, movie_id) => {
    try {
      let movieExist = await model.movie.findUnique({
        where: {
          movie_id: Number(movie_id)
        }
      })
      if (movieExist) {
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
      } else {
        return RessponseMessage.badRequest(res, '', 'Movie does not exist!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Upload failed!')
    }
  },
  uploadBackdrops: async (res, backdropsURL, movie_id) => {
    try {
      let movieExist = await model.movie.findUnique({
        where: {
          movie_id: Number(movie_id)
        }
      })
      if (movieExist) {
        let result = await model.movie.update({
          where: {
            movie_id: Number(movie_id)
          },
          data: {
            backdrops: backdropsURL,
            updated_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
          }
        })
        if (result) {
          return RessponseMessage.success(res, '', 'Upload backdrops successfully!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'Movie does not exist!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Upload failed!')
    }
  },
  updateAvatarAct: async (res, actURL, actor_id) => {
    try {
      let actExist = await model.actor.findUnique({
        where: {
          act_id: Number(actor_id)
        }
      })
      if (actExist) {
        let result = await model.actor.update({
          where: {
            act_id: Number(actor_id)
          },
          data: {
            avatar: actURL,
            updated_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
          }
        })
        if (result) {
          return RessponseMessage.success(res, '', 'Upload avatar actor successfully!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'Actor does not exist!')
      }
    } catch (err) {
      RessponseMessage.err(res, 'Upload failed!')
    }
  }
}

module.exports = file
