const RessponseMessage = require('../constants/response')
const validators = require('../middlewares/validation.middleware')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
const { refreshTokenName, urlServer } = require('../config')
const {
  generateRefreshToken,
  generateToken,
  checkRefreshToken,
  checkAccessToken
} = require('../middlewares/auth.middleware')
let fs = require('fs')
const moment = require('moment')
const crypto = require('crypto')
const sendMail = require('../utils/email')
const { updateAvatar } = require('../utils/file')
const { hashPassword } = require('../utils/jwt')
const { profileUser } = require('../utils/helpers')

const userController = {
  // Refresh token
  refreshToken: async (req, res) => {
    try {
      const cookie = req.cookies
      if (!cookie || !cookie.refreshToken) {
        return RessponseMessage.badRequest(res, '', 'No refresh token in cookies!')
      } else {
        const userSchema = checkRefreshToken(cookie.refreshToken)
        let result = await model.user.findUnique({
          where: {
            account: userSchema?.account
          },
          include: {
            user_type_user_user_typeTouser_type: true
          }
        })
        if (result) {
          let { user_id, account, name, email, mobile_no, gender, user_type, type_name } = profileUser(result)
          let newUserSchema = {
            user_id,
            account,
            name,
            email,
            user_type
          }
          const newAccessToken = generateToken(newUserSchema)
          const newRefreshToken = generateRefreshToken(newUserSchema)
          await model.user.update({
            where: {
              account: userSchema?.account
            },
            data: {
              refresh_token: newRefreshToken
            }
          })
          res.cookie(refreshTokenName, newRefreshToken, {
            httpOnly: true,
            secure: false,
            path: '/',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
          })
          return RessponseMessage.success(
            res,
            { user_id, account, name, email, mobile_no, gender, user_type: type_name, newAccessToken },
            'Refresh token successfully!'
          )
        } else {
          return RessponseMessage.badRequest(res, '', 'Refresh token not matched!')
        }
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Test token
  testToken: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers
        let newToken = authorization.replace('Bearer ', '')
        let userSchema = checkAccessToken(newToken)
        if (userSchema) {
          let { user_id, account, name, email, user_type, iat, exp } = userSchema
          let infoToken = {
            user_id,
            account,
            email,
            name,
            user_type,
            iat: moment(iat * 1000).format(),
            exp: moment(exp * 1000).format()
          }
          return RessponseMessage.success(res, infoToken, 'Successfully!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'Required Authentication!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Forgot-password
  forgotPassword: async (req, res) => {
    try {
      let { email } = req.query
      let { error, value } = await validators.forgotPassword({ email })
      if (!error) {
        const userInfo = await model.user.findUnique({
          where: {
            email: value?.email
          }
        })
        if (userInfo) {
          const resetToken = crypto.randomBytes(32).toString('hex')
          const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')
          const passwordResetExpires = moment(Date.now() + 15 * 60 * 1000).format()
          await model.user.update({
            where: {
              email: value?.email
            },
            data: {
              password_reset_token: passwordResetToken,
              password_reset_expires: passwordResetExpires
            }
          })
          const html = `Please click on the link below to change your password. This link will expire 15 minutes. <a href=${urlServer}/api/v1/users/reset-password/${resetToken}>Click here</a>`
          const content = { email, html }
          const result = await sendMail(content)
          if (result) {
            return RessponseMessage.success(
              res,
              'Please check your email again!',
              'Send mail change password successfully!'
            )
          }
        } else {
          return RessponseMessage.notFound(res, '', 'User does not exist!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Reset password
  resetPassword: async (req, res) => {
    try {
      let { error, value } = await validators.resetPassword(req.body)
      if (!error) {
        let { token } = value
        const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
        const userInfo = await model.user.findFirst({
          where: {
            password_reset_token: passwordResetToken
          }
        })
        if (userInfo) {
          let { email } = userInfo
          let result = await model.user.update({
            where: {
              email: email
            },
            data: {
              password: hashPassword(value.newPassword),
              password_reset_token: null,
              password_reset_expires: null,
              password_change_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
            }
          })
          if (result) {
            return RessponseMessage.success(
              res,
              'Your password has been change. Please enter signin again!',
              'Change password successfully!'
            )
          }
        } else {
          return RessponseMessage.notFound(res, '', 'Invalid reset token!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      let { keyword } = req.query
      let result = await model.user.findMany({
        where: {
          name: {
            contains: keyword || ''
          }
        },
        select: {
          user_id: true,
          account: true,
          email: true,
          name: true,
          mobile_no: true,
          gender: true,
          user_type: true,
          avatar: true
        }
      })
      if (result) {
        return RessponseMessage.success(res, result, 'Successfully!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all user type
  getAllUserType: async (req, res) => {
    try {
      let result = await model.user_type.findMany({
        select: {
          user_type: true,
          type_name: true,
          created_at: true
        }
      })
      if (result) {
        return RessponseMessage.success(res, result, 'Successfully!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get pagination list of user
  getPaginationListOfUser: async (req, res) => {
    try {
      let { page, limit, keyword } = req.query
      if (page) {
        let usersLength = (await model.user.findMany()).length
        let pagingRes = await model.user.findMany({
          skip: (Number(page) - 1) * Number(limit),
          take: Number(limit),
          where: {
            name: {
              contains: keyword || ''
            }
          },
          select: {
            user_id: true,
            account: true,
            email: true,
            name: true,
            mobile_no: true,
            gender: true,
            user_type: true,
            avatar: true
          },
          orderBy: {
            user_id: 'asc'
          }
        })
        let paginationSchema = {
          currentPage: Number(page),
          count: Number(limit),
          totalPages: Math.ceil(usersLength / Number(limit)),
          totalCount: usersLength,
          item: pagingRes
        }
        return RessponseMessage.success(res, paginationSchema, 'Successfully!')
      } else {
        let result = await model.user.findMany({
          select: {
            user_id: true,
            account: true,
            email: true,
            name: true,
            mobile_no: true,
            gender: true,
            user_type: true,
            avatar: true
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
  // Search user
  searchUser: async (req, res) => {
    try {
      let { keyword } = req.query
      let result = await model.user.findMany({
        where: {
          name: {
            contains: keyword || ''
          }
        },
        select: {
          user_id: true,
          account: true,
          email: true,
          name: true,
          mobile_no: true,
          gender: true,
          user_type: true,
          avatar: true,
          created_at: true
        }
      })
      if (result) {
        return RessponseMessage.success(res, result, 'Successfully!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // search user pagination
  searchUserPagination: async (req, res) => {
    try {
      let { page, limit, keyword } = req.query
      if (page) {
        let pagingRes = await model.user.findMany({
          skip: (Number(page) - 1) * Number(limit),
          take: Number(limit),
          where: {
            name: {
              contains: keyword || ''
            }
          },
          select: {
            user_id: true,
            account: true,
            email: true,
            name: true,
            mobile_no: true,
            gender: true,
            user_type: true,
            avatar: true
          },
          orderBy: {
            user_id: 'asc'
          }
        })
        let paginationSchema = {
          currentPage: Number(page),
          count: Number(limit),
          totalPages: Math.ceil(pagingRes.length / Number(limit)),
          totalCount: pagingRes.length,
          item: pagingRes
        }
        return RessponseMessage.success(res, paginationSchema, 'Successfully!')
      } else {
        let result = await model.user.findMany({
          select: {
            user_id: true,
            account: true,
            email: true,
            name: true,
            mobile_no: true,
            gender: true,
            user_type: true,
            avatar: true
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
  // get profile user
  getProfileUser: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers
        let newToken = authorization.replace('Bearer ', '')
        let userSchema = checkAccessToken(newToken)
        if (userSchema) {
          let { user_id } = userSchema
          const result = await model.user.findUnique({
            where: {
              user_id: user_id
            },
            select: {
              user_id: true,
              account: true,
              email: true,
              name: true,
              mobile_no: true,
              gender: true,
              user_type: true,
              avatar: true,
              created_at: true,
              updated_at: true
            }
          })
          return RessponseMessage.success(res, result, 'Successfully!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'Required Authentication!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // get info user
  getInfoUser: async (req, res) => {
    try {
      let { keyword } = req.query
      let result = await model.user.findMany({
        where: {
          account: {
            contains: keyword || ''
          }
        },
        select: {
          user_id: true,
          account: true,
          email: true,
          name: true,
          mobile_no: true,
          gender: true,
          user_type: true,
          avatar: true,
          created_at: true,
          updated_at: true
        }
      })
      if (result) {
        return RessponseMessage.success(res, result, 'Successfully!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Insert user
  insertUser: async (req, res) => {
    try {
      let { error, value } = await validators.insertUserValidate(req.body)
      if (!error) {
        let checkAccount = await model.user.findUnique({
          where: {
            account: value?.account
          }
        })
        if (!checkAccount) {
          let checkEmail = await model.user.findUnique({
            where: {
              email: value?.email
            }
          })
          if (!checkEmail) {
            let { account, password, name, email, mobile_no, gender, user_type } = value
            const passHash = hashPassword(password)
            let userModel = {
              account,
              password: passHash,
              name,
              email,
              mobile_no,
              gender: gender === 'male' ? true : false,
              user_type,
              created_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
            }
            let result = await model.user.create({ data: userModel })
            if (result) {
              return RessponseMessage.success(res, 'Successfully!', 'Insert user successfully!')
            }
          } else {
            return RessponseMessage.conflict(
              res,
              {
                email: value.email
              },
              'Email already exists'
            )
          }
        } else {
          return RessponseMessage.conflict(
            res,
            {
              account: value.account
            },
            'Account already exists'
          )
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update user
  updateUser: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers
        let newToken = authorization.replace('Bearer ', '')
        let userSchema = checkAccessToken(newToken)
        if (userSchema) {
          let { user_id } = userSchema
          let { error } = await validators.updateUserValidate(req.body)
          if (!error) {
            let { gender } = req.body
            const result = await model.user.update({
              where: {
                user_id: user_id
              },
              data: {
                ...req.body,
                gender: gender === 'male' ? true : false,
                updated_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
              },
              select: {
                user_id: true,
                account: true,
                name: true,
                email: true,
                mobile_no: true,
                gender: true,
                user_type: true,
                created_at: true,
                updated_at: true
              }
            })
            return RessponseMessage.success(res, result, 'Update user successfully!')
          } else {
            return RessponseMessage.badRequest(res, '', error.details[0].message)
          }
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'User does not exists!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update user by admin
  updateUserByAdmin: async (req, res) => {
    try {
      let { account } = req.query
      let checkAccount = await model.user.findUnique({
        where: {
          account: account
        }
      })
      if (checkAccount) {
        let { error, value } = await validators.updateAdminValidate(req.body)
        if (!error) {
          let { account, password, name, email, mobile_no, gender, user_type } = value
          const passHash = hashPassword(password)
          let userModel = {
            account,
            password: passHash,
            name,
            email,
            mobile_no,
            gender: gender === 'male' ? true : false,
            user_type,
            updated_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
          }
          const result = await model.user.update({
            where: {
              account: req.query.account
            },
            data: userModel,
            select: {
              user_id: true,
              account: true,
              name: true,
              email: true,
              mobile_no: true,
              gender: true,
              user_type: true,
              created_at: true,
              updated_at: true
            }
          })
          if (result) {
            return RessponseMessage.success(res, result, 'Update user by admin successfully!')
          }
        } else {
          return RessponseMessage.badRequest(res, '', error.details[0].message)
        }
      } else {
        return RessponseMessage.conflict(
          res,
          {
            account: account
          },
          'Account does not exists!'
        )
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Upload avatar
  uploadAvatar: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers
        let newToken = authorization.replace('Bearer ', '')
        let userSchema = checkAccessToken(newToken)
        if (userSchema) {
          let { user_id } = userSchema
          if (!req.file) {
            return RessponseMessage.badRequest(res, '', 'Invalid file format. should be png/jpg/jpeg/webp!')
          } else {
            fs.readFile(process.cwd() + '/public/img/' + req.file.filename, (err, data) => {
              let fileName = `"data:${req.file.mimetype};base64,${Buffer.from(data).toString('base64')}"`
              fs.unlinkSync(process.cwd() + '/public/img/' + req.file.filename)
              let formatString = fileName.slice(1, fileName.length - 1)
              updateAvatar(res, formatString, user_id)
            })
          }
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'Required Authentication!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete user
  deleteUser: async (req, res) => {
    try {
      let { account } = req.query
      let checkAccount = await model.user.findUnique({
        where: {
          account: account
        }
      })
      if (checkAccount) {
        await model.user.delete({
          where: {
            account: account
          }
        })
        return RessponseMessage.success(res, '', 'Delete user successfully!')
      } else {
        return RessponseMessage.conflict(
          res,
          {
            account: account
          },
          'Account does not exists!'
        )
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // like movie
  likeMovie: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers
        let newToken = authorization.replace('Bearer ', '')
        let userSchema = checkAccessToken(newToken)
        if (userSchema) {
          let { user_id } = userSchema
          let { movie_id } = req.query
          let { error } = await validators.numberValidate({ movie_id: Number(movie_id) })
          if (!error) {
            let movieExist = await model.movie.findUnique({
              where: {
                movie_id: Number(movie_id)
              }
            })
            if (movieExist) {
              let movieLikes = await model.like_movie.findMany({
                where: {
                  user_id: user_id,
                  movie_id: Number(movie_id)
                }
              })
              if (movieLikes.length === 0) {
                let movieSchema = {
                  user_id,
                  movie_id: Number(movie_id),
                  date_like: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
                }
                let result = await model.like_movie.create({ data: movieSchema })
                if (result) {
                  return RessponseMessage.success(res, movieSchema, 'User has liked movie successfully!')
                }
              } else {
                return RessponseMessage.badRequest(res, '', 'User has already liked movie!')
              }
            } else {
              return RessponseMessage.badRequest(res, '', 'Movie does not exists!')
            }
          } else {
            return RessponseMessage.badRequest(res, '', error.details[0].message)
          }
        } else {
          return RessponseMessage.badRequest(res, '', 'User does not exists!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'Required Authentication!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Unlike movie
  unlikeMovie: async (req, res) => {
    try {
      if (req?.headers?.authorization?.startsWith('Bearer')) {
        const { authorization } = req.headers
        let newToken = authorization.replace('Bearer ', '')
        let userSchema = checkAccessToken(newToken)
        if (userSchema) {
          let { user_id } = userSchema
          let { movie_id } = req.query
          let { error } = await validators.numberValidate({ movie_id: Number(movie_id) })
          if (!error) {
            let movieExist = await model.movie.findUnique({
              where: {
                movie_id: Number(movie_id)
              }
            })
            if (movieExist) {
              let movieLikes = await model.like_movie.findMany({
                where: {
                  user_id: user_id,
                  movie_id: Number(movie_id)
                }
              })
              if (movieLikes.length > 0) {
                let result = await model.like_movie.deleteMany({
                  where: {
                    user_id: user_id,
                    movie_id: Number(movie_id)
                  }
                })
                if (result) {
                  return RessponseMessage.success(res, '', 'User has unliked movie successfully!')
                }
              } else {
                return RessponseMessage.badRequest(res, '', 'User does not like movie!')
              }
            } else {
              return RessponseMessage.badRequest(res, '', 'Movie does not exists!')
            }
          } else {
            return RessponseMessage.badRequest(res, '', error.details[0].message)
          }
        } else {
          return RessponseMessage.badRequest(res, '', 'User does not exists!')
        }
      } else {
        return RessponseMessage.badRequest(res, '', 'Required Authentication!')
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Rating movie
  ratingMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Rating movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all movie favorite
  getAllMovieFavorite: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all movie favorite successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all movie rating
  getAllMovieRating: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all movie rating successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = userController
