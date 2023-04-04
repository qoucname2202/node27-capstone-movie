const RessponseMessage = require('../constants/response')

const cinemaController = {
  // Get info cinema system by cinema_system_name
  getInfoCinemaSystem: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get info cinema system successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get info cinema cluster by cinema_system_name
  getInfoCinemaCluster: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get info cinema cluster successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get information showtimes by cinema_system_name
  getInfoShowtimesSys: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get info showtimes cinema system successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  },
  // Get showtimes movie
  getShowtimesMovie: async (req, res) => {
    try {
      return RessponseMessage.success(res, 'Successfully!', 'Get showtimes movie successfully!')
    } catch (err) {
      RessponseMessage.error(res, 'Internal Server Error')
    }
  }
}

module.exports = cinemaController
