const RessponseMessage = require('../constants/response')

const commentController = {
  // Get all comment by movie id
  getCommentByMovieId: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all comment successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Insert comment
  insertComment: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Insert comment successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update comment
  updateComment: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Update comment successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete comment
  deleteComment: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Delete comment successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all user comment movie
  getUsersCommentMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all user comment movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = commentController
