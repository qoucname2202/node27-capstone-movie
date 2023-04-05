const RessponseMessage = require('../constants/response')
const validators = require('../middlewares/validation.middleware')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
const moment = require('moment')

const movieController = {
  // Get banner movie
  getAllBanner: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get banner successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Search movie
  searchMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Search movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all movie
  getAllMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get pagination list of moivie
  getPaginationListOfMovie: async (req, res) => {
    try {
      let { keyword, page, limit } = req.query
      if (page) {
        let movieLst = (await model.movie.findMany()).length
        let pagingRes = await model.movie.findMany({
          skip: (Number(page) - 1) * Number(limit),
          take: Number(limit),
          where: {
            movie_name: {
              contains: keyword || ''
            }
          },
          select: {
            movie_id: true,
            movie_name: true
          },
          orderBy: {
            movie_id: 'asc'
          }
        })
        let paginationSchema = {
          currentPage: Number(page),
          count: Number(limit),
          totalPages: Math.ceil(movieLst / Number(limit)),
          totalCount: movieLst,
          item: pagingRes
        }
        return RessponseMessage.success(res, paginationSchema, 'Successfully!')
      } else {
        let result = await model.movie.findMany({
          select: {
            movie_id: true,
            movie_name: true
          }
        })
        if (result) {
          return RessponseMessage.success(res, result, 'Successfully!')
        }
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
