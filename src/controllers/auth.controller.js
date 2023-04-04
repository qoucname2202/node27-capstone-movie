const RessponseMessage = require('../constants/response')

const authController = {
  signup: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Success', 'Successfully!')
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
