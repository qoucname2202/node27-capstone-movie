const RessponseMessage = require('../constants/response')

const authController = {
  signup: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Success', 'Successfully!')
    } catch (err) {
      console.error(err)
    }
  }
}

module.exports = authController
