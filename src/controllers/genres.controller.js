const RessponseMessage = require('../constants/response')

const genresController = {
  // Get all genres
  getAllGenres: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all genres successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Insert genres
  insertGenres: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Insert genres successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update genres
  updateGenres: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Update genres successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete genres
  deleteGenres: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Delete genres successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get profile genres
  getMoviesByGenres: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get movie by genres successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Search genres by genres_type_name
  searchGenres: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Search genres successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = genresController
