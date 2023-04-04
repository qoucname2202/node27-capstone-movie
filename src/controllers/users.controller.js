const RessponseMessage = require('../constants/response')
const userController = {
  // Get all users
  getAllUsers: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all user successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Test token
  testToken: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Test token successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Forgot-password
  forgotPassword: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Forgot-password!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Reset password
  resetPassword: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Reset-password successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all user type
  getAllUserType: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Sucessfully!', 'Get all user type scuccessfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get pagination list of user
  getPaginationListOfUser: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get pagination list of user')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Search user
  searchUser: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Search user')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // search user pagination
  searchUserPagination: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Search user pagination')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // get profile user
  getProfileUser: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Profile user')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // get info user
  getInfoUser: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get user info')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Insert user
  insertUser: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Insert user successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update user
  updateUser: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Update user successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Update user by admin
  updateUserByAdmin: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Update user by admin successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Upload avatar
  uploadAvatar: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Upload avatar successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Delete user
  deleteUser: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Delete user successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // like movie
  likeMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Like movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Unlike movie
  unlikeMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Unlike movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Rating movie
  ratingMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Rating movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all movie favorite
  getAllMovieFavorite: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all movie favorite successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all movie rating
  getAllMovieRating: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all movie rating successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = userController
