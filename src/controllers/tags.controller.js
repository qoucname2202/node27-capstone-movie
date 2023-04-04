const RessponseMessage = require('../constants/response')

const tagsController = {
  // Get all tags
  getAllTags: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all tags successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Insert tags
  insertTags: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Insert tags successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update tags
  updateTags: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Update tags successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete tags
  deleteTags: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Delete tags successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get movie list by tags_name
  getMoviesByTags: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get movie by tags successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Search tags by tagsname
  searchTags: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Search tags successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = tagsController
