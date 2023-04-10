const RessponseMessage = require('../constants/response')
const validators = require('../middlewares/validation.middleware')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
let { checkAccessToken } = require('../middlewares/auth.middleware')
const moment = require('moment')

const commentController = {
  // Get all comment by movie id
  getCommentByMovieId: async (req, res) => {
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
          let result = await model.comment_movie.findMany({
            where: {
              movie_id: Number(movie_id)
            },
            select: {
              comment_id: true,
              user_id: true,
              content: true,
              comment_star: true,
              date_comment: true
            }
          })
          if (result) {
            return RessponseMessage.success(res, result, 'Get all comment successfully!')
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
  // Insert comment
  insertComment: async (req, res) => {
    try {
      const { authorization } = req.headers
      let newToken = authorization.replace('Bearer ', '')
      let userSchema = checkAccessToken(newToken)
      if (userSchema) {
        let { user_id } = userSchema
        let { movie_id } = req.body
        let movieExist = await model.movie.findUnique({
          where: {
            movie_id: Number(movie_id)
          }
        })
        if (movieExist) {
          let { error, value } = await validators.insertCommentValidate(req.body)
          if (!error) {
            let { movie_id, content } = value
            let commentInfo = {
              user_id,
              movie_id,
              content,
              comment_star: 0,
              date_comment: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
            }
            let result = await model.comment_movie.create({ data: commentInfo })
            if (result) {
              return RessponseMessage.created(res, result, 'Comment movie successfully!')
            }
          } else {
            return RessponseMessage.badRequest(res, '', error.details[0].message)
          }
        } else {
          return RessponseMessage.badRequest(res, '', 'Movie does not exists!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'User does not exist')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update comment
  updateComment: async (req, res) => {
    try {
      const { authorization } = req.headers
      let newToken = authorization.replace('Bearer ', '')
      let userSchema = checkAccessToken(newToken)
      if (userSchema) {
        let { comment_id } = req.query
        let { movie_id } = req.body
        let commentExist = await model.comment_movie.findFirst({
          where: {
            comment_id: Number(comment_id),
            user_id: Number(userSchema.user_id)
          }
        })
        if (commentExist) {
          let movieExist = await model.movie.findUnique({
            where: {
              movie_id: Number(movie_id)
            }
          })
          if (movieExist) {
            let { error, value } = await validators.updateCommentValidate(req.body)
            if (!error) {
              let { content, comment_star } = value
              let newComment = {
                content,
                comment_star,
                updated_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
              }
              let result = await model.comment_movie.updateMany({
                where: {
                  comment_id: Number(comment_id)
                },
                data: newComment
              })
              if (result) {
                return RessponseMessage.success(
                  res,
                  {
                    comment_id: Number(comment_id),
                    user_id: Number(userSchema.user_id),
                    movie_id: Number(movie_id),
                    content,
                    comment_star
                  },
                  'Update comment successfully!'
                )
              }
            } else {
              return RessponseMessage.badRequest(res, '', error.details[0].message)
            }
          } else {
            return RessponseMessage.badRequest(res, '', 'Movie does not exists!')
          }
        } else {
          return RessponseMessage.badRequest(res, '', 'User does not comment movie!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'User does not exist')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete comment
  deleteComment: async (req, res) => {
    try {
      const { authorization } = req.headers
      let newToken = authorization.replace('Bearer ', '')
      let userSchema = checkAccessToken(newToken)
      let { comment_id } = req.query
      let { error } = await validators.commentIDValidate({ comment_id: Number(comment_id) })
      if (!error) {
        let commentExist = await model.comment_movie.findFirst({
          where: {
            comment_id: Number(comment_id),
            user_id: Number(userSchema.user_id)
          }
        })
        if (commentExist) {
          let result = await model.comment_movie.deleteMany({
            where: {
              comment_id: Number(comment_id),
              user_id: Number(userSchema.user_id)
            }
          })
          if (result) {
            return RessponseMessage.success(res, '', 'Delete comment successfully!')
          }
        } else {
          return RessponseMessage.badRequest(res, '', 'User does not comment movie!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all user comment movie
  getUsersCommentMovie: async (req, res) => {
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
          let userLst = await model.comment_movie.findMany({
            where: {
              movie_id: Number(movie_id)
            },
            include: {
              user: true
            }
          })
          let result = userLst.map((userItem) => {
            let { content, date_comment, user } = userItem
            let { account, name, email, mobile_no, user_id } = user
            let userSchema = {
              user_id,
              account,
              name,
              email,
              mobile_no,
              content,
              date_comment
            }
            return userSchema
          })
          return RessponseMessage.success(res, result, 'Get all user comment movie successfully!')
        } else {
          return RessponseMessage.badRequest(res, '', 'Movie does not exists!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = commentController
