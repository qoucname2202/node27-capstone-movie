const RessponseMessage = require('../constants/response')

const actorController = {
  // Get all actor
  getAllActor: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all actor successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Insert actor
  insertActor: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Insert actor successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update actor
  updateActor: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Update actor successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete actor
  deleteActor: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Delete actor successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get profile actor
  getProfileActor: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get profile actor successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get movie list actor is acting
  getMovieActing: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get movie is acting successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = actorController
