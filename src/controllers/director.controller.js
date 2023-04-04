const RessponseMessage = require('../constants/response')

const directorController = {
  // Get all director
  getAllDirector: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all director successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Insert director
  insertDirector: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Insert director successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update director
  updateDirector: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Update director successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete director
  deleteDirector: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Delete director successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Search director
  searchDirector: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Search director successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  //  Get movie list director has participated in
  getMovieDirecting: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get movie directing successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = directorController
