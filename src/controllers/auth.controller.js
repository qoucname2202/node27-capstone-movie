const RessponseMessage = require('../constants/response')
const validators = require('../middlewares/validation.middleware')
const { PrismaClient } = require('@prisma/client')
const model = new PrismaClient()
const { hashPassword } = require('../utils/jwt')
const moment = require('moment')

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
      return RessponseMessage.success(res, 'Successfully!', 'Signin successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  signout: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Signout successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = authController
