const RessponseMessage = require('../constants/response')
const validators = require('../middlewares/validation.middleware')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
const { checkAccessToken } = require('../middlewares/auth.middleware')
const moment = require('moment')
const { profileUserLike, profileUserRating, getDatesInRange } = require('../utils/helpers')
const validateDate = require('validate-date')
const { uploadPoster, uploadBackdrops } = require('../utils/file')
const fs = require('fs')
let slugify = require('slugify')

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
              let fileName = `"data:${req.file.mimetype};base64,${Buffer.from(data).toString('base64')}"`
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
  // Upload Backdrops
  uploadBackdrops: async (req, res) => {
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
              let fileName = `"data:${req.file.mimetype};base64,${Buffer.from(data).toString('base64')}"`
              fs.unlinkSync(process.cwd() + '/public/img/' + req.file.filename)
              let formatString = fileName.slice(1, fileName.length - 1)
              uploadBackdrops(res, formatString, movie_id)
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
        let ageExist = await model.age_type.findUnique({
          where: {
            age_id: Number(value?.age_id)
          }
        })
        if (ageExist) {
          let { comming_soon, now_showing, movie_name, release_date, trailer, overview, runtime, age_id } = value
          if (comming_soon && now_showing) {
            return RessponseMessage.badRequest(
              res,
              '',
              'If comming_soon is true, then now_showing must be false, and vice versa'
            )
          } else {
            let alias = slugify(movie_name, { replacement: '-', remove: undefined, lower: true, trim: true })
            let dateFormat = moment(release_date).format('DD/MM/YYYY')
            let movieSchema = {
              movie_name,
              alias,
              trailer,
              overview,
              runtime: Number(runtime),
              age_id: Number(age_id),
              release_date: dateFormat,
              hot: false,
              comming_soon,
              now_showing,
              created_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
            }
            let result = await model.movie.create({ data: movieSchema })
            return RessponseMessage.success(res, result, 'Create movie successfully!')
          }
        } else {
          return RessponseMessage.badRequest(res, '', 'Age_type does not exists!')
        }
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
      let { movie_id } = req.query
      let movieExist = await model.movie.findUnique({
        where: {
          movie_id: Number(movie_id)
        }
      })
      if (movieExist) {
        let { error, value } = await validators.updateMovieValidate(req.body)
        if (!error) {
          let ageExist = await model.age_type.findUnique({
            where: {
              age_id: Number(value?.age_id)
            }
          })
          if (ageExist) {
            let {
              comming_soon,
              now_showing,
              movie_name,
              release_date,
              trailer,
              overview,
              runtime,
              age_id,
              short_desc,
              poster,
              backdrops,
              hot,
              country,
              language
            } = value
            if (comming_soon && now_showing) {
              return RessponseMessage.badRequest(
                res,
                '',
                'If comming_soon is true, then now_showing must be false, and vice versa'
              )
            } else {
              let alias = slugify(movie_name, { replacement: '-', remove: undefined, lower: true, trim: true })
              let dateFormat = moment(release_date).format('DD/MM/YYYY')
              let movieSchema = {
                movie_name,
                alias,
                trailer,
                short_desc,
                overview,
                poster,
                backdrops,
                runtime: Number(runtime),
                age_id: Number(age_id),
                country,
                language,
                release_date: dateFormat,
                hot,
                comming_soon,
                now_showing,
                updated_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
              }
              let result = await model.movie.update({
                where: {
                  movie_id: Number(movie_id)
                },
                data: movieSchema
              })
              return RessponseMessage.success(res, result, 'Update movie successfully!')
            }
          } else {
            return RessponseMessage.badRequest(res, '', 'Age_type does not exists!')
          }
        } else {
          return RessponseMessage.badRequest(res, '', error.details[0].message)
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'Movie does not exist!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete mobie
  deleteMovie: async (req, res) => {
    try {
      let { movie_id } = req.query
      let { error } = await validators.numberValidate({ movie_id: Number(movie_id) })
      if (!error) {
        let movieExist = await model.movie.findUnique({
          where: {
            movie_id: Number(movie_id)
          }
        })
        if (movieExist) {
          await model.movie.deleteMany({
            where: {
              movie_id: Number(movie_id)
            }
          })
          return RessponseMessage.success(res, '', 'Delete movie successfully!')
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
  // Get list director movie_id
  getListDirector: async (req, res) => {
    try {
      let { movie_id } = req.query
      let { error } = await validators.numberValidate({ movie_id: Number(movie_id) })
      if (!error) {
        let movieExist = await model.movie.findUnique({
          where: {
            movie_id: Number(movie_id)
          }
        })
        if (movieExist) {
          let dirList = await model.movie_director.findMany({
            where: {
              movie_id: Number(movie_id)
            },
            include: {
              director: true
            }
          })
          let result = dirList.map((item) => {
            let { role, director } = item
            let { dir_id, dir_name, created_at } = director
            return {
              dir_id,
              dir_name,
              role,
              created_at
            }
          })
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
  // Get list actor by movie_id
  getListActor: async (req, res) => {
    try {
      let { movie_id } = req.query
      let { error } = await validators.numberValidate({ movie_id: Number(movie_id) })
      if (!error) {
        let movieExist = await model.movie.findUnique({
          where: {
            movie_id: Number(movie_id)
          }
        })
        if (movieExist) {
          let actLst = await model.movie_cast.findMany({
            where: {
              movie_id: Number(movie_id)
            },
            include: {
              actor: true
            }
          })
          let result = actLst.map((item) => {
            let { role, actor } = item
            let { act_id, full_name, alias, gender, birth_day, place_of_birth, avatar, bio } = actor
            let actorSchema = {
              act_id,
              full_name,
              alias,
              role,
              gender: gender === true ? 'male' : 'female',
              birth_day: moment(birth_day).format('DD/MM/YYYY'),
              place_of_birth,
              avatar,
              bio
            }
            return actorSchema
          })
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
  // Get all genres by movie_id
  getListGenres: async (req, res) => {
    try {
      let { movie_id } = req.query
      let { error } = await validators.numberValidate({ movie_id: Number(movie_id) })
      if (!error) {
        let movieExist = await model.movie.findUnique({
          where: {
            movie_id: Number(movie_id)
          }
        })
        if (movieExist) {
          let genresLst = await model.movie_genres.findMany({
            where: {
              movie_id: Number(movie_id)
            },
            include: {
              genres: true
            }
          })
          let result = genresLst.map((item) => {
            let { is_removed, updated_at, ...orther } = item.genres
            return { ...orther }
          })
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
  // Get all tags by movie_id
  getListTags: async (req, res) => {
    try {
      let { movie_id } = req.query
      let { error } = await validators.numberValidate({ movie_id: Number(movie_id) })
      if (!error) {
        let movieExist = await model.movie.findUnique({
          where: {
            movie_id: Number(movie_id)
          }
        })
        if (movieExist) {
          let tagsLst = await model.movie_tags.findMany({
            where: {
              movie_id: Number(movie_id)
            },
            include: {
              tags: true
            }
          })
          let result = tagsLst.map((item) => {
            let { is_removed, updated_at, ...orther } = item.tags
            return { ...orther }
          })
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
  }
}

module.exports = movieController
