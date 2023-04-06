const RessponseMessage = require('../constants/response')
const validators = require('../middlewares/validation.middleware')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()

const moment = require('moment')

const movieController = {
  // Get banner movie
  getAllBanner: async (req, res) => {
    try {
      let bannerLst = await model.banner.findMany()
      let result = bannerLst.map((item) => {
        let { id, image, movie_id, created_at } = item
        return {
          banner_id: id,
          movie_id,
          image,
          created_at
        }
      })
      return RessponseMessage.success(res, result, 'Get banner successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Search movie
  searchMovie: async (req, res) => {
    try {
      let { movie_name } = req.query
      let result = await model.movie.findMany({
        where: {
          movie_name: {
            contains: movie_name || ''
          }
        }
      })
      if (result) {
        return RessponseMessage.success(res, result, 'Successfully!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all movie
  getAllMovie: async (req, res) => {
    try {
      let { movie_name } = req.query
      let movieLst = await model.movie.findMany({
        where: {
          movie_name: {
            contains: movie_name || ''
          }
        },
        include: {
          age_type: true
        }
      })
      let result = movieLst.map((movieItem) => {
        let { age_type, ...orther } = movieItem
        let { age_type_name, description } = age_type
        let { age_id, updated_at, is_removed, ...movie } = orther
        return { ...movie, age_type: age_type_name, age_type_desc: description }
      })
      return RessponseMessage.success(res, result, 'Get all movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get pagination list of moivie
  getPaginationListOfMovie: async (req, res) => {
    try {
      let { movie_name, page, limit } = req.query
      if (page) {
        if (movie_name !== '') {
          let sliceMovies = await model.movie.findMany({
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit),
            where: {
              movie_name: {
                contains: movie_name || ''
              }
            },
            include: {
              age_type: true
            },
            orderBy: {
              movie_id: 'asc'
            }
          })
          let result = sliceMovies.map((movieItem) => {
            let { age_type, ...orther } = movieItem
            let { age_type_name, description } = age_type
            let { age_id, updated_at, is_removed, short_desc, backdrops, ...movie } = orther
            return { ...movie, age_type: age_type_name, age_type_desc: description }
          })
          let paginationSchema = {
            currentPage: Number(page),
            count: sliceMovies.length <= Number(limit) ? sliceMovies.length : Number(limit),
            totalPages:
              Math.ceil(
                sliceMovies.length / (sliceMovies.length <= Number(limit) ? sliceMovies.length : Number(limit))
              ) + 1,
            totalCount: sliceMovies.length,
            item: result
          }
          return RessponseMessage.success(res, paginationSchema, 'Successfully!')
        } else {
          let movieLst = (await model.movie.findMany()).length
          let sliceMovies = await model.movie.findMany({
            skip: (Number(page) - 1) * Number(limit),
            take: Number(limit),
            include: {
              age_type: true
            },
            orderBy: {
              movie_id: 'asc'
            }
          })
          let result = sliceMovies.map((movieItem) => {
            let { age_type, ...orther } = movieItem
            let { age_type_name, description } = age_type
            let { age_id, updated_at, is_removed, short_desc, backdrops, ...movie } = orther
            return { ...movie, age_type: age_type_name, age_type_desc: description }
          })
          let paginationSchema = {
            currentPage: Number(page),
            count: Number(limit),
            totalPages: Math.ceil(movieLst / Number(limit)),
            totalCount: movieLst,
            item: result
          }
          return RessponseMessage.success(res, paginationSchema, 'Successfully!')
        }
      } else {
        let movieLst = await model.movie.findMany({
          include: {
            age_type: true
          }
        })
        let result = movieLst.map((movieItem) => {
          let { age_type, ...orther } = movieItem
          let { age_type_name, description } = age_type
          let { age_id, updated_at, is_removed, short_desc, backdrops, ...movie } = orther
          return { ...movie, age_type: age_type_name, age_type_desc: description }
        })
        return RessponseMessage.success(res, result, 'Successfully!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all user like movie
  getUsersLikeMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all user like movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all user rating movie
  getUsersRatingMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all user rating movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all movie by date
  getMovieByDate: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get movie by date successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Upload poster
  uploadPoster: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Upload poster successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Insert movie
  insertMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Insert movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // update movie
  updateMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Update movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete mobie
  deleteMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Delete movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get list director movie_id
  getListDirector: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get lst director successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get list actor by movie_id
  getListActor: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get list actor successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all genres by movie_id
  getListGenres: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get list genres successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all tags by movie_id
  getListTags: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get list tags successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = movieController
