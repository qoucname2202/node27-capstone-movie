const jwt = require('jsonwebtoken')
const RessponseMessage = require('../constants/response')
const { secretToken, refreshToken } = require('../config')

const userMiddleware = {
  verifyToken: (req, res, next) => {
    try {
      let { authorization } = req.headers
      let accessToken = authorization.replace('Bearer ', '')
      let cookieToken = req.cookies.refreshToken
      if (accessToken || cookieToken) {
        let verifyAccessToken = jwt.verify(accessToken, secretToken)
        let verifyCookies = jwt.verify(cookieToken, refreshToken)
        if (verifyAccessToken && verifyCookies) {
          next()
          return
        }
      } else {
        return RessponseMessage.unauthorized(res, '', 'Required invalid token!')
      }
    } catch (err) {
      RessponseMessage.unauthorized(res, '', err.message)
    }
  },
  verifyAdmin: (req, res, next) => {
    try {
      let { authorization } = req.headers
      let accessToken = authorization.replace('Bearer ', '')
      let cookieToken = req.cookies.refreshToken
      if (accessToken || cookieToken) {
        let verifyAccessToken = jwt.verify(accessToken, secretToken)
        let verifyCookies = jwt.verify(cookieToken, refreshToken)
        if (verifyAccessToken && verifyCookies) {
          let { user_type } = verifyAccessToken
          if (user_type === 'ADMIN') {
            next()
            return
          } else {
            return RessponseMessage.unauthorized(res, '', 'Unauthorized. No permission to perform this action!')
          }
        }
      } else {
        return RessponseMessage.unauthorized(res, '', 'User is not exists!')
      }
    } catch (err) {
      RessponseMessage.unauthorized(res, '', err.message)
    }
  }
}

module.exports = userMiddleware
