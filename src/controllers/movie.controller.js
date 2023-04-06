const RessponseMessage = require('../constants/response')
const validators = require('../middlewares/validation.middleware')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
const { checkAccessToken } = require('../middlewares/auth.middleware')
const moment = require('moment')
const { profileUserLike, profileUserRating, getDatesInRange } = require('../utils/helpers')
const validateDate = require('validate-date')
const { uploadPoster } = require('../utils/file')
const fs = require('fs')

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
      let { movie_id } = req.query
      let { error, value } = await validators.numberValidate({ movie_id: Number(movie_id) })
      if (!error) {
        let movieExist = await model.movie.findUnique({
          where: {
            movie_id: value?.movie_id
          }
        })
        if (movieExist) {
          let detailsMovieLikes = await model.like_movie.findMany({
            where: {
              movie_id: value?.movie_id
            },
            include: {
              user: true
            }
          })
          let result = profileUserLike(detailsMovieLikes)
          return RessponseMessage.success(res, result, 'Successfully!')
        } else {
          return RessponseMessage.badRequest(res, '', 'Movie does not exist!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all user rating movie
  getUsersRatingMovie: async (req, res) => {
    try {
      let { movie_id } = req.query
      let { error, value } = await validators.numberValidate({ movie_id: Number(movie_id) })
      if (!error) {
        let movieExist = await model.movie.findUnique({
          where: {
            movie_id: value?.movie_id
          }
        })
        if (movieExist) {
          let detailsMovieRates = await model.rate_movie.findMany({
            where: {
              movie_id: value?.movie_id
            },
            include: {
              user: true
            }
          })
          let result = profileUserRating(detailsMovieRates)
          return RessponseMessage.success(res, result, 'Successfully!')
        } else {
          return RessponseMessage.badRequest(res, '', 'Movie does not exist!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all movie by date
  getMovieByDate: async (req, res) => {
    try {
      let { fromDate, toDate } = req.query
      let checkPromDate = validateDate(fromDate, (responseType = 'boolean'), (dateFormat = 'yyyy/mm/dd'))
      let checkToDate = validateDate(toDate, (responseType = 'boolean'), (dateFormat = 'yyyy/mm/dd'))
      if (checkPromDate && checkToDate) {
        let { error } = await validators.pagingMovieByDateValidate(req.query)
        if (!error) {
          let movieLst = await model.movie.findMany({
            orderBy: {
              release_date: 'asc'
            },
            include: {
              age_type: true
            }
          })
          let start = new Date(fromDate)
          let end = new Date(toDate)
          let range = getDatesInRange(start, end)
          let newMovieLst = []
          for (let i = 0; i < movieLst.length; i++) {
            let movieItem = movieLst[i]
            range.forEach((date) => {
              if (date === movieItem.release_date) {
                newMovieLst.push(movieItem)
              }
            })
          }
          let result = newMovieLst.map((movieItem) => {
            let { age_type, ...orther } = movieItem
            let { age_type_name, description } = age_type
            let { age_id, updated_at, is_removed, short_desc, backdrops, ...movie } = orther
            return { ...movie, age_type: age_type_name, age_type_desc: description }
          })
          return RessponseMessage.success(res, result, 'Successfully!')
        } else {
          return RessponseMessage.badRequest(res, '', error.details)
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'Invalid date. Please enter date dd/mm/yyyy!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Upload poster
  uploadPoster: async (req, res) => {
    try {
      let { movie_id } = req.query
      let { error, value } = await validators.numberValidate({ movie_id: Number(movie_id) })
      if (!error) {
        let movieExist = await model.movie.findUnique({
          where: {
            movie_id: value?.movie_id
          }
        })
        if (movieExist) {
          if (!req.file) {
            return RessponseMessage.badRequest(res, '', 'Invalid file format. should be png/jpg/jpeg/webp!')
          } else {
            fs.readFile(process.cwd() + '/public/img/' + req.file.filename, (err, data) => {
              let fileName = `"data:${req.file.mimetype};base64,${Buffer.fromDate(data).toString('base64')}"`
              fs.unlinkSync(process.cwd() + '/public/img/' + req.file.filename)
              let formatString = fileName.slice(1, fileName.length - 1)
              uploadPoster(res, formatString, movie_id)
            })
          }
        } else {
          return RessponseMessage.badRequest(res, '', 'Movie does not exist!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Insert movie
  insertMovie: async (req, res) => {
    try {
      let { error, value } = await validators.insertMovieValidate(req.body)
      if (!error) {
        console.log(value)
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
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
