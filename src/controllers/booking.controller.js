const RessponseMessage = require('../constants/response')
const bookingController = {
  // Booking ticket movie
  bookingTicketMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Booking ticket movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get all box offiece
  getAllBoxOffiece: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get all box offiece successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Create showtimes
  createShowTimes: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Create showtimes movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = bookingController
