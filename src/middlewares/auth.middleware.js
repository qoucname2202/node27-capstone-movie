const jwt = require('jsonwebtoken')
const { secretToken, refreshToken, expriesToken, expriesRefreshToken } = require('../config')

const authMiddleware = {
  generateToken: (data) => {
    let { user_id, account, name, email, user_type } = data
    return jwt.sign({ user_id, account, name, email, user_type }, secretToken, {
      expiresIn: `${Number(expriesToken)}m`
    })
  },

  generateRefreshToken: (data) => {
    let { user_id, account, name, email, user_type } = data
    return jwt.sign({ user_id, account, name, email, user_type }, refreshToken, {
      expiresIn: `${Number(expriesRefreshToken)}d`
    })
  },
  checkRefreshToken: (refToken) => {
    return jwt.verify(refToken, refreshToken)
  }
}
module.exports = authMiddleware
