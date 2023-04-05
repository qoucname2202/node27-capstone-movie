const RessponseMessage = require('../constants/response')
const validators = require('../middlewares/validation.middleware')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
const HttpStatusCode = require('../constants/httpStatus')
const { refreshTokenName } = require('../config')
const { hashPassword, isCorrectPassword } = require('../utils/jwt')
const moment = require('moment')
const { profileUser } = require('../utils/helpers')
const { generateRefreshToken, generateToken, checkRefreshToken } = require('../middlewares/auth.middleware')

const authController = {
  signup: async (req, res) => {
    try {
      let { error, value } = await validators.signupValidate(req.body)
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
            let { account, password, name, email, mobile_no, gender } = value
            const passHash = hashPassword(password)
            let userModel = {
              account,
              password: passHash,
              name,
              email,
              mobile_no,
              gender: gender === 'male' ? true : false,
              user_type: 'USER',
              created_at: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
            }
            let result = await model.user.create({ data: userModel })
            if (result) {
              return RessponseMessage.success(res, 'Successfully!', 'Signup successfully!')
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
  signin: async (req, res) => {
    try {
      let { error, value } = await validators.signinValidate(req.body)
      if (!error) {
        let userSchema = await model.user.findUnique({
          where: {
            account: value?.account
          },
          include: {
            user_type_user_user_typeTouser_type: true
          }
        })
        if (userSchema) {
          let hasPassword = isCorrectPassword(value.password, userSchema.password)
          if (hasPassword) {
            // create access token
            const accessToken = generateToken(userSchema)
            // create refresh token
            const refreshToken = generateRefreshToken(userSchema)
            // Updated refresh token
            await model.user.update({
              where: {
                account: userSchema.account
              },
              data: {
                refresh_token: refreshToken
              }
            })
            // Save refresh token to cookies
            res.cookie(refreshTokenName, refreshToken, {
              httpOnly: true,
              secure: false,
              path: '/',
              sameSite: 'strict',
              maxAge: 7 * 24 * 60 * 60 * 1000
            })
            let { user_id, account, name, email, mobile_no, gender, type_name } = profileUser(userSchema)
            return RessponseMessage.success(
              res,
              { user_id, account, name, email, mobile_no, gender, user_type: type_name, accessToken },
              'Signin successfully!'
            )
          } else {
            return RessponseMessage.badRequest(
              res,
              {
                account: value.account,
                password: value.password
              },
              'Account or password is incorrect!'
            )
          }
        } else {
          return RessponseMessage.badRequest(
            res,
            {
              account: value.account,
              password: value.password
            },
            'Account or password is incorrect!'
          )
        }
      } else {
        return RessponseMessage.badRequest(res, '', error.details[0].message)
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  signout: async (req, res) => {
    try {
      const cookie = req.cookies
      const { refreshToken } = cookie
      if (!cookie || !refreshToken) {
        return RessponseMessage.badRequest(res, '', 'No refresh token in cookies!')
      } else {
        const userSchema = checkRefreshToken(refreshToken)
        await model.user.update({
          where: {
            account: userSchema.account
          },
          data: {
            refresh_token: null
          }
        })
        return res
          .status(200)
          .clearCookie(refreshTokenName, {
            httpOnly: true,
            secure: true
          })
          .json({
            statusCode: HttpStatusCode.OK,
            message: 'Successfully!',
            content: 'Signout successfully!',
            dateTime: moment().format('YYYY-MM-DDTHH:mm:ss.SSSSSZ')
          })
      }
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = authController
