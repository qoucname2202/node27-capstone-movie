const RessponseMessage = require('../constants/response')
const validators = require('../middlewares/validation.middleware')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
const moment = require('moment')

const genresController = {
  // Get all genres
  getAllGenres: async (req, res) => {
    try {
      let genresLst = await model.genres.findMany()
      let result = genresLst.map((genItem) => {
        let { is_removed, updated_at, ...other } = genItem
        return other
      })
      return RessponseMessage.success(res, result, 'Get all genres successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Search genres by genres_type_name
  searchGenres: async (req, res) => {
    try {
      let { genres_id } = req.query
      let { error } = validators.genresIdValidate({ gen_id: +genres_id })
      if (!error) {
        let genresExist = await model.genres.findUnique({
          where: {
            gen_id: +genres_id
          }
        })
        if (genresExist) {
          let result = await model.genres.findUnique({
            where: {
              gen_id: +genres_id
            },
            select: {
              gen_type: true,
              created_at: true,
              updated_at: true
            }
          })
          if (result) {
            return RessponseMessage.success(res, result, 'Successfully!')
          }
        } else {
          return RessponseMessage.badRequest(
            res,
            {
              gen_id: +genres_id
            },
            'Genres does not exists!'
          )
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Insert genres
  insertGenres: async (req, res) => {
    try {
      let { genres_type } = req.body
      let { error } = await validators.genresValidate({ gen_type: genres_type })
      if (!error) {
        let result = await model.genres.create({
          data: {
            gen_type: genres_type,
            created_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
          }
        })
        if (result) {
          return RessponseMessage.success(res, result, 'Insert successfully!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update genres
  updateGenres: async (req, res) => {
    try {
      let { genres_id } = req.query
      let { genres_type } = req.body
      let { error } = validators.genresIdValidate({ gen_id: +genres_id })
      if (!error) {
        let genresExist = await model.genres.findUnique({
          where: {
            gen_id: +genres_id
          }
        })
        if (genresExist) {
          let { error, value } = await validators.genresValidate({ gen_type: genres_type })
          if (!error) {
            let result = await model.genres.update({
              where: {
                gen_id: +genres_id
              },
              data: {
                gen_type: value?.gen_type,
                updated_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
              }
            })
            if (result) {
              return RessponseMessage.success(res, result, 'Update successfully!')
            }
          } else {
            return RessponseMessage.badRequest(res, '', error.details[0].message)
          }
        } else {
          return RessponseMessage.badRequest(
            res,
            {
              gen_id: +genres_id
            },
            'Genres does not exists!'
          )
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete genres
  deleteGenres: async (req, res) => {
    try {
      let { genres_id } = req.query
      let { error } = validators.genresIdValidate({ gen_id: +genres_id })
      if (!error) {
        let genresExist = await model.genres.findUnique({
          where: {
            gen_id: +genres_id
          }
        })
        if (genresExist) {
          let result = await model.genres.delete({
            where: {
              gen_id: +genres_id
            }
          })
          if (result) {
            return RessponseMessage.success(res, '', 'Delete genres successfully!')
          }
        } else {
          return RessponseMessage.badRequest(
            res,
            {
              gen_id: +genres_id
            },
            'Genres does not exists!'
          )
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get profile genres
  getMoviesByGenres: async (req, res) => {
    try {
      let { genres_id } = req.query
      let { error } = validators.genresIdValidate({ gen_id: +genres_id })
      if (!error) {
        let genresExist = await model.genres.findUnique({
          where: {
            gen_id: +genres_id
          }
        })
        if (genresExist) {
          let movieLst = await model.movie_genres.findMany({
            where: {
              gen_id: +genres_id
            },
            include: {
              movie: true
            }
          })
          let result = movieLst.map((movieItem) => {
            let { overview, backdrops, country, is_removed, updated_at, created_at, age_id, ...itemDiff } =
              movieItem.movie
            return itemDiff
          })
          return RessponseMessage.success(res, result, 'Successfully!')
        } else {
          return RessponseMessage.badRequest(
            res,
            {
              gen_id: +genres_id
            },
            'Genres does not exists!'
          )
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = genresController
