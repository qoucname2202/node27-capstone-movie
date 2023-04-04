const RessponseMessage = require('../constants/response')

const ageTypeController = {
  // Get all age type
  getAllAgeType: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all age type successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Insert age
  insertAgeType: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Insert age type successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update age
  updateAgeType: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Update age type successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete age
  deleteAgeType: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Delete age type successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get movie by age type
  getMovieByAgeType: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get movie by age type successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Search age type by age_type_name
  searchAgeType: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Search age type successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = ageTypeController
